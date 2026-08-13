"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  BarChart3,
  BellRing,
  Bot,
  Boxes,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChartNoAxesCombined,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  CircleHelp,
  CircleDollarSign,
  Clock3,
  CircleUserRound,
  Database,
  FileChartColumn,
  FlaskConical,
  ExternalLink,
  Filter,
  Gauge,
  Home,
  Layers3,
  ListFilter,
  LogOut,
  Maximize,
  MapPinned,
  MessageCircle,
  Minus,
  MoreVertical,
  PackageSearch,
  Plus,
  Play,
  RotateCw,
  Save,
  Send,
  Share2,
  Ship,
  Route,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
  Truck,
  UserRound,
  Warehouse,
  WalletCards,
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

type WarehouseRecord = {
  id: string;
  name: string;
  region: string;
  kanwil: string;
  kancab: string;
  longitude: string;
  latitude: string;
  address: string;
  units: string;
  condition: string;
  facilities: string;
  closeDate: string;
  capacity: string;
  stock: string;
  usedPercentage: string;
  products: string;
  commodities: string;
};

type KancabNode = {
  code: string;
  name: string;
  warehouses: WarehouseRecord[];
};

type KanwilNode = {
  code: string;
  name: string;
  kancabs: KancabNode[];
};

type SidebarItem = {
  label: string;
  icon: ComponentType<{ size?: number }>;
  children?: string[];
};

