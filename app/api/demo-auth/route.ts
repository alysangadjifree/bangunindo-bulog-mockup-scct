const encoder = new TextEncoder();
const COOKIE_NAME = "scct_demo_session";
const CAPTCHA_ENABLED = false;

function getEnv(name: string) {
  return process.env[name] ?? "";
}

function toBase64Url(input: Uint8Array | string) {
  const bytes = typeof input === "string" ? encoder.encode(input) : input;
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function fromBase64Url(input: string) {
  const padded = input.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(input.length / 4) * 4, "=");
  return atob(padded);
}

async function getSigningKey() {
  const secret = getEnv("DEMO_SESSION_SECRET");
  if (secret.length < 32) throw new Error("DEMO_SESSION_SECRET must contain at least 32 characters");
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

async function sign(payload: string) {
  const signature = await crypto.subtle.sign("HMAC", await getSigningKey(), encoder.encode(payload));
  return toBase64Url(new Uint8Array(signature));
}

async function verify(payload: string, signature: string) {
  try {
    const binary = fromBase64Url(signature);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return crypto.subtle.verify("HMAC", await getSigningKey(), bytes, encoder.encode(payload));
  } catch {
    return false;
  }
}

function cookieValue(request: Request, name: string) {
  const cookie = request.headers.get("cookie") ?? "";
  return cookie.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1) ?? "";
}

function noStore(data: unknown, init?: ResponseInit) {
  const response = Response.json(data, init);
  response.headers.set("Cache-Control", "no-store, max-age=0");
  response.headers.set("Pragma", "no-cache");
  return response;
}

export async function GET(request: Request) {
  const action = new URL(request.url).searchParams.get("action");
  if (action === "captcha") {
    if (!CAPTCHA_ENABLED) return noStore({ enabled: false, message: "CAPTCHA dinonaktifkan sementara." });
    const first = crypto.getRandomValues(new Uint8Array(1))[0] % 8 + 2;
    const second = crypto.getRandomValues(new Uint8Array(1))[0] % 7 + 1;
    const expires = Date.now() + 5 * 60 * 1000;
    const payload = `${first}:${second}:${expires}`;
    return noStore({ question: `${first} + ${second}`, challenge: toBase64Url(payload), signature: await sign(payload) });
  }

  const token = cookieValue(request, COOKIE_NAME);
  const [encodedPayload = "", signature = ""] = token.split(".");
  if (!encodedPayload || !signature) return noStore({ authenticated: false }, { status: 401 });
  try {
    const payload = fromBase64Url(encodedPayload);
    const [username, expiresText] = payload.split(":");
    const authenticated = username === getEnv("DEMO_ADMIN_USERNAME") && Number(expiresText) > Date.now() && await verify(payload, signature);
    return noStore({ authenticated, username: authenticated ? username : undefined }, { status: authenticated ? 200 : 401 });
  } catch {
    return noStore({ authenticated: false }, { status: 401 });
  }
}

export async function POST(request: Request) {
  const body = await request.json() as { action?: string; username?: string; password?: string; captchaAnswer?: string; challenge?: string; signature?: string };
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  if (body.action === "logout") {
    const response = noStore({ success: true });
    response.headers.set("Set-Cookie", `${COOKIE_NAME}=; HttpOnly${secure}; SameSite=Strict; Path=/; Max-Age=0`);
    return response;
  }

  const username = body.username?.trim() ?? "";
  const password = body.password ?? "";
  if (password.length < 8 || !/[a-z]/.test(password) || !/\d/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
    return noStore({ error: "Username, password, atau CAPTCHA tidak valid." }, { status: 400 });
  }

  try {
    let validCaptcha = true;
    if (CAPTCHA_ENABLED) {
      const captchaPayload = fromBase64Url(body.challenge ?? "");
      const [first, second, expires] = captchaPayload.split(":").map(Number);
      validCaptcha = Number.isFinite(first) && Number.isFinite(second) && expires > Date.now() && Number(body.captchaAnswer) === first + second && await verify(captchaPayload, body.signature ?? "");
    }
    const validCredentials = username === getEnv("DEMO_ADMIN_USERNAME") && password === getEnv("DEMO_ADMIN_PASSWORD");
    if (!validCaptcha || !validCredentials) return noStore({ error: "Username, password, atau CAPTCHA tidak valid." }, { status: 401 });

    const sessionExpires = Date.now() + 8 * 60 * 60 * 1000;
    const payload = `${username}:${sessionExpires}`;
    const token = `${toBase64Url(payload)}.${await sign(payload)}`;
    const response = noStore({ success: true, username });
    response.headers.set("Set-Cookie", `${COOKIE_NAME}=${token}; HttpOnly${secure}; SameSite=Strict; Path=/; Max-Age=28800`);
    return response;
  } catch {
    return noStore({ error: "Permintaan login tidak dapat diverifikasi. Muat ulang CAPTCHA." }, { status: 400 });
  }
}
