"use client";

import {
  AlignLeft,
  BarChart3,
  Boxes,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronUp,
  CircleUserRound,
  Database,
  ExternalLink,
  Filter,
  Home,
  Layers3,
  ListFilter,
  Maximize,
  MessageCircle,
  Minus,
  MoreVertical,
  PackageSearch,
  Plus,
  RotateCw,
  Route,
  Settings,
  ShieldCheck,
  TrendingUp,
  UserRound,
  X,
} from "lucide-react";
import type { CSSProperties, ComponentType } from "react";
import { useMemo, useRef, useState } from "react";

type Region = {
  name: string;
  stock: string;
  capacity: string;
  percentage: number;
  left: string;
  top: string;
};

type FilterDropdownId = "dashboard" | "map-level" | "chart-size";

type FlowSource = {
  name: string;
  color: string;
  y: number;
  height: number;
  targets: number[];
};

type FlowTarget = {
  name: string;
  detail: string;
  color: string;
};

const filterDefaults = {
  dashboardType: "Persediaan",
  mapLevel: "Region",
  chartSize: "Select Chart Size",
  startDate: "2026-01-01",
  endDate: "2026-08-12",
};

const regions: Region[] = [
  {
    name: "SUMATERA",
    stock: "606.640,37 Ton",
    capacity: "765.202 Ton",
    percentage: 79.15,
    left: "25%",
    top: "35%",
  },
  {
    name: "KALIMANTAN",
    stock: "71.321,19 Ton",
    capacity: "146.860 Ton",
    percentage: 48.56,
    left: "45%",
    top: "43%",
  },
  {
    name: "JAWA",
    stock: "3.088.104,55 Ton",
    capacity: "3.308.942 Ton",
    percentage: 93.33,
    left: "38%",
    top: "68%",
  },
  {
    name: "SULAWESI",
    stock: "968.384 Ton",
    capacity: "1.109.982 Ton",
    percentage: 87.24,
    left: "56%",
    top: "47%",
  },
  {
    name: "BALI DAN NUSA\nTENGGARA",
    stock: "322.026,7 Ton",
    capacity: "283.804 Ton",
    percentage: 113.76,
    left: "55%",
    top: "73%",
  },
  {
    name: "MALUKU DAN\nMALUKU UTARA",
    stock: "15.682,06 Ton",
    capacity: "27.630 Ton",
    percentage: 56.76,
    left: "69%",
    top: "56%",
  },
  {
    name: "PAPUA",
    stock: "21.187,63 Ton",
    capacity: "53.425 Ton",
    percentage: 39.66,
    left: "82%",
    top: "60%",
  },
];

const nationalSummary = [
  ["VOLUME STOCK (TON)", "5.252.664,64 Ton"],
  ["KAPASITAS GUDANG (TON)", "5.695.125 Ton"],
  ["PERSEN", "92,23%"],
  ["UMUR 0–1 BULAN TON", "698.463,89 Ton"],
  ["UMUR 1–2 BULAN TON", "693.915,1 Ton"],
  ["UMUR 2–3 BULAN TON", "646.080,37 Ton"],
  ["UMUR 3–4 BULAN TON", "796.810,74 Ton"],
  ["UMUR DIATAS 4 BULAN TON", "2.418.665,9 Ton"],
  ["MAX UMUR SIMPAN", "58.2 bulan"],
  ["MIN UMUR SIMPAN", "2.0 hari"],
];

const navItems: { label: string; icon: ComponentType<{ size?: number }> }[] = [
  { label: "Beranda", icon: Home },
  { label: "Persediaan", icon: PackageSearch },
  { label: "Pengadaan", icon: BriefcaseBusiness },
  { label: "Pergerakan", icon: TrendingUp },
  { label: "Analitik", icon: BarChart3 },
  { label: "Basis data", icon: Database },
  { label: "Pengaturan", icon: Settings },
  { label: "Profil", icon: CircleUserRound },
];

const tabs = [
  { label: "Persediaan Beras", icon: Boxes },
  { label: "Rute Alternatif", icon: Route },
  { label: "Safety Stock", icon: ShieldCheck },
  { label: "Persediaan Non Beras", icon: Layers3 },
];

const sumatraFlow = {
  sources: [
    { name: "Lampung Selatan", color: "#1e619f", y: 76, height: 142, targets: [0, 1, 2, 3, 4, 5] },
    { name: "Tulang Bawang Barat", color: "#969a9d", y: 226, height: 54, targets: [4, 5] },
    { name: "Ogan Komering Ulu", color: "#db171d", y: 290, height: 72, targets: [3, 5, 6] },
  ] satisfies FlowSource[],
  targets: [
    { name: "Rejang Lebong", detail: "Sisa kap 1195 Ton (50%)", color: "#d91a69" },
    { name: "Bukit Tinggi", detail: "Sisa kap 3476 Ton (58%)", color: "#07826d" },
    { name: "Solok", detail: "Sisa kap 2206 Ton (44%)", color: "#168ff0" },
    { name: "Muara Bungo", detail: "Sisa kap 1652 Ton (67%)", color: "#909597" },
    { name: "Tangerang", detail: "Sisa kap 21939 Ton (29%)", color: "#55d27e" },
    { name: "Serang", detail: "Sisa kap 820 Ton (1%)", color: "#353535" },
    { name: "Palembang", detail: "Sisa kap 1844 Ton (38%)", color: "#ffa300" },
  ] satisfies FlowTarget[],
};