type SidebarSection = {
  title: string;
  items: SidebarItem[];
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

const sidebarSections: SidebarSection[] = [
  {
    title: "BERANDA",
    items: [
      { label: "National Dashboard", icon: Home },
      { label: "National Overview", icon: BarChart3 },
      { label: "Target vs Realisasi", icon: Target },
      { label: "Regional Performance", icon: ChartNoAxesCombined },
      { label: "National Exceptions", icon: AlertTriangle },
    ],
  },
  {
    title: "SUPPLY CHAIN MONITORING",
    items: [
      { label: "Persediaan", icon: PackageSearch, children: ["Ringkasan Persediaan", "Kapasitas Gudang", "Aging & Kualitas", "Mutasi Stok", "Safety Stock", "Simulasi Persediaan"] },
      { label: "Pengadaan", icon: BriefcaseBusiness, children: ["Ringkasan Pengadaan", "Kinerja Wilayah", "Sumber Pengadaan", "Tren & Proyeksi", "Gap Analysis", "Simulasi Pengadaan"] },
      { label: "Penjualan & Penyaluran", icon: TrendingUp, children: ["Ringkasan Penjualan & Penyaluran", "Penjualan Komersial", "Penyaluran Program", "Kinerja Wilayah", "Order Fulfillment", "Simulasi Penyaluran"] },
      { label: "Distribusi", icon: Truck, children: ["Ringkasan Distribusi", "Monitoring Pengiriman", "Kinerja Rute", "Kinerja OTIF", "Exception Distribusi", "Simulasi Distribusi"] },
      { label: "Keuangan", icon: WalletCards, children: ["Ringkasan Keuangan", "Pendapatan", "Biaya Supply Chain", "Piutang", "Budget vs Actual", "Simulasi Dampak Keuangan"] },
      { label: "Alert & Exception", icon: BellRing, children: ["Alert Center", "My Cases", "SLA Monitoring", "Exception History", "Alert Rules"] },
    ],
  },
  {
    title: "DECISION INTELLIGENCE",
    items: [
      { label: "AI Decision Center", icon: BrainCircuit, children: ["Executive AI Insights", "Risiko & Peluang", "Root Cause Analysis", "Prioritas Tindakan", "Recommendation Center"] },
      { label: "Scenario Workspace", icon: FlaskConical, children: ["Scenario Overview", "Buat Skenario", "Perbandingan Skenario", "Skenario Tersimpan", "Template Skenario"] },
      { label: "Simulasi What-If", icon: SlidersHorizontal, children: ["Rice Outflow Optimizer", "Shortage & Surplus", "Lonjakan Permintaan", "Rute & Moda", "Aging & Risiko Disposal", "Dampak Harga SPHP"] },
      { label: "Prediksi AI", icon: ChartNoAxesCombined, children: ["Demand Forecasting", "Supply Forecasting", "Prediksi Shortage & Surplus", "Prediksi Mutu Stok", "Price Forecasting", "Akurasi Model"] },
      { label: "Optimasi & Rekomendasi", icon: Sparkles, children: ["Optimasi Safety Stock", "Optimasi Alokasi Stok", "Optimasi Pengadaan", "Optimasi Rute & Moda", "Rekomendasi Redistribusi"] },
      { label: "AI Orchestration", icon: Bot, children: ["Recommendation Queue", "Orchestration Rules", "Action Monitoring", "Automation History"] },
      { label: "Approval Center", icon: Check, children: ["Menunggu Persetujuan", "Disetujui", "Ditolak", "Delegasi Persetujuan"] },
      { label: "Decision History", icon: Clock3, children: ["Riwayat Simulasi", "Riwayat Prediksi", "Riwayat Rekomendasi", "Riwayat Persetujuan", "Decision Audit Trail"] },
    ],
  },
  {
    title: "REPORT & GOVERNANCE",
    items: [
      { label: "Executive Report", icon: FileChartColumn, children: ["Executive Snapshot", "Laporan Harian", "Laporan Mingguan", "Laporan Bulanan", "Report Builder", "Laporan Terjadwal", "Riwayat Laporan"] },
      { label: "Data Quality", icon: Database, children: ["Data Health Overview", "Data Freshness", "Completeness", "Consistency", "Data Issues", "Riwayat Perbaikan"] },
      { label: "Integration Monitoring", icon: Activity, children: ["Integration Overview", "Status Sumber Data", "Sinkronisasi Data", "Integration Logs", "Failed Transactions"] },
    ],
  },
  {
    title: "MASTER DATA",
    items: [
      { label: "Organisasi & Lokasi", icon: Warehouse, children: ["Wilayah", "Kanwil", "Kancab", "Gudang", "Titik Penyaluran"] },
      { label: "Produk & Komoditas", icon: Boxes, children: ["Komoditas", "Produk", "Satuan", "Klasifikasi Mutu"] },
      { label: "Program & Transaksi", icon: FileChartColumn, children: ["Program Penyaluran", "Jenis Transaksi", "Kanal Penjualan", "Sumber Pengadaan"] },
      { label: "Mitra", icon: UserRound, children: ["Pemasok", "Transporter", "Pelanggan", "Kelompok Tani"] },
      { label: "Parameter", icon: SlidersHorizontal, children: ["Safety Stock", "Target KPI", "Threshold Alert", "SLA", "Kalender Operasional"] },
    ],
  },
  {
    title: "ADMINISTRATION",
    items: [
      { label: "User Management", icon: CircleUserRound, children: ["User", "Role", "Permission", "Organisasi Pengguna", "Status Pengguna"] },
      { label: "Dashboard Management", icon: BarChart3, children: ["Dashboard", "Widget", "Menu", "Saved View", "Executive Layout"] },
      { label: "Alert Configuration", icon: BellRing, children: ["Alert Rules", "Severity", "Notification Rules", "Escalation Rules", "SLA Rules"] },
      { label: "AI Configuration", icon: BrainCircuit, children: ["Model Configuration", "AI Prompt Template", "Recommendation Rules", "Confidence Threshold", "Orchestration Policy"] },
      { label: "Security", icon: ShieldCheck, children: ["Authentication", "Session & Idle Timeout", "Access Policy", "API Access", "Login History"] },
      { label: "System", icon: Settings, children: ["General Setting", "Notification", "Audit Trail", "Application Logs", "System Information"] },
    ],
  },
  {
    title: "AKUN",
    items: [
      { label: "Profil Saya", icon: CircleUserRound },
      { label: "Preferensi", icon: Settings },
      { label: "Bantuan", icon: CircleHelp },
      { label: "Keluar", icon: LogOut },
    ],
  },
];

const tabs = [
  { label: "Persediaan Beras", icon: Boxes },
  { label: "Rute Alternatif", icon: Route },
  { label: "Safety Stock", icon: ShieldCheck },
  { label: "Persediaan Non Beras", icon: Layers3 },
];

const warehouseTree: KanwilNode[] = [
  {
    code: "01001",
    name: "KANWIL ACEH",
    kancabs: [
      {
        code: "01010",
        name: "KANCAB LHOKSEUMAWE",
        warehouses: [
          {
            id: "ulee-blang-mane",
            name: "Kompleks Pergudangan Ulee Blang Mane",
            region: "Sumatra",
            kanwil: "KANWIL ACEH",
            kancab: "KANCAB LHOKSEUMAWE",
            longitude: "97.1744613647461",
            latitude: "5.117623805999756",
            address: "Jl. Banda Aceh - Medan, Ds. Ulee Blang Mane, Kec. Blang Mangat, Kab. Aceh Utara",
            units: "9",
            condition: "Baik",
            facilities: "-",
            closeDate: "31/08/2026",
            capacity: "0",
            stock: "0",
            usedPercentage: "0",
            products: "0",
            commodities: "0",
          },
          {
            id: "siron",
            name: "Kompleks Pergudangan Siron",
            region: "Sumatra",
            kanwil: "KANWIL ACEH",
            kancab: "KANCAB LHOKSEUMAWE",
            longitude: "95.402226",
            latitude: "5.480812",
            address: "Siron, Kec. Ingin Jaya, Kabupaten Aceh Besar, Aceh",
            units: "6",
            condition: "Baik",
            facilities: "CCTV, Timbangan",
            closeDate: "31/08/2026",
            capacity: "18.500",
            stock: "12.420",
            usedPercentage: "67,14",
            products: "4",
            commodities: "3",
          },
          {
            id: "cot-bau",
            name: "Kompleks Pergudangan Cot Ba'u",
            region: "Sumatra",
            kanwil: "KANWIL ACEH",
            kancab: "KANCAB LHOKSEUMAWE",
            longitude: "96.835718",
            latitude: "5.157194",
            address: "Cot Ba'u, Kabupaten Bireuen, Aceh",
            units: "4",
            condition: "Baik",
            facilities: "Timbangan",
            closeDate: "31/08/2026",
            capacity: "12.000",
            stock: "8.760",
            usedPercentage: "73,00",
            products: "3",
            commodities: "2",
          },
        ],
      },
      { code: "01020", name: "KANCAB LANGSA", warehouses: [] },
      { code: "01030", name: "KANCAB MEULABOH", warehouses: [] },
      { code: "01040", name: "KANCAB SIGLI", warehouses: [] },
      { code: "01050", name: "KANCAB KUTACANE", warehouses: [] },
      { code: "01060", name: "KANCAB BLANG PIDIE", warehouses: [] },
      { code: "01070", name: "KANCAB TAKENGON", warehouses: [] },
    ],
  },
  { code: "02001", name: "KANWIL SUMUT", kancabs: [] },
  { code: "03001", name: "KANWIL RIAU DAN KEPRI", kancabs: [] },
  { code: "04001", name: "KANWIL SUMBAR", kancabs: [] },
  { code: "05001", name: "KANWIL JAMBI", kancabs: [] },
  { code: "06001", name: "KANWIL SUMSEL", kancabs: [] },
  { code: "07001", name: "KANWIL BENGKULU", kancabs: [] },
];

const allWarehouses = warehouseTree.flatMap((kanwil) =>
  kanwil.kancabs.flatMap((kancab) => kancab.warehouses),
);

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

function NationalOverviewPage({ onNotify }: { onNotify: (message: string) => void }) {
  const [period, setPeriod] = useState("Year to Date");
  const [commodity, setCommodity] = useState("Semua Komoditas");
  const [area, setArea] = useState("Nasional");
  const [program, setProgram] = useState("Semua Program");
  const [refreshingOverview, setRefreshingOverview] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("12 Agustus 2026, 08:24 WIB");

  const kpis = [
    { title: "Persediaan", value: "5.252.665 ton", target: "Target 4,80 juta ton", progress: 100, result: "109,5% tercapai", delta: "+9,5%", status: "On Track", tone: "good" },
    { title: "Pengadaan", value: "2.850.000 ton", target: "Target 3,63 juta ton", progress: 78, result: "78% tercapai", delta: "-22%", status: "At Risk", tone: "risk" },
    { title: "Penjualan & Penyaluran", value: "3,91 juta ton", target: "Target 4,44 juta ton", progress: 88.2, result: "88,2% tercapai", delta: "-526 rb ton", status: "Watch", tone: "watch" },
    { title: "Keuangan", value: "Rp31,60 T", target: "Target Rp34,20 T", progress: 92.4, result: "92,4% tercapai", delta: "-Rp2,60 T", status: "Watch", tone: "watch" },
  ];
  const exceptions = [
    { severity: "Critical", title: "Stok di bawah safety stock", meta: "Kanwil Papua • Persediaan", value: "8 hari", target: "Target 14 hari", state: "Baru" },
    { severity: "Critical", title: "Kapasitas gudang melebihi batas", meta: "Kanwil Bali • Gudang", value: "111%", target: "Target ≤ 80%", state: "Ditugaskan" },
    { severity: "High", title: "Realisasi pengadaan tertinggal", meta: "Kanwil Jawa Barat • Pengadaan", value: "72%", target: "Target 91%", state: "Diproses" },
    { severity: "High", title: "OTIF di bawah standar", meta: "Kanwil Sulselbar • Distribusi", value: "82,4%", target: "Target ≥ 95%", state: "Diproses" },
  ];
  const regions = [
    { name: "Jawa Timur", value: 104, status: "On Track" },
    { name: "Jawa Tengah", value: 98, status: "Watch" },
    { name: "Sulselbar", value: 94, status: "Watch" },
    { name: "Sumatera Utara", value: 91, status: "Watch" },
    { name: "Jawa Barat", value: 82, status: "At Risk" },
    { name: "Papua", value: 68, status: "Critical" },
  ];

  function refreshOverview() {
    setRefreshingOverview(true);
    window.setTimeout(() => {
      setRefreshingOverview(false);
      setLastUpdated("Baru saja");
      onNotify("National Overview berhasil diperbarui");
    }, 700);
  }

  function resetOverviewFilters() {
    setPeriod("Year to Date");
    setCommodity("Semua Komoditas");
    setArea("Nasional");
    setProgram("Semua Program");
    onNotify("Filter National Overview direset");
  }

  return (
    <section className="national-overview-page" aria-label="National Overview">
      <header className="overview-page-header">
        <div>
          <span className="overview-breadcrumb">COMMAND CENTER / NATIONAL OVERVIEW</span>
          <h1>National Overview</h1>
          <p>Ringkasan rantai pasok BULOG, pencapaian target, dan exception yang memerlukan tindak lanjut.</p>
        </div>
        <div className="overview-updated"><i /><Clock3 size={15} />Data diperbarui {lastUpdated}</div>
      </header>

      <section className="overview-filter-panel" aria-label="Filter National Overview">
        {[
          ["Periode", period, ["Year to Date", "Bulan Berjalan", "30 Hari Terakhir"]],
          ["Komoditas", commodity, ["Semua Komoditas", "Beras", "Gula", "Jagung"]],
          ["Wilayah", area, ["Nasional", "Sumatra", "Jawa", "Kalimantan", "Sulawesi", "Bali & Nusa Tenggara", "Maluku & Papua"]],
          ["Program", program, ["Semua Program", "Komersial", "SPHP", "Bantuan Pangan"]],
        ].map(([label, value, options]) => (
          <label key={label as string}>
            <span>{label as string}</span>
            <select
              value={value as string}
              onChange={(event) => {
                const next = event.target.value;
                if (label === "Periode") setPeriod(next);
                if (label === "Komoditas") setCommodity(next);
                if (label === "Wilayah") setArea(next);
                if (label === "Program") setProgram(next);
              }}
            >
              {(options as string[]).map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
        ))}
        <div className="overview-filter-actions">
          <button type="button" className="overview-reset" onClick={resetOverviewFilters}>Reset</button>
          <button type="button" className="overview-refresh" onClick={refreshOverview} aria-label="Perbarui data"><RotateCw size={19} className={refreshingOverview ? "spin" : ""} /></button>
          <button type="button" className="overview-share" onClick={() => onNotify("Snapshot National Overview siap dibagikan")}><Share2 size={17} />Bagikan Snapshot</button>
        </div>
      </section>

      <div className="overview-scope">
        <strong>MENAMPILKAN</strong><span>{period}</span><i /> <span>{commodity}</span><i /> <span>{area}</span><i /> <span>{program}</span>
      </div>

      <section className="overview-hero" aria-label="Narasi kondisi nasional">
        <div className="overview-health-score">
          <span>PERLU PERHATIAN</span>
          <div><strong>78</strong><small>Supply Chain<br />Health Score</small></div>
        </div>
        <div className="overview-national-narrative">
          <h2>Kinerja nasional memerlukan perhatian terarah</h2>
          <p>Persediaan nasional berada di atas target, namun pencapaian pengadaan baru 78%. Terdapat ketimpangan stok antarwilayah serta 18 alert aktif pada cakupan yang dipilih.</p>
          <h3><Sparkles size={16} /> Rekomendasi tindakan hari ini</h3>
          <ol>
            <li>Validasi 3 exception kritis dan tetapkan PIC sebelum pukul 10.00 WIB.</li>
            <li>Percepat realisasi pengadaan Jawa Barat dan koridor dengan gap terbesar.</li>
            <li>Siapkan redistribusi stok dari wilayah surplus ke Papua dan wilayah berisiko.</li>
          </ol>
        </div>
        <div className="overview-hero-stats">
          {[["18", "Alert aktif"], ["3", "Kritis"], ["5", "Lewat SLA"], ["7/12", "KPI on track"]].map(([value, label]) => (
            <div key={label}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>
      </section>

      <div className="overview-upper-grid">
        <section className="overview-panel overview-priority-panel">
          <div className="overview-panel-heading">
            <div><span>PRIORITAS PENANGANAN</span><h2><b>18</b> Alert Aktif</h2></div>
            <button type="button" onClick={() => onNotify("Alert Center dibuka")}>Lihat semua <ChevronRight size={15} /></button>
          </div>
          <div className="overview-severity-grid">
            {[["3", "Critical", "critical"], ["5", "High", "high"], ["8", "Medium", "medium"], ["2", "Low", "low"]].map(([value, label, tone]) => (
              <div className={`severity-card ${tone}`} key={label}><i /><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
          <div className="overview-domain-bars">
            {[["Persediaan", 7], ["Pengadaan", 5], ["Distribusi", 3], ["Keuangan", 2], ["Kualitas Data", 1]].map(([label, value]) => (
              <div key={label as string}><span>{label}</span><i><b style={{ width: `${Number(value) * 13}%` }} /></i><strong>{value}</strong></div>
            ))}
          </div>
          <p className="overview-priority-note"><AlertTriangle size={15} /><b>+3 alert</b> dibandingkan kemarin. Lima alert telah melewati SLA dan memerlukan eskalasi.</p>
        </section>

        <section className="overview-panel overview-action-panel">
          <div className="overview-panel-heading"><div><span>REKOMENDASI TINDAKAN HARI INI</span><h2>Fokus Eksekusi</h2></div><Target size={25} /></div>
          <div className="overview-actions-list">
            {[
              ["01", "Eskalasi stok kritis Papua", "Redistribusi 8.500 ton dari Jawa Timur; keputusan dibutuhkan hari ini.", "Persediaan", "Kritis"],
              ["02", "Pulihkan trajectory pengadaan", "Naikkan serapan harian menjadi 21.500 ton pada 4 Kanwil prioritas.", "Pengadaan", "Tinggi"],
              ["03", "Normalisasi OTIF Sulselbar", "Validasi kapasitas transporter dan alihkan rute berisiko.", "Distribusi", "Tinggi"],
            ].map(([no, title, copy, domain, priority]) => (
              <button type="button" key={no} onClick={() => onNotify(`${title} dipilih`)}>
                <b>{no}</b><span><strong>{title}</strong><small>{copy}</small><em>{domain} • {priority}</em></span><ChevronRight size={17} />
              </button>
            ))}
          </div>
        </section>
      </div>

      <section className="overview-panel overview-kpi-panel">
        <div className="overview-panel-heading"><div><span>KINERJA UTAMA • YEAR TO DATE</span><h2>Target vs Realisasi</h2></div><button type="button" onClick={() => onNotify("Analisis KPI dibuka")}>Analisis lengkap <ChevronRight size={15} /></button></div>
        <div className="overview-kpi-grid">
          {kpis.map((kpi) => (
            <article key={kpi.title}>
              <header><strong>{kpi.title}</strong><span className={kpi.tone}>{kpi.status}</span></header>
              <p>{kpi.value}</p><small>{kpi.target}</small>
              <i><b style={{ width: `${kpi.progress}%` }} /></i>
              <footer><strong>{kpi.result}</strong><span>{kpi.delta}</span></footer>
            </article>
          ))}
        </div>
      </section>

      <div className="overview-lower-grid">
        <section className="overview-panel overview-exception-panel">
          <div className="overview-panel-heading"><div><span>EXCEPTION BERDAMPAK TINGGI</span><h2>Prioritas Tindakan Nasional</h2></div><button type="button" onClick={() => onNotify("Exception Center dibuka")}>Kelola exception <ChevronRight size={15} /></button></div>
          <div className="overview-exception-list">
            {exceptions.map((item) => (
              <button type="button" key={item.title} onClick={() => onNotify(`${item.title} dibuka`)}>
                <span className={`exception-badge ${item.severity.toLowerCase()}`}>{item.severity}</span>
                <span className="exception-name"><strong>{item.title}</strong><small>{item.meta}</small></span>
                <span className="exception-value"><strong>{item.value}</strong><small>{item.target}</small></span>
                <span className="exception-state">{item.state}</span><ChevronRight size={17} />
              </button>
            ))}
          </div>
        </section>

        <section className="overview-panel overview-region-panel">
          <div className="overview-panel-heading"><div><span>PERFORMA WILAYAH</span><h2>Ranking Kanwil</h2></div><button type="button" onClick={() => onNotify("Seluruh wilayah dibuka")}>Semua wilayah <ChevronRight size={15} /></button></div>
          <div className="overview-ranking-list">
            {regions.map((region, index) => (
              <div key={region.name}><b>{index + 1}</b><span><strong>{region.name}</strong><i><em style={{ width: `${Math.min(region.value, 100)}%` }} /></i></span><span><strong>{region.value}%</strong><small>{region.status}</small></span></div>
            ))}
          </div>
        </section>
      </div>

      <footer className="overview-data-footer">
        <Activity size={20} /><div><strong>Status Data Control Tower</strong><span>ERP, WMS, TMS, dan data keuangan telah tersinkron. Pembaruan terakhir: {lastUpdated}.</span></div><button type="button" onClick={() => onNotify("Status integrasi data dibuka")}>Lihat status integrasi <ChevronRight size={15} /></button>
      </footer>
    </section>
  );
}

function RiceOutflowOptimizerPage({ onNotify }: { onNotify: (message: string) => void }) {
  const [objective, setObjective] = useState<"balanced" | "risk" | "cost">("balanced");
  const [horizon, setHorizon] = useState("180 hari");
  const [targetVolume, setTargetVolume] = useState("5.000.000");
  const [selectedRoute, setSelectedRoute] = useState("Jawa Timur → Papua");
  const [running, setRunning] = useState(false);
  const [approvalState, setApprovalState] = useState("Draf simulasi");
  const [lastSimulation, setLastSimulation] = useState("13 Agustus 2026, 08:42 WIB");

  const scenarios = {
    balanced: {
      name: "Seimbang",
      description: "Menekan risiko mutu tanpa melampaui pagar biaya dan kapasitas penerima.",
      daily: "27.800",
      logistics: "Rp2,35 T",
      avoidedLoss: "Rp910 M",
      completion: "96,4%",
      riskReduction: 78,
      costIndex: 72,
      service: 96,
    },
    risk: {
      name: "Risiko Mutu Minimum",
      description: "Mendahulukan lot kritis dan rute tercepat meski biaya lebih tinggi.",
      daily: "31.500",
      logistics: "Rp2,78 T",
      avoidedLoss: "Rp1,08 T",
      completion: "98,1%",
      riskReduction: 92,
      costIndex: 58,
      service: 98,
    },
    cost: {
      name: "Biaya Minimum",
      description: "Memaksimalkan konsolidasi moda dan utilisasi muatan.",
      daily: "24.100",
      logistics: "Rp1,96 T",
      avoidedLoss: "Rp730 M",
      completion: "89,7%",
      riskReduction: 64,
      costIndex: 89,
      service: 90,
    },
  };

  const routes = [
    { route: "Jawa Timur → Papua", origin: "Surabaya", destination: "Jayapura", volume: "320.000", mode: "Kapal + truk", depart: "14–22 Agu", risk: 92, loss: "Rp176 M", status: "Siap diajukan" },
    { route: "Sulselbar → NTT", origin: "Makassar", destination: "Kupang", volume: "185.000", mode: "Kapal", depart: "15–25 Agu", risk: 87, loss: "Rp94 M", status: "Slot dikonfirmasi" },
    { route: "Lampung → DKI/Banten", origin: "Bandar Lampung", destination: "Tangerang", volume: "250.000", mode: "Truk + kereta", depart: "14–20 Agu", risk: 81, loss: "Rp121 M", status: "Perlu validasi" },
    { route: "Sumut → Aceh", origin: "Medan", destination: "Lhokseumawe", volume: "96.000", mode: "Truk", depart: "16–28 Agu", risk: 76, loss: "Rp47 M", status: "Siap dijadwalkan" },
    { route: "Jawa Tengah → Kalbar", origin: "Semarang", destination: "Pontianak", volume: "210.000", mode: "Kapal + truk", depart: "18–31 Agu", risk: 73, loss: "Rp88 M", status: "Perlu kapasitas" },
  ];

  const activeScenario = scenarios[objective];
  const activeRoute = routes.find((item) => item.route === selectedRoute) ?? routes[0];

  function runSimulation() {
    setRunning(true);
    setApprovalState("Draf simulasi");
    window.setTimeout(() => {
      setRunning(false);
      setLastSimulation("Baru saja");
      onNotify(`Skenario ${activeScenario.name} selesai dihitung`);
    }, 900);
  }

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="optimizer-page" aria-label="Rice Outflow Optimizer">
      <header className="optimizer-header">
        <div>
          <span className="optimizer-breadcrumb">DECISION INTELLIGENCE / SIMULASI WHAT-IF</span>
          <h1>Rice Outflow Optimizer</h1>
          <p>Menentukan stok yang harus keluar, tenggat, tujuan, moda, dan kecepatan distribusi sebelum terjadi penurunan mutu.</p>
        </div>
        <div className="optimizer-header-actions">
          <span className="optimizer-data-state"><i /><Clock3 size={15} /> Data simulasi diperbarui {lastSimulation}</span>
          <button type="button" className="optimizer-secondary-button" onClick={() => onNotify("Skenario disimpan")}><Save size={16} />Simpan Skenario</button>
          <button
            type="button"
            className="optimizer-primary-button"
            onClick={() => {
              setApprovalState("Menunggu persetujuan");
              onNotify("Rekomendasi dikirim ke Approval Center");
            }}
          ><Send size={16} />Ajukan Persetujuan</button>
        </div>
      </header>

      <div className="optimizer-status-row">
        <span className={`optimizer-status-pill ${approvalState === "Menunggu persetujuan" ? "pending" : ""}`}><i />{approvalState}</span>
        <span>Model: ROO v2.4</span><i />
        <span>Cakupan: Nasional</span><i />
        <span>Komoditas: Beras CBP</span><i />
        <span>Horizon: {horizon}</span>
      </div>

      <nav className="optimizer-tabs" aria-label="Navigasi Rice Outflow Optimizer">
        <button type="button" onClick={() => scrollToSection("optimizer-summary")}>Ringkasan</button>
        <button type="button" onClick={() => scrollToSection("optimizer-scenario")}>Konfigurasi Skenario</button>
        <button type="button" onClick={() => scrollToSection("optimizer-recommendation")}>Rekomendasi & Eksekusi</button>
        <button type="button" onClick={() => scrollToSection("optimizer-data")}>Data & Audit</button>
      </nav>

      <section className="optimizer-alert" id="optimizer-summary">
        <span><AlertTriangle size={22} /></span>
        <div>
          <strong>Keputusan diperlukan untuk ±5 juta ton stok beras</strong>
          <p>Laju outflow aktual sekitar <b>1.200 ton/hari</b>, jauh di bawah target operasional <b>7.100 ton/hari</b>. Sebanyak <b>2,42 juta ton</b> telah berumur lebih dari 4 bulan dengan eksposur potensi rugi hingga <b>Rp1,2 triliun</b>.</p>
        </div>
        <button type="button" onClick={() => scrollToSection("optimizer-recommendation")}>Lihat prioritas <ArrowRight size={16} /></button>
      </section>

      <section className="optimizer-flow" aria-label="Alur closed-loop optimizer">
        {[
          ["01", "APA", "Deteksi Aging", "Identifikasi lot FEFO, mutu, dan stok berisiko.", Clock3],
          ["02", "KAPAN", "Risk & Deadline", "Hitung jam mundur sebelum turun mutu.", ShieldCheck],
          ["03", "KE MANA", "Rute & Moda", "Uji tujuan, kapasitas, biaya, dan SLA.", MapPinned],
          ["04", "SEBERAPA CEPAT", "Jadwal Optimal", "Susun urutan keberangkatan dan volume harian.", Gauge],
          ["05", "EKSEKUSI", "Approve & Monitor", "Human approval, dispatch, dan audit trail.", CheckCircle2],
        ].map(([number, label, title, copy, Icon], index) => {
          const StepIcon = Icon as ComponentType<{ size?: number }>;
          return (
            <article key={label as string}>
              <div className="optimizer-step-top"><span>{number as string}</span><StepIcon size={21} /></div>
              <small>{label as string}</small><strong>{title as string}</strong><p>{copy as string}</p>
              {index < 4 && <ArrowRight size={17} className="optimizer-flow-arrow" />}
            </article>
          );
        })}
      </section>

      <div className="optimizer-working-grid" id="optimizer-scenario">
        <section className="optimizer-card optimizer-config-card">
          <header><div><span>KONFIGURASI SKENARIO</span><h2>Asumsi & Pagar Operasional</h2></div><SlidersHorizontal size={23} /></header>
          <div className="optimizer-fields">
            <label><span>Target stok keluar (ton)</span><input value={targetVolume} onChange={(event) => setTargetVolume(event.target.value)} inputMode="numeric" /></label>
            <label><span>Horizon eksekusi</span><select value={horizon} onChange={(event) => setHorizon(event.target.value)}><option>90 hari</option><option>180 hari</option><option>270 hari</option></select></label>
            <label><span>Cakupan sumber</span><select defaultValue="Nasional"><option>Nasional</option><option>Sumatra</option><option>Jawa</option><option>Sulawesi</option><option>Maluku & Papua</option></select></label>
            <label><span>Program tujuan</span><select defaultValue="Semua kanal"><option>Semua kanal</option><option>SPHP</option><option>Bantuan Pangan</option><option>Komersial</option></select></label>
          </div>
          <fieldset className="optimizer-objectives">
            <legend>Tujuan optimasi</legend>
            {(["balanced", "risk", "cost"] as const).map((key) => (
              <button type="button" key={key} className={objective === key ? "active" : ""} onClick={() => setObjective(key)}>
                <span>{key === "balanced" ? <SlidersHorizontal size={17} /> : key === "risk" ? <ShieldCheck size={17} /> : <CircleDollarSign size={17} />}</span>
                <strong>{scenarios[key].name}</strong><small>{key === "balanced" ? "Biaya • mutu • layanan" : key === "risk" ? "Prioritas stok kritis" : "Konsolidasi termurah"}</small>
              </button>
            ))}
          </fieldset>
          <div className="optimizer-constraints">
            <span><Check size={13} />FEFO wajib</span><span><Check size={13} />Min. safety stock terjaga</span><span><Check size={13} />Kapasitas gudang penerima ≤ 85%</span><span><Check size={13} />HPP/HET & SLA dipatuhi</span>
          </div>
          <button type="button" className="optimizer-run" onClick={runSimulation} disabled={running}><Play size={17} />{running ? "Menghitung 1.284 kombinasi…" : "Jalankan Simulasi"}</button>
        </section>

        <section className="optimizer-card optimizer-result-card">
          <header><div><span>HASIL SKENARIO DIREKOMENDASIKAN</span><h2>{activeScenario.name}</h2></div><span className="optimizer-confidence">Confidence 91%</span></header>
          <p className="optimizer-result-copy">{activeScenario.description}</p>
          <div className="optimizer-result-kpis">
            <article><span>Target outflow</span><strong>{targetVolume}</strong><small>ton / {horizon}</small></article>
            <article><span>Kebutuhan harian</span><strong>{activeScenario.daily}</strong><small>ton per hari</small></article>
            <article><span>Biaya logistik</span><strong>{activeScenario.logistics}</strong><small>estimasi simulasi</small></article>
            <article><span>Kerugian dihindari</span><strong>{activeScenario.avoidedLoss}</strong><small>estimasi model</small></article>
          </div>
          <div className="optimizer-score-list">
            {[["Reduksi risiko mutu", activeScenario.riskReduction], ["Efisiensi biaya", activeScenario.costIndex], ["Service level", activeScenario.service]].map(([label, value]) => (
              <div key={label as string}><span>{label as string}</span><i><b style={{ width: `${value}%` }} /></i><strong>{value}%</strong></div>
            ))}
          </div>
          <div className="optimizer-result-note"><Sparkles size={17} /><p><strong>Rekomendasi AI</strong> Jalankan gelombang pertama 851.000 ton pada 5 koridor prioritas. Slot kapal dan kapasitas penerima perlu dikunci maksimal 24 jam.</p></div>
        </section>
      </div>

      <section className="optimizer-card optimizer-comparison-card">
        <header><div><span>PERBANDINGAN SKENARIO</span><h2>Trade-off Keputusan</h2></div><button type="button" onClick={() => onNotify("Perbandingan skenario diekspor")}><Share2 size={15} />Bagikan</button></header>
        <div className="optimizer-comparison-grid">
          {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map((key) => {
            const item = scenarios[key];
            return <button type="button" className={objective === key ? "selected" : ""} key={key} onClick={() => setObjective(key)}><span>{item.name}{objective === key && <b>Direkomendasikan</b>}</span><strong>{item.daily} <small>ton/hari</small></strong><div><em>Biaya {item.logistics}</em><em>Loss avoided {item.avoidedLoss}</em><em>Selesai {item.completion}</em></div></button>;
          })}
        </div>
      </section>

      <section className="optimizer-card optimizer-recommendation-card" id="optimizer-recommendation">
        <header><div><span>REKOMENDASI & EKSEKUSI</span><h2>Gelombang 1 • Koridor Prioritas</h2></div><div className="optimizer-recommendation-summary"><strong>851.000 ton</strong><span>5 koridor • loss avoided Rp526 M</span></div></header>
        <div className="optimizer-route-head"><span>Koridor</span><span>Volume</span><span>Moda</span><span>Jadwal keluar</span><span>Risk score</span><span>Status kesiapan</span></div>
        <div className="optimizer-routes">
          {routes.map((item, index) => (
            <button type="button" key={item.route} className={selectedRoute === item.route ? "selected" : ""} onClick={() => setSelectedRoute(item.route)}>
              <span className="optimizer-route-name"><b>{index + 1}</b><span><strong>{item.route}</strong><small>{item.origin} → {item.destination}</small></span></span>
              <span><strong>{item.volume}</strong><small>ton</small></span>
              <span><Ship size={15} />{item.mode}</span><span>{item.depart}</span>
              <span className={`optimizer-risk ${item.risk >= 85 ? "critical" : "high"}`}><b>{item.risk}</b>/100</span>
              <span className="optimizer-ready-state">{item.status}<ChevronRight size={15} /></span>
            </button>
          ))}
        </div>
        <div className="optimizer-route-detail">
          <div><span>KORIDOR TERPILIH</span><h3>{activeRoute.route}</h3><p>Prioritas ditentukan dari aging lot, penurunan mutu, gap stok tujuan, kesiapan moda, biaya, dan SLA.</p></div>
          <div><span>VOLUME</span><strong>{activeRoute.volume} ton</strong><small>{activeRoute.mode}</small></div>
          <div><span>RISIKO AWAL</span><strong>{activeRoute.risk}/100</strong><small>Turun menjadi 28 setelah eksekusi</small></div>
          <div><span>LOSS AVOIDED</span><strong>{activeRoute.loss}</strong><small>Estimasi model</small></div>
          <button type="button" onClick={() => onNotify(`Rencana ${activeRoute.route} dibuka`)}>Buka Rencana <ArrowRight size={15} /></button>
        </div>
      </section>

      <div className="optimizer-bottom-grid" id="optimizer-data">
        <section className="optimizer-card optimizer-data-card">
          <header><div><span>DATA READINESS</span><h2>Kesiapan Input Model</h2></div><Activity size={22} /></header>
          <div className="optimizer-data-list">
            {[["WMS", "Aging, kapasitas, okupansi", 99.2], ["Inventory", "Stok CBP & mutu per lot", 98.6], ["TMS / Simlog", "Moda, armada, rute, tarif", 96.1], ["IoT Gudang", "Suhu & kelembapan", 91.4], ["Data Eksternal", "Jarak, kapal, cuaca, harga", 95.8]].map(([name, copy, score]) => (
              <div key={name as string}><span><strong>{name as string}</strong><small>{copy as string}</small></span><i><b style={{ width: `${score}%` }} /></i><strong>{score}%</strong><CheckCircle2 size={15} /></div>
            ))}
          </div>
        </section>
        <section className="optimizer-card optimizer-audit-card">
          <header><div><span>GOVERNANCE & AUDIT</span><h2>Closed-loop dengan Human Approval</h2></div><ShieldCheck size={22} /></header>
          <ol>
            <li className="done"><i><Check size={13} /></i><span><strong>Input tervalidasi</strong><small>1.284 kombinasi rute dan moda lolos data quality.</small></span><time>08:40</time></li>
            <li className="done"><i><Check size={13} /></i><span><strong>Model menghasilkan rekomendasi</strong><small>Guardrail safety stock, HPP/HET, SLA diterapkan.</small></span><time>08:42</time></li>
            <li><i>3</i><span><strong>Review operasional</strong><small>Menunggu konfirmasi slot, armada, dan kapasitas penerima.</small></span><time>Pending</time></li>
            <li><i>4</i><span><strong>Persetujuan & dispatch</strong><small>Otorisasi pejabat berwenang sebelum instruksi dikirim.</small></span><time>—</time></li>
          </ol>
        </section>
      </div>

      <footer className="optimizer-disclaimer"><AlertTriangle size={16} /><span><strong>Mode simulasi.</strong> Angka pada halaman ini adalah data contoh untuk perancangan UI/UX dan harus dihubungkan ke WMS, ERP, TMS/Simlog, IoT, serta aturan resmi BULOG sebelum digunakan untuk keputusan operasional.</span></footer>
    </section>
  );
}

function WarehouseDetailPage({ onBack, onNotify }: { onBack: () => void; onNotify: (message: string) => void }) {
  const [search, setSearch] = useState("");
  const [expandedKanwil, setExpandedKanwil] = useState<string[]>(["01001"]);
  const [expandedKancab, setExpandedKancab] = useState<string[]>(["01010"]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState("ulee-blang-mane");

  const selectedWarehouse = allWarehouses.find((warehouse) => warehouse.id === selectedWarehouseId) ?? allWarehouses[0];
  const filteredTree = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("id-ID");
    if (!query) return warehouseTree;

    return warehouseTree.flatMap((kanwil) => {
      const kanwilMatches = `${kanwil.code} ${kanwil.name}`.toLocaleLowerCase("id-ID").includes(query);
      const matchingKancabs = kanwil.kancabs.flatMap((kancab) => {
        const kancabMatches = `${kancab.code} ${kancab.name}`.toLocaleLowerCase("id-ID").includes(query);
        const matchingWarehouses = kancab.warehouses.filter((warehouse) =>
          `${warehouse.name} ${warehouse.address}`.toLocaleLowerCase("id-ID").includes(query),
        );
        return kanwilMatches || kancabMatches || matchingWarehouses.length
          ? [{ ...kancab, warehouses: kanwilMatches || kancabMatches ? kancab.warehouses : matchingWarehouses }]
          : [];
      });
      return kanwilMatches || matchingKancabs.length ? [{ ...kanwil, kancabs: matchingKancabs }] : [];
    });
  }, [search]);

  function toggleItem(value: string, items: string[], update: (next: string[]) => void) {
    update(items.includes(value) ? items.filter((item) => item !== value) : [...items, value]);
  }

  return (
    <section className="warehouse-detail-page" aria-label="Detail wilayah persediaan">
      <header className="warehouse-detail-heading">
        <h1>Persediaan – {selectedWarehouse.name}</h1>
      </header>

      <div className="warehouse-detail-shell">
        <aside className="warehouse-tree-panel" aria-label="Daftar Kanwil, Kancab, dan Gudang">
          <div className="warehouse-tree-actions">
            <label>
              <span className="sr-only">Cari berdasarkan nama</span>
              <input
                type="search"
                placeholder="Search by Name"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <button type="button" onClick={onBack} aria-label="Kembali ke dashboard persediaan" title="Kembali ke dashboard">
              <ArrowLeft size={24} />
            </button>
          </div>

          <nav className="warehouse-tree" aria-label="Hierarki gudang">
            {filteredTree.length ? filteredTree.map((kanwil) => {
              const kanwilOpen = search.trim().length > 0 || expandedKanwil.includes(kanwil.code);
              return (
                <div className="warehouse-tree__kanwil" key={kanwil.code}>
                  <button
                    type="button"
                    className="warehouse-tree__node warehouse-tree__node--kanwil"
                    onClick={() => toggleItem(kanwil.code, expandedKanwil, setExpandedKanwil)}
                    aria-expanded={kanwilOpen}
                  >
                    {kanwilOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    <span>{kanwil.code} - {kanwil.name}</span>
                  </button>

                  {kanwilOpen && (
                    <div className="warehouse-tree__children warehouse-tree__children--kanwil">
                      {kanwil.kancabs.length ? kanwil.kancabs.map((kancab) => {
                        const kancabOpen = search.trim().length > 0 || expandedKancab.includes(kancab.code);
                        return (
                          <div className="warehouse-tree__kancab" key={kancab.code}>
                            <button
                              type="button"
                              className="warehouse-tree__node warehouse-tree__node--kancab"
                              onClick={() => toggleItem(kancab.code, expandedKancab, setExpandedKancab)}
                              aria-expanded={kancabOpen}
                            >
                              {kancabOpen ? <ChevronDown size={17} /> : <ChevronRight size={17} />}
                              <span>{kancab.code} - {kancab.name}</span>
                            </button>

                            {kancabOpen && (
                              <div className="warehouse-tree__children warehouse-tree__children--kancab">
                                {kancab.warehouses.length ? kancab.warehouses.map((warehouse) => (
                                  <button
                                    type="button"
                                    key={warehouse.id}
                                    className={`warehouse-tree__warehouse${selectedWarehouse.id === warehouse.id ? " active" : ""}`}
                                    onClick={() => setSelectedWarehouseId(warehouse.id)}
                                  >
                                    <Warehouse size={21} />
                                    <span>{warehouse.name}</span>
                                  </button>
                                )) : <span className="warehouse-tree__empty">Belum ada data gudang</span>}
                              </div>
                            )}
                          </div>
                        );
                      }) : <span className="warehouse-tree__empty">Belum ada data Kancab</span>}
                    </div>
                  )}
                </div>
              );
            }) : <p className="warehouse-tree__not-found">Data tidak ditemukan.</p>}
          </nav>
        </aside>

        <div className="warehouse-detail-content">
          <section className="warehouse-table-card" aria-label="Lokasi gudang terpilih">
            <div className="warehouse-card-title">
              <strong>Lokasi Gudang</strong>
              <CardTools count={2} onMore={() => onNotify("Opsi lokasi gudang dibuka")} />
            </div>
            <div className="warehouse-table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Region</th>
                    <th>Kanwil</th>
                    <th>Kancab</th>
                    <th>Gudang</th>
                    <th>Longitude Gudang</th>
                    <th>Latitude Gudang</th>
                    <th>Alamat Gudang</th>
                    <th>Jumlah Unit Gudang</th>
                    <th>Kondisi Gudang</th>
                    <th>Sarana Penunjang Gudang</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{selectedWarehouse.region}</td>
                    <td>{selectedWarehouse.kanwil}</td>
                    <td>{selectedWarehouse.kancab}</td>
                    <td>{selectedWarehouse.name}</td>
                    <td>{selectedWarehouse.longitude}</td>
                    <td>{selectedWarehouse.latitude}</td>
                    <td>{selectedWarehouse.address}</td>
                    <td>{selectedWarehouse.units}</td>
                    <td>{selectedWarehouse.condition}</td>
                    <td>{selectedWarehouse.facilities}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="warehouse-time-grid">
            {[
              ["Tanggal Close Terkini", selectedWarehouse.closeDate],
              ["Sync Terakhir Pipeline", "Rabu, 12 Agustus 2026 02:26:14"],
            ].map(([title, value]) => (
              <section className="stat-card stat-card--sync warehouse-detail-card" key={title}>
                <div className="stat-card__head">
                  <strong>{title}</strong>
                  <CardTools count={2} onMore={() => onNotify(`Detail ${title} dibuka`)} />
                </div>
                <p>{value}</p>
              </section>
            ))}
          </div>

          <div className="warehouse-primary-metrics">
            {[
              ["Kapasitas Gudang", selectedWarehouse.capacity, "Ton"],
              ["Jumlah Stok", selectedWarehouse.stock, "Ton"],
              ["Persentase Space Terpakai", selectedWarehouse.usedPercentage, "Persen (%)"],
            ].map(([title, value, unit]) => (
              <section className="stat-card stat-card--metric warehouse-detail-card" key={title}>
                <div className="stat-card__head">
                  <strong>{title}</strong>
                  <CardTools count={2} onMore={() => onNotify(`Detail ${title} dibuka`)} />
                </div>
                <p><b>{value}</b><span>{unit}</span></p>
              </section>
            ))}
          </div>

          <div className="warehouse-secondary-metrics">
            {[
              ["Sisa Space", selectedWarehouse.capacity === "0" ? "0" : selectedWarehouse.capacity, "Ton"],
              ["Persentase Sisa", selectedWarehouse.usedPercentage === "0" ? "0" : (100 - Number(selectedWarehouse.usedPercentage.replace(",", "."))).toFixed(2).replace(".", ","), "Persen (%)"],
              ["Jumlah Produk", selectedWarehouse.products, "Produk"],
              ["Jumlah Komoditi", selectedWarehouse.commodities, "Komoditi"],
            ].map(([title, value, unit]) => (
              <section className="stat-card stat-card--metric warehouse-detail-card warehouse-detail-card--compact" key={title}>
                <div className="stat-card__head">
                  <strong>{title}</strong>
                  <CardTools count={2} onMore={() => onNotify(`Detail ${title} dibuka`)} />
                </div>
                <p><b>{value}</b><span>{unit}</span></p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
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
  const [activeNav, setActiveNav] = useState("National Dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedSidebarItems, setExpandedSidebarItems] = useState<string[]>(["Persediaan"]);
  const [activeTab, setActiveTab] = useState("Persediaan Beras");
  const [detailViewOpen, setDetailViewOpen] = useState(false);
  const [nationalOverviewOpen, setNationalOverviewOpen] = useState(false);
  const [riceOptimizerOpen, setRiceOptimizerOpen] = useState(false);
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

  function selectSidebarItem(label: string) {
    setActiveNav(label);
    setDetailViewOpen(false);
    setNationalOverviewOpen(false);
    setRiceOptimizerOpen(false);
    if (label === "National Dashboard") {
      setActiveTab("Persediaan Beras");
      showToast("National Dashboard aktif");
      return;
    }
    if (["National Overview", "Target vs Realisasi", "Regional Performance", "National Exceptions"].includes(label)) {
      setNationalOverviewOpen(true);
      showToast(`${label} aktif`);
      return;
    }
    if (label === "Rice Outflow Optimizer") {
      setRiceOptimizerOpen(true);
      showToast("Rice Outflow Optimizer aktif");
      return;
    }
    if (label === "Ringkasan Persediaan" || label === "Persediaan") {
      setActiveTab("Persediaan Beras");
    } else if (label === "Safety Stock") {
      setActiveTab("Safety Stock");
    } else if (label === "Kapasitas Gudang") {
      setDetailViewOpen(true);
    }
    showToast(`${label} dipilih`);
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

      <aside className={`side-rail${sidebarCollapsed ? " collapsed" : ""}`} aria-label="Navigasi utama">
        <div className="side-rail__header">
          <span className="side-rail__eyebrow">SCCT BULOG</span>
          <strong>Control Tower</strong>
          <button
            type="button"
            onClick={() => setSidebarCollapsed((value) => !value)}
            aria-label={sidebarCollapsed ? "Tampilkan menu" : "Sembunyikan menu"}
            title={sidebarCollapsed ? "Tampilkan menu" : "Sembunyikan menu"}
          >
            {sidebarCollapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
          </button>
        </div>
        <nav className="side-nav">
          {sidebarSections.map((section) => (
            <section className="side-nav__section" key={section.title}>
              <h2>{section.title}</h2>
              <div className="side-nav__items">
                {section.items.map(({ label, icon: Icon, children }) => {
                  const expanded = expandedSidebarItems.includes(label);
                  const childActive = children?.includes(activeNav);
                  return (
                    <div className={`side-nav__group${expanded ? " expanded" : ""}`} key={label}>
                      <button
                        type="button"
                        className={`side-nav__item${activeNav === label || childActive ? " active" : ""}`}
                        title={sidebarCollapsed ? label : undefined}
                        aria-expanded={children ? expanded : undefined}
                        onClick={() => {
                          if (children) {
                            if (sidebarCollapsed) setSidebarCollapsed(false);
                            setExpandedSidebarItems((items) => items.includes(label) ? items.filter((item) => item !== label) : [...items, label]);
                            if (label === "Persediaan") selectSidebarItem(label);
                          } else {
                            selectSidebarItem(label);
                          }
                        }}
                      >
                        <Icon size={17} />
                        <span>{label}</span>
                        {children && (expanded ? <ChevronDown size={14} className="side-nav__chevron" /> : <ChevronRight size={14} className="side-nav__chevron" />)}
                      </button>
                      {children && expanded && !sidebarCollapsed && (
                        <div className="side-nav__children">
                          {children.map((child) => (
                            <button
                              type="button"
                              key={child}
                              className={activeNav === child ? "active" : ""}
                              onClick={() => selectSidebarItem(child)}
                            >
                              <span>{child}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </nav>
        <span className="rail-version">v0.0.0.74</span>
      </aside>

      <section className={`workspace${sidebarCollapsed ? " sidebar-collapsed" : ""}`}>
        <div className="title-bar">
          <h1>Dashboard {appliedDashboardType}</h1>
          <span>({formatDashboardDate(appliedStartDate)} – {formatDashboardDate(appliedEndDate)})</span>
          <button
            type="button"
            className="title-bar__detail"
            onClick={() => {
              setDetailViewOpen(true);
              setNationalOverviewOpen(false);
              setRiceOptimizerOpen(false);
              setFilterOpen(false);
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

        {detailViewOpen && (
          <div className={sidebarCollapsed ? "detail-view-host sidebar-collapsed" : "detail-view-host"}>
            <WarehouseDetailPage onBack={() => setDetailViewOpen(false)} onNotify={showToast} />
          </div>
        )}
        {nationalOverviewOpen && (
          <div className={sidebarCollapsed ? "overview-view-host sidebar-collapsed" : "overview-view-host"}>
            <NationalOverviewPage onNotify={showToast} />
          </div>
        )}
        {riceOptimizerOpen && (
          <div className={sidebarCollapsed ? "optimizer-view-host sidebar-collapsed" : "optimizer-view-host"}>
            <RiceOutflowOptimizerPage onNotify={showToast} />
          </div>
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