const baliNusraFlow = {
  sources: [
    { name: "Bima", color: "#dd151a", y: 76, height: 88, targets: [0, 1, 2, 3, 4, 5, 6, 7] },
    { name: "Sumbawa", color: "#07826d", y: 171, height: 108, targets: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
    { name: "Lombok Timur", color: "#168ff0", y: 286, height: 98, targets: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  ] satisfies FlowSource[],
  targets: [
    { name: "Labuan Bajo", detail: "Sisa kap 1786 Ton (54%)", color: "#ffa300" },
    { name: "Atambua", detail: "Sisa kap 2416 Ton (44%)", color: "#1f5b94" },
    { name: "Maumere", detail: "Sisa kap 25 Ton (1%)", color: "#db1769" },
    { name: "Pukentobi", detail: "Sisa kap 383 Ton (17%)", color: "#1495ef" },
    { name: "Ende", detail: "Sisa kap 703 Ton (40%)", color: "#ff762b" },
    { name: "Waikabubak", detail: "Sisa kap 731 Ton (29%)", color: "#56d17d" },
    { name: "Kalabahi", detail: "Sisa kap 1081 Ton (45%)", color: "#3d3d3d" },
    { name: "Lewoleba", detail: "Sisa kap 383 Ton (17%)", color: "#3b3b3b" },
    { name: "Waingapu", detail: "Sisa kap 526 Ton (24%)", color: "#24669d" },
    { name: "Bajawa", detail: "Sisa kap 1280 Ton (36%)", color: "#8e9295" },
    { name: "Ruteng", detail: "Sisa kap 2416 Ton (48%)", color: "#8d9193" },
  ] satisfies FlowTarget[],
};

const kanwilData = [
  { name: "ACEH", capacity: 1, stock: 12.5, capacityLabel: "0.00", stockLabel: "170RB", category: "<50%" },
  { name: "BALI", capacity: 9, stock: 6, capacityLabel: "135RB", stockLabel: "92.2RB", category: "50%-80%" },
  { name: "BENGKULU", capacity: 2.1, stock: 1.3, capacityLabel: "21.25RB", stockLabel: "12.7RB", category: "50%-80%" },
  { name: "DI YOGYAKARTA", capacity: 16.5, stock: 15.5, capacityLabel: "240RB", stockLabel: "226RB", category: ">80%" },
  { name: "DKI JAKARTA BANTEN", capacity: 27, stock: 14, capacityLabel: "388RB", stockLabel: "193RB", category: "<50%" },
  { name: "JABAR", capacity: 66, stock: 56, capacityLabel: "970RB", stockLabel: "824RB", category: ">80%" },
  { name: "JAMBI", capacity: 2.1, stock: 1.5, capacityLabel: "21.7RB", stockLabel: "19.7RB", category: "50%-80%" },
  { name: "JATENG", capacity: 32, stock: 30, capacityLabel: "443RB", stockLabel: "437RB", category: ">80%" },
  { name: "JATIM", capacity: 93, stock: 86, capacityLabel: "1.39JT", stockLabel: "1.29JT", category: ">80%" },
  { name: "KALBAR", capacity: 3, stock: 1.4, capacityLabel: "35.5RB", stockLabel: "13.4RB", category: "<50%" },
  { name: "KALSEL", capacity: 2.6, stock: 1.6, capacityLabel: "32.0RB", stockLabel: "20.0RB", category: "50%-80%" },
  { name: "KALTENG", capacity: 2.3, stock: 1.3, capacityLabel: "27.0RB", stockLabel: "17.0RB", category: "50%-80%" },
  { name: "KALTARA", capacity: 2.2, stock: 1.1, capacityLabel: "26.3RB", stockLabel: "16.6RB", category: "<50%" },
  { name: "LAMPUNG", capacity: 20, stock: 17, capacityLabel: "286RB", stockLabel: "247RB", category: ">80%" },
  { name: "MALUKU MALUT", capacity: 2.1, stock: 1, capacityLabel: "21.5RB", stockLabel: "9.3RB", category: "<50%" },
  { name: "N.T.B", capacity: 19, stock: 15, capacityLabel: "281RB", stockLabel: "213RB", category: ">80%" },
  { name: "N.T.T", capacity: 4.2, stock: 2.6, capacityLabel: "50.3RB", stockLabel: "28.5RB", category: "50%-80%" },
  { name: "PAPUA PABAR", capacity: 3.7, stock: 1.9, capacityLabel: "52.4RB", stockLabel: "19.4RB", category: "<50%" },
  { name: "RIAU DAN KEPRI", capacity: 3.5, stock: 1.6, capacityLabel: "43.7RB", stockLabel: "16.0RB", category: "<50%" },
  { name: "SULSEL SULBAR", capacity: 62, stock: 55, capacityLabel: "921RB", stockLabel: "826RB", category: ">80%" },
  { name: "SULTENG", capacity: 4, stock: 2.3, capacityLabel: "42.0RB", stockLabel: "22.0RB", category: "50%-80%" },
  { name: "SULTRA", capacity: 7.6, stock: 4.7, capacityLabel: "110RB", stockLabel: "63RB", category: ">80%" },
  { name: "SULUT GORONTALO", capacity: 3.3, stock: 1.5, capacityLabel: "31.4RB", stockLabel: "14.6RB", category: "<50%" },
  { name: "SUMBAR", capacity: 3.1, stock: 1.4, capacityLabel: "39.0RB", stockLabel: "12.1RB", category: "<50%" },
  { name: "SUMSEL BABEL", capacity: 13, stock: 10, capacityLabel: "178RB", stockLabel: "144RB", category: ">80%" },
  { name: "SUMUT", capacity: 7, stock: 3.1, capacityLabel: "96.9RB", stockLabel: "34.3RB", category: "<50%" },
];

const categoryColors: Record<string, string> = {
  ">80%": "#bd4325",
  "50%-80%": "#ffac00",
  "<50%": "#1f5a90",
};

function markerColor(value: number) {
  if (value > 80) return "#c84d28";
  if (value >= 50) return "#ffad0a";
  return "#175d93";
}

function RegionMarker({
  region,
  active,
  onSelect,
}: {
  region: Region;
  active: boolean;
  onSelect: () => void;
}) {
  const color = markerColor(region.percentage);
  const ringValue = Math.min(region.percentage, 100);
  const style = {
    left: region.left,
    top: region.top,
    "--marker": color,
    "--marker-soft": `${color}80`,
    "--value": `${ringValue * 3.6}deg`,
  } as CSSProperties;

  return (
    <button
      className={`region-marker${active ? " is-active" : ""}`}
      style={style}
      onClick={onSelect}
      aria-label={`Lihat data ${region.name.replace("\n", " ")}`}
    >
      <span className="region-marker__inner">
        <strong>{region.name}</strong>
        <i />
        <small>Stok</small>
        <b>{region.stock}</b>
        <small>Kapasitas: {region.capacity}</small>
        <em>{region.percentage.toFixed(2).replace(".", ",")}%</em>
      </span>
    </button>
  );
}

function FilterSelect({
  id,
  label,
  value,
  options,
  open,
  onToggle,
  onChange,
}: {
  id: FilterDropdownId;
  label: string;
  value: string;
  options: string[];
  open: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
}) {
  return (
    <div className={`filter-field filter-field--select${open ? " is-open" : ""}`}>
      <span className="filter-label" id={`${id}-label`}>{label}</span>
      <button
        type="button"
        className="filter-select-button"
        onClick={onToggle}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-controls={`${id}-options`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span id={`${id}-value`}>{value}</span>
        {open ? <ChevronUp size={25} /> : <ChevronDown size={25} />}
      </button>
      {open && (
        <div className="filter-options" id={`${id}-options`} role="listbox" aria-labelledby={`${id}-label`}>
          {options.map((option) => (
            <button
              type="button"
              key={option}
              role="option"
              aria-selected={value === option}
              className={value === option ? "selected" : ""}
              onClick={() => onChange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function formatDashboardDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function CardTools({ onMore, count = 1 }: { onMore: () => void; count?: number }) {
  return (
    <div className="card-tools">
      <span><ListFilter size={14} /><b>{count}</b></span>
      <button type="button" onClick={onMore} aria-label="Opsi kartu"><MoreVertical size={20} /></button>
    </div>
  );
}

function RouteFlowDiagram({
  title,
  sources,
  targets,
  onMore,
}: {
  title: string;
  sources: FlowSource[];
  targets: FlowTarget[];
  onMore: () => void;
}) {
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const targetStep = targets.length > 8 ? 29 : 42;
  const targetStart = targets.length > 8 ? 42 : 50;

  return (
    <section className="route-flow-card">
      <div className="route-flow-title">
        <strong>{title}</strong>
        <CardTools onMore={onMore} />
      </div>
      <div className="route-flow-scroll">
        <div className="route-flow-canvas">
          {sources.flatMap((source) =>
            source.targets.map((targetIndex, linkIndex) => {
              const x1 = 65;
              const x2 = 925;
              const y1 = source.y + 12 + ((linkIndex + 1) * (source.height - 24)) / (source.targets.length + 1);
              const y2 = targetStart + targetIndex * targetStep + 11;
              const dx = x2 - x1;
              const dy = y2 - y1;
              const length = Math.sqrt(dx * dx + dy * dy);
              const angle = Math.atan2(dy, dx) * (180 / Math.PI);
              const muted = selectedSource !== null && selectedSource !== source.name;
              return (
                <span
                  aria-hidden="true"
                  className={`route-flow-link${muted ? " muted" : ""}`}
                  key={`${source.name}-${targetIndex}`}
                  style={{
                    left: x1,
                    top: y1,
                    width: length,
                    height: Math.max(7, 13 - linkIndex * 0.55),
                    background: source.color,
                    transform: `rotate(${angle}deg)`,
                  }}
                />
              );
            }),
          )}

          {sources.map((source) => (
            <button
              type="button"
              className={`route-source${selectedSource === source.name ? " selected" : ""}`}
              key={source.name}
              style={{ top: source.y, height: source.height, borderColor: source.color }}
              onClick={() => setSelectedSource((value) => value === source.name ? null : source.name)}
              aria-pressed={selectedSource === source.name}
            >
              <i style={{ background: source.color }} />
              <span>{source.name}</span>
            </button>
          ))}

          {targets.map((target, index) => (
            <button
              type="button"
              className="route-target"
              key={target.name}
              style={{ top: targetStart + index * targetStep }}
              onClick={() => setSelectedSource(null)}
              title={`${target.name}, ${target.detail}`}
            >
              <i style={{ background: target.color }} />
              <span><b>{target.name}</b>, {target.detail}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="route-flow-hint">Klik wilayah pengirim untuk menyorot alurnya.</p>
    </section>
  );
}

export default function HomePage() {
  const [legendOpen, setLegendOpen] = useState(true);
  const [summaryOpen, setSummaryOpen] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState("NASIONAL");
  const [level, setLevel] = useState("Region");
  const [activeNav, setActiveNav] = useState("Beranda");
  const [activeTab, setActiveTab] = useState("Persediaan Beras");
  const [filterOpen, setFilterOpen] = useState(false);
  const [openFilterDropdown, setOpenFilterDropdown] = useState<FilterDropdownId | null>(null);
  const [dashboardType, setDashboardType] = useState(filterDefaults.dashboardType);
  const [mapLevel, setMapLevel] = useState(filterDefaults.mapLevel);
  const [chartSize, setChartSize] = useState(filterDefaults.chartSize);
  const [startDate, setStartDate] = useState(filterDefaults.startDate);
  const [endDate, setEndDate] = useState(filterDefaults.endDate);
  const [appliedDashboardType, setAppliedDashboardType] = useState(filterDefaults.dashboardType);
  const [appliedChartSize, setAppliedChartSize] = useState(filterDefaults.chartSize);
  const [appliedStartDate, setAppliedStartDate] = useState(filterDefaults.startDate);
  const [appliedEndDate, setAppliedEndDate] = useState(filterDefaults.endDate);
  const [chatOpen, setChatOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [zoom, setZoom] = useState(5);
  const [toast, setToast] = useState("");
  const [chartCategory, setChartCategory] = useState("all");
  const [chartInverted, setChartInverted] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const selectedLabel = selectedRegion.replace("\n", " ");
  const lastUpdated = useMemo(
    () => (refreshCount ? "Baru saja" : "11 Agustus 2026 · 08:30 WIB"),
    [refreshCount],
  );

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function refreshData() {
    setRefreshing(true);
    window.setTimeout(() => {
      setRefreshing(false);
      setRefreshCount((count) => count + 1);
      showToast("Data peta berhasil diperbarui");
    }, 850);
  }

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) await mapRef.current?.requestFullscreen();
      else await document.exitFullscreen();
    } catch {
      showToast("Mode fullscreen tidak tersedia di perangkat ini");
    }
  }

  function toggleFilterPanel() {
    setFilterOpen((value) => !value);
    setOpenFilterDropdown(null);
  }

  function applyFilter() {
    setAppliedDashboardType(dashboardType);
    setAppliedChartSize(chartSize);
    setAppliedStartDate(startDate);
    setAppliedEndDate(endDate);
    setLevel(mapLevel);
    setFilterOpen(false);
    setOpenFilterDropdown(null);
    showToast(`Filter ${dashboardType} berhasil diterapkan`);
  }

  function resetFilter() {
    setDashboardType(filterDefaults.dashboardType);
    setMapLevel(filterDefaults.mapLevel);
    setChartSize(filterDefaults.chartSize);
    setStartDate(filterDefaults.startDate);
    setEndDate(filterDefaults.endDate);
    setOpenFilterDropdown(null);
    showToast("Filter dikembalikan ke pengaturan awal");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand" aria-label="Bulog">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>bulog</span>
        </div>
        <button className="menu-button" aria-label="Buka menu utama">
          <AlignLeft size={19} />
        </button>
        <div className="topbar-spacer" />
        <span className="version-pill">v0.0.0.74</span>
        <div className="profile-wrap">
          <button
            className="profile-button"
            onClick={() => setProfileOpen((value) => !value)}
            aria-expanded={profileOpen}
          >
            <span className="avatar"><UserRound size={20} /></span>
            <span>superadmin</span>
            <ChevronDown size={18} />
          </button>
          {profileOpen && (
            <div className="profile-menu">
              <strong>Super Administrator</strong>
              <span>superadmin@bulog.co.id</span>
              <button onClick={() => showToast("Halaman profil dibuka")}>Lihat profil</button>
            </div>
          )}
        </div>
      </header>

      <aside className="side-rail" aria-label="Navigasi utama">
        <nav>
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={activeNav === label ? "active" : ""}
              aria-label={label}
              title={label}
              onClick={() => {
                setActiveNav(label);
                if (label !== "Beranda") showToast(`${label} dipilih`);
              }}
            >
              <Icon size={19} />
            </button>
          ))}
        </nav>
        <span className="rail-version">v0.0.0.74</span>
      </aside>

      <section className="workspace">
        <div className="title-bar">
          <h1>Dashboard {appliedDashboardType}</h1>
          <span>({formatDashboardDate(appliedStartDate)} – {formatDashboardDate(appliedEndDate)})</span>
          <button
            type="button"
            className="title-bar__detail"
            onClick={() => {
              setSummaryOpen(true);
              mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
              showToast(`Detail wilayah ${selectedLabel} ditampilkan`);
            }}
          >
            Detail Wilayah
          </button>
        </div>

        <button
          className={`filter-handle${filterOpen ? " active" : ""}`}
          aria-label="Buka filter"
          onClick={toggleFilterPanel}
        >
          <Filter size={23} />
        </button>

        <section className="map-card" aria-label="Peta persediaan nasional">
          <div className="map-stage" ref={mapRef}>
            <iframe
              key={`${refreshCount}-${zoom}`}
              className="google-map"
              title="Google Maps wilayah Indonesia"
              src={`https://www.google.com/maps?q=Indonesia&z=${zoom}&output=embed&hl=id`}
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="map-tint" aria-hidden="true" />

            <div className="map-controls map-controls--left">
              <button
                className="legend-toggle"
                onClick={() => setLegendOpen((value) => !value)}
                aria-expanded={legendOpen}
              >
                Legend
                {legendOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <label className="level-select">
                <span>Level</span>
                <select value={level} onChange={(event) => setLevel(event.target.value)}>
                  <option>Region</option>
                  <option>Kanwil</option>
                  <option>Gudang</option>
                </select>
              </label>
              {legendOpen && (
                <div className="legend-card">
                  <strong>Keterpakaian Gudang:</strong>
                  <span><i className="dot dot--danger" />&gt;80%</span>
                  <span><i className="dot dot--warning" />50% - 80%</span>
                  <span><i className="dot dot--primary" />&lt;50%</span>
                </div>
              )}
            </div>

            <div className="zoom-controls" aria-label="Kontrol zoom peta">
              <button aria-label="Perbesar peta" onClick={() => setZoom((value) => Math.min(value + 1, 8))}><Plus size={18} /></button>
              <button aria-label="Perkecil peta" onClick={() => setZoom((value) => Math.max(value - 1, 4))}><Minus size={18} /></button>
            </div>

            <button className="map-fullscreen" onClick={toggleFullscreen} aria-label="Tampilkan peta penuh">
              <Maximize size={21} />
            </button>

            <div className={`marker-layer${refreshing ? " is-refreshing" : ""} chart-${appliedChartSize.toLowerCase()}`}>
              {regions.map((region) => (
                <RegionMarker
                  key={region.name}
                  region={region}
                  active={selectedRegion === region.name}
                  onSelect={() => setSelectedRegion(region.name)}
                />
              ))}
            </div>

            <aside className={`summary-panel${summaryOpen ? "" : " collapsed"}`}>
              <button
                className="summary-heading"
                onClick={() => setSummaryOpen((value) => !value)}
                aria-expanded={summaryOpen}
              >
                <span>RINGKASAN ({selectedLabel})</span>
                {summaryOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>
              {summaryOpen && (
                <div className="summary-list">
                  {selectedRegion === "NASIONAL" ? (
                    nationalSummary.map(([label, value]) => (
                      <div key={label}>
                        <span>{label}</span>
                        <strong>{value}</strong>
                      </div>
                    ))
                  ) : (
                    <>
                      <div><span>WILAYAH</span><strong>{selectedLabel}</strong></div>
                      <div><span>VOLUME STOCK</span><strong>{regions.find((item) => item.name === selectedRegion)?.stock}</strong></div>
                      <div><span>KAPASITAS GUDANG</span><strong>{regions.find((item) => item.name === selectedRegion)?.capacity}</strong></div>
                      <div><span>KETERPAKAIAN</span><strong>{regions.find((item) => item.name === selectedRegion)?.percentage.toFixed(2).replace(".", ",")}%</strong></div>
                      <button className="national-button" onClick={() => setSelectedRegion("NASIONAL")}>
                        Kembali ke Nasional
                      </button>
                    </>
                  )}
                </div>
              )}
            </aside>

            <span className="map-update">Terakhir diperbarui: {lastUpdated}</span>
          </div>
        </section>

        <div className="action-row">
          <button onClick={refreshData} disabled={refreshing}>
            Refresh Map Data
            <RotateCw size={18} className={refreshing ? "spin" : ""} />
          </button>
          <button onClick={toggleFullscreen}>
            Fullscreen Analytic Dashboard
            <ExternalLink size={18} />
          </button>
        </div>

        <nav className="dashboard-tabs" aria-label="Bagian dashboard">
          {tabs.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={activeTab === label ? "active" : ""}
              onClick={() => {
                setActiveTab(label);
                if (label !== "Persediaan Beras") showToast(`${label} aktif`);
              }}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>

        {activeTab === "Persediaan Beras" && (
          <section className="inventory-analytics" aria-label="Analitik persediaan beras">
            <div className="active-filter-bar">
              <Filter size={18} />
              <strong>Filter aktif:</strong>
              <span><b>Wilayah:</b> {level}</span>
              <span><b>Periode:</b> {formatDashboardDate(appliedStartDate)} – {formatDashboardDate(appliedEndDate)}</span>
              <button type="button" onClick={() => setFilterOpen(true)}>Ubah</button>
            </div>

            <article className="report-panel">
              <header className="report-panel__header">
                <h2>SCCT - Dashboard Persediaan ({appliedDashboardType})</h2>
                <button type="button" onClick={() => showToast("Menu dashboard dibuka")} aria-label="Opsi dashboard"><MoreVertical size={24} /></button>
              </header>
              <div className="report-panel__body">
                <div className="sync-grid">
                  <section className="stat-card stat-card--sync">
                    <div className="stat-card__head">
                      <strong>Status Pembaruan Data ERP</strong>
                      <CardTools onMore={() => showToast("Detail status ERP dibuka")} />
                    </div>
                    <p>Selasa, 11 Agustus 2026 23:58:48</p>
                  </section>
                  <section className="stat-card stat-card--sync">
                    <div className="stat-card__head">
                      <strong>Sync Terakhir Pipeline</strong>
                      <CardTools onMore={() => showToast("Detail pipeline dibuka")} />
                    </div>
                    <p>Rabu, 12 Agustus 2026 02:25:57</p>
                  </section>
                </div>

                <h3 className="analytics-heading">STATUS STOK NASIONAL TERKINI</h3>
                <div className="national-metrics">
                  {[
                    ["Total Stok Keseluruhan", "5.252.664,64", "Ton"],
                    ["Kapasitas Gudang Keseluruhan", "5.695.125", "Ton"],
                    ["Persentase Gudang Terpakai", "92,23", "Persen (%)"],
                  ].map(([title, value, unit]) => (
                    <section className="stat-card stat-card--metric" key={title}>
                      <div className="stat-card__head">
                        <strong>{title}</strong>
                        <CardTools onMore={() => showToast(`Detail ${title} dibuka`)} />
                      </div>
                      <p><b>{value}</b><span>{unit}</span></p>
                    </section>
                  ))}
                </div>

                <div className="analytics-rule" aria-hidden="true" />

                <h3 className="analytics-heading analytics-heading--chart">STOK DAN KAPASITAS BERDASARKAN KANWIL DAN KANCAB</h3>
                <div className="kanwil-layout">
                  <section className="kanwil-chart-card" aria-label="Grafik stok dan kapasitas per Kanwil">
                    <div className="kanwil-chart-title">
                      <strong>Stok dan Kapasitas per Kanwil</strong>
                      <CardTools onMore={() => showToast("Opsi grafik dibuka")} />
                    </div>
                    <div className="chart-legend">
                      {[">80%", "<50%", "50%-80%"].map((category) => (
                        <span key={category}><i style={{ background: categoryColors[category] }} />Kapasitas Gudang, {category}</span>
                      ))}
                      {[">80%", "<50%", "50%-80%"].map((category) => (
                        <span key={`stock-${category}`}><i style={{ background: categoryColors[category] }} />Total Stok, {category}</span>
                      ))}
                      <button type="button" onClick={() => setChartCategory("all")}>All</button>
                      <button type="button" className={chartInverted ? "active" : ""} onClick={() => setChartInverted((value) => !value)}>Inv</button>
                    </div>
                    <div className="chart-scroll">
                      <div className="chart-plot">
                        <div className="y-axis-labels" aria-hidden="true">
                          <span>1.50JT</span><span>1.20JT</span><span>900RB</span><span>600RB</span><span>300RB</span><span>0.00</span>
                        </div>
                        <div className="bars-grid">
                          {kanwilData.map((item) => {
                            const muted = chartCategory !== "all" && chartCategory !== item.category;
                            return (
                              <div className={`bar-column${chartInverted ? " inverted" : ""}${muted ? " muted" : ""}`} key={item.name}>
                                <div className="bar-pair">
                                  <span className="bar" style={{ height: `${item.capacity}%`, background: categoryColors[item.category] }}><i>{item.capacityLabel}</i></span>
                                  <span className="bar" style={{ height: `${item.stock}%`, background: categoryColors[item.category] }}><i>{item.stockLabel}</i></span>
                                </div>
                                <b>{item.name}</b>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </section>

                  <aside className="chart-category-panel">
                    <div className="category-title"><strong>Kategori</strong><MoreVertical size={22} /></div>
                    <div className="category-buttons">
                      {[">80%", "50%-80%", "<50%"].map((category) => (
                        <button
                          type="button"
                          key={category}
                          className={chartCategory === category ? "selected" : ""}
                          style={{ background: categoryColors[category] }}
                          onClick={() => setChartCategory((value) => value === category ? "all" : category)}
                        >
                          {category === "50%-80%" ? "50%-80%" : category}
                        </button>
                      ))}
                    </div>
                    <p>Klik pada salah satu kategori untuk memfilter Diagram Batang di samping.</p>
                    <p>Klik ulang pada kategori terpilih untuk membatalkan filter.</p>
                  </aside>
                </div>
              </div>
            </article>
          </section>
        )}

        {activeTab === "Rute Alternatif" && (
          <section className="inventory-analytics route-analytics" aria-label="Analitik rute alternatif">
            <div className="active-filter-bar">
              <Filter size={18} />
              <strong>Filter aktif:</strong>
              <span><b>Wilayah:</b> {level}</span>
              <span><b>Periode:</b> {formatDashboardDate(appliedStartDate)} – {formatDashboardDate(appliedEndDate)}</span>
              <button type="button" onClick={() => setFilterOpen(true)}>Ubah</button>
            </div>

            <article className="report-panel">
              <header className="report-panel__header">
                <h2>SCCT - Dashboard Persediaan (Rute Alternatif)</h2>
                <button type="button" onClick={() => showToast("Menu rute alternatif dibuka")} aria-label="Opsi dashboard"><MoreVertical size={24} /></button>
              </header>
              <div className="report-panel__body route-report-body">
                <div className="sync-grid">
                  <section className="stat-card stat-card--sync">
                    <div className="stat-card__head">
                      <strong>Status Pembaruan Data ERP</strong>
                      <MoreVertical size={22} className="route-status-more" />
                    </div>
                    <p>Selasa, 11 Agustus 2026 23:58:48</p>
                  </section>
                  <section className="stat-card stat-card--sync">
                    <div className="stat-card__head">
                      <strong>Sync Terakhir Pipeline</strong>
                      <MoreVertical size={22} className="route-status-more" />
                    </div>
                    <p>Rabu, 12 Agustus 2026 02:25:57</p>
                  </section>
                </div>

                <h3 className="analytics-heading route-visual-heading">VISUALISASI ALUR RUTE ALTERNATIF</h3>
                <div className="route-flow-stack">
                  <RouteFlowDiagram
                    title="Rute Alternatif Region Pengirim Sumatra (Kiri) Ke Penerima (Kanan)"
                    sources={sumatraFlow.sources}
                    targets={sumatraFlow.targets}
                    onMore={() => showToast("Opsi rute Sumatra dibuka")}
                  />
                  <RouteFlowDiagram
                    title="Rute Alternatif Region Pengirim Bali & Nusa Tenggara (Kiri) Ke Penerima (Kanan)"
                    sources={baliNusraFlow.sources}
                    targets={baliNusraFlow.targets}
                    onMore={() => showToast("Opsi rute Bali & Nusa Tenggara dibuka")}
                  />
                </div>
              </div>
            </article>
          </section>
        )}

        {activeTab === "Safety Stock" && (
          <section className="inventory-analytics safety-stock-analytics" aria-label="Analitik safety stock">
            <div className="active-filter-bar">
              <Filter size={18} />
              <strong>Filter aktif:</strong>
              <span><b>Wilayah:</b> {level}</span>
              <span><b>Periode:</b> {formatDashboardDate(appliedStartDate)} – {formatDashboardDate(appliedEndDate)}</span>
              <button type="button" onClick={() => setFilterOpen(true)}>Ubah</button>
            </div>

            <article className="report-panel">
              <header className="report-panel__header">
                <h2>SCCT - Dashboard Persediaan (Safety Stock)</h2>
                <button type="button" onClick={() => showToast("Menu safety stock dibuka")} aria-label="Opsi dashboard"><MoreVertical size={24} /></button>
              </header>
              <div className="report-panel__body safety-stock-report-body">
                <div className="sync-grid">
                  <section className="stat-card stat-card--sync">
                    <div className="stat-card__head">
                      <strong>Status Pembaruan Data ERP</strong>
                      <CardTools onMore={() => showToast("Detail status ERP dibuka")} />
                    </div>
                    <p>Selasa, 11 Agustus 2026 23:58:48</p>
                  </section>
                  <section className="stat-card stat-card--sync">
                    <div className="stat-card__head">
                      <strong>Sync Terakhir Pipeline</strong>
                      <CardTools onMore={() => showToast("Detail pipeline dibuka")} />
                    </div>
                    <p>Rabu, 12 Agustus 2026 02:25:57</p>
                  </section>
                </div>

                <h3 className="analytics-heading safety-stock-heading">STATUS STOK TERHADAP SAFETY STOCK</h3>
                <div className="national-metrics safety-stock-metrics">
                  {[
                    ["Total Stok Setara Beras", "5.252.664,64", "Ton"],
                    ["Total Safety Stock", "375.003", "Ton"],
                    ["% Stok terhadap Safety Stock", "1.400,7", "Persen (%)"],
                  ].map(([title, value, unit]) => (
                    <section className="stat-card stat-card--metric" key={title}>
                      <div className="stat-card__head">
                        <strong>{title}</strong>
                        <CardTools onMore={() => showToast(`Detail ${title} dibuka`)} />
                      </div>
                      <p><b>{value}</b><span>{unit}</span></p>
                    </section>
                  ))}
                </div>

                <div className="analytics-rule safety-stock-rule" aria-hidden="true" />
              </div>
            </article>
          </section>
        )}

        {activeTab === "Persediaan Non Beras" && (
          <section className="inventory-analytics non-rice-analytics" aria-label="Analitik persediaan komoditi non beras">
            <div className="active-filter-bar non-rice-filter-bar">
              <Filter size={18} />
              <strong>Filter aktif:</strong>
              <span><b>Komoditas:</b> BERAS, BERAS PREMIUM (+5 lainnya)</span>
              <span><b>Wilayah:</b> {level}</span>
              <span><b>Periode:</b> {formatDashboardDate(appliedStartDate)} – {formatDashboardDate(appliedEndDate)}</span>
              <button type="button" onClick={() => setFilterOpen(true)}>Ubah</button>
            </div>

            <article className="report-panel">
              <header className="report-panel__header">
                <h2>SCCT - Dashboard Persediaan (Persediaan Komoditi Non Beras)</h2>
                <button type="button" onClick={() => showToast("Menu persediaan non beras dibuka")} aria-label="Opsi dashboard"><MoreVertical size={24} /></button>
              </header>
              <div className="report-panel__body non-rice-report-body">
                <div className="sync-grid">
                  <section className="stat-card stat-card--sync">
                    <div className="stat-card__head">
                      <strong>Status Pembaruan Data ERP</strong>
                      <MoreVertical size={22} className="route-status-more" />
                    </div>
                    <p>Selasa, 11 Agustus 2026 23:58:48</p>
                  </section>
                  <section className="stat-card stat-card--sync">
                    <div className="stat-card__head">
                      <strong>Sync Terakhir Pipeline</strong>
                      <MoreVertical size={22} className="route-status-more" />
                    </div>
                    <p>Rabu, 12 Agustus 2026 02:25:57</p>
                  </section>
                </div>

                <h3 className="analytics-heading non-rice-heading">STATUS STOK NASIONAL TERKINI</h3>
                <div className="national-metrics non-rice-metrics">
                  {[
                    ["Total Stok Keseluruhan", "176.908,92", "Ton"],
                    ["Kapasitas Gudang Keseluruhan", "5.695.125", "Ton"],
                    ["Persentase Gudang Terpakai", "3,11", "Persen (%)"],
                  ].map(([title, value, unit]) => (
                    <section className="stat-card stat-card--metric" key={title}>
                      <div className="stat-card__head">
                        <strong>{title}</strong>
                        <CardTools count={2} onMore={() => showToast(`Detail ${title} dibuka`)} />
                      </div>
                      <p><b>{value}</b><span>{unit}</span></p>
                    </section>
                  ))}
                </div>

                <div className="analytics-rule non-rice-rule" aria-hidden="true" />
              </div>
            </article>
          </section>
        )}
      </section>

      <aside
        className={`filter-drawer${filterOpen ? " open" : ""}`}
        aria-hidden={!filterOpen}
        aria-label="Filter dashboard"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            if (openFilterDropdown) setOpenFilterDropdown(null);
            else setFilterOpen(false);
          }
        }}
      >
        <div className="filter-title">
          <strong>Filter</strong>
          <button onClick={() => { setFilterOpen(false); setOpenFilterDropdown(null); }} aria-label="Tutup filter"><X size={30} /></button>
        </div>
        <div className="filter-body">
          <FilterSelect
            id="dashboard"
            label="Dashboard Type"
            value={dashboardType}
            options={["Persediaan", "Pengadaan", "Penjualan", "Keuangan", "Eksekutif"]}
            open={openFilterDropdown === "dashboard"}
            onToggle={() => setOpenFilterDropdown((value) => value === "dashboard" ? null : "dashboard")}
            onChange={(value) => { setDashboardType(value); setOpenFilterDropdown(null); }}
          />
          <FilterSelect
            id="map-level"
            label="Map Level"
            value={mapLevel}
            options={["Region", "Kanwil", "Kancab", "Gudang"]}
            open={openFilterDropdown === "map-level"}
            onToggle={() => setOpenFilterDropdown((value) => value === "map-level" ? null : "map-level")}
            onChange={(value) => { setMapLevel(value); setOpenFilterDropdown(null); }}
          />
          <FilterSelect
            id="chart-size"
            label="Chart Size"
            value={chartSize}
            options={["Select Chart Size", "Small", "Medium", "Large"]}
            open={openFilterDropdown === "chart-size"}
            onToggle={() => setOpenFilterDropdown((value) => value === "chart-size" ? null : "chart-size")}
            onChange={(value) => { setChartSize(value); setOpenFilterDropdown(null); }}
          />
          <div className="filter-date-row">
            <label className="filter-field filter-field--date">
              <span className="filter-label">Start Date</span>
              <input type="date" value={startDate} max={endDate} onChange={(event) => setStartDate(event.target.value)} />
            </label>
            <label className="filter-field filter-field--date">
              <span className="filter-label">End Date</span>
              <input type="date" value={endDate} min={startDate} onChange={(event) => setEndDate(event.target.value)} />
            </label>
          </div>
        </div>
        <div className="filter-actions">
          <button className="apply-filter" onClick={applyFilter}>Apply Filter</button>
          <button className="reset-filter" onClick={resetFilter}>Reset Filter</button>
        </div>
      </aside>

      <button className="chat-fab" aria-label="Buka pusat bantuan" onClick={() => setChatOpen((value) => !value)}>
        {chatOpen ? <X size={23} /> : <MessageCircle size={25} />}
      </button>
      {chatOpen && (
        <section className="chat-card">
          <small>PUSAT BANTUAN SCCT</small>
          <strong>Halo, superadmin!</strong>
          <p>Ada yang bisa kami bantu terkait data persediaan hari ini?</p>
          <button onClick={() => showToast("Pesan diteruskan ke tim SCCT")}>Hubungi tim SCCT</button>
        </section>
      )}

      {toast && <div className="toast"><Check size={16} />{toast}</div>}
    </main>
  );
}
