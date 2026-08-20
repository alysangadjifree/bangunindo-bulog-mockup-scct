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
  CalendarDays,
  Camera,
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
  Download,
  Eye,
  EyeOff,
  FileText,
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
  MapPin,
  MessageCircle,
  Minus,
  MoreVertical,
  PackageSearch,
  Plus,
  Play,
  RotateCw,
  Search,
  Scale,
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
  Users,
  Wifi,
  Warehouse,
  WalletCards,
  X,
} from "lucide-react";
import type { CSSProperties, ComponentType } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

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

type DomainSummaryKind = "inventory" | "procurement" | "sales" | "finance";
type InventoryWorkspaceKind = "safety" | "quality" | "mutation" | "simulation";
type ProcurementWorkspaceKind = "regional" | "sources" | "trend" | "gap" | "simulation";
type UserManagementMode = "users" | "roles" | "permissions" | "organization" | "status";
type FinancialWorkspaceKind = "revenue" | "cost" | "receivables" | "budget" | "simulation";
type ProductMasterMode = "commodities" | "products" | "units" | "quality";
type DistributionWorkspaceKind = "summary" | "shipments" | "routes" | "otif" | "exceptions" | "simulation";
type SalesWorkspaceKind = "summary" | "commercial" | "programs" | "regional" | "fulfillment" | "simulation";
type AIDecisionMode = "insights" | "risks" | "rootCause" | "actions" | "recommendations";
type ApprovalCenterMode = "pending" | "approved" | "rejected" | "delegations";
type DecisionHistoryMode = "simulations" | "predictions" | "recommendations" | "approvals" | "audit";
type ExecutiveReportMode = "snapshot" | "daily" | "weekly" | "monthly" | "builder" | "scheduled" | "history";
type OrganizationLocationMode = "regions" | "kanwil" | "kancab" | "warehouses" | "distributionPoints";
type ParameterMode = "targetKpi" | "alertThreshold" | "sla" | "calendar";
type PartnerMode = "suppliers" | "transporters" | "customers" | "farmerGroups";

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
      { label: "Simulasi What-If", icon: SlidersHorizontal, children: ["Rice Outflow Optimizer", "Shortage & Surplus", "Seasonal Demand Surge", "Route & Mode", "Aging & Risiko Disposal", "Dampak Harga SPHP"] },
      { label: "Prediksi AI", icon: ChartNoAxesCombined, children: ["Demand Forecasting", "Supply Forecasting", "Prediksi Shortage & Surplus", "Prediksi Mutu Stok", "Price Forecasting", "Akurasi Model"] },
      { label: "Optimasi & Rekomendasi", icon: Sparkles, children: ["Optimasi Safety Stock", "Optimasi Alokasi Stok", "Optimasi Pengadaan", "Optimasi Rute & Moda", "Rekomendasi Redistribusi"] },
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
      { label: "Parameter", icon: SlidersHorizontal, children: ["Target KPI", "Threshold Alert", "SLA", "Kalender Operasional"] },
    ],
  },
  {
    title: "ADMINISTRATION",
    items: [
      { label: "User Management", icon: CircleUserRound, children: ["User", "Role", "Permission", "Organisasi Pengguna", "Status Pengguna"] },
      { label: "Dashboard Management", icon: BarChart3, children: ["Dashboard", "Widget", "Menu", "Saved View", "Executive Layout"] },
      { label: "Alert Configuration", icon: BellRing, children: ["Alert Rules", "Severity", "Notification Rules", "Escalation Rules", "SLA Rules"] },
      { label: "AI Configuration", icon: BrainCircuit, children: ["Model Configuration", "AI Prompt Template", "Recommendation Rules", "Confidence Threshold", "Orchestration Policy"] },
      { label: "System", icon: Settings, children: ["General Setting", "Notification", "Audit Trail", "Application Logs", "System Information"] },
    ],
  },
  {
    title: "AKUN",
    items: [
      { label: "Profile", icon: CircleUserRound },
      { label: "Preferensi", icon: Settings },
      { label: "Bantuan", icon: CircleHelp },
      { label: "Keluar", icon: LogOut },
    ],
  },
];

const enabledNavigation = new Set([
  "National Dashboard", "National Overview", "Target vs Realisasi", "Regional Performance",
  "Persediaan", "Ringkasan Persediaan", "Kapasitas Gudang", "Aging & Kualitas", "Mutasi Stok", "Safety Stock", "Simulasi Persediaan",
  "Ringkasan Pengadaan", "Ringkasan Penjualan & Penyaluran", "Ringkasan Keuangan",
  "Simulasi What-If", "Rice Outflow Optimizer", "Shortage & Surplus", "Seasonal Demand Surge", "Route & Mode", "Aging & Risiko Disposal", "Dampak Harga SPHP",
  "AI Decision Center", "Executive AI Insights", "Risiko & Peluang", "Root Cause Analysis", "Prioritas Tindakan", "Recommendation Center",
  "Approval Center", "Menunggu Persetujuan", "Disetujui", "Ditolak", "Delegasi Persetujuan",
  "Decision History", "Riwayat Simulasi", "Riwayat Prediksi", "Riwayat Rekomendasi", "Riwayat Persetujuan", "Decision Audit Trail",
  "Executive Report", "Executive Snapshot", "Laporan Harian", "Laporan Mingguan", "Laporan Bulanan", "Report Builder", "Laporan Terjadwal", "Riwayat Laporan",
  "Organisasi & Lokasi", "Wilayah", "Kanwil", "Kancab", "Gudang", "Titik Penyaluran",
  "Parameter", "Target KPI", "Threshold Alert", "SLA", "Kalender Operasional",
  "Mitra", "Pemasok", "Transporter", "Pelanggan", "Kelompok Tani",
  "Alert & Exception", "Alert Center", "My Cases", "SLA Monitoring", "Exception History", "Alert Rules",
  "User Management", "User", "Role", "Permission", "Organisasi Pengguna", "Status Pengguna",
  "Keuangan", "Pendapatan", "Biaya Supply Chain", "Piutang", "Budget vs Actual", "Simulasi Dampak Keuangan",
  "Distribusi", "Ringkasan Distribusi", "Monitoring Pengiriman", "Kinerja Rute", "Kinerja OTIF", "Exception Distribusi", "Simulasi Distribusi",
  "Penjualan & Penyaluran", "Ringkasan Penjualan & Penyaluran", "Penjualan Komersial", "Penyaluran Program", "Kinerja Wilayah", "Order Fulfillment", "Simulasi Penyaluran",
  "Produk & Komoditas", "Komoditas", "Produk", "Satuan", "Klasifikasi Mutu",
  "Profile", "Keluar",
]);

const procurementNavigation = new Set(["Kinerja Wilayah", "Sumber Pengadaan", "Tren & Proyeksi", "Gap Analysis", "Simulasi Pengadaan"]);

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

function ShortageSurplusSimulatorPage({ onNotify }: { onNotify: (message: string) => void }) {
  const [scenarioName, setScenarioName] = useState("Tekanan Pasokan Q3");
  const [horizon, setHorizon] = useState("6 bulan");
  const [supplyShock, setSupplyShock] = useState(-20);
  const [demandShock, setDemandShock] = useState(15);
  const [distributionDisruption, setDistributionDisruption] = useState(10);
  const [selectedRegion, setSelectedRegion] = useState("Papua");
  const [running, setRunning] = useState(false);
  const [reportReady, setReportReady] = useState(false);
  const [lastRun, setLastRun] = useState("Belum dijalankan");

  const regionalProjection = useMemo(() => {
    const base = [
      { region: "Jawa Timur", baseline: 520, supply: 12, demand: 7, route: 1.2, days: 43 },
      { region: "Jawa Tengah", baseline: 310, supply: 10, demand: 6, route: .9, days: 35 },
      { region: "Lampung", baseline: 260, supply: 8, demand: 4, route: .7, days: 32 },
      { region: "Sulselbar", baseline: 180, supply: 7, demand: 7, route: 1.1, days: 24 },
      { region: "Sumatera Utara", baseline: 120, supply: 8, demand: 5, route: .7, days: 21 },
      { region: "Kalimantan Barat", baseline: 40, supply: 5, demand: 6, route: 1.3, days: 17 },
      { region: "Nusa Tenggara Timur", baseline: -20, supply: 4, demand: 7, route: 1.7, days: 13 },
      { region: "Papua", baseline: -45, supply: 5, demand: 9, route: 2.1, days: 9 },
    ];
    return base.map((item) => {
      const balance = Math.round(item.baseline + supplyShock * item.supply - demandShock * item.demand - distributionDisruption * item.route);
      const projectedDays = Math.max(3, Math.round(item.days + supplyShock * .35 - demandShock * .22 - distributionDisruption * .12));
      return { ...item, balance, projectedDays, status: balance < -50 ? "Shortage" : balance > 50 ? "Surplus" : "Seimbang" };
    });
  }, [supplyShock, demandShock, distributionDisruption]);

  const shortageRegions = regionalProjection.filter((item) => item.status === "Shortage");
  const surplusRegions = regionalProjection.filter((item) => item.status === "Surplus");
  const shortageVolume = Math.abs(regionalProjection.filter((item) => item.balance < 0).reduce((total, item) => total + item.balance, 0));
  const surplusVolume = regionalProjection.filter((item) => item.balance > 0).reduce((total, item) => total + item.balance, 0);
  const selectedProjection = regionalProjection.find((item) => item.region === selectedRegion) ?? regionalProjection[0];

  const recommendations = [
    { source: "Jawa Timur", target: "Papua", volume: 210, mode: "Kapal + truk", lead: "12–16 hari", cost: "Rp148 M", impact: "+18 hari stok", priority: "Kritis" },
    { source: "Lampung", target: "Nusa Tenggara Timur", volume: 125, mode: "Kapal", lead: "9–12 hari", cost: "Rp76 M", impact: "+14 hari stok", priority: "Tinggi" },
    { source: "Jawa Tengah", target: "Kalimantan Barat", volume: 98, mode: "Kapal + truk", lead: "7–10 hari", cost: "Rp54 M", impact: "+11 hari stok", priority: "Tinggi" },
    { source: "Jawa Timur", target: "Sulselbar", volume: 72, mode: "Kapal", lead: "5–7 hari", cost: "Rp31 M", impact: "+8 hari stok", priority: "Menengah" },
  ];

  function applyPreset(preset: "moderate" | "severe" | "recovery") {
    if (preset === "moderate") { setSupplyShock(-10); setDemandShock(8); setDistributionDisruption(5); setScenarioName("Tekanan Moderat"); }
    if (preset === "severe") { setSupplyShock(-30); setDemandShock(25); setDistributionDisruption(25); setScenarioName("Stress Test Ekstrem"); }
    if (preset === "recovery") { setSupplyShock(8); setDemandShock(3); setDistributionDisruption(0); setScenarioName("Pemulihan Pasokan"); }
    setReportReady(false);
  }

  function runSimulation() {
    setRunning(true);
    setReportReady(false);
    window.setTimeout(() => {
      setRunning(false);
      setLastRun("Baru saja");
      onNotify(`Simulasi ${scenarioName} selesai`);
    }, 900);
  }

  function createReport() {
    setReportReady(true);
    window.setTimeout(() => document.getElementById("shortage-report")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    onNotify("Report rekomendasi berhasil dibuat");
  }

  return (
    <section className="shortage-page" aria-label="Shortage and Surplus Simulator">
      <header className="shortage-header">
        <div>
          <span>DECISION INTELLIGENCE / SIMULASI WHAT-IF</span>
          <h1>Shortage &amp; Surplus Simulator</h1>
          <p>Uji keseimbangan stok nasional saat pasokan, permintaan, atau jaringan distribusi berubah—sebelum shortage dan overstock berdampak.</p>
        </div>
        <div className="shortage-header-actions">
          <span className="shortage-model-state"><i /><Clock3 size={15} /> Simulasi terakhir: {lastRun}</span>
          <button type="button" onClick={() => onNotify("Skenario disimpan sebagai draf")}><Save size={16} />Simpan Draf</button>
          <button type="button" className="primary" onClick={createReport}><FileText size={16} />Buat Report</button>
        </div>
      </header>

      <div className="shortage-scope">
        <span><i />Mode simulasi</span><b>Model S3 v1.8</b><i /><b>Nasional</b><i /><b>Beras CBP</b><i /><b>Horizon {horizon}</b>
      </div>

      <nav className="shortage-tabs" aria-label="Navigasi simulator">
        <button type="button" onClick={() => document.getElementById("shortage-builder")?.scrollIntoView({ behavior: "smooth" })}>Bangun Skenario</button>
        <button type="button" onClick={() => document.getElementById("shortage-results")?.scrollIntoView({ behavior: "smooth" })}>Hasil Proyeksi</button>
        <button type="button" onClick={() => document.getElementById("shortage-actions")?.scrollIntoView({ behavior: "smooth" })}>Rekomendasi</button>
        <button type="button" onClick={() => document.getElementById("shortage-report")?.scrollIntoView({ behavior: "smooth" })}>Report</button>
      </nav>

      <section className="shortage-hero">
        <span><Scale size={24} /></span>
        <div><strong>Pertanyaan simulasi aktif</strong><p>Jika produksi/pengadaan turun <b>{Math.abs(supplyShock)}%</b>, permintaan naik <b>{demandShock}%</b>, dan gangguan distribusi <b>{distributionDisruption}%</b>, wilayah mana mengalami shortage dan dari mana surplus dapat dialihkan?</p></div>
        <div><strong>{shortageRegions.length}</strong><span>wilayah shortage</span></div>
        <div><strong>{surplusRegions.length}</strong><span>wilayah surplus</span></div>
      </section>

      <section className="shortage-card scenario-builder" id="shortage-builder">
        <header><div><span>LANGKAH 1</span><h2>Bangun Skenario What-If</h2><p>Atur asumsi terhadap baseline resmi yang dipilih.</p></div><SlidersHorizontal size={24} /></header>
        <div className="scenario-presets">
          <span>Preset cepat</span>
          <button type="button" onClick={() => applyPreset("moderate")}>Tekanan Moderat</button>
          <button type="button" onClick={() => applyPreset("severe")}>Stress Test Ekstrem</button>
          <button type="button" onClick={() => applyPreset("recovery")}>Pemulihan Pasokan</button>
        </div>
        <div className="scenario-form-grid">
          <div className="scenario-baseline">
            <h3>Konteks & Baseline</h3>
            <label><span>Nama skenario</span><input value={scenarioName} onChange={(event) => setScenarioName(event.target.value)} /></label>
            <label><span>Baseline data</span><select defaultValue="Realisasi Agustus 2026"><option>Realisasi Agustus 2026</option><option>Rencana Kerja 2026</option><option>Rata-rata 3 tahun</option></select></label>
            <label><span>Horizon proyeksi</span><select value={horizon} onChange={(event) => setHorizon(event.target.value)}><option>3 bulan</option><option>6 bulan</option><option>12 bulan</option></select></label>
            <label><span>Program prioritas</span><select defaultValue="Seluruh program"><option>Seluruh program</option><option>SPHP</option><option>Bantuan Pangan</option><option>Komersial</option></select></label>
          </div>
          <div className="scenario-shocks">
            <h3>Shock Assumptions</h3>
            <label><span><b>Produksi / pengadaan</b><strong className={supplyShock < 0 ? "negative" : "positive"}>{supplyShock > 0 ? "+" : ""}{supplyShock}%</strong></span><input type="range" min="-40" max="20" step="1" value={supplyShock} onChange={(event) => { setSupplyShock(Number(event.target.value)); setReportReady(false); }} /><small>-40% penurunan · +20% kenaikan</small></label>
            <label><span><b>Permintaan wilayah</b><strong className={demandShock > 0 ? "negative" : "positive"}>{demandShock > 0 ? "+" : ""}{demandShock}%</strong></span><input type="range" min="-10" max="35" step="1" value={demandShock} onChange={(event) => { setDemandShock(Number(event.target.value)); setReportReady(false); }} /><small>-10% penurunan · +35% lonjakan</small></label>
            <label><span><b>Gangguan distribusi</b><strong className={distributionDisruption > 15 ? "negative" : "neutral"}>{distributionDisruption}%</strong></span><input type="range" min="0" max="50" step="1" value={distributionDisruption} onChange={(event) => { setDistributionDisruption(Number(event.target.value)); setReportReady(false); }} /><small>0% normal · 50% gangguan berat</small></label>
          </div>
          <div className="scenario-guardrails">
            <h3>Guardrail Keputusan</h3>
            {["Safety stock minimal 14 hari", "Kapasitas gudang maksimal 85%", "Prioritaskan stok FEFO", "Penuhi kebutuhan program pemerintah", "Redistribusi lintas wilayah diizinkan"].map((item) => <label key={item}><input type="checkbox" defaultChecked /><span>{item}</span></label>)}
            <div><AlertTriangle size={15} /><span>Model tidak akan merekomendasikan transfer yang menurunkan sumber di bawah safety stock.</span></div>
          </div>
        </div>
        <button type="button" className="run-shortage-simulation" onClick={runSimulation} disabled={running}><Play size={17} />{running ? "Menghitung proyeksi 26 Kanwil…" : "Jalankan Simulasi"}</button>
      </section>

      <section className="shortage-results" id="shortage-results">
        <header><div><span>LANGKAH 2</span><h2>Hasil Proyeksi Keseimbangan Stok</h2><p>Proyeksi akhir periode berdasarkan skenario “{scenarioName}”.</p></div><span className="confidence-badge">Confidence 89%</span></header>
        <div className="shortage-kpis">
          <article className="critical"><span>Proyeksi shortage</span><strong>{shortageVolume.toLocaleString("id-ID")} rb ton</strong><small>{shortageRegions.length} wilayah di bawah kebutuhan</small></article>
          <article className="good"><span>Surplus tersedia</span><strong>{surplusVolume.toLocaleString("id-ID")} rb ton</strong><small>{surplusRegions.length} wilayah berpotensi sumber</small></article>
          <article><span>Gap setelah redistribusi</span><strong>{Math.max(shortageVolume - Math.round(surplusVolume * .82), 0).toLocaleString("id-ID")} rb ton</strong><small>Perlu pengadaan / intervensi tambahan</small></article>
          <article><span>Service level nasional</span><strong>{Math.max(68, 96 - shortageRegions.length * 3)}%</strong><small>Target ≥ 95%</small></article>
        </div>

        <div className="balance-workspace">
          <section className="balance-chart-card">
            <header><div><span>PROYEKSI PER WILAYAH</span><h3>Shortage vs Surplus</h3></div><span>rb ton</span></header>
            <div className="balance-axis"><span>Shortage</span><i /><span>Surplus</span></div>
            <div className="balance-bars">
              {regionalProjection.map((item) => (
                <button type="button" key={item.region} className={selectedRegion === item.region ? "selected" : ""} onClick={() => setSelectedRegion(item.region)}>
                  <span>{item.region}</span>
                  <div><i className="zero" /><b className={item.balance < 0 ? "shortage" : "surplus"} style={item.balance < 0 ? { width: `${Math.min(Math.abs(item.balance) / 5.2, 48)}%`, right: "50%" } : { width: `${Math.min(item.balance / 5.2, 48)}%`, left: "50%" }} /></div>
                  <strong className={item.status.toLowerCase()}>{item.balance > 0 ? "+" : ""}{item.balance}</strong>
                </button>
              ))}
            </div>
          </section>
          <aside className="region-impact-card">
            <header><span>WILAYAH TERPILIH</span><h3>{selectedProjection.region}</h3></header>
            <span className={`region-status ${selectedProjection.status.toLowerCase()}`}>{selectedProjection.status}</span>
            <div><span>Proyeksi balance</span><strong>{selectedProjection.balance > 0 ? "+" : ""}{selectedProjection.balance} rb ton</strong></div>
            <div><span>Days of stock</span><strong>{selectedProjection.projectedDays} hari</strong></div>
            <div><span>Ambang safety stock</span><strong>14 hari</strong></div>
            <p>{selectedProjection.status === "Shortage" ? "Wilayah memerlukan redistribusi atau percepatan pengadaan sebelum periode kritis." : selectedProjection.status === "Surplus" ? "Surplus dapat dialokasikan dengan tetap menjaga safety stock sumber." : "Kondisi relatif seimbang; monitor perubahan permintaan mingguan."}</p>
          </aside>
        </div>
      </section>

      <section className="shortage-card recommendation-engine" id="shortage-actions">
        <header><div><span>LANGKAH 3</span><h2>Rekomendasi Penyeimbangan</h2><p>Urutan tindakan berdasarkan dampak service level, lead time, biaya, dan risiko sumber.</p></div><Sparkles size={24} /></header>
        <div className="recommendation-summary-bar"><span><strong>505 rb ton</strong> direkomendasikan untuk redistribusi</span><i /><span><strong>4 koridor</strong> prioritas</span><i /><span><strong>Rp309 M</strong> estimasi biaya</span><i /><span><strong>96%</strong> shortage tertangani</span></div>
        <div className="transfer-table-head"><span>Prioritas & koridor</span><span>Volume</span><span>Moda</span><span>Lead time</span><span>Biaya</span><span>Dampak</span><span>Tindakan</span></div>
        <div className="transfer-list">
          {recommendations.map((item, index) => (
            <article key={`${item.source}-${item.target}`}>
              <span className="transfer-route"><b>{index + 1}</b><span><strong>{item.source} <ArrowRight size={12} /> {item.target}</strong><small>Prioritas {item.priority}</small></span></span>
              <span><strong>{item.volume} rb</strong><small>ton</small></span><span>{item.mode}</span><span>{item.lead}</span><span>{item.cost}</span><span className="impact">{item.impact}</span>
              <button type="button" onClick={() => onNotify(`Rencana transfer ${item.source} ke ${item.target} dibuka`)}>Review <ChevronRight size={14} /></button>
            </article>
          ))}
        </div>
        <div className="recommendation-note"><ShieldCheck size={18} /><div><strong>Guardrail terpenuhi</strong><p>Seluruh rekomendasi menjaga wilayah sumber di atas safety stock 14 hari dan tidak melebihi kapasitas gudang penerima 85%.</p></div><button type="button" onClick={() => onNotify("Paket rekomendasi dikirim ke Approval Center")}><Send size={15} />Ajukan Paket</button></div>
      </section>

      <section className={`shortage-report ${reportReady ? "ready" : ""}`} id="shortage-report">
        <header><div><span>LANGKAH 4</span><h2>Report Rekomendasi Simulasi</h2><p>Ringkasan keputusan untuk review manajemen dan tindak lanjut operasional.</p></div><span className="report-state">{reportReady ? "Report siap" : "Pratinjau dinamis"}</span></header>
        <div className="report-grid">
          <section className="executive-report-card">
            <div className="report-title"><span>EXECUTIVE SUMMARY</span><strong>{scenarioName}</strong><small>Dibuat 13 Agustus 2026 • Horizon {horizon}</small></div>
            <p>Dengan asumsi pasokan <b>{supplyShock}%</b>, permintaan <b>+{demandShock}%</b>, dan gangguan distribusi <b>{distributionDisruption}%</b>, model memproyeksikan <b>{shortageRegions.length} wilayah shortage</b> dengan gap {shortageVolume.toLocaleString("id-ID")} ribu ton. Redistribusi 505 ribu ton melalui empat koridor prioritas diperkirakan menutup 96% kebutuhan mendesak.</p>
            <div className="report-metrics"><span><small>Risiko nasional</small><strong className="red">TINGGI</strong></span><span><small>Wilayah kritis</small><strong>{shortageRegions.slice(0, 3).map((item) => item.region).join(", ")}</strong></span><span><small>Keputusan maksimal</small><strong>2 × 24 jam</strong></span></div>
            <h3>Rekomendasi utama</h3>
            <ol><li>Setujui redistribusi gelombang pertama ke Papua dan NTT.</li><li>Kunci slot kapal, armada lanjutan, dan ruang gudang penerima dalam 24 jam.</li><li>Aktifkan contingency procurement untuk gap yang tidak tertutup surplus.</li><li>Monitor days of stock wilayah kritis setiap hari hingga kembali ≥ 14 hari.</li></ol>
          </section>
          <aside className="report-actions-card">
            <span>PAKET REPORT</span><h3>Siap untuk keputusan</h3>
            <ul><li><CheckCircle2 size={15} />Executive summary</li><li><CheckCircle2 size={15} />Asumsi & metodologi</li><li><CheckCircle2 size={15} />Proyeksi 26 Kanwil</li><li><CheckCircle2 size={15} />Rencana redistribusi</li><li><CheckCircle2 size={15} />Risiko & guardrail</li><li><CheckCircle2 size={15} />Audit input model</li></ul>
            <button type="button" className="download-report" onClick={() => onNotify("Report PDF siap diunduh")}><Download size={16} />Unduh Report PDF</button>
            <button type="button" onClick={() => onNotify("Report dikirim ke Approval Center")}><Send size={16} />Kirim untuk Persetujuan</button>
          </aside>
        </div>
      </section>

      <footer className="shortage-disclaimer"><AlertTriangle size={16} /><span><strong>Mode simulasi—bukan instruksi operasional.</strong> Nilai merupakan data contoh UI/UX. Keputusan produksi wajib menggunakan integrasi WMS, pengadaan, demand wilayah, Simotandi, TMS/Simlog, aturan program, dan otorisasi resmi BULOG.</span></footer>
    </section>
  );
}

function SeasonalDemandSurgePage({ onNotify }: { onNotify: (message: string) => void }) {
  const [eventType, setEventType] = useState("Ramadhan & Idulfitri 2027");
  const [uplift, setUplift] = useState(24);
  const [peakWeeks, setPeakWeeks] = useState(6);
  const [bufferDays, setBufferDays] = useState(7);
  const [selectedStrategy, setSelectedStrategy] = useState<"balanced" | "service" | "lean">("balanced");
  const [selectedRegion, setSelectedRegion] = useState("Jabodetabek");
  const [running, setRunning] = useState(false);
  const [reportState, setReportState] = useState("Pratinjau dinamis");
  const [lastRun, setLastRun] = useState("Belum dijalankan");

  const regionData = useMemo(() => {
    const base = [
      { region: "Jabodetabek", demand: 438, stock: 392, baselineUplift: 29, lead: 5, readiness: 68 },
      { region: "Jawa Barat", demand: 371, stock: 355, baselineUplift: 26, lead: 4, readiness: 74 },
      { region: "Jawa Timur", demand: 342, stock: 418, baselineUplift: 22, lead: 3, readiness: 91 },
      { region: "Jawa Tengah", demand: 306, stock: 349, baselineUplift: 21, lead: 3, readiness: 88 },
      { region: "Sumatera Utara", demand: 183, stock: 171, baselineUplift: 18, lead: 6, readiness: 72 },
      { region: "Sulselbar", demand: 155, stock: 168, baselineUplift: 17, lead: 5, readiness: 84 },
      { region: "Nusa Tenggara Timur", demand: 91, stock: 68, baselineUplift: 16, lead: 9, readiness: 55 },
      { region: "Papua", demand: 78, stock: 51, baselineUplift: 19, lead: 14, readiness: 43 },
    ];
    return base.map((item) => {
      const demand = Math.round(item.demand * (1 + (uplift + item.baselineUplift - 20) / 100));
      const requirement = Math.round(demand * (1 + bufferDays / 30));
      const gap = item.stock - requirement;
      const coverage = Math.max(4, Math.round((item.stock / demand) * 30));
      const readiness = Math.max(35, Math.min(98, Math.round(item.readiness - Math.max(0, uplift - 20) * .55 - Math.max(0, peakWeeks - 5) * 1.5 + bufferDays * .45)));
      return { ...item, demand, requirement, gap, coverage, readiness, status: gap < -40 ? "Kritis" : gap < 0 ? "Perlu tindakan" : "Siap" };
    });
  }, [uplift, peakWeeks, bufferDays]);

  const strategies = {
    balanced: { label: "Seimbang", service: 96.2, inventory: "1,18 jt ton", cost: "Rp284 M", waste: "-19%", description: "Menyeimbangkan service level, biaya, dan aging inventory." },
    service: { label: "Service Maksimum", service: 98.4, inventory: "1,34 jt ton", cost: "Rp347 M", waste: "-11%", description: "Prioritas ketersediaan dan respons puncak dengan buffer lebih tinggi." },
    lean: { label: "Inventory Lean", service: 93.8, inventory: "0,96 jt ton", cost: "Rp226 M", waste: "-27%", description: "Menekan inventory dan biaya dengan replenishment lebih sering." },
  };
  const activeStrategy = strategies[selectedStrategy];
  const criticalRegions = regionData.filter((item) => item.status !== "Siap");
  const prepositionVolume = regionData.reduce((total, item) => total + Math.max(0, -item.gap), 0);
  const selected = regionData.find((item) => item.region === selectedRegion) ?? regionData[0];
  const waves = [
    { wave: "Gelombang 1", timing: "H-45 s.d. H-30", volume: 420, focus: "Papua, NTT, Sumut", action: "Kunci kapal dan gudang penerima", status: "Mulai sekarang" },
    { wave: "Gelombang 2", timing: "H-29 s.d. H-15", volume: 465, focus: "Jabodetabek, Jawa Barat", action: "Pre-positioning dekat titik penyaluran", status: "Terjadwal" },
    { wave: "Gelombang 3", timing: "H-14 s.d. H-1", volume: 295, focus: "Seluruh wilayah prioritas", action: "Top-up berbasis demand harian", status: "Menunggu sinyal" },
  ];

  function runSimulation() {
    setRunning(true);
    setReportState("Pratinjau dinamis");
    window.setTimeout(() => {
      setRunning(false);
      setLastRun("Baru saja");
      onNotify(`Simulasi ${eventType} selesai`);
    }, 900);
  }

  function buildReport() {
    setReportState("Report siap");
    window.setTimeout(() => document.getElementById("seasonal-report")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    onNotify("Report Seasonal Demand Surge berhasil dibuat");
  }

  return (
    <section className="seasonal-page" aria-label="Seasonal Demand Surge Simulator">
      <header className="seasonal-header">
        <div><span>DECISION INTELLIGENCE / SIMULASI WHAT-IF</span><h1>Seasonal Demand Surge</h1><p>Model lonjakan kebutuhan Ramadhan, Idulfitri, Nataru, dan periode strategis per wilayah untuk menguji pre-positioning stok sebelum dieksekusi.</p></div>
        <div className="seasonal-header-actions"><span><i /><Clock3 size={15} /> Simulasi terakhir: {lastRun}</span><button type="button" onClick={() => onNotify("Skenario musiman disimpan")}><Save size={16} />Simpan Draf</button><button type="button" className="primary" onClick={buildReport}><FileText size={16} />Buat Report</button></div>
      </header>
      <div className="seasonal-scope"><span><i />Mode simulasi</span><b>Model SDS v2.1</b><i /><b>Nasional</b><i /><b>Beras CBP</b><i /><b>{eventType}</b></div>
      <nav className="seasonal-tabs"><button type="button" onClick={() => document.getElementById("seasonal-builder")?.scrollIntoView({ behavior: "smooth" })}>Skenario</button><button type="button" onClick={() => document.getElementById("seasonal-forecast")?.scrollIntoView({ behavior: "smooth" })}>Demand Forecast</button><button type="button" onClick={() => document.getElementById("seasonal-plan")?.scrollIntoView({ behavior: "smooth" })}>Pre-positioning</button><button type="button" onClick={() => document.getElementById("seasonal-report")?.scrollIntoView({ behavior: "smooth" })}>Report</button></nav>

      <section className="seasonal-hero"><span><TrendingUp size={24} /></span><div><strong>Peringatan permintaan musiman</strong><p>Permintaan beras diproyeksikan naik <b>{uplift}%</b> selama {peakWeeks} minggu. Tanpa intervensi, {criticalRegions.length} wilayah berisiko berada di bawah kebutuhan selama periode puncak.</p></div><div><strong>H-45</strong><span>mulai pre-positioning</span></div><div><strong>{prepositionVolume.toLocaleString("id-ID")} rb</strong><span>ton perlu diposisikan</span></div></section>

      <section className="seasonal-card" id="seasonal-builder">
        <header><div><span>LANGKAH 1</span><h2>Definisikan Event &amp; Asumsi</h2><p>Kalender, pola historis, harga, dan sinyal demand menjadi baseline simulasi.</p></div><CalendarDays size={24} /></header>
        <div className="seasonal-builder-grid">
          <div className="seasonal-event-form"><label><span>Event musiman</span><select value={eventType} onChange={(event) => setEventType(event.target.value)}><option>Ramadhan &amp; Idulfitri 2027</option><option>Natal &amp; Tahun Baru 2026/2027</option><option>Stabilisasi Harga Semester I</option><option>Event Regional Prioritas</option></select></label><label><span>Baseline demand</span><select defaultValue="Historis 3 tahun + tren terkini"><option>Historis 3 tahun + tren terkini</option><option>Realisasi tahun sebelumnya</option><option>Target program 2027</option></select></label><label><span>Cakupan program</span><select defaultValue="SPHP + Komersial + Bantuan"><option>SPHP + Komersial + Bantuan</option><option>SPHP</option><option>Bantuan Pangan</option><option>Komersial</option></select></label></div>
          <div className="seasonal-sliders"><label><span><b>Demand uplift nasional</b><strong>+{uplift}%</strong></span><input type="range" min="5" max="50" value={uplift} onChange={(event) => { setUplift(Number(event.target.value)); setReportState("Pratinjau dinamis"); }} /><small>+5% moderat · +50% ekstrem</small></label><label><span><b>Durasi periode puncak</b><strong>{peakWeeks} minggu</strong></span><input type="range" min="2" max="12" value={peakWeeks} onChange={(event) => setPeakWeeks(Number(event.target.value))} /><small>2 minggu · 12 minggu</small></label><label><span><b>Buffer lead time</b><strong>+{bufferDays} hari</strong></span><input type="range" min="0" max="21" value={bufferDays} onChange={(event) => setBufferDays(Number(event.target.value))} /><small>0 hari · 21 hari</small></label></div>
          <div className="seasonal-guardrails"><h3>Guardrail SCCT</h3>{["Service level minimal 95%", "Safety stock minimal 14 hari", "FEFO dan batas aging aktif", "Kapasitas gudang maksimal 85%", "Harga dan kuota program dipatuhi"].map((item) => <label key={item}><input type="checkbox" defaultChecked /><span>{item}</span></label>)}<div><ShieldCheck size={15} /><span>Rekomendasi hanya memakai stok yang aman dialihkan dan kapasitas tujuan yang tervalidasi.</span></div></div>
        </div>
        <button type="button" className="seasonal-run" onClick={runSimulation} disabled={running}><Play size={17} />{running ? "Memproses demand 26 Kanwil…" : "Jalankan Simulasi"}</button>
      </section>

      <section className="seasonal-card seasonal-forecast" id="seasonal-forecast">
        <header><div><span>LANGKAH 2</span><h2>Demand Forecast &amp; Readiness Wilayah</h2><p>Bandingkan kebutuhan puncak dengan stok tersedia dan kesiapan jaringan.</p></div><span className="seasonal-confidence">Confidence 92%</span></header>
        <div className="seasonal-kpis"><article><span>Tambahan demand</span><strong>+{Math.round(uplift * 54.2).toLocaleString("id-ID")} rb ton</strong><small>terhadap baseline nasional</small></article><article className="risk"><span>Wilayah perlu tindakan</span><strong>{criticalRegions.length} Kanwil</strong><small>stok atau jaringan belum siap</small></article><article><span>Service level tanpa aksi</span><strong>{Math.max(73, 96 - criticalRegions.length * 2.5).toFixed(1)}%</strong><small>target minimal 95%</small></article><article className="good"><span>Service level rekomendasi</span><strong>{activeStrategy.service}%</strong><small>setelah pre-positioning</small></article></div>
        <div className="seasonal-readiness-grid">
          <section className="seasonal-region-table"><div className="seasonal-region-head"><span>Wilayah</span><span>Demand puncak</span><span>Stok tersedia</span><span>Gap</span><span>Coverage</span><span>Readiness</span></div>{regionData.map((item) => <button type="button" key={item.region} className={selectedRegion === item.region ? "selected" : ""} onClick={() => setSelectedRegion(item.region)}><span><strong>{item.region}</strong><small>{item.status}</small></span><span>{item.demand} rb</span><span>{item.stock} rb</span><span className={item.gap < 0 ? "negative" : "positive"}>{item.gap > 0 ? "+" : ""}{item.gap} rb</span><span>{item.coverage} hari</span><span><i><b style={{ width: `${item.readiness}%` }} /></i><strong>{item.readiness}%</strong></span></button>)}</section>
          <aside className="seasonal-region-detail"><span>WILAYAH TERPILIH</span><h3>{selected.region}</h3><em className={selected.status === "Siap" ? "ready" : "risk"}>{selected.status}</em><div><span>Gap periode puncak</span><strong>{selected.gap > 0 ? "+" : ""}{selected.gap} rb ton</strong></div><div><span>Days of stock</span><strong>{selected.coverage} hari</strong></div><div><span>Lead time replenishment</span><strong>{selected.lead} hari</strong></div><div><span>Readiness score</span><strong>{selected.readiness}%</strong></div><p>{selected.gap < 0 ? `Mulai pre-positioning maksimal H-${Math.max(14, selected.lead + bufferDays + 14)} agar stok tiba sebelum puncak.` : "Stok memadai; jadwalkan replenishment berbasis konsumsi aktual agar aging tetap terkendali."}</p></aside>
        </div>
      </section>

      <section className="seasonal-card" id="seasonal-plan">
        <header><div><span>LANGKAH 3</span><h2>Pilih Strategi Pre-positioning</h2><p>Bandingkan trade-off layanan, inventory, biaya, dan risiko aging.</p></div><MapPinned size={24} /></header>
        <div className="seasonal-strategies">{(Object.keys(strategies) as Array<keyof typeof strategies>).map((key) => { const item = strategies[key]; return <button type="button" key={key} className={selectedStrategy === key ? "selected" : ""} onClick={() => setSelectedStrategy(key)}><span>{item.label}{selectedStrategy === key && <b>Direkomendasikan</b>}</span><p>{item.description}</p><div><span><small>Service level</small><strong>{item.service}%</strong></span><span><small>Pre-position</small><strong>{item.inventory}</strong></span><span><small>Biaya</small><strong>{item.cost}</strong></span><span><small>Aging risk</small><strong>{item.waste}</strong></span></div></button>; })}</div>
        <div className="seasonal-wave-head"><span>Gelombang</span><span>Timing</span><span>Volume</span><span>Wilayah fokus</span><span>Tindakan utama</span><span>Status</span></div><div className="seasonal-waves">{waves.map((wave, index) => <article key={wave.wave}><span><b>{index + 1}</b><strong>{wave.wave}</strong></span><span>{wave.timing}</span><span>{wave.volume} rb ton</span><span>{wave.focus}</span><span>{wave.action}</span><span>{wave.status}</span></article>)}</div>
        <div className="seasonal-action-note"><Sparkles size={18} /><div><strong>Rekomendasi Control Tower</strong><p>Eksekusi Gelombang 1 sekarang, validasi demand harian mulai H-30, dan gunakan replenishment adaptif untuk mengurangi inventory rata-rata hingga 25% tanpa menurunkan service level.</p></div><button type="button" onClick={() => onNotify("Rencana pre-positioning dikirim ke Approval Center")}><Send size={15} />Ajukan Rencana</button></div>
      </section>

      <section className={`seasonal-report ${reportState === "Report siap" ? "ready" : ""}`} id="seasonal-report">
        <header><div><span>LANGKAH 4</span><h2>Report Rekomendasi Musiman</h2><p>Executive brief untuk keputusan penyaluran dan kesiapan wilayah.</p></div><span>{reportState}</span></header>
        <div className="seasonal-report-grid"><section><div><span>EXECUTIVE SUMMARY</span><strong>{eventType}</strong><small>Skenario +{uplift}% demand • {peakWeeks} minggu • buffer {bufferDays} hari</small></div><p>Model memproyeksikan tambahan demand <b>{Math.round(uplift * 54.2).toLocaleString("id-ID")} ribu ton</b>. Sebanyak <b>{criticalRegions.length} wilayah</b> memerlukan tindakan. Strategi <b>{activeStrategy.label}</b> merekomendasikan pre-positioning {activeStrategy.inventory} mulai H-45 untuk menjaga service level {activeStrategy.service}%.</p><h3>Keputusan yang direkomendasikan</h3><ol><li>Setujui Gelombang 1 untuk Papua, NTT, dan Sumatera Utara dalam 2×24 jam.</li><li>Kunci kapasitas gudang, armada, dan slot kapal sebelum H-30.</li><li>Aktifkan monitoring sell-out, harga, dan stok harian selama periode puncak.</li><li>Sesuaikan Gelombang 3 berdasarkan forecast error dan realisasi program.</li></ol></section><aside><span>PAKET REPORT</span><h3>Siap untuk review</h3><ul>{["Executive summary", "Asumsi & kalender event", "Forecast per Kanwil", "Rencana pre-positioning", "Kebutuhan moda & gudang", "Risiko, guardrail & audit"].map((item) => <li key={item}><CheckCircle2 size={15} />{item}</li>)}</ul><button type="button" className="download" onClick={() => onNotify("Report Seasonal Demand Surge siap diunduh")}><Download size={16} />Unduh Report PDF</button><button type="button" onClick={() => onNotify("Report dikirim untuk persetujuan")}><Send size={16} />Kirim untuk Persetujuan</button></aside></div>
      </section>

      <footer className="seasonal-disclaimer"><AlertTriangle size={16} /><span><strong>Mode simulasi—bukan instruksi operasional.</strong> Data contoh harus diganti dengan kalender resmi, histori penyaluran, harga, WMS, demand wilayah, Simotandi, TMS/Simlog, dan aturan program BULOG sebelum dipakai untuk keputusan.</span></footer>
    </section>
  );
}

function InventoryMonitorPage({ kind, onNotify }: { kind: Exclude<InventoryWorkspaceKind, "simulation">; onNotify: (message: string) => void }) {
  const [period,setPeriod]=useState("Year to Date 2026");
  const [commodity,setCommodity]=useState("Beras CBP");
  const [region,setRegion]=useState("Nasional");
  const [updated,setUpdated]=useState("12 Agustus 2026 · 08:30 WIB");
  const safetyRows=[
    ["Jawa Timur",921000,86500,1065,"Aman"],["Jawa Tengah",443000,52200,849,"Aman"],["Jawa Barat",970000,61800,1570,"Aman"],["Sumatera Utara",160000,34700,461,"Aman"],["Sulselbar",827000,49600,1667,"Aman"],["NTB",281000,31800,884,"Aman"],["Maluku",21500,24300,88,"Di bawah SS"],["Papua",21188,34700,61,"Kritis"],
  ] as const;
  const qualityRows=[
    ["LOT-JTM-2401","GBB Surabaya","Jawa Timur",14.2,128400,82,13.6,0.18,"Percepat keluar"],["LOT-SLB-2312","Gudang Panaikang","Sulselbar",16.8,96400,76,14.1,0.42,"QC ulang"],["LOT-SUM-2402","Gudang Medan II","Sumut",12.5,87300,85,13.2,0.12,"FEFO"],["LOT-NTB-2311","Dasan Cermen","NTB",18.1,45200,71,14.4,0.55,"Tindakan ≤7 hari"],["LOT-JTG-2403","Randugarut","Jawa Tengah",10.7,112600,88,12.9,0.10,"Monitor"],["LOT-PAP-2401","Gudang Jayapura","Papua",15.4,38400,74,14.2,0.49,"QC ulang"],
  ] as const;
  const mutationRows=[
    ["MTS-260812-0842","GBB Surabaya","Gudang Jayapura","Beras Medium",8500,"Kapal","Dalam perjalanan","18 Agu 2026"],["MTS-260812-0791","GBB Semarang","Gudang Ambon","Beras CBP",4200,"Kapal","Menunggu muat","16 Agu 2026"],["MTS-260811-0644","Gudang Subang","GBB Bandung","Beras Premium",1850,"Truk","Tiba","12 Agu 2026"],["MTS-260811-0588","Gudang Medan II","Gudang Pekanbaru","Beras Medium",3100,"Truk","Dalam perjalanan","13 Agu 2026"],["MTS-260810-0472","Gudang Panaikang","Gudang Kendari","Beras CBP",2750,"Kapal","Tertunda","15 Agu 2026"],["MTS-260809-0381","Dasan Cermen","Gudang Kupang","Beras Medium",1900,"Kapal","Dokumen belum lengkap","17 Agu 2026"],
  ] as const;
  const configs={
    safety:{eyebrow:"PERSEDIAAN / SAFETY STOCK",title:"Safety Stock",subtitle:"Monitor kecukupan stok pengaman, days of stock, dan wilayah yang memerlukan replenishment—tanpa tampilan peta.",accent:"#245f99",kpis:[["Total stok setara beras","5.252.664,64","Ton","+9,5% vs target"],["Total safety stock","375.003","Ton","14 hari kebutuhan"],["Coverage nasional","1.400,7","%","Stok / safety stock"],["Wilayah di bawah SS","2","Kanwil","Maluku dan Papua"]],section:"Stok Aktual vs Safety Stock per Kanwil"},
    quality:{eyebrow:"PERSEDIAAN / AGING & KUALITAS",title:"Aging & Kualitas",subtitle:"Kendalikan umur simpan, mutu per lot, risiko penurunan kualitas, dan prioritas FEFO stok CBP.",accent:"#8a5a18",kpis:[["Stok >4 bulan","2.418.665,9","Ton","46,05% total stok"],["Lot perlu tindakan","38","Lot","≤30 hari"],["Volume risiko mutu","396.700","Ton","Skor mutu <78"],["Potensi disposal","Rp184","Miliar","Tanpa mitigasi"]],section:"Distribusi Umur Stok dan Risiko Kualitas"},
    mutation:{eyebrow:"PERSEDIAAN / MUTASI STOK",title:"Mutasi Stok",subtitle:"Pantau perpindahan stok antargudang, dokumen, moda, ETA, dan exception perjalanan secara end-to-end.",accent:"#167a66",kpis:[["Mutasi berjalan","24.870","Ton","18 perjalanan"],["Inbound hari ini","8.460","Ton","11 gudang penerima"],["Outbound hari ini","11.320","Ton","14 gudang pengirim"],["Mutasi terlambat","3","Perjalanan","8.850 ton"]],section:"Monitoring Pergerakan Stok"},
  } as const;
  const config=configs[kind];
  return <section className="inventory-ops-page" style={{"--inventory-accent":config.accent} as CSSProperties} aria-label={config.title}>
    <header className="inventory-ops-header"><div><span>{config.eyebrow}</span><h1>{config.title}</h1><p>{config.subtitle}</p></div><div className="inventory-updated"><i/><span><small>Pembaruan terakhir</small><strong>{updated}</strong></span><button type="button" onClick={()=>{setUpdated("Baru saja");onNotify(`${config.title} diperbarui`)}}><RotateCw size={16}/></button></div></header>
    <section className="inventory-filters">{[["Periode",period,setPeriod,["Year to Date 2026","Bulan Berjalan","30 Hari Terakhir"]],["Komoditas",commodity,setCommodity,["Beras CBP","Beras Medium","Beras Premium","Semua Komoditas"]],["Wilayah",region,setRegion,["Nasional","Sumatera","Jawa","Kalimantan","Sulawesi","Bali & Nusra","Maluku & Papua"]]].map(([label,value,setter,options])=><label key={label as string}><span>{label as string}</span><select value={value as string} onChange={(event)=>(setter as (value:string)=>void)(event.target.value)}>{(options as string[]).map((option)=><option key={option}>{option}</option>)}</select></label>)}<button type="button" onClick={()=>onNotify(`Report ${config.title} siap diunduh`)}><Download size={15}/>Ekspor Report</button></section>
    <section className="inventory-kpis">{config.kpis.map(([label,value,unit,note],index)=><article key={label}><header><span>{label}</span><em className={index===3?"risk":index===2?"watch":"good"}>{index===3?"Perlu tindakan":index===2?"Monitor":"Terkendali"}</em></header><strong>{value}</strong><small>{unit}</small><footer><i/><span>{note}</span></footer></article>)}</section>
    {kind==="safety"&&<>
      <section className="inventory-card"><header><div><span>STATUS NASIONAL</span><h2>{config.section}</h2><p>Perbandingan stok siap salur dengan threshold safety stock yang disahkan.</p></div><span className="inventory-legend"><i/>Stok aktual<i/>Safety stock</span></header><div className="safety-chart-head"><span>Kanwil</span><span>Perbandingan volume</span><span>Stok</span><span>Safety Stock</span><span>Coverage</span><span>Status</span></div><div className="safety-chart">{safetyRows.map(([name,stock,safety,coverage,status])=><article key={name}><strong>{name}</strong><span><i><b style={{width:`${Math.max(4,Math.min(100,Number(stock)/10000))}%`}}/><em style={{width:`${Math.max(2,Math.min(100,Number(safety)/10000))}%`}}/></i></span><span>{Number(stock).toLocaleString("id-ID")}</span><span>{Number(safety).toLocaleString("id-ID")}</span><span>{coverage}%</span><em className={status==="Kritis"?"critical":status==="Di bawah SS"?"warning":"safe"}>{status}</em></article>)}</div></section>
      <div className="inventory-two-col"><section className="inventory-card safety-forecast"><header><div><span>PROYEKSI 30 HARI</span><h2>Days of Stock</h2></div><ChartNoAxesCombined size={20}/></header><div>{[["Hari ini",42],["+7 hari",38],["+14 hari",34],["+21 hari",30],["+30 hari",26]].map(([label,value])=><span key={label as string}><b style={{height:`${Number(value)*2}%`}}/><small>{label}</small><strong>{value} hari</strong></span>)}</div></section><section className="inventory-card inventory-recommendation"><header><div><span>REKOMENDASI CONTROL TOWER</span><h2>Tindakan Prioritas</h2></div><Sparkles size={20}/></header>{[["01","Papua","Redistribusi 8.500 ton dari Jawa Timur","Hari ini"],["02","Maluku","Top-up 4.200 ton dari Jawa Tengah","2×24 jam"],["03","NTB","Tahan outbound non-prioritas","7 hari"]].map(([no,name,action,due])=><article key={no}><b>{no}</b><div><strong>{name}</strong><small>{action}</small></div><span>{due}</span><button type="button" onClick={()=>onNotify(`Tindakan ${name} diajukan`)}>Ajukan</button></article>)}</section></div>
    </>}
    {kind==="quality"&&<>
      <section className="inventory-card"><header><div><span>AGING DISTRIBUTION</span><h2>{config.section}</h2><p>Segmentasi umur simpan dan volume yang memerlukan prioritas FEFO.</p></div><span className="inventory-legend"><i/>Normal<i/>Monitor<i/>Risiko</span></header><div className="aging-bucket-chart">{[["0–1 bulan",698464,13,"Normal"],["1–2 bulan",693915,13,"Normal"],["2–3 bulan",646080,12,"Normal"],["3–4 bulan",796811,15,"Monitor"],[">4 bulan",2418666,47,"Risiko"]].map(([label,volume,share,status])=><article key={label as string}><span><strong>{label}</strong><small>{Number(volume).toLocaleString("id-ID")} ton</small></span><i><b className={status==="Risiko"?"risk":status==="Monitor"?"watch":"good"} style={{width:`${share}%`}}/></i><span>{share}%</span><em>{status}</em></article>)}</div></section>
      <section className="inventory-card quality-table"><header><div><span>LOT MONITORING</span><h2>Prioritas Kualitas per Lot</h2></div><button type="button" onClick={()=>onNotify("Jadwal inspeksi QC dibuat")}><CalendarDays size={15}/>Jadwalkan QC</button></header><div className="quality-head"><span>Lot / Gudang</span><span>Kanwil</span><span>Umur</span><span>Volume</span><span>Skor mutu</span><span>Kadar air</span><span>Risiko</span><span>Rekomendasi</span></div>{qualityRows.map(([lot,warehouse,kanwil,age,volume,score,moisture,risk,action])=><article key={lot}><span><strong>{lot}</strong><small>{warehouse}</small></span><span>{kanwil}</span><span>{age} bulan</span><span>{Number(volume).toLocaleString("id-ID")} ton</span><span><b className={Number(score)<78?"risk":"good"}>{score}</b>/100</span><span>{moisture}%</span><span>{Number(risk)*100}%</span><button type="button" onClick={()=>onNotify(`${lot}: ${action}`)}>{action}</button></article>)}</section>
    </>}
    {kind==="mutation"&&<>
      <section className="inventory-card mutation-flow"><header><div><span>FLOW SUMMARY</span><h2>{config.section}</h2><p>Volume mutasi aktif menurut status perjalanan dan kelengkapan dokumen.</p></div><Route size={21}/></header><div>{[["Draft",4200,4,"#8b9aaa"],["Menunggu muat",6100,5,"#dda31e"],["Dalam perjalanan",11600,6,"#28649f"],["Tiba / verifikasi",2970,3,"#25805a"]].map(([status,volume,count,color])=><article key={status as string}><span><strong>{status}</strong><small>{count} perjalanan</small></span><b>{Number(volume).toLocaleString("id-ID")} ton</b><i><em style={{width:`${Number(volume)/130}%`,background:String(color)}}/></i></article>)}</div></section>
      <section className="inventory-card mutation-table"><header><div><span>SHIPMENT CONTROL</span><h2>Daftar Mutasi Stok Aktif</h2></div><button type="button" onClick={()=>onNotify("Mutasi stok baru dibuat")}><Plus size={15}/>Buat Mutasi</button></header><div className="mutation-head"><span>ID Mutasi</span><span>Asal → Tujuan</span><span>Komoditas</span><span>Volume</span><span>Moda</span><span>Status</span><span>ETA</span><span>Aksi</span></div>{mutationRows.map(([id,origin,destination,item,volume,mode,status,eta])=><article key={id}><span><strong>{id}</strong><small>ERP + TMS</small></span><span><strong>{origin}</strong><small>→ {destination}</small></span><span>{item}</span><span>{Number(volume).toLocaleString("id-ID")} ton</span><span>{mode}</span><em className={status==="Tertunda"||status==="Dokumen belum lengkap"?"risk":status==="Tiba"?"good":"watch"}>{status}</em><span>{eta}</span><button type="button" onClick={()=>onNotify(`Detail ${id} dibuka`)}>Detail</button></article>)}</section>
    </>}
    <footer className="inventory-ops-disclaimer"><Database size={15}/><span><b>Data demonstrasi.</b> Halaman harus terhubung ke ERP, WMS, QMS, TMS/Simlog, IoT gudang, dan master parameter resmi sebelum digunakan sebagai dasar keputusan operasional.</span></footer>
  </section>;
}

function InventorySimulationPage({onNotify}:{onNotify:(message:string)=>void}){
  const [horizon,setHorizon]=useState(90);const [demandGrowth,setDemandGrowth]=useState(12);const [supplyShock,setSupplyShock]=useState(10);const [safetyDays,setSafetyDays]=useState(14);const [strategy,setStrategy]=useState<"balanced"|"service"|"lean">("balanced");const [running,setRunning]=useState(false);const [reportReady,setReportReady]=useState(false);const [lastRun,setLastRun]=useState("Belum dijalankan");
  const strategyFactor=strategy==="service"?1.12:strategy==="lean"?.88:1;const projectedStock=Math.max(1.2,5.253-(horizon/365)*3.8*(1+demandGrowth/100)+(horizon/365)*2.9*(1-supplyShock/100));const minStock=.375*(safetyDays/14);const service=Math.min(99.4,Math.max(78,93.6-supplyShock*.32-demandGrowth*.18+(strategy==="service"?5.2:strategy==="lean"?-2.4:2.1)));const redistribution=Math.round((demandGrowth*8.4+supplyShock*6.7)*strategyFactor);const procurement=Math.round((Math.max(0,minStock+1.1-projectedStock))*1000*strategyFactor);const riskRegions=Math.max(1,Math.round((demandGrowth+supplyShock)/5-(strategy==="service"?2:strategy==="balanced"?1:0)));const cost=Math.round((redistribution*1.42+procurement*11.8)/10);
  const projections=[["Jawa Timur",921,184,38],["Jawa Barat",970,156,31],["Sumatera Utara",160,54,19],["Sulselbar",827,122,34],["NTB",281,48,17],["Maluku",22,-18,9],["Papua",21,-31,7]].map(([name,stock,balance,days])=>({name:String(name),stock:Number(stock),balance:Number(balance)-Math.round(demandGrowth*1.7+supplyShock*1.2),days:Math.max(3,Number(days)-Math.round((demandGrowth+supplyShock)/4))}));
  function run(){setRunning(true);setReportReady(false);window.setTimeout(()=>{setRunning(false);setLastRun("Baru saja");onNotify("Simulasi persediaan selesai")},850)}
  return <section className="inventory-sim-page" aria-label="Simulasi Persediaan"><header className="inventory-sim-header"><div><span>PERSEDIAAN / SIMULASI</span><h1>Simulasi Persediaan</h1><p>Uji kecukupan stok CBP, demand, pasokan, safety stock, dan kebutuhan redistribusi sebelum rencana diajukan.</p></div><div><span><Clock3 size={14}/>Simulasi terakhir: {lastRun}</span><button type="button" onClick={()=>onNotify("Draf simulasi disimpan")}><Save size={15}/>Simpan Draf</button><button type="button" className="primary" onClick={()=>{setReportReady(true);setTimeout(()=>document.getElementById("inventory-sim-report")?.scrollIntoView({behavior:"smooth"}),50)}}><FileText size={15}/>Buat Report</button></div></header>
    <section className="inventory-sim-alert"><FlaskConical size={22}/><div><strong>What-if inventory control</strong><p>Model menguji perubahan permintaan dan pasokan terhadap days of stock, safety stock, kapasitas gudang, serta service level per Kanwil.</p></div><span>Mode simulasi</span></section>
    <section className="inventory-sim-card"><header><div><span>LANGKAH 1</span><h2>Definisikan Skenario</h2><p>Gunakan asumsi yang dapat ditelusuri dan guardrail operasional BULOG.</p></div><SlidersHorizontal size={22}/></header><div className="inventory-sim-builder"><div className="inventory-sim-fields"><label><span>Cakupan</span><select defaultValue="Nasional"><option>Nasional</option><option>Region</option><option>Kanwil</option></select></label><label><span>Komoditas</span><select defaultValue="Beras CBP"><option>Beras CBP</option><option>Beras Medium</option><option>Beras Premium</option></select></label><label><span>Horizon simulasi</span><select value={horizon} onChange={(e)=>setHorizon(Number(e.target.value))}><option value={30}>30 hari</option><option value={60}>60 hari</option><option value={90}>90 hari</option><option value={180}>180 hari</option></select></label></div><div className="inventory-sim-sliders"><label><span><b>Pertumbuhan demand</b><strong>+{demandGrowth}%</strong></span><input type="range" min="-10" max="40" value={demandGrowth} onChange={(e)=>setDemandGrowth(Number(e.target.value))}/></label><label><span><b>Gangguan pasokan</b><strong>-{supplyShock}%</strong></span><input type="range" min="0" max="50" value={supplyShock} onChange={(e)=>setSupplyShock(Number(e.target.value))}/></label><label><span><b>Minimum safety stock</b><strong>{safetyDays} hari</strong></span><input type="range" min="7" max="30" value={safetyDays} onChange={(e)=>setSafetyDays(Number(e.target.value))}/></label></div><aside><h3>Guardrail Aktif</h3>{["Safety stock minimum per Kanwil","Kapasitas gudang maksimum 85%","FEFO dan risiko kualitas","Lead time darat/laut tervalidasi","Stok strategis tidak boleh dialihkan","Approval untuk eksekusi"].map((item)=><span key={item}><CheckCircle2 size={14}/>{item}</span>)}</aside></div><div className="inventory-strategy"><span>Strategi optimasi</span>{[["balanced","Seimbang","Layanan, biaya, aging"],["service","Service Maksimum","Prioritas availability"],["lean","Inventory Lean","Stok minimum, replenishment sering"]].map(([id,label,detail])=><button type="button" key={id} className={strategy===id?"selected":""} onClick={()=>setStrategy(id as typeof strategy)}><strong>{label}</strong><small>{detail}</small></button>)}</div><button type="button" className="inventory-sim-run" onClick={run} disabled={running}><Play size={17}/>{running?"Menghitung 26 Kanwil dan 400+ gudang…":"Jalankan Simulasi"}</button></section>
    <section className="inventory-sim-card"><header><div><span>LANGKAH 2</span><h2>Hasil Proyeksi Nasional</h2><p>Posisi akhir horizon dibandingkan dengan baseline dan guardrail.</p></div><span className="sim-confidence">Confidence 91%</span></header><div className="inventory-sim-kpis"><article><span>Proyeksi stok akhir</span><strong>{projectedStock.toFixed(2)} jt ton</strong><small>Baseline 5,25 jt ton</small></article><article className="risk"><span>Wilayah berisiko</span><strong>{riskRegions} Kanwil</strong><small>di bawah safety stock</small></article><article><span>Redistribusi</span><strong>{redistribution} rb ton</strong><small>antar-Kanwil</small></article><article><span>Tambahan pengadaan</span><strong>{procurement} rb ton</strong><small>selama horizon</small></article><article className="good"><span>Service level</span><strong>{service.toFixed(1)}%</strong><small>target ≥95%</small></article></div><div className="inventory-sim-results"><section><h3>Proyeksi per Kanwil</h3><div className="sim-region-head"><span>Kanwil</span><span>Stok awal</span><span>Balance</span><span>Days of stock</span><span>Status</span></div>{projections.map((item)=><article key={item.name}><strong>{item.name}</strong><span>{item.stock} rb</span><span className={item.balance<0?"negative":"positive"}>{item.balance>0?"+":""}{item.balance} rb</span><span>{item.days} hari</span><em className={item.days<safetyDays?"risk":"safe"}>{item.days<safetyDays?"Shortage risk":"Aman"}</em></article>)}</section><aside><span>REKOMENDASI MODEL</span><h3>{riskRegions} Kanwil memerlukan intervensi</h3><p>Strategi <b>{strategy==="balanced"?"Seimbang":strategy==="service"?"Service Maksimum":"Inventory Lean"}</b> menjaga proyeksi service level {service.toFixed(1)}% dengan redistribusi {redistribution} ribu ton.</p><div><CircleDollarSign size={16}/><span><b>Rp{cost.toLocaleString("id-ID")} M</b><small>estimasi biaya tindakan</small></span></div><button type="button" onClick={()=>onNotify("Rencana simulasi dikirim ke Approval Center")}><Send size={15}/>Ajukan Rencana</button></aside></div></section>
    <section className={`inventory-sim-report${reportReady?" ready":""}`} id="inventory-sim-report"><header><div><span>LANGKAH 3</span><h2>Report Rekomendasi</h2></div><em>{reportReady?"Report siap":"Pratinjau dinamis"}</em></header><div><section><h3>Executive Summary</h3><p>Dalam horizon <b>{horizon} hari</b>, skenario demand {demandGrowth>=0?"+":""}{demandGrowth}% dan gangguan pasokan -{supplyShock}% memproyeksikan stok akhir <b>{projectedStock.toFixed(2)} juta ton</b>. Model merekomendasikan redistribusi <b>{redistribution} ribu ton</b> dan tambahan pengadaan <b>{procurement} ribu ton</b>.</p><ol><li>Prioritaskan Papua dan Maluku tanpa menurunkan safety stock wilayah sumber.</li><li>Kunci kapasitas moda dan gudang penerima sebelum approval.</li><li>Gunakan FEFO untuk lot aging yang layak dialihkan.</li><li>Monitor realisasi harian dan jalankan ulang model saat deviasi &gt;10%.</li></ol></section><aside>{["Asumsi dan versi model","Proyeksi per Kanwil","Rencana redistribusi","Tambahan pengadaan","Biaya dan service level","Risiko dan audit trail"].map((item)=><span key={item}><CheckCircle2 size={14}/>{item}</span>)}<button type="button" onClick={()=>onNotify("Report simulasi persediaan siap diunduh")}><Download size={15}/>Unduh PDF</button></aside></div></section>
    <footer className="inventory-ops-disclaimer"><AlertTriangle size={15}/><span><b>Mode simulasi—bukan instruksi operasional.</b> Angka contoh harus diganti dengan stok ERP/WMS, forecast demand, kontrak pengadaan, kapasitas gudang, lead time TMS/Simlog, parameter safety stock, dan aturan CBP yang berlaku.</span></footer>
  </section>
}

type SalesOrder={id:string;customer:string;channel:string;product:string;region:string;quantity:number;requested:string;fulfilled:number;status:"Released"|"Allocated"|"Partial"|"Delivered"|"Blocked";value:string};

function SalesDistributionPage({mode,onSwitch,onNotify}:{mode:SalesWorkspaceKind;onSwitch:(mode:SalesWorkspaceKind)=>void;onNotify:(message:string)=>void}){
  const labels:Record<SalesWorkspaceKind,string>={summary:"Ringkasan Penjualan & Penyaluran",commercial:"Penjualan Komersial",programs:"Penyaluran Program",regional:"Kinerja Wilayah Penjualan & Penyaluran",fulfillment:"Order Fulfillment",simulation:"Simulasi Penyaluran"};
  const descriptions:Record<SalesWorkspaceKind,string>={summary:"Kendali target, realisasi, layanan, dan exception penjualan serta penyaluran pangan secara nasional.",commercial:"Pantau volume, pendapatan, margin kontribusi, pelanggan, kanal, dan produk komersial BULOG.",programs:"Kawal penyaluran SPHP, Bantuan Pangan, CBP, dan program pemerintah sampai titik serah serta penerima.",regional:"Bandingkan pencapaian Kanwil secara adil berdasarkan target, demand, service level, kualitas eksekusi, dan potensi pasar.",fulfillment:"Kendalikan order-to-delivery dari validasi pesanan, alokasi stok, release, pengiriman, hingga proof of delivery.",simulation:"Uji alokasi stok dan kapasitas penyaluran untuk menjaga target program, pemerataan wilayah, service level, dan biaya."};
  const orders:SalesOrder[]=[
    {id:"SO-260818-1042",customer:"PT Sumber Alfaria Trijaya",channel:"Modern Trade",product:"Beras Medium SPHP 5 kg",region:"Jawa Barat",quantity:1450,requested:"20 Agu 2026",fulfilled:84,status:"Allocated",value:"Rp18,6 M"},
    {id:"SO-260818-1038",customer:"Dinas Pangan Provinsi Papua",channel:"Program Pemerintah",product:"Beras CBP Bulk",region:"Papua",quantity:6100,requested:"22 Agu 2026",fulfilled:62,status:"Partial",value:"Rp72,4 M"},
    {id:"SO-260818-1027",customer:"RPK Rumah Pangan Kita",channel:"RPK",product:"Beras Premium 5 kg",region:"Sumatera Utara",quantity:780,requested:"19 Agu 2026",fulfilled:100,status:"Delivered",value:"Rp11,2 M"},
    {id:"SO-260817-0994",customer:"Pemprov Nusa Tenggara Timur",channel:"Bantuan Pangan",product:"Beras Medium CBP",region:"Nusa Tenggara Timur",quantity:3350,requested:"21 Agu 2026",fulfilled:76,status:"Released",value:"Rp39,8 M"},
    {id:"SO-260817-0971",customer:"PT Indomarco Prismatama",channel:"Modern Trade",product:"Minyak Goreng Kita 1 L",region:"Nasional",quantity:920,requested:"18 Agu 2026",fulfilled:41,status:"Blocked",value:"Rp13,9 M"},
    {id:"SO-260817-0958",customer:"Mitra Horeka Makassar",channel:"B2B / Horeka",product:"Beras Premium 25 kg",region:"Sulselbar",quantity:460,requested:"19 Agu 2026",fulfilled:91,status:"Allocated",value:"Rp7,4 M"},
  ];
  const regionRows=[["Jawa Timur",112.4,"428 rb ton",97.2,"Rp3,84 T","On Track"],["Jawa Tengah",103.7,"346 rb ton",96.1,"Rp2,91 T","On Track"],["Sulselbar",96.8,"219 rb ton",91.4,"Rp1,82 T","Watch"],["Sumatera Utara",93.1,"188 rb ton",94.7,"Rp1,55 T","Watch"],["Jawa Barat",88.6,"275 rb ton",89.2,"Rp2,36 T","At Risk"],["Papua",76.4,"68 rb ton",82.4,"Rp624 M","Critical"]];
  const programs=[["SPHP Beras","1,50 jt ton","1,14 jt ton",76.0,"14.820 titik","Watch"],["Bantuan Pangan","1,95 jt ton","1,72 jt ton",88.2,"21,35 jt KPM","On Track"],["CBP Tanggap Darurat","186 rb ton","173 rb ton",93.0,"38 kejadian","On Track"],["Stabilisasi Jagung","420 rb ton","286 rb ton",68.1,"1.840 peternak","At Risk"],["Gerakan Pangan Murah","210 rb ton","194 rb ton",92.4,"6.275 kegiatan","On Track"]];
  const [period,setPeriod]=useState("Year to Date 2026");const [query,setQuery]=useState("");const [status,setStatus]=useState("Semua Status");const [selected,setSelected]=useState<SalesOrder|null>(orders[0]);const [demand,setDemand]=useState(14);const [stock,setStock]=useState(88);const [capacity,setCapacity]=useState(82);const [priority,setPriority]=useState(70);const [reportReady,setReportReady]=useState(false);
  const filtered=orders.filter(order=>(`${order.id} ${order.customer} ${order.channel} ${order.product} ${order.region}`.toLowerCase().includes(query.toLowerCase()))&&(status==="Semua Status"||order.status===status));const projectedService=Math.max(72,Math.min(99,93.8-(demand-10)*.34+(stock-85)*.2+(capacity-80)*.12));const allocation=Math.round(275*(stock/100)*(capacity/100));const gap=Math.max(0,Math.round((demand*18)-(stock-75)*7));const cost=Math.round(164+(100-capacity)*1.8+priority*.22);
  const kpis=mode==="commercial"?[["Volume penjualan","2,08 jt","Ton YTD"],["Pendapatan","Rp18,74 T","91,8% target"],["Margin kontribusi","8,6%","+0,7 pp"],["Pelanggan aktif","4.286","B2B · Retail · RPK"],["Order at risk","42.680","Ton"]]:[["Volume tersalurkan","3,91 jt","Ton YTD"],["Realisasi target","88,2%","Target 4,44 jt ton"],["Fill rate","94,6%","Target ≥97%"],["Order aktif","1.284","Across all channels"],["Service at risk","52.430","Ton"]];
  return <section className="distribution-page sales-page" aria-label={labels[mode]}><header className="distribution-header"><div><span>SUPPLY CHAIN MONITORING / PENJUALAN &amp; PENYALURAN</span><h1>{labels[mode]}</h1><p>{descriptions[mode]}</p></div><div className="distribution-fresh"><i/><span><small>Data ERP/CRM diperbarui</small><strong>18 Agustus 2026 · 09:18 WIB</strong></span><button onClick={()=>onNotify("Data penjualan dan penyaluran disinkronkan")}><RotateCw size={15}/></button></div></header><nav className="distribution-tabs">{(Object.keys(labels) as SalesWorkspaceKind[]).map(key=><button key={key} className={mode===key?"active":""} onClick={()=>onSwitch(key)}>{labels[key]}</button>)}</nav>
    {mode!=="simulation"&&<section className="distribution-filter"><label><span>PERIODE</span><select value={period} onChange={e=>setPeriod(e.target.value)}><option>Year to Date 2026</option><option>Kuartal III 2026</option><option>Bulan Berjalan</option></select></label><label><span>KOMODITAS</span><select><option>Semua Komoditas</option><option>Beras</option><option>Jagung</option><option>Gula</option><option>Minyak Goreng</option></select></label><label><span>PROGRAM / KANAL</span><select><option>Semua Program &amp; Kanal</option><option>SPHP</option><option>Bantuan Pangan</option><option>Komersial</option><option>RPK</option></select></label><label><span>WILAYAH</span><select><option>Nasional</option><option>Sumatera</option><option>Jawa</option><option>Sulawesi</option><option>Maluku &amp; Papua</option></select></label><button onClick={()=>onNotify(`Filter ${period} diterapkan`)}><Filter size={15}/>Terapkan</button></section>}
    {mode!=="simulation"&&<section className="distribution-kpis">{kpis.map(([label,value,note],i)=><article className={i===2||i===4?"risk":""} key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</section>}
    {mode==="summary"&&<><div className="sales-summary-grid"><section className="distribution-card sales-target"><header><div><span>TARGET VS REALISASI</span><h2>Kinerja Penjualan &amp; Program</h2></div><button onClick={()=>onSwitch("programs")}>Lihat program <ArrowRight size={14}/></button></header>{[["Penjualan Komersial",87.4,"2,08 jt / 2,38 jt ton","Rp18,74 T"],["SPHP Beras",76.0,"1,14 jt / 1,50 jt ton","14.820 titik"],["Bantuan Pangan",88.2,"1,72 jt / 1,95 jt ton","21,35 jt KPM"],["Penyaluran CBP",93.0,"173 rb / 186 rb ton","38 kejadian"]].map(([name,pct,volume,note])=><article key={name as string}><span><b>{name}</b><small>{volume}</small></span><div><i><em style={{width:`${pct}%`}}/></i><strong>{pct}%</strong></div><em>{note}</em></article>)}</section><aside className="distribution-card sales-priority"><header><div><span>PRIORITAS TINDAKAN</span><h2>Exception Berdampak Tinggi</h2></div><em>5 aktif</em></header>{[["Gap SPHP Papua","6.240 ton","Critical"],["Order minyak goreng terblokir","920 ton","High"],["Fill rate Sulselbar","91,4%","High"],["Target jagung tertinggal","133.980 ton","Medium"]].map(([name,value,severity])=><button key={name} onClick={()=>onSwitch("fulfillment")}><i className={severity.toLowerCase()}/><span><strong>{name}</strong><small>{value} · {severity}</small></span><ChevronRight size={15}/></button>)}</aside></div><section className="distribution-card sales-pipeline"><header><div><span>ORDER-TO-DELIVERY</span><h2>Pipeline Pemenuhan Pesanan</h2></div><button onClick={()=>onSwitch("fulfillment")}>Control order <ArrowRight size={14}/></button></header><div>{[["Order Masuk","1.642","100%"],["Tervalidasi","1.518","92%"],["Teralokasi","1.284","78%"],["Dikirim","1.096","67%"],["POD Selesai","942","57%"]].map(([name,value,pct],i)=><article key={name}><i>{i+1}</i><span><small>{name}</small><strong>{value}</strong><em>{pct} pipeline</em></span>{i<4&&<ArrowRight size={15}/>}</article>)}</div></section></>}
    {mode==="commercial"&&<div className="sales-commercial-grid"><section className="distribution-card sales-channel"><header><div><span>CHANNEL PERFORMANCE</span><h2>Penjualan per Kanal</h2></div><button onClick={()=>onNotify("Laporan kanal siap diekspor")}><Download size={14}/>Ekspor</button></header>{[["Modern Trade",612,"Rp6,42 T",92.1,9.4],["RPK & Traditional",548,"Rp4,86 T",87.6,8.8],["B2B / Horeka",398,"Rp3,71 T",84.2,10.1],["Marketplace",126,"Rp1,48 T",106.8,7.2],["Institusi",396,"Rp2,27 T",89.4,8.1]].map(([name,volume,revenue,achievement,margin])=><article key={name as string}><span><b>{name}</b><small>{volume} rb ton</small></span><strong>{revenue}</strong><div><i><em style={{width:`${Math.min(100,Number(achievement))}%`}}/></i><small>{achievement}% target</small></div><em>{margin}% margin</em></article>)}</section><aside className="distribution-card sales-products"><header><div><span>PRODUCT MIX</span><h2>Produk Komersial Utama</h2></div></header>{[["Beras Premium 5 kg","486 rb ton","Rp6,84 T","+8,4%"],["Beras Medium 5 kg","612 rb ton","Rp6,12 T","+4,1%"],["Minyak Goreng Kita","318 rb KL","Rp3,92 T","+11,2%"],["Gula ManisKita","274 rb ton","Rp2,78 T","-2,8%"],["Jagung Pakan","198 rb ton","Rp1,43 T","+6,3%"]].map(row=><article key={row[0]}><span><strong>{row[0]}</strong><small>{row[1]}</small></span><b>{row[2]}</b><em className={row[3].startsWith("-")?"risk":"good"}>{row[3]}</em></article>)}</aside></div>}
    {mode==="programs"&&<section className="distribution-card sales-program-table"><header><div><span>PROGRAM CONTROL</span><h2>Target dan Realisasi Program Penyaluran</h2></div><button onClick={()=>onNotify("Rekonsiliasi program dimulai")}><RotateCw size={14}/>Rekonsiliasi</button></header><div className="sales-program-head"><b>Program</b><b>Target</b><b>Realisasi</b><b>Pencapaian</b><b>Coverage</b><b>Status</b><b>Aksi</b></div>{programs.map(row=><article key={row[0]}><strong>{row[0]}</strong><span>{row[1]}</span><span>{row[2]}</span><div><i><em style={{width:`${row[3]}%`}}/></i><b>{row[3]}%</b></div><span>{row[4]}</span><em className={String(row[5]).toLowerCase().replace(" ","-")}>{row[5]}</em><button onClick={()=>onNotify(`Drill-down ${row[0]} dibuka`)}><ChevronRight size={15}/></button></article>)}<footer><ShieldCheck size={16}/><span>Penyaluran program direkonsiliasi terhadap surat perintah, alokasi, DO, BA serah terima, geo-tag POD, dan data penerima yang tervalidasi.</span></footer></section>}
    {mode==="regional"&&<div className="sales-regional-grid"><section className="distribution-card sales-ranking"><header><div><span>REGIONAL SCORECARD</span><h2>Ranking Kinerja Kanwil</h2></div><button onClick={()=>onNotify("Scorecard regional siap diunduh")}><Download size={14}/>Ekspor</button></header><div className="sales-ranking-head"><b>Rank / Kanwil</b><b>Pencapaian</b><b>Volume</b><b>Service Level</b><b>Pendapatan</b><b>Status</b></div>{regionRows.map((row,i)=><article key={row[0]}><span><i>{i+1}</i><strong>{row[0]}</strong></span><div><i><em style={{width:`${Math.min(100,Number(row[1]))}%`}}/></i><b>{row[1]}%</b></div><span>{row[2]}</span><span>{row[3]}%</span><span>{row[4]}</span><em className={String(row[5]).toLowerCase().replace(" ","-")}>{row[5]}</em></article>)}</section><aside className="distribution-card sales-regional-insight"><header><div><span>EXECUTIVE INSIGHT</span><h2>Peluang Pemulihan</h2></div><Sparkles size={18}/></header><strong>+84.600 ton</strong><p>Potensi tambahan realisasi sampai akhir bulan melalui pemulihan tiga wilayah prioritas.</p>{[["Jawa Barat","34.800 ton","Percepat alokasi modern trade"],["Papua","28.400 ton","Pulihkan stok & kapasitas distribusi"],["Sulselbar","21.400 ton","Tutup gap SPHP dan Horeka"]].map(row=><article key={row[0]}><span><b>{row[0]}</b><small>{row[2]}</small></span><em>{row[1]}</em></article>)}<button onClick={()=>onSwitch("simulation")}>Simulasikan pemulihan <ArrowRight size={14}/></button></aside></div>}
    {mode==="fulfillment"&&<div className="distribution-grid monitor sales-order-grid"><section className="distribution-card sales-orders"><header><div><span>ORDER CONTROL</span><h2>Order Fulfillment</h2></div><button onClick={()=>onNotify("Sales order baru dibuka")}><Plus size={14}/>Order Baru</button></header><div className="shipment-tools"><label><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari order, pelanggan, produk, wilayah…"/></label><select value={status} onChange={e=>setStatus(e.target.value)}><option>Semua Status</option><option>Released</option><option>Allocated</option><option>Partial</option><option>Delivered</option><option>Blocked</option></select></div><div className="sales-order-head"><b>Order / Pelanggan</b><b>Kanal / Produk</b><b>Wilayah</b><b>Qty</b><b>Requested</b><b>Fulfillment</b><b>Nilai</b><b>Status</b></div>{filtered.map(order=><button className={selected?.id===order.id?"selected":""} key={order.id} onClick={()=>setSelected(order)}><span><strong>{order.id}</strong><small>{order.customer}</small></span><span><strong>{order.channel}</strong><small>{order.product}</small></span><span>{order.region}</span><b>{order.quantity.toLocaleString("id-ID")} ton</b><span>{order.requested}</span><div><i><em style={{width:`${order.fulfilled}%`}}/></i><b>{order.fulfilled}%</b></div><strong>{order.value}</strong><em className={order.status.toLowerCase()}>{order.status}</em></button>)}</section><aside className="distribution-card sales-order-detail"><header><div><span>ORDER DETAIL</span><h2>{selected?.id}</h2></div><MoreVertical size={17}/></header>{selected&&<><div className="sales-order-hero"><span><small>Pelanggan</small><strong>{selected.customer}</strong><em>{selected.channel}</em></span><b>{selected.value}</b></div><dl><div><dt>Produk</dt><dd>{selected.product}</dd></div><div><dt>Jumlah</dt><dd>{selected.quantity.toLocaleString("id-ID")} ton</dd></div><div><dt>Requested date</dt><dd>{selected.requested}</dd></div><div><dt>Stok teralokasi</dt><dd>{selected.fulfilled}%</dd></div><div><dt>Credit / Budget</dt><dd>Validated</dd></div><div><dt>Delivery block</dt><dd>{selected.status==="Blocked"?"Perlu release":"Tidak ada"}</dd></div></dl><div className="sales-order-actions"><button onClick={()=>onNotify(`${selected.id} dialokasikan ulang`)}><Boxes size={14}/>Re-alokasi</button><button onClick={()=>onNotify(`Case ${selected.id} dibuat`)}><BellRing size={14}/>Buat Case</button></div></>}</aside></div>}
    {mode==="simulation"&&<><section className="distribution-sim-hero sales-sim-hero"><span><FlaskConical size={24}/></span><div><small>WHAT-IF SALES &amp; DISTRIBUTION</small><h2>Simulasi alokasi penyaluran nasional</h2><p>Optimalkan target program, fairness wilayah, service level, stok tersedia, dan kapasitas distribusi sebelum eksekusi.</p></div><em>Scenario SLS-260818-11</em></section><div className="distribution-sim-grid"><section className="distribution-card sim-controls"><header><div><span>LANGKAH 1</span><h2>Parameter Skenario</h2></div><button onClick={()=>{setDemand(14);setStock(88);setCapacity(82);setPriority(70);setReportReady(false)}}>Reset</button></header>{[["Lonjakan demand",demand,0,40,"%",setDemand],["Stok layak salur",stock,55,100,"%",setStock],["Kapasitas distribusi",capacity,50,100,"%",setCapacity],["Prioritas program publik",priority,30,100,"%",setPriority]].map(([name,value,min,max,unit,setter])=><label key={name as string}><span><b>{name}</b><strong>{value} {unit}</strong></span><input type="range" min={min as number} max={max as number} value={value as number} onChange={e=>{(setter as (n:number)=>void)(Number(e.target.value));setReportReady(false)}}/></label>)}<div className="sim-constraints"><b>Guardrail BULOG</b>{["Safety stock wilayah tidak dilanggar","Program publik mendapat prioritas minimum","Batas kapasitas gudang dan transportasi","Fairness allocation antarwilayah"].map(x=><span key={x}><CheckCircle2 size={14}/>{x}</span>)}</div><button className="primary" onClick={()=>{setReportReady(true);onNotify("Simulasi penyaluran selesai dihitung")}}><Play size={15}/>Jalankan Simulasi</button></section><section className="distribution-card sim-output"><header><div><span>LANGKAH 2</span><h2>Hasil Optimasi</h2></div><em>Confidence 90%</em></header><div className="sim-output-kpis"><article><span>Service level</span><strong>{projectedService.toFixed(1)}%</strong><small>Target ≥97%</small></article><article><span>Alokasi optimal</span><strong>{allocation} rb</strong><small>Ton</small></article><article className="risk"><span>Unserved demand</span><strong>{gap} rb</strong><small>Ton</small></article><article><span>Biaya / ton</span><strong>Rp{cost} rb</strong><small>Distribusi</small></article></div><div className="sim-recommendation"><Sparkles size={18}/><div><small>REKOMENDASI MODEL</small><h3>{projectedService>=97?"Skenario memenuhi guardrail":"Perlu tambahan stok dan kapasitas"}</h3><p>Prioritaskan Papua, NTT, dan Sulselbar; alokasikan {allocation} ribu ton; tambah receiving window; serta lindungi kuota SPHP dan Bantuan Pangan dari order komersial berprioritas lebih rendah.</p></div></div><div className="sales-allocation">{[["SPHP",42,"Prioritas harga"],["Bantuan Pangan",31,"Prioritas penerima"],["Komersial",19,"Margin & SLA"],["CBP Lainnya",8,"Contingency"]].map(([name,pct,note])=><article key={name as string}><span><b>{name}</b><small>{note}</small></span><i><em style={{width:`${pct}%`}}/></i><strong>{pct}%</strong></article>)}</div></section></div><section className={`distribution-card distribution-report${reportReady?" ready":""}`}><header><div><span>LANGKAH 3</span><h2>Report Rekomendasi Penyaluran</h2></div><em>{reportReady?"Siap diajukan":"Pratinjau dinamis"}</em></header><div><section><h3>Executive Summary</h3><p>Skenario demand +{demand}% dan stok layak salur {stock}% menghasilkan alokasi <b>{allocation} ribu ton</b>, service level <b>{projectedService.toFixed(1)}%</b>, dan unserved demand <b>{gap} ribu ton</b>.</p><ol><li>Lindungi kuota program publik dan wilayah berisiko shortage.</li><li>Release order mengikuti stock availability, credit/budget, serta slot distribusi.</li><li>Gunakan substitusi produk hanya setelah persetujuan pemilik program.</li><li>Monitor fulfillment harian dan re-run jika deviasi demand &gt;10%.</li></ol></section><aside>{["Asumsi & versi model","Alokasi program/wilayah","Daftar order prioritas","Kebutuhan stok & kapasitas","Biaya dan service level","Approval & audit trail"].map(x=><span key={x}><CheckCircle2 size={14}/>{x}</span>)}<button onClick={()=>onNotify("Rencana penyaluran dikirim ke Approval Center")}><Send size={15}/>Ajukan Rencana</button><button onClick={()=>onNotify("Report penyaluran siap diunduh")}><Download size={15}/>Unduh Report</button></aside></div></section></>}
    <footer className="distribution-disclaimer"><AlertTriangle size={15}/><span><b>Data demonstrasi untuk desain SCCT.</b> Produksi memerlukan integrasi ERP sales order, CRM/customer master, WMS/ATP, TMS, billing, data program dan penerima, harga, kontrak, credit limit, POD, serta kebijakan penyaluran BULOG yang berlaku.</span></footer>
  </section>
}

type DistributionShipment={id:string;corridor:string;origin:string;destination:string;mode:string;transporter:string;volume:number;eta:string;progress:number;status:"On Time"|"At Risk"|"Delayed"|"Delivered";program:string};

function DistributionWorkspacePage({mode,onSwitch,onNotify}:{mode:DistributionWorkspaceKind;onSwitch:(mode:DistributionWorkspaceKind)=>void;onNotify:(message:string)=>void}){
  const labels:Record<DistributionWorkspaceKind,string>={summary:"Ringkasan Distribusi",shipments:"Monitoring Pengiriman",routes:"Kinerja Rute",otif:"Kinerja OTIF",exceptions:"Exception Distribusi",simulation:"Simulasi Distribusi"};
  const descriptions:Record<DistributionWorkspaceKind,string>={summary:"Kendali nasional arus komoditas, kapasitas angkut, service level, biaya, dan exception distribusi BULOG.",shipments:"Pantau shipment end-to-end dari release order, loading, perjalanan, bongkar, hingga proof of delivery.",routes:"Evaluasi produktivitas koridor, lead time, biaya per ton, utilisasi muatan, dan risiko rute.",otif:"Ukur ketepatan waktu dan kelengkapan pengiriman terhadap janji layanan per Kanwil, program, dan moda.",exceptions:"Prioritaskan gangguan distribusi berdasarkan dampak stok, layanan publik, biaya, dan SLA penanganan.",simulation:"Uji skenario volume, gangguan koridor, kapasitas moda, dan biaya sebelum rencana distribusi diajukan."};
  const shipments:DistributionShipment[]=[
    {id:"SHP-260818-041",corridor:"Surabaya → Makassar",origin:"GBB Banjar Kemantren II",destination:"GBB Panaikang",mode:"Kapal + Truk",transporter:"PT Djakarta Lloyd",volume:8500,eta:"19 Agu · 14:20",progress:72,status:"At Risk",program:"CBP"},
    {id:"SHP-260818-038",corridor:"Jakarta → Medan",origin:"Gudang Sunter Timur",destination:"GBB Mabar",mode:"Kapal",transporter:"PT Pelni Logistik",volume:6200,eta:"20 Agu · 08:00",progress:54,status:"On Time",program:"SPHP"},
    {id:"SHP-260818-032",corridor:"Makassar → Jayapura",origin:"GBB Panaikang",destination:"GBB Entrop",mode:"Kapal + Truk",transporter:"PT Temas",volume:4100,eta:"22 Agu · 17:30",progress:38,status:"At Risk",program:"Bantuan Pangan"},
    {id:"SHP-260817-119",corridor:"Semarang → Kupang",origin:"GBB Randugarut",destination:"GBB Tenau",mode:"Kapal",transporter:"PT Meratus",volume:3300,eta:"18 Agu · 22:15",progress:89,status:"Delayed",program:"CBP"},
    {id:"SHP-260817-106",corridor:"Karawang → Bandung",origin:"GBB Telukjambe",destination:"GBB Gedebage",mode:"Truk",transporter:"PT BGR Logistik",volume:780,eta:"18 Agu · 11:00",progress:100,status:"Delivered",program:"SPHP"},
    {id:"SHP-260817-095",corridor:"Palembang → Bengkulu",origin:"GBB Kertapati",destination:"GBB Pulau Baai",mode:"Truk",transporter:"PT Pos Logistik",volume:1250,eta:"18 Agu · 19:10",progress:67,status:"On Time",program:"Komersial"},
  ];
  const routes=[
    ["Surabaya–Makassar","Laut + Darat","41,8 rb ton","4,8 hari","Rp684 rb","87%","82,4%","High"],
    ["Jakarta–Medan","Laut","36,2 rb ton","5,2 hari","Rp712 rb","91%","96,1%","Low"],
    ["Makassar–Jayapura","Laut + Darat","18,7 rb ton","8,9 hari","Rp1,34 jt","78%","86,8%","High"],
    ["Semarang–Kupang","Laut","21,4 rb ton","7,1 hari","Rp1,08 jt","83%","89,7%","Medium"],
    ["Karawang–Bandung","Darat","12,8 rb ton","0,8 hari","Rp226 rb","94%","97,6%","Low"],
    ["Palembang–Bengkulu","Darat","9,6 rb ton","1,4 hari","Rp318 rb","88%","94,2%","Medium"],
  ];
  const exceptions=[
    ["DST-EXC-118","Kapal terlambat sandar","Surabaya–Makassar","High","8.500 ton","3j 44m","4j 16m","Rizky Maulana","Diproses"],
    ["DST-EXC-115","Cuaca buruk & gelombang tinggi","Makassar–Jayapura","Critical","4.100 ton","1j 18m","42m","Command Center","Eskalasi"],
    ["DST-EXC-109","Antrian bongkar Pelabuhan Tenau","Semarang–Kupang","High","3.300 ton","7j 09m","4j 51m","Lina Marlina","Ditugaskan"],
    ["DST-EXC-103","Kekurangan 10 armada feeder","Kancab Sorong","Medium","2.300 ton","4j 20m","7j 40m","Belum ditugaskan","Baru"],
    ["DST-EXC-098","POD belum diterima","Karawang–Bandung","Low","780 ton","11j 12m","12j 48m","Dedi Saputra","Validasi"],
  ];
  const [query,setQuery]=useState("");const [status,setStatus]=useState("Semua Status");const [period,setPeriod]=useState("Bulan Berjalan");const [selected,setSelected]=useState<DistributionShipment|null>(shipments[0]);const [volume,setVolume]=useState(125);const [disruption,setDisruption]=useState(18);const [capacity,setCapacity]=useState(88);const [fuel,setFuel]=useState(7);const [reportReady,setReportReady]=useState(false);
  const filtered=shipments.filter(item=>(`${item.id} ${item.corridor} ${item.transporter} ${item.program}`.toLowerCase().includes(query.toLowerCase()))&&(status==="Semua Status"||item.status===status));
  const projectedOtif=Math.max(71,Math.min(99.4,95.4-disruption*.31+(capacity-85)*.18));const projectedCost=Math.round(486*(1+fuel/100+disruption/220-capacity/1800));const serviceRisk=Math.round(volume*(100-projectedOtif)/100*1000);const extraFleet=Math.max(0,Math.ceil(volume*(100-capacity)/100/1.8));
  const kpis=mode==="exceptions"?[["Exception aktif","14","3 critical"],["Volume terdampak","18.980","Ton"],["SLA terlewati","3","Kasus"],["Potensi biaya","Rp2,84","Miliar"],["Mitigasi aktif","11","Action plan"]]:[["Volume dikirim","486.240","Ton bulan berjalan"],["Shipment aktif","128","36 dalam perjalanan"],["OTIF nasional","93,7%","Target ≥95%"],["Biaya per ton","Rp486 rb","+3,2% vs baseline"],["Service at risk","18.980","Ton"]];
  return <section className="distribution-page" aria-label={labels[mode]}>
    <header className="distribution-header"><div><span>SUPPLY CHAIN MONITORING / DISTRIBUSI</span><h1>{labels[mode]}</h1><p>{descriptions[mode]}</p></div><div className="distribution-fresh"><i/><span><small>Data TMS/Simlog diperbarui</small><strong>18 Agustus 2026 · 09:12 WIB</strong></span><button onClick={()=>onNotify("Data distribusi berhasil disinkronkan")}><RotateCw size={15}/></button></div></header>
    <nav className="distribution-tabs" aria-label="Halaman distribusi">{(Object.keys(labels) as DistributionWorkspaceKind[]).map(key=><button className={mode===key?"active":""} key={key} onClick={()=>onSwitch(key)}>{labels[key]}</button>)}</nav>
    {mode!=="simulation"&&<section className="distribution-filter"><label><span>PERIODE</span><select value={period} onChange={e=>setPeriod(e.target.value)}><option>Bulan Berjalan</option><option>7 Hari Terakhir</option><option>Year to Date 2026</option></select></label><label><span>PROGRAM</span><select><option>Semua Program</option><option>CBP</option><option>SPHP</option><option>Bantuan Pangan</option><option>Komersial</option></select></label><label><span>WILAYAH</span><select><option>Nasional</option><option>Sumatera</option><option>Jawa</option><option>Sulawesi</option><option>Maluku &amp; Papua</option></select></label><label><span>MODA</span><select><option>Semua Moda</option><option>Darat</option><option>Laut</option><option>Multimoda</option></select></label><button onClick={()=>onNotify(`Filter ${period} diterapkan`)}><Filter size={15}/>Terapkan</button></section>}
    {mode!=="simulation"&&<section className="distribution-kpis">{kpis.map(([label,value,note],index)=><article className={index===2||index===4?"risk":""} key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</section>}
    {mode==="summary"&&<><div className="distribution-grid summary"><section className="distribution-card"><header><div><span>NETWORK CONTROL</span><h2>Status Arus Distribusi Nasional</h2></div><button onClick={()=>onSwitch("shipments")}>Buka monitoring <ArrowRight size={14}/></button></header><div className="distribution-flow">{[["Release Order","176","100%"],["Loading","42","96%"],["In Transit","36","93%"],["Unloading","18","89%"],["POD Selesai","80","97%"]].map(([name,value,pct],i)=><article key={name}><i>{i+1}</i><span><small>{name}</small><strong>{value}</strong><em>{pct} sehat</em></span>{i<4&&<ArrowRight size={16}/>}</article>)}</div><div className="distribution-volume-chart">{[["Sumatera",82,92],["Jawa",100,97],["Kalimantan",49,91],["Sulawesi",68,88],["Bali & Nusra",41,94],["Maluku & Papua",27,79]].map(([name,value,otif])=><article key={name as string}><span><b>{name}</b><small>{value} rb ton</small></span><i><em style={{width:`${otif}%`}}/></i><strong>{otif}% OTIF</strong></article>)}</div></section><aside className="distribution-card"><header><div><span>PRIORITAS HARI INI</span><h2>Koridor Memerlukan Tindakan</h2></div><em>4 alert</em></header>{exceptions.slice(0,4).map(row=><button key={row[0]} onClick={()=>onSwitch("exceptions")}><i className={row[3].toLowerCase()}/><span><strong>{row[1]}</strong><small>{row[2]} · {row[4]}</small></span><em>{row[6]} SLA</em><ChevronRight size={15}/></button>)}</aside></div><section className="distribution-card mode-mix"><header><div><span>CAPACITY &amp; MODE MIX</span><h2>Komposisi Moda dan Utilisasi</h2></div><button onClick={()=>onSwitch("routes")}>Analisis rute <ArrowRight size={14}/></button></header><div>{[["Darat","214.600 ton",72,"Rp318 rb/ton"],["Laut","226.840 ton",86,"Rp782 rb/ton"],["Multimoda","44.800 ton",79,"Rp1,12 jt/ton"]].map(([name,value,pct,cost])=><article key={name as string}><span><Truck size={18}/><b>{name}</b></span><strong>{value}</strong><i><em style={{width:`${pct}%`}}/></i><small>{pct}% utilisasi · {cost}</small></article>)}</div></section></>}
    {mode==="shipments"&&<div className="distribution-grid monitor"><section className="distribution-card shipment-list"><header><div><span>LIVE SHIPMENT CONTROL</span><h2>Daftar Pengiriman Aktif</h2></div><button onClick={()=>onNotify("Manifest pengiriman siap diekspor")}><Download size={14}/>Ekspor</button></header><div className="shipment-tools"><label><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari shipment, koridor, transporter…"/></label><select value={status} onChange={e=>setStatus(e.target.value)}><option>Semua Status</option><option>On Time</option><option>At Risk</option><option>Delayed</option><option>Delivered</option></select></div><div className="shipment-head"><b>Shipment / Program</b><b>Koridor</b><b>Moda / Transporter</b><b>Volume</b><b>ETA</b><b>Progress</b><b>Status</b></div>{filtered.map(item=><button className={selected?.id===item.id?"selected":""} key={item.id} onClick={()=>setSelected(item)}><span><strong>{item.id}</strong><small>{item.program}</small></span><span><strong>{item.corridor}</strong><small>{item.origin}</small></span><span><strong>{item.mode}</strong><small>{item.transporter}</small></span><b>{item.volume.toLocaleString("id-ID")} ton</b><span><strong>{item.eta}</strong><small>WIB</small></span><span><i><em style={{width:`${item.progress}%`}}/></i><small>{item.progress}%</small></span><em className={item.status.toLowerCase().replace(" ","-")}>{item.status}</em></button>)}</section><aside className="distribution-card shipment-detail"><header><div><span>CONTROL DETAIL</span><h2>{selected?.id}</h2></div><MoreVertical size={18}/></header>{selected&&<><div className="shipment-route"><span><i/><b>{selected.origin}</b><small>Origin · Loading complete</small></span><em style={{height:`${selected.progress}%`}}/><span><i/><b>{selected.destination}</b><small>Destination · ETA {selected.eta}</small></span></div><dl><div><dt>Komoditas</dt><dd>Beras Medium CBP</dd></div><div><dt>Volume</dt><dd>{selected.volume.toLocaleString("id-ID")} ton</dd></div><div><dt>Moda</dt><dd>{selected.mode}</dd></div><div><dt>Transporter</dt><dd>{selected.transporter}</dd></div><div><dt>GPS / AIS</dt><dd>Live · 7 menit lalu</dd></div><div><dt>POD</dt><dd>Wajib geotag &amp; e-sign</dd></div></dl><div className="shipment-risk"><AlertTriangle size={17}/><span><b>Prediksi keterlambatan 6,4 jam</b><small>Cuaca dan antrian sandar meningkatkan risiko ETA.</small></span></div><button onClick={()=>onNotify(`Case dibuat untuk ${selected.id}`)}><BellRing size={15}/>Buat Case</button></>}</aside></div>}
    {mode==="routes"&&<section className="distribution-card route-performance"><header><div><span>ROUTE INTELLIGENCE</span><h2>Kinerja Koridor Strategis</h2></div><button onClick={()=>onNotify("Baseline koridor dikalibrasi ulang")}><RotateCw size={14}/>Kalibrasi Baseline</button></header><div className="route-performance-head"><b>Koridor</b><b>Moda</b><b>Volume MTD</b><b>Lead Time</b><b>Biaya / Ton</b><b>Load Factor</b><b>OTIF</b><b>Risiko</b></div>{routes.map(row=><article key={row[0]}><span><MapPinned size={15}/><strong>{row[0]}</strong></span>{row.slice(1,7).map((cell,index)=><span key={index}>{cell}</span>)}<em className={row[7].toLowerCase()}>{row[7]}</em></article>)}<footer><Sparkles size={17}/><p><b>Rekomendasi jaringan:</b> pre-book slot Surabaya–Makassar, gabungkan muatan Makassar–Jayapura, dan gunakan backhaul komersial pada koridor Semarang–Kupang untuk menurunkan biaya 6–9%.</p><button onClick={()=>onSwitch("simulation")}>Uji skenario <ArrowRight size={14}/></button></footer></section>}
    {mode==="otif"&&<div className="distribution-grid otif"><section className="distribution-card"><header><div><span>SERVICE PERFORMANCE</span><h2>OTIF per Kanwil</h2></div><em>Target 95%</em></header><div className="otif-regions">{[["Jawa Timur",97.8,486],["DKI Jakarta & Banten",96.3,342],["Sumatera Utara",94.1,218],["Sulselbar",89.7,276],["Nusa Tenggara Timur",88.2,146],["Papua",82.4,91]].map(([name,pct,count],i)=><article key={name as string}><i>{i+1}</i><span><b>{name}</b><small>{count} shipment</small></span><div><i><em style={{width:`${pct}%`}}/></i></div><strong className={Number(pct)<90?"risk":Number(pct)<95?"watch":"good"}>{pct}%</strong></article>)}</div></section><aside className="distribution-card"><header><div><span>ROOT CAUSE</span><h2>Penyebab Missed OTIF</h2></div><em>31 shipment</em></header><div className="otif-causes">{[["Keterlambatan kapal",9,29],["Antrian bongkar",7,23],["Armada feeder",6,19],["Cuaca ekstrem",5,16],["Dokumen / POD",4,13]].map(([name,count,pct])=><article key={name as string}><span><b>{name}</b><small>{count} shipment</small></span><i><em style={{width:`${pct}%`}}/></i><strong>{pct}%</strong></article>)}</div><div className="otif-forecast"><ChartNoAxesCombined size={20}/><span><small>Forecast akhir bulan</small><strong>95,2% OTIF</strong><em>Jika 4 tindakan prioritas selesai ≤24 jam</em></span></div></aside></div>}
    {mode==="exceptions"&&<section className="distribution-card exception-table"><header><div><span>EXCEPTION CONTROL</span><h2>Exception Distribusi Aktif</h2></div><button onClick={()=>onNotify("Exception baru dibuat")}><Plus size={14}/>Buat Exception</button></header><div className="exception-head"><b>ID / Exception</b><b>Koridor</b><b>Severity</b><b>Dampak</b><b>Usia</b><b>Sisa SLA</b><b>Owner</b><b>Status</b><b>Aksi</b></div>{exceptions.map(row=><article key={row[0]}><span><strong>{row[0]}</strong><small>{row[1]}</small></span><span>{row[2]}</span><em className={row[3].toLowerCase()}>{row[3]}</em><b>{row[4]}</b><span>{row[5]}</span><strong className={row[3]==="Critical"?"risk":""}>{row[6]}</strong><span>{row[7]}</span><em>{row[8]}</em><button onClick={()=>onNotify(`${row[0]} dibuka di My Cases`)}><ChevronRight size={15}/></button></article>)}<footer><ShieldCheck size={16}/><span>Exception critical otomatis terhubung ke Alert Center, SLA Monitoring, My Cases, dan Approval Center untuk audit end-to-end.</span></footer></section>}
    {mode==="simulation"&&<><section className="distribution-sim-hero"><span><FlaskConical size={24}/></span><div><small>WHAT-IF DISTRIBUTION PLANNING</small><h2>Uji ketahanan rencana distribusi nasional</h2><p>Model menyeimbangkan service level, waktu, biaya, kapasitas moda, stok sumber, dan kesiapan gudang penerima.</p></div><em>Scenario DST-260818-07</em></section><div className="distribution-sim-grid"><section className="distribution-card sim-controls"><header><div><span>LANGKAH 1</span><h2>Parameter Skenario</h2></div><button onClick={()=>{setVolume(125);setDisruption(18);setCapacity(88);setFuel(7);setReportReady(false)}}>Reset</button></header>{[["Volume rencana",volume,50,220,"ribu ton",setVolume],["Gangguan koridor",disruption,0,50,"%",setDisruption],["Kapasitas moda tersedia",capacity,55,100,"%",setCapacity],["Kenaikan BBM / tarif",fuel,0,30,"%",setFuel]].map(([name,value,min,max,unit,setter])=><label key={name as string}><span><b>{name}</b><strong>{value} {unit}</strong></span><input type="range" min={min as number} max={max as number} value={value as number} onChange={e=>{(setter as (n:number)=>void)(Number(e.target.value));setReportReady(false)}}/></label>)}<div className="sim-constraints"><b>Guardrail wajib</b>{["Safety stock asal tidak dilanggar","Kapasitas gudang penerima ≤90%","OTIF program publik diprioritaskan","Moda & transporter harus aktif"].map(x=><span key={x}><CheckCircle2 size={14}/>{x}</span>)}</div><button className="primary" onClick={()=>{setReportReady(true);onNotify("Skenario distribusi selesai dihitung")}}><Play size={15}/>Jalankan Simulasi</button></section><section className="distribution-card sim-output"><header><div><span>LANGKAH 2</span><h2>Hasil Proyeksi</h2></div><em>Confidence 89%</em></header><div className="sim-output-kpis"><article><span>Projected OTIF</span><strong>{projectedOtif.toFixed(1)}%</strong><small>Target ≥95%</small></article><article className="risk"><span>Service at risk</span><strong>{serviceRisk.toLocaleString("id-ID")}</strong><small>Ton</small></article><article><span>Biaya / ton</span><strong>Rp{projectedCost} rb</strong><small>Baseline Rp486 rb</small></article><article><span>Armada tambahan</span><strong>{extraFleet}</strong><small>Unit ekuivalen</small></article></div><div className="sim-recommendation"><Sparkles size={18}/><div><small>REKOMENDASI MODEL</small><h3>{projectedOtif>=95?"Rencana memenuhi service guardrail":"Aktifkan mitigasi sebelum eksekusi"}</h3><p>Alihkan 18,4 ribu ton melalui hub Makassar, pre-book 2 slot kapal, tambah {extraFleet} unit armada feeder, dan kunci window bongkar di 3 gudang penerima.</p></div></div><div className="sim-tradeoff">{[["Baseline",93.7,486],["Biaya minimum",91.8,458],["Rekomendasi",projectedOtif,projectedCost],["Service maksimum",97.4,548]].map(([name,otif,cost])=><button key={name as string} className={name==="Rekomendasi"?"active":""}><span><b>{name}</b><small>Rp{cost} rb/ton</small></span><strong>{Number(otif).toFixed(1)}% OTIF</strong></button>)}</div></section></div><section className={`distribution-card distribution-report${reportReady?" ready":""}`}><header><div><span>LANGKAH 3</span><h2>Report Rekomendasi Distribusi</h2></div><em>{reportReady?"Siap diajukan":"Pratinjau dinamis"}</em></header><div><section><h3>Executive Summary</h3><p>Skenario {volume} ribu ton dengan gangguan {disruption}% memproyeksikan OTIF <b>{projectedOtif.toFixed(1)}%</b>, biaya <b>Rp{projectedCost} ribu/ton</b>, dan <b>{serviceRisk.toLocaleString("id-ID")} ton</b> service at risk.</p><ol><li>Prioritaskan CBP, SPHP, dan Bantuan Pangan pada kapasitas moda tersedia.</li><li>Lock slot kapal, armada feeder, dan receiving window sebelum release.</li><li>Aktifkan alert bila ETA slip &gt;6 jam atau OTIF prediksi &lt;95%.</li><li>Re-run model saat volume, cuaca, atau kapasitas berubah lebih dari 10%.</li></ol></section><aside>{["Asumsi & versi model","Rencana shipment","Alokasi moda & transporter","Biaya dan OTIF","Risiko & mitigasi","Approval & audit trail"].map(x=><span key={x}><CheckCircle2 size={14}/>{x}</span>)}<button onClick={()=>onNotify("Rencana distribusi dikirim ke Approval Center")}><Send size={15}/>Ajukan Rencana</button><button onClick={()=>onNotify("Report distribusi siap diunduh")}><Download size={15}/>Unduh Report</button></aside></div></section></>}
    <footer className="distribution-disclaimer"><AlertTriangle size={15}/><span><b>Data demonstrasi untuk desain SCCT.</b> Implementasi produksi perlu integrasi TMS/Simlog, ERP, WMS, GPS/AIS, data pelabuhan, transporter, tarif, cuaca, POD, serta SLA dan kebijakan operasional BULOG yang berlaku.</span></footer>
  </section>
}

type ProductMasterRecord={id:string;name:string;code:string;parent:string;attribute:string;unit:string;scope:string;status:"Aktif"|"Draf"|"Nonaktif";updated:string};

function ProductMasterPage({mode,onNotify}:{mode:ProductMasterMode;onNotify:(message:string)=>void}){
  const configs={commodities:{title:"Komoditas",subtitle:"Kelola taksonomi komoditas pangan, aturan stok, umur simpan, dan keterkaitannya dengan program BULOG.",singular:"Komoditas",columns:["Komoditas","Kelompok","Karakteristik / Grade","Satuan Dasar","Cakupan","Status","Aksi"]},products:{title:"Produk",subtitle:"Kelola SKU, merek, grade, kemasan, program penyaluran, serta hubungan produk dengan komoditas dan mutu.",singular:"Produk",columns:["Produk / SKU","Komoditas","Grade / Kemasan","Satuan","Program / Kanal","Status","Aksi"]},units:{title:"Satuan",subtitle:"Standarkan unit of measure, simbol, dimensi, konversi, presisi, dan penggunaan pada transaksi supply chain.",singular:"Satuan",columns:["Satuan","Dimensi","Simbol / Konversi","Satuan Dasar","Digunakan Pada","Status","Aksi"]},quality:{title:"Klasifikasi Mutu",subtitle:"Definisikan kelas mutu dan batas parameter inspeksi untuk penerimaan, penyimpanan, penyaluran, serta disposal.",singular:"Klasifikasi Mutu",columns:["Kelas Mutu","Komoditas","Spesifikasi Utama","Satuan Uji","Berlaku Untuk","Status","Aksi"]}} as const;const config=configs[mode];
  const seed:Record<ProductMasterMode,ProductMasterRecord[]>={commodities:[{id:"KOM-001",name:"Beras",code:"BRS",parent:"Serealia",attribute:"Medium, Premium, Khusus",unit:"Kilogram",scope:"CBP, SPHP, Komersial",status:"Aktif",updated:"17 Agu 2026"},{id:"KOM-002",name:"Gabah",code:"GBH",parent:"Serealia",attribute:"GKP, GKG",unit:"Kilogram",scope:"Pengadaan Dalam Negeri",status:"Aktif",updated:"16 Agu 2026"},{id:"KOM-003",name:"Jagung",code:"JGG",parent:"Serealia",attribute:"Pakan, Pangan",unit:"Kilogram",scope:"CBP Jagung, Komersial",status:"Aktif",updated:"15 Agu 2026"},{id:"KOM-004",name:"Gula Kristal Putih",code:"GKP",parent:"Pemanis",attribute:"GKP 1",unit:"Kilogram",scope:"Komersial, Stabilisasi",status:"Aktif",updated:"12 Agu 2026"},{id:"KOM-005",name:"Minyak Goreng",code:"MGR",parent:"Minyak Pangan",attribute:"Curah, Kemasan",unit:"Liter",scope:"Komersial, Program",status:"Aktif",updated:"10 Agu 2026"},{id:"KOM-006",name:"Kedelai",code:"KDL",parent:"Kacang-kacangan",attribute:"Lokal, Impor",unit:"Kilogram",scope:"Komersial",status:"Draf",updated:"08 Agu 2026"}],products:[{id:"PRD-1001",name:"Beras Medium SPHP 5 kg",code:"BRS-MED-SPHP-05",parent:"Beras",attribute:"Medium · Kemasan 5 kg",unit:"Bag",scope:"SPHP · Retail",status:"Aktif",updated:"17 Agu 2026"},{id:"PRD-1002",name:"Beras Premium 5 kg",code:"BRS-PRM-KOM-05",parent:"Beras",attribute:"Premium · Kemasan 5 kg",unit:"Bag",scope:"Komersial · Retail",status:"Aktif",updated:"16 Agu 2026"},{id:"PRD-1003",name:"Beras CBP Bulk",code:"BRS-CBP-BULK",parent:"Beras",attribute:"Medium · Bulk",unit:"Kilogram",scope:"CBP · Bantuan Pangan",status:"Aktif",updated:"16 Agu 2026"},{id:"PRD-2001",name:"Jagung Pakan Bulk",code:"JGG-PKN-BULK",parent:"Jagung",attribute:"Kadar air ≤15% · Bulk",unit:"Kilogram",scope:"CBP Jagung · B2B",status:"Aktif",updated:"14 Agu 2026"},{id:"PRD-3001",name:"Gula ManisKita 1 kg",code:"GKP-MK-01",parent:"Gula Kristal Putih",attribute:"GKP 1 · Kemasan 1 kg",unit:"Bag",scope:"Komersial · Retail",status:"Aktif",updated:"11 Agu 2026"},{id:"PRD-4001",name:"Minyak Goreng Kita 1 L",code:"MGR-KITA-01",parent:"Minyak Goreng",attribute:"RBD Palm Olein · 1 L",unit:"Botol",scope:"Komersial · Retail",status:"Draf",updated:"09 Agu 2026"}],units:[{id:"UOM-001",name:"Kilogram",code:"KG",parent:"Massa",attribute:"1 kg = 1.000 gram",unit:"Kilogram",scope:"Stok, Pengadaan, Penjualan",status:"Aktif",updated:"17 Agu 2026"},{id:"UOM-002",name:"Ton",code:"TNE",parent:"Massa",attribute:"1 ton = 1.000 kg",unit:"Kilogram",scope:"Dashboard, Kontrak, Distribusi",status:"Aktif",updated:"17 Agu 2026"},{id:"UOM-003",name:"Kuintal",code:"QTL",parent:"Massa",attribute:"1 kuintal = 100 kg",unit:"Kilogram",scope:"Pengadaan Lapangan",status:"Aktif",updated:"13 Agu 2026"},{id:"UOM-004",name:"Liter",code:"LTR",parent:"Volume",attribute:"1 L = 1.000 ml",unit:"Liter",scope:"Minyak Goreng",status:"Aktif",updated:"10 Agu 2026"},{id:"UOM-005",name:"Bag",code:"BAG",parent:"Kemasan",attribute:"Variable: 5 / 10 / 50 kg",unit:"Kilogram",scope:"WMS, Penjualan, Distribusi",status:"Aktif",updated:"12 Agu 2026"},{id:"UOM-006",name:"Pallet",code:"PLT",parent:"Logistik",attribute:"Variable per SKU",unit:"Bag",scope:"WMS, TMS",status:"Draf",updated:"08 Agu 2026"}],quality:[{id:"MUT-001",name:"Beras Medium",code:"BRS-MED",parent:"Beras",attribute:"KA ≤14% · Broken ≤25%",unit:"%, organoleptik",scope:"Pengadaan, WMS, SPHP",status:"Aktif",updated:"17 Agu 2026"},{id:"MUT-002",name:"Beras Premium",code:"BRS-PRM",parent:"Beras",attribute:"KA ≤14% · Broken ≤15%",unit:"%, organoleptik",scope:"Pengadaan, Komersial",status:"Aktif",updated:"17 Agu 2026"},{id:"MUT-003",name:"Gabah Kering Panen",code:"GKP",parent:"Gabah",attribute:"KA ≤25% · Hampa ≤10%",unit:"Persen",scope:"Pengadaan DN",status:"Aktif",updated:"14 Agu 2026"},{id:"MUT-004",name:"Gabah Kering Giling",code:"GKG",parent:"Gabah",attribute:"KA ≤14% · Hampa ≤3%",unit:"Persen",scope:"Pengadaan DN, Pengolahan",status:"Aktif",updated:"14 Agu 2026"},{id:"MUT-005",name:"Jagung Pakan",code:"JGG-PKN",parent:"Jagung",attribute:"KA ≤15% · Aflatoksin sesuai batas",unit:"%, ppb",scope:"Penerimaan, Penyimpanan",status:"Aktif",updated:"12 Agu 2026"},{id:"MUT-006",name:"Beras Turun Mutu",code:"BRS-TM",parent:"Beras",attribute:"QC hold · keputusan disposition",unit:"Skor mutu",scope:"QMS, Disposal",status:"Draf",updated:"09 Agu 2026"}]};
  const [records,setRecords]=useState(seed[mode]);const [query,setQuery]=useState("");const [status,setStatus]=useState("Semua Status");const [selected,setSelected]=useState<ProductMasterRecord|null>(null);const [modal,setModal]=useState<"detail"|"form"|null>(null);const blank:ProductMasterRecord={id:`${mode.slice(0,3).toUpperCase()}-${String(records.length+101).padStart(3,"0")}`,name:"",code:"",parent:"",attribute:"",unit:"",scope:"",status:"Draf",updated:"18 Agu 2026"};const [draft,setDraft]=useState(blank);const [editing,setEditing]=useState(false);const filtered=records.filter(x=>(`${x.name} ${x.code} ${x.parent} ${x.scope}`.toLowerCase().includes(query.toLowerCase()))&&(status==="Semua Status"||x.status===status));
  function create(){setDraft({...blank,id:`${mode.slice(0,3).toUpperCase()}-${String(records.length+101).padStart(3,"0")}`});setEditing(false);setModal("form")}function edit(row:ProductMasterRecord){setDraft({...row});setEditing(true);setModal("form")}function save(){if(!draft.name||!draft.code||!draft.parent){onNotify("Lengkapi nama, kode, dan klasifikasi induk");return}setRecords(rows=>editing?rows.map(row=>row.id===draft.id?draft:row):[draft,...rows]);setModal(null);onNotify(`${config.singular} ${editing?"diperbarui":"dibuat sebagai draf"}`)}
  return <section className="product-master-page" aria-label={config.title}><header className="product-master-header"><div><span>MASTER DATA / PRODUK &amp; KOMODITAS</span><h1>{config.title}</h1><p>{config.subtitle}</p></div><div className="product-master-updated"><i/><span><small>Master data terakhir</small><strong>18 Agustus 2026 · 08:30 WIB</strong></span><button onClick={()=>onNotify(`${config.title} disinkronkan`)}><RotateCw size={15}/></button></div></header><section className="product-master-kpis">{[["Total record",records.length,"Master aktif dan draf"],["Aktif",records.filter(x=>x.status==="Aktif").length,"Digunakan transaksi"],["Draf / review",records.filter(x=>x.status==="Draf").length,"Menunggu approval"],["Terhubung",mode==="products"?"4 modul":mode==="quality"?"QMS + WMS":"6 modul","ERP · WMS · TMS"]].map(([label,value,note],i)=><article key={label as string}><span>{label}</span><strong>{value}</strong><small>{note}</small><i className={i===2?"watch":"good"}/></article>)}</section><div className="product-master-layout"><section className="product-master-card master-list"><header><div><span>MASTER DIRECTORY</span><h2>Daftar {config.title}</h2></div><button className="primary" onClick={create}><Plus size={15}/>Tambah {config.singular}</button></header><div className="master-tools"><label><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={`Cari ${config.title.toLowerCase()}, kode, atau cakupan…`}/></label><select value={status} onChange={e=>setStatus(e.target.value)}><option>Semua Status</option><option>Aktif</option><option>Draf</option><option>Nonaktif</option></select><button onClick={()=>onNotify(`${config.title} siap diekspor`)}><Download size={14}/>Ekspor</button></div><div className="master-head">{config.columns.map(x=><span key={x}>{x}</span>)}</div>{filtered.map(row=><article key={row.id}><span><b>{row.code}</b><span><strong>{row.name}</strong><small>{row.id} · Update {row.updated}</small></span></span><span>{row.parent}</span><span>{row.attribute}</span><span>{row.unit}</span><span>{row.scope}</span><em className={row.status.toLowerCase()}>{row.status}</em><span><button title="Detail" onClick={()=>{setSelected(row);setModal("detail")}}><Eye size={14}/></button><button title="Edit" onClick={()=>edit(row)}><Settings size={14}/></button></span></article>)}<footer><span>Menampilkan {filtered.length} record</span><span>Perubahan master data memerlukan approval dan audit trail</span></footer></section><aside className="product-master-card master-governance"><header><div><span>DATA GOVERNANCE</span><h2>Kontrol Master Data</h2></div><ShieldCheck size={20}/></header>{[["Kode unik & immutable","Mencegah duplikasi transaksi",true],["Maker-checker approval","Wajib sebelum aktif",true],["Effective date","Versi historis dipertahankan",true],["Impact analysis","Cek transaksi & integrasi",true],["Referential integrity","Relasi tidak boleh terputus",true]].map(([name,note,ok])=><span key={name as string}><CheckCircle2 size={15}/><span><strong>{name}</strong><small>{note}</small></span></span>)}<div><strong>Relasi utama</strong>{(mode==="commodities"?["Produk & SKU","Klasifikasi Mutu","Program Penyaluran","Safety Stock"]:mode==="products"?["Komoditas","Kemasan & Satuan","Harga & Kanal","WMS / TMS"]:mode==="units"?["Produk & Kemasan","Kontrak","Inventory","Billing"]:["Komoditas","Inspeksi QMS","Lot & Gudang","Aging / Disposal"]).map(x=><em key={x}>{x}</em>)}</div><button onClick={()=>onNotify("Impact analysis master data dibuka")}><ChartNoAxesCombined size={14}/>Lihat Impact Analysis</button></aside></div>
    {mode==="quality"&&<section className="product-master-card quality-parameters"><header><div><span>QUALITY PARAMETER LIBRARY</span><h2>Parameter Pemeriksaan Utama</h2></div><ListFilter size={20}/></header>{[["Kadar Air","Moisture meter","%","Min/Max","Penerimaan & penyimpanan"],["Butir Patah","Grain analyzer / manual","%","Maksimum","Beras"],["Butir Menir","Grain analyzer / manual","%","Maksimum","Beras"],["Derajat Sosoh","Visual / analyzer","%","Minimum","Beras"],["Hampa / Kotoran","Sampling & timbang","%","Maksimum","Gabah / Jagung"],["Aflatoksin","Rapid test / lab","ppb","Maksimum","Jagung"]].map(([name,method,uom,rule,scope])=><article key={name}><strong>{name}</strong><span>{method}</span><b>{uom}</b><em>{rule}</em><span>{scope}</span><button onClick={()=>onNotify(`Parameter ${name} dibuka`)}>Kelola</button></article>)}</section>}
    {mode==="units"&&<section className="product-master-card conversion-rules"><header><div><span>CONVERSION RULES</span><h2>Konversi Satuan Kontekstual</h2></div><Scale size={20}/></header>{[["Bag Beras SPHP 5 kg","1 BAG","5 KG","Exact","SKU"],["Bag Beras CBP 50 kg","1 BAG","50 KG","Exact","SKU"],["Ton ke Kilogram","1 TNE","1.000 KG","Exact","Global"],["Pallet Beras 5 kg","1 PLT","200 BAG","Configurable","Warehouse"],["Liter Minyak ke Karton","12 LTR","1 CTN","Packaging","SKU"]].map(([name,from,to,type,scope])=><article key={name}><strong>{name}</strong><span>{from}</span><ArrowRight size={14}/><span>{to}</span><em>{type}</em><b>{scope}</b></article>)}</section>}
    <footer className="product-master-disclaimer"><Database size={15}/><span><b>Data demonstrasi.</b> Master data produksi harus diselaraskan dengan standar mutu dan kebijakan BULOG yang berlaku, ERP, WMS, QMS, TMS, kontrak, serta katalog produk resmi.</span></footer>{modal&&<div className="master-modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setModal(null)}}><section className="master-modal" role="dialog" aria-modal="true"><header><div><span>{modal==="detail"?"MASTER DATA DETAIL":editing?"EDIT MASTER DATA":"CREATE MASTER DATA"}</span><h2>{modal==="detail"?selected?.name:`${editing?"Edit":"Tambah"} ${config.singular}`}</h2></div><button onClick={()=>setModal(null)}><X size={18}/></button></header>{modal==="detail"&&selected&&<div className="master-detail"><div><b>{selected.code}</b><span><strong>{selected.name}</strong><small>{selected.id}</small></span><em className={selected.status.toLowerCase()}>{selected.status}</em></div><section>{[["Kode master",selected.code],["Klasifikasi / induk",selected.parent],["Karakteristik",selected.attribute],["Satuan",selected.unit],["Cakupan penggunaan",selected.scope],["Terakhir diperbarui",selected.updated]].map(([label,value])=><span key={label}><small>{label}</small><strong>{value}</strong></span>)}</section><aside><ShieldCheck size={17}/><span><strong>Governance aktif</strong><small>Versi 3 · Maker: Data Steward · Checker: Master Data Manager · 18 referensi transaksi aktif</small></span></aside><footer><button onClick={()=>{setModal(null);edit(selected)}}><Settings size={14}/>Edit</button><button onClick={()=>onNotify(`Impact analysis ${selected.name} dibuka`)}>Impact Analysis</button></footer></div>}{modal==="form"&&<div className="master-form"><section><h3>Identitas Master</h3><label><span>Nama {config.singular}</span><input value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})}/></label><label><span>Kode unik</span><input value={draft.code} disabled={editing} onChange={e=>setDraft({...draft,code:e.target.value.toUpperCase()})}/></label><label><span>{mode==="products"?"Komoditas induk":mode==="quality"?"Komoditas":"Kelompok / dimensi"}</span><input value={draft.parent} onChange={e=>setDraft({...draft,parent:e.target.value})}/></label><label><span>Status</span><select value={draft.status} onChange={e=>setDraft({...draft,status:e.target.value as ProductMasterRecord["status"]})}><option>Draf</option><option>Aktif</option><option>Nonaktif</option></select></label></section><section><h3>Aturan &amp; Penggunaan</h3><label><span>Karakteristik / spesifikasi</span><textarea value={draft.attribute} onChange={e=>setDraft({...draft,attribute:e.target.value})}/></label><label><span>Satuan dasar / uji</span><input value={draft.unit} onChange={e=>setDraft({...draft,unit:e.target.value})}/></label><label><span>Cakupan penggunaan</span><textarea value={draft.scope} onChange={e=>setDraft({...draft,scope:e.target.value})}/></label><label className="master-toggle"><span><strong>Ajukan untuk approval</strong><small>Aktif setelah checker menyetujui</small></span><input type="checkbox" defaultChecked/></label></section><footer><button onClick={()=>setModal(null)}>Batal</button><button className="primary" onClick={save}><Save size={14}/>{editing?"Simpan Perubahan":"Buat Draf"}</button></footer></div>}</section></div>}</section>
}

function FinancialMonitorPage({kind,onNotify}:{kind:Exclude<FinancialWorkspaceKind,"simulation">;onNotify:(message:string)=>void}){
  const [period,setPeriod]=useState("Year to Date 2026");const [business,setBusiness]=useState("Konsolidasi");const [region,setRegion]=useState("Nasional");const [updated,setUpdated]=useState("17 Agustus 2026 · 21:03 WIB");
  const configs={revenue:{eyebrow:"KEUANGAN / PENDAPATAN",title:"Pendapatan",subtitle:"Pantau pendapatan per program, kanal, komoditas, dan Kanwil serta kualitas margin dan trajectory RKAP.",accent:"#277a5a",kpis:[["Pendapatan YTD","Rp31,60","Triliun","92,4% trajectory"],["Gross margin","8,7","Persen","+0,6 pp YoY"],["Pendapatan bulan ini","Rp3,84","Triliun","+7,2% MoM"],["Gap RKAP","Rp2,60","Triliun","Perlu recovery"]]},cost:{eyebrow:"KEUANGAN / BIAYA SUPPLY CHAIN",title:"Biaya Supply Chain",subtitle:"Kendalikan biaya pengadaan, transportasi, pergudangan, handling, kualitas, dan inventory carrying cost.",accent:"#a36519",kpis:[["Total biaya SC","Rp4,82","Triliun","15,3% pendapatan"],["Cost per ton","Rp1,23","Juta","-3,8% YoY"],["Logistics variance","Rp186","Miliar","5,4% di atas budget"],["Saving potential","Rp312","Miliar","6 peluang aktif"]]},receivables:{eyebrow:"KEUANGAN / PIUTANG",title:"Piutang",subtitle:"Pantau umur piutang, DSO, kolektibilitas, konsentrasi debitur, dan prioritas penagihan lintas program.",accent:"#7658a5",kpis:[["Total piutang","Rp7,42","Triliun","+4,8% MoM"],["Piutang jatuh tempo","Rp1,86","Triliun","25,1% total"],["DSO","42","Hari","Target ≤35 hari"],["Collection rate","91,3","Persen","-1,2 pp target"]]},budget:{eyebrow:"KEUANGAN / BUDGET VS ACTUAL",title:"Budget vs Actual",subtitle:"Konsolidasikan RKAP, realisasi, pendanaan bank, investasi pemerintah, headroom, dan forecast akhir tahun.",accent:"#245e99",kpis:[["Budget RKAP","Rp34,20","Triliun","Pendapatan 2026"],["Realisasi","Rp31,60","Triliun","92,4% trajectory"],["Plafond pendanaan","Rp108,18","Triliun","Bank + Pemerintah"],["Headroom tersedia","Rp40,94","Triliun","37,8% plafond"]]}} as const;const config=configs[kind];
  const revenueRows=[["Penjualan Komersial",12.84,13.2,97.3,"Watch"],["SPHP",8.72,8.1,107.7,"On Track"],["Bantuan Pangan",6.91,6.4,108,"On Track"],["Program Pemerintah Lain",3.13,3.5,89.4,"At Risk"]] as const;
  const costRows=[["Pengadaan & processing",2.08,2.13,-2.3],["Transportasi",1.16,1.04,11.5],["Pergudangan",.72,.69,4.3],["Handling & bongkar muat",.38,.36,5.6],["Quality & fumigasi",.21,.24,-12.5],["Inventory carrying cost",.27,.22,22.7]] as const;
  const receivableRows=[["Bantuan Pangan Pemerintah","Kementerian/Lembaga",2.64,41,.82,"Watch"],["SPHP Modern Trade","Retail Nasional",1.42,29,.14,"Current"],["Penjualan Komersial B2B","Mitra Industri",1.18,58,.49,"High"],["Pemda & BUMD","Pemerintah Daerah",.94,67,.31,"High"],["Kanal Tradisional","Distributor",.76,33,.08,"Current"],["Lainnya","Beragam",.48,46,.02,"Watch"]] as const;
  return <section className="finance-page" style={{"--finance-accent":config.accent} as CSSProperties} aria-label={config.title}><header className="finance-header"><div><span>{config.eyebrow}</span><h1>{config.title}</h1><p>{config.subtitle}</p></div><div className="finance-updated"><i/><span><small>Pembaruan ERP / pipeline</small><strong>{updated}</strong></span><button onClick={()=>{setUpdated("Baru saja");onNotify(`${config.title} diperbarui`)}}><RotateCw size={15}/></button></div></header><section className="finance-filters">{[["Periode",period,setPeriod,["Year to Date 2026","Kuartal III 2026","Bulan Berjalan"]],["Unit bisnis",business,setBusiness,["Konsolidasi","OIP Beras","OIP Jagung","Komersial","Program Pemerintah"]],["Wilayah",region,setRegion,["Nasional","Pusat","Sumatera","Jawa","Kalimantan","Sulawesi","Bali & Nusra","Maluku & Papua"]]].map(([label,value,setter,options])=><label key={label as string}><span>{label as string}</span><select value={value as string} onChange={e=>(setter as (v:string)=>void)(e.target.value)}>{(options as string[]).map(o=><option key={o}>{o}</option>)}</select></label>)}<button onClick={()=>onNotify(`Report ${config.title} siap diunduh`)}><Download size={14}/>Ekspor Report</button></section><section className="finance-kpis">{config.kpis.map(([label,value,unit,note],i)=><article key={label}><header><span>{label}</span><em className={i===3?"risk":i===2?"watch":"good"}>{i===3?"Perlu aksi":i===2?"Monitor":"Terkendali"}</em></header><strong>{value}</strong><small>{unit}</small><footer><i/><span>{note}</span></footer></article>)}</section>
    {kind==="revenue"&&<><section className="finance-card revenue-trajectory"><header><div><span>REVENUE TRAJECTORY</span><h2>Target, Realisasi &amp; Forecast Pendapatan</h2></div><span className="finance-confidence">Forecast 96,8% RKAP</span></header><div>{[["Jan",2.6,2.48],["Feb",2.8,2.69],["Mar",3.1,3.04],["Apr",2.9,2.72],["Mei",3.2,2.94],["Jun",3.3,3.14],["Jul",3.4,3.28],["Agu",3.5,3.38],["Sep",3.6,3.45],["Okt",3.7,3.58],["Nov",3.8,3.66],["Des",4.0,3.81]].map(([m,t,a],i)=><article key={m as string} className={i>7?"forecast":""}><span><i style={{height:`${Number(t)*45}px`}}/><b style={{height:`${Number(a)*45}px`}}/></span><small>{m}</small><em>{a}T</em></article>)}</div><footer><span><i/>Target RKAP</span><span><i/>Realisasi / forecast</span></footer></section><div className="finance-two-col"><section className="finance-card finance-breakdown"><header><div><span>REVENUE MIX</span><h2>Pendapatan per Program</h2></div><CircleDollarSign size={20}/></header>{revenueRows.map(([name,actual,target,achievement,status])=><article key={name}><span><strong>{name}</strong><small>Target Rp{target} T</small></span><i><b style={{width:`${Math.min(100,achievement)}%`}}/></i><b>Rp{actual} T</b><em className={String(status).toLowerCase().replace(" ","-")}>{status}</em></article>)}</section><section className="finance-card finance-actions"><header><div><span>REVENUE ACTION</span><h2>Recovery Pendapatan</h2></div><Sparkles size={20}/></header>{[["Komersial B2B","Percepat kontrak 126 rb ton","Rp418 M"],["Program Pemda","Konversi pipeline menjadi PO","Rp286 M"],["Modern Trade","Perbaiki fill-rate 6 akun","Rp142 M"]].map(([name,action,value],i)=><article key={name}><b>{i+1}</b><span><strong>{name}</strong><small>{action}</small></span><em>{value}</em><button onClick={()=>onNotify(`${name}: rencana aksi dibuka`)}>Tugaskan</button></article>)}</section></div></>}
    {kind==="cost"&&<><section className="finance-card cost-table"><header><div><span>COST CONTROL</span><h2>Budget vs Actual Biaya Supply Chain</h2></div><button onClick={()=>onNotify("Analisis biaya diekspor")}><Download size={14}/>Ekspor</button></header><div className="cost-head"><span>Komponen biaya</span><span>Actual</span><span>Budget</span><span>Variance</span><span>Kontribusi</span><span>Status</span></div>{costRows.map(([name,actual,budget,variance])=><article key={name as string}><strong>{name}</strong><span>Rp{actual} T</span><span>Rp{budget} T</span><span className={Number(variance)>0?"negative":"positive"}>{Number(variance)>0?"+":""}{variance}%</span><span><i><b style={{width:`${Number(actual)/4.82*100}%`}}/></i>{(Number(actual)/4.82*100).toFixed(1)}%</span><em className={Number(variance)>8?"risk":Number(variance)>0?"watch":"good"}>{Number(variance)>8?"Over budget":Number(variance)>0?"Monitor":"Efisien"}</em></article>)}</section><div className="finance-two-col"><section className="finance-card cost-to-serve"><header><div><span>COST TO SERVE</span><h2>Biaya per Koridor</h2></div><Truck size={20}/></header>{[["Jawa → Papua",2.84,18.6],["Jawa → Maluku",2.31,14.2],["Sulsel → NTT",1.76,8.9],["Intra Jawa",.64,3.1],["Intra Sumatera",.82,4.7]].map(([lane,cost,variance])=><article key={lane as string}><strong>{lane}</strong><span>Rp{cost} jt/ton</span><i><b style={{width:`${Number(cost)/3*100}%`}}/></i><em>+{variance}%</em></article>)}</section><section className="finance-card savings-card"><header><div><span>SAVING PIPELINE</span><h2>Peluang Efisiensi</h2></div><Target size={20}/></header>{[["Konsolidasi muatan laut","Rp118 M",82],["Optimasi dwell time gudang","Rp76 M",64],["Kontrak angkutan berbasis lane","Rp64 M",51],["Penurunan inventory aging","Rp54 M",43]].map(([name,value,confidence])=><article key={name as string}><span><strong>{name}</strong><small>Confidence {confidence}%</small></span><b>{value}</b><button onClick={()=>onNotify(`${name} diajukan`)}>Ajukan</button></article>)}</section></div></>}
    {kind==="receivables"&&<><section className="finance-card receivable-aging"><header><div><span>AGING RECEIVABLES</span><h2>Umur Piutang &amp; Exposure</h2></div><Clock3 size={20}/></header><div>{[["Belum jatuh tempo",4.18,56.3,"good"],["1–30 hari",1.38,18.6,"good"],["31–60 hari",.82,11.1,"watch"],["61–90 hari",.57,7.7,"watch"],[">90 hari",.47,6.3,"risk"]].map(([bucket,value,share,state])=><article key={bucket as string}><span><strong>{bucket}</strong><small>Rp{value} triliun</small></span><i><b className={state as string} style={{width:`${share}%`}}/></i><em>{share}%</em></article>)}</div></section><section className="finance-card receivable-table"><header><div><span>COLLECTION CONTROL</span><h2>Piutang per Kelompok Debitur</h2></div><button onClick={()=>onNotify("Collection plan dibuat")}><Plus size={14}/>Buat Collection Plan</button></header><div className="receivable-head"><span>Program / Debitur</span><span>Outstanding</span><span>DSO</span><span>Overdue</span><span>Risk</span><span>Tindakan</span></div>{receivableRows.map(([program,debtor,outstanding,dso,overdue,risk])=><article key={program as string}><span><strong>{program}</strong><small>{debtor}</small></span><span>Rp{outstanding} T</span><span>{dso} hari</span><span>Rp{overdue} T</span><em className={String(risk).toLowerCase()}>{risk}</em><button onClick={()=>onNotify(`${program}: detail penagihan dibuka`)}>Detail</button></article>)}</section></>}
    {kind==="budget"&&<><section className="funding-summary"><article><header><span>PENDANAAN BANK</span><strong>Rp63,3693 T</strong><small>Total plafond</small></header><div><span><b>Rp46,5362 T</b><small>Saldo hutang</small></span><span><b>Rp16,8331 T</b><small>Kelonggaran tarik</small></span></div><footer><i><b style={{width:"73.4%"}}/></i><span>73,4% utilization</span></footer></article><article><header><span>INVESTASI PEMERINTAH</span><strong>Rp44,8100 T</strong><small>Total plafond</small></header><div><span><b>Rp20,7072 T</b><small>Saldo hutang</small></span><span><b>Rp24,1028 T</b><small>Operator investasi</small></span></div><footer><i><b style={{width:"46.2%"}}/></i><span>46,2% utilization · OIP 53,8%</span></footer></article></section><section className="finance-card funding-composition"><header><div><span>RINCIAN PENDANAAN</span><h2>Komposisi Plafond, Saldo Hutang &amp; Headroom</h2></div><WalletCards size={20}/></header><div>{[["OIP Beras",39.3,20.7,18.6],["BNI",25.6,20.2,5.32],["BRI",20.8,17.2,3.66],["Mandiri",10,2.22,7.78],["BTN",7,6.92,.076],["OIP Jagung",5.5,.005,5.49]].map(([name,ceiling,debt,headroom])=><article key={name as string}><strong>{name}</strong><span><i style={{width:`${Number(ceiling)/40*100}%`}}/><b style={{width:`${Number(debt)/40*100}%`}}/><em style={{width:`${Number(headroom)/40*100}%`}}/></span><small>{ceiling}T / {debt}T / {headroom}T</small></article>)}</div><footer><span><i/>Plafond</span><span><i/>Saldo hutang</span><span><i/>Kelonggaran tarik</span></footer></section><section className="finance-card budget-program-table"><header><div><span>MONITORING DANA &amp; REALISASI</span><h2>Realisasi OIP per Komoditas</h2></div><MoreVertical size={18}/></header>{[["OIP Beras",22.733957,22.734833,100,"3.485.945.276,8 kg"],["OIP Jagung",5.5,.263775,4.8,"47.959.138,68 kg"]].map(([name,fund,actual,progress,quantum])=><article key={name as string}><span><strong>{name}</strong><small>Update ERP 17 Agu 2026</small></span><span><b>Rp{fund} T</b><small>Nominal dana</small></span><span><b>Rp{actual} T</b><small>Realisasi</small></span><span><i><b style={{width:`${progress}%`}}/></i><strong>{progress}%</strong></span><span><b>{quantum}</b><small>Kuantum realisasi</small></span></article>)}</section></>}
    <footer className="finance-disclaimer"><Database size={15}/><span><b>Data demonstrasi berbasis referensi dashboard.</b> Nilai perlu direkonsiliasi dengan ERP/SAP, treasury, perbankan, billing, AR, RKAP, dan general ledger sebelum menjadi dasar keputusan keuangan.</span></footer></section>
}

function FinancialSimulationPage({onNotify}:{onNotify:(message:string)=>void}){
  const [volume,setVolume]=useState(900);const [sellingPrice,setSellingPrice]=useState(12800);const [purchaseCost,setPurchaseCost]=useState(11000);const [logistics,setLogistics]=useState(950);const [interest,setInterest]=useState(8.2);const [dso,setDso]=useState(42);const [horizon,setHorizon]=useState(90);const [strategy,setStrategy]=useState<"balanced"|"liquidity"|"margin">("balanced");const [running,setRunning]=useState(false);const [report,setReport]=useState(false);
  const factor=strategy==="liquidity"?.92:strategy==="margin"?1.06:1;const revenue=volume*sellingPrice/1000000;const cogs=volume*(purchaseCost+logistics)/1000000;const gross=revenue-cogs;const margin=gross/revenue*100;const workingCapital=volume*purchaseCost/1000000*(dso/90)*factor;const fundingCost=workingCapital*(interest/100)*(horizon/365);const netImpact=gross-fundingCost;const bankHeadroom=16.833;const liquidityUse=workingCapital/1000;const remaining=Math.max(0,bankHeadroom-liquidityUse);
  function run(){setRunning(true);setReport(false);window.setTimeout(()=>{setRunning(false);onNotify("Simulasi dampak keuangan selesai")},850)}
  return <section className="finance-page finance-sim-page"><header className="finance-header"><div><span>KEUANGAN / SIMULASI</span><h1>Simulasi Dampak Keuangan</h1><p>Uji dampak volume, harga, biaya supply chain, DSO, suku bunga, dan strategi pendanaan terhadap margin serta likuiditas.</p></div><div className="finance-sim-actions"><span><FlaskConical size={14}/>Mode simulasi</span><button onClick={()=>onNotify("Draf simulasi keuangan disimpan")}><Save size={14}/>Simpan Draf</button><button className="primary" onClick={()=>{setReport(true);setTimeout(()=>document.getElementById("finance-sim-report")?.scrollIntoView({behavior:"smooth"}),50)}}><FileText size={14}/>Buat Report</button></div></header><section className="finance-sim-hero"><CircleDollarSign size={22}/><div><strong>Financial impact control tower</strong><p>Model menghubungkan keputusan supply chain dengan pendapatan, gross margin, working capital, biaya pendanaan, dan headroom bank.</p></div><span>Baseline headroom bank Rp16,8331 T</span></section><section className="finance-card"><header><div><span>LANGKAH 1</span><h2>Definisikan Skenario &amp; Guardrail</h2></div><SlidersHorizontal size={20}/></header><div className="finance-sim-builder"><div><label><span>Horizon simulasi</span><select value={horizon} onChange={e=>setHorizon(Number(e.target.value))}><option value="30">30 hari</option><option value="60">60 hari</option><option value="90">90 hari</option><option value="180">180 hari</option></select></label><label><span>Cakupan</span><select><option>Konsolidasi Nasional</option><option>OIP Beras</option><option>OIP Jagung</option><option>Program SPHP</option></select></label><label><span>Strategi pendanaan</span><select value={strategy} onChange={e=>setStrategy(e.target.value as typeof strategy)}><option value="balanced">Seimbang</option><option value="liquidity">Prioritas Likuiditas</option><option value="margin">Prioritas Margin</option></select></label></div><div className="finance-sim-sliders">{[["Volume penyaluran",volume,setVolume,400,1600,25,`${volume} rb ton`],["Harga jual rata-rata",sellingPrice,setSellingPrice,10500,15000,50,`Rp${sellingPrice.toLocaleString("id-ID")}/kg`],["Harga pengadaan",purchaseCost,setPurchaseCost,9000,13500,50,`Rp${purchaseCost.toLocaleString("id-ID")}/kg`],["Biaya logistik",logistics,setLogistics,400,1800,25,`Rp${logistics.toLocaleString("id-ID")}/kg`],["Suku bunga",interest,setInterest,5,13,.1,`${interest}%`],["DSO",dso,setDso,15,90,1,`${dso} hari`]].map(([label,value,setter,min,max,step,display])=><label key={label as string}><span><b>{label}</b><strong>{display}</strong></span><input type="range" min={Number(min)} max={Number(max)} step={Number(step)} value={Number(value)} onChange={e=>(setter as (v:number)=>void)(Number(e.target.value))}/></label>)}</div><aside><h3>Guardrail Keuangan</h3>{["Gross margin minimum 5%","Headroom bank minimum 20%","DSO target ≤35 hari","Batas plafon pendanaan","Kepatuhan RKAP & otorisasi","Stress test suku bunga +200 bps","Maker-checker sebelum eksekusi"].map(x=><span key={x}><CheckCircle2 size={13}/>{x}</span>)}</aside></div><button className="finance-run" onClick={run} disabled={running}><Play size={16}/>{running?"Menghitung cash flow, margin, dan pendanaan…":"Jalankan Simulasi"}</button></section><section className="finance-card"><header><div><span>LANGKAH 2</span><h2>Hasil Dampak Finansial</h2><p>Hasil dinamis terhadap baseline dan guardrail.</p></div><span className="finance-confidence">Confidence 90,8%</span></header><div className="finance-sim-kpis"><article><span>Pendapatan</span><strong>Rp{revenue.toFixed(2)} T</strong><small>{volume} ribu ton</small></article><article><span>Gross profit</span><strong>Rp{gross.toFixed(2)} T</strong><small>Margin {margin.toFixed(1)}%</small></article><article className={margin<5?"risk":"good"}><span>Net impact</span><strong>Rp{netImpact.toFixed(2)} T</strong><small>setelah biaya dana</small></article><article><span>Working capital</span><strong>Rp{workingCapital.toFixed(2)} T</strong><small>DSO {dso} hari</small></article><article><span>Biaya pendanaan</span><strong>Rp{(fundingCost*1000).toFixed(0)} M</strong><small>{interest}% p.a.</small></article><article className={remaining<3?"risk":"good"}><span>Sisa headroom bank</span><strong>Rp{remaining.toFixed(2)} T</strong><small>dari Rp16,83 T</small></article></div><div className="finance-sim-result"><section><h3>Perbandingan Skenario</h3>{[["Baseline",12.8,11,950,42,8.7],["Prioritas Likuiditas",12.65,10.95,875,28,9.1],["Prioritas Margin",13.15,10.8,900,48,11.0]].map(([name,sell,buy,log,scenarioDso,scenarioMargin])=><article key={name as string}><strong>{name}</strong><span>Harga jual Rp{sell}k/kg</span><span>Cost Rp{Number(buy)+Number(log)/1000}k/kg</span><span>DSO {scenarioDso} hari</span><em className={Number(scenarioMargin)<7?"risk":"good"}>{scenarioMargin}% margin</em></article>)}</section><aside><span>REKOMENDASI CONTROL TOWER</span><h3>{margin<5?"Skenario belum layak":"Skenario layak dengan guardrail"}</h3><p>{dso>35?"Percepat collection dan gunakan milestone billing untuk menurunkan kebutuhan modal kerja.":"DSO berada dalam target; jaga disiplin collection dan limit kredit."} Lindungi margin melalui optimasi koridor logistik dan trigger harga.</p><div><strong>Prioritas keputusan</strong><small>Jaga headroom minimum Rp3,0 T dan margin ≥5%.</small></div><button onClick={()=>onNotify("Skenario keuangan dikirim ke Approval Center")}><Send size={14}/>Ajukan Skenario</button></aside></div></section><section className={`finance-card finance-report${report?" ready":""}`} id="finance-sim-report"><header><div><span>LANGKAH 3</span><h2>Report Rekomendasi Dampak Keuangan</h2></div><em>{report?"Report siap":"Pratinjau dinamis"}</em></header><div><section><h3>Executive Summary</h3><p>Skenario menghasilkan pendapatan <b>Rp{revenue.toFixed(2)} triliun</b>, gross margin <b>{margin.toFixed(1)}%</b>, kebutuhan working capital <b>Rp{workingCapital.toFixed(2)} triliun</b>, dan sisa headroom bank <b>Rp{remaining.toFixed(2)} triliun</b>.</p><ol><li>Validasi volume, harga, dan biaya per program serta koridor.</li><li>Turunkan DSO menuju 35 hari melalui milestone billing dan collection plan.</li><li>Kunci sumber pendanaan dengan biaya terendah tanpa melampaui covenant.</li><li>Jalankan ulang stress test untuk suku bunga dan biaya logistik.</li></ol></section><aside>{["Asumsi & versi model","P&amp;L incremental","Working capital & cash flow","Pendanaan & headroom","Sensitivity & stress test","Risiko, approval & audit"].map(x=><span key={x}><CheckCircle2 size={14}/>{x}</span>)}<button onClick={()=>onNotify("Report dampak keuangan siap diunduh")}><Download size={14}/>Unduh PDF</button></aside></div></section><footer className="finance-disclaimer"><AlertTriangle size={15}/><span><b>Mode simulasi—bukan keputusan finansial.</b> Gunakan data resmi ERP/SAP, treasury, RKAP, kontrak, AR/AP, suku bunga, pajak, dan kebijakan pendanaan sebelum approval.</span></footer></section>
}

type AdminUser={id:string;name:string;username:string;email:string;nip:string;role:string;level:"Pusat"|"Kanwil"|"Kancab";unit:string;scope:string;status:"Aktif"|"Nonaktif"|"Terkunci";mfa:boolean;lastLogin:string};

function UserManagementPage({mode,onNotify}:{mode:UserManagementMode;onNotify:(message:string)=>void}){
  const seedUsers:AdminUser[]=[
    {id:"USR-0001",name:"Mohammad Latif",username:"superadmin",email:"mohammad.latif@bulog.co.id",nip:"198602142010011003",role:"Super Administrator",level:"Pusat",unit:"Direktorat Transformasi Digital",scope:"Nasional",status:"Aktif",mfa:true,lastLogin:"17 Agu 2026 · 08:14"},
    {id:"USR-0018",name:"Rina Kartikasari",username:"rina.pengadaan",email:"rina.kartikasari@bulog.co.id",nip:"198903172012022004",role:"Pengadaan Nasional",level:"Pusat",unit:"Divisi Pengadaan",scope:"Nasional",status:"Aktif",mfa:true,lastLogin:"17 Agu 2026 · 07:52"},
    {id:"USR-0042",name:"Arief Wibowo",username:"arief.jatim",email:"arief.wibowo@bulog.co.id",nip:"198511082009011006",role:"Pimpinan Kanwil",level:"Kanwil",unit:"Kanwil Jawa Timur",scope:"Kanwil Jawa Timur",status:"Aktif",mfa:true,lastLogin:"16 Agu 2026 · 19:21"},
    {id:"USR-0061",name:"Dewi Puspitasari",username:"dewi.jabar",email:"dewi.puspitasari@bulog.co.id",nip:"199102212014022007",role:"Analis Persediaan",level:"Kanwil",unit:"Kanwil Jawa Barat",scope:"Kanwil Jawa Barat",status:"Aktif",mfa:false,lastLogin:"16 Agu 2026 · 16:48"},
    {id:"USR-0094",name:"Fajar Pratama",username:"fajar.sby",email:"fajar.pratama@bulog.co.id",nip:"199307122016011002",role:"Operator Kancab",level:"Kancab",unit:"Kancab Surabaya Utara",scope:"Kancab Surabaya Utara",status:"Aktif",mfa:false,lastLogin:"16 Agu 2026 · 15:10"},
    {id:"USR-0108",name:"Nur Aisyah",username:"aisyah.mks",email:"nur.aisyah@bulog.co.id",nip:"199006182013022003",role:"Pengadaan Kanwil",level:"Kanwil",unit:"Kanwil Sulselbar",scope:"Kanwil Sulselbar",status:"Aktif",mfa:true,lastLogin:"16 Agu 2026 · 13:44"},
    {id:"USR-0137",name:"Rizal Firmansyah",username:"rizal.medan",email:"rizal.firmansyah@bulog.co.id",nip:"198812032011011005",role:"Operator Kancab",level:"Kancab",unit:"Kancab Medan",scope:"Kancab Medan",status:"Terkunci",mfa:false,lastLogin:"15 Agu 2026 · 10:32"},
    {id:"USR-0152",name:"Maria Yuliana",username:"maria.papua",email:"maria.yuliana@bulog.co.id",nip:"199204192015022006",role:"Pimpinan Kanwil",level:"Kanwil",unit:"Kanwil Papua",scope:"Kanwil Papua",status:"Aktif",mfa:true,lastLogin:"14 Agu 2026 · 18:06"},
    {id:"USR-0181",name:"Agus Salim",username:"agus.aceh",email:"agus.salim@bulog.co.id",nip:"198701112010011008",role:"Viewer Eksekutif",level:"Kanwil",unit:"Kanwil Aceh",scope:"Kanwil Aceh",status:"Nonaktif",mfa:false,lastLogin:"01 Agu 2026 · 09:08"},
  ];
  const [users,setUsers]=useState(seedUsers);const [query,setQuery]=useState("");const [levelFilter,setLevelFilter]=useState("Semua Level");const [statusFilter,setStatusFilter]=useState("Semua Status");const [modal,setModal]=useState<"detail"|"form"|"role"|null>(null);const [editing,setEditing]=useState<AdminUser|null>(null);const emptyUser:AdminUser={id:"",name:"",username:"",email:"",nip:"",role:"Operator Kancab",level:"Kancab",unit:"",scope:"",status:"Aktif",mfa:true,lastLogin:"Belum pernah"};const [draft,setDraft]=useState<AdminUser>(emptyUser);const [selectedRole,setSelectedRole]=useState("Pengadaan Nasional");
  const [chatEnabled,setChatEnabled]=useState<Record<string,boolean>>({General:true,Persediaan:true,Pengadaan:true,"Penjualan & Penyaluran":false,Keuangan:false});const [chatUrls,setChatUrls]=useState<Record<string,string>>({General:"https://ai-scct.bulog.co.id/chat/general",Persediaan:"https://ai-scct.bulog.co.id/chat/inventory",Pengadaan:"https://ai-scct.bulog.co.id/chat/procurement","Penjualan & Penyaluran":"https://ai-scct.bulog.co.id/chat/sales",Keuangan:"https://ai-scct.bulog.co.id/chat/finance"});
  const roles=[
    {name:"Super Administrator",users:3,scope:"Nasional",type:"System",desc:"Akses penuh konfigurasi, governance, dan audit."},{name:"Pimpinan Pusat",users:18,scope:"Nasional",type:"Business",desc:"Monitoring nasional, approval, dan executive insight."},{name:"Pengadaan Nasional",users:27,scope:"Nasional",type:"Business",desc:"Kendali pengadaan lintas Kanwil dan simulasi."},{name:"Pimpinan Kanwil",users:26,scope:"Kanwil",type:"Business",desc:"Akses seluruh proses pada satu Kanwil."},{name:"Analis Persediaan",users:74,scope:"Pusat / Kanwil",type:"Business",desc:"Analitik stok, mutu, aging, dan safety stock."},{name:"Pengadaan Kanwil",users:61,scope:"Kanwil",type:"Business",desc:"Target, mitra, kontrak, dan realisasi Kanwil."},{name:"Pimpinan Kancab",users:124,scope:"Kancab",type:"Business",desc:"Monitoring dan approval pada Kancab."},{name:"Operator Kancab",users:286,scope:"Kancab",type:"Operational",desc:"Input, verifikasi, dan tindak lanjut operasional."},{name:"Viewer Eksekutif",users:39,scope:"Assigned",type:"Read only",desc:"Akses baca dashboard dan report terpilih."},
  ];
  const permissionModules=["National Dashboard","Persediaan","Pengadaan","Penjualan & Penyaluran","Distribusi","Keuangan","Alert & Exception","Decision Intelligence","Report & Governance","Master Data","Administration"];
  const [permissions,setPermissions]=useState<Record<string,boolean>>(()=>Object.fromEntries(permissionModules.flatMap((module,index)=>["View","Create","Edit","Approve","Export"].map((action,actionIndex)=>[`${module}-${action}`,index<7&&(actionIndex===0||actionIndex<4&&index===2)]))));
  const filtered=users.filter(user=>(`${user.name} ${user.username} ${user.email} ${user.unit}`.toLowerCase().includes(query.toLowerCase()))&&(levelFilter==="Semua Level"||user.level===levelFilter)&&(statusFilter==="Semua Status"||user.status===statusFilter));
  function openCreate(){setEditing(null);setDraft({...emptyUser,id:`USR-${String(users.length+201).padStart(4,"0")}`});setModal("form")};function openEdit(user:AdminUser){setEditing(user);setDraft({...user});setModal("form")};function saveUser(){if(!draft.name||!draft.username||!draft.email||!draft.unit){onNotify("Lengkapi nama, username, email, dan unit organisasi");return}setUsers(items=>editing?items.map(item=>item.id===editing.id?draft:item):[draft,...items]);setModal(null);onNotify(editing?"Perubahan user disimpan":"User baru berhasil dibuat")}
  const titles={users:["User","Kelola identitas, role, cakupan data, MFA, dan status akses pengguna SCCT."],roles:["Role","Definisikan role, mapping user, data scope, permission, dan endpoint Ask AI."],permissions:["Permission","Atur hak akses modul dan tindakan dengan prinsip least privilege serta maker-checker."],organization:["Organisasi Pengguna","Kelola hierarki akses Pusat, Kanwil, dan Kancab beserta penanggung jawabnya."],status:["Status Pengguna","Pantau lifecycle akun, MFA, lockout, aktivitas login, dan tindak lanjut keamanan."]} as const;const title=titles[mode];
  return <section className="user-admin-page" aria-label={title[0]}><header className="user-admin-header"><div><span>ADMINISTRATION / USER MANAGEMENT</span><h1>{title[0]}</h1><p>{title[1]}</p></div><div className="user-admin-updated"><i/><span><small>Directory sync</small><strong>17 Agustus 2026 · 08:20 WIB</strong></span><button onClick={()=>onNotify("Directory pengguna disinkronkan")}><RotateCw size={15}/></button></div></header>
    <nav className="user-admin-tabs">{[["users","User"],["roles","Role"],["permissions","Permission"],["organization","Organisasi Pengguna"],["status","Status Pengguna"]].map(([id,label])=><span key={id} className={mode===id?"active":""}>{label}</span>)}</nav>
    {mode==="users"&&<><section className="user-admin-kpis">{[["Total pengguna",users.length,"3 level organisasi"],["Aktif",users.filter(x=>x.status==="Aktif").length,"Sinkron directory"],["MFA aktif",users.filter(x=>x.mfa).length,"Target 100% privileged"],["Perlu tindakan",users.filter(x=>x.status!=="Aktif"||!x.mfa).length,"MFA / status akun"]].map(([label,value,note],i)=><article key={label as string}><span>{label}</span><strong>{value}</strong><small>{note}</small><i className={i===3?"risk":i===2?"watch":"good"}/></article>)}</section><section className="user-admin-card user-list-card"><header><div><span>USER DIRECTORY</span><h2>Daftar Pengguna SCCT</h2></div><button className="primary" onClick={openCreate}><Plus size={15}/>Buat User</button></header><div className="user-list-tools"><label><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari nama, username, email, atau unit…"/></label><select value={levelFilter} onChange={e=>setLevelFilter(e.target.value)}><option>Semua Level</option><option>Pusat</option><option>Kanwil</option><option>Kancab</option></select><select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}><option>Semua Status</option><option>Aktif</option><option>Nonaktif</option><option>Terkunci</option></select><button onClick={()=>onNotify("Daftar user siap diunduh")}><Download size={14}/>Ekspor</button></div><div className="user-table-head"><span>Pengguna</span><span>Role</span><span>Organisasi / Scope</span><span>Status</span><span>MFA</span><span>Login terakhir</span><span>Aksi</span></div><div className="user-table-body">{filtered.map(user=><article key={user.id}><span><b>{user.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</b><span><strong>{user.name}</strong><small>@{user.username} · {user.email}</small></span></span><span>{user.role}</span><span><strong>{user.unit}</strong><small>{user.level} · {user.scope}</small></span><em className={user.status.toLowerCase()}>{user.status}</em><em className={user.mfa?"mfa-on":"mfa-off"}>{user.mfa?"Aktif":"Belum aktif"}</em><span>{user.lastLogin}</span><span><button title="Lihat detail" onClick={()=>{setEditing(user);setModal("detail")}}><Eye size={14}/></button><button title="Edit user" onClick={()=>openEdit(user)}><Settings size={14}/></button></span></article>)}</div><footer><span>Menampilkan {filtered.length} dari {users.length} pengguna demo</span><div><button disabled>‹</button><button className="active">1</button><button>2</button><button>›</button></div></footer></section></>}
    {mode==="roles"&&<><section className="user-admin-card role-list-card"><header><div><span>ROLE DIRECTORY</span><h2>Role &amp; Mapping Pengguna</h2></div><button className="primary" onClick={()=>{setEditing(null);setModal("role")}}><Plus size={15}/>Buat Role</button></header><div className="role-grid">{roles.map(role=><button key={role.name} className={selectedRole===role.name?"selected":""} onClick={()=>setSelectedRole(role.name)}><header><span><strong>{role.name}</strong><small>{role.type}</small></span><em>{role.scope}</em></header><p>{role.desc}</p><footer><span><UserRound size={13}/>{role.users} user</span><span>Kelola <ChevronRight size={13}/></span></footer></button>)}</div></section><section className="user-admin-card role-config-card"><header><div><span>ROLE CONFIGURATION</span><h2>{selectedRole}</h2><p>Konfigurasi berikut diterapkan ke seluruh user yang dipetakan ke role ini.</p></div><button onClick={()=>onNotify(`Konfigurasi role ${selectedRole} disimpan`)}><Save size={14}/>Simpan Konfigurasi</button></header><div className="role-config-grid"><section><h3>Data Scope &amp; Governance</h3><label><span>Level akses data</span><select defaultValue={selectedRole.includes("Kanwil")?"Kanwil yang ditugaskan":"Nasional"}><option>Nasional</option><option>Region yang ditugaskan</option><option>Kanwil yang ditugaskan</option><option>Kancab yang ditugaskan</option></select></label><label><span>Approval authority</span><select><option>Tidak ada</option><option>Maker</option><option>Checker</option><option>Approver</option></select></label><label><span>Session maksimum</span><select><option>30 menit</option><option>60 menit</option><option>120 menit</option></select></label><label className="toggle-row"><span><strong>Wajib MFA</strong><small>Semua user pada role ini</small></span><input type="checkbox" defaultChecked/></label><label className="toggle-row"><span><strong>Export data sensitif</strong><small>Memerlukan alasan dan audit log</small></span><input type="checkbox"/></label></section><section className="chat-endpoint-config"><h3><Bot size={16}/>Ask AI Domain &amp; Endpoint</h3><p>Endpoint harus HTTPS, terdaftar, dan melewati gateway SCCT. Token tidak ditampilkan di UI.</p>{Object.keys(chatEnabled).map(domain=><article key={domain}><header><span><strong>{domain}</strong><small>{chatEnabled[domain]?"Chat tersedia untuk role":"Chat dinonaktifkan"}</small></span><input type="checkbox" checked={chatEnabled[domain]} onChange={e=>setChatEnabled({...chatEnabled,[domain]:e.target.checked})}/></header><label><span>Endpoint URL</span><input value={chatUrls[domain]} disabled={!chatEnabled[domain]} onChange={e=>setChatUrls({...chatUrls,[domain]:e.target.value})}/></label></article>)}</section></div></section></>}
    {mode==="permissions"&&<><section className="user-admin-card permission-card"><header><div><span>RBAC PERMISSION MATRIX</span><h2>Hak Akses per Role</h2><p>Role terpilih: <b>{selectedRole}</b></p></div><div><select value={selectedRole} onChange={e=>setSelectedRole(e.target.value)}>{roles.map(role=><option key={role.name}>{role.name}</option>)}</select><button className="primary" onClick={()=>onNotify(`Permission ${selectedRole} disimpan`)}><Save size={14}/>Simpan Permission</button></div></header><div className="permission-summary"><span><ShieldCheck size={18}/><strong>Least privilege aktif</strong><small>Perubahan permission direkam dalam audit trail dan memerlukan review untuk role privileged.</small></span><span><b>{Object.values(permissions).filter(Boolean).length}</b> izin diberikan</span><span><b>4</b> data scope</span><span><b>2</b> approval gates</span></div><div className="permission-head"><span>Modul</span>{["View","Create","Edit","Approve","Export"].map(x=><span key={x}>{x}</span>)}<span>Data Scope</span></div>{permissionModules.map((module,index)=><article key={module}><strong>{module}</strong>{["View","Create","Edit","Approve","Export"].map(action=><label key={action}><input type="checkbox" checked={permissions[`${module}-${action}`]??false} onChange={e=>setPermissions({...permissions,[`${module}-${action}`]:e.target.checked})}/><span/></label>)}<select defaultValue={index<2?"Nasional":"Assigned Organization"}><option>Nasional</option><option>Assigned Region</option><option>Assigned Kanwil</option><option>Assigned Kancab</option><option>Own Records</option></select></article>)}</section></>}
    {mode==="organization"&&<><section className="organization-kpis">{[["Pusat",1,"12 Direktorat/Divisi"],["Kanwil",26,"Seluruh Indonesia"],["Kancab",124,"Terhubung ke Kanwil"],["Pengguna terpetakan",658,"98,6% lengkap"]].map(([label,value,note])=><article key={label as string}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</section><div className="organization-layout"><section className="user-admin-card org-tree-card"><header><div><span>ORGANIZATION TREE</span><h2>Hierarki Pengguna BULOG</h2></div><button onClick={()=>onNotify("Unit organisasi baru ditambahkan")}><Plus size={14}/>Tambah Unit</button></header><div><article className="root"><span><Warehouse size={16}/><strong>BULOG PUSAT</strong><small>214 pengguna</small></span></article>{[["KANWIL JAWA TIMUR","18 Kancab","86 pengguna"],["KANWIL JAWA BARAT","12 Kancab","64 pengguna"],["KANWIL SULSELBAR","10 Kancab","53 pengguna"],["KANWIL SUMATERA UTARA","8 Kancab","46 pengguna"],["KANWIL PAPUA","5 Kancab","31 pengguna"]].map(([name,branches,userCount],i)=><article key={name}><button><ChevronDown size={13}/><span><strong>{name}</strong><small>{branches} · {userCount}</small></span></button>{i===0&&<div><span>Kancab Surabaya Utara <b>14 user</b></span><span>Kancab Malang <b>11 user</b></span><span>Kancab Madiun <b>9 user</b></span></div>}</article>)}</div></section><section className="user-admin-card org-assignment"><header><div><span>ORGANIZATION ASSIGNMENT</span><h2>Penanggung Jawab &amp; Data Scope</h2></div><ListFilter size={20}/></header>{[["BULOG Pusat","Pusat","Budi Santoso","Nasional",214],["Kanwil Jawa Timur","Kanwil","Arief Wibowo","Kanwil + Kancab",86],["Kanwil Jawa Barat","Kanwil","Siti Rahmawati","Kanwil + Kancab",64],["Kancab Surabaya Utara","Kancab","Fajar Pratama","Kancab",14],["Kancab Medan","Kancab","Rizal Firmansyah","Kancab",12]].map(([unit,level,owner,scope,count])=><article key={unit as string}><span><strong>{unit}</strong><small>{level}</small></span><span><strong>{owner}</strong><small>Penanggung jawab</small></span><em>{scope}</em><b>{count} user</b><button onClick={()=>onNotify(`Mapping ${unit} dibuka`)}>Kelola</button></article>)}</section></div></>}
    {mode==="status"&&<><section className="user-admin-kpis status-kpis">{[["Akun aktif",612,"93,0%"],["Nonaktif",31,"Terminasi / rotasi"],["Terkunci",15,"Lockout / review"],["MFA belum aktif",87,"Perlu remediasi"]].map(([label,value,note],i)=><article key={label as string}><span>{label}</span><strong>{value}</strong><small>{note}</small><i className={i>1?"risk":i===1?"watch":"good"}/></article>)}</section><div className="status-layout"><section className="user-admin-card status-policy"><header><div><span>ACCESS LIFECYCLE</span><h2>Kebijakan Status Pengguna</h2></div><ShieldCheck size={20}/></header>{[["Auto-lock gagal login","5 percobaan / 15 menit",true],["Nonaktifkan akun dormant","90 hari tanpa login",true],["Wajib review user eksternal","Setiap 30 hari",true],["Wajib MFA privileged role","Pusat & approver",true],["Auto-expire temporary access","Sesuai tanggal berakhir",true]].map(([name,value,active])=><label key={name as string}><span><strong>{name}</strong><small>{value}</small></span><input type="checkbox" defaultChecked={Boolean(active)}/></label>)}<button onClick={()=>onNotify("Kebijakan lifecycle disimpan")}><Save size={14}/>Simpan Kebijakan</button></section><section className="user-admin-card security-alerts"><header><div><span>SECURITY ACTION QUEUE</span><h2>Prioritas Tindakan</h2></div><AlertTriangle size={20}/></header>{[["15 akun terkunci","Validasi lockout dan aktivitas anomali","Hari ini","Critical"],["87 user belum MFA","Prioritaskan role approver dan Pusat","3 hari","High"],["22 akun dormant >90 hari","Konfirmasi ke organisasi pemilik","7 hari","Medium"],["9 temporary access berakhir","Review atau terminasi akses","2 hari","High"]].map(([title,note,due,severity])=><article key={title}><em className={severity.toLowerCase()}>{severity}</em><span><strong>{title}</strong><small>{note}</small></span><b>{due}</b><button onClick={()=>onNotify(`${title}: tugas dibuat`)}>Tindak lanjuti</button></article>)}</section></div><section className="user-admin-card status-user-table"><header><div><span>ACCOUNT STATUS MONITOR</span><h2>Pengguna Memerlukan Review</h2></div><button onClick={()=>onNotify("Status user diekspor")}><Download size={14}/>Ekspor</button></header>{users.filter(x=>x.status!=="Aktif"||!x.mfa).map(user=><article key={user.id}><span><strong>{user.name}</strong><small>{user.username} · {user.unit}</small></span><em className={user.status.toLowerCase()}>{user.status}</em><span>{user.mfa?"MFA aktif":"MFA belum aktif"}</span><span>{user.lastLogin}</span><button onClick={()=>{setEditing(user);setModal("detail")}}>Review</button></article>)}</section></>}
    <footer className="user-admin-disclaimer"><Database size={15}/><span><b>Data demonstrasi.</b> Integrasikan dengan directory/SSO, HR master, struktur organisasi resmi, MFA provider, audit log, dan workflow persetujuan sebelum digunakan sebagai administrasi akun produksi.</span></footer>
    {modal&&<div className="user-modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setModal(null)}}><section className={`user-modal ${modal==="role"?"role-modal":""}`} role="dialog" aria-modal="true" aria-label={modal==="detail"?"Detail user":modal==="role"?"Buat role":"Form user"}><header><div><span>{modal==="detail"?"USER PROFILE":modal==="role"?"ROLE SETUP":editing?"EDIT USER":"CREATE USER"}</span><h2>{modal==="detail"?editing?.name:modal==="role"?"Buat Role Baru":editing?"Edit Pengguna":"Buat Pengguna Baru"}</h2></div><button onClick={()=>setModal(null)} aria-label="Tutup"><X size={18}/></button></header>{modal==="detail"&&editing&&<div className="user-detail-modal"><div className="user-detail-hero"><b>{editing.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</b><span><strong>{editing.name}</strong><small>@{editing.username} · {editing.id}</small></span><em className={editing.status.toLowerCase()}>{editing.status}</em></div><div className="user-detail-grid">{[["Email",editing.email],["NIP",editing.nip],["Role",editing.role],["Level",editing.level],["Unit organisasi",editing.unit],["Data scope",editing.scope],["MFA",editing.mfa?"Aktif":"Belum aktif"],["Login terakhir",editing.lastLogin]].map(([label,value])=><span key={label}><small>{label}</small><strong>{value}</strong></span>)}</div><section><ShieldCheck size={17}/><span><strong>Kontrol keamanan</strong><small>SSO BULOG · session 60 menit · audit log aktif · IP terakhir 10.24.18.36</small></span></section><footer><button onClick={()=>{setModal(null);openEdit(editing)}}><Settings size={14}/>Edit User</button><button onClick={()=>onNotify(`Reset MFA ${editing.name} dikirim`)}>Reset MFA</button></footer></div>}{modal==="form"&&<div className="user-form"><div className="user-form-section"><h3>Informasi Akun</h3>{[["Nama lengkap","name","text"],["Username","username","text"],["Email BULOG","email","email"],["NIP / ID Pegawai","nip","text"]].map(([label,key,type])=><label key={key}><span>{label}</span><input type={type} value={String(draft[key as keyof AdminUser])} onChange={e=>setDraft({...draft,[key]:e.target.value})}/></label>)}</div><div className="user-form-section"><h3>Role &amp; Organisasi</h3><label><span>Role utama</span><select value={draft.role} onChange={e=>setDraft({...draft,role:e.target.value})}>{roles.map(role=><option key={role.name}>{role.name}</option>)}</select></label><label><span>Level organisasi</span><select value={draft.level} onChange={e=>setDraft({...draft,level:e.target.value as AdminUser["level"]})}><option>Pusat</option><option>Kanwil</option><option>Kancab</option></select></label><label><span>Unit organisasi</span><input value={draft.unit} onChange={e=>setDraft({...draft,unit:e.target.value})} placeholder="Contoh: Kanwil Jawa Timur"/></label><label><span>Data scope</span><input value={draft.scope} onChange={e=>setDraft({...draft,scope:e.target.value})} placeholder="Nasional / Kanwil / Kancab"/></label></div><div className="user-form-section full"><h3>Keamanan &amp; Lifecycle</h3><label><span>Status akun</span><select value={draft.status} onChange={e=>setDraft({...draft,status:e.target.value as AdminUser["status"]})}><option>Aktif</option><option>Nonaktif</option><option>Terkunci</option></select></label><label className="toggle-row"><span><strong>Wajib MFA</strong><small>Aktivasi pada login berikutnya</small></span><input type="checkbox" checked={draft.mfa} onChange={e=>setDraft({...draft,mfa:e.target.checked})}/></label><label><span>Atasan / approver</span><select><option>Pimpinan unit</option><option>Administrator Kanwil</option><option>Administrator Pusat</option></select></label><label><span>Tanggal berakhir akses</span><input type="date"/></label></div><footer><button onClick={()=>setModal(null)}>Batal</button><button className="primary" onClick={saveUser}><Save size={14}/>{editing?"Simpan Perubahan":"Buat User"}</button></footer></div>}{modal==="role"&&<div className="role-create-form"><label><span>Nama role</span><input placeholder="Contoh: Pengadaan Kancab"/></label><label><span>Deskripsi</span><textarea placeholder="Tujuan dan tanggung jawab role…"/></label><label><span>Default data scope</span><select><option>Nasional</option><option>Assigned Region</option><option>Assigned Kanwil</option><option>Assigned Kancab</option></select></label><label><span>Role template</span><select><option>Mulai dari kosong</option><option>Duplikasi Pengadaan Kanwil</option><option>Duplikasi Operator Kancab</option><option>Read only</option></select></label><label className="toggle-row"><span><strong>Wajib MFA</strong><small>Direkomendasikan untuk role baru</small></span><input type="checkbox" defaultChecked/></label><footer><button onClick={()=>setModal(null)}>Batal</button><button className="primary" onClick={()=>{setModal(null);onNotify("Role baru dibuat sebagai draf")}}><Save size={14}/>Buat Role</button></footer></div>}</section></div>}
  </section>
}

function ProcurementIntelligencePage({kind,onNotify}:{kind:Exclude<ProcurementWorkspaceKind,"simulation">;onNotify:(message:string)=>void}){
  const [period,setPeriod]=useState("Year to Date 2026");const [commodity,setCommodity]=useState("Beras");const [region,setRegion]=useState("Nasional");const [updated,setUpdated]=useState("12 Agustus 2026 · 08:30 WIB");const [selected,setSelected]=useState("Jawa Timur");
  const regional=[
    {name:"Jawa Timur",target:620,actual:646,pace:4.9,gap:26,forecast:108,partners:428,status:"On Track"},{name:"Jawa Tengah",target:540,actual:529,pace:4.1,gap:-11,forecast:99,partners:376,status:"Watch"},{name:"Sulselbar",target:410,actual:385,pace:3.0,gap:-25,forecast:96,partners:241,status:"Watch"},{name:"Sumatera Selatan",target:330,actual:287,pace:2.2,gap:-43,forecast:91,partners:194,status:"At Risk"},{name:"Jawa Barat",target:520,actual:374,pace:2.8,gap:-146,forecast:78,partners:319,status:"Critical"},{name:"NTB",target:245,actual:211,pace:1.7,gap:-34,forecast:92,partners:166,status:"At Risk"},{name:"Papua",target:72,actual:51,pace:.4,gap:-21,forecast:76,partners:38,status:"Critical"},
  ];
  const sources=[
    {name:"Mitra Penggilingan",volume:1246,share:43.7,quality:96.1,price:"Rp11.320/kg",lead:"2,4 hari",status:"Sehat"},{name:"Gapoktan / Poktan",volume:684,share:24,quality:94.8,price:"Rp11.180/kg",lead:"3,1 hari",status:"Sehat"},{name:"Pengadaan Langsung Petani",volume:397,share:13.9,quality:92.6,price:"Rp11.050/kg",lead:"3,8 hari",status:"Monitor"},{name:"Satgas Serap Gabah",volume:286,share:10,quality:91.4,price:"Rp11.090/kg",lead:"4,2 hari",status:"Monitor"},{name:"Transfer / Importasi",volume:237,share:8.4,quality:97.2,price:"Rp12.040/kg",lead:"21 hari",status:"Terbatas"},
  ];
  const months=[["Jan",330,312],["Feb",355,341],["Mar",410,398],["Apr",390,364],["Mei",420,332],["Jun",455,347],["Jul",470,376],["Agu",430,381],["Sep",445,408],["Okt",462,432],["Nov",475,451],["Des",488,466]] as const;
  const configs={regional:{eyebrow:"SUPPLY CHAIN MONITORING / PENGADAAN",title:"Kinerja Wilayah Pengadaan",subtitle:"Bandingkan target serapan, realisasi pengadaan, pace harian, mitra aktif, dan proyeksi akhir periode setiap Kanwil.",accent:"#245e99",kpis:[["Realisasi nasional","2,85","Juta ton","78,5% target RKAP"],["Kanwil on track","12","dari 26","4 perlu intervensi"],["Pace serapan","16.840","Ton/hari","Target 21.500"],["Gap pengadaan","780","Ribu ton","Perlu recovery plan"]]},sources:{eyebrow:"PENGADAAN / SUMBER PENGADAAN",title:"Sumber Pengadaan",subtitle:"Kendalikan portofolio pemasok, asal stok, kualitas, harga pembelian, lead time, dan ketergantungan sumber.",accent:"#167a66",kpis:[["Dalam negeri","2,61","Juta ton","91,6% realisasi"],["Mitra aktif","1.842","Mitra","87% tervalidasi"],["Harga rata-rata","Rp11.284","per kg","Dalam guardrail"],["Lulus mutu","94,8","Persen","Target ≥95%"]]},trend:{eyebrow:"PENGADAAN / TREN & PROYEKSI",title:"Tren & Proyeksi",subtitle:"Pantau trajectory serapan, pola musim panen, forecast pasokan, dan kebutuhan pace untuk mencapai target.",accent:"#7258a4",kpis:[["Realisasi YTD","2,85","Juta ton","78,5% target"],["Forecast akhir tahun","3,14","Juta ton","86,4% target"],["Kebutuhan pace","21.500","Ton/hari","+27,7% vs aktual"],["Forecast confidence","91,2","Persen","Model v2.3"]]},gap:{eyebrow:"PENGADAAN / GAP ANALYSIS",title:"Gap Analysis",subtitle:"Uraikan selisih target dan realisasi hingga Kanwil, komoditas, sumber, periode, serta akar masalah yang dapat ditindaklanjuti.",accent:"#b05b36",kpis:[["Gap terhadap RKAP","780","Ribu ton","21,5% target"],["Gap terbesar","Jawa Barat","146 rb ton","18,7% gap nasional"],["Gap harga","Rp420","per kg","vs pasar lokal"],["Recovery potential","512","Ribu ton","66% gap"]]}} as const;
  const config=configs[kind];const current=regional.find(x=>x.name===selected)??regional[0];
  return <section className="procurement-page" style={{"--proc-accent":config.accent} as CSSProperties} aria-label={config.title}>
    <header className="procurement-header"><div><span>{config.eyebrow}</span><h1>{config.title}</h1><p>{config.subtitle}</p></div><div className="procurement-updated"><i/><span><small>Data terakhir</small><strong>{updated}</strong></span><button type="button" onClick={()=>{setUpdated("Baru saja");onNotify(`${config.title} diperbarui`)}}><RotateCw size={15}/></button></div></header>
    <section className="procurement-filters">{[["Periode",period,setPeriod,["Year to Date 2026","Kuartal III 2026","Bulan Berjalan"]],["Komoditas",commodity,setCommodity,["Beras","Gabah","Jagung","Semua Komoditas"]],["Wilayah",region,setRegion,["Nasional","Sumatera","Jawa","Kalimantan","Sulawesi","Bali & Nusra","Maluku & Papua"]]].map(([label,value,setter,options])=><label key={label as string}><span>{label as string}</span><select value={value as string} onChange={e=>(setter as (v:string)=>void)(e.target.value)}>{(options as string[]).map(o=><option key={o}>{o}</option>)}</select></label>)}<button type="button" onClick={()=>onNotify(`Report ${config.title} siap diunduh`)}><Download size={15}/>Ekspor Report</button></section>
    <section className="procurement-kpis">{config.kpis.map(([label,value,unit,note],i)=><article key={label}><header><span>{label}</span><em className={i===3?"risk":i===1?"watch":"good"}>{i===3?"Perlu aksi":i===1?"Monitor":"Terkendali"}</em></header><strong>{value}</strong><small>{unit}</small><footer><i/><span>{note}</span></footer></article>)}</section>
    {kind==="regional"&&<><section className="procurement-card procurement-region-table"><header><div><span>PERFORMA KANWIL</span><h2>Target, Realisasi &amp; Forecast Pengadaan</h2><p>Klik Kanwil untuk melihat driver dan tindakan pemulihan.</p></div><BarChart3 size={21}/></header><div className="proc-region-head"><span>Kanwil</span><span>Target</span><span>Realisasi</span><span>Pencapaian</span><span>Pace/hari</span><span>Forecast</span><span>Status</span></div>{regional.map(x=><button type="button" key={x.name} className={selected===x.name?"selected":""} onClick={()=>setSelected(x.name)}><span><strong>{x.name}</strong><small>{x.partners} mitra aktif</small></span><span>{x.target} rb</span><span>{x.actual} rb</span><span><i><b style={{width:`${Math.min(100,x.actual/x.target*100)}%`}}/></i><strong>{(x.actual/x.target*100).toFixed(1)}%</strong></span><span>{x.pace} rb</span><span>{x.forecast}%</span><em className={x.status.toLowerCase().replace(" ","-")}>{x.status}</em></button>)}</section><div className="procurement-two-col"><section className="procurement-card proc-region-detail"><header><div><span>KANWIL TERPILIH</span><h2>{current.name}</h2></div><em className={current.status.toLowerCase().replace(" ","-")}>{current.status}</em></header><div><strong>{current.gap>0?"+":""}{current.gap} rb ton</strong><span>Gap terhadap target</span><p>{current.gap<0?`Pace perlu dinaikkan menjadi ${(current.pace+Math.abs(current.gap)/30).toFixed(1)} ribu ton/hari untuk menutup gap dalam 30 hari.`:"Realisasi melampaui trajectory. Jaga mutu dan kapasitas penerimaan gudang."}</p><button type="button" onClick={()=>onNotify(`Recovery plan ${current.name} diajukan`)}><Send size={14}/>Ajukan Recovery Plan</button></div></section><section className="procurement-card proc-actions"><header><div><span>PRIORITAS HARI INI</span><h2>Intervensi Wilayah</h2></div><Sparkles size={20}/></header>{[["Jawa Barat","Aktifkan 42 mitra dormant","Hari ini"],["Sumatera Selatan","Tambah mobile dryer di 3 sentra","2×24 jam"],["NTB","Sesuaikan jadwal jemput gabah","3 hari"]].map(([name,action,due],i)=><article key={name}><b>{i+1}</b><span><strong>{name}</strong><small>{action}</small></span><em>{due}</em><button onClick={()=>onNotify(`${action} ditugaskan`)}>Tugaskan</button></article>)}</section></div></>}
    {kind==="sources"&&<><div className="procurement-two-col"><section className="procurement-card source-mix"><header><div><span>PORTOFOLIO SUMBER</span><h2>Komposisi Realisasi</h2></div><Scale size={21}/></header><div>{sources.map(x=><article key={x.name}><span><strong>{x.name}</strong><small>{x.volume.toLocaleString("id-ID")} rb ton</small></span><i><b style={{width:`${x.share}%`}}/></i><em>{x.share}%</em></article>)}</div></section><section className="procurement-card source-risk"><header><div><span>CONCENTRATION RISK</span><h2>Ketergantungan &amp; Resiliensi</h2></div><ShieldCheck size={21}/></header><div className="source-score"><strong>72</strong><span>Supplier Resilience Score<small>Watch · konsentrasi tinggi di 6 Kanwil</small></span></div>{[["Top-10 mitra",38],["Sumber lokal",82],["Kontrak aktif",76],["Alternatif tervalidasi",61]].map(([label,val])=><div key={label as string}><span>{label}<b>{val}%</b></span><i><b style={{width:`${val}%`}}/></i></div>)}</section></div><section className="procurement-card source-table"><header><div><span>SUPPLIER SOURCE CONTROL</span><h2>Kinerja Sumber Pengadaan</h2></div><button onClick={()=>onNotify("Evaluasi pemasok dibuat")}><Plus size={14}/>Evaluasi Sumber</button></header><div className="source-head"><span>Sumber</span><span>Volume</span><span>Share</span><span>Lulus mutu</span><span>Harga rata-rata</span><span>Lead time</span><span>Status</span></div>{sources.map(x=><article key={x.name}><strong>{x.name}</strong><span>{x.volume.toLocaleString("id-ID")} rb ton</span><span>{x.share}%</span><span>{x.quality}%</span><span>{x.price}</span><span>{x.lead}</span><em className={x.status==="Sehat"?"good":x.status==="Monitor"?"watch":"risk"}>{x.status}</em></article>)}</section></>}
    {kind==="trend"&&<><section className="procurement-card procurement-trend"><header><div><span>TRAJECTORY 2026</span><h2>Target, Realisasi &amp; Forecast Bulanan</h2><p>September–Desember menampilkan forecast model berdasarkan panen, kontrak, harga, dan pace.</p></div><span className="proc-confidence">Confidence 91,2%</span></header><div className="proc-trend-chart">{months.map(([month,target,actual],i)=><div key={month} className={i>7?"forecast":""}><span><i style={{height:`${target/5}px`}}/><b style={{height:`${actual/5}px`}}/></span><small>{month}</small><em>{actual}</em></div>)}</div><footer><span><i/>Target</span><span><i/>Realisasi / forecast</span><span>ribu ton per bulan</span></footer></section><div className="procurement-two-col"><section className="procurement-card harvest-window"><header><div><span>HARVEST SIGNAL</span><h2>Jendela Panen Prioritas</h2></div><CalendarDays size={20}/></header>{[["Jawa Timur","Agu–Sep","Tinggi","+186 rb ton"],["Sulselbar","Sep–Okt","Tinggi","+142 rb ton"],["Sumatera Selatan","Okt–Nov","Sedang","+88 rb ton"],["NTB","Sep","Sedang","+51 rb ton"]].map(([name,window,level,potential])=><article key={name}><strong>{name}</strong><span>{window}</span><em>{level}</em><b>{potential}</b></article>)}</section><section className="procurement-card proc-actions"><header><div><span>FORECAST ACTION</span><h2>Kebutuhan Kapasitas</h2></div><Warehouse size={20}/></header>{[["Gudang","+312 rb ton ruang siap"],["Dryer","18 unit mobile tambahan"],["Armada jemput","126 rit/hari tambahan"]].map(([name,action],i)=><article key={name}><b>{i+1}</b><span><strong>{name}</strong><small>{action}</small></span><button onClick={()=>onNotify(`Rencana ${name} dibuka`)}>Detail</button></article>)}</section></div></>}
    {kind==="gap"&&<><section className="procurement-card gap-waterfall"><header><div><span>GAP DECOMPOSITION</span><h2>Kontributor Gap 780 Ribu Ton</h2></div><AlertTriangle size={21}/></header><div>{[["Target RKAP",3630,"base"],["Realisasi",2850,"actual"],["Kapasitas serap",312,"risk"],["Pergeseran panen",218,"risk"],["Harga pasar",164,"watch"],["Mutu & drying",86,"watch"]].map(([name,value,state])=><article key={name as string}><strong>{name}</strong><i><b className={state as string} style={{width:`${Math.min(100,Number(value)/36.3)}%`}}/></i><span>{Number(value).toLocaleString("id-ID")} rb ton</span></article>)}</div></section><div className="procurement-two-col"><section className="procurement-card gap-driver"><header><div><span>ROOT CAUSE</span><h2>Driver yang Dapat Ditindaklanjuti</h2></div><Target size={20}/></header>{[["Harga pembelian kurang kompetitif","Jawa Barat · Jateng",164,"Atur escalation HPP"],["Kapasitas dryer terbatas","Sumsel · Sulselbar",86,"Mobilisasi 18 dryer"],["Mitra tidak aktif","7 Kanwil",142,"Reaktivasi 126 mitra"],["Slot gudang terbatas","Jatim · NTB",120,"Percepat outflow"]].map(([cause,scope,impact,action])=><article key={cause as string}><span><strong>{cause}</strong><small>{scope}</small></span><b>{impact} rb</b><button onClick={()=>onNotify(`${action} diajukan`)}>{action}</button></article>)}</section><section className="procurement-card recovery-plan"><header><div><span>RECOVERY PLAN</span><h2>Potensi Penutupan Gap</h2></div><CheckCircle2 size={20}/></header><div className="recovery-ring"><strong>66%</strong><span>512 rb ton<small>recovery potential</small></span></div>{[["0–30 hari",224,"Committed"],["31–60 hari",188,"High confidence"],["61–90 hari",100,"Conditional"]].map(([period,value,status])=><article key={period as string}><strong>{period}</strong><i><b style={{width:`${Number(value)/2.24}%`}}/></i><span>{value} rb</span><em>{status}</em></article>)}<button onClick={()=>onNotify("Recovery plan dikirim ke Approval Center")}><Send size={14}/>Ajukan Recovery Plan</button></section></div></>}
    <footer className="procurement-disclaimer"><Database size={15}/><span><b>Data demonstrasi.</b> Untuk operasional, hubungkan RKAP, ERP pengadaan, WMS, data mitra, hasil uji mutu, harga pasar, kalender panen, kontrak, dan data penyerapan resmi BULOG.</span></footer>
  </section>
}

function ProcurementSimulationPage({onNotify}:{onNotify:(message:string)=>void}){
  const [target,setTarget]=useState(950);const [market,setMarket]=useState(11200);const [harvest,setHarvest]=useState(15);const [quality,setQuality]=useState(94);const [horizon,setHorizon]=useState(60);const [strategy,setStrategy]=useState<"balanced"|"domestic"|"cost">("balanced");const [running,setRunning]=useState(false);const [report,setReport]=useState(false);
  const factor=strategy==="domestic"?1.08:strategy==="cost"?.92:1;const achievable=Math.round(target*(.72+harvest/100)*(quality/100)*factor);const gap=Math.max(0,target-achievable);const pace=Math.round(achievable/horizon*1000);const avgPrice=Math.round(market*(strategy==="cost"?.975:strategy==="domestic"?1.008:1));const budget=Math.round(achievable*avgPrice/1000);const domestic=strategy==="domestic"?98:strategy==="cost"?88:94;const confidence=Math.min(96,Math.round(82+quality/10-horizon/30));
  const regions=[["Jawa Timur",220,238,108],["Jawa Tengah",190,181,95],["Sulselbar",145,137,94],["Jawa Barat",170,121,71],["Sumatera Selatan",125,104,83],["NTB",100,83,83]] as const;
  function run(){setRunning(true);setReport(false);window.setTimeout(()=>{setRunning(false);onNotify("Simulasi pengadaan selesai")},850)}
  return <section className="procurement-page procurement-sim-page" aria-label="Simulasi Pengadaan"><header className="procurement-header"><div><span>PENGADAAN / SIMULASI</span><h1>Simulasi Pengadaan</h1><p>Uji target serapan, harga, musim panen, mutu, kapasitas mitra, gudang, dan anggaran sebelum rencana pengadaan diajukan.</p></div><div className="proc-sim-actions"><span><FlaskConical size={14}/>Mode simulasi</span><button onClick={()=>onNotify("Draf simulasi pengadaan disimpan")}><Save size={14}/>Simpan Draf</button><button className="primary" onClick={()=>{setReport(true);setTimeout(()=>document.getElementById("procurement-report")?.scrollIntoView({behavior:"smooth"}),50)}}><FileText size={14}/>Buat Report</button></div></header>
    <section className="proc-sim-hero"><Sparkles size={22}/><div><strong>Decision workspace pengadaan CBP</strong><p>Model menyeimbangkan pencapaian target, sumber dalam negeri, mutu, HPP/guardrail harga, kapasitas gudang, dan risiko pasokan.</p></div><span>Model PO v2.2 · Confidence {confidence}%</span></section>
    <section className="procurement-card"><header><div><span>LANGKAH 1</span><h2>Definisikan Skenario &amp; Guardrail</h2></div><SlidersHorizontal size={21}/></header><div className="proc-sim-builder"><div className="proc-sim-fields"><label><span>Cakupan</span><select><option>Nasional</option><option>Region</option><option>Kanwil</option></select></label><label><span>Komoditas</span><select><option>Beras CBP</option><option>Gabah Kering Giling</option><option>Jagung</option></select></label><label><span>Horizon</span><select value={horizon} onChange={e=>setHorizon(Number(e.target.value))}><option value="30">30 hari</option><option value="60">60 hari</option><option value="90">90 hari</option></select></label></div><div className="proc-sim-sliders"><label><span><b>Target volume</b><strong>{target} rb ton</strong></span><input type="range" min="400" max="1500" step="25" value={target} onChange={e=>setTarget(Number(e.target.value))}/></label><label><span><b>Harga pasar gabah/beras</b><strong>Rp{market.toLocaleString("id-ID")}/kg</strong></span><input type="range" min="9500" max="13500" step="50" value={market} onChange={e=>setMarket(Number(e.target.value))}/></label><label><span><b>Uplift musim panen</b><strong>+{harvest}%</strong></span><input type="range" min="-20" max="40" value={harvest} onChange={e=>setHarvest(Number(e.target.value))}/></label><label><span><b>Acceptance mutu</b><strong>{quality}%</strong></span><input type="range" min="80" max="99" value={quality} onChange={e=>setQuality(Number(e.target.value))}/></label></div><aside><h3>Guardrail BULOG</h3>{["HPP/HET dan otorisasi harga","Prioritas produksi dalam negeri","Spesifikasi mutu per komoditas","Kapasitas gudang maksimum 85%","Kapasitas dryer & armada jemput","Batas anggaran dan kontrak","Maker-checker sebelum eksekusi"].map(x=><span key={x}><CheckCircle2 size={13}/>{x}</span>)}</aside></div><div className="proc-strategy"><span>Strategi optimasi</span>{[["balanced","Seimbang","Target, biaya, mutu"],["domestic","Serap Domestik","Maksimalkan petani/mitra lokal"],["cost","Efisiensi Biaya","Minimalkan landed cost"]].map(([id,label,note])=><button key={id} className={strategy===id?"selected":""} onClick={()=>setStrategy(id as typeof strategy)}><strong>{label}</strong><small>{note}</small></button>)}</div><button className="proc-run" onClick={run} disabled={running}><Play size={16}/>{running?"Mengoptimalkan sumber, Kanwil, harga, dan kapasitas…":"Jalankan Simulasi"}</button></section>
    <section className="procurement-card"><header><div><span>LANGKAH 2</span><h2>Hasil &amp; Rekomendasi Skenario</h2><p>Hasil dinamis berdasarkan asumsi dan strategi terpilih.</p></div><span className="proc-confidence">Confidence {confidence}%</span></header><div className="proc-sim-kpis"><article><span>Volume achievable</span><strong>{achievable.toLocaleString("id-ID")} rb ton</strong><small>{Math.round(achievable/target*100)}% target</small></article><article className="risk"><span>Residual gap</span><strong>{gap.toLocaleString("id-ID")} rb ton</strong><small>setelah intervensi</small></article><article><span>Pace dibutuhkan</span><strong>{pace.toLocaleString("id-ID")} ton/hari</strong><small>selama {horizon} hari</small></article><article><span>Harga rata-rata</span><strong>Rp{avgPrice.toLocaleString("id-ID")}</strong><small>per kg</small></article><article className="good"><span>Sumber domestik</span><strong>{domestic}%</strong><small>portofolio rekomendasi</small></article><article><span>Anggaran indikatif</span><strong>Rp{(budget/1000).toFixed(2)} T</strong><small>belum termasuk logistik</small></article></div><div className="proc-sim-result"><section><h3>Alokasi Rekomendasi per Kanwil</h3><div className="proc-sim-head"><span>Kanwil</span><span>Target</span><span>Rekomendasi</span><span>Pencapaian</span><span>Tindakan</span></div>{regions.map(([name,regionalTarget,base,score])=>{const recommendation=Math.round(Number(base)*factor);return <article key={name}><strong>{name}</strong><span>{regionalTarget} rb</span><span>{recommendation} rb</span><span><i><b style={{width:`${Math.min(100,Number(score)*factor)}%`}}/></i>{Math.round(Number(score)*factor)}%</span><button onClick={()=>onNotify(`Asumsi ${name} dibuka`)}>Detail</button></article>})}</section><aside><span>REKOMENDASI CONTROL TOWER</span><h3>{gap>150?"Perlu intervensi lintas wilayah":"Skenario layak diajukan"}</h3><p>Aktifkan serapan intensif pada Jawa Barat dan Sumatera Selatan, kunci kapasitas dryer serta gudang, dan gunakan kontrak bertahap untuk mengelola volatilitas harga.</p><div><strong>Keputusan utama</strong><small>Alokasikan {achievable.toLocaleString("id-ID")} rb ton dengan {domestic}% sumber domestik.</small></div><button onClick={()=>onNotify("Skenario dikirim ke Approval Center")}><Send size={14}/>Ajukan Skenario</button></aside></div></section>
    <section className={`procurement-card proc-report${report?" ready":""}`} id="procurement-report"><header><div><span>LANGKAH 3</span><h2>Report Rekomendasi Pengadaan</h2></div><em>{report?"Report siap":"Pratinjau dinamis"}</em></header><div><section><h3>Executive Summary</h3><p>Dalam horizon <b>{horizon} hari</b>, model memproyeksikan volume achievable <b>{achievable.toLocaleString("id-ID")} ribu ton</b> dengan residual gap <b>{gap.toLocaleString("id-ID")} ribu ton</b>, harga rata-rata <b>Rp{avgPrice.toLocaleString("id-ID")}/kg</b>, dan kebutuhan pace <b>{pace.toLocaleString("id-ID")} ton/hari</b>.</p><ol><li>Prioritaskan serapan domestik pada sentra panen tervalidasi.</li><li>Kunci harga, mutu, kapasitas dryer, transportasi, dan gudang sebelum kontrak.</li><li>Gunakan kontrak bertahap serta trigger eskalasi bila harga menyimpang.</li><li>Jalankan ulang simulasi saat forecast pasokan berubah lebih dari 10%.</li></ol></section><aside>{["Asumsi & versi model","Rencana volume per Kanwil","Portofolio sumber","Harga dan kebutuhan anggaran","Kapasitas & risiko eksekusi","Approval dan audit trail"].map(x=><span key={x}><CheckCircle2 size={14}/>{x}</span>)}<button onClick={()=>onNotify("Report simulasi pengadaan siap diunduh")}><Download size={14}/>Unduh PDF</button></aside></div></section>
    <footer className="procurement-disclaimer"><AlertTriangle size={15}/><span><b>Mode simulasi—bukan instruksi pengadaan.</b> Angka merupakan data contoh dan wajib diganti dengan RKAP, harga resmi, forecast panen, hasil inspeksi mutu, kontrak, anggaran, kapasitas gudang, serta aturan pengadaan BULOG yang berlaku.</span></footer>
  </section>
}

function TargetRealizationPage({ onNotify }: { onNotify: (message: string) => void }) {
  const [period, setPeriod] = useState("Year to Date 2026");
  const [region, setRegion] = useState("Nasional");
  const [commodity, setCommodity] = useState("Semua Komoditas");
  const [view, setView] = useState<"nominal" | "percentage">("percentage");
  const [updated, setUpdated] = useState("12 Agustus 2026 · 08:30 WIB");
  const [selectedDomain, setSelectedDomain] = useState("Pengadaan");

  const domains = [
    { name: "Persediaan", target: 4.8, actual: 5.253, unit: "jt ton", progress: 109.5, variance: "+453 rb ton", forecast: 111.2, status: "On Track", color: "#27805b" },
    { name: "Pengadaan", target: 3.63, actual: 2.85, unit: "jt ton", progress: 78.5, variance: "-780 rb ton", forecast: 86.4, status: "At Risk", color: "#c74a39" },
    { name: "Penjualan & Penyaluran", target: 4.44, actual: 3.91, unit: "jt ton", progress: 88.1, variance: "-530 rb ton", forecast: 96.8, status: "Watch", color: "#dda31e" },
    { name: "Distribusi OTIF", target: 95, actual: 91.7, unit: "%", progress: 96.5, variance: "-3,3 pp", forecast: 98.1, status: "Watch", color: "#dda31e" },
    { name: "Pendapatan", target: 34.2, actual: 31.6, unit: "Rp T", progress: 92.4, variance: "-Rp2,60 T", forecast: 99.2, status: "Watch", color: "#dda31e" },
    { name: "Data Quality", target: 98, actual: 97.2, unit: "%", progress: 99.2, variance: "-0,8 pp", forecast: 100, status: "On Track", color: "#27805b" },
  ];
  const selected = domains.find((item) => item.name === selectedDomain) ?? domains[1];
  const monthly = [
    ["Jan", 88, 84], ["Feb", 89, 85], ["Mar", 90, 83], ["Apr", 91, 86], ["Mei", 92, 82], ["Jun", 93, 80], ["Jul", 94, 77], ["Agu", 95, 78.5], ["Sep", 96, 84], ["Okt", 97, 88], ["Nov", 99, 91], ["Des", 100, 86.4],
  ];
  const regions = [
    ["Jawa Timur", 104, "+82 rb", "On Track"], ["Jawa Tengah", 98, "-12 rb", "Watch"], ["Sulselbar", 94, "-34 rb", "Watch"], ["Sumatera Utara", 91, "-46 rb", "Watch"], ["NTB", 88, "-29 rb", "At Risk"], ["Jawa Barat", 72, "-126 rb", "Critical"], ["Papua", 68, "-38 rb", "Critical"],
  ];

  return <section className="performance-page target-page" aria-label="Target vs Realisasi">
    <header className="performance-header"><div><span>BERANDA / PERFORMANCE MANAGEMENT</span><h1>Target vs Realisasi</h1><p>Pantau pencapaian KPI nasional, gap terhadap target, trajectory bulanan, serta proyeksi akhir periode.</p></div><div className="performance-updated"><i/><span><small>Pembaruan terakhir</small><strong>{updated}</strong></span><button type="button" onClick={()=>{setUpdated("Baru saja");onNotify("Data Target vs Realisasi diperbarui")}}><RotateCw size={16}/></button></div></header>
    <section className="performance-filters">{[["Periode",period,setPeriod,["Year to Date 2026","Kuartal III 2026","Bulan Berjalan"]],["Wilayah",region,setRegion,["Nasional","Sumatera","Jawa","Kalimantan","Sulawesi","Bali & Nusra","Maluku & Papua"]],["Komoditas",commodity,setCommodity,["Semua Komoditas","Beras","Jagung","Gula","Minyak Goreng"]]].map(([label,value,setter,options])=><label key={label as string}><span>{label as string}</span><select value={value as string} onChange={(event)=>(setter as (value:string)=>void)(event.target.value)}>{(options as string[]).map((option)=><option key={option}>{option}</option>)}</select></label>)}<div className="performance-view-toggle"><button type="button" className={view==="percentage"?"active":""} onClick={()=>setView("percentage")}>Persentase</button><button type="button" className={view==="nominal"?"active":""} onClick={()=>setView("nominal")}>Nominal</button></div></section>
    <section className="performance-hero"><div><span>NATIONAL PERFORMANCE SCORE</span><strong>91,2</strong><small>dari 100</small></div><div><h2>7 dari 12 KPI berada pada trajectory</h2><p>Pengadaan menjadi kontributor gap terbesar. Tanpa percepatan, proyeksi akhir tahun hanya mencapai 86,4% target.</p><span><Sparkles size={15}/><b>Fokus hari ini:</b> tambah serapan 21.500 ton/hari pada empat Kanwil prioritas.</span></div><aside><span>KPI On Track<strong>7</strong></span><span>Watch<strong>3</strong></span><span>At Risk<strong>2</strong></span></aside></section>
    <section className="target-domain-grid">{domains.map((item)=><button type="button" key={item.name} className={selectedDomain===item.name?"selected":""} onClick={()=>setSelectedDomain(item.name)}><header><span>{item.name}</span><em className={item.status.toLowerCase().replace(" ","-")}>{item.status}</em></header><div><strong>{view==="percentage"?`${item.progress}%`:item.actual.toLocaleString("id-ID")}</strong><small>{view==="percentage"?`${item.actual.toLocaleString("id-ID")} ${item.unit}`:`Target ${item.target.toLocaleString("id-ID")} ${item.unit}`}</small></div><i><b style={{width:`${Math.min(100,item.progress)}%`,background:item.color}}/></i><footer><span>Variance <b>{item.variance}</b></span><span>Forecast <b>{item.forecast}%</b></span></footer></button>)}</section>
    <div className="performance-main-grid"><section className="performance-card trajectory-card"><header><div><span>TRAJECTORY KPI</span><h2>{selected.name}: Target, Realisasi & Forecast</h2></div><span>{selected.unit}</span></header><div className="trajectory-chart"><div className="trajectory-y"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div className="trajectory-bars">{monthly.map(([month,target,actual],index)=><div key={month as string} className={index>7?"forecast":""}><span><i style={{height:`${target}%`}}/><b style={{height:`${actual}%`}}/></span><small>{month}</small></div>)}</div></div><footer><span><i/>Target kumulatif</span><span><i/>Realisasi</span><span><i/>Forecast</span></footer></section><aside className="performance-card gap-card"><header><div><span>GAP ANALYSIS</span><h2>Driver Utama</h2></div><AlertTriangle size={20}/></header>{[["Kapasitas serap mitra","-312 rb ton",40],["Pergeseran musim panen","-218 rb ton",28],["Harga pasar kompetitif","-164 rb ton",21],["Kendala mutu & drying","-86 rb ton",11]].map(([label,value,share])=><div key={label as string}><span><strong>{label}</strong><small>{value}</small></span><i><b style={{width:`${share}%`}}/></i><em>{share}%</em></div>)}<button type="button" onClick={()=>onNotify("Analisis akar masalah dibuka")}>Buka Root Cause Analysis <ArrowRight size={14}/></button></aside></div>
    <section className="performance-card regional-gap"><header><div><span>PERFORMA WILAYAH</span><h2>Kontribusi Gap terhadap Target</h2></div><button type="button" onClick={()=>onNotify("Regional Performance dibuka")}>Lihat Regional Performance <ArrowRight size={14}/></button></header><div className="regional-gap-head"><span>Kanwil</span><span>Pencapaian</span><span>Gap volume</span><span>Status</span><span>Prioritas</span></div>{regions.map(([name,score,gap,status],index)=><article key={name as string}><span><b>{index+1}</b><strong>{name}</strong></span><span><i><b style={{width:`${score}%`}}/></i><strong>{score}%</strong></span><span>{gap}</span><em className={(status as string).toLowerCase().replace(" ","-")}>{status}</em><button type="button" onClick={()=>onNotify(`Rencana aksi ${name} dibuka`)}>Buat aksi <ChevronRight size={13}/></button></article>)}</section>
    <footer className="performance-disclaimer"><Database size={15}/><span><b>Data demonstrasi.</b> Hubungkan target RKAP, ERP, WMS, CRM, dan sistem keuangan untuk penggunaan operasional serta audit pencapaian.</span></footer>
  </section>;
}

function RegionalPerformancePage({ onNotify }: { onNotify: (message: string) => void }) {
  const [period,setPeriod]=useState("Year to Date 2026");
  const [domain,setDomain]=useState("Composite Score");
  const [cluster,setCluster]=useState("Semua Region");
  const [selected,setSelected]=useState("Jawa Timur");
  const [updated,setUpdated]=useState("12 Agustus 2026 · 08:30 WIB");
  const rows=[
    {rank:1,name:"Jawa Timur",region:"Jawa",score:94.6,stock:108,procurement:104,sales:96,otif:97,finance:95,alerts:1,trend:"+2,8",status:"On Track"},
    {rank:2,name:"Jawa Tengah",region:"Jawa",score:92.8,stock:101,procurement:98,sales:94,otif:95,finance:93,alerts:2,trend:"+1,4",status:"On Track"},
    {rank:3,name:"Sulselbar",region:"Sulawesi",score:89.7,stock:96,procurement:94,sales:91,otif:88,finance:90,alerts:3,trend:"+0,6",status:"Watch"},
    {rank:4,name:"Sumatera Utara",region:"Sumatera",score:87.9,stock:92,procurement:91,sales:89,otif:87,finance:88,alerts:3,trend:"-0,8",status:"Watch"},
    {rank:5,name:"Kalimantan Selatan",region:"Kalimantan",score:86.4,stock:89,procurement:88,sales:90,otif:84,finance:87,alerts:4,trend:"+1,1",status:"Watch"},
    {rank:6,name:"NTB",region:"Bali & Nusra",score:83.2,stock:114,procurement:88,sales:82,otif:81,finance:84,alerts:5,trend:"-2,1",status:"At Risk"},
    {rank:7,name:"Jawa Barat",region:"Jawa",score:80.8,stock:93,procurement:72,sales:86,otif:85,finance:83,alerts:6,trend:"-3,4",status:"At Risk"},
    {rank:8,name:"Maluku",region:"Maluku & Papua",score:74.9,stock:63,procurement:79,sales:78,otif:72,finance:76,alerts:7,trend:"-1,9",status:"Critical"},
    {rank:9,name:"Papua",region:"Maluku & Papua",score:68.3,stock:40,procurement:74,sales:71,otif:68,finance:72,alerts:9,trend:"-4,6",status:"Critical"},
  ];
  const filtered=cluster==="Semua Region"?rows:rows.filter((item)=>item.region===cluster);
  const current=rows.find((item)=>item.name===selected)??rows[0];
  const pillars=[["Persediaan",current.stock],["Pengadaan",current.procurement],["Penjualan",current.sales],["OTIF",current.otif],["Keuangan",current.finance]] as const;
  return <section className="performance-page regional-page" aria-label="Regional Performance">
    <header className="performance-header"><div><span>BERANDA / REGIONAL COMMAND</span><h1>Regional Performance</h1><p>Bandingkan kinerja Kanwil secara konsisten, temukan driver gap, dan arahkan intervensi pada wilayah prioritas.</p></div><div className="performance-updated"><i/><span><small>Pembaruan terakhir</small><strong>{updated}</strong></span><button type="button" onClick={()=>{setUpdated("Baru saja");onNotify("Regional Performance diperbarui")}}><RotateCw size={16}/></button></div></header>
    <section className="performance-filters">{[["Periode",period,setPeriod,["Year to Date 2026","Kuartal III 2026","Bulan Berjalan"]],["Domain KPI",domain,setDomain,["Composite Score","Persediaan","Pengadaan","Penjualan & Penyaluran","Distribusi OTIF","Keuangan"]],["Cluster Wilayah",cluster,setCluster,["Semua Region","Sumatera","Jawa","Kalimantan","Sulawesi","Bali & Nusra","Maluku & Papua"]]].map(([label,value,setter,options])=><label key={label as string}><span>{label as string}</span><select value={value as string} onChange={(event)=>(setter as (value:string)=>void)(event.target.value)}>{(options as string[]).map((option)=><option key={option}>{option}</option>)}</select></label>)}<button type="button" className="regional-export" onClick={()=>onNotify("Snapshot regional siap diunduh")}><Download size={15}/>Ekspor Ranking</button></section>
    <section className="regional-hero"><div><span>NATIONAL REGIONAL SCORE</span><strong>84,3</strong><small>+1,7 poin vs bulan lalu</small></div><div><span>Kanwil On Track</span><strong>12</strong><small>dari 26 Kanwil</small></div><div><span>Kanwil At Risk</span><strong>6</strong><small>perlu recovery plan</small></div><div><span>Critical Exceptions</span><strong>10</strong><small>5 melewati SLA</small></div><aside><Sparkles size={18}/><p><b>Prioritas nasional:</b> pulihkan availability Papua, OTIF Maluku, dan trajectory pengadaan Jawa Barat.</p></aside></section>
    <div className="regional-workspace"><section className="performance-card regional-map-card"><header><div><span>NATIONAL HEATMAP</span><h2>Peta Kinerja Kanwil</h2></div><span className="map-legend"><i/>On Track<i/>Watch<i/>Critical</span></header><div className="regional-map-stage"><iframe title="Peta Regional Performance" src="https://www.google.com/maps?q=Indonesia&z=4&output=embed&hl=id" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><div>{[["SUMUT",18,37,88],["JABAR",39,62,81],["JATENG",44,61,93],["JATIM",49,61,95],["SULSELBAR",65,47,90],["NTB",59,66,83],["MALUKU",77,48,75],["PAPUA",89,51,68]].map(([name,left,top,score])=><button type="button" key={name as string} className={Number(score)<76?"critical":Number(score)<88?"watch":"good"} style={{left:`${left}%`,top:`${top}%`}} onClick={()=>{const match=rows.find((item)=>item.name.toUpperCase().includes(String(name).replace("SULSELBAR","SULSELBAR")));if(match)setSelected(match.name)}}><strong>{score}</strong><small>{name}</small></button>)}</div></div></section><aside className="performance-card regional-detail"><header><div><span>KANWIL TERPILIH</span><h2>{current.name}</h2></div><em className={current.status.toLowerCase().replace(" ","-")}>{current.status}</em></header><div className="regional-detail-score"><strong>{current.score}</strong><span>Composite Score<small>Ranking #{current.rank} nasional</small></span></div><div className="regional-pillar-list">{pillars.map(([label,value])=><div key={label}><span>{label}<b>{value}%</b></span><i><b style={{width:`${Math.min(100,value)}%`}}/></i></div>)}</div><div className="regional-detail-alert"><AlertTriangle size={16}/><span><b>{current.alerts} alert aktif</b><small>{current.alerts>5?"Memerlukan eskalasi nasional":"Dalam penanganan Kanwil"}</small></span></div><button type="button" onClick={()=>onNotify(`Recovery plan ${current.name} dibuka`)}>Buka Recovery Plan <ArrowRight size={14}/></button></aside></div>
    <section className="performance-card regional-ranking"><header><div><span>RANKING KANWIL</span><h2>Perbandingan Kinerja Terintegrasi</h2></div><span>{filtered.length} Kanwil ditampilkan</span></header><div className="regional-ranking-head"><span>Rank / Kanwil</span><span>Composite</span><span>Persediaan</span><span>Pengadaan</span><span>Penjualan</span><span>OTIF</span><span>Keuangan</span><span>Alert</span><span>Trend</span></div>{filtered.map((item)=><button type="button" key={item.name} className={selected===item.name?"selected":""} onClick={()=>setSelected(item.name)}><span><b>{item.rank}</b><span><strong>{item.name}</strong><small>{item.region}</small></span></span><span><strong>{item.score}</strong><em className={item.status.toLowerCase().replace(" ","-")}>{item.status}</em></span>{[item.stock,item.procurement,item.sales,item.otif,item.finance].map((value,index)=><span key={index} className={value<76?"critical":value<88?"watch":"good"}>{value}%</span>)}<span>{item.alerts}</span><span className={item.trend.startsWith("+")?"up":"down"}>{item.trend}</span></button>)}</section>
    <section className="regional-actions"><header><div><span>PRIORITAS INTERVENSI</span><h2>Tindakan Lintas Fungsi</h2></div><button type="button" onClick={()=>onNotify("Semua rencana aksi dibuka")}>Lihat semua <ArrowRight size={14}/></button></header>{[["Papua","Pulihkan days of stock minimum 14 hari","Redistribusi 8.500 ton dari Jawa Timur","Hari ini","Critical"],["Maluku","Normalisasi OTIF koridor laut","Kunci slot kapal dan buffer lead time","2×24 jam","High"],["Jawa Barat","Pulihkan trajectory pengadaan","Tambah serapan 4.800 ton/hari","7 hari","High"]].map(([name,issue,action,due,severity])=><article key={name}><em className={severity.toLowerCase()}>{severity}</em><div><strong>{name} · {issue}</strong><small>{action}</small></div><span><Clock3 size={13}/>{due}</span><button type="button" onClick={()=>onNotify(`Tindakan ${name} ditugaskan`)}>Tugaskan</button></article>)}</section>
    <footer className="performance-disclaimer"><Database size={15}/><span><b>Data demonstrasi.</b> Composite Score memakai bobot KPI lintas domain; bobot, threshold, dan sumber data perlu disahkan melalui governance KPI BULOG.</span></footer>
  </section>;
}

function SupplyDomainSummaryPage({ kind, onNotify }: { kind: DomainSummaryKind; onNotify: (message: string) => void }) {
  const [period, setPeriod] = useState("Year to Date 2026");
  const [commodity, setCommodity] = useState(kind === "finance" ? "Semua Unit Bisnis" : "Semua Komoditas");
  const [region, setRegion] = useState("Nasional");
  const [channel, setChannel] = useState(kind === "procurement" ? "Semua Sumber" : kind === "finance" ? "Semua Cost Center" : "Semua Program");
  const [updated, setUpdated] = useState("12 Agustus 2026 · 08:30 WIB");
  const [refreshing, setRefreshing] = useState(false);

  const configs = {
    inventory: {
      eyebrow: "SUPPLY CHAIN MONITORING / PERSEDIAAN",
      title: "Ringkasan Persediaan",
      subtitle: "Kendali stok CBP, kapasitas gudang, aging, dan risiko ketersediaan nasional dalam satu tampilan operasional.",
      accent: "#245e99",
      unit: "ton",
      filters: ["Periode", "Komoditas", "Wilayah"],
      narrative: "Stok nasional berada di atas kebutuhan pengaman, namun utilisasi gudang dan konsentrasi stok berumur di atas empat bulan memerlukan redistribusi terarah.",
      action: "Prioritaskan pelepasan stok aging dari Jawa, Bali–Nusra, dan Sulawesi tanpa menurunkan days of stock wilayah penerima.",
      kpis: [
        ["Total stok", "5.252.664,64", "Ton", "+9,5% vs target", "good"],
        ["Kapasitas gudang", "5.695.125", "Ton", "92,23% terpakai", "watch"],
        ["Stok > 4 bulan", "2.418.665,9", "Ton", "46,05% dari stok", "risk"],
        ["Safety stock", "375.003", "Ton", "1.400,7% coverage", "good"],
      ],
      mapTitle: "Kondisi Persediaan per Region",
      regional: [
        ["Sumatera", "606.640", "79%", 72, "Aman"], ["Jawa", "3.088.105", "93%", 93, "Perhatian"], ["Kalimantan", "71.321", "49%", 49, "Aman"], ["Sulawesi", "968.384", "87%", 87, "Perhatian"], ["Bali & Nusra", "322.027", "114%", 100, "Kritis"], ["Maluku & Papua", "36.870", "46%", 46, "Aman"],
      ],
      trendTitle: "Perkembangan Stok Nasional",
      trend: [4.48, 4.62, 4.71, 4.83, 4.96, 5.08, 5.25],
      trendLabels: ["Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu"],
      exceptions: [
        ["Overcapacity gudang", "Bali & Nusa Tenggara", "113,76%", "Critical"], ["Stok aging >4 bulan", "Kanwil Jawa Timur", "824 rb ton", "High"], ["Coverage rendah", "Kanwil Papua", "12 hari", "High"], ["Mutasi belum selesai", "Kancab Makassar", "3.480 ton", "Medium"],
      ],
    },
    procurement: {
      eyebrow: "SUPPLY CHAIN MONITORING / PENGADAAN",
      title: "Ringkasan Pengadaan",
      subtitle: "Pantau target, realisasi, sumber pasokan, kualitas serapan, dan kinerja wilayah pengadaan BULOG.",
      accent: "#167a66",
      unit: "ton",
      filters: ["Periode", "Komoditas", "Wilayah", "Sumber Pengadaan"],
      narrative: "Realisasi pengadaan berada di bawah trajectory YTD. Sebagian gap terkonsentrasi pada Jawa Barat, Sulawesi Selatan, dan Sumatera Selatan.",
      action: "Percepat kontrak mitra siap serap dan alihkan target mingguan menuju sentra panen dengan kualitas serta kapasitas drying yang tervalidasi.",
      kpis: [
        ["Realisasi pengadaan", "2.850.000", "Ton", "78,5% dari target", "watch"], ["Target YTD", "3.630.000", "Ton", "Gap 780.000 ton", "risk"], ["Mitra aktif", "1.248", "Mitra", "92% tervalidasi", "good"], ["Acceptance mutu", "96,8", "%", "+1,2 pp vs Juli", "good"],
      ],
      mapTitle: "Serapan Pengadaan per Region",
      regional: [
        ["Jawa Timur", "742.000", "96%", 96, "On Track"], ["Jawa Tengah", "618.000", "89%", 89, "Watch"], ["Sulselbar", "394.000", "82%", 82, "Watch"], ["Jawa Barat", "312.000", "72%", 72, "At Risk"], ["Sumsel Babel", "268.000", "78%", 78, "Watch"], ["NTB", "204.000", "91%", 91, "On Track"],
      ],
      trendTitle: "Target vs Realisasi Bulanan",
      trend: [62, 71, 83, 79, 88, 76, 78.5],
      trendLabels: ["Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu"],
      exceptions: [
        ["Realisasi di bawah trajectory", "Kanwil Jawa Barat", "-126 rb ton", "Critical"], ["Kontrak belum aktif", "Kanwil Sulselbar", "17 kontrak", "High"], ["Kadar air di atas batas", "Kancab Indramayu", "6 lot", "High"], ["Antrian bongkar", "Gudang Subang", "18 jam", "Medium"],
      ],
    },
    sales: {
      eyebrow: "SUPPLY CHAIN MONITORING / PENJUALAN & PENYALURAN",
      title: "Ringkasan Penjualan & Penyaluran",
      subtitle: "Kendali realisasi penjualan komersial, penyaluran program, order fulfillment, dan service level wilayah.",
      accent: "#8b5b18",
      unit: "ton",
      filters: ["Periode", "Komoditas", "Wilayah", "Program / Kanal"],
      narrative: "Realisasi gabungan mencapai 88,1% target YTD. Penyaluran program stabil, sedangkan beberapa order komersial tertunda akibat kesiapan stok dan moda.",
      action: "Pulihkan order backlog prioritas, amankan alokasi SPHP pada wilayah bertekanan harga, dan tingkatkan fill rate kanal komersial.",
      kpis: [
        ["Realisasi total", "3.910.000", "Ton", "88,1% dari target", "watch"], ["Penjualan komersial", "1.462.000", "Ton", "+7,8% YoY", "good"], ["Penyaluran program", "2.448.000", "Ton", "93,4% rencana", "good"], ["Order fulfillment", "94,6", "%", "Target ≥ 97%", "watch"],
      ],
      mapTitle: "Realisasi Penjualan & Penyaluran",
      regional: [
        ["Jawa", "1.622.000", "94%", 94, "On Track"], ["Sumatera", "812.000", "89%", 89, "Watch"], ["Sulawesi", "536.000", "86%", 86, "Watch"], ["Kalimantan", "394.000", "91%", 91, "On Track"], ["Bali & Nusra", "318.000", "82%", 82, "At Risk"], ["Maluku & Papua", "228.000", "78%", 78, "At Risk"],
      ],
      trendTitle: "Realisasi terhadap Target",
      trend: [74, 79, 82, 85, 87, 86, 88.1],
      trendLabels: ["Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu"],
      exceptions: [
        ["Order melewati SLA", "Kanwil Papua", "38 order", "Critical"], ["Fill rate rendah", "Bali & Nusa Tenggara", "82%", "High"], ["Realisasi SPHP tertinggal", "Kanwil Maluku", "-14 rb ton", "High"], ["Dokumen BAST tertunda", "Kanwil Sumatera Utara", "27 dokumen", "Medium"],
      ],
    },
    finance: {
      eyebrow: "SUPPLY CHAIN MONITORING / KEUANGAN",
      title: "Ringkasan Keuangan",
      subtitle: "Pantau pendapatan, biaya supply chain, piutang, utilisasi anggaran, dan dampak finansial exception operasional.",
      accent: "#6455a7",
      unit: "Rp",
      filters: ["Periode", "Unit Bisnis", "Wilayah", "Program / Cost Center"],
      narrative: "Pendapatan mencapai 92,4% target YTD. Tekanan utama berasal dari piutang melewati jatuh tempo dan biaya distribusi wilayah timur.",
      action: "Percepat collection akun prioritas, validasi biaya exception, dan lakukan reprioritisasi anggaran transportasi antarpulau.",
      kpis: [
        ["Pendapatan", "31,60", "Triliun", "92,4% dari target", "watch"], ["Biaya supply chain", "2,84", "Triliun", "8,99% dari revenue", "good"], ["Piutang usaha", "1,18", "Triliun", "Rp326 M overdue", "risk"], ["Budget terserap", "87,3", "%", "Sisa Rp1,42 T", "good"],
      ],
      mapTitle: "Kinerja Keuangan per Region",
      regional: [
        ["Jawa", "Rp14,8 T", "97%", 97, "On Track"], ["Sumatera", "Rp6,4 T", "91%", 91, "Watch"], ["Sulawesi", "Rp4,1 T", "89%", 89, "Watch"], ["Kalimantan", "Rp2,9 T", "94%", 94, "On Track"], ["Bali & Nusra", "Rp1,9 T", "84%", 84, "At Risk"], ["Maluku & Papua", "Rp1,5 T", "79%", 79, "At Risk"],
      ],
      trendTitle: "Pendapatan vs Budget YTD",
      trend: [68, 73, 78, 82, 86, 89, 92.4],
      trendLabels: ["Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu"],
      exceptions: [
        ["Piutang melewati jatuh tempo", "Pelanggan pemerintah", "Rp326 M", "Critical"], ["Biaya distribusi di atas budget", "Kanwil Papua", "+18,4%", "High"], ["Revenue recognition tertunda", "Kanwil Jawa Barat", "Rp84 M", "High"], ["Dokumen settlement belum lengkap", "Kanwil Sulselbar", "31 dokumen", "Medium"],
      ],
    },
  } as const;

  const config = configs[kind];
  const maxTrend = Math.max(...config.trend);
  const filterOptions: Record<string, string[]> = {
    Periode: ["Year to Date 2026", "Bulan Berjalan", "Kuartal III 2026", "12 Bulan Terakhir"],
    Komoditas: ["Semua Komoditas", "Beras", "Beras Premium", "Jagung", "Gula", "Minyak Goreng"],
    Wilayah: ["Nasional", "Sumatera", "Jawa", "Kalimantan", "Sulawesi", "Bali & Nusa Tenggara", "Maluku & Papua"],
    "Sumber Pengadaan": ["Semua Sumber", "Dalam Negeri", "Mitra Penggilingan", "Gapoktan", "Importasi"],
    "Program / Kanal": ["Semua Program", "SPHP", "Bantuan Pangan", "Komersial", "Kanal Modern"],
    "Unit Bisnis": ["Semua Unit Bisnis", "PSO", "Komersial", "Logistik"],
    "Program / Cost Center": ["Semua Cost Center", "Pengadaan", "Pergudangan", "Distribusi", "Penyaluran"],
  };

  function valueForFilter(label: string) {
    if (label === "Periode") return period;
    if (label === "Komoditas" || label === "Unit Bisnis") return commodity;
    if (label === "Wilayah") return region;
    return channel;
  }

  function updateFilter(label: string, value: string) {
    if (label === "Periode") setPeriod(value);
    else if (label === "Komoditas" || label === "Unit Bisnis") setCommodity(value);
    else if (label === "Wilayah") setRegion(value);
    else setChannel(value);
  }

  function refreshSummary() {
    setRefreshing(true);
    window.setTimeout(() => {
      setRefreshing(false);
      setUpdated("Baru saja");
      onNotify(`${config.title} berhasil diperbarui`);
    }, 700);
  }

  return (
    <section className="domain-summary-page" style={{ "--domain-accent": config.accent } as CSSProperties} aria-label={config.title}>
      <header className="domain-summary-header"><div><span>{config.eyebrow}</span><h1>{config.title}</h1><p>{config.subtitle}</p></div><div className="domain-update"><i /><span><small>Data terakhir diperbarui</small><strong>{updated}</strong></span><button type="button" onClick={refreshSummary} disabled={refreshing} aria-label="Perbarui data"><RotateCw size={16} className={refreshing ? "spinning" : ""} /></button></div></header>

      <section className="domain-filter-panel" aria-label={`Filter ${config.title}`}>
        {config.filters.map((filterLabel) => <label key={filterLabel}><span>{filterLabel}</span><select value={valueForFilter(filterLabel)} onChange={(event) => updateFilter(filterLabel, event.target.value)}>{filterOptions[filterLabel].map((option) => <option key={option}>{option}</option>)}</select></label>)}
        <button type="button" className="domain-reset" onClick={() => { setPeriod("Year to Date 2026"); setCommodity(kind === "finance" ? "Semua Unit Bisnis" : "Semua Komoditas"); setRegion("Nasional"); setChannel(kind === "procurement" ? "Semua Sumber" : kind === "finance" ? "Semua Cost Center" : "Semua Program"); onNotify("Filter dikembalikan ke kondisi awal"); }}><RotateCw size={15} />Reset</button>
      </section>

      <div className="domain-active-filter"><ListFilter size={15} /><b>Menampilkan</b><span>{period}</span><i />{kind !== "finance" && <><span>{commodity}</span><i /></>}<span>{region}</span>{config.filters.length > 3 && <><i /><span>{channel}</span></>}</div>

      <section className="domain-narrative"><div><span>STATUS HARI INI</span><h2>{config.narrative}</h2><p><Sparkles size={15} /><b>Rekomendasi:</b> {config.action}</p></div><aside><span>Data confidence</span><strong>96,4%</strong><small>8 sumber data tersinkron</small></aside></section>

      <section className="domain-kpis">{config.kpis.map(([label, value, unit, note, status]) => <article key={label} className={status}><header><span>{label}</span><MoreVertical size={15} /></header><strong>{value}</strong><small>{unit}</small><footer><i /><span>{note}</span></footer></article>)}</section>

      <div className="domain-main-grid">
        <section className="domain-card domain-region-card"><header><div><span>PERFORMA WILAYAH</span><h2>{config.mapTitle}</h2></div><button type="button" onClick={() => onNotify("Tampilan wilayah diperbarui")}><MapPinned size={15} />Region</button></header><div className="domain-region-layout"><div className="domain-map"><iframe title={`Peta ${config.title}`} src="https://www.google.com/maps?q=Indonesia&z=4&output=embed&hl=id" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><div className="domain-map-overlay"><span style={{ left: "17%", top: "40%" }}>SUMATERA</span><span style={{ left: "42%", top: "63%" }}>JAWA</span><span style={{ left: "49%", top: "35%" }}>KALIMANTAN</span><span style={{ left: "67%", top: "42%" }}>SULAWESI</span><span style={{ left: "82%", top: "52%" }}>PAPUA</span></div></div><div className="domain-ranking">{config.regional.map(([name, value, progress, score, status], index) => <article key={name}><b>{index + 1}</b><div><span><strong>{name}</strong><em className={status === "At Risk" || status === "Kritis" ? "risk" : status === "Watch" || status === "Perhatian" ? "watch" : "good"}>{status}</em></span><i><b style={{ width: `${score}%` }} /></i><small>{value} {config.unit === "Rp" ? "" : "ton"}</small></div><strong>{progress}</strong></article>)}</div></div></section>

        <section className="domain-card domain-trend-card"><header><div><span>KINERJA YTD</span><h2>{config.trendTitle}</h2></div><span>Feb–Agu 2026</span></header><div className="domain-trend-summary"><div><span>Posisi terakhir</span><strong>{config.trend[config.trend.length - 1]}{kind === "inventory" ? " jt" : "%"}</strong></div><div><span>Perubahan periode</span><strong className="positive">+{Math.round((config.trend[config.trend.length - 1] - config.trend[0]) * 10) / 10}{kind === "inventory" ? " jt" : " pp"}</strong></div></div><div className="domain-bars">{config.trend.map((value, index) => <div key={config.trendLabels[index]}><span><i style={{ height: `${Math.max(16, (value / maxTrend) * 100)}%` }} /></span><small>{config.trendLabels[index]}</small></div>)}</div><footer><span><i />Realisasi</span><span><i />Target trajectory</span></footer></section>
      </div>

      <section className="domain-card domain-exceptions"><header><div><span>EXCEPTION PRIORITAS</span><h2>Tindakan yang Memerlukan Perhatian</h2></div><button type="button" onClick={() => onNotify("Daftar exception lengkap dibuka")}><span>Lihat semua</span><ArrowRight size={14} /></button></header><div>{config.exceptions.map(([issue, location, impact, severity]) => <article key={issue}><em className={severity.toLowerCase()}>{severity}</em><div><strong>{issue}</strong><small>{location}</small></div><span>{impact}</span><button type="button" onClick={() => onNotify(`Exception ${issue} dibuka`)}>Tinjau <ChevronRight size={13} /></button></article>)}</div></section>

      <footer className="domain-disclaimer"><Database size={15} /><span><strong>Dashboard domain terpisah dari National Dashboard.</strong> Angka pada prototipe ini adalah data demonstrasi yang mendekati pola operasional dan harus diganti dengan sumber resmi ERP, WMS, Simotandi, TMS/Simlog, CRM, serta sistem keuangan sebelum keputusan operasional.</span></footer>
    </section>
  );
}

function SPHPPriceImpactSimulatorPage({ onNotify }: { onNotify: (message: string) => void }) {
  const [zone, setZone] = useState<"Zona 1" | "Zona 2" | "Zona 3">("Zona 1");
  const [volume, setVolume] = useState(320);
  const [duration, setDuration] = useState(4);
  const [baselinePrice, setBaselinePrice] = useState(14750);
  const [economicCost, setEconomicCost] = useState(12900);
  const [passThrough, setPassThrough] = useState(82);
  const [allocation, setAllocation] = useState<"price-gap" | "population" | "balanced">("balanced");
  const [running, setRunning] = useState(false);
  const [reportReady, setReportReady] = useState(false);
  const [lastRun, setLastRun] = useState("Belum dijalankan");

  const zoneHET = { "Zona 1": 12500, "Zona 2": 13100, "Zona 3": 13500 } as const;
  const het = zoneHET[zone];
  const monthlyDemand = 2500;
  const monthlyIntervention = volume / duration;
  const marketCoverage = (monthlyIntervention / monthlyDemand) * 100;
  const elasticityFactor = allocation === "price-gap" ? 1.55 : allocation === "balanced" ? 1.38 : 1.18;
  const estimatedReduction = Math.min(
    Math.max(0, baselinePrice - het),
    Math.round(baselinePrice * (marketCoverage / 100) * elasticityFactor * (passThrough / 100)),
  );
  const projectedPrice = Math.max(het, baselinePrice - estimatedReduction);
  const priceGapBefore = Math.max(0, baselinePrice - het);
  const priceGapAfter = Math.max(0, projectedPrice - het);
  const gapClosure = priceGapBefore ? Math.min(100, Math.round((estimatedReduction / priceGapBefore) * 100)) : 100;
  const cpiImpact = Math.round((estimatedReduction / baselinePrice) * 3.1 * 100) / 100;
  const valueGap = Math.max(0, economicCost - 11000) * volume;
  const serviceScore = Math.min(99, Math.round(78 + marketCoverage * 2.4 + passThrough * .08));

  const regionalRows = useMemo(() => {
    const sources = [
      { region: "Jabodetabek", zone: "Zona 1", price: 15100, signal: 92, weight: 22, stock: "Aman" },
      { region: "Jawa Barat", zone: "Zona 1", price: 14650, signal: 84, weight: 18, stock: "Aman" },
      { region: "Sumatera Utara", zone: "Zona 1", price: 14800, signal: 79, weight: 15, stock: "Terbatas" },
      { region: "Kalimantan Selatan", zone: "Zona 2", price: 15350, signal: 76, weight: 13, stock: "Aman" },
      { region: "Maluku", zone: "Zona 3", price: 16550, signal: 88, weight: 14, stock: "Terbatas" },
      { region: "Papua", zone: "Zona 3", price: 17100, signal: 96, weight: 18, stock: "Kritis" },
    ];
    const totalScore = sources.reduce((total, item) => {
      const score = allocation === "price-gap" ? Math.max(1, item.price - zoneHET[item.zone as keyof typeof zoneHET]) : allocation === "population" ? item.weight * 100 : item.signal * item.weight;
      return total + score;
    }, 0);
    return sources.map((item) => {
      const localHet = zoneHET[item.zone as keyof typeof zoneHET];
      const score = allocation === "price-gap" ? Math.max(1, item.price - localHet) : allocation === "population" ? item.weight * 100 : item.signal * item.weight;
      const allocationVolume = Math.round((volume * score) / totalScore);
      const localCoverage = allocationVolume / duration / Math.max(20, item.weight * 3.2);
      const impact = Math.min(item.price - localHet, Math.round(item.price * localCoverage / 100 * elasticityFactor * passThrough / 100));
      return { ...item, het: localHet, allocationVolume, projected: Math.max(localHet, item.price - impact), impact };
    });
  }, [volume, duration, allocation, passThrough, elasticityFactor]);

  const strategies = [
    { id: "price-gap" as const, label: "Tekanan Harga", detail: "Prioritaskan wilayah dengan deviasi harga terbesar", effect: "Dampak harga tertinggi", risk: "Konsentrasi volume" },
    { id: "balanced" as const, label: "Seimbang", detail: "Gabungkan tekanan harga, demand, stok, dan kesiapan kanal", effect: "Stabilitas + pemerataan", risk: "Risiko terkendali" },
    { id: "population" as const, label: "Proporsional Demand", detail: "Alokasi mengikuti bobot kebutuhan konsumen", effect: "Jangkauan luas", risk: "Respons harga lebih lambat" },
  ];

  function runSimulation() {
    setRunning(true);
    setReportReady(false);
    window.setTimeout(() => {
      setRunning(false);
      setLastRun("Baru saja");
      onNotify("Simulasi dampak harga SPHP selesai");
    }, 850);
  }

  function buildReport() {
    setReportReady(true);
    window.setTimeout(() => document.getElementById("sphp-report")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    onNotify("Report rekomendasi SPHP berhasil dibuat");
  }

  return (
    <section className="sphp-page" aria-label="Simulator Dampak Harga SPHP">
      <header className="sphp-header">
        <div><span>DECISION INTELLIGENCE / SIMULASI WHAT-IF</span><h1>Dampak Harga SPHP</h1><p>Uji pengaruh volume, durasi, harga, dan strategi alokasi beras SPHP terhadap harga konsumen, pemerataan wilayah, serta kebutuhan nilai intervensi.</p></div>
        <div className="sphp-header-actions"><span><Clock3 size={15} /> Simulasi terakhir: {lastRun}</span><button type="button" onClick={() => onNotify("Skenario SPHP disimpan sebagai draf")}><Save size={16} />Simpan Draf</button><button type="button" className="primary" onClick={buildReport}><FileText size={16} />Buat Report</button></div>
      </header>

      <div className="sphp-policy-bar"><ShieldCheck size={18} /><div><strong>Acuan kebijakan yang ditanamkan</strong><span>HET SPHP: Zona 1 Rp12.500/kg · Zona 2 Rp13.100/kg · Zona 3 Rp13.500/kg · batas pembelian konsumen 10 kg.</span></div><em>Parameter dapat diperbarui</em></div>

      <section className="sphp-card" id="sphp-builder">
        <header><div><span>LANGKAH 1</span><h2>Bangun Skenario Intervensi</h2><p>Tentukan cakupan, pasokan, dan asumsi transmisi harga. Nilai berikut merupakan input simulasi, bukan data transaksi.</p></div><SlidersHorizontal size={24} /></header>
        <div className="sphp-builder-grid">
          <div className="sphp-form">
            <label><span>Zona HET utama</span><select value={zone} onChange={(event) => setZone(event.target.value as keyof typeof zoneHET)}><option>Zona 1</option><option>Zona 2</option><option>Zona 3</option></select></label>
            <label><span>Harga beras medium baseline</span><div className="sphp-money-input"><b>Rp</b><input type="number" min="10000" max="25000" step="50" value={baselinePrice} onChange={(event) => setBaselinePrice(Number(event.target.value))} /><small>/kg</small></div></label>
            <label><span>Estimasi nilai ekonomi CBP</span><div className="sphp-money-input"><b>Rp</b><input type="number" min="9000" max="20000" step="50" value={economicCost} onChange={(event) => setEconomicCost(Number(event.target.value))} /><small>/kg</small></div></label>
          </div>
          <div className="sphp-sliders">
            <label><span><b>Volume intervensi</b><strong>{volume.toLocaleString("id-ID")} ribu ton</strong></span><input type="range" min="50" max="828" step="10" value={volume} onChange={(event) => setVolume(Number(event.target.value))} /><small>50 ribu ton · target program 2026 sebesar 828 ribu ton</small></label>
            <label><span><b>Durasi penyaluran</b><strong>{duration} bulan</strong></span><input type="range" min="1" max="12" value={duration} onChange={(event) => setDuration(Number(event.target.value))} /><small>Intervensi bulanan: {monthlyIntervention.toFixed(1)} ribu ton</small></label>
            <label><span><b>Efektivitas transmisi ke konsumen</b><strong>{passThrough}%</strong></span><input type="range" min="40" max="100" value={passThrough} onChange={(event) => setPassThrough(Number(event.target.value))} /><small>Memperhitungkan kepatuhan HET, kanal, dan ketersediaan ritel</small></label>
          </div>
          <aside className="sphp-guardrails"><h3>Guardrail Program</h3>{["HET sesuai zonasi", "CBP aman setelah alokasi", "Prioritas zona merah & 3TP", "Kios/pengecer harus terverifikasi", "Batas pembelian 10 kg/konsumen", "Audit volume dan harga aktif"].map((item) => <span key={item}><CheckCircle2 size={15} />{item}</span>)}<div><AlertTriangle size={16} /><p>Model tidak mengubah kebijakan. Eksekusi tetap memerlukan validasi stok, penugasan, anggaran, dan persetujuan berwenang.</p></div></aside>
        </div>
        <button type="button" className="sphp-run" onClick={runSimulation} disabled={running}><Play size={17} />{running ? "Menghitung 34 Kanwil dan kanal penyaluran…" : "Jalankan Simulasi"}</button>
      </section>

      <section className="sphp-card">
        <header><div><span>LANGKAH 2</span><h2>Pilih Strategi Alokasi</h2><p>Bandingkan tujuan stabilisasi harga dan pemerataan layanan.</p></div><Scale size={24} /></header>
        <div className="sphp-strategies">{strategies.map((item) => <button type="button" key={item.id} className={allocation === item.id ? "selected" : ""} onClick={() => setAllocation(item.id)}><span><i>{allocation === item.id && <Check size={13} />}</i><strong>{item.label}</strong>{item.id === "balanced" && <em>Direkomendasikan</em>}</span><p>{item.detail}</p><div><small>Output</small><b>{item.effect}</b></div><div><small>Trade-off</small><b>{item.risk}</b></div></button>)}</div>
      </section>

      <section className="sphp-card" id="sphp-results">
        <header><div><span>LANGKAH 3</span><h2>Proyeksi Dampak Nasional</h2><p>Estimasi respons harga berdasarkan coverage pasar, strategi alokasi, dan efektivitas penyaluran.</p></div><span className="sphp-model-badge">Model elastisitas skenario v1.0</span></header>
        <div className="sphp-kpis"><article><span>Harga baseline</span><strong>Rp{baselinePrice.toLocaleString("id-ID")}</strong><small>per kg</small></article><article className="good"><span>Harga setelah intervensi</span><strong>Rp{projectedPrice.toLocaleString("id-ID")}</strong><small>turun Rp{estimatedReduction.toLocaleString("id-ID")}/kg</small></article><article><span>Gap menuju HET</span><strong>Rp{priceGapAfter.toLocaleString("id-ID")}</strong><small>{gapClosure}% gap tertutup</small></article><article><span>Estimasi dampak inflasi</span><strong>-{cpiImpact.toFixed(2)} pp</strong><small>indikatif, bobot beras 3,1%</small></article><article className="warning"><span>Gap nilai ekonomi</span><strong>Rp{valueGap.toLocaleString("id-ID")} M</strong><small>bukan estimasi tagihan fiskal</small></article></div>
        <div className="sphp-impact-grid">
          <section className="sphp-price-bridge"><h3>Jembatan Dampak Harga</h3><div className="sphp-price-scale"><span style={{ left: "0%" }}><b>Rp{het.toLocaleString("id-ID")}</b><small>HET {zone}</small></span><span className="projected" style={{ left: `${Math.min(88, Math.max(12, ((projectedPrice - het) / Math.max(1, baselinePrice - het)) * 82 + 8))}%` }}><b>Rp{projectedPrice.toLocaleString("id-ID")}</b><small>Proyeksi</small></span><span style={{ left: "100%" }}><b>Rp{baselinePrice.toLocaleString("id-ID")}</b><small>Baseline</small></span><i><b style={{ width: `${gapClosure}%` }} /></i></div><div className="sphp-impact-factors"><span><b>{marketCoverage.toFixed(1)}%</b><small>coverage pasar/bulan</small></span><span><b>{passThrough}%</b><small>pass-through</small></span><span><b>{serviceScore}%</b><small>service confidence</small></span></div></section>
          <aside className="sphp-decision"><span>CONTROL TOWER SIGNAL</span><h3>{gapClosure >= 70 ? "Intervensi berpotensi efektif" : gapClosure >= 40 ? "Perlu penguatan alokasi" : "Volume belum memadai"}</h3><p>{gapClosure >= 70 ? "Skenario mendekatkan harga ke HET. Jaga ketepatan outlet dan replenishment agar dampak bertahan." : "Fokuskan volume pada wilayah dengan deviasi harga dan risiko pasokan tertinggi sebelum memperluas cakupan."}</p><div><CircleDollarSign size={17} /><span><b>Rp{(volume * 11000).toLocaleString("id-ID")} M</b><small>nilai penyaluran indikatif pada Rp11.000/kg</small></span></div><button type="button" onClick={() => onNotify("Skenario dikirim ke Approval Center")}><Send size={15} />Ajukan untuk Review</button></aside>
        </div>
      </section>

      <section className="sphp-card sphp-regional">
        <header><div><span>LANGKAH 4</span><h2>Prioritas Wilayah &amp; Rekomendasi Volume</h2><p>Contoh alokasi berbasis sinyal harga, kebutuhan, stok, dan kesiapan kanal.</p></div><MapPinned size={24} /></header>
        <div className="sphp-table-head"><span>Wilayah</span><span>Zona / HET</span><span>Harga baseline</span><span>Volume</span><span>Harga proyeksi</span><span>Dampak</span><span>Status stok</span></div>
        <div className="sphp-table-body">{regionalRows.map((item) => <article key={item.region}><span><strong>{item.region}</strong><small>Sinyal prioritas {item.signal}/100</small></span><span>{item.zone}<small>Rp{item.het.toLocaleString("id-ID")}/kg</small></span><span>Rp{item.price.toLocaleString("id-ID")}</span><span><b>{item.allocationVolume} rb ton</b></span><span>Rp{item.projected.toLocaleString("id-ID")}</span><span className="positive">-Rp{item.impact.toLocaleString("id-ID")}</span><span className={item.stock === "Kritis" ? "critical" : item.stock === "Terbatas" ? "limited" : "safe"}>{item.stock}</span></article>)}</div>
      </section>

      <section className={`sphp-report${reportReady ? " ready" : ""}`} id="sphp-report">
        <header><div><span>LANGKAH 5</span><h2>Report Rekomendasi SPHP</h2><p>Ringkasan keputusan yang dapat ditelusuri dan diajukan untuk persetujuan.</p></div><em>{reportReady ? "Report siap" : "Pratinjau dinamis"}</em></header>
        <div className="sphp-report-grid"><section><span>EXECUTIVE SUMMARY</span><h3>Skenario {volume.toLocaleString("id-ID")} ribu ton selama {duration} bulan</h3><p>Dengan strategi <b>{strategies.find((item) => item.id === allocation)?.label}</b> dan efektivitas {passThrough}%, model mengestimasi penurunan harga rata-rata sebesar <b>Rp{estimatedReduction.toLocaleString("id-ID")}/kg</b>, menutup <b>{gapClosure}%</b> gap menuju HET {zone}, serta menghasilkan dampak inflasi indikatif <b>-{cpiImpact.toFixed(2)} poin persentase</b>.</p><h4>Rekomendasi tindakan</h4><ol><li>Validasi stok CBP siap salur dan batas minimum stok nasional sebelum komitmen volume.</li><li>Prioritaskan Papua, Maluku, dan wilayah dengan deviasi harga terbesar serta akses logistik terbatas.</li><li>Kunci outlet terverifikasi, harga tebus, kapasitas angkut, dan jadwal replenishment mingguan.</li><li>Monitor harga konsumen, sell-out, kepatuhan HET, dan kebocoran kanal setiap hari.</li><li>Evaluasi ulang alokasi bila dampak harga aktual berbeda lebih dari 15% dari proyeksi.</li></ol></section><aside><span>PAKET REPORT</span><h3>Siap untuk governance</h3>{["Asumsi & versi model", "Acuan HET per zona", "Alokasi Kanwil dan kanal", "Proyeksi harga & inflasi", "Nilai ekonomi dan sensitivitas", "Risiko, approval, dan audit trail"].map((item) => <p key={item}><CheckCircle2 size={15} />{item}</p>)}<button type="button" onClick={() => onNotify("Report SPHP siap diunduh")}><Download size={16} />Unduh Report PDF</button><button type="button" className="primary" onClick={() => onNotify("Report SPHP dikirim ke Approval Center")}><Send size={16} />Kirim untuk Persetujuan</button></aside></div>
      </section>

      <footer className="sphp-disclaimer"><AlertTriangle size={16} /><span><strong>Mode simulasi—bukan instruksi operasional.</strong> HET zonasi dan batas pembelian mengikuti publikasi Bapanas/BULOG; target 828 ribu ton adalah acuan program 2026. Harga baseline, biaya ekonomi, elastisitas, bobot inflasi, stok, dan alokasi wilayah pada layar ini adalah parameter demo yang wajib diganti dengan data resmi SCCT sebelum keputusan.</span></footer>
    </section>
  );
}

function AgingDisposalRiskPage({ onNotify }: { onNotify: (message: string) => void }) {
  const [horizon, setHorizon] = useState(90);
  const [qualityStress, setQualityStress] = useState(15);
  const [minQuality, setMinQuality] = useState(78);
  const [selectedLot, setSelectedLot] = useState("LOT-JTM-2401");
  const [strategy, setStrategy] = useState<"preventive" | "balanced" | "cost">("preventive");
  const [running, setRunning] = useState(false);
  const [reportReady, setReportReady] = useState(false);
  const [lastRun, setLastRun] = useState("Belum dijalankan");

  const lots = useMemo(() => {
    const source = [
      { id: "LOT-JTM-2401", warehouse: "Gudang GBB Surabaya", kanwil: "Jawa Timur", age: 14.2, volume: 128400, quality: 82, temp: 29.1, humidity: 72, value: 1412 },
      { id: "LOT-SLB-2312", warehouse: "Gudang Panaikang", kanwil: "Sulselbar", age: 16.8, volume: 96400, quality: 76, temp: 30.3, humidity: 78, value: 1060 },
      { id: "LOT-SUM-2402", warehouse: "Gudang Medan II", kanwil: "Sumatera Utara", age: 12.5, volume: 87300, quality: 85, temp: 28.7, humidity: 69, value: 960 },
      { id: "LOT-NTB-2311", warehouse: "Gudang Dasan Cermen", kanwil: "NTB", age: 18.1, volume: 45200, quality: 71, temp: 30.8, humidity: 81, value: 497 },
      { id: "LOT-JTG-2403", warehouse: "Gudang Randugarut", kanwil: "Jawa Tengah", age: 10.7, volume: 112600, quality: 88, temp: 28.4, humidity: 67, value: 1239 },
      { id: "LOT-PAP-2401", warehouse: "Gudang Jayapura", kanwil: "Papua", age: 15.4, volume: 38400, quality: 74, temp: 31.0, humidity: 80, value: 422 },
    ];
    return source.map((lot) => {
      const degradation = horizon / 30 * (qualityStress / 12) + Math.max(0, lot.humidity - 70) * .28 + Math.max(0, lot.temp - 29) * .6;
      const projectedQuality = Math.max(35, Math.round((lot.quality - degradation) * 10) / 10);
      const risk = Math.min(99, Math.round((lot.age / 18) * 42 + (100 - projectedQuality) * 1.55 + Math.max(0, lot.humidity - 70) * 1.1));
      const loss = Math.round(lot.value * Math.max(0, (minQuality - projectedQuality) / 100) * 1.8);
      const action = risk >= 85 ? "Tindakan ≤ 7 hari" : risk >= 70 ? "Tindakan ≤ 30 hari" : risk >= 55 ? "Monitor mingguan" : "Normal";
      return { ...lot, projectedQuality, risk, loss, action };
    });
  }, [horizon, qualityStress, minQuality]);

  const selected = lots.find((lot) => lot.id === selectedLot) ?? lots[0];
  const critical = lots.filter((lot) => lot.risk >= 70);
  const exposedVolume = critical.reduce((total, lot) => total + lot.volume, 0);
  const exposedLoss = critical.reduce((total, lot) => total + lot.loss, 0);
  const strategies = {
    preventive: { label: "Cegah Turun Mutu", saved: 82, cost: 126, disposal: 12, service: 96.8, copy: "Prioritaskan FEFO, percepatan penyaluran, dan redistribusi sebelum mutu menurun." },
    balanced: { label: "Mitigasi Seimbang", saved: 71, cost: 98, disposal: 21, service: 95.1, copy: "Seimbangkan percepatan keluar, reproses, perawatan, dan biaya operasional." },
    cost: { label: "Biaya Minimum", saved: 58, cost: 72, disposal: 34, service: 92.7, copy: "Kurangi biaya jangka pendek dengan tindakan selektif pada lot paling kritis." },
  };
  const activeStrategy = strategies[strategy];
  const actions = [
    { action: "Percepat penyaluran FEFO", volume: 168400, lots: 2, deadline: "≤ 7 hari", effect: "Rp186 M", owner: "Divisi Penyaluran", status: "Prioritas 1" },
    { action: "Redistribusi ke wilayah defisit", volume: 112600, lots: 1, deadline: "≤ 14 hari", effect: "Rp121 M", owner: "Divisi Supply Chain", status: "Prioritas 2" },
    { action: "Reproses / perbaikan mutu", volume: 96400, lots: 1, deadline: "≤ 10 hari", effect: "Rp78 M", owner: "Divisi Operasional", status: "Perlu uji mutu" },
    { action: "Perawatan intensif & monitoring", volume: 87300, lots: 1, deadline: "Mulai hari ini", effect: "Rp42 M", owner: "Kanwil", status: "Siap eksekusi" },
    { action: "Kajian pelepasan stok turun mutu", volume: 38400, lots: 1, deadline: "Review komite", effect: "Rp36 M", owner: "Komite berwenang", status: "Approval wajib" },
  ];

  function runSimulation() {
    setRunning(true); setReportReady(false);
    window.setTimeout(() => { setRunning(false); setLastRun("Baru saja"); onNotify("Simulasi Aging & Risiko Disposal selesai"); }, 900);
  }

  return (
    <section className="aging-page" aria-label="Aging and Disposal Risk Simulator">
      <header className="aging-header"><div><span>DECISION INTELLIGENCE / SIMULASI WHAT-IF</span><h1>Aging &amp; Risiko Disposal</h1><p>Prediksi penurunan mutu per lot dan uji tindakan mitigasi untuk meminimalkan kerugian serta pelepasan stok turun mutu.</p></div><div className="aging-header-actions"><span><i /><Clock3 size={15} /> Simulasi terakhir: {lastRun}</span><button type="button" onClick={() => onNotify("Skenario aging disimpan")}><Save size={16} />Simpan Draf</button><button type="button" className="primary" onClick={() => { setReportReady(true); onNotify("Report risiko disposal berhasil dibuat"); }}><FileText size={16} />Buat Report</button></div></header>
      <div className="aging-scope"><span><i />Mode simulasi</span><b>Model ADR v2.2</b><i /><b>Beras CBP</b><i /><b>Lot-level FEFO</b><i /><b>Horizon {horizon} hari</b></div>
      <nav className="aging-tabs"><button type="button" onClick={() => document.getElementById("aging-builder")?.scrollIntoView({ behavior: "smooth" })}>Skenario</button><button type="button" onClick={() => document.getElementById("aging-risk")?.scrollIntoView({ behavior: "smooth" })}>Risk Monitor</button><button type="button" onClick={() => document.getElementById("aging-actions")?.scrollIntoView({ behavior: "smooth" })}>Mitigasi</button><button type="button" onClick={() => document.getElementById("aging-report")?.scrollIntoView({ behavior: "smooth" })}>Report &amp; Approval</button></nav>

      <section className="aging-hero"><span><AlertTriangle size={23} /></span><div><strong>{critical.length} lot memerlukan keputusan</strong><p><b>{exposedVolume.toLocaleString("id-ID")} ton</b> terekspos risiko turun mutu dalam {horizon} hari dengan estimasi kerugian <b>Rp{exposedLoss} miliar</b> apabila tidak dimitigasi.</p></div><div><strong>{Math.round(exposedVolume / 1000)} rb ton</strong><span>volume berisiko</span></div><div><strong>Rp{exposedLoss} M</strong><span>potential loss</span></div></section>

      <section className="aging-card" id="aging-builder"><header><div><span>LANGKAH 1</span><h2>Bangun Skenario Penurunan Mutu</h2><p>Uji pengaruh waktu simpan, kondisi gudang, dan ambang mutu.</p></div><FlaskConical size={24} /></header><div className="aging-builder-grid"><div><label><span>Horizon simulasi</span><select value={horizon} onChange={(event) => setHorizon(Number(event.target.value))}><option value="30">30 hari</option><option value="60">60 hari</option><option value="90">90 hari</option><option value="180">180 hari</option></select></label><label><span>Cakupan</span><select defaultValue="Nasional"><option>Nasional</option><option>Kanwil Prioritas</option><option>Gudang Terpilih</option></select></label><label><span>Komoditas</span><select defaultValue="Beras CBP"><option>Beras CBP</option><option>Beras Komersial</option><option>Gabah</option></select></label></div><div className="aging-sliders"><label><span><b>Stress kondisi gudang</b><strong>+{qualityStress}%</strong></span><input type="range" min="0" max="40" value={qualityStress} onChange={(event) => setQualityStress(Number(event.target.value))} /><small>Normal · Suhu/kelembapan ekstrem</small></label><label><span><b>Ambang mutu internal</b><strong>{minQuality}/100</strong></span><input type="range" min="60" max="90" value={minQuality} onChange={(event) => setMinQuality(Number(event.target.value))} /><small>Monitoring · Tindakan segera</small></label></div><div className="aging-guardrails"><h3>Guardrail Tata Kelola</h3>{["Verifikasi mutu dan sampling lot", "FEFO sebagai prioritas pertama", "Reproses wajib hasil uji & tim pemeriksa", "Pelepasan/disposal memerlukan approval", "Jejak audit dan dokumen lengkap"].map((item) => <label key={item}><input type="checkbox" defaultChecked /><span>{item}</span></label>)}<p><ShieldCheck size={15} />Tidak ada rekomendasi pelepasan otomatis.</p></div></div><button type="button" className="aging-run" onClick={runSimulation} disabled={running}><Play size={17} />{running ? "Menghitung kurva degradasi lot…" : "Jalankan Simulasi"}</button></section>

      <section className="aging-card" id="aging-risk"><header><div><span>LANGKAH 2</span><h2>Risk Monitor per Lot</h2><p>Urutan tindakan berdasarkan aging, mutu, kondisi gudang, dan nilai eksposur.</p></div><span className="aging-confidence">Confidence 88%</span></header><div className="aging-kpis"><article><span>Stok &gt; 12 bulan</span><strong>395.700 ton</strong><small>6 lot dalam sampel</small></article><article className="risk"><span>Lot risiko tinggi</span><strong>{critical.length} lot</strong><small>risk score ≥ 70</small></article><article><span>Potensi reproses</span><strong>96.400 ton</strong><small>menunggu hasil uji mutu</small></article><article className="good"><span>Loss avoided</span><strong>Rp{Math.round(exposedLoss * activeStrategy.saved / 100)} M</strong><small>strategi {activeStrategy.label}</small></article></div><div className="aging-lot-layout"><section className="aging-lot-table"><div className="aging-lot-head"><span>Lot &amp; Gudang</span><span>Umur</span><span>Mutu kini</span><span>Proyeksi</span><span>Risk</span><span>Potential loss</span><span>Deadline</span></div>{lots.sort((a,b) => b.risk-a.risk).map((lot) => <button type="button" key={lot.id} className={selectedLot === lot.id ? "selected" : ""} onClick={() => setSelectedLot(lot.id)}><span><strong>{lot.id}</strong><small>{lot.warehouse} • {lot.kanwil}</small></span><span>{lot.age} bln</span><span>{lot.quality}/100</span><span className={lot.projectedQuality < minQuality ? "negative" : "positive"}>{lot.projectedQuality}/100</span><span><b className={lot.risk >= 85 ? "critical" : lot.risk >= 70 ? "high" : "normal"}>{lot.risk}</b></span><span>Rp{lot.loss} M</span><span>{lot.action}</span></button>)}</section><aside className="aging-lot-detail"><span>LOT TERPILIH</span><h3>{selected.id}</h3><em className={selected.risk >= 85 ? "critical" : "high"}>Risk {selected.risk}/100</em><div><span>Volume</span><strong>{selected.volume.toLocaleString("id-ID")} ton</strong></div><div><span>Suhu / RH</span><strong>{selected.temp}°C / {selected.humidity}%</strong></div><div><span>Mutu proyeksi</span><strong>{selected.projectedQuality}/100</strong></div><div><span>Potential loss</span><strong>Rp{selected.loss} M</strong></div><p>Validasi sampling laboratorium dan kondisi fisik wajib sebelum keputusan mitigasi atau pelepasan.</p></aside></div></section>

      <section className="aging-card" id="aging-actions"><header><div><span>LANGKAH 3</span><h2>Bandingkan Strategi Mitigasi</h2><p>Prioritaskan pencegahan turun mutu sebelum opsi pelepasan.</p></div><Sparkles size={24} /></header><div className="aging-strategies">{(Object.keys(strategies) as Array<keyof typeof strategies>).map((key) => { const item = strategies[key]; return <button type="button" key={key} className={strategy === key ? "selected" : ""} onClick={() => setStrategy(key)}><span>{item.label}{strategy === key && <b>Direkomendasikan</b>}</span><p>{item.copy}</p><div><span><small>Loss avoided</small><strong>{item.saved}%</strong></span><span><small>Biaya tindakan</small><strong>Rp{item.cost} M</strong></span><span><small>Risiko disposal</small><strong>{item.disposal}%</strong></span><span><small>Service level</small><strong>{item.service}%</strong></span></div></button>; })}</div><div className="aging-action-head"><span>Tindakan</span><span>Volume</span><span>Lot</span><span>Deadline</span><span>Loss avoided</span><span>PIC</span><span>Status</span></div><div className="aging-actions-list">{actions.map((item,index) => <article key={item.action}><span><b>{index+1}</b><strong>{item.action}</strong></span><span>{item.volume.toLocaleString("id-ID")} ton</span><span>{item.lots}</span><span>{item.deadline}</span><span>{item.effect}</span><span>{item.owner}</span><button type="button" onClick={() => onNotify(`${item.action} dibuka`)}>{item.status}<ChevronRight size={14} /></button></article>)}</div><div className="aging-policy-note"><ShieldCheck size={18} /><div><strong>Decision gate wajib</strong><p>Reproses, pelepasan, atau disposal hanya dapat dilanjutkan setelah hasil uji mutu, berita acara tim, analisis nilai, kewenangan approval, dan dokumen audit lengkap.</p></div><button type="button" onClick={() => onNotify("Paket mitigasi dikirim ke Approval Center")}><Send size={15} />Ajukan Paket</button></div></section>

      <section className={`aging-report ${reportReady ? "ready" : ""}`} id="aging-report"><header><div><span>LANGKAH 4</span><h2>Report Risiko Aging &amp; Disposal</h2><p>Executive brief untuk keputusan mitigasi dan governance.</p></div><span>{reportReady ? "Report siap" : "Pratinjau dinamis"}</span></header><div className="aging-report-grid"><section><div><span>EXECUTIVE SUMMARY</span><strong>Skenario Aging Nasional • {horizon} Hari</strong><small>Stress gudang +{qualityStress}% • ambang mutu {minQuality}/100</small></div><p>Model mengidentifikasi <b>{critical.length} lot risiko tinggi</b> dengan volume {exposedVolume.toLocaleString("id-ID")} ton dan eksposur Rp{exposedLoss} miliar. Strategi <b>{activeStrategy.label}</b> diproyeksikan menghindari {activeStrategy.saved}% potensi kerugian melalui FEFO, redistribusi, reproses tervalidasi, dan perawatan intensif.</p><h3>Rekomendasi keputusan</h3><ol><li>Eksekusi penyaluran FEFO untuk lot kritis maksimal tujuh hari.</li><li>Lakukan sampling ulang dan review mutu oleh tim yang berwenang.</li><li>Aktifkan redistribusi ke wilayah defisit tanpa melanggar safety stock.</li><li>Gunakan kajian pelepasan stok turun mutu hanya bila mitigasi tidak layak.</li></ol></section><aside><span>PAKET REPORT</span><h3>Siap untuk review</h3><ul>{["Daftar lot & risk score", "Kurva proyeksi mutu", "Bukti kondisi gudang", "Opsi mitigasi & biaya", "Kajian nilai eksposur", "Approval & audit checklist"].map((item) => <li key={item}><CheckCircle2 size={15} />{item}</li>)}</ul><button type="button" className="download" onClick={() => onNotify("Report aging siap diunduh")}><Download size={16} />Unduh Report PDF</button><button type="button" onClick={() => onNotify("Report dikirim ke komite berwenang")}><Send size={16} />Kirim untuk Review</button></aside></div></section>
      <footer className="aging-disclaimer"><AlertTriangle size={16} /><span><strong>Mode simulasi—bukan keputusan disposal.</strong> Data contoh harus diganti dengan WMS, hasil uji mutu, kondisi IoT gudang, nilai persediaan, rencana penyaluran, serta kewenangan dan ketentuan resmi BULOG yang berlaku.</span></footer>
    </section>
  );
}

function RouteModeSimulatorPage({ onNotify }: { onNotify: (message: string) => void }) {
  const [volume, setVolume] = useState(12000);
  const [fuelShock, setFuelShock] = useState(8);
  const [seaDelay, setSeaDelay] = useState(2);
  const [capacityLoss, setCapacityLoss] = useState(10);
  const [objective, setObjective] = useState<"balanced" | "speed" | "cost">("balanced");
  const [selectedRoute, setSelectedRoute] = useState("multimoda");
  const [running, setRunning] = useState(false);
  const [reportReady, setReportReady] = useState(false);
  const [lastRun, setLastRun] = useState("Belum dijalankan");

  const routes = useMemo(() => {
    const profiles = [
      { id: "multimoda", name: "Laut + Truk", path: "Tanjung Perak → Makassar → Panaikang", icon: Ship, baseCost: 15.8, days: 5.2, otif: 96.8, emission: 18, capacity: 14800, risk: 24 },
      { id: "direct", name: "Kapal Langsung", path: "Tanjung Perak → Soekarno-Hatta Makassar", icon: Ship, baseCost: 13.6, days: 7.1, otif: 91.4, emission: 14, capacity: 22000, risk: 38 },
      { id: "road", name: "Truk + Ferry", path: "Surabaya → Ketapang → Lembar → Makassar", icon: Truck, baseCost: 22.4, days: 4.6, otif: 94.2, emission: 34, capacity: 10800, risk: 31 },
    ];
    return profiles.map((route) => {
      const cost = route.baseCost * (1 + fuelShock / 100) * (volume / 12000);
      const lead = route.days + (route.id === "road" ? seaDelay * .25 : seaDelay * .75);
      const availableCapacity = Math.round(route.capacity * (1 - capacityLoss / 100));
      const capacityPenalty = volume > availableCapacity ? 15 : 0;
      const otif = Math.max(65, route.otif - seaDelay * (route.id === "road" ? .7 : 1.8) - capacityPenalty);
      const weights = objective === "speed" ? [35, 40, 10, 15] : objective === "cost" ? [45, 15, 20, 20] : [30, 30, 20, 20];
      const score = Math.round((100 - cost * 2) * weights[0] / 100 + (100 - lead * 7) * weights[1] / 100 + otif * weights[2] / 100 + (100 - route.risk) * weights[3] / 100);
      return { ...route, cost, lead, availableCapacity, otif, score };
    }).sort((a, b) => b.score - a.score);
  }, [volume, fuelShock, seaDelay, capacityLoss, objective]);
  const selected = routes.find((route) => route.id === selectedRoute) ?? routes[0];
  const recommended = routes[0];
  const milestones = [
    ["Release order & alokasi lot FEFO", "13 Agu · 09:00", "Divisi Supply Chain"],
    ["Pickup Gudang Surabaya", "13 Agu · 18:00", "Kanwil Jatim / Transporter"],
    ["Gate-in & muat Tanjung Perak", "14 Agu · 10:00", "Operator Pelabuhan"],
    ["Berangkat menuju Makassar", "14 Agu · 20:00", "Operator Kapal"],
    ["Bongkar & keluar pelabuhan", "18 Agu · 08:00", "Kanwil Sulselbar"],
    ["Put-away Gudang Panaikang", "18 Agu · 16:00", "Kepala Gudang"],
  ];

  function runSimulation() {
    setRunning(true); setReportReady(false);
    window.setTimeout(() => { setRunning(false); setSelectedRoute(routes[0].id); setLastRun("Baru saja"); onNotify("Simulasi Route & Mode selesai"); }, 850);
  }

  return (
    <section className="route-mode-page" aria-label="Route and Mode Simulator">
      <header className="route-mode-header"><div><span>DECISION INTELLIGENCE / SIMULASI WHAT-IF</span><h1>Route &amp; Mode Simulator</h1><p>Bandingkan koridor, moda, jadwal, kapasitas, dan biaya untuk memilih rencana distribusi pangan yang paling layak.</p></div><div className="route-mode-header-actions"><span><i /><Clock3 size={15} /> Simulasi terakhir: {lastRun}</span><button type="button" onClick={() => onNotify("Skenario Route & Mode disimpan")}><Save size={16} />Simpan Draf</button><button type="button" className="primary" onClick={() => { setReportReady(true); onNotify("Report Route & Mode berhasil dibuat"); }}><FileText size={16} />Buat Report</button></div></header>
      <div className="route-mode-scope"><span><i />Mode simulasi</span><b>Model RMO v2.1</b><i /><b>Beras CBP</b><i /><b>Jatim → Sulselbar</b><i /><b>{volume.toLocaleString("id-ID")} ton</b></div>
      <nav className="route-mode-tabs"><button type="button" onClick={() => document.getElementById("route-builder")?.scrollIntoView({ behavior: "smooth" })}>Skenario</button><button type="button" onClick={() => document.getElementById("route-options")?.scrollIntoView({ behavior: "smooth" })}>Alternatif Rute</button><button type="button" onClick={() => document.getElementById("route-plan")?.scrollIntoView({ behavior: "smooth" })}>Rencana Eksekusi</button><button type="button" onClick={() => document.getElementById("route-report")?.scrollIntoView({ behavior: "smooth" })}>Report &amp; Approval</button></nav>

      <section className="route-mode-hero"><span><Route size={24} /></span><div><strong>Pilih rute yang menjaga layanan tanpa membebani biaya</strong><p>Simulasi mempertimbangkan slot kapal, armada, kapasitas pelabuhan dan gudang, <b>port/cargo stay</b>, safety stock, OTIF, risiko gangguan, serta biaya end-to-end.</p></div><div><strong>{recommended.otif.toFixed(1)}%</strong><span>OTIF rekomendasi</span></div><div><strong>Rp{recommended.cost.toFixed(1)} M</strong><span>estimasi biaya</span></div></section>

      <section className="route-mode-card" id="route-builder"><header><div><span>LANGKAH 1</span><h2>Bangun Skenario Pergerakan</h2><p>Tetapkan kebutuhan distribusi, shock operasional, dan prioritas keputusan.</p></div><FlaskConical size={24} /></header><div className="route-mode-builder"><div className="route-mode-fields"><label><span>Asal</span><select defaultValue="Jawa Timur — GBB Surabaya"><option>Jawa Timur — GBB Surabaya</option><option>Jawa Tengah — Randugarut</option><option>DKI Banten — Sunter Timur</option></select></label><label><span>Tujuan</span><select defaultValue="Sulselbar — Panaikang"><option>Sulselbar — Panaikang</option><option>NTB — Dasan Cermen</option><option>Papua — Jayapura</option></select></label><label><span>Volume kirim</span><div className="route-mode-input"><input type="number" min="1000" step="500" value={volume} onChange={(event) => setVolume(Number(event.target.value))} /><b>ton</b></div></label><label><span>Batas tiba</span><input type="date" defaultValue="2026-08-19" /></label></div><div className="route-mode-sliders"><label><span><b>Kenaikan tarif / BBM</b><strong>+{fuelShock}%</strong></span><input type="range" min="0" max="35" value={fuelShock} onChange={(event) => setFuelShock(Number(event.target.value))} /></label><label><span><b>Gangguan pelayaran</b><strong>{seaDelay} hari</strong></span><input type="range" min="0" max="8" value={seaDelay} onChange={(event) => setSeaDelay(Number(event.target.value))} /></label><label><span><b>Penurunan kapasitas moda</b><strong>-{capacityLoss}%</strong></span><input type="range" min="0" max="50" value={capacityLoss} onChange={(event) => setCapacityLoss(Number(event.target.value))} /></label></div><div className="route-mode-objectives"><span>Tujuan optimasi</span>{([{ id: "balanced", label: "Seimbang", copy: "Biaya, waktu & risiko" }, { id: "speed", label: "Paling Cepat", copy: "Prioritaskan service" }, { id: "cost", label: "Biaya Terendah", copy: "Efisiensi anggaran" }] as const).map((item) => <button type="button" key={item.id} className={objective === item.id ? "selected" : ""} onClick={() => setObjective(item.id)}><b>{item.label}</b><small>{item.copy}</small></button>)}</div><div className="route-mode-guardrails"><h3><ShieldCheck size={17} />Guardrail wajib</h3>{["OTIF minimum 95%", "Safety stock tujuan tidak boleh terlanggar", "Kapasitas moda dan slot terverifikasi", "FEFO untuk lot yang dikirim", "Port & cargo stay maksimal 36 jam", "Approval untuk deviasi biaya >10%"].map((item) => <label key={item}><input type="checkbox" defaultChecked /><span>{item}</span></label>)}</div></div><button type="button" className="route-mode-run" onClick={runSimulation} disabled={running}><Play size={17} />{running ? "Menghitung alternatif koridor…" : "Jalankan Simulasi"}</button></section>

      <section className="route-mode-card" id="route-options"><header><div><span>LANGKAH 2</span><h2>Bandingkan Alternatif Rute &amp; Moda</h2><p>Skor dinamis berdasarkan tujuan optimasi dan kondisi skenario.</p></div><span className="route-mode-confidence">Confidence 89%</span></header><div className="route-option-grid">{routes.map((route, index) => { const Icon = route.icon; const feasible = route.availableCapacity >= volume; return <button type="button" key={route.id} className={selectedRoute === route.id ? "selected" : ""} onClick={() => setSelectedRoute(route.id)}><header><span><Icon size={20} /></span><div><small>ALTERNATIF {index + 1}</small><strong>{route.name}</strong></div>{index === 0 && <b>Direkomendasikan</b>}</header><p>{route.path}</p><div className="route-option-score"><strong>{route.score}</strong><span>Decision score</span></div><dl><div><dt>Biaya</dt><dd>Rp{route.cost.toFixed(1)} M</dd></div><div><dt>Lead time</dt><dd>{route.lead.toFixed(1)} hari</dd></div><div><dt>OTIF</dt><dd className={route.otif >= 95 ? "good" : "risk"}>{route.otif.toFixed(1)}%</dd></div><div><dt>Emisi</dt><dd>{route.emission} kg/t</dd></div><div><dt>Kapasitas siap</dt><dd className={feasible ? "good" : "risk"}>{route.availableCapacity.toLocaleString("id-ID")} t</dd></div><div><dt>Risk score</dt><dd>{route.risk}/100</dd></div></dl><span className={feasible && route.otif >= 95 ? "feasible" : "warning"}>{feasible && route.otif >= 95 ? "Layak dieksekusi" : "Perlu mitigasi"}</span></button>; })}</div><div className="route-mode-network"><header><div><span>KORIDOR TERPILIH</span><h3>{selected.name}</h3><p>{selected.path}</p></div><span>ETA 18 Agustus 2026 · 16:00 WIB</span></header><div className="route-line"><div><span><Warehouse size={19} /></span><b>GBB Surabaya</b><small>12.000 t siap muat</small></div><i /><div><span><Truck size={19} /></span><b>Drayage</b><small>32 truk terjadwal</small></div><i /><div><span><Ship size={19} /></span><b>Tanjung Perak</b><small>Slot 14 Agu · 20:00</small></div><i /><div><span><Ship size={19} /></span><b>Makassar</b><small>Port stay 18 jam</small></div><i /><div><span><Warehouse size={19} /></span><b>Panaikang</b><small>Ruang 14.800 t</small></div></div></div></section>

      <section className="route-mode-card" id="route-plan"><header><div><span>LANGKAH 3</span><h2>Rencana Eksekusi &amp; Readiness</h2><p>Pastikan seluruh dependency siap sebelum rencana diajukan.</p></div><Gauge size={24} /></header><div className="route-readiness"><article><span><Truck size={20} /></span><div><b>Armada darat</b><strong>32 / 34 siap</strong><small>2 unit cadangan belum tervalidasi</small></div><em className="watch">Perlu cek</em></article><article><span><Ship size={20} /></span><div><b>Slot kapal</b><strong>Terkonfirmasi</strong><small>Cut-off dokumen 13 Agu · 17:00</small></div><em>Siap</em></article><article><span><Warehouse size={20} /></span><div><b>Gudang tujuan</b><strong>14.800 ton tersedia</strong><small>Put-away lane dan tenaga bongkar siap</small></div><em>Siap</em></article><article><span><FileText size={20} /></span><div><b>Dokumen &amp; SLA</b><strong>8 / 9 lengkap</strong><small>Surat jalan batch 3 belum final</small></div><em className="watch">Perlu aksi</em></article></div><div className="route-milestones"><div className="route-milestone-head"><span>Tahap</span><span>Jadwal</span><span>PIC</span><span>Status</span></div>{milestones.map((item, index) => <article key={item[0]}><span><b>{index + 1}</b><strong>{item[0]}</strong></span><span>{item[1]}</span><span>{item[2]}</span><em className={index < 2 ? "ready" : "planned"}>{index < 2 ? "Siap" : "Terjadwal"}</em></article>)}</div><div className="route-exception"><AlertTriangle size={19} /><div><strong>Trigger re-optimization otomatis</strong><p>Hitung ulang jika keterlambatan &gt;12 jam, kapasitas turun &gt;10%, cuaca pelabuhan memburuk, biaya berubah &gt;5%, atau safety stock tujuan berubah.</p></div><button type="button" onClick={() => onNotify("Aturan exception Route & Mode dibuka")}>Atur Trigger <ChevronRight size={15} /></button></div></section>

      <section className={`route-mode-report ${reportReady ? "ready" : ""}`} id="route-report"><header><div><span>LANGKAH 4</span><h2>Rekomendasi &amp; Paket Keputusan</h2><p>Ringkasan terukur untuk review operasional dan persetujuan.</p></div><span>{reportReady ? "Report siap" : "Pratinjau dinamis"}</span></header><div className="route-report-grid"><section><div><span>REKOMENDASI UTAMA</span><h3>Gunakan {recommended.name} melalui koridor Tanjung Perak–Makassar</h3><p>Alternatif ini memperoleh decision score <b>{recommended.score}/100</b>, menjaga OTIF di <b>{recommended.otif.toFixed(1)}%</b>, dan membutuhkan biaya <b>Rp{recommended.cost.toFixed(1)} miliar</b>. Booking slot kapal serta konfirmasi armada cadangan harus selesai sebelum cut-off.</p></div><dl><div><dt>Volume</dt><dd>{volume.toLocaleString("id-ID")} ton</dd></div><div><dt>Lead time</dt><dd>{recommended.lead.toFixed(1)} hari</dd></div><div><dt>ETA</dt><dd>18 Agu · 16:00</dd></div><div><dt>Risk residual</dt><dd>{recommended.risk}/100</dd></div></dl><h4>Tindakan hari ini</h4><ol><li>Konfirmasi booking kapal dan SLA bongkar muat.</li><li>Validasi dua armada cadangan serta dokumen batch 3.</li><li>Lock alokasi lot FEFO dan ruang gudang tujuan.</li></ol></section><aside><span>PAKET APPROVAL</span><h3>Siap untuk review</h3>{["Asumsi & parameter skenario", "Perbandingan biaya–waktu–risiko", "Kapasitas moda & gudang", "Jadwal dan dependency", "Exception & contingency plan", "Jejak model dan pengguna"].map((item) => <p key={item}><CheckCircle2 size={15} />{item}</p>)}<button type="button" className="download" onClick={() => onNotify("Report Route & Mode siap diunduh")}><Download size={16} />Unduh Report PDF</button><button type="button" onClick={() => onNotify("Paket dikirim ke Approval Center")}><Send size={16} />Kirim untuk Approval</button></aside></div></section>
      <footer className="route-mode-disclaimer"><AlertTriangle size={16} /><span><strong>Mode simulasi—bukan instruksi pengiriman.</strong> Validasi menggunakan data aktual WMS, TMS/Simlog, jadwal dan kapasitas operator, kondisi pelabuhan, tarif, cuaca, safety stock, serta kebijakan BULOG sebelum eksekusi.</span></footer>
    </section>
  );
}

type AlertWorkspaceMode = "alerts" | "cases" | "sla" | "history" | "rules";
type AlertRecord = { id: string; title: string; severity: "Critical" | "High" | "Medium" | "Low"; domain: string; location: string; metric: string; impact: string; age: string; sla: string; status: string; owner: string; source: string; updated: string };

const scctAlerts: AlertRecord[] = [
  { id:"ALT-260814-001",title:"Stok beras medium di bawah safety stock",severity:"Critical",domain:"Persediaan",location:"Kanwil Papua · GBB Jayapura",metric:"68% dari minimum",impact:"Defisit 6.240 ton · layanan 9 hari",age:"2j 18m",sla:"1j 42m",status:"Baru",owner:"Belum ditugaskan",source:"WMS",updated:"08:42 WIB" },
  { id:"ALT-260814-002",title:"Okupansi gudang melewati batas operasional",severity:"Critical",domain:"Pergudangan",location:"Kanwil Bali · GBB Sempidi",metric:"111% terpakai",impact:"12.860 ton tanpa ruang efektif",age:"5j 04m",sla:"Lewat 1j 04m",status:"Tervalidasi",owner:"Siti Rahma · Ops",source:"WMS",updated:"08:36 WIB" },
  { id:"ALT-260814-003",title:"Lot CBP berisiko turun mutu",severity:"Critical",domain:"Mutu & Aging",location:"Kanwil NTB · Dasan Cermen",metric:"QI 71 · RH 81%",impact:"45.200 ton · eksposur Rp497 M",age:"7j 26m",sla:"Lewat 3j 26m",status:"Ditugaskan",owner:"Budi Santoso · QA",source:"IoT/WMS",updated:"08:31 WIB" },
  { id:"ALT-260814-004",title:"Kapal pengangkut terlambat dari jadwal",severity:"High",domain:"Distribusi",location:"Tanjung Perak → Makassar",metric:"Delay 19 jam",impact:"OTIF turun ke 82,4% · 8.500 ton",age:"3j 44m",sla:"4j 16m",status:"Diproses",owner:"Rizky Maulana · Logistik",source:"TMS/Simlog",updated:"08:25 WIB" },
  { id:"ALT-260814-005",title:"Realisasi pengadaan tertinggal trajectory",severity:"High",domain:"Pengadaan",location:"Kanwil Jawa Barat",metric:"72% vs target 91%",impact:"Gap 18.400 ton bulan berjalan",age:"1h 2j",sla:"5j 10m",status:"Diproses",owner:"Dewi Kartika · Pengadaan",source:"ERP",updated:"08:17 WIB" },
  { id:"ALT-260814-006",title:"Potensi surplus terhadap kapasitas wilayah",severity:"High",domain:"Persediaan",location:"Kanwil Sulselbar",metric:"Surplus 21.700 ton",impact:"Risiko overflow dalam 6 hari",age:"8j 12m",sla:"3j 48m",status:"Tervalidasi",owner:"Andi Faisal · Kanwil",source:"WMS/Forecast",updated:"08:11 WIB" },
  { id:"ALT-260814-007",title:"Penyaluran SPHP di bawah target harian",severity:"High",domain:"Penyaluran",location:"Kanwil Sumatera Utara",metric:"1.180 vs 1.750 ton/hari",impact:"Gap 570 ton/hari · 14 kab/kota",age:"6j 51m",sla:"1j 09m",status:"Ditugaskan",owner:"Maya Putri · Penyaluran",source:"Simotandi",updated:"08:02 WIB" },
  { id:"ALT-260814-008",title:"Gagal sinkronisasi stok tiga gudang",severity:"Medium",domain:"Integrasi",location:"Kancab Lhokseumawe",metric:"Data tertunda 5 jam",impact:"9.420 ton belum terverifikasi",age:"5j 15m",sla:"6j 45m",status:"Diproses",owner:"Tim Integrasi Data",source:"Integration Hub",updated:"07:55 WIB" },
  { id:"ALT-260814-009",title:"Biaya angkutan koridor melebihi baseline",severity:"Medium",domain:"Keuangan",location:"Surabaya → Kupang",metric:"+14,8% per ton",impact:"Potensi deviasi Rp1,8 Miliar",age:"10j 05m",sla:"13j 55m",status:"Menunggu Approval",owner:"Fajar Nugroho · Keuangan",source:"ERP/TMS",updated:"07:41 WIB" },
  { id:"ALT-260814-010",title:"Kapasitas transporter tidak mencukupi",severity:"Medium",domain:"Distribusi",location:"Kancab Sorong",metric:"18 dari 28 truk siap",impact:"2.300 ton berisiko terlambat",age:"4j 20m",sla:"7j 40m",status:"Baru",owner:"Belum ditugaskan",source:"TMS",updated:"07:33 WIB" },
  { id:"ALT-260814-011",title:"Harga pembelian gabah mendekati threshold",severity:"Low",domain:"Pengadaan",location:"Kanwil Jawa Tengah",metric:"97,8% batas internal",impact:"Monitoring 7 sentra produksi",age:"1h 4j",sla:"35j",status:"Monitoring",owner:"Nina Larasati · Pengadaan",source:"Market Data",updated:"07:18 WIB" },
  { id:"ALT-260814-012",title:"Data kualitas belum lengkap",severity:"Low",domain:"Kualitas Data",location:"GBB Medan II",metric:"Completeness 86%",impact:"4 lot belum dapat dinilai",age:"19j",sla:"29j",status:"Ditugaskan",owner:"Rudi Hartono · Data Steward",source:"Data Quality",updated:"06:58 WIB" },
];

function AlertExceptionWorkspace({ mode, onSwitch, onNotify }: { mode: AlertWorkspaceMode; onSwitch: (mode: AlertWorkspaceMode) => void; onNotify: (message: string) => void }) {
  const [query,setQuery]=useState(""); const [severity,setSeverity]=useState("Semua Severity"); const [selectedId,setSelectedId]=useState(scctAlerts[0].id); const [caseStatuses,setCaseStatuses]=useState<Record<string,string>>({}); const [caseDetailId,setCaseDetailId]=useState<string|null>(null); const [caseChecks,setCaseChecks]=useState<Record<string,boolean>>({});
  const selected=scctAlerts.find((item)=>item.id===selectedId)??scctAlerts[0];
  const filtered=scctAlerts.filter((item)=>(severity==="Semua Severity"||item.severity===severity)&&`${item.id} ${item.title} ${item.location} ${item.domain}`.toLowerCase().includes(query.toLowerCase()));
  const columns=["Baru Ditugaskan","Tervalidasi","Dalam Penanganan","Menunggu Approval","Selesai"];
  const caseAlerts=[...scctAlerts,{ id:"ALT-260813-041",title:"Selisih stok fisik dan sistem",severity:"High" as const,domain:"Persediaan",location:"Kancab Meulaboh · GBB Cot Ba'u",metric:"Selisih 318 ton",impact:"Rekonsiliasi dan stock opname",age:"1h 7j",sla:"8j 31m",status:"Diproses",owner:"Ahmad Fauzi · Inventory",source:"WMS",updated:"Kemarin" },{ id:"ALT-260813-037",title:"SLA bongkar muat berpotensi terlewati",severity:"Medium" as const,domain:"Distribusi",location:"Pelabuhan Tanjung Priok",metric:"Cargo stay 31 jam",impact:"Potensi demurrage Rp86 juta",age:"1h 11j",sla:"12j 20m",status:"Menunggu Approval",owner:"Lina Marlina · Logistik",source:"TMS",updated:"Kemarin" },{ id:"ALT-260812-029",title:"Forecast demand menyimpang dari aktual",severity:"Medium" as const,domain:"Perencanaan",location:"Kanwil Kalimantan Timur",metric:"MAPE 24,7%",impact:"Rekalibrasi alokasi 3.800 ton",age:"2h 4j",sla:"20j",status:"Tervalidasi",owner:"Yoga Pratama · Planning",source:"Forecast AI",updated:"12 Agu" }];
  const caseDetail=caseAlerts.find((item)=>item.id===caseDetailId)??null;
  const statusOf=(item:AlertRecord,index:number)=>caseStatuses[item.id]??(["Baru Ditugaskan","Tervalidasi","Dalam Penanganan","Menunggu Approval","Selesai"][index%5]);
  const moveCase=(id:string,current:string,direction:number)=>{const index=columns.indexOf(current);const next=columns[Math.max(0,Math.min(columns.length-1,index+direction))];setCaseStatuses((old)=>({...old,[id]:next}));onNotify(`Kasus ${id} dipindahkan ke ${next}`)};
  return <section className="alert-workspace" aria-label={mode==="alerts"?"Alert Center":"My Cases"}>
    <header className="alert-page-header"><div><span>SUPPLY CHAIN MONITORING / ALERT &amp; EXCEPTION</span><h1>{mode==="alerts"?"Alert Center":"My Cases"}</h1><p>{mode==="alerts"?"Pusat triase alert nasional untuk mendeteksi dampak, menentukan prioritas, dan mengendalikan SLA.":"Kanban penanganan kasus yang ditugaskan kepada Anda dan tim lintas fungsi."}</p></div><div><span className="alert-live"><i/>Data simulasi · diperbarui 14 Agustus 2026 · 08:45 WIB</span><button type="button" onClick={()=>onNotify("Data alert berhasil diperbarui")}><RotateCw size={16}/>Refresh</button><button type="button" className="primary" onClick={()=>onNotify("Form pembuatan kasus dibuka")}><Plus size={16}/>Buat Kasus</button></div></header>
    <nav className="alert-switch"><button type="button" className={mode==="alerts"?"active":""} onClick={()=>onSwitch("alerts")}><BellRing size={16}/>Alert Center <b>12</b></button><button type="button" className={mode==="cases"?"active":""} onClick={()=>onSwitch("cases")}><BriefcaseBusiness size={16}/>My Cases <b>15</b></button><span/><button type="button" onClick={()=>onSwitch("sla")}><Clock3 size={15}/>SLA Monitoring</button><button type="button" onClick={()=>onSwitch("history")}><FileText size={15}/>Exception History</button><button type="button" onClick={()=>onSwitch("rules")}><Settings size={15}/>Alert Rules</button></nav>
    {mode==="alerts"?<>
      <div className="alert-kpis"><article className="critical"><span><AlertTriangle size={18}/></span><div><small>Alert Aktif</small><strong>12</strong><em>+3 sejak kemarin</em></div></article><article><span><BellRing size={18}/></span><div><small>Kritis</small><strong>3</strong><em>Butuh tindakan segera</em></div></article><article className="warning"><span><Clock3 size={18}/></span><div><small>Lewat SLA</small><strong>2</strong><em>Wajib eskalasi</em></div></article><article className="good"><span><CheckCircle2 size={18}/></span><div><small>Selesai Hari Ini</small><strong>8</strong><em>Median resolusi 6,2 jam</em></div></article><article><span><Gauge size={18}/></span><div><small>Service at Risk</small><strong>41.300 t</strong><em>6 wilayah terdampak</em></div></article></div>
      <section className="alert-command"><div><span>PRIORITAS NASIONAL HARI INI</span><h2>3 alert kritis membutuhkan keputusan sebelum 10:30 WIB</h2><p>Validasi shortage Papua, aktifkan overflow plan Bali, dan tetapkan tindakan mitigasi untuk lot NTB berisiko turun mutu.</p></div><div><b>Rp499 M</b><span>nilai eksposur teridentifikasi</span></div><button type="button" onClick={()=>onNotify("Brief prioritas nasional dibuka")}>Buka briefing <ArrowRight size={16}/></button></section>
      <div className="alert-filterbar"><label><Search size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Cari ID, alert, wilayah, atau domain…"/></label><select value={severity} onChange={(e)=>setSeverity(e.target.value)}><option>Semua Severity</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select><select defaultValue="Semua Domain"><option>Semua Domain</option><option>Persediaan</option><option>Distribusi</option><option>Pengadaan</option><option>Penyaluran</option></select><select defaultValue="Semua Status"><option>Semua Status</option><option>Baru</option><option>Ditugaskan</option><option>Diproses</option></select><button type="button"><ListFilter size={16}/>Filter lanjutan</button></div>
      <div className="alert-content"><section className="alert-table-card"><header><div><h2>Daftar Alert Aktif</h2><span>{filtered.length} alert sesuai filter</span></div><button type="button" onClick={()=>onNotify("Daftar alert diekspor")}><Download size={15}/>Export</button></header><div className="alert-table"><div className="alert-table-head"><span>Severity / ID</span><span>Alert &amp; Lokasi</span><span>Dampak</span><span>Umur / SLA</span><span>Status</span><span>PIC</span></div>{filtered.map((item)=><button type="button" key={item.id} className={selectedId===item.id?"selected":""} onClick={()=>setSelectedId(item.id)}><span><em className={`sev ${item.severity.toLowerCase()}`}>{item.severity}</em><small>{item.id}</small></span><span><strong>{item.title}</strong><small>{item.domain} · {item.location}</small></span><span><strong>{item.metric}</strong><small>{item.impact}</small></span><span><strong>{item.age}</strong><small className={item.sla.includes("Lewat")?"overdue":""}>{item.sla}</small></span><span><em className="status">{item.status}</em><small>{item.updated}</small></span><span><strong>{item.owner}</strong><small>{item.source}</small></span></button>)}</div></section>
      <aside className="alert-detail"><header><span>DETAIL ALERT</span><button type="button"><MoreVertical size={18}/></button></header><em className={`sev ${selected.severity.toLowerCase()}`}>{selected.severity}</em><h2>{selected.title}</h2><small>{selected.id} · terdeteksi {selected.age} lalu</small><div className="alert-detail-impact"><span>Dampak terukur</span><strong>{selected.metric}</strong><p>{selected.impact}</p></div><dl><div><dt>Lokasi</dt><dd>{selected.location}</dd></div><div><dt>Domain</dt><dd>{selected.domain}</dd></div><div><dt>Sumber data</dt><dd>{selected.source}</dd></div><div><dt>SLA tersisa</dt><dd className={selected.sla.includes("Lewat")?"overdue":""}>{selected.sla}</dd></div><div><dt>PIC</dt><dd>{selected.owner}</dd></div></dl><h3>Rekomendasi awal</h3><ol><li>Validasi kondisi dan data sumber dengan unit terkait.</li><li>Aktifkan mitigasi untuk menjaga service level dan safety stock.</li><li>Eskalasi bila tindakan tidak dimulai sebelum SLA berakhir.</li></ol><button type="button" className="primary" onClick={()=>{onSwitch("cases");onNotify(`${selected.id} dibuka sebagai kasus`)}}><BriefcaseBusiness size={16}/>Buka sebagai Kasus</button><button type="button" onClick={()=>onNotify(`Analisis ${selected.id} dibuka`)}><BrainCircuit size={16}/>Analisis Root Cause</button></aside></div>
    </>:<>
      <div className="case-summary"><article><small>Kasus Aktif Saya</small><strong>12</strong><span>3 prioritas kritis</span></article><article><small>Lewat SLA</small><strong>2</strong><span>perlu eskalasi hari ini</span></article><article><small>Menunggu Approval</small><strong>3</strong><span>Rp3,4 Miliar impact</span></article><article><small>Selesai Minggu Ini</small><strong>19</strong><span>92% sesuai SLA</span></article><div><span>Workload tim</span><b>78%</b><i><em style={{width:"78%"}}/></i><small>31 dari 40 kapasitas kasus</small></div></div>
      <div className="case-toolbar"><label><Search size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Cari kasus…"/></label><button type="button" className="active">Semua Kasus <b>15</b></button><button type="button">Kritis <b>3</b></button><button type="button">Lewat SLA <b>2</b></button><button type="button">Milik Saya <b>9</b></button><span/><button type="button"><ListFilter size={16}/>Filter</button><button type="button"><SlidersHorizontal size={16}/>Kelompokkan</button></div>
      <div className="case-board">{columns.map((column,columnIndex)=>{const items=caseAlerts.filter((item,index)=>statusOf(item,index)===column&&`${item.title} ${item.location}`.toLowerCase().includes(query.toLowerCase()));return <section key={column} className={`case-column c${columnIndex}`}><header><span>{column}<b>{items.length}</b></span><button type="button"><MoreVertical size={16}/></button></header><div>{items.map((item,index)=><article key={item.id} onClick={()=>{setSelectedId(item.id);setCaseDetailId(item.id)}}><header><em className={`sev ${item.severity.toLowerCase()}`}>{item.severity}</em><small>{item.id}</small></header><h3>{item.title}</h3><p><MapPinned size={13}/>{item.location}</p><div className="case-impact"><span>{item.metric}</span><small>{item.impact}</small></div><dl><div><dt>SLA</dt><dd className={item.sla.includes("Lewat")?"overdue":""}>{item.sla}</dd></div><div><dt>Updated</dt><dd>{item.updated}</dd></div></dl><footer><span><CircleUserRound size={15}/>{item.owner.split(" · ")[0]}</span><div><button type="button" disabled={columnIndex===0} onClick={(e)=>{e.stopPropagation();moveCase(item.id,column,-1)}} aria-label="Pindah ke tahap sebelumnya"><ChevronLeft size={14}/></button><button type="button" disabled={columnIndex===columns.length-1} onClick={(e)=>{e.stopPropagation();moveCase(item.id,column,1)}} aria-label="Pindah ke tahap berikutnya"><ChevronRight size={14}/></button></div></footer></article>)}</div><button type="button" className="add-case" onClick={()=>onNotify(`Tambah kasus di ${column}`)}><Plus size={14}/>Tambah kasus</button></section>})}</div>
      <footer className="case-board-note"><ShieldCheck size={16}/><span>Perubahan status tercatat pada audit trail. Kasus kritis, perubahan nilai dampak, dan penutupan kasus membutuhkan bukti serta otorisasi sesuai kewenangan.</span></footer>
      {caseDetail&&<div className="case-detail-backdrop" role="presentation" onMouseDown={(event)=>{if(event.target===event.currentTarget)setCaseDetailId(null)}}><section className="case-detail-modal" role="dialog" aria-modal="true" aria-labelledby="case-detail-title"><header><div><span>DETAIL TASK / MY CASES</span><p><em className={`sev ${caseDetail.severity.toLowerCase()}`}>{caseDetail.severity}</em><b>{caseDetail.id}</b><i>{statusOf(caseDetail,caseAlerts.findIndex(item=>item.id===caseDetail.id))}</i></p><h2 id="case-detail-title">{caseDetail.title}</h2><small>{caseDetail.domain} · dibuat dari Alert Center · diperbarui {caseDetail.updated}</small></div><button type="button" onClick={()=>setCaseDetailId(null)} aria-label="Tutup detail task"><X size={21}/></button></header><div className="case-detail-body"><main><section className="case-detail-impact-card"><span><small>DAMPAK UTAMA</small><strong>{caseDetail.metric}</strong><p>{caseDetail.impact}</p></span><div><small>SLA TERSISA</small><strong className={caseDetail.sla.includes("Lewat")?"overdue":""}>{caseDetail.sla}</strong><i><em style={{width:caseDetail.sla.includes("Lewat")?"100%":"72%"}}/></i><p>{caseDetail.sla.includes("Lewat")?"Breach · eskalasi wajib":"72% waktu resolusi telah digunakan"}</p></div></section><section className="case-detail-section"><header><div><span>INFORMASI TASK</span><h3>Konteks dan Kepemilikan</h3></div><button type="button" onClick={()=>onNotify(`PIC ${caseDetail.id} dapat diubah`)}><Settings size={14}/>Edit</button></header><dl><div><dt>Lokasi</dt><dd>{caseDetail.location}</dd></div><div><dt>PIC / Owner</dt><dd>{caseDetail.owner}</dd></div><div><dt>Sumber data</dt><dd>{caseDetail.source}</dd></div><div><dt>Umur kasus</dt><dd>{caseDetail.age}</dd></div><div><dt>Unit eskalasi</dt><dd>{caseDetail.severity==="Critical"?"Direktur Supply Chain":"Kepala Divisi terkait"}</dd></div><div><dt>Target resolusi</dt><dd>14 Agu 2026 · 12:30 WIB</dd></div></dl></section><section className="case-detail-section"><header><div><span>ACTION PLAN</span><h3>Tindakan Penanganan</h3></div><b>{Object.keys(caseChecks).filter(key=>key.startsWith(caseDetail.id)&&caseChecks[key]).length}/4 selesai</b></header><div className="case-action-list">{["Validasi data dan kondisi aktual dengan unit pemilik","Konfirmasi dampak terhadap stok, layanan, dan biaya","Jalankan mitigasi operasional yang telah disetujui","Unggah evidence dan verifikasi hasil tindakan"].map((task,index)=>{const key=`${caseDetail.id}-${index}`;return <label key={task}><input type="checkbox" checked={Boolean(caseChecks[key])} onChange={event=>setCaseChecks(old=>({...old,[key]:event.target.checked}))}/><span><strong>{task}</strong><small>{index===0?"PIC · 30 menit":index===1?"Owner domain · 1 jam":index===2?"Tim lintas fungsi · sesuai approval":"PIC · sebelum penutupan"}</small></span></label>})}</div><button type="button" onClick={()=>onNotify(`Tindakan baru ditambahkan ke ${caseDetail.id}`)}><Plus size={14}/>Tambah tindakan</button></section><section className="case-detail-section"><header><div><span>ANALISIS</span><h3>Root Cause &amp; Rekomendasi</h3></div><BrainCircuit size={18}/></header><div className="case-root-cause"><p><b>Indikasi penyebab:</b> deviasi supply–demand, kapasitas operasional, atau keterlambatan eksekusi terhadap parameter yang disepakati.</p><ol><li>Validasi event sumber dan dependency lintas sistem.</li><li>Bandingkan baseline, target, dan kondisi aktual per wilayah.</li><li>Pilih mitigasi dengan dampak layanan tertinggi dan risiko residual terendah.</li></ol></div><button type="button" onClick={()=>onNotify(`Root Cause Analysis ${caseDetail.id} dibuka`)}><Sparkles size={14}/>Buka Analisis Lengkap</button></section></main><aside><section><span>QUICK ACTIONS</span><button className="primary" onClick={()=>{setCaseStatuses(old=>({...old,[caseDetail.id]:"Dalam Penanganan"}));onNotify(`${caseDetail.id} mulai ditangani`)}}><Play size={15}/>Mulai Penanganan</button><button onClick={()=>onNotify(`Dialog penugasan PIC ${caseDetail.id} dibuka`)}><UserRound size={15}/>Assign / Ganti PIC</button><button onClick={()=>onNotify(`${caseDetail.id} dieskalasi ke unit berwenang`)}><AlertTriangle size={15}/>Eskalasi Kasus</button><button onClick={()=>{setCaseStatuses(old=>({...old,[caseDetail.id]:"Menunggu Approval"}));onNotify(`${caseDetail.id} diajukan untuk approval`)}}><Send size={15}/>Ajukan Approval</button></section><section><span>COLLABORATION</span><button onClick={()=>onNotify(`Catatan ditambahkan ke ${caseDetail.id}`)}><MessageCircle size={15}/>Tambah Catatan</button><button onClick={()=>onNotify(`Lampiran evidence ${caseDetail.id} dibuka`)}><FileText size={15}/>Lampirkan Evidence</button><button onClick={()=>onNotify(`Audit trail ${caseDetail.id} dibuka`)}><Clock3 size={15}/>Lihat Audit Trail</button></section><section className="case-detail-timeline"><span>AKTIVITAS TERBARU</span>{[["08:42","Alert dibuat otomatis",caseDetail.source],["08:48","Kasus ditugaskan",caseDetail.owner],["09:06","Data awal tervalidasi","Command Center"]].map(row=><article key={row[0]}><i/><p><b>{row[1]}</b><small>{row[0]} WIB · {row[2]}</small></p></article>)}</section></aside></div><footer><button type="button" onClick={()=>setCaseDetailId(null)}>Tutup</button><button type="button" onClick={()=>onNotify(`Perubahan ${caseDetail.id} disimpan`)}><Save size={15}/>Simpan Perubahan</button><button className="primary" type="button" onClick={()=>{setCaseStatuses(old=>({...old,[caseDetail.id]:"Selesai"}));onNotify(`${caseDetail.id} diajukan untuk ditutup`)}}><CheckCircle2 size={15}/>Ajukan Penutupan</button></footer></section></div>}
    </>}
  </section>;
}

function AlertGovernancePage({ mode, onSwitch, onNotify }: { mode: "sla" | "history" | "rules"; onSwitch: (mode: AlertWorkspaceMode) => void; onNotify: (message: string) => void }) {
  const [query,setQuery]=useState(""); const [enabledRules,setEnabledRules]=useState<Record<string,boolean>>({});
  const meta={sla:["SLA Monitoring","Pantau kepatuhan waktu respons, resolusi, breach, dan jalur eskalasi lintas fungsi."],history:["Exception History","Arsip exception yang telah ditutup untuk audit, pembelajaran, dan pencegahan berulang."],rules:["Alert Rules","Kelola rule deteksi, threshold, severity, notifikasi, dan eskalasi alert SCCT."]} as const;
  const slaRows=[
    ["Critical · Persediaan","15 menit","4 jam","91,7%","2","3j 08m","Direktur Supply Chain"],["Critical · Mutu & Aging","30 menit","6 jam","83,3%","1","5j 42m","Direktur Operasional"],["High · Distribusi","1 jam","12 jam","94,2%","1","8j 16m","Kadiv Logistik"],["High · Pengadaan","2 jam","24 jam","96,8%","0","17j 20m","Kadiv Pengadaan"],["Medium · Integrasi","4 jam","24 jam","98,1%","0","9j 44m","Kadiv TI"],["Medium · Keuangan","4 jam","48 jam","97,4%","0","31j 05m","Kadiv Keuangan"],["Low · Data Quality","8 jam","72 jam","99,2%","0","42j 18m","Data Owner"]
  ];
  const history=[
    ["EXC-260813-118","Redistribusi shortage Papua selesai","Persediaan","Kanwil Papua","Critical","7j 42m","Sesuai SLA","Redistribusi 6.100 ton"],["EXC-260813-115","Keterlambatan kapal Makassar dimitigasi","Distribusi","Sulselbar","High","11j 18m","Sesuai SLA","Moda alternatif diaktifkan"],["EXC-260812-109","Selisih stock opname diselesaikan","Persediaan","Kancab Meulaboh","High","26j 05m","Lewat SLA","Koreksi 318 ton"],["EXC-260812-103","Gangguan sinkronisasi WMS dipulihkan","Integrasi","Lhokseumawe","Medium","5j 33m","Sesuai SLA","3 gudang tersinkron"],["EXC-260811-096","Overflow gudang Sempidi ditangani","Pergudangan","Bali","Critical","9j 51m","Lewat SLA","8.400 ton direlokasi"],["EXC-260811-089","Gap penyaluran SPHP dipulihkan","Penyaluran","Sumatera Utara","High","18j 24m","Sesuai SLA","Run-rate +620 ton/hari"],["EXC-260810-074","Data mutu lot dilengkapi","Data Quality","Medan II","Low","41j 12m","Sesuai SLA","4 lot tervalidasi"],["EXC-260809-061","Biaya koridor kembali ke baseline","Keuangan","Surabaya–Kupang","Medium","38j 07m","Sesuai SLA","Hemat Rp640 juta"]
  ];
  const rules=[
    {id:"RUL-INV-001",name:"Stok di bawah safety stock",domain:"Persediaan",logic:"Available stock < safety stock selama 2 snapshot",severity:"Critical",scope:"Semua Kanwil",trigger:"5 menit",owner:"Inventory Planning",enabled:true,alerts:17},
    {id:"RUL-WHS-004",name:"Okupansi gudang kritis",domain:"Pergudangan",logic:"Utilisasi > 90% atau usable space < 10%",severity:"High",scope:"Nasional",trigger:"15 menit",owner:"Operasional Gudang",enabled:true,alerts:9},
    {id:"RUL-QLT-007",name:"Risiko penurunan mutu lot",domain:"Mutu & Aging",logic:"Risk score ≥ 75 atau QI < 78",severity:"Critical",scope:"Beras CBP",trigger:"1 jam",owner:"Quality Assurance",enabled:true,alerts:6},
    {id:"RUL-DST-011",name:"Prediksi OTIF di bawah target",domain:"Distribusi",logic:"Predicted OTIF < 95% dan ETA slip > 6 jam",severity:"High",scope:"Semua koridor",trigger:"15 menit",owner:"Divisi Logistik",enabled:true,alerts:12},
    {id:"RUL-PRC-014",name:"Pengadaan tertinggal trajectory",domain:"Pengadaan",logic:"Realisasi kumulatif < 90% trajectory",severity:"High",scope:"Kanwil pengadaan",trigger:"Harian 07:00",owner:"Divisi Pengadaan",enabled:true,alerts:5},
    {id:"RUL-INT-021",name:"Data source tidak fresh",domain:"Integrasi",logic:"Last successful sync > 120 menit",severity:"Medium",scope:"WMS, ERP, TMS",trigger:"10 menit",owner:"Data Platform",enabled:true,alerts:14},
    {id:"RUL-FIN-025",name:"Deviasi biaya logistik",domain:"Keuangan",logic:"Cost/ton > baseline + 12%",severity:"Medium",scope:"Koridor aktif",trigger:"Harian 09:00",owner:"Finance BP",enabled:false,alerts:3}
  ];
  const label=meta[mode];
  return <section className="alert-workspace governance-page"><header className="alert-page-header"><div><span>SUPPLY CHAIN MONITORING / ALERT &amp; EXCEPTION</span><h1>{label[0]}</h1><p>{label[1]}</p></div><div><span className="alert-live"><i/>Data simulasi · 14 Agustus 2026 · 08:45 WIB</span><button type="button" onClick={()=>onNotify(`${label[0]} diperbarui`)}><RotateCw size={16}/>Refresh</button>{mode==="rules"&&<button type="button" className="primary" onClick={()=>onNotify("Rule builder dibuka")}><Plus size={16}/>Buat Rule</button>}</div></header>
    <nav className="alert-switch"><button type="button" onClick={()=>onSwitch("alerts")}><BellRing size={16}/>Alert Center <b>12</b></button><button type="button" onClick={()=>onSwitch("cases")}><BriefcaseBusiness size={16}/>My Cases <b>15</b></button><span/><button type="button" className={mode==="sla"?"active":""} onClick={()=>onSwitch("sla")}><Clock3 size={15}/>SLA Monitoring</button><button type="button" className={mode==="history"?"active":""} onClick={()=>onSwitch("history")}><FileText size={15}/>Exception History</button><button type="button" className={mode==="rules"?"active":""} onClick={()=>onSwitch("rules")}><Settings size={15}/>Alert Rules</button></nav>
    {mode==="sla"&&<><div className="gov-kpis"><article><small>SLA Compliance</small><strong>94,6%</strong><span>Target ≥ 95%</span></article><article className="risk"><small>Open Breach</small><strong>4</strong><span>3 critical · 1 high</span></article><article><small>Median Acknowledge</small><strong>18 menit</strong><span>-4 menit vs minggu lalu</span></article><article><small>Median Resolution</small><strong>7,8 jam</strong><span>128 kasus / 30 hari</span></article><article className="good"><small>Resolved in SLA</small><strong>121</strong><span>+8,1% MoM</span></article></div><div className="sla-layout"><section className="gov-card"><header><div><h2>Kepatuhan SLA per Domain</h2><p>Rolling 30 hari · berdasarkan severity dan domain</p></div><button type="button"><Download size={15}/>Export</button></header><div className="sla-table"><div><b>Policy</b><b>Acknowledge</b><b>Resolve</b><b>Compliance</b><b>Breach</b><b>Median</b><b>Eskalasi</b></div>{slaRows.map((row)=><article key={row[0]}>{row.map((cell,index)=><span key={cell} className={(index===3&&parseFloat(cell)<95)||(index===4&&cell!=="0")?"risk":""}>{cell}{index===3&&<i><em style={{width:cell}}/></i>}</span>)}</article>)}</div></section><aside className="gov-card sla-breaches"><header><div><h2>Breach Aktif</h2><p>Urut berdasarkan risiko layanan</p></div></header>{scctAlerts.slice(0,4).map((item,index)=><article key={item.id}><span>{index+1}</span><div><b>{item.title}</b><small>{item.location}</small><em>{item.owner}</em></div><strong>{index<2?`+${index+1}j ${index?"04":"26"}m`:item.sla}</strong></article>)}<button type="button" onClick={()=>onSwitch("cases")}>Buka My Cases <ArrowRight size={14}/></button></aside></div><section className="gov-card escalation-lane"><header><div><h2>Jalur Eskalasi</h2><p>Kontrol waktu dan kepemilikan keputusan</p></div></header><div>{[["L0","PIC Operasional","0–50% SLA","Validasi & mitigasi awal"],["L1","Kepala Unit / Kanwil","50–80% SLA","Intervensi dan resource"],["L2","Kepala Divisi","80–100% SLA","Keputusan lintas fungsi"],["L3","Direksi terkait","Breach / dampak kritis","Escalation & command"]].map((item,index)=><article key={item[0]}><span>{item[0]}</span><b>{item[1]}</b><small>{item[2]}</small><p>{item[3]}</p>{index<3&&<ArrowRight size={16}/>}</article>)}</div></section></>}
    {mode==="history"&&<><div className="gov-kpis"><article><small>Exception Ditutup</small><strong>128</strong><span>30 hari terakhir</span></article><article><small>Sesuai SLA</small><strong>94,6%</strong><span>121 kasus</span></article><article className="risk"><small>Recurring</small><strong>11</strong><span>perlu preventive action</span></article><article><small>Loss Avoided</small><strong>Rp18,7 M</strong><span>estimasi terverifikasi</span></article><article className="good"><small>Action Effectiveness</small><strong>88%</strong><span>+6% vs bulan lalu</span></article></div><div className="alert-filterbar"><label><Search size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Cari exception, wilayah, atau tindakan…"/></label><select><option>30 Hari Terakhir</option><option>7 Hari Terakhir</option><option>Tahun Berjalan</option></select><select><option>Semua Domain</option><option>Persediaan</option><option>Distribusi</option></select><select><option>Semua Outcome</option><option>Sesuai SLA</option><option>Lewat SLA</option></select><button type="button"><Download size={15}/>Export Audit</button></div><section className="gov-card history-card"><header><div><h2>Riwayat Exception</h2><p>Rekam keputusan, tindakan, outcome, dan bukti audit</p></div><span>128 records</span></header><div className="history-table"><div><b>ID / Selesai</b><b>Exception</b><b>Domain / Lokasi</b><b>Severity</b><b>Resolution</b><b>SLA</b><b>Outcome</b></div>{history.filter((row)=>row.join(" ").toLowerCase().includes(query.toLowerCase())).map((row)=><button type="button" key={row[0]} onClick={()=>onNotify(`Audit trail ${row[0]} dibuka`)}><span><strong>{row[0]}</strong><small>14 Agu · 07:28</small></span><span><strong>{row[1]}</strong><small>Owner: Command Center</small></span><span><strong>{row[2]}</strong><small>{row[3]}</small></span><span><em className={`sev ${row[4].toLowerCase()}`}>{row[4]}</em></span><span>{row[5]}</span><span className={row[6]==="Lewat SLA"?"risk":"good"}>{row[6]}</span><span><strong>{row[7]}</strong><small>Evidence lengkap</small></span></button>)}</div></section><section className="history-insight"><Sparkles size={18}/><div><strong>Preventive insight</strong><p>Exception okupansi gudang berulang 4 kali pada koridor Bali–NTB. Rekomendasi: aktifkan capacity forecast 14 hari dan pre-booking ruang overflow saat utilisasi mencapai 82%.</p></div><button type="button" onClick={()=>onSwitch("rules")}>Buat preventive rule <ArrowRight size={14}/></button></section></>}
    {mode==="rules"&&<><div className="gov-kpis"><article><small>Rule Aktif</small><strong>46</strong><span>7 domain operasional</span></article><article><small>Triggered Hari Ini</small><strong>29</strong><span>12 menjadi alert aktif</span></article><article><small>Precision</small><strong>91,8%</strong><span>false positive 8,2%</span></article><article className="risk"><small>Perlu Review</small><strong>5</strong><span>threshold tidak optimal</span></article><article className="good"><small>Coverage</small><strong>93%</strong><span>critical process covered</span></article></div><div className="alert-filterbar"><label><Search size={16}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Cari rule, domain, atau owner…"/></label><select><option>Semua Domain</option><option>Persediaan</option><option>Distribusi</option></select><select><option>Semua Severity</option><option>Critical</option><option>High</option></select><select><option>Semua Status</option><option>Active</option><option>Draft</option></select><button type="button"><ListFilter size={15}/>Filter</button></div><div className="rules-layout"><section className="gov-card rules-list"><header><div><h2>Operational Alert Rules</h2><p>Threshold, scope, owner, dan trigger schedule</p></div><button type="button" onClick={()=>onNotify("Rule template dibuka")}><Plus size={14}/>Rule dari Template</button></header>{rules.filter((rule)=>`${rule.id} ${rule.name} ${rule.domain} ${rule.owner}`.toLowerCase().includes(query.toLowerCase())).map((rule)=><article key={rule.id}><label className="rule-toggle"><input type="checkbox" checked={enabledRules[rule.id]??rule.enabled} onChange={(e)=>{setEnabledRules((old)=>({...old,[rule.id]:e.target.checked}));onNotify(`${rule.name} ${e.target.checked?"diaktifkan":"dinonaktifkan"}`)}}/><i/></label><div><span><em className={`sev ${rule.severity.toLowerCase()}`}>{rule.severity}</em><small>{rule.id} · {rule.domain}</small></span><h3>{rule.name}</h3><p>{rule.logic}</p><dl><div><dt>Scope</dt><dd>{rule.scope}</dd></div><div><dt>Evaluasi</dt><dd>{rule.trigger}</dd></div><div><dt>Owner</dt><dd>{rule.owner}</dd></div><div><dt>30d trigger</dt><dd>{rule.alerts}</dd></div></dl></div><div><button type="button" onClick={()=>onNotify(`${rule.id} diuji dengan data historis`)}><FlaskConical size={14}/>Test</button><button type="button" onClick={()=>onNotify(`${rule.id} dibuka untuk diedit`)}><Settings size={14}/>Edit</button></div></article>)}</section><aside className="gov-card rule-health"><header><div><h2>Rule Health</h2><p>Kualitas deteksi 30 hari</p></div></header><div className="rule-score"><strong>91,8</strong><span>Detection Precision</span><i><em/></i></div>{[["True positive","266","91,8%"],["False positive","24","8,2%"],["Auto-resolved","47","16,2%"],["Escalated","19","6,5%"]].map((row)=><p key={row[0]}><span>{row[0]}</span><b>{row[1]}</b><em>{row[2]}</em></p>)}<div className="rule-review"><AlertTriangle size={17}/><p><b>5 rule perlu review</b><span>Threshold terlalu sensitif atau tidak pernah terpicu selama 60 hari.</span></p></div><button type="button" onClick={()=>onNotify("Review queue dibuka")}>Buka Review Queue <ArrowRight size={14}/></button></aside></div><footer className="case-board-note"><ShieldCheck size={16}/><span>Perubahan rule critical memerlukan maker-checker approval, pengujian historis, catatan versi, dan audit trail sebelum aktif di produksi.</span></footer></>}
  </section>;
}

function ProfilePage({ onNotify }: { onNotify: (message: string) => void }) {
  const [mfa,setMfa]=useState(false); const [tab,setTab]=useState("account");
  const logins=[["14 Agu 2026 · 08:12 WIB","Jakarta, Indonesia","Chrome 127 · macOS","10.22.18.41","Berhasil"],["13 Agu 2026 · 17:46 WIB","Jakarta, Indonesia","Chrome 127 · macOS","10.22.18.41","Berhasil"],["13 Agu 2026 · 07:58 WIB","Bandung, Indonesia","Edge · Windows 11","10.34.7.118","Berhasil"],["12 Agu 2026 · 21:17 WIB","Jakarta, Indonesia","Mobile Safari · iOS","10.22.32.9","Berhasil"],["12 Agu 2026 · 20:54 WIB","Surabaya, Indonesia","Unknown device","103.121.44.17","Ditolak"]];
  return <section className="profile-page"><header><div><span>AKUN / PROFILE</span><h1>Profile</h1><p>Kelola informasi akun, akses RBAC, autentikasi, sesi, dan keamanan Anda.</p></div><span className="profile-secure"><ShieldCheck size={16}/>Security score <b>{mfa?"92":"74"}/100</b></span></header><section className="profile-hero"><div className="profile-avatar">ML</div><div><span>SUPERADMIN · KANTOR PUSAT</span><h2>Mohammad Latif</h2><p>Administrator SCCT Nasional · Divisi Transformasi Digital</p><small>mohammad.latif@bulog.co.id · NPP 198704152014031002</small></div><div><span>Status akun</span><b><i/>ACTIVE</b><small>Last verified 12 Aug 2026</small></div><button type="button" onClick={()=>onNotify("Mode ubah profil dibuka")}><Settings size={16}/>Edit Profile</button></section><nav className="profile-tabs">{[["account","Account Information"],["security","Security & MFA"],["access","RBAC & Access"],["activity","Login History"]].map((item)=><button type="button" key={item[0]} className={tab===item[0]?"active":""} onClick={()=>setTab(item[0])}>{item[1]}</button>)}</nav>
    {tab==="account"&&<div className="profile-grid"><section className="profile-card account-info"><header><div><h2>Account Information</h2><p>Identitas dan informasi organisasi pengguna</p></div><button type="button" onClick={()=>onNotify("Perubahan informasi akun dibuka")}>Edit</button></header><dl>{[["Nama lengkap","Mohammad Latif"],["Username","superadmin"],["NPP","198704152014031002"],["Email BULOG","mohammad.latif@bulog.co.id"],["Nomor telepon","+62 812 •••• 2741"],["Jabatan","Administrator SCCT Nasional"],["Unit kerja","Divisi Transformasi Digital"],["Organisasi","Perum BULOG · Kantor Pusat"],["Atasan langsung","Direktur Transformasi & Hubungan Kelembagaan"],["Zona waktu","Asia/Jakarta (WIB)"],["Bahasa","Bahasa Indonesia"],["Status","ACTIVE · Pegawai terverifikasi"]].map((row)=><div key={row[0]}><dt>{row[0]}</dt><dd>{row[1]}</dd></div>)}</dl></section><aside><section className="profile-card compact"><header><div><h2>Contact & Recovery</h2><p>Saluran pemulihan akun</p></div></header><div><span>Email recovery</span><b>m•••••@bulog.co.id</b><em>Verified</em></div><div><span>Nomor recovery</span><b>+62 812 •••• 2741</b><em>Verified</em></div><button type="button" onClick={()=>onNotify("Kontak pemulihan dibuka")}>Kelola Kontak</button></section><section className="profile-card compact"><header><div><h2>Account Governance</h2><p>Kontrol siklus hidup akun</p></div></header><div><span>Dibuat</span><b>18 Januari 2024</b></div><div><span>Review akses terakhir</span><b>30 Juni 2026</b></div><div><span>Review berikutnya</span><b>30 September 2026</b></div><div><span>Data owner</span><b>IT Security BULOG</b></div></section></aside></div>}
    {tab==="security"&&<div className="profile-grid security-grid"><section className="profile-card mfa-card"><header><div><h2>Multi-Factor Authentication (MFA)</h2><p>Lindungi akun dengan faktor autentikasi tambahan.</p></div><em className={mfa?"enabled":"warning"}>{mfa?"Enabled":"Not enabled"}</em></header><div className="mfa-visual"><ShieldCheck size={34}/><div><b>{mfa?"Akun dilindungi MFA":"MFA belum diaktifkan"}</b><p>{mfa?"Authenticator app aktif. Recovery codes terakhir diperbarui 14 Agustus 2026.":"Aktifkan authenticator app untuk mengurangi risiko pengambilalihan akun."}</p></div></div><button type="button" className="primary" onClick={()=>{setMfa(!mfa);onNotify(mfa?"MFA dinonaktifkan pada mode demo":"MFA berhasil diaktifkan pada mode demo")}}>{mfa?"Kelola MFA":"Enable MFA"}</button><small>Metode didukung: Authenticator App, security key, dan recovery codes.</small></section><section className="profile-card password-card"><header><div><h2>Change Password</h2><p>Gunakan kata sandi unik yang belum pernah digunakan.</p></div></header><label><span>Password saat ini</span><input type="password" placeholder="••••••••••••"/></label><label><span>Password baru</span><input type="password" placeholder="Minimal 12 karakter"/></label><label><span>Konfirmasi password</span><input type="password" placeholder="Ulangi password baru"/></label><div className="password-rules"><span><CheckCircle2 size={13}/>Minimal 12 karakter</span><span><CheckCircle2 size={13}/>Huruf besar, kecil, angka, simbol</span><span><CheckCircle2 size={13}/>Tidak sama dengan 5 password terakhir</span></div><button type="button" onClick={()=>onNotify("Permintaan ubah password divalidasi")}>Update Password</button></section><section className="profile-card session-card"><header><div><h2>Active Sessions</h2><p>Perangkat yang saat ini memiliki akses.</p></div><button type="button" onClick={()=>onNotify("Semua sesi lain berhasil diakhiri")}>Keluar dari sesi lain</button></header>{[["Chrome · macOS","Jakarta · Current session","Aktif sekarang"],["Mobile Safari · iOS","Jakarta · iPhone 15","2 jam lalu"],["Edge · Windows 11","Bandung · Managed device","Kemarin"]].map((row,index)=><article key={row[0]}><span><Activity size={17}/></span><div><b>{row[0]}</b><small>{row[1]}</small></div><em className={index===0?"enabled":""}>{row[2]}</em><button type="button" onClick={()=>onNotify(`${row[0]} dikeluarkan`)}>{index?"Revoke":"Detail"}</button></article>)}</section></div>}
    {tab==="access"&&<div className="profile-grid access-grid"><section className="profile-card"><header><div><h2>RBAC Information</h2><p>Role, scope organisasi, dan batas kewenangan efektif.</p></div><em className="enabled">Access reviewed</em></header><div className="role-hero"><span><ShieldCheck size={24}/></span><div><small>PRIMARY ROLE</small><h3>SCCT Super Administrator</h3><p>Administrative access dengan maker-checker untuk tindakan kritis.</p></div></div><dl className="rbac-facts">{[["Organizational scope","Nasional · Kantor Pusat"],["Data scope","Seluruh Kanwil, Kancab, dan Gudang"],["Approval limit","Konfigurasi sistem · bukan transaksi finansial"],["Delegated role","Incident Commander (hingga 31 Agu 2026)"],["Access review","Quarterly · terakhir 30 Jun 2026"],["Role owner","Direktur Transformasi & Hubungan Kelembagaan"]].map((row)=><div key={row[0]}><dt>{row[0]}</dt><dd>{row[1]}</dd></div>)}</dl></section><section className="profile-card permissions"><header><div><h2>Effective Permissions</h2><p>Hak akses setelah role, scope, dan policy diterapkan.</p></div></header>{[["Dashboard & Analytics","View, create, manage layout","Full"],["Alert & Exception","Manage rules, assign, escalate","Full"],["Decision Intelligence","Run simulation, submit recommendation","Full"],["Approval Center","Review configuration changes","Limited"],["Master Data","View and propose changes","Maker"],["User & Role","Manage user, assign approved roles","Admin"],["Audit & Logs","View and export","Read-only"],["Financial Transaction","No execution access","Denied"]].map((row)=><article key={row[0]}><div><b>{row[0]}</b><small>{row[1]}</small></div><em className={row[2]==="Denied"?"denied":row[2]==="Limited"?"warning":"enabled"}>{row[2]}</em></article>)}</section></div>}
    {tab==="activity"&&<div className="profile-grid activity-grid"><section className="profile-card login-history"><header><div><h2>History Login</h2><p>Aktivitas autentikasi 30 hari terakhir.</p></div><button type="button" onClick={()=>onNotify("Riwayat login diekspor")}><Download size={15}/>Export</button></header><div><div><b>Waktu</b><b>Lokasi</b><b>Perangkat</b><b>IP Address</b><b>Status</b></div>{logins.map((row)=><article key={row.join("")}><span>{row[0]}</span><span>{row[1]}</span><span>{row[2]}</span><span>{row[3]}</span><em className={row[4]==="Berhasil"?"enabled":"denied"}>{row[4]}</em></article>)}</div></section><aside><section className="profile-card compact"><header><div><h2>Login Summary</h2><p>30 hari terakhir</p></div></header><div><span>Successful login</span><b>48</b></div><div><span>Failed / blocked</span><b>2</b></div><div><span>Unique devices</span><b>4</b></div><div><span>Last password change</span><b>46 hari lalu</b></div></section><section className="profile-card risk-event"><AlertTriangle size={20}/><div><b>1 aktivitas perlu ditinjau</b><p>Percobaan login dari perangkat baru di Surabaya telah diblokir oleh access policy.</p></div><button type="button" onClick={()=>onNotify("Security event ditandai aman")}>Review Event</button></section></aside></div>}
    <footer className="profile-footer"><ShieldCheck size={15}/><span>Perubahan keamanan, MFA, password, role, dan sesi dicatat dalam audit trail. Data pada halaman ini merupakan profil demonstrasi SCCT.</span></footer></section>;
}

type AskAILayout = "sidebar" | "floating" | "full";
type AIMessage = { role: "user" | "assistant"; text: string; meta?: string };

function AskAIWorkspace({ layout, onLayoutChange, onClose, activeContext }: { layout: AskAILayout; onLayoutChange: (layout: AskAILayout) => void; onClose: () => void; activeContext: string }) {
  const [view,setView]=useState<"chat"|"history">("chat"); const [layoutMenu,setLayoutMenu]=useState(false); const [topic,setTopic]=useState("General"); const [input,setInput]=useState(""); const [messages,setMessages]=useState<AIMessage[]>([]); const [thinking,setThinking]=useState(false);
  const topics=[{name:"General",icon:Sparkles},{name:"Persediaan",icon:PackageSearch},{name:"Pengadaan",icon:BriefcaseBusiness},{name:"Penjualan",icon:TrendingUp},{name:"Distribusi",icon:Truck},{name:"Keuangan",icon:WalletCards}];
  const prompts:Record<string,string[]>={General:["Apa prioritas operasional nasional hari ini?","Ringkas alert kritis dan tindakan yang diperlukan","Wilayah mana yang membutuhkan perhatian direksi?"],Persediaan:["Wilayah mana yang berada di bawah safety stock?","Tampilkan gudang dengan okupansi di atas 90%","Lot mana yang berisiko turun mutu dalam 30 hari?"],Pengadaan:["Bandingkan realisasi pengadaan dengan trajectory","Kanwil mana yang memiliki gap pengadaan terbesar?","Apa risiko pencapaian target pengadaan bulan ini?"],Penjualan:["Bagaimana pencapaian penjualan dan penyaluran YTD?","Program mana yang tertinggal dari target?","Berikan analisis order fulfillment per wilayah"],Distribusi:["Koridor mana yang memiliki risiko OTIF tertinggi?","Apa pengiriman yang terlambat hari ini?","Rekomendasikan mitigasi gangguan rute aktif"],Keuangan:["Jelaskan deviasi biaya supply chain terbesar","Koridor mana yang biaya per tonnya meningkat?","Ringkas dampak finansial exception aktif"]};
  const history=[{title:"Prioritas nasional hari ini",topic:"General",time:"Hari ini · 08:31",messages:6},{title:"Analisis safety stock Papua",topic:"Persediaan",time:"Kemarin · 16:42",messages:9},{title:"Gap pengadaan Jawa Barat",topic:"Pengadaan",time:"Kemarin · 10:18",messages:7},{title:"Risiko OTIF koridor Makassar",topic:"Distribusi",time:"12 Agu · 14:05",messages:11},{title:"Deviasi biaya logistik Kupang",topic:"Keuangan",time:"11 Agu · 09:22",messages:5}];
  const answerFor=(question:string)=>{const lower=question.toLowerCase();if(lower.includes("safety stock")||topic==="Persediaan")return "Berdasarkan snapshot simulasi 08:45 WIB, Kanwil Papua menjadi prioritas: stok beras medium berada pada 68% dari safety stock dengan estimasi defisit 6.240 ton. Tindakan yang disarankan adalah validasi stok tersedia, lock alokasi 6.100 ton, lalu jalankan simulasi redistribusi dari wilayah surplus tanpa melanggar safety stock asal.";if(lower.includes("pengadaan")||topic==="Pengadaan")return "Realisasi pengadaan nasional berada di 78% trajectory. Gap terbesar terdapat di Jawa Barat, yaitu sekitar 18.400 ton pada bulan berjalan. Fokus tindakan: percepat kontrak aktif, verifikasi kesiapan pemasok, dan pantau serapan harian terhadap target pemulihan.";if(lower.includes("otif")||lower.includes("rute")||topic==="Distribusi")return "Koridor Tanjung Perak–Makassar memiliki risiko OTIF tertinggi akibat keterlambatan kapal 19 jam. Prediksi OTIF turun menjadi 82,4% untuk 8.500 ton. Opsi mitigasi terbaik adalah mempertahankan slot bongkar prioritas dan menyiapkan armada drayage sebelum kapal sandar.";if(lower.includes("biaya")||topic==="Keuangan")return "Deviasi terbesar terdapat pada koridor Surabaya–Kupang: biaya per ton naik 14,8% dari baseline dengan potensi dampak Rp1,8 miliar. Perlu validasi komponen BBM, demurrage, dan utilisasi muatan sebelum approval biaya tambahan.";return "Kondisi nasional memerlukan perhatian terarah: 3 alert kritis, 2 kasus melewati SLA, dan sekitar 41.300 ton service at risk. Prioritas hari ini adalah memulihkan safety stock Papua, mengaktifkan overflow plan Bali, serta memitigasi lot NTB yang berisiko turun mutu. Gunakan Alert Center untuk detail dan My Cases untuk tindak lanjut."};
  const ask=(question:string)=>{const clean=question.trim();if(!clean)return;setMessages((old)=>[...old,{role:"user",text:clean,meta:`${topic} · ${activeContext}`}]);setInput("");setThinking(true);window.setTimeout(()=>{setMessages((old)=>[...old,{role:"assistant",text:answerFor(clean),meta:"SCCT AI · berdasarkan data simulasi"}]);setThinking(false)},650)};
  return <section className={`ask-ai-shell ${layout}`} aria-label="Ask AI SCCT"><header><div className="ask-ai-tabs"><button type="button" className={view==="chat"?"active":""} onClick={()=>setView("chat")}>Chat</button><button type="button" className={view==="history"?"active":""} onClick={()=>setView("history")}>History</button></div><div className="ask-ai-tools"><span><i/>Konteks: {activeContext}</span><div><button type="button" className="layout-trigger" onClick={()=>setLayoutMenu(!layoutMenu)} aria-label="Pilih layout Ask AI"><Layers3 size={18}/></button>{layoutMenu&&<div className="ask-ai-layout-menu"><strong>Tampilan Ask AI</strong>{(["sidebar","floating","full"] as AskAILayout[]).map((item)=><button type="button" key={item} className={layout===item?"active":""} onClick={()=>{onLayoutChange(item);setLayoutMenu(false)}}><span className="layout-check" aria-hidden="true">{layout===item&&<Check size={16}/>}</span><span>{item==="sidebar"?"Sidebar":item==="floating"?"Floating":"Full page"}</span></button>)}</div>}</div><button type="button" onClick={onClose} aria-label="Tutup Ask AI"><X size={19}/></button></div></header>
    {view==="history"?<div className="ask-ai-history"><div><h2>Riwayat Percakapan</h2><p>Percakapan terakhir Anda dengan SCCT AI.</p></div><label><Search size={15}/><input placeholder="Cari riwayat…"/></label>{history.map((item)=><button type="button" key={item.title} onClick={()=>{setTopic(item.topic);setView("chat")}}><span><MessageCircle size={16}/></span><div><strong>{item.title}</strong><small>{item.topic} · {item.messages} pesan</small></div><em>{item.time}</em><ChevronRight size={15}/></button>)}</div>:<div className="ask-ai-chat">{messages.length===0?<div className="ask-ai-welcome"><span className="ask-ai-mark"><Sparkles size={28}/></span><h2>Halo, superadmin</h2><p>Apa yang ingin Anda ketahui tentang kondisi supply chain BULOG?</p><div className="ask-ai-context"><Database size={14}/>Saya menggunakan konteks halaman <b>{activeContext}</b> dan data simulasi SCCT.</div><div className="ask-ai-prompts">{prompts[topic].map((prompt)=><button type="button" key={prompt} onClick={()=>ask(prompt)}><ArrowRight size={14}/><span>{prompt}</span></button>)}</div></div>:<div className="ask-ai-messages">{messages.map((message,index)=><article key={`${message.role}-${index}`} className={message.role}><span>{message.role==="assistant"?<Sparkles size={16}/>:<UserRound size={16}/>}</span><div><small>{message.role==="assistant"?"SCCT AI":"Anda"}</small><p>{message.text}</p>{message.meta&&<em>{message.meta}</em>}</div></article>)}{thinking&&<article className="assistant thinking"><span><Sparkles size={16}/></span><div><small>SCCT AI</small><p><i/><i/><i/></p></div></article>}</div>}<footer><div className="ask-ai-topics">{topics.map(({name,icon:Icon})=><button type="button" key={name} className={topic===name?"active":""} onClick={()=>setTopic(name)}><Icon size={14}/>{name}</button>)}</div><div className="ask-ai-composer"><textarea value={input} onChange={(event)=>setInput(event.target.value)} onKeyDown={(event)=>{if(event.key==="Enter"&&!event.shiftKey){event.preventDefault();ask(input)}}} placeholder={`Tanyakan tentang ${topic.toLowerCase()}…`} rows={2}/><button type="button" onClick={()=>ask(input)} disabled={!input.trim()} aria-label="Kirim pertanyaan"><Send size={18}/></button></div><small>SCCT AI dapat membuat kesalahan. Verifikasi rekomendasi sebelum keputusan operasional.</small></footer></div>}
  </section>;
}

type DemoAuthStatus = "checking" | "anonymous" | "authenticated";

function LoginPage({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [username,setUsername]=useState(""); const [password,setPassword]=useState(""); const [showPassword,setShowPassword]=useState(false); const [error,setError]=useState(""); const [submitting,setSubmitting]=useState(false); const [attempts,setAttempts]=useState(0);
  const passwordChecks={length:password.length>=8,lower:/[a-z]/.test(password),number:/\d/.test(password),special:/[^A-Za-z0-9]/.test(password)};
  const passwordValid=Object.values(passwordChecks).every(Boolean);
  async function submit(event:React.FormEvent){event.preventDefault();if(!username.trim()||!passwordValid){setError("Lengkapi username dan persyaratan password.");return}if(attempts>=5){setError("Terlalu banyak percobaan. Muat ulang halaman untuk mencoba kembali.");return}setSubmitting(true);setError("");try{const response=await fetch("/api/demo-auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"login",username,password})});const data=await response.json();if(!response.ok){setAttempts((count)=>count+1);setError(data.error??"Login gagal.");return}onAuthenticated()}catch{setError("Koneksi ke layanan autentikasi gagal. Silakan coba kembali.")}finally{setSubmitting(false)}}
  return <main className="login-page"><section className="login-panel"><div className="login-brand"><span className="brand-mark"><i/><i/><i/></span><strong>bulog</strong></div><div className="login-heading"><span>SUPPLY CHAIN CONTROL TOWER</span><h1>Masuk ke SCCT BULOG</h1><p>Gunakan akun yang telah terdaftar untuk mengakses dashboard nasional.</p></div><form onSubmit={submit} noValidate><label><span>Username</span><div><UserRound size={17}/><input autoComplete="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Masukkan username" required/></div></label><label><span>Password</span><div><ShieldCheck size={17}/><input type={showPassword?"text":"password"} autoComplete="current-password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Masukkan password" required/><button type="button" onClick={()=>setShowPassword(!showPassword)} aria-label={showPassword?"Sembunyikan password":"Tampilkan password"}>{showPassword?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label>{password&&<div className="login-password-checks"><span className={passwordChecks.length?"ok":""}><Check size={11}/>Minimal 8 karakter</span><span className={passwordChecks.lower?"ok":""}><Check size={11}/>Huruf kecil</span><span className={passwordChecks.number?"ok":""}><Check size={11}/>Angka</span><span className={passwordChecks.special?"ok":""}><Check size={11}/>Simbol khusus</span></div>}<div className="login-captcha disabled" aria-disabled="true"><div><ShieldCheck size={18}/><span><b>Verifikasi keamanan</b><small>CAPTCHA dinonaktifkan sementara</small></span></div><div><strong>—</strong><input disabled aria-label="CAPTCHA dinonaktifkan" placeholder="—"/><button type="button" disabled aria-label="Muat ulang CAPTCHA dinonaktifkan"><RotateCw size={16}/></button></div></div>{error&&<div className="login-error" role="alert"><AlertTriangle size={15}/>{error}</div>}<button className="login-submit" type="submit" disabled={submitting}>{submitting?<><RotateCw size={16}/>Memverifikasi…</>:<><ShieldCheck size={16}/>Masuk Aman</>}</button><div className="login-help"><button type="button">Lupa password?</button><span>·</span><button type="button">Hubungi administrator</button></div></form><footer><span><ShieldCheck size={13}/>Koneksi terenkripsi</span><span>Demo SCCT · Akses terbatas</span></footer></section><aside className="login-visual"><div className="login-grid-art"><i/><i/><i/><i/><i/><i/></div><div className="login-visual-content"><span>PERUM BULOG · COMMAND CENTER</span><h2>Satu kendali untuk ketahanan pangan Indonesia</h2><p>Pantau persediaan, pengadaan, penyaluran, distribusi, keuangan, serta exception nasional secara terpadu.</p><div><article><strong>34</strong><span>Kanwil terpantau</span></article><article><strong>24/7</strong><span>Operational monitoring</span></article><article><strong>1</strong><span>National control tower</span></article></div></div><footer>SCCT BULOG · Sistem Demo Terproteksi</footer></aside></main>;
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

type OrgLocationRecord={id:string;name:string;parent:string;region:string;address:string;city:string;type:string;status:string;metric1:string;metric2:string;manager:string;coverage:string;lat:string;lng:string;children:string};
const organizationData:Record<OrganizationLocationMode,OrgLocationRecord[]>={
  regions:[
    {id:"REG-01",name:"Sumatra",parent:"Nasional",region:"Sumatra",address:"10 provinsi",city:"Pusat koordinasi Medan",type:"Region Operasional",status:"Aktif",metric1:"8 Kanwil",metric2:"168 kompleks gudang",manager:"Koordinator Regional Sumatra",coverage:"Aceh–Lampung",lat:"0.5897",lng:"101.3431",children:"8 Kanwil · 62 Kancab"},
    {id:"REG-02",name:"Jawa",parent:"Nasional",region:"Jawa",address:"6 provinsi",city:"Pusat koordinasi Jakarta",type:"Region Operasional",status:"Aktif",metric1:"6 Kanwil",metric2:"354 kompleks gudang",manager:"Koordinator Regional Jawa",coverage:"Banten–Jawa Timur",lat:"-7.6145",lng:"110.7122",children:"6 Kanwil · 94 Kancab"},
    {id:"REG-03",name:"Kalimantan",parent:"Nasional",region:"Kalimantan",address:"5 provinsi",city:"Pusat koordinasi Balikpapan",type:"Region Operasional",status:"Aktif",metric1:"5 Kanwil",metric2:"122 kompleks gudang",manager:"Koordinator Regional Kalimantan",coverage:"Kalbar–Kaltara",lat:"0.9619",lng:"114.5548",children:"5 Kanwil · 31 Kancab"},
    {id:"REG-04",name:"Sulawesi",parent:"Nasional",region:"Sulawesi",address:"6 provinsi",city:"Pusat koordinasi Makassar",type:"Region Operasional",status:"Aktif",metric1:"5 Kanwil",metric2:"188 kompleks gudang",manager:"Koordinator Regional Sulawesi",coverage:"Sulselbar–Gorontalo",lat:"-2.5489",lng:"118.0149",children:"5 Kanwil · 46 Kancab"},
    {id:"REG-05",name:"Bali & Nusa Tenggara",parent:"Nasional",region:"Bali & Nusra",address:"3 provinsi",city:"Pusat koordinasi Denpasar",type:"Region Operasional",status:"Aktif",metric1:"3 Kanwil",metric2:"127 kompleks gudang",manager:"Koordinator Regional Bali Nusra",coverage:"Bali–NTT",lat:"-8.4095",lng:"115.1889",children:"3 Kanwil · 28 Kancab"},
    {id:"REG-06",name:"Maluku",parent:"Nasional",region:"Maluku",address:"2 provinsi",city:"Pusat koordinasi Ambon",type:"Region Operasional",status:"Aktif",metric1:"2 Kanwil",metric2:"62 kompleks gudang",manager:"Koordinator Regional Maluku",coverage:"Maluku–Maluku Utara",lat:"-3.2385",lng:"130.1453",children:"2 Kanwil · 15 Kancab"},
    {id:"REG-07",name:"Papua",parent:"Nasional",region:"Papua",address:"6 provinsi",city:"Pusat koordinasi Jayapura",type:"Region Operasional",status:"Aktif",metric1:"2 Kanwil",metric2:"74 kompleks gudang",manager:"Koordinator Regional Papua",coverage:"Papua Barat–Papua",lat:"-4.2699",lng:"138.0804",children:"2 Kanwil · 19 Kancab"},
  ],
  kanwil:[
    {id:"01001",name:"KANWIL ACEH",parent:"Sumatra",region:"Sumatra",address:"Jl. Teuku Moh. Daud Beureueh, Kuta Alam",city:"Banda Aceh, Aceh",type:"Kantor Wilayah",status:"Aktif",metric1:"7 Kancab",metric2:"42 gudang",manager:"Pemimpin Wilayah Aceh",coverage:"23 kab/kota",lat:"5.5593",lng:"95.3376",children:"7 Kancab · 42 gudang"},
    {id:"02001",name:"KANWIL SUMUT",parent:"Sumatra",region:"Sumatra",address:"Jl. Gatot Subroto No. 180",city:"Medan, Sumatera Utara",type:"Kantor Wilayah",status:"Aktif",metric1:"8 Kancab",metric2:"49 gudang",manager:"Pemimpin Wilayah Sumut",coverage:"33 kab/kota",lat:"3.5952",lng:"98.6722",children:"8 Kancab · 49 gudang"},
    {id:"03001",name:"KANWIL RIAU DAN KEPRI",parent:"Sumatra",region:"Sumatra",address:"Jl. Cut Nyak Dien",city:"Pekanbaru, Riau",type:"Kantor Wilayah",status:"Aktif",metric1:"5 Kancab",metric2:"31 gudang",manager:"Pemimpin Wilayah Riau Kepri",coverage:"17 kab/kota",lat:"0.5071",lng:"101.4478",children:"5 Kancab · 31 gudang"},
    {id:"04001",name:"KANWIL SUMBAR",parent:"Sumatra",region:"Sumatra",address:"Jl. Thamrin No. 24",city:"Padang, Sumatera Barat",type:"Kantor Wilayah",status:"Aktif",metric1:"6 Kancab",metric2:"37 gudang",manager:"Pemimpin Wilayah Sumbar",coverage:"19 kab/kota",lat:"-0.9471",lng:"100.4172",children:"6 Kancab · 37 gudang"},
    {id:"05001",name:"KANWIL JAMBI",parent:"Sumatra",region:"Sumatra",address:"Jl. HOS Cokroaminoto No. 63",city:"Jambi",type:"Kantor Wilayah",status:"Aktif",metric1:"4 Kancab",metric2:"29 gudang",manager:"Pemimpin Wilayah Jambi",coverage:"11 kab/kota",lat:"-1.6101",lng:"103.6131",children:"4 Kancab · 29 gudang"},
    {id:"06001",name:"KANWIL SUMSEL BABEL",parent:"Sumatra",region:"Sumatra",address:"Jl. Perintis Kemerdekaan",city:"Palembang, Sumatera Selatan",type:"Kantor Wilayah",status:"Aktif",metric1:"7 Kancab",metric2:"51 gudang",manager:"Pemimpin Wilayah Sumsel Babel",coverage:"23 kab/kota",lat:"-2.9761",lng:"104.7754",children:"7 Kancab · 51 gudang"},
    {id:"10001",name:"KANWIL DKI JAKARTA & BANTEN",parent:"Jawa",region:"Jawa",address:"Jl. Perintis Kemerdekaan No. 1",city:"Jakarta Utara",type:"Kantor Wilayah",status:"Aktif",metric1:"6 Kancab",metric2:"44 gudang",manager:"Pemimpin Wilayah DKI Banten",coverage:"14 kab/kota",lat:"-6.1754",lng:"106.8272",children:"6 Kancab · 44 gudang"},
    {id:"11001",name:"KANWIL JAWA BARAT",parent:"Jawa",region:"Jawa",address:"Jl. Soekarno Hatta No. 711A",city:"Bandung, Jawa Barat",type:"Kantor Wilayah",status:"Aktif",metric1:"12 Kancab",metric2:"86 gudang",manager:"Pemimpin Wilayah Jawa Barat",coverage:"27 kab/kota",lat:"-6.9175",lng:"107.6191",children:"12 Kancab · 86 gudang"},
    {id:"12001",name:"KANWIL JAWA TENGAH",parent:"Jawa",region:"Jawa",address:"Jl. Menteri Supeno I/1",city:"Semarang, Jawa Tengah",type:"Kantor Wilayah",status:"Aktif",metric1:"13 Kancab",metric2:"97 gudang",manager:"Pemimpin Wilayah Jawa Tengah",coverage:"35 kab/kota",lat:"-6.9667",lng:"110.4167",children:"13 Kancab · 97 gudang"},
    {id:"13001",name:"KANWIL JAWA TIMUR",parent:"Jawa",region:"Jawa",address:"Jl. Ahmad Yani No. 146–148",city:"Surabaya, Jawa Timur",type:"Kantor Wilayah",status:"Aktif",metric1:"13 Kancab",metric2:"104 gudang",manager:"Pemimpin Wilayah Jawa Timur",coverage:"38 kab/kota",lat:"-7.2575",lng:"112.7521",children:"13 Kancab · 104 gudang"},
  ],
  kancab:[
    {id:"01010",name:"KANCAB LHOKSEUMAWE",parent:"KANWIL ACEH",region:"Sumatra",address:"Jl. Iskandar Muda No. 20",city:"Lhokseumawe, Aceh",type:"Kantor Cabang",status:"Aktif",metric1:"9 gudang",metric2:"Kapasitas 42.500 ton",manager:"Pemimpin Cabang Lhokseumawe",coverage:"Aceh Utara · Lhokseumawe",lat:"5.1801",lng:"97.1507",children:"9 gudang · 126 titik penyaluran"},
    {id:"01020",name:"KANCAB LANGSA",parent:"KANWIL ACEH",region:"Sumatra",address:"Jl. Ahmad Yani",city:"Langsa, Aceh",type:"Kantor Cabang",status:"Aktif",metric1:"6 gudang",metric2:"Kapasitas 28.000 ton",manager:"Pemimpin Cabang Langsa",coverage:"Aceh Timur · Langsa",lat:"4.4725",lng:"97.9756",children:"6 gudang · 84 titik penyaluran"},
    {id:"01030",name:"KANCAB MEULABOH",parent:"KANWIL ACEH",region:"Sumatra",address:"Jl. Nasional Meulaboh",city:"Aceh Barat",type:"Kantor Cabang",status:"Aktif",metric1:"5 gudang",metric2:"Kapasitas 22.500 ton",manager:"Pemimpin Cabang Meulaboh",coverage:"Aceh Barat · Nagan Raya",lat:"4.1448",lng:"96.1266",children:"5 gudang · 71 titik penyaluran"},
    {id:"02010",name:"KANCAB MEDAN",parent:"KANWIL SUMUT",region:"Sumatra",address:"Jl. Yos Sudarso",city:"Medan, Sumatera Utara",type:"Kantor Cabang",status:"Aktif",metric1:"11 gudang",metric2:"Kapasitas 68.000 ton",manager:"Pemimpin Cabang Medan",coverage:"Medan · Deli Serdang",lat:"3.5952",lng:"98.6722",children:"11 gudang · 203 titik penyaluran"},
    {id:"02060",name:"KANCAB PEMATANG SIANTAR",parent:"KANWIL SUMUT",region:"Sumatra",address:"Jl. Medan Km 4",city:"Pematang Siantar",type:"Kantor Cabang",status:"Aktif",metric1:"7 gudang",metric2:"Kapasitas 36.500 ton",manager:"Pemimpin Cabang Pematang Siantar",coverage:"Simalungun · Siantar",lat:"2.9700",lng:"99.0682",children:"7 gudang · 93 titik penyaluran"},
    {id:"05040",name:"KANCAB SARKO",parent:"KANWIL JAMBI",region:"Sumatra",address:"Jl. Lintas Sumatera",city:"Sarolangun, Jambi",type:"Kantor Cabang",status:"Aktif",metric1:"4 gudang",metric2:"Kapasitas 30.000 ton",manager:"Pemimpin Cabang Sarko",coverage:"Sarolangun · Merangin",lat:"-2.3036",lng:"102.7277",children:"4 gudang · 58 titik penyaluran"},
    {id:"11120",name:"KANCAB INDRAMAYU",parent:"KANWIL JAWA BARAT",region:"Jawa",address:"Jl. Raya Losarang",city:"Indramayu, Jawa Barat",type:"Kantor Cabang",status:"Aktif",metric1:"12 gudang",metric2:"Kapasitas 142.000 ton",manager:"Pemimpin Cabang Indramayu",coverage:"Indramayu · Subang",lat:"-6.3373",lng:"108.3258",children:"12 gudang · 186 titik penyaluran"},
    {id:"13110",name:"KANCAB SURABAYA UTARA",parent:"KANWIL JAWA TIMUR",region:"Jawa",address:"Jl. Margomulyo",city:"Surabaya, Jawa Timur",type:"Kantor Cabang",status:"Aktif",metric1:"10 gudang",metric2:"Kapasitas 118.000 ton",manager:"Pemimpin Cabang Surabaya Utara",coverage:"Surabaya · Gresik",lat:"-7.2575",lng:"112.7521",children:"10 gudang · 244 titik penyaluran"},
  ],
  warehouses:[
    {id:"GDG-ACE-001",name:"Kompleks Pergudangan Ulee Blang Mane",parent:"KANCAB LHOKSEUMAWE",region:"Sumatra",address:"Jl. Banda Aceh–Medan, Blang Mangat",city:"Lhokseumawe, Aceh",type:"Kompleks Gudang",status:"Operasional",metric1:"Kapasitas 42.000 ton",metric2:"Stok 33.460 ton · 79,7%",manager:"Kepala Gudang Ulee Blang Mane",coverage:"9 unit gudang",lat:"5.1176",lng:"97.1745",children:"9 unit · 14 CCTV"},
    {id:"GDG-ACE-014",name:"Kompleks Pergudangan Seuriget",parent:"KANCAB LANGSA",region:"Sumatra",address:"Seuriget, Langsa Barat",city:"Langsa, Aceh",type:"Kompleks Gudang",status:"Operasional",metric1:"Kapasitas 24.000 ton",metric2:"Stok 18.920 ton · 78,8%",manager:"Kepala Gudang Seuriget",coverage:"6 unit gudang",lat:"4.4725",lng:"97.9756",children:"6 unit · 10 CCTV"},
    {id:"GDG-JMB-041",name:"Gudang Konsinyasi 05040 – Kancab Sarko",parent:"KANCAB SARKO",region:"Sumatra",address:"Jl. Kapten Pattimura, Sarolangun",city:"Sarolangun, Jambi",type:"Gudang Konsinyasi",status:"Operasional",metric1:"Kapasitas 30.000 ton",metric2:"Stok 19.840 ton · 66,1%",manager:"Kepala Gudang Sarko",coverage:"4 unit gudang",lat:"-2.3036",lng:"102.7277",children:"4 unit · 8 CCTV"},
    {id:"GDG-SUM-067",name:"Kompleks Pergudangan Lumban Pea",parent:"KANCAB PEMATANG SIANTAR",region:"Sumatra",address:"Lumban Pea, Balige",city:"Toba, Sumatera Utara",type:"Kompleks Gudang",status:"Operasional",metric1:"Kapasitas 28.500 ton",metric2:"Stok 21.100 ton · 74,0%",manager:"Kepala Gudang Lumban Pea",coverage:"7 unit gudang",lat:"2.3337",lng:"99.0833",children:"7 unit · 12 CCTV"},
    {id:"GDG-JBR-122",name:"Kompleks Pergudangan Losarang",parent:"KANCAB INDRAMAYU",region:"Jawa",address:"Jl. Raya Pantura Losarang",city:"Indramayu, Jawa Barat",type:"Kompleks Gudang",status:"Operasional",metric1:"Kapasitas 96.000 ton",metric2:"Stok 88.420 ton · 92,1%",manager:"Kepala Gudang Losarang",coverage:"12 unit gudang",lat:"-6.3936",lng:"108.1886",children:"12 unit · 24 CCTV"},
    {id:"GDG-JTM-205",name:"Kompleks Pergudangan Banjar Kemantren",parent:"KANCAB SURABAYA UTARA",region:"Jawa",address:"Buduran, Sidoarjo",city:"Sidoarjo, Jawa Timur",type:"Kompleks Gudang",status:"Operasional",metric1:"Kapasitas 82.000 ton",metric2:"Stok 74.580 ton · 90,9%",manager:"Kepala Gudang Banjar Kemantren",coverage:"10 unit gudang",lat:"-7.4286",lng:"112.7237",children:"10 unit · 20 CCTV"},
  ],
  distributionPoints:[
    {id:"TP-SPHP-11021",name:"RPK Pangan Kita Pasar Induk Cipinang",parent:"KANCAB JAKARTA",region:"Jawa",address:"Pasar Induk Beras Cipinang",city:"Jakarta Timur",type:"RPK / SPHP",status:"Aktif",metric1:"Kuota 420 ton/bulan",metric2:"Realisasi 91,4%",manager:"PT Pangan Kita Sejahtera",coverage:"12 kelurahan",lat:"-6.2146",lng:"106.9004",children:"Outlet ritel · HET tervalidasi"},
    {id:"TP-SPHP-13108",name:"Gerakan Pangan Murah Surabaya",parent:"KANCAB SURABAYA UTARA",region:"Jawa",address:"Pasar Tambahrejo",city:"Surabaya, Jawa Timur",type:"GPM / Pemda",status:"Aktif",metric1:"Kuota 180 ton/bulan",metric2:"Realisasi 86,7%",manager:"Dinas Ketahanan Pangan Surabaya",coverage:"8 kecamatan",lat:"-7.2575",lng:"112.7521",children:"Program SPHP · 34 outlet"},
    {id:"TP-BPNT-01044",name:"Agen Pangan Ulee Kareng",parent:"KANCAB LHOKSEUMAWE",region:"Sumatra",address:"Ulee Kareng",city:"Banda Aceh, Aceh",type:"Mitra Penyalur",status:"Aktif",metric1:"Kuota 95 ton/bulan",metric2:"Realisasi 97,2%",manager:"Koperasi Aceh Pangan",coverage:"6 kecamatan",lat:"5.5483",lng:"95.3530",children:"2.840 penerima layanan"},
    {id:"TP-SPHP-02071",name:"RPK Koperasi Pasar Petisah",parent:"KANCAB MEDAN",region:"Sumatra",address:"Pasar Petisah",city:"Medan, Sumatera Utara",type:"RPK / SPHP",status:"Watch",metric1:"Kuota 160 ton/bulan",metric2:"Realisasi 67,4%",manager:"Koperasi Pedagang Petisah",coverage:"5 kecamatan",lat:"3.5902",lng:"98.6670",children:"Gap 52 ton · action aktif"},
    {id:"TP-PROG-27119",name:"Outlet Program Pangan Kendari",parent:"KANCAB KENDARI",region:"Sulawesi",address:"Pasar Baruga",city:"Kendari, Sulawesi Tenggara",type:"Program Pemerintah",status:"Aktif",metric1:"Kuota 210 ton/bulan",metric2:"Realisasi 89,5%",manager:"Satgas Pangan Sultra",coverage:"11 kecamatan",lat:"-3.9985",lng:"122.5120",children:"SPHP · bantuan pangan"},
    {id:"TP-SPHP-33017",name:"RPK Hamadi Jayapura",parent:"KANCAB JAYAPURA",region:"Papua",address:"Pasar Hamadi",city:"Jayapura, Papua",type:"RPK / SPHP",status:"At Risk",metric1:"Kuota 125 ton/bulan",metric2:"Realisasi 61,6%",manager:"Koperasi Hamadi",coverage:"4 distrik",lat:"-2.5916",lng:"140.6689",children:"Shortage 48 ton · redistribusi"},
  ],
};
const warehouseCameras=[
  {id:"CCTV-01",name:"Gerbang Utama",zone:"Perimeter",status:"Online",people:3,vehicle:"1 truk masuk",insight:"Plat kendaraan terbaca · akses terotorisasi",tone:"blue"},
  {id:"CCTV-02",name:"Loading Bay A",zone:"Bongkar muat",status:"Online",people:8,vehicle:"2 truk aktif",insight:"Dwell time 37 menit · normal",tone:"orange"},
  {id:"CCTV-03",name:"Loading Bay B",zone:"Bongkar muat",status:"Alert",people:4,vehicle:"1 forklift",insight:"Jalur evakuasi terhalang pallet",tone:"red"},
  {id:"CCTV-04",name:"Gudang Unit 3",zone:"Penyimpanan",status:"Online",people:2,vehicle:"Tidak ada",insight:"PPE compliance 100% · tidak ada asap",tone:"green"},
  {id:"CCTV-05",name:"Gudang Unit 7",zone:"Penyimpanan",status:"Online",people:0,vehicle:"Tidak ada",insight:"Tidak ada pergerakan anomali",tone:"purple"},
  {id:"CCTV-06",name:"Timbangan",zone:"Weighbridge",status:"Degraded",people:2,vehicle:"1 truk keluar",insight:"Frame drop 8% · perlu cek jaringan",tone:"gray"},
];

function OrganizationLocationPage({mode,onSwitch,onNotify}:{mode:OrganizationLocationMode;onSwitch:(mode:OrganizationLocationMode)=>void;onNotify:(message:string)=>void}){
  const [query,setQuery]=useState("");const [regionFilter,setRegionFilter]=useState("Semua wilayah");const [selected,setSelected]=useState<OrgLocationRecord|null>(null);const [camera,setCamera]=useState(warehouseCameras[0]);
  const tabs:[OrganizationLocationMode,string][]=[["regions","Wilayah"],["kanwil","Kanwil"],["kancab","Kancab"],["warehouses","Gudang"],["distributionPoints","Titik Penyaluran"]];
  const meta:Record<OrganizationLocationMode,{title:string;description:string;count:string}>={regions:{title:"Wilayah",description:"Pengelompokan regional operasional untuk koordinasi jaringan BULOG secara nasional.",count:"7"},kanwil:{title:"Kantor Wilayah (Kanwil)",description:"Master Kantor Wilayah beserta cakupan layanan, organisasi turunan, kapasitas, dan lokasi.",count:"30"},kancab:{title:"Kantor Cabang (Kancab)",description:"Jaringan kantor cabang dan cabang pembantu yang mengelola gudang serta operasi tingkat kabupaten/kota.",count:"258"},warehouses:{title:"Gudang",description:"Master kompleks pergudangan, kapasitas, utilisasi, kondisi operasi, perangkat IoT, dan monitoring CCTV.",count:"1.195"},distributionPoints:{title:"Titik Penyaluran",description:"Jaringan RPK, pasar, mitra pengecer, GPM, dan outlet program untuk penyaluran pangan BULOG.",count:"8.462"}};
  const rows=organizationData[mode].filter(r=>(regionFilter==="Semua wilayah"||r.region===regionFilter)&&(r.name.toLowerCase().includes(query.toLowerCase())||r.id.toLowerCase().includes(query.toLowerCase())||r.city.toLowerCase().includes(query.toLowerCase())));
  const mapSrc=(r:OrgLocationRecord)=>`https://www.google.com/maps?q=${encodeURIComponent(`${r.lat},${r.lng}`)}&z=14&output=embed`;
  if(selected)return <main className="org-location-page org-detail-page"><header className="org-detail-header"><button onClick={()=>setSelected(null)} aria-label="Kembali ke daftar"><ArrowLeft size={18}/></button><div><span>MASTER DATA / ORGANISASI & LOKASI / {meta[mode].title.toUpperCase()}</span><h1>{selected.name}</h1><p>{selected.id} · {selected.type} · sinkron 19 Agustus 2026 09:30 WIB</p></div><a href={`https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`} target="_blank" rel="noreferrer"><MapPin size={15}/> Buka di Google Maps</a></header><section className="org-detail-overview"><div className="org-info-stack"><article><header><Database size={18}/><h2>Identitas & hierarki</h2></header><dl><div><dt>Kode</dt><dd>{selected.id}</dd></div><div><dt>Nama</dt><dd>{selected.name}</dd></div><div><dt>Induk organisasi</dt><dd>{selected.parent}</dd></div><div><dt>Jenis</dt><dd>{selected.type}</dd></div><div><dt>Status</dt><dd><em className={selected.status.toLowerCase().replace(" ","-")}>{selected.status}</em></dd></div><div><dt>Pimpinan/Pengelola</dt><dd>{selected.manager}</dd></div></dl></article><article><header><MapPinned size={18}/><h2>Cakupan & lokasi</h2></header><dl><div><dt>Region</dt><dd>{selected.region}</dd></div><div><dt>Kota/Provinsi</dt><dd>{selected.city}</dd></div><div className="wide"><dt>Alamat</dt><dd>{selected.address}</dd></div><div><dt>Cakupan layanan</dt><dd>{selected.coverage}</dd></div><div><dt>Unit turunan</dt><dd>{selected.children}</dd></div><div><dt>Indikator utama</dt><dd>{selected.metric1}</dd></div><div><dt>Kinerja/Kapasitas</dt><dd>{selected.metric2}</dd></div></dl></article></div><article className="org-map-card"><header><h2><MapPin size={18}/> Lokasi di peta</h2><span>{selected.lat}, {selected.lng}</span></header><iframe src={mapSrc(selected)} title={`Lokasi ${selected.name}`} loading="lazy"/></article></section>{mode==="warehouses"&&<><section className="warehouse-operational-kpis"><article><span>Kapasitas</span><strong>{selected.metric1.replace("Kapasitas ","")}</strong><small>Sumber WMS</small></article><article><span>Stok & utilisasi</span><strong>{selected.metric2.replace("Stok ","")}</strong><small>Cut-off 08:30 WIB</small></article><article><span>CCTV online</span><strong>12 / 14</strong><small>1 alert · 1 degraded</small></article><article><span>Keamanan AI</span><strong>96,8%</strong><small>PPE compliance</small></article><article><span>Lingkungan</span><strong>28,4°C · RH 67%</strong><small>Dalam guardrail</small></article></section><section className="cctv-section"><header><div><span>VIDEO ANALYTICS / MULTI CCTV</span><h2>Monitoring CCTV & computer vision insights</h2><p>Deteksi keselamatan, keamanan, arus kendaraan, kepatuhan PPE, api/asap, dan hambatan operasional.</p></div><div><i/> Live · 09:34:18 WIB <button onClick={()=>onNotify("Tampilan CCTV layar penuh dibuka")}><Maximize size={15}/></button></div></header><div className="cctv-layout"><div className="cctv-grid">{warehouseCameras.map(c=><button key={c.id} className={camera.id===c.id?"selected":""} onClick={()=>setCamera(c)}><div className={`camera-scene ${c.tone}`}><span className="camera-live"><i/> {c.status}</span><span className="camera-time">CAM {c.id.slice(-2)} · 09:34:{12+Number(c.id.slice(-1))}</span><span className="camera-building"/><span className="camera-ground"/><span className="camera-truck"/><span className="camera-person p1"/><span className="camera-person p2"/>{c.status==="Alert"&&<em>OBJECT ALERT</em>}</div><footer><span><strong>{c.name}</strong><small>{c.zone}</small></span><em className={c.status.toLowerCase()}>{c.status}</em></footer></button>)}</div><aside className="camera-insight-panel"><header><Camera size={19}/><div><span>SELECTED CAMERA</span><h3>{camera.name}</h3><small>{camera.id} · {camera.zone}</small></div></header><div className="camera-confidence"><span>AI confidence</span><strong>94,7%</strong><i><b/></i></div><dl><div><dt><Users size={14}/> Orang terdeteksi</dt><dd>{camera.people}</dd></div><div><dt><Truck size={14}/> Kendaraan</dt><dd>{camera.vehicle}</dd></div><div><dt><ShieldCheck size={14}/> PPE compliance</dt><dd>{camera.status==="Alert"?"87,5%":"100%"}</dd></div><div><dt><AlertTriangle size={14}/> Safety insight</dt><dd>{camera.insight}</dd></div></dl><h4>Insight sistem</h4><article className={camera.status==="Alert"?"alert":""}><Sparkles size={16}/><p>{camera.insight}. {camera.status==="Alert"?"Disarankan mengirim tugas kepada petugas shift dan verifikasi dalam 10 menit.":"Tidak ada tindakan kritis. Sistem tetap memantau pola pergerakan dan kondisi zona."}</p></article>{camera.status==="Alert"&&<button onClick={()=>onNotify("Case keselamatan dibuat dan dikirim ke My Cases")}><Plus size={14}/> Buat case</button>}<h4>Kesehatan perangkat</h4><p className="camera-health"><Wifi size={14}/><span>Stream {camera.status==="Degraded"?"2,1":"4,8"} Mbps · latency {camera.status==="Degraded"?"860":"142"} ms</span></p><p className="camera-health"><Database size={14}/><span>Retention 30 hari · rekaman terenkripsi</span></p></aside></div></section><section className="vision-events"><header><div><span>AI EVENT LOG</span><h2>Peristiwa CCTV hari ini</h2></div><button onClick={()=>onNotify("Riwayat video analytics diekspor")}><Download size={14}/> Ekspor</button></header>{[["09:31:42","Loading Bay B","Safety obstruction","High","Pallet menutup 32% jalur evakuasi","Open"],["09:18:09","Gerbang Utama","Vehicle access","Info","BK 8732 AD terverifikasi DO-260819-041","Closed"],["08:47:33","Gudang Unit 3","PPE compliance","Medium","1 pekerja tanpa rompi selama 42 detik","Verified"],["08:12:18","Timbangan","Camera health","Medium","Frame drop di atas threshold 5%","Assigned"]].map(e=><article key={e[0]}>{e.map((v,i)=>i===3?<em className={v.toLowerCase()} key={v}>{v}</em>:i===5?<b key={v}>{v}</b>:<span key={v}>{v}</span>)}</article>)}</section></>} {mode==="distributionPoints"&&<section className="distribution-point-detail"><article><header><Target size={18}/><h2>Kinerja penyaluran</h2></header><div><span>Kuota bulan berjalan<strong>{selected.metric1.replace("Kuota ","")}</strong></span><span>Realisasi<strong>{selected.metric2.replace("Realisasi ","")}</strong></span><span>Coverage<strong>{selected.coverage}</strong></span><span>Validasi HET<strong>Compliant</strong></span></div></article><article><header><ShieldCheck size={18}/><h2>Compliance & layanan</h2></header><p><CheckCircle2 size={15}/> Identitas mitra dan NIB tervalidasi</p><p><CheckCircle2 size={15}/> Harga jual terakhir sesuai HET</p><p><CheckCircle2 size={15}/> Geotag dan bukti serah tersedia</p><p><CheckCircle2 size={15}/> Tidak ada transaksi duplikat 30 hari</p></article></section>}<p className="org-location-disclaimer"><AlertTriangle size={15}/> Data lokasi dan operasional pada prototipe bersifat demonstrasi realistis. Integrasi produksi harus memakai Master Data BULOG, GIS terverifikasi, WMS, IoT, VMS/CCTV, serta RBAC untuk akses video.</p></main>;
  return <main className="org-location-page"><header className="org-location-header"><div><span>MASTER DATA / ORGANISASI & LOKASI</span><h1>{meta[mode].title}</h1><p>{meta[mode].description}</p></div><div className="org-location-updated"><i/><span><small>MASTER DATA TERAKHIR</small><strong>19 Agustus 2026 · 09:30 WIB</strong></span><button onClick={()=>onNotify("Master data lokasi disinkronkan")}><RotateCw size={15}/></button></div></header><nav className="org-location-tabs">{tabs.map(([id,label])=><button key={id} className={mode===id?"active":""} onClick={()=>onSwitch(id)}>{label}</button>)}</nav><section className="org-location-kpis"><article><span>Total {meta[mode].title}</span><strong>{meta[mode].count}</strong><small>record nasional</small></article><article><span>Status aktif</span><strong>{mode==="distributionPoints"?"8.127":mode==="warehouses"?"1.168":mode==="kancab"?"252":meta[mode].count}</strong><small>{mode==="warehouses"?"97,7% operasional":"data tervalidasi"}</small></article><article><span>Geotag lengkap</span><strong>{mode==="warehouses"?"98,4%":"99,1%"}</strong><small>koordinat tervalidasi</small></article><article><span>Data quality</span><strong>98,7%</strong><small>completeness score</small></article>{mode==="warehouses"&&<article><span>CCTV terhubung</span><strong>8.462</strong><small>92,6% online</small></article>}</section><section className="org-location-tools"><label><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={`Cari kode, nama ${meta[mode].title.toLowerCase()}, atau kota...`}/></label><select value={regionFilter} onChange={e=>setRegionFilter(e.target.value)}><option>Semua wilayah</option><option>Sumatra</option><option>Jawa</option><option>Kalimantan</option><option>Sulawesi</option><option>Bali & Nusra</option><option>Maluku</option><option>Papua</option></select><select><option>Semua status</option><option>Aktif</option><option>Operasional</option><option>Watch</option><option>At Risk</option></select>{mode==="warehouses"&&<select><option>Urutkan: Nama</option><option>Kapasitas tertinggi</option><option>Utilisasi tertinggi</option><option>CCTV alert</option></select>}<button onClick={()=>onNotify(`Data ${meta[mode].title} diekspor`)}><Download size={15}/> Ekspor</button></section><section className="org-location-list"><header><div><span>MASTER RECORDS</span><h2>Daftar {meta[mode].title}</h2></div><small>Menampilkan {rows.length} dari {meta[mode].count} record</small></header><div className="org-list-head"><span>Kode / Nama</span><span>Hierarki / Region</span><span>Lokasi</span><span>{mode==="distributionPoints"?"Jenis / Pengelola":"Jenis / Pimpinan"}</span><span>Kapasitas / Indikator</span><span>Status</span><span/></div>{rows.map(r=><button key={r.id} onClick={()=>setSelected(r)}><span><strong>{r.name}</strong><small>{r.id}</small></span><span><strong>{r.parent}</strong><small>{r.region}</small></span><span><strong>{r.city}</strong><small>{r.address}</small></span><span><strong>{r.type}</strong><small>{r.manager}</small></span><span><strong>{r.metric1}</strong><small>{r.metric2}</small></span><em className={r.status.toLowerCase().replace(" ","-")}>{r.status}</em><Eye size={16}/></button>)}<footer><span>Showing 1–{rows.length} of {meta[mode].count}</span><div><button disabled><ChevronLeft size={15}/></button><button className="active">1</button><button>2</button><button>3</button><button><ChevronRight size={15}/></button></div></footer></section><p className="org-location-disclaimer"><AlertTriangle size={15}/> Master data demonstrasi mengikuti struktur Wilayah → Kanwil → Kancab → Gudang/Titik Penyaluran. Produksi wajib memakai kode organisasi resmi, koordinat tervalidasi, dan workflow perubahan berotorisasi.</p></main>
}

const executiveReportKpis=[
  {domain:"Persediaan",actual:"5.252.664,64 ton",target:"4,80 jt ton",achievement:109.4,status:"On Track",note:"Okupansi gudang 92,23%",color:"#247a59"},
  {domain:"Pengadaan",actual:"2,85 jt ton",target:"3,63 jt ton",achievement:78.5,status:"At Risk",note:"Gap 780 ribu ton",color:"#c24b38"},
  {domain:"Penjualan & Penyaluran",actual:"3,91 jt ton",target:"4,44 jt ton",achievement:88.1,status:"Watch",note:"Gap 530 ribu ton",color:"#d69317"},
  {domain:"Distribusi",actual:"82,4% OTIF",target:"≥ 95%",achievement:86.7,status:"At Risk",note:"3 koridor prioritas",color:"#c24b38"},
  {domain:"Keuangan",actual:"Rp31,60 T",target:"Rp34,20 T",achievement:92.4,status:"Watch",note:"Gap Rp2,60 T",color:"#d69317"},
];
const executiveExceptions=[
  {severity:"Critical",title:"Stok beras medium di bawah safety stock",scope:"Kanwil Papua · Persediaan",value:"68% dari minimum",owner:"Divisi Persediaan",sla:"1j 38m",action:"Redistribusi 8.500 ton"},
  {severity:"Critical",title:"Lot CBP berisiko turun mutu",scope:"Kanwil NTB · Quality",value:"45.200 ton · Rp497 M",owner:"Quality Control",sla:"3j 12m",action:"FEFO & inspeksi"},
  {severity:"High",title:"Realisasi pengadaan di bawah trajectory",scope:"Kanwil Jawa Barat · Pengadaan",value:"78% dari target",owner:"Divisi Pengadaan",sla:"5j 05m",action:"Recovery plan 118.000 ton"},
  {severity:"High",title:"OTIF koridor Surabaya–Kupang",scope:"Jawa Timur → NTT · Distribusi",value:"82,4% · delay 19 jam",owner:"Divisi Distribusi",sla:"6j 14m",action:"Aktivasi rute alternatif"},
];
const reportHistory=[
  {id:"RPT-260818-001",name:"Executive Daily Brief — 18 Agustus 2026",type:"Harian",period:"18 Agu 2026",owner:"SCCT Report Service",generated:"18 Agu · 06:05",recipients:"Direksi · 12 penerima",format:"PDF + XLSX",status:"Terkirim"},
  {id:"RPT-260817-007",name:"Executive Weekly Review — Minggu 33",type:"Mingguan",period:"11–17 Agu 2026",owner:"Sekretariat Direksi",generated:"17 Agu · 18:15",recipients:"Direksi & Kadiv · 28",format:"PDF + PPTX",status:"Terkirim"},
  {id:"RPT-260801-004",name:"Supply Chain Performance — Juli 2026",type:"Bulanan",period:"1–31 Jul 2026",owner:"Corporate Planning",generated:"1 Agu · 08:12",recipients:"Direksi & Dewas · 18",format:"PDF + XLSX",status:"Disahkan"},
  {id:"RPT-260731-019",name:"CBP Aging & Quality Exposure",type:"Khusus",period:"Juli 2026",owner:"Divisi Persediaan",generated:"31 Jul · 15:40",recipients:"SCM & QA · 9",format:"PDF",status:"Diarsipkan"},
];

function ReportHeader({title,description,onNotify}:{title:string;description:string;onNotify:(message:string)=>void}){return <header className="report-header"><div><span>REPORT & GOVERNANCE / EXECUTIVE REPORT</span><h1>{title}</h1><p>{description}</p></div><div className="report-header-actions"><span><i/><small>Data konsolidasi terakhir</small><strong>18 Agustus 2026 · 09:30 WIB</strong></span><button onClick={()=>onNotify("Laporan diekspor ke PDF dan XLSX")}><Download size={15}/> Ekspor</button><button onClick={()=>onNotify("Snapshot aman dibagikan ke penerima berizin")}><Share2 size={15}/> Bagikan</button></div></header>}

function ReportKpiGrid(){return <section className="report-kpi-grid">{executiveReportKpis.map(k=><article key={k.domain}><header><span>{k.domain}</span><em className={k.status.toLowerCase().replace(" ","-")}>{k.status}</em></header><strong>{k.actual}</strong><small>Target {k.target}</small><i><b style={{width:`${Math.min(k.achievement,100)}%`,background:k.color}}/></i><footer><b>{k.achievement.toLocaleString("id-ID")}% tercapai</b><span>{k.note}</span></footer></article>)}</section>}

function ExecutiveReportPage({mode,onSwitch,onNotify}:{mode:ExecutiveReportMode;onSwitch:(mode:ExecutiveReportMode)=>void;onNotify:(message:string)=>void}){
  const [selectedHistory,setSelectedHistory]=useState(reportHistory[0]);const [detailOpen,setDetailOpen]=useState(false);const [selectedModules,setSelectedModules]=useState(["Persediaan","Pengadaan","Penjualan & Penyaluran","Distribusi","Keuangan","Alert & Exception"]);const [reportTitle,setReportTitle]=useState("Executive Supply Chain Review");
  const tabs:[ExecutiveReportMode,string][]=[["snapshot","Executive Snapshot"],["daily","Laporan Harian"],["weekly","Laporan Mingguan"],["monthly","Laporan Bulanan"],["builder","Report Builder"],["scheduled","Laporan Terjadwal"],["history","Riwayat Laporan"]];
  const meta:Record<ExecutiveReportMode,{title:string;description:string}>={snapshot:{title:"Executive Snapshot",description:"Ringkasan satu layar kondisi rantai pasok nasional, prioritas hari ini, dan keputusan yang membutuhkan perhatian Direksi."},daily:{title:"Laporan Harian",description:"Posisi operasional cut-off harian untuk stok, serapan, penyaluran, pengiriman, kas, exception, dan action owner."},weekly:{title:"Laporan Mingguan",description:"Performa tujuh hari, perubahan risiko, tren KPI, dan komitmen tindak lanjut lintas fungsi."},monthly:{title:"Laporan Bulanan",description:"Capaian bulan berjalan dan year-to-date terhadap RKAP, target pelayanan, efisiensi, serta outcome keputusan."},builder:{title:"Report Builder",description:"Susun laporan eksekutif dari satu semantic layer SCCT agar definisi KPI dan sumber datanya tetap konsisten."},scheduled:{title:"Laporan Terjadwal",description:"Kelola jadwal, cut-off, format, penerima, klasifikasi, dan delivery laporan otomatis."},history:{title:"Riwayat Laporan",description:"Katalog versi laporan yang pernah diterbitkan lengkap dengan approval, distribusi, checksum, dan masa retensi."}};
  const toggleModule=(m:string)=>setSelectedModules(v=>v.includes(m)?v.filter(x=>x!==m):[...v,m]);
  const schedules=[
    {name:"Executive Daily Brief",cadence:"Setiap hari · 06:00 WIB",cutoff:"D-1 · 23:59",owner:"SCCT Command Center",recipient:"Direksi · Kadiv terkait",format:"PDF + tautan dashboard",next:"19 Agu · 06:00",status:"Aktif"},
    {name:"Weekly Supply Chain Review",cadence:"Senin · 07:30 WIB",cutoff:"Minggu · 23:59",owner:"Sekretariat Direksi",recipient:"Direksi · Kadiv · Pemwil",format:"PDF + PPTX",next:"24 Agu · 07:30",status:"Aktif"},
    {name:"Monthly Performance Pack",cadence:"Tanggal 1 · 08:00 WIB",cutoff:"EOM · 23:59",owner:"Corporate Planning",recipient:"Direksi · Dewas",format:"PDF + XLSX",next:"1 Sep · 08:00",status:"Aktif"},
    {name:"Quality & Aging Watchlist",cadence:"Rabu · 10:00 WIB",cutoff:"Rabu · 08:00",owner:"Divisi Persediaan",recipient:"SCM · QA · Kanwil risiko",format:"PDF",next:"19 Agu · 10:00",status:"Paused"},
  ];
  const periodCopy=mode==="daily"?{label:"SELASA, 18 AGUSTUS 2026",headline:"Operasi nasional stabil, namun empat exception memerlukan keputusan hari ini.",delta:"+3 alert dibanding kemarin",trend:[78,82,81,85,84,88,86],summary:"Persediaan nasional berada di atas baseline, sementara Papua membutuhkan redistribusi dan NTB memerlukan intervensi mutu. Pengadaan masih tertinggal 22% dari target YTD."}:mode==="weekly"?{label:"MINGGU 33 · 11–17 AGUSTUS 2026",headline:"Service level membaik 1,8 poin, tetapi recovery pengadaan belum mengejar trajectory.",delta:"12 action selesai · 4 carry-over",trend:[74,76,79,81,80,83,85],summary:"Penyaluran tumbuh didorong SPHP Sumut. OTIF tertahan keterlambatan dua koridor laut. Nilai loss avoided dari tindakan mutu dan redistribusi mencapai Rp6,8 miliar."}:{label:"JULI 2026 · YEAR TO DATE",headline:"Tiga dari lima KPI utama mendekati target; pengadaan dan OTIF menjadi fokus bulan berikutnya.",delta:"Health score 78 · Watch",trend:[68,70,72,73,75,76,78],summary:"Stok CBP memadai secara nasional dengan konsentrasi tinggi di Jawa. Pendapatan mencapai 92,4% target dan gap pengadaan YTD sebesar 780 ribu ton memerlukan akselerasi wilayah panen."};
  return <main className="executive-report-page"><ReportHeader title={meta[mode].title} description={meta[mode].description} onNotify={onNotify}/><nav className="report-tabs">{tabs.map(([id,label])=><button key={id} className={mode===id?"active":""} onClick={()=>onSwitch(id)}>{label}</button>)}</nav>
    {mode==="snapshot"&&<><section className="executive-report-hero"><div><span>SUPPLY CHAIN HEALTH SCORE</span><strong>78</strong><em>PERLU PERHATIAN</em></div><div><h2>Kinerja nasional memerlukan percepatan terarah</h2><p>Stok nasional mencukupi, tetapi pengadaan baru 78,5% target dan OTIF 82,4%. Prioritaskan redistribusi Papua, mitigasi mutu NTB, recovery pengadaan Jawa Barat, dan rute alternatif NTT.</p><small><Sparkles size={15}/> Rekomendasi terhubung dengan AI Decision Center dan Approval Center.</small></div><aside><span><b>12</b>Alert aktif</span><span><b>3</b>Kritis</span><span><b>4</b>Menunggu approval</span><span><b>7/12</b>KPI on track</span></aside></section><ReportKpiGrid/><section className="report-main-grid"><article className="report-card"><header><div><span>PRIORITAS PENANGANAN</span><h2>Exception berdampak tinggi</h2></div><button onClick={()=>onNotify("Alert Center dibuka dari laporan")}>Buka Alert Center <ArrowRight size={14}/></button></header><div className="report-exception-head"><span>Severity</span><span>Exception / cakupan</span><span>Exposure</span><span>Owner / SLA</span><span>Recommended action</span></div>{executiveExceptions.map(x=><div className="report-exception-row" key={x.title}><em className={x.severity.toLowerCase()}>{x.severity}</em><span><b>{x.title}</b><small>{x.scope}</small></span><strong>{x.value}</strong><span><b>{x.owner}</b><small>SLA {x.sla}</small></span><button onClick={()=>onNotify(`Action ${x.action} dibuka`)}>{x.action}<ChevronRight size={14}/></button></div>)}</article><aside className="report-card report-regions"><header><div><span>PERFORMA WILAYAH</span><h2>Ranking Kanwil</h2></div></header>{[["Jawa Timur",104,"On Track"],["Jawa Tengah",98,"Watch"],["Sulselbar",94,"Watch"],["Sumatera Utara",91,"Watch"],["Jawa Barat",82,"At Risk"],["Papua",68,"Critical"]].map(([n,v,s],i)=><div key={String(n)}><b>{i+1}</b><span><strong>{n}</strong><i><em style={{width:`${v}%`}}/></i></span><aside><strong>{v}%</strong><small>{s}</small></aside></div>)}</aside></section><section className="report-insight"><Sparkles size={21}/><div><strong>Executive insight</strong><p>Untuk mengejar target pengadaan akhir periode, rata-rata serapan perlu ditingkatkan menjadi <b>21.500 ton per hari</b>, sekitar 18% di atas rata-rata 30 hari terakhir, dengan fokus wilayah Jawa Barat, Jawa Tengah, dan Sulselbar.</p></div><button onClick={()=>onNotify("Analisis pengadaan dibuka")}>Buka analisis pengadaan <ArrowRight size={14}/></button></section></>}
    {(["daily","weekly","monthly"] as ExecutiveReportMode[]).includes(mode)&&<><section className="period-report-banner"><div><span>{periodCopy.label}</span><h2>{periodCopy.headline}</h2><p>{periodCopy.summary}</p></div><aside><small>Perubahan periode</small><strong>{periodCopy.delta}</strong><div>{periodCopy.trend.map((v,i)=><i key={i} style={{height:`${v}%`}}/>)}</div></aside></section><ReportKpiGrid/><section className="report-period-grid"><article className="report-card"><header><div><span>PERFORMANCE MOVEMENT</span><h2>{mode==="daily"?"Perubahan sejak cut-off kemarin":mode==="weekly"?"Tren tujuh hari":"Capaian bulanan & YTD"}</h2></div><small>Definisi KPI dari SCCT semantic layer v3.6</small></header><div className="report-domain-table-head"><span>Domain</span><span>Baseline</span><span>Aktual</span><span>Perubahan</span><span>Status</span><span>Data source</span></div>{[["Persediaan","5.241.880 ton","5.252.665 ton","+10.785 ton","On Track","WMS / ERP"],["Pengadaan","2,81 jt ton","2,85 jt ton","+40.200 ton","At Risk","ERP Pengadaan"],["Penyaluran","3,86 jt ton","3,91 jt ton","+48.600 ton","Watch","ERP Penjualan"],["OTIF","81,7%","82,4%","+0,7 pp","At Risk","TMS / Simlog"],["Pendapatan","Rp31,22 T","Rp31,60 T","+Rp0,38 T","Watch","ERP Keuangan"]].map(r=><div className="report-domain-table-row" key={r[0]}>{r.map((c,i)=>i===4?<em className={c.toLowerCase().replace(" ","-")} key={c}>{c}</em>:i===0?<strong key={c}>{c}</strong>:<span key={c}>{c}</span>)}</div>)}</article><aside className="report-card action-commitments"><header><div><span>ACTION COMMITMENT</span><h2>Tindak lanjut periode</h2></div></header>{executiveExceptions.slice(0,3).map((x,i)=><article key={x.title}><b>{i+1}</b><span><strong>{x.action}</strong><small>{x.owner} · due {i===0?"hari ini":"20 Agu"}</small></span><em>{i===0?"Approval":"In progress"}</em></article>)}<button onClick={()=>onNotify("Seluruh action commitment dibuka")}>Lihat seluruh action <ArrowRight size={14}/></button></aside></section><section className="report-lineage"><Database size={17}/><p><b>Data lineage:</b> ERP → WMS/TMS/QMS → Data Quality checks → KPI semantic layer → Executive Report. Cut-off dan versi sumber terkunci pada saat publikasi.</p><span>Completeness 99,4%</span><span>Freshness 96,8%</span></section></>}
    {mode==="builder"&&<section className="report-builder-layout"><aside className="report-builder-panel"><header><div><span>REPORT CONFIGURATION</span><h2>Susun laporan</h2></div><em>Draft</em></header><label>Nama laporan<input value={reportTitle} onChange={e=>setReportTitle(e.target.value)}/></label><div className="report-builder-two"><label>Periode<select><option>Year to Date</option><option>Bulan berjalan</option><option>7 hari terakhir</option><option>Kustom</option></select></label><label>Cakupan<select><option>Nasional</option><option>Per Region</option><option>Per Kanwil</option><option>Per Kancab</option></select></label></div><h3>Modul data</h3><div className="report-module-picker">{["Persediaan","Pengadaan","Penjualan & Penyaluran","Distribusi","Keuangan","Alert & Exception","AI Recommendation","Data Quality"].map(m=><button className={selectedModules.includes(m)?"selected":""} key={m} onClick={()=>toggleModule(m)}><span>{selectedModules.includes(m)?<Check size={14}/>:<Plus size={14}/>}</span>{m}</button>)}</div><h3>Bagian laporan</h3>{["Narasi eksekutif","KPI target vs realisasi","Exception berdampak tinggi","Performa wilayah","Action commitment","Data quality & lineage"].map(x=><label className="report-builder-check" key={x}><input type="checkbox" defaultChecked/><span>{x}</span></label>)}<label>Klasifikasi<select><option>Internal — Terbatas</option><option>Internal</option><option>Rahasia</option></select></label><footer><button onClick={()=>onNotify("Template laporan disimpan")}>Simpan template</button><button onClick={()=>onNotify("Preview laporan berhasil dibuat")}><Play size={14}/> Generate preview</button></footer></aside><section className="report-preview"><header><div><span>LIVE PREVIEW</span><h2>{reportTitle}</h2></div><span>18 Agustus 2026 · Nasional</span></header><div className="preview-cover"><strong>PERUM BULOG</strong><h2>{reportTitle}</h2><p>Executive report · Year to Date · Data per 18 Agustus 2026</p><em>INTERNAL — TERBATAS</em></div><div className="preview-modules">{selectedModules.slice(0,6).map((m,i)=><article key={m}><span>{m}</span><strong>{["5,25 jt ton","78,5%","88,1%","82,4%","Rp31,60 T","12 aktif"][i]}</strong><i><b style={{width:`${[92,78,88,82,92,64][i]}%`}}/></i></article>)}</div><div className="preview-note"><Sparkles size={18}/><p>Report Builder memakai definisi KPI yang sama dengan dashboard sumber. Perubahan filter, cut-off, dan versi data disimpan sebagai metadata laporan.</p></div></section></section>}
    {mode==="scheduled"&&<><section className="report-schedule-summary"><article><span>Jadwal aktif</span><strong>7</strong><small>4 ditampilkan</small></article><article><span>Delivery success</span><strong>99,2%</strong><small>30 hari terakhir</small></article><article><span>Penerima terverifikasi</span><strong>64</strong><small>sesuai RBAC</small></article><article><span>Berikutnya</span><strong>19 Agu · 06:00</strong><small>Executive Daily Brief</small></article><button onClick={()=>onNotify("Form jadwal laporan baru dibuka")}><Plus size={16}/> Jadwal baru</button></section><section className="schedule-card"><header><div><span>AUTOMATED DELIVERY</span><h2>Daftar laporan terjadwal</h2></div><div><Search size={15}/><input placeholder="Cari jadwal..."/></div></header><div className="schedule-head"><span>Laporan</span><span>Frekuensi / cut-off</span><span>Owner / penerima</span><span>Format</span><span>Eksekusi berikutnya</span><span>Status</span><span/></div>{schedules.map(s=><article key={s.name}><span><strong>{s.name}</strong><small>Timezone Asia/Jakarta</small></span><span><strong>{s.cadence}</strong><small>Cut-off {s.cutoff}</small></span><span><strong>{s.owner}</strong><small>{s.recipient}</small></span><span>{s.format}</span><b>{s.next}</b><em className={s.status.toLowerCase()}>{s.status}</em><button onClick={()=>onNotify(`Pengaturan ${s.name} dibuka`)}><Settings size={15}/></button></article>)}</section><section className="schedule-guardrail"><ShieldCheck size={20}/><div><strong>Delivery governance aktif</strong><p>Penerima divalidasi terhadap RBAC dan organisasi. Laporan Rahasia tidak dapat dikirim ke alamat eksternal; tautan kedaluwarsa dalam 24 jam.</p></div><span>Last policy check 09:28 WIB</span></section></>}
    {mode==="history"&&<><section className="report-history-tools"><label><Search size={16}/><input placeholder="Cari ID, nama laporan, atau owner..."/></label><select><option>Semua tipe</option><option>Harian</option><option>Mingguan</option><option>Bulanan</option><option>Khusus</option></select><select><option>90 hari terakhir</option><option>30 hari terakhir</option><option>Year to Date</option></select><button onClick={()=>onNotify("Audit index diekspor")}><Download size={15}/> Ekspor index</button></section><section className="report-history-card"><header><div><span>REPORT ARCHIVE</span><h2>Riwayat publikasi</h2></div><small>128 laporan · retention 7 tahun</small></header><div className="report-history-head"><span>ID / laporan</span><span>Tipe / periode</span><span>Owner</span><span>Dibuat</span><span>Penerima</span><span>Format</span><span>Status</span><span/></div>{reportHistory.map(r=><button key={r.id} onClick={()=>{setSelectedHistory(r);setDetailOpen(true)}}><span><strong>{r.name}</strong><small>{r.id}</small></span><span><strong>{r.type}</strong><small>{r.period}</small></span><span>{r.owner}</span><span>{r.generated}</span><span>{r.recipients}</span><span>{r.format}</span><em className={r.status.toLowerCase()}>{r.status}</em><ChevronRight size={16}/></button>)}</section><section className="report-lineage"><ShieldCheck size={17}/><p><b>Archive integrity:</b> 128 dari 128 versi memiliki checksum valid, approval record, daftar distribusi, dan data snapshot yang dapat direproduksi.</p><span>Integrity 100%</span><span>Retention compliant</span></section></>}
    {detailOpen&&<div className="report-modal-backdrop" onMouseDown={e=>{if(e.currentTarget===e.target)setDetailOpen(false)}}><section className="report-detail-modal"><header><div><span>{selectedHistory.id} · {selectedHistory.type}</span><h2>{selectedHistory.name}</h2><p>{selectedHistory.period}</p></div><button onClick={()=>setDetailOpen(false)}><X size={20}/></button></header><div className="report-detail-grid"><article><span>Status</span><strong>{selectedHistory.status}</strong></article><article><span>Dibuat</span><strong>{selectedHistory.generated}</strong></article><article><span>Owner</span><strong>{selectedHistory.owner}</strong></article><article><span>Format</span><strong>{selectedHistory.format}</strong></article></div><section><h3>Publication lineage</h3>{[[Database,"Data snapshot","DS-260818-0930 · completeness 99,4%"],[FileChartColumn,"Report build","Template EXEC-v4.2 · semantic layer v3.6"],[ShieldCheck,"Approval","Sekretariat Direksi · signed"],[Send,"Distribution",selectedHistory.recipients],[Save,"Archive","SHA-256 61ad…0c72 · retention 7 tahun"]].map(([Icon,l,v])=><p key={String(l)}><Icon size={17}/><span><b>{String(l)}</b><small>{String(v)}</small></span><CheckCircle2 size={16}/></p>)}</section><footer><button onClick={()=>onNotify("Salinan laporan diunduh")}><Download size={15}/> Unduh salinan</button><button onClick={()=>onNotify("Laporan dibuat ulang dari snapshot terkunci")}><RotateCw size={15}/> Reproduce</button><button className="primary" onClick={()=>onNotify("Laporan dibuka")}>Buka laporan <ExternalLink size={15}/></button></footer></section></div>}
    <p className="report-disclaimer"><AlertTriangle size={15}/> Data pada prototipe merupakan data demonstrasi realistis dan konsisten antarhalaman. Produksi harus menggunakan koneksi ERP, WMS, TMS/Simlog, QMS, RKAP, IAM, serta snapshot yang disahkan pemilik data.</p>
  </main>
}

const approvalItems=[
  {id:"APR-260818-001",status:"pending",severity:"critical",domain:"Persediaan",title:"Redistribusi beras medium Jatim ke Papua",scope:"Kanwil Jatim → Kanwil Papua",value:"8.500 ton",impact:"Rp12,8 M biaya · cegah shortage 9 hari",confidence:"92%",owner:"Budi Santoso",approver:"Direktur Supply Chain",updated:"18 Agu 2026 · 09:12",sla:"1j 38m",decision:"Menunggu",reason:"Safety stock Papua hanya 68% dari minimum. Optimizer memilih kombinasi laut dan darat dengan OTIF proyeksi 94%.",evidence:["Snapshot WMS 18/08 08:30 — stok tersedia Jatim 126.400 ton","Demand forecast Papua 14 hari — kebutuhan 14.740 ton","TMS — slot kapal Surabaya–Jayapura tersedia 20 Agustus","Guardrail CBP — stok asal tetap 118% safety stock"]},
  {id:"APR-260818-002",status:"pending",severity:"high",domain:"Persediaan",title:"Prioritas FEFO lot CBP berisiko turun mutu",scope:"Kanwil NTB · Gudang Dasan Cermen",value:"45.200 ton",impact:"Eksposur mutu Rp497 M",confidence:"89%",owner:"Siti Rahma",approver:"Kepala Divisi Persediaan",updated:"18 Agu 2026 · 08:54",sla:"3j 12m",decision:"Menunggu",reason:"Kadar air dan RH meningkat pada 12 lot umur >4 bulan. Disarankan inspeksi dan percepatan outflow bertahap.",evidence:["QMS — QI 71, RH rata-rata 81%","WMS — 12 lot umur simpan 126–158 hari","Hasil sampling mutu 17 Agustus","Rencana SPHP NTB minggu ke-34"]},
  {id:"APR-260818-003",status:"pending",severity:"high",domain:"Pengadaan",title:"Recovery plan pengadaan gabah Jawa Barat",scope:"Kanwil Jawa Barat",value:"118.000 ton",impact:"Tutup gap target 22%",confidence:"86%",owner:"Maya Putri",approver:"Direktur Pengadaan",updated:"18 Agu 2026 · 08:31",sla:"5j 05m",decision:"Menunggu",reason:"Realisasi berada di bawah trajectory panen. Rencana menambah mitra dan titik serap dengan batas harga dan mutu terkontrol.",evidence:["Realisasi 2,85 jt ton vs target 3,63 jt ton","Kalender panen BPS/SIMOTANDI","Daftar 41 mitra tervalidasi","Simulasi kebutuhan modal kerja"]},
  {id:"APR-260818-004",status:"pending",severity:"high",domain:"Distribusi",title:"Aktivasi rute alternatif Surabaya–Kupang",scope:"Koridor Jawa Timur → NTT",value:"6.200 ton",impact:"Pulihkan OTIF ke 93,6%",confidence:"91%",owner:"Rizky Maulana",approver:"Direktur Transformasi & Hubungan Kelembagaan",updated:"18 Agu 2026 · 08:10",sla:"6j 14m",decision:"Menunggu",reason:"Kapal utama terlambat 19 jam. Alternatif feeder memberi tambahan biaya 6,2% namun menghindari kekosongan 4 kabupaten.",evidence:["ETA kapal utama mundur 19 jam","TMS route quote tiga transporter","Forecast demand NTT 10 hari","SLA program penyaluran aktif"]},
  {id:"APR-260817-021",status:"approved",severity:"medium",domain:"Penyaluran",title:"Penambahan throughput SPHP Sumatera Utara",scope:"Kanwil Sumut · 14 kab/kota",value:"+570 ton/hari",impact:"Target harian 1.750 ton",confidence:"94%",owner:"Dewi Lestari",approver:"Direktur Bisnis",updated:"17 Agu 2026 · 16:42",sla:"2j 21m",decision:"Disetujui",reason:"Penyaluran harian tertinggal dan harga konsumen menunjukkan tekanan. Penambahan outlet terverifikasi menjaga HET.",evidence:["Realisasi SPHP 1.180 ton/hari","Panel harga konsumen 14 kab/kota","Ketersediaan 53 mitra pengecer","Stok operasional Kanwil 31 hari"]},
  {id:"APR-260817-018",status:"approved",severity:"high",domain:"Distribusi",title:"Pengalihan armada Sulselbar untuk penyaluran program",scope:"Makassar → Kendari",value:"3.400 ton",impact:"Hemat 11 jam · Rp184 jt",confidence:"88%",owner:"Andi Faisal",approver:"Direktur Supply Chain",updated:"17 Agu 2026 · 14:18",sla:"3j 48m",decision:"Disetujui",reason:"Kapasitas armada kosong dapat dipakai tanpa mengganggu rute reguler.",evidence:["TMS utilization armada 61%","Kontrak transporter aktif","Persediaan asal 104% safety stock","OTIF koridor 89,4%"]},
  {id:"APR-260816-012",status:"rejected",severity:"high",domain:"Keuangan",title:"Tambahan budget dryer fleet Jawa Tengah",scope:"Kanwil Jawa Tengah",value:"Rp8,4 Miliar",impact:"Potensi susut turun 0,7%",confidence:"73%",owner:"Fajar Nugroho",approver:"Direktur Keuangan",updated:"16 Agu 2026 · 17:02",sla:"7j 10m",decision:"Ditolak",reason:"Business case belum memuat utilisasi aset eksisting dan pembanding sewa. Diminta revisi CAPEX/OPEX serta validasi volume musim panen.",evidence:["Proposal CAPEX v1.2","Forecast panen September–November","Daftar dryer eksisting belum lengkap","NPV belum melalui Finance Control"]},
  {id:"APR-260815-009",status:"rejected",severity:"medium",domain:"Pengadaan",title:"Perluasan titik serap tanpa verifikasi mutu",scope:"Kancab Indramayu",value:"21.500 ton",impact:"Risiko mutu dan harga",confidence:"62%",owner:"Rina Kusuma",approver:"Kepala Divisi Pengadaan",updated:"15 Agu 2026 · 13:26",sla:"4j 32m",decision:"Ditolak",reason:"Empat titik belum memiliki hasil inspeksi laboratorium dan kontrak harga belum sesuai guardrail.",evidence:["Daftar calon titik serap","Hasil verifikasi 7 dari 11 lokasi","Batas HPP aktif","Catatan Quality Assurance"]},
] as const;

function GovernanceHeader({eyebrow,title,description}:{eyebrow:string;title:string;description:string}){return <header className="gov-header"><div><span>{eyebrow}</span><h1>{title}</h1><p>{description}</p></div><div className="gov-data"><i/><span><small>DATA OPERASIONAL TERAKHIR</small><strong>18 Agustus 2026 · 09:30 WIB</strong></span><em>Demo realistis</em></div></header>}

function ApprovalCenterPage({mode,onSwitch,onNotify}:{mode:ApprovalCenterMode;onSwitch:(mode:ApprovalCenterMode)=>void;onNotify:(message:string)=>void}){
  const [selected,setSelected]=useState<(typeof approvalItems)[number]>(approvalItems.find(x=>x.status===(mode==="approved"?"approved":mode==="rejected"?"rejected":"pending"))||approvalItems[0]);
  const [detailOpen,setDetailOpen]=useState(false);const [query,setQuery]=useState("");const [domain,setDomain]=useState("Semua domain");
  const tabs:[ApprovalCenterMode,string,number][]=[["pending","Menunggu Persetujuan",4],["approved","Disetujui",18],["rejected","Ditolak",3],["delegations","Delegasi Persetujuan",6]];
  const visible=approvalItems.filter(x=>(mode==="pending"?x.status==="pending":x.status===mode)&&(domain==="Semua domain"||x.domain===domain)&&(x.title.toLowerCase().includes(query.toLowerCase())||x.id.toLowerCase().includes(query.toLowerCase())));
  const delegations=[
    {principal:"Direktur Supply Chain",delegate:"Kepala Divisi Persediaan",scope:"Persediaan & redistribusi ≤ 10.000 ton",org:"Pusat · Nasional",period:"18–22 Agu 2026",limit:"≤ Rp15 Miliar",status:"Aktif"},
    {principal:"Direktur Pengadaan",delegate:"Wakil Direktur Pengadaan",scope:"Pengadaan DN · koreksi volume",org:"Pusat · Nasional",period:"19–25 Agu 2026",limit:"≤ Rp25 Miliar",status:"Terjadwal"},
    {principal:"Pemimpin Kanwil Papua",delegate:"Wakil Pemimpin Wilayah",scope:"Distribusi intra-Kanwil",org:"Kanwil Papua",period:"16–20 Agu 2026",limit:"≤ 2.500 ton",status:"Aktif"},
    {principal:"Kepala Kancab Kupang",delegate:"Manajer SCPP",scope:"Penyaluran program",org:"Kancab Kupang",period:"12–17 Agu 2026",limit:"≤ Rp750 Juta",status:"Berakhir"},
  ];
  return <main className="governance-page approval-page">
    <GovernanceHeader eyebrow="DECISION INTELLIGENCE / APPROVAL CENTER" title={tabs.find(t=>t[0]===mode)?.[1]||"Approval Center"} description="Kontrol keputusan maker–checker–approver untuk rekomendasi SCCT yang berdampak pada stok, layanan, mutu, dan keuangan BULOG."/>
    <nav className="gov-tabs">{tabs.map(([id,label,count])=><button key={id} className={mode===id?"active":""} onClick={()=>onSwitch(id)}>{label}<b>{count}</b></button>)}</nav>
    <section className="gov-kpis"><article><span>Menunggu keputusan</span><strong>4</strong><small>2 berisiko lewat SLA</small></article><article><span>Nilai keputusan terbuka</span><strong>Rp 34,2 M</strong><small>lintas 4 domain</small></article><article><span>Approval rate 30 hari</span><strong>84,6%</strong><small>156 dari 184 usulan</small></article><article><span>Median decision SLA</span><strong>3j 42m</strong><small>target ≤ 6 jam</small></article><article><span>Disetujui hari ini</span><strong>7</strong><small>3 sudah dieksekusi</small></article></section>
    {mode!=="delegations"?<>
      <section className="gov-tools"><label><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari ID, keputusan, atau wilayah..."/></label><select value={domain} onChange={e=>setDomain(e.target.value)}><option>Semua domain</option><option>Persediaan</option><option>Pengadaan</option><option>Distribusi</option><option>Penyaluran</option><option>Keuangan</option></select><select><option>Semua tingkat dampak</option><option>Critical</option><option>High</option><option>Medium</option></select><button onClick={()=>onNotify("Daftar approval berhasil diekspor")}><Download size={15}/> Ekspor</button></section>
      <section className="gov-workspace"><div className="gov-table-card"><header><div><span>DECISION QUEUE</span><h2>{mode==="pending"?"Keputusan memerlukan tindakan":mode==="approved"?"Keputusan yang disetujui":"Keputusan yang ditolak"}</h2></div><small>{visible.length} record ditampilkan</small></header><div className="approval-table-head"><span>Keputusan</span><span>Domain / Cakupan</span><span>Nilai / Dampak</span><span>PIC / Approver</span><span>SLA / Status</span><span/></div><div className="approval-table-body">{visible.map(item=><button key={item.id} onClick={()=>{setSelected(item);setDetailOpen(true)}}><span><em className={item.severity}>{item.severity}</em><b>{item.title}</b><small>{item.id} · diperbarui {item.updated}</small></span><span><b>{item.domain}</b><small>{item.scope}</small></span><span><b>{item.value}</b><small>{item.impact}</small></span><span><b>{item.owner}</b><small>{item.approver}</small></span><span><b>{item.sla}</b><small>{item.decision}</small></span><ChevronRight size={17}/></button>)}</div></div>
      <aside className="gov-policy"><header><ShieldCheck size={20}/><div><span>GOVERNANCE GUARDRAIL</span><h2>Kontrol sebelum keputusan</h2></div></header><p><CheckCircle2 size={15}/> Segregation of duties maker dan approver</p><p><CheckCircle2 size={15}/> Data snapshot dan versi model terkunci</p><p><CheckCircle2 size={15}/> Batas kewenangan sesuai nilai/volume</p><p><CheckCircle2 size={15}/> Validasi HPP/HET, CBP, mutu, dan SLA</p><div><strong>98,7%</strong><small>approval memenuhi policy check 30 hari</small></div><button onClick={()=>onNotify("Matriks kewenangan dibuka")}>Lihat matriks kewenangan <ArrowRight size={14}/></button></aside></section>
    </>:<section className="delegation-card"><header><div><span>DELEGATION REGISTER</span><h2>Delegasi kewenangan aktif dan terjadwal</h2><p>Delegasi tidak memindahkan akuntabilitas dan selalu dibatasi periode, cakupan, serta nilai transaksi.</p></div><button onClick={()=>onNotify("Form delegasi baru siap digunakan")}><Plus size={16}/> Buat delegasi</button></header><div className="delegation-head"><span>Pemberi kewenangan</span><span>Penerima delegasi</span><span>Cakupan & organisasi</span><span>Periode</span><span>Batas</span><span>Status</span><span/></div>{delegations.map(d=><article key={d.principal+d.delegate}><span><strong>{d.principal}</strong><small>Principal owner</small></span><span><strong>{d.delegate}</strong><small>MFA & role tervalidasi</small></span><span><strong>{d.scope}</strong><small>{d.org}</small></span><span>{d.period}</span><b>{d.limit}</b><em className={d.status.toLowerCase()}>{d.status}</em><button onClick={()=>onNotify(`Detail delegasi ${d.delegate} dibuka`)}><Eye size={15}/></button></article>)}</section>}
    <p className="gov-disclaimer"><AlertTriangle size={15}/> Data pada prototipe merupakan data demonstrasi realistis untuk validasi alur. Produksi wajib terhubung ke ERP, WMS, TMS, QMS, RKAP, IAM dan menyimpan signature persetujuan.</p>
    {detailOpen&&<div className="gov-modal-backdrop" onMouseDown={e=>{if(e.currentTarget===e.target)setDetailOpen(false)}}><section className="approval-detail-modal"><header><div><span>{selected.id} · {selected.domain}</span><h2>{selected.title}</h2><p>{selected.scope}</p></div><button onClick={()=>setDetailOpen(false)}><X size={20}/></button></header><div className="approval-detail-summary"><article><span>Volume / nilai</span><strong>{selected.value}</strong></article><article><span>Dampak terukur</span><strong>{selected.impact}</strong></article><article><span>Confidence</span><strong>{selected.confidence}</strong></article><article><span>SLA tersisa</span><strong>{selected.sla}</strong></article></div><div className="approval-detail-grid"><section><h3>Justifikasi bisnis</h3><p>{selected.reason}</p><h3>Evidence & data snapshot</h3>{selected.evidence.map(x=><div className="evidence-row" key={x}><Database size={15}/><span>{x}</span><CheckCircle2 size={15}/></div>)}</section><aside><h3>Approval lineage</h3><div className="approval-line"><b>1</b><span><strong>Maker</strong><small>{selected.owner} · selesai</small></span></div><div className="approval-line"><b>2</b><span><strong>Checker</strong><small>Finance/QC Control · tervalidasi</small></span></div><div className="approval-line"><b>3</b><span><strong>Approver</strong><small>{selected.approver} · {selected.decision}</small></span></div><label>Catatan keputusan<textarea placeholder="Tambahkan alasan, syarat, atau instruksi eksekusi..."/></label></aside></div><footer>{selected.status==="pending"?<><button onClick={()=>onNotify(`${selected.id} dikembalikan untuk revisi`)}>Kembalikan untuk revisi</button><button className="danger" onClick={()=>onNotify(`${selected.id} ditolak dengan audit trail`)}>Tolak</button><button className="primary" onClick={()=>{onNotify(`${selected.id} disetujui dan diteruskan ke eksekusi`);setDetailOpen(false)}}><Check size={16}/> Setujui keputusan</button></>:<><button onClick={()=>onNotify("Evidence package diunduh")}><Download size={15}/> Unduh evidence</button><button className="primary" onClick={()=>onNotify("Decision lineage dibuka")}>Lihat decision lineage <ArrowRight size={15}/></button></>}</footer></section></div>}
  </main>
}

const historyRows={
  simulations:[
    {id:"SIM-260818-042",title:"Shortage & Surplus — Papua 30 hari",scope:"Papua · Beras medium",metric:"Defisit turun 11.840 ton",result:"Skenario B dipilih",owner:"Nadia Prameswari",time:"18 Agu · 09:05",model:"SCCT-SIM 2.4.1",status:"Selesai"},
    {id:"SIM-260817-039",title:"Rice Outflow Optimizer — NTB",scope:"NTB · 12 lot CBP",metric:"45.200 ton diprioritaskan",result:"FEFO bertahap",owner:"Budi Santoso",time:"17 Agu · 16:18",model:"OUTFLOW 1.8.3",status:"Disetujui"},
    {id:"SIM-260817-035",title:"Seasonal Demand Surge — Ramadhan",scope:"Nasional · 34 Kanwil",metric:"Service level 96,2%",result:"Pre-position H-45",owner:"Tim Demand Planning",time:"17 Agu · 11:42",model:"SURGE 3.1.0",status:"Draft"},
    {id:"SIM-260816-031",title:"Dampak Harga SPHP",scope:"Jabodetabek · 8 minggu",metric:"Inflasi pangan -0,21 pp",result:"Harga Rp12.500/kg",owner:"Tim Stabilisasi",time:"16 Agu · 14:22",model:"SPHP 2.0.5",status:"Diarsipkan"}],
  predictions:[
    {id:"PRD-260818-108",title:"Demand Forecast Beras Medium",scope:"Nasional · horizon 12 minggu",metric:"MAPE 7,8%",result:"Confidence 91%",owner:"AI Forecast Service",time:"18 Agu · 08:30",model:"DEMAND 4.2.0",status:"Aktif"},
    {id:"PRD-260818-107",title:"Prediksi Shortage & Surplus",scope:"Papua, Maluku, NTT",metric:"9 titik risiko",result:"2 critical",owner:"Inventory AI",time:"18 Agu · 08:24",model:"BALANCE 2.7.4",status:"Aktif"},
    {id:"PRD-260817-102",title:"Prediksi Mutu Stok CBP",scope:"185 kompleks gudang",metric:"32 lot watchlist",result:"Akurasi 88,6%",owner:"Quality AI",time:"17 Agu · 23:00",model:"QUALITY 1.9.2",status:"Aktif"},
    {id:"PRD-260817-099",title:"Supply Forecast Gabah",scope:"Jawa & Sulawesi · 8 minggu",metric:"MAPE 11,4%",result:"Drift normal",owner:"Procurement AI",time:"17 Agu · 18:00",model:"SUPPLY 3.3.1",status:"Aktif"}],
  recommendations:[
    {id:"REC-260818-077",title:"Redistribusi 8.500 ton Jatim–Papua",scope:"Persediaan & Distribusi",metric:"Rp12,8 M · OTIF 94%",result:"Menunggu approval",owner:"Allocation Optimizer",time:"18 Agu · 09:12",model:"ALLOC 2.6.0",status:"Pending"},
    {id:"REC-260817-071",title:"Tambah throughput SPHP Sumut",scope:"Penyaluran · 14 kab/kota",metric:"+570 ton/hari",result:"Realisasi +486 ton/hari",owner:"Demand Response AI",time:"17 Agu · 16:42",model:"SPHP 2.0.5",status:"Dieksekusi"},
    {id:"REC-260817-069",title:"Rute alternatif Surabaya–Kupang",scope:"Distribusi",metric:"Hemat 11 jam",result:"Menunggu approval",owner:"Route Optimizer",time:"17 Agu · 15:11",model:"ROUTE 3.5.2",status:"Pending"},
    {id:"REC-260816-061",title:"Tambahan dryer Jawa Tengah",scope:"Keuangan & Pengadaan",metric:"Susut -0,7%",result:"Ditolak · revisi business case",owner:"Quality AI",time:"16 Agu · 17:02",model:"QUALITY 1.9.2",status:"Ditolak"}],
  approvals:[
    {id:"APR-260817-021",title:"Penambahan throughput SPHP Sumut",scope:"Direktur Bisnis",metric:"Disetujui 2j 21m",result:"WO-SPHP-260817-14",owner:"Dewi Lestari",time:"17 Agu · 16:42",model:"Policy v5.4",status:"Approved"},
    {id:"APR-260817-018",title:"Pengalihan armada Sulselbar",scope:"Direktur Supply Chain",metric:"Disetujui 3j 48m",result:"DO-260817-8821",owner:"Andi Faisal",time:"17 Agu · 14:18",model:"Policy v5.4",status:"Approved"},
    {id:"APR-260816-012",title:"Tambahan budget dryer Jateng",scope:"Direktur Keuangan",metric:"Ditolak 7j 10m",result:"Revisi CAPEX/OPEX",owner:"Fajar Nugroho",time:"16 Agu · 17:02",model:"Policy v5.4",status:"Rejected"},
    {id:"APR-260815-009",title:"Perluasan titik serap Indramayu",scope:"Kadiv Pengadaan",metric:"Ditolak 4j 32m",result:"Inspeksi 4 lokasi",owner:"Rina Kusuma",time:"15 Agu · 13:26",model:"Policy v5.3",status:"Rejected"}],
  audit:[
    {id:"EVT-8F21A9",title:"APPROVAL_SIGNED",scope:"superadmin · Direktur Supply Chain",metric:"APR-260817-018",result:"IP 10.18.4.21 · MFA",owner:"IAM / Approval API",time:"17 Agu · 14:18:44",model:"hash 2fa7…91bc",status:"Verified"},
    {id:"EVT-8F219D",title:"RECOMMENDATION_CREATED",scope:"svc-route-optimizer",metric:"REC-260817-069",result:"snapshot DS-260817-08",owner:"AI Orchestrator",time:"17 Agu · 15:11:08",model:"hash 890c…2e11",status:"Verified"},
    {id:"EVT-8F2178",title:"SIMULATION_COMPLETED",scope:"nadia.prameswari · Planner",metric:"SIM-260817-039",result:"scenario B selected",owner:"Simulation Service",time:"17 Agu · 16:18:02",model:"hash 61ad…0c72",status:"Verified"},
    {id:"EVT-8F2140",title:"POLICY_CHECK_FAILED",scope:"finance-control-bot",metric:"APR-260816-012",result:"CAPEX evidence missing",owner:"Policy Engine",time:"16 Agu · 16:58:21",model:"hash 10bb…73af",status:"Verified"}],
} as const;

function DecisionHistoryPage({mode,onSwitch,onNotify}:{mode:DecisionHistoryMode;onSwitch:(mode:DecisionHistoryMode)=>void;onNotify:(message:string)=>void}){
  const [selected,setSelected]=useState<(typeof historyRows)[DecisionHistoryMode][number]>(historyRows[mode][0]);const [detailOpen,setDetailOpen]=useState(false);const [query,setQuery]=useState("");
  const meta:Record<DecisionHistoryMode,{label:string;description:string}>={simulations:{label:"Riwayat Simulasi",description:"Skenario what-if, asumsi, hasil, dan pilihan yang disimpan."},predictions:{label:"Riwayat Prediksi",description:"Versi model, horizon, akurasi, confidence dan monitoring drift."},recommendations:{label:"Riwayat Rekomendasi",description:"Rekomendasi AI dari penerbitan sampai outcome terukur."},approvals:{label:"Riwayat Persetujuan",description:"Keputusan maker–checker–approver dan tautan eksekusinya."},audit:{label:"Decision Audit Trail",description:"Log immutable untuk setiap perubahan, akses, dan signature keputusan."}};
  const tabs=(Object.keys(meta) as DecisionHistoryMode[]);const rows=historyRows[mode].filter(x=>x.title.toLowerCase().includes(query.toLowerCase())||x.id.toLowerCase().includes(query.toLowerCase()));
  return <main className="governance-page history-page"><GovernanceHeader eyebrow="DECISION INTELLIGENCE / DECISION HISTORY" title={meta[mode].label} description={meta[mode].description}/><nav className="gov-tabs history-tabs">{tabs.map(id=><button key={id} className={mode===id?"active":""} onClick={()=>onSwitch(id)}>{meta[id].label}</button>)}</nav>
    <section className="gov-kpis history-kpis"><article><span>Keputusan 30 hari</span><strong>184</strong><small>+12% dari periode lalu</small></article><article><span>Approval rate</span><strong>84,6%</strong><small>156 keputusan disetujui</small></article><article><span>Nilai terealisasi</span><strong>Rp 28,7 M</strong><small>saving + loss avoided</small></article><article><span>Decision lead time</span><strong>3j 42m</strong><small>median end-to-end</small></article><article><span>Audit integrity</span><strong>100%</strong><small>4.821 event terverifikasi</small></article></section>
    <section className="gov-tools"><label><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Cari ID, scenario, model, atau keputusan..."/></label><select><option>30 hari terakhir</option><option>7 hari terakhir</option><option>Year to date</option></select><select><option>Semua domain</option><option>Persediaan</option><option>Pengadaan</option><option>Penyaluran</option><option>Distribusi</option><option>Keuangan</option></select><button onClick={()=>onNotify(mode==="audit"?"Audit evidence package sedang disiapkan":"Riwayat berhasil diekspor")}><Download size={15}/> {mode==="audit"?"Evidence package":"Ekspor"}</button></section>
    {mode==="audit"&&<section className="audit-banner"><ShieldCheck size={23}/><div><strong>Integrity chain sehat</strong><p>Seluruh event memiliki timestamp tersinkronisasi, actor identity, source service, before/after reference, dan SHA-256 chain hash.</p></div><span><i/> Last verified 09:31 WIB</span></section>}
    <section className="history-table-card"><header><div><span>{mode==="audit"?"IMMUTABLE EVENT LEDGER":"DECISION RECORDS"}</span><h2>{meta[mode].label}</h2></div><small>{rows.length} dari {mode==="audit"?"4.821":"184"} record</small></header><div className="history-table-head"><span>ID / Aktivitas</span><span>Cakupan / Actor</span><span>{mode==="predictions"?"Akurasi / Confidence":"Dampak / Object"}</span><span>Outcome / Source</span><span>Owner / Service</span><span>Waktu / Versi</span><span>Status</span><span/></div>{rows.map(row=><button className="history-row" key={row.id} onClick={()=>{setSelected(row);setDetailOpen(true)}}><span><b>{row.title}</b><small>{row.id}</small></span><span>{row.scope}</span><b>{row.metric}</b><span>{row.result}</span><span>{row.owner}</span><span><b>{row.time}</b><small>{row.model}</small></span><em className={row.status.toLowerCase()}>{row.status}</em><ChevronRight size={16}/></button>)}</section>
    <section className="lineage-card"><header><div><span>END-TO-END TRACEABILITY</span><h2>Decision lineage</h2></div><button onClick={()=>onNotify("Lineage graph diperluas")}>Buka graph <ExternalLink size={14}/></button></header><div className="lineage-flow">{[[Database,"Signal & snapshot","DS-260818-08"],[FlaskConical,"Simulation / model","SCCT 2.4.1"],[Sparkles,"Recommendation","REC-260818-077"],[ShieldCheck,"Approval","APR-260818-001"],[Play,"Execution","Menunggu WO"],[Target,"Measured outcome","Belum tersedia"]].map(([Icon,label,value],i)=><span key={String(label)}><b><Icon size={17}/></b><small>{String(label)}</small><strong>{String(value)}</strong>{i<5&&<ArrowRight size={16}/>}</span>)}</div></section>
    <p className="gov-disclaimer"><AlertTriangle size={15}/> Riwayat demo menggunakan data representatif. Dalam produksi, retention, immutable storage, digital signature, dan akses evidence mengikuti kebijakan audit, keamanan informasi, serta RBAC BULOG.</p>
    {detailOpen&&<div className="gov-modal-backdrop" onMouseDown={e=>{if(e.currentTarget===e.target)setDetailOpen(false)}}><section className="history-detail-modal"><header><div><span>{selected.id}</span><h2>{selected.title}</h2><p>{selected.scope}</p></div><button onClick={()=>setDetailOpen(false)}><X size={20}/></button></header><div className="history-detail-metrics"><span><small>Hasil utama</small><strong>{selected.metric}</strong></span><span><small>Outcome</small><strong>{selected.result}</strong></span><span><small>Owner</small><strong>{selected.owner}</strong></span><span><small>Model / policy</small><strong>{selected.model}</strong></span></div><section><h3>Lineage & provenance</h3><div className="history-lineage-detail"><p><Database size={16}/><span><b>Data snapshot</b><small>ERP/WMS/TMS/QMS · DS-260818-08 · schema tervalidasi</small></span><CheckCircle2 size={16}/></p><p><BrainCircuit size={16}/><span><b>Model & policy</b><small>{selected.model} · feature set dan parameter terkunci</small></span><CheckCircle2 size={16}/></p><p><ShieldCheck size={16}/><span><b>Human decision</b><small>RBAC, MFA, segregation of duties, dan komentar tersimpan</small></span><CheckCircle2 size={16}/></p><p><Target size={16}/><span><b>Outcome measurement</b><small>{selected.result} · baseline dan actual dapat diaudit</small></span><CheckCircle2 size={16}/></p></div><h3>Catatan & evidence</h3><p className="history-note">Record dibuat pada {selected.time}. Tidak ada perubahan setelah signature terakhir. Semua attachment menggunakan checksum dan mengikuti masa retensi dokumen.</p></section><footer><button onClick={()=>onNotify("Evidence package diunduh")}><Download size={15}/> Unduh evidence</button><button className="primary" onClick={()=>onNotify("Record terkait dibuka")}>Buka record terkait <ArrowRight size={15}/></button></footer></section></div>}
  </main>
}

function AIDecisionCenterPage({mode,onSwitch,onNotify}:{mode:AIDecisionMode;onSwitch:(mode:AIDecisionMode)=>void;onNotify:(message:string)=>void}){
  const [period,setPeriod]=useState("14 hari ke depan");
  const [scope,setScope]=useState("Nasional");
  const [selected,setSelected]=useState("REC-260818-01");
  const labels:Record<AIDecisionMode,string>={insights:"Executive AI Insights",risks:"Risiko & Peluang",rootCause:"Root Cause Analysis",actions:"Prioritas Tindakan",recommendations:"Recommendation Center"};
  const recommendations=[
    {id:"REC-260818-01",severity:"Critical",domain:"Persediaan",title:"Pulihkan safety stock Papua",location:"Kanwil Papua · GBB Jayapura",signal:"Stok 21.188 ton · coverage 7 hari",action:"Redistribusikan 8.500 ton beras medium dari Jawa Timur melalui koridor laut Surabaya–Jayapura.",impact:"Coverage naik menjadi 15 hari",cost:"Rp12,8 M",confidence:92,owner:"Direktorat Supply Chain",due:"Hari ini · 16:00 WIB",status:"Perlu approval"},
    {id:"REC-260818-02",severity:"High",domain:"Kualitas",title:"Percepat outflow lot aging NTB",location:"Kanwil NTB · Dasan Cermen",signal:"45.200 ton · QI 71 · RH 81%",action:"Lakukan QC ulang, prioritaskan FEFO untuk SPHP yang memenuhi mutu, dan kunci jadwal keluar maksimum 7 hari.",impact:"Eksposur penurunan mutu turun Rp497 M",cost:"Rp3,1 M",confidence:88,owner:"Divisi Persediaan & Mutu",due:"2×24 jam",status:"Dalam review"},
    {id:"REC-260818-03",severity:"High",domain:"Pengadaan",title:"Tutup gap serapan Jawa Barat",location:"Kanwil Jawa Barat",signal:"Gap 146 ribu ton · forecast 78%",action:"Aktifkan 42 mitra penggilingan tervalidasi dan tambah pace serapan 4.800 ton/hari selama 30 hari.",impact:"Recovery potential 118 ribu ton",cost:"Sesuai HPP/kontrak",confidence:86,owner:"Direktorat Pengadaan",due:"3 hari",status:"Draf"},
    {id:"REC-260818-04",severity:"High",domain:"Distribusi",title:"Pulihkan OTIF koridor Surabaya–Kupang",location:"Jawa Timur → NTT",signal:"Delay 19 jam · OTIF 82,4%",action:"Kunci slot kapal alternatif, tambah buffer lead time 12 jam, dan prioritaskan muatan program pemerintah.",impact:"OTIF diproyeksikan 94,1%",cost:"Rp1,8 M",confidence:84,owner:"Divisi Distribusi",due:"Hari ini · 18:00 WIB",status:"Perlu approval"},
    {id:"REC-260818-05",severity:"Medium",domain:"Penyaluran",title:"Naikkan pace SPHP Sumatera Utara",location:"Kanwil Sumatera Utara",signal:"1.180 vs target 1.750 ton/hari",action:"Tambah alokasi 570 ton/hari ke 14 kabupaten/kota melalui RPK dan pasar pantauan berpermintaan tinggi.",impact:"Gap bulanan turun 12.540 ton",cost:"Dalam pagu berjalan",confidence:81,owner:"Divisi Penjualan & Penyaluran",due:"5 hari",status:"Draf"},
  ];
  const current=recommendations.find(item=>item.id===selected)??recommendations[0];
  const risks=[
    ["Shortage Papua","Persediaan","Critical","13.512 ton di bawah kebutuhan 14 hari","Rp186 M potensi service loss",92],
    ["Aging CBP NTB","Kualitas","High","45.200 ton berisiko turun mutu","Rp497 M eksposur",88],
    ["Gap serapan Jawa Barat","Pengadaan","High","146 ribu ton di bawah RKAP","118 ribu ton recovery",86],
    ["Keterlambatan kapal NTT","Distribusi","High","OTIF turun ke 82,4%","8.500 ton terdampak",84],
    ["Surplus Jawa Timur","Persediaan","Opportunity","184 ribu ton di atas buffer","Sumber redistribusi nasional",90],
    ["Pace SPHP Sumut","Penyaluran","Opportunity","Demand belum terpenuhi 570 ton/hari","+Rp74 M estimasi penjualan",81],
  ] as const;
  const actions=[
    ["1","Critical","Redistribusi 8.500 ton ke Papua","Kunci stok sumber, ruang kapal, dan kapasitas GBB Jayapura","Supply Chain + Distribusi","Hari ini","Belum dimulai"],
    ["2","High","QC ulang dan FEFO lot NTB","Verifikasi mutu sebelum dialihkan ke kanal SPHP","Persediaan + Mutu","2×24 jam","Dalam proses"],
    ["3","High","Recovery serapan Jawa Barat","Aktifkan mitra dan pantau pace harian terhadap target","Pengadaan","3 hari","Menunggu approval"],
    ["4","High","Normalisasi koridor Surabaya–Kupang","Konfirmasi kapal alternatif dan revisi ETA penerima","Distribusi","Hari ini","Dalam proses"],
    ["5","Medium","Tambah pace SPHP Sumut","Validasi demand, stok siap salur, dan titik penjualan","Penyaluran","5 hari","Belum dimulai"],
  ] as const;
  const rootDrivers=[["Kapasitas kapal dan jadwal sandar",38,"TMS/Simlog"],["Replenishment tidak mengikuti demand aktual",27,"ERP + demand wilayah"],["Lead time laut di atas baseline",21,"GPS + jadwal kapal"],["Kapasitas bongkar GBB penerima",14,"WMS"]] as const;
  return <section className="ai-decision-page" aria-label={labels[mode]}>
    <header className="ai-decision-header"><div><span>DECISION INTELLIGENCE / AI DECISION CENTER</span><h1>{labels[mode]}</h1><p>Decision support khusus operasi BULOG dengan data terukur, penjelasan model, guardrail kebijakan, dan persetujuan manusia sebelum eksekusi.</p></div><div className="ai-data-status"><i/><span><small>Data simulasi diperbarui</small><strong>18 Agustus 2026 · 08:30 WIB</strong></span><em>Model SCCT v2.4</em></div></header>
    <nav className="ai-decision-tabs" aria-label="Navigasi AI Decision Center">{(Object.keys(labels) as AIDecisionMode[]).map(key=><button type="button" key={key} className={mode===key?"active":""} onClick={()=>onSwitch(key)}>{labels[key]}</button>)}</nav>
    <section className="ai-decision-filters"><label><span>Horizon keputusan</span><select value={period} onChange={e=>setPeriod(e.target.value)}><option>Hari ini</option><option>7 hari ke depan</option><option>14 hari ke depan</option><option>30 hari ke depan</option></select></label><label><span>Cakupan</span><select value={scope} onChange={e=>setScope(e.target.value)}><option>Nasional</option><option>Sumatera</option><option>Jawa</option><option>Sulawesi</option><option>Bali & Nusra</option><option>Maluku & Papua</option></select></label><label><span>Komoditas</span><select defaultValue="Beras CBP"><option>Beras CBP</option><option>Beras Medium SPHP</option><option>Jagung</option><option>Semua komoditas</option></select></label><button type="button" onClick={()=>onNotify(`${labels[mode]} diperbarui untuk ${scope}`)}><RotateCw size={15}/>Perbarui Analisis</button></section>
    <section className="ai-decision-kpis"><article><span>Decision Health Score</span><strong>78</strong><small>Perlu perhatian · +2 vs kemarin</small></article><article><span>Risiko berdampak tinggi</span><strong>4</strong><small>2 melewati SLA respons</small></article><article><span>Rekomendasi aktif</span><strong>12</strong><small>5 memerlukan approval</small></article><article><span>Potensi nilai terlindungi</span><strong>Rp1,42 T</strong><small>Aging, service loss, dan biaya</small></article><article><span>Confidence rata-rata</span><strong>86%</strong><small>Data freshness 94%</small></article></section>
    {mode==="insights"&&<><section className="ai-narrative"><div><Sparkles size={23}/><span><small>NARASI KONDISI NASIONAL</small><h2>Ketersediaan nasional memadai, tetapi risiko terkonsentrasi pada Papua, stok aging NTB, dan gap serapan Jawa Barat.</h2><p>Stok CBP nasional berada di atas safety stock agregat. Ketimpangan antarwilayah, keterlambatan koridor laut, dan kualitas lot tua tetap memerlukan tindakan terkoordinasi agar service level program pemerintah tidak turun.</p></span></div><aside><b>Rekomendasi hari ini</b><p>Prioritaskan redistribusi 8.500 ton ke Papua, QC ulang lot 45.200 ton di NTB, dan recovery plan pengadaan Jawa Barat.</p><button onClick={()=>onSwitch("actions")}>Buka prioritas <ArrowRight size={14}/></button></aside></section><div className="ai-insight-grid"><section className="ai-card"><header><div><span>SIGNAL LINTAS DOMAIN</span><h2>Risiko &amp; Peluang Utama</h2></div><button onClick={()=>onSwitch("risks")}>Lihat semua</button></header>{risks.slice(0,4).map(([name,domain,severity,signal,impact,confidence])=><article className="ai-signal-row" key={name}><em className={String(severity).toLowerCase()}>{severity}</em><span><strong>{name}</strong><small>{domain} · {signal}</small></span><b>{confidence}%<small>confidence</small></b><span><strong>{impact}</strong><small>estimasi dampak</small></span></article>)}</section><aside className="ai-card ai-today"><header><div><span>CONTROL TOWER FOCUS</span><h2>Fokus 24 Jam</h2></div></header>{[["01","Papua","Pastikan stok sumber dan slot kapal"],["02","NTB","Selesaikan QC ulang lot berisiko"],["03","Jawa Barat","Setujui recovery plan serapan"]].map(([no,title,note])=><button key={no} onClick={()=>onSwitch("actions")}><b>{no}</b><span><strong>{title}</strong><small>{note}</small></span><ArrowRight size={14}/></button>)}</aside></div></>}
    {mode==="risks"&&<section className="ai-card ai-risk-register"><header><div><span>EARLY WARNING REGISTER</span><h2>Risiko &amp; Peluang Terukur</h2><p>Urutan mempertimbangkan dampak, urgensi, confidence, dan kemampuan intervensi.</p></div><Download size={18}/></header><div className="ai-risk-head"><span>Signal</span><span>Domain</span><span>Level</span><span>Indikator</span><span>Dampak / Nilai</span><span>Confidence</span><span>Aksi</span></div>{risks.map(([name,domain,severity,signal,impact,confidence])=><article key={name}><strong>{name}</strong><span>{domain}</span><em className={String(severity).toLowerCase()}>{severity}</em><span>{signal}</span><span>{impact}</span><b>{confidence}%</b><button onClick={()=>{setSelected(name.includes("Papua")?"REC-260818-01":name.includes("NTB")?"REC-260818-02":name.includes("Barat")?"REC-260818-03":"REC-260818-04");onSwitch("rootCause")}}>Analisis</button></article>)}</section>}
    {mode==="rootCause"&&<div className="ai-root-grid"><section className="ai-card"><header><div><span>ROOT CAUSE EXPLAINER</span><h2>{current.title}</h2><p>{current.location} · {current.signal}</p></div><em className={current.severity.toLowerCase()}>{current.severity}</em></header><div className="ai-causal-chain">{[["Signal",current.signal],["Masalah","Replenishment belum mengikuti kebutuhan layanan"],["Akar dominan","Kapasitas dan jadwal koridor distribusi"],["Dampak",current.impact]].map(([label,value],index)=><span key={label}><b>{index+1}</b><small>{label}</small><strong>{value}</strong></span>)}</div><h3>Kontribusi driver</h3><div className="ai-driver-list">{rootDrivers.map(([name,value,source])=><article key={name}><span><strong>{name}</strong><small>{source}</small></span><i><b style={{width:`${value}%`}}/></i><em>{value}%</em></article>)}</div></section><aside className="ai-card ai-evidence"><header><div><span>EVIDENCE &amp; GOVERNANCE</span><h2>Dasar Analisis</h2></div><ShieldCheck size={19}/></header>{["ERP persediaan · 08:12 WIB","WMS GBB · 08:18 WIB","TMS/Simlog · 08:21 WIB","Demand wilayah · 07:55 WIB","Parameter safety stock v3.1"].map(item=><p key={item}><CheckCircle2 size={14}/>{item}</p>)}<div><strong>Confidence {current.confidence}%</strong><small>Model tidak menggunakan sumber di luar domain BULOG. Nilai biaya bersifat estimasi dan perlu validasi unit terkait.</small></div><button onClick={()=>onSwitch("recommendations")}>Lihat rekomendasi <ArrowRight size={14}/></button></aside></div>}
    {mode==="actions"&&<section className="ai-card ai-action-board"><header><div><span>ACTION PRIORITIZATION</span><h2>Prioritas Tindakan Nasional</h2><p>Diurutkan berdasarkan dampak layanan publik, risiko mutu, SLA, dan kesiapan eksekusi.</p></div><button onClick={()=>onNotify("Daftar tindakan diekspor") }><Download size={14}/>Ekspor</button></header><div className="ai-action-head"><span>Prioritas</span><span>Tindakan</span><span>Owner</span><span>Deadline</span><span>Status</span><span>Aksi</span></div>{actions.map(([rank,severity,title,note,owner,due,status])=><article key={rank}><span><b>{rank}</b><em className={String(severity).toLowerCase()}>{severity}</em></span><span><strong>{title}</strong><small>{note}</small></span><span>{owner}</span><span>{due}</span><em className={String(status).toLowerCase().replaceAll(" ","-")}>{status}</em><button onClick={()=>onNotify(`${title} ditugaskan`)}>Tugaskan</button></article>)}</section>}
    {mode==="recommendations"&&<div className="ai-recommend-grid"><section className="ai-card ai-recommend-list"><header><div><span>RECOMMENDATION QUEUE</span><h2>Rekomendasi Model</h2></div><span>{recommendations.length} ditampilkan</span></header>{recommendations.map(item=><button type="button" className={selected===item.id?"selected":""} key={item.id} onClick={()=>setSelected(item.id)}><em className={item.severity.toLowerCase()}>{item.severity}</em><span><strong>{item.title}</strong><small>{item.id} · {item.domain} · {item.location}</small></span><b>{item.confidence}%<small>confidence</small></b><span>{item.status}</span></button>)}</section><aside className="ai-card ai-recommend-detail"><header><div><span>DECISION BRIEF</span><h2>{current.title}</h2></div><em className={current.severity.toLowerCase()}>{current.severity}</em></header><dl><div><dt>Signal</dt><dd>{current.signal}</dd></div><div><dt>Rekomendasi</dt><dd>{current.action}</dd></div><div><dt>Dampak terukur</dt><dd>{current.impact}</dd></div><div><dt>Estimasi biaya</dt><dd>{current.cost}</dd></div><div><dt>Owner</dt><dd>{current.owner}</dd></div><div><dt>Deadline</dt><dd>{current.due}</dd></div></dl><div className="ai-confidence"><span><b style={{width:`${current.confidence}%`}}/></span><strong>{current.confidence}% confidence</strong><small>Wajib validasi stok, mutu, kapasitas, biaya, dan kewenangan sebelum eksekusi.</small></div><footer><button onClick={()=>onNotify(`${current.id} ditolak dan dikembalikan ke analis`)}>Kembalikan</button><button onClick={()=>onNotify(`${current.id} dikirim ke Approval Center`)}><Send size={14}/>Ajukan Approval</button></footer></aside></div>}
    <footer className="ai-decision-disclaimer"><AlertTriangle size={15}/><span><b>Decision support—bukan keputusan otomatis.</b> Data pada demo bersifat representatif. Eksekusi wajib memakai data resmi terbaru, aturan CBP/SPHP, HPP/HET, SLA, kewenangan organisasi, maker-checker, dan audit trail BULOG.</span></footer>
  </section>;
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

const parameterTabs:{mode:ParameterMode;label:string;icon:ComponentType<{size?:number}>}[]=[
  {mode:"targetKpi",label:"Target KPI",icon:Target},{mode:"alertThreshold",label:"Threshold Alert",icon:BellRing},{mode:"sla",label:"SLA",icon:Clock3},{mode:"calendar",label:"Kalender Operasional",icon:CalendarDays},
];
const targetKpiRows=[
  ["KPI-INV-001","Persediaan","Kecukupan stok CBP nasional","≥ 1,20","1,00–1,19","< 1,00","rasio","Harian","Divisi Supply Chain","Aktif"],
  ["KPI-INV-004","Persediaan","Okupansi gudang operasional","≤ 85","86–90","> 90","%","Harian","Divisi Pergudangan","Aktif"],
  ["KPI-PRC-002","Pengadaan","Realisasi terhadap trajectory","≥ 95","85–94","< 85","%","Harian","Divisi Pengadaan","Aktif"],
  ["KPI-SLS-003","Penyaluran","Service level program pemerintah","≥ 97","92–96","< 92","%","Mingguan","Divisi Penyaluran","Aktif"],
  ["KPI-DST-001","Distribusi","On Time In Full (OTIF)","≥ 95","90–94","< 90","%","Harian","Divisi Logistik","Aktif"],
  ["KPI-FIN-006","Keuangan","Piutang jatuh tempo >30 hari","≤ 8","9–12","> 12","%","Bulanan","Divisi Keuangan","Aktif"],
  ["KPI-QLT-002","Mutu","Lot memenuhi standar mutu","≥ 98","95–97","< 95","%","Harian","Divisi Quality Control","Aktif"],
];
const alertThresholdRows=[
  ["ALT-INV-SS","Persediaan","Stok di bawah minimum","< 100% SS","< 85% SS","2 snapshot","Kanwil/Kancab","SCCT + Email","Aktif"],
  ["ALT-WHS-OCC","Gudang","Okupansi melewati batas","≥ 86%","≥ 91%","4 jam","Gudang","SCCT + WhatsApp","Aktif"],
  ["ALT-QLT-AGE","Mutu","Lot mendekati batas simpan","≥ 75% umur","≥ 90% umur","1 snapshot","Lot/Gudang","SCCT + Email","Aktif"],
  ["ALT-PRC-GAP","Pengadaan","Gap realisasi trajectory","≤ 90%","≤ 80%","2 hari","Kanwil","SCCT + Email","Aktif"],
  ["ALT-DST-OTIF","Distribusi","Prediksi OTIF rendah","< 92%","< 85%","1 trip","Shipment","SCCT + WhatsApp","Aktif"],
  ["ALT-FIN-AR","Keuangan","Piutang melewati jatuh tempo","> 15 hari","> 30 hari","1 hari","Pelanggan","SCCT + Email","Draft"],
];
const slaParameterRows=[
  ["SLA-CRIT-01","Critical","15 menit","30 menit","4 jam","50% · 80% · breach","24x7","Persediaan, Mutu, Distribusi","Aktif"],
  ["SLA-HIGH-01","High","30 menit","1 jam","8 jam","60% · 85% · breach","24x7","Semua domain operasional","Aktif"],
  ["SLA-MED-01","Medium","2 jam","4 jam","2 hari kerja","75% · breach","Kalender kantor","Semua domain","Aktif"],
  ["SLA-LOW-01","Low","4 jam","1 hari kerja","5 hari kerja","80% · breach","Kalender kantor","Semua domain","Aktif"],
  ["SLA-DATA-01","Data Quality","30 menit","2 jam","6 jam","50% · 80% · breach","24x7","Integrasi dan data","Aktif"],
];
const calendarEvents=[
  ["17 Agu 2026","Hari Kemerdekaan RI","Libur Nasional","Nasional","Kapasitas kantor 0%; monitoring SCCT 24x7","Disahkan"],
  ["18–21 Agu 2026","Recovery pascalibur","Operasional Khusus","Nasional","Prioritas inbound, SPHP, dan backlog pengiriman","Aktif"],
  ["24–28 Agu 2026","Puncak panen II Jawa","Musim Pengadaan","Jawa","Tambah slot penerimaan +25%; QC dua shift","Aktif"],
  ["01–15 Sep 2026","Stabilisasi pasokan Papua","Program Penyaluran","Papua–Maluku","Reserved capacity 18.500 ton","Terjadwal"],
  ["25 Des 2026","Hari Raya Natal","Libur Nasional","Nasional","Moda laut diproteksi H-14; command center siaga","Disahkan"],
  ["01 Jan 2027","Tahun Baru","Libur Nasional","Nasional","Freeze perubahan master 12 jam","Disahkan"],
];

function ParameterManagementPage({mode,onSwitch,onNotify}:{mode:ParameterMode;onSwitch:(mode:ParameterMode)=>void;onNotify:(message:string)=>void}){
  const [query,setQuery]=useState("");
  const [status,setStatus]=useState("Semua Status");
  const [selected,setSelected]=useState<string[]|null>(null);
  const [editOpen,setEditOpen]=useState(false);
  const config={
    targetKpi:{title:"Target KPI",subtitle:"Sasaran kinerja, zona peringatan, frekuensi evaluasi, dan pemilik KPI lintas rantai pasok.",rows:targetKpiRows,headers:["Kode","Domain","Indikator","Target","Warning","Critical","Unit","Evaluasi","Pemilik","Status"]},
    alertThreshold:{title:"Threshold Alert",subtitle:"Ambang deteksi, persistensi sinyal, cakupan, dan kanal notifikasi untuk exception SCCT.",rows:alertThresholdRows,headers:["Kode","Domain","Sinyal","Warning","Critical","Persistensi","Cakupan","Kanal","Status"]},
    sla:{title:"Service Level Agreement",subtitle:"Batas acknowledge, respons, resolusi, serta eskalasi berdasarkan severity dan kalender operasional.",rows:slaParameterRows,headers:["Kode","Severity","Acknowledge","Respons","Resolusi","Eskalasi","Kalender","Cakupan","Status"]},
    calendar:{title:"Kalender Operasional",subtitle:"Hari kerja, hari libur, musim pengadaan, program penyaluran, dan kapasitas operasi nasional.",rows:calendarEvents,headers:["Tanggal","Agenda","Jenis","Cakupan","Dampak Operasional","Status"]},
  }[mode];
  const filtered=config.rows.filter(row=>row.join(" ").toLowerCase().includes(query.toLowerCase())&&(status==="Semua Status"||row.at(-1)===status));
  const kpis=mode==="targetKpi"?[["KPI aktif","27","6 domain"],["On track","19","70,4%"],["Perlu perhatian","6","22,2%"],["Kritis","2","7,4%"]]:mode==="alertThreshold"?[["Rule aktif","18","5 domain"],["Critical rule","7","respons 24x7"],["Alert hari ini","12","3 critical"],["Signal noise","2,8%","target <5%"]]:mode==="sla"?[["Policy aktif","5","semua severity"],["Compliance","94,6%","target ≥95%"],["Open breach","4","3 critical"],["Median resolve","7,8 jam","30 hari"]]:[["Agenda aktif","24","tahun 2026"],["Hari kerja","245","nasional"],["Periode khusus","11","lintas wilayah"],["Kesiapan data","100%","sinkron nasional"]];
  const relation=mode==="targetKpi"?"Target KPI menjadi baseline National Overview, Regional Performance, Executive Report, dan rekomendasi AI.":mode==="alertThreshold"?"Threshold menghasilkan alert, membuka case, memulai SLA, dan meneruskan exception ke jalur eskalasi.":mode==="sla"?"SLA memakai severity, kalender operasional, jam kerja wilayah, ownership, dan aturan eskalasi Alert Center.":"Kalender memengaruhi SLA, forecast, jadwal pengadaan, kapasitas gudang, rute distribusi, dan program penyaluran.";
  return <main className="parameter-page">
    <header className="parameter-header"><div><span>MASTER DATA / PARAMETER</span><h1>{config.title}</h1><p>{config.subtitle}</p></div><div className="parameter-fresh"><i/><span><small>Konfigurasi terakhir</small><strong>19 Agustus 2026 · 09:12 WIB</strong></span><em>Versi 4.2</em></div></header>
    <nav className="parameter-tabs">{parameterTabs.map(tab=>{const Icon=tab.icon;return <button key={tab.mode} className={mode===tab.mode?"active":""} onClick={()=>onSwitch(tab.mode)}><Icon size={16}/>{tab.label}</button>})}</nav>
    <section className="parameter-kpis">{kpis.map(([label,value,note],index)=><article key={label} className={index===2?"watch":index===3?"risk":""}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</section>
    {mode==="calendar"&&<section className="parameter-calendar-strip"><div><CalendarDays size={20}/><span><small>PERIODE AKTIF</small><strong>Agustus 2026</strong></span></div><div className="calendar-days">{Array.from({length:14},(_,i)=>i+15).map(day=><span key={day} className={day===17?"holiday":day===19?"today":day>=24?"season":""}><small>{["Sab","Min","Sen","Sel","Rab","Kam","Jum"][(day-15)%7]}</small><b>{day}</b></span>)}</div><aside><i/><span><b>Command Center aktif</b><small>Monitoring exception tetap berjalan 24x7</small></span></aside></section>}
    <section className="parameter-toolbar"><label><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={`Cari ${config.title.toLowerCase()}…`}/></label><select value={status} onChange={e=>setStatus(e.target.value)}><option>Semua Status</option><option>Aktif</option><option>Draft</option><option>Disahkan</option><option>Terjadwal</option></select><button onClick={()=>onNotify(`Riwayat perubahan ${config.title} dibuka`)}><Clock3 size={15}/>Riwayat Perubahan</button><button className="primary" onClick={()=>setEditOpen(true)}><Plus size={16}/>Tambah Parameter</button></section>
    <section className="parameter-table-card"><header><div><span>CONFIGURATION REGISTER</span><h2>{mode==="calendar"?"Agenda dan dampak kapasitas":"Daftar parameter yang berlaku"}</h2></div><small>{filtered.length} konfigurasi · maker-checker aktif</small></header><div className={`parameter-table mode-${mode}`}><div className="parameter-table-head">{config.headers.map(h=><b key={h}>{h}</b>)}<b>Aksi</b></div>{filtered.map((row,index)=><button key={`${row[0]}-${index}`} onClick={()=>setSelected(row)}>{row.map((cell,i)=><span key={`${cell}-${i}`} className={(String(cell)==="Aktif"||String(cell)==="Disahkan")?"good":String(cell)==="Draft"?"watch":""}>{i===0?<strong>{cell}</strong>:cell}</span>)}<ChevronRight size={16}/></button>)}</div><footer><span>Menampilkan {filtered.length} dari {config.rows.length} konfigurasi</span><p><ShieldCheck size={14}/> Perubahan memerlukan maker-checker dan dicatat pada audit trail.</p></footer></section>
    <section className="parameter-relationship"><Database size={19}/><div><strong>Relasi konfigurasi SCCT</strong><p>{relation}</p></div><button onClick={()=>onNotify("Peta relasi parameter dibuka")}>Lihat data lineage <ArrowRight size={14}/></button></section>
    {(selected||editOpen)&&<div className="parameter-modal-backdrop" onMouseDown={e=>{if(e.currentTarget===e.target){setSelected(null);setEditOpen(false)}}}><section className="parameter-modal"><header><div><span>{editOpen?"PARAMETER BARU":`${selected?.[0]} · DETAIL KONFIGURASI`}</span><h2>{editOpen?`Tambah ${config.title}`:selected?.[2]??selected?.[1]}</h2><p>Versi efektif, governance, dampak sistem, dan riwayat persetujuan.</p></div><button onClick={()=>{setSelected(null);setEditOpen(false)}}><X size={19}/></button></header><div className="parameter-modal-grid"><section><h3>Nilai konfigurasi</h3>{config.headers.slice(0,-1).map((label,i)=><label key={label}><span>{label}</span>{editOpen?<input placeholder={`Masukkan ${label.toLowerCase()}`}/>:<strong>{selected?.[i]??"-"}</strong>}</label>)}</section><aside><h3>Governance & dampak</h3>{["Maker: Andini Rahma · Master Data","Checker: Kepala Divisi terkait","Efektif: 19 Agustus 2026","Sumber: SK/SE dan keputusan bisnis","Digunakan oleh 8 modul SCCT"].map(item=><p key={item}><CheckCircle2 size={14}/>{item}</p>)}<div><ShieldCheck size={18}/><span><b>Kontrol perubahan aktif</b><small>Versi sebelumnya tersedia untuk audit dan rollback.</small></span></div></aside></div><footer><button onClick={()=>{setSelected(null);setEditOpen(false)}}>Batal</button>{selected&&<button onClick={()=>onNotify("Audit trail parameter dibuka")}><Clock3 size={14}/>Audit Trail</button>}<button className="primary" onClick={()=>{onNotify(editOpen?"Draft parameter berhasil dibuat":"Parameter dibuka dalam mode edit");setSelected(null);setEditOpen(false)}}><Save size={15}/>{editOpen?"Simpan Draft":"Edit Parameter"}</button></footer></section></div>}
  </main>;
}

type PartnerRecord={id:string;name:string;type:string;region:string;branch:string;commodity:string;volume:string;performance:number;contract:string;status:string;risk:string;contact:string;address:string;detail:string;documents:string[];metrics:[string,string][]};
const partnerData:Record<PartnerMode,PartnerRecord[]>={
  suppliers:[
    {id:"MKP-01001-024",name:"Mitra Penggilingan Seulawah",type:"MKP Penggilingan",region:"Aceh",branch:"Kancab Lhokseumawe",commodity:"GKG · Beras Medium",volume:"18.420 ton YTD",performance:96,contract:"PKS-2026-01024",status:"Aktif",risk:"Rendah",contact:"PIC Pengadaan · 0812-0000-1024",address:"Kab. Aceh Besar, Aceh",detail:"Mitra Kerja Pengadaan dalam negeri untuk penerimaan gabah dan beras sesuai pemeriksaan mutu BULOG.",documents:["NIB & legalitas usaha","Sertifikat fasilitas pengolahan","NPWP dan rekening tervalidasi","Pakta integritas 2026"],metrics:[["Acceptance mutu","97,2%"],["OTD pasokan","94,8%"],["Lead time","2,4 hari"],["Open PO","2.840 ton"]]},
    {id:"MKP-13001-118",name:"Sentra Pangan Karawang",type:"MKP Penggilingan",region:"Jawa Barat",branch:"Kancab Karawang",commodity:"GKP · GKG · Beras",volume:"42.680 ton YTD",performance:91,contract:"PKS-2026-13118",status:"Aktif",risk:"Monitor",contact:"PIC Pengadaan · 0812-0000-3118",address:"Kab. Karawang, Jawa Barat",detail:"Pemasok multi-komoditas pada sentra produksi dengan jadwal penerimaan berbasis trajectory pengadaan.",documents:["NIB & legalitas usaha","Hasil audit kapasitas","Sertifikat tera timbangan","Pakta integritas 2026"],metrics:[["Acceptance mutu","94,6%"],["OTD pasokan","89,2%"],["Lead time","3,1 hari"],["Open PO","6.120 ton"]]},
    {id:"MKP-18001-073",name:"Penggilingan Padi Sriwijaya",type:"MKP Penggilingan",region:"Sumatera Selatan",branch:"Kancab Palembang",commodity:"GKG · Beras Medium",volume:"31.260 ton YTD",performance:94,contract:"PKS-2026-18073",status:"Aktif",risk:"Rendah",contact:"PIC Pengadaan · 0812-0000-8073",address:"Kab. Banyuasin, Sumatera Selatan",detail:"Mitra pengadaan pada koridor sentra panen Sumsel dengan dukungan dryer dan laboratorium mutu.",documents:["Legalitas badan usaha","Kapasitas dryer terverifikasi","Dokumen rekening","Hasil inspeksi QC"],metrics:[["Acceptance mutu","96,1%"],["OTD pasokan","93,4%"],["Lead time","2,8 hari"],["Open PO","3.460 ton"]]},
    {id:"MKP-22001-044",name:"Koperasi Pangan Mataram",type:"Koperasi Pemasok",region:"Nusa Tenggara Barat",branch:"Kancab Mataram",commodity:"Beras Medium",volume:"12.850 ton YTD",performance:86,contract:"PKS-2026-22044",status:"Pembinaan",risk:"Sedang",contact:"Ketua Koperasi · 0812-0000-2044",address:"Kab. Lombok Tengah, NTB",detail:"Koperasi pemasok yang mengonsolidasikan hasil anggota dan mengikuti program peningkatan mutu pascapanen.",documents:["Akta koperasi","Daftar anggota","NPWP koperasi","Rencana perbaikan mutu"],metrics:[["Acceptance mutu","91,8%"],["OTD pasokan","84,3%"],["Lead time","4,2 hari"],["Open PO","1.180 ton"]]},
  ],
  transporters:[
    {id:"TRN-NAS-001",name:"PT Jasa Prima Logistik BULOG",type:"Freight & Warehousing",region:"Nasional",branch:"Kantor Pusat",commodity:"Pangan multi-komoditas",volume:"1,42 juta ton YTD",performance:95,contract:"KPA-LOG-2026-001",status:"Aktif",risk:"Rendah",contact:"Control Tower Transport · 021-0000-0001",address:"Jakarta Selatan",detail:"Penyedia jasa logistik dan angkutan pendukung penyebaran stok nasional, termasuk freight forwarding, warehousing, dan project shipment.",documents:["Kontrak payung nasional","SLA & matriks tarif","Daftar armada dan vendor","Asuransi pengangkutan"],metrics:[["OTIF","95,4%"],["Damage rate","0,18%"],["GPS/AIS coverage","98,7%"],["Shipment aktif","186"]]},
    {id:"TRN-SEA-024",name:"Mitra Angkutan Laut Timur",type:"Laut · Charter/liner",region:"Sulawesi–Maluku–Papua",branch:"Kanwil Sulselbar",commodity:"Beras CBP",volume:"286.400 ton YTD",performance:88,contract:"KPA-SEA-2026-024",status:"Aktif",risk:"Monitor",contact:"Marine Ops · 0812-0000-6024",address:"Makassar, Sulawesi Selatan",detail:"Penyedia moda laut untuk koridor antarpulau dengan pemantauan AIS, ETA, POD, dan risiko cuaca.",documents:["SIUPAL/izin terkait","Manifest armada","Asuransi kargo","SLA koridor timur"],metrics:[["OTIF","88,6%"],["Damage rate","0,31%"],["AIS coverage","96,2%"],["Shipment aktif","32"]]},
    {id:"TRN-LND-118",name:"Mitra Truk Pangan Jawa",type:"Darat · Trucking",region:"Jawa",branch:"Kanwil Jawa Timur",commodity:"Beras · Gula · Minyak",volume:"418.600 ton YTD",performance:93,contract:"KPA-LND-2026-118",status:"Aktif",risk:"Rendah",contact:"Fleet Control · 0812-0000-1118",address:"Surabaya, Jawa Timur",detail:"Transporter first-mile dan secondary distribution dengan geofencing, e-POD, dan kepatuhan armada pangan.",documents:["Izin angkutan","Daftar 428 armada","Asuransi kendaraan/kargo","Audit K3 transportasi"],metrics:[["OTIF","93,8%"],["Damage rate","0,12%"],["GPS coverage","99,1%"],["Shipment aktif","94"]]},
    {id:"TRN-AIR-007",name:"Mitra Kargo Udara Papua",type:"Udara · Kargo",region:"Papua",branch:"Kanwil Papua",commodity:"Beras CBP darurat",volume:"8.420 ton YTD",performance:84,contract:"KPA-AIR-2026-007",status:"Terbatas",risk:"Tinggi",contact:"Air Cargo Desk · 0812-0000-7007",address:"Jayapura, Papua",detail:"Moda udara untuk wilayah sulit dijangkau dan respons darurat dengan kontrol kapasitas, cuaca, dan chain of custody.",documents:["Kontrak koridor khusus","Daftar operator udara","Asuransi kargo","Prosedur darurat"],metrics:[["OTIF","84,2%"],["Damage rate","0,24%"],["Tracking coverage","91,5%"],["Shipment aktif","11"]]},
  ],
  customers:[
    {id:"CUS-RPK-01044",name:"RPK Pangan Ulee Kareng",type:"Rumah Pangan Kita",region:"Aceh",branch:"Kancab Lhokseumawe",commodity:"SPHP · BerasKita · Minyak",volume:"1.140 ton YTD",performance:97,contract:"RPK-2026-01044",status:"Aktif",risk:"Rendah",contact:"Pemilik Outlet · 0812-0000-1044",address:"Banda Aceh, Aceh",detail:"Mitra jaringan ritel binaan untuk memperluas akses pangan dan penyaluran sesuai harga serta ketentuan program.",documents:["Perjanjian RPK","NIB/KTP penanggung jawab","Rekening tervalidasi","Pakta kepatuhan harga"],metrics:[["Order fulfillment","97,4%"],["Kepatuhan HET","100%"],["DSO","7 hari"],["Outlet aktif","4"]]},
    {id:"CUS-MRT-00018",name:"Jaringan Ritel Modern Nasional",type:"Ritel Modern",region:"Nasional",branch:"Kantor Pusat",commodity:"SPHP · Produk Komersial",volume:"186.200 ton YTD",performance:94,contract:"KPA-SLS-2026-018",status:"Aktif",risk:"Rendah",contact:"Key Account · 021-0000-0018",address:"Nasional",detail:"Pelanggan ritel modern untuk penjualan komersial dan outlet resmi SPHP sesuai alokasi, HET, serta pelaporan sell-out.",documents:["Kontrak key account","Daftar outlet aktif","Skema harga & rebate","Laporan sell-out"],metrics:[["Fill rate","95,1%"],["Kepatuhan HET","99,6%"],["DSO","24 hari"],["Outlet aktif","2.840"]]},
    {id:"CUS-GOV-3201",name:"Pemerintah Daerah Jawa Barat",type:"Pemda / GPM",region:"Jawa Barat",branch:"Kanwil Jawa Barat",commodity:"Beras SPHP",volume:"42.800 ton YTD",performance:91,contract:"PKS-GPM-2026-3201",status:"Aktif",risk:"Monitor",contact:"Tim Pengendalian Inflasi Daerah",address:"Bandung, Jawa Barat",detail:"Mitra pemerintah daerah untuk Gerakan Pangan Murah dan stabilisasi pasokan/harga di wilayah prioritas.",documents:["PKS program","Surat alokasi","Daftar lokasi GPM","BAST dan laporan realisasi"],metrics:[["Realisasi alokasi","91,2%"],["Kepatuhan HET","100%"],["Settlement","18 hari"],["GPM terlaksana","126"]]},
    {id:"CUS-B2B-0812",name:"Mitra Horeka Sulselbar",type:"B2B / Horeka",region:"Sulawesi Selatan",branch:"Kanwil Sulselbar",commodity:"Beras Premium 25 kg",volume:"8.640 ton YTD",performance:87,contract:"KPA-B2B-2026-0812",status:"Aktif",risk:"Sedang",contact:"Account Manager · 0812-0000-0812",address:"Makassar, Sulawesi Selatan",detail:"Segmen komersial hotel, restoran, dan katering dengan kontrol limit kredit dan service level order.",documents:["Kontrak penjualan","Limit kredit","NPWP dan legalitas","Daftar delivery point"],metrics:[["Fill rate","91,4%"],["On-time payment","86,8%"],["DSO","34 hari"],["Order aktif","18"]]},
  ],
  farmerGroups:[
    {id:"KT-3308-014",name:"Gapoktan Tani Makmur",type:"Gapoktan",region:"Jawa Tengah",branch:"Kancab Surakarta",commodity:"GKP · GKG",volume:"6.840 ton YTD",performance:95,contract:"ONFARM-2026-330814",status:"Aktif",risk:"Rendah",contact:"Ketua Gapoktan · 0812-0000-3314",address:"Kab. Klaten, Jawa Tengah",detail:"Gabungan kelompok tani dalam kemitraan pengadaan dan pembinaan budidaya/pascapanen untuk kepastian serapan hasil.",documents:["SK pembentukan Gapoktan","Daftar petani anggota/KTP","Data lahan dan varietas","Rekening kelompok"],metrics:[["Petani anggota","486"],["Luas binaan","1.240 ha"],["Produktivitas","6,2 ton/ha"],["Acceptance mutu","96,4%"]]},
    {id:"KT-3518-027",name:"Poktan Sumber Rejeki",type:"Poktan",region:"Jawa Timur",branch:"Kancab Bojonegoro",commodity:"GKP",volume:"3.260 ton YTD",performance:92,contract:"ONFARM-2026-351827",status:"Aktif",risk:"Rendah",contact:"Ketua Poktan · 0812-0000-3527",address:"Kab. Bojonegoro, Jawa Timur",detail:"Kelompok tani pemasok gabah dengan jadwal panen, titik kumpul, dan pendampingan kualitas terhubung ke Kancab.",documents:["SK kelompok","Daftar 214 anggota","Peta lahan","Rencana panen"],metrics:[["Petani anggota","214"],["Luas binaan","684 ha"],["Produktivitas","5,9 ton/ha"],["Acceptance mutu","94,8%"]]},
    {id:"KT-1607-009",name:"Gapoktan Sriwijaya Pangan",type:"Gapoktan",region:"Sumatera Selatan",branch:"Kancab Palembang",commodity:"GKP · GKG",volume:"5.180 ton YTD",performance:88,contract:"ONFARM-2026-160709",status:"Pembinaan",risk:"Sedang",contact:"Ketua Gapoktan · 0812-0000-1609",address:"Kab. Banyuasin, Sumatera Selatan",detail:"Gapoktan sentra rawa pasang surut dengan kebutuhan penguatan dryer dan disiplin jadwal pengiriman.",documents:["SK pembentukan","Daftar anggota/KTP","Data lahan","Rencana perbaikan mutu"],metrics:[["Petani anggota","372"],["Luas binaan","1.080 ha"],["Produktivitas","5,4 ton/ha"],["Acceptance mutu","91,6%"]]},
    {id:"KT-5202-006",name:"Poktan Lombok Sejahtera",type:"Poktan",region:"Nusa Tenggara Barat",branch:"Kancab Mataram",commodity:"GKP",volume:"2.740 ton YTD",performance:84,contract:"ONFARM-2026-520206",status:"Pembinaan",risk:"Tinggi",contact:"Ketua Poktan · 0812-0000-5206",address:"Kab. Lombok Tengah, NTB",detail:"Kelompok tani pada wilayah rawan kekeringan yang dipantau melalui forecast panen dan dukungan sarana pascapanen.",documents:["SK kelompok","Daftar anggota/KTP","Data lahan","Rencana mitigasi musim"],metrics:[["Petani anggota","168"],["Luas binaan","472 ha"],["Produktivitas","4,8 ton/ha"],["Acceptance mutu","89,7%"]]},
  ],
};

function PartnerManagementPage({mode,onSwitch,onNotify}:{mode:PartnerMode;onSwitch:(mode:PartnerMode)=>void;onNotify:(message:string)=>void}){
  const [query,setQuery]=useState("");const [region,setRegion]=useState("Semua Wilayah");const [selected,setSelected]=useState<PartnerRecord|null>(partnerData[mode][0]);const [modalOpen,setModalOpen]=useState(false);
  const config={suppliers:{title:"Pemasok",subtitle:"Kelola Mitra Kerja Pengadaan, penggilingan, koperasi, kontrak pasokan, mutu, dan kinerja penerimaan.",icon:BriefcaseBusiness,kpis:[["Mitra aktif","1.842","87% tervalidasi"],["Volume YTD","2,61 jt ton","91,6% domestik"],["Acceptance mutu","94,8%","target ≥95%"],["Open commitment","386 rb ton","30 hari"]]},transporters:{title:"Transporter",subtitle:"Kontrol penyedia moda darat, laut, dan udara, kontrak koridor, armada, tracking, OTIF, serta klaim angkutan.",icon:Truck,kpis:[["Transporter aktif","146","34 Kanwil"],["Shipment YTD","38.420","multi-moda"],["OTIF nasional","93,6%","target ≥95%"],["Klaim terbuka","27","Rp4,8 miliar"]]},customers:{title:"Pelanggan",subtitle:"Kelola RPK, ritel modern, pemerintah, BUMN, distributor, dan pelanggan komersial beserta order, kredit, serta kepatuhan harga.",icon:UserRound,kpis:[["Pelanggan aktif","4.286","seluruh kanal"],["Revenue YTD","Rp18,74 T","91,8% target"],["Fill rate","94,6%","target ≥97%"],["Piutang at risk","Rp326 M",">30 hari"]]},farmerGroups:{title:"Kelompok Tani",subtitle:"Hubungkan Poktan/Gapoktan, petani anggota, lahan, kalender panen, pembinaan, mutu, dan realisasi serapan.",icon:Users,kpis:[["Poktan/Gapoktan","2.318","terdaftar"],["Petani anggota","186.420","terpetakan"],["Luas binaan","412 rb ha","nasional"],["Serapan YTD","684 rb ton","24% domestik"]]}}[mode];
  const rows=partnerData[mode].filter(x=>(region==="Semua Wilayah"||x.region===region)&&`${x.id} ${x.name} ${x.type} ${x.region} ${x.commodity}`.toLowerCase().includes(query.toLowerCase()));const Icon=config.icon;
  const tabs:[PartnerMode,string,ComponentType<{size?:number}>][]=[["suppliers","Pemasok",BriefcaseBusiness],["transporters","Transporter",Truck],["customers","Pelanggan",UserRound],["farmerGroups","Kelompok Tani",Users]];
  return <main className="partner-page"><header className="partner-header"><div><span>MASTER DATA / MITRA</span><h1>{config.title}</h1><p>{config.subtitle}</p></div><div className="partner-fresh"><i/><span><small>Master data terakhir</small><strong>19 Agustus 2026 · 09:20 WIB</strong></span><em>Data demo</em></div></header><nav className="partner-tabs">{tabs.map(([key,label,TabIcon])=><button key={key} className={mode===key?"active":""} onClick={()=>onSwitch(key)}><TabIcon size={16}/>{label}</button>)}</nav><section className="partner-kpis">{config.kpis.map(([label,value,note],i)=><article key={label} className={i===3?"risk":""}><Icon size={18}/><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</section><section className="partner-toolbar"><label><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={`Cari ${config.title.toLowerCase()}, kode, komoditas…`}/></label><select value={region} onChange={e=>setRegion(e.target.value)}><option>Semua Wilayah</option>{Array.from(new Set(partnerData[mode].map(x=>x.region))).map(x=><option key={x}>{x}</option>)}</select><button onClick={()=>onNotify(`Daftar ${config.title} diekspor`)}><Download size={15}/>Ekspor</button><button className="primary" onClick={()=>onNotify(`Form registrasi ${config.title} dibuka`)}><Plus size={16}/>Registrasi Mitra</button></section><div className="partner-workspace"><section className="partner-list"><header><div><span>PARTNER REGISTER</span><h2>Daftar {config.title}</h2></div><small>{rows.length} record ditampilkan</small></header><div className="partner-list-head"><b>Mitra / Kode</b><b>Jenis / Komoditas</b><b>Wilayah / Unit</b><b>Volume</b><b>Skor</b><b>Kontrak</b><b>Status / Risiko</b><b/></div>{rows.map(item=><button key={item.id} className={selected?.id===item.id?"selected":""} onClick={()=>setSelected(item)}><span><strong>{item.name}</strong><small>{item.id}</small></span><span><strong>{item.type}</strong><small>{item.commodity}</small></span><span><strong>{item.region}</strong><small>{item.branch}</small></span><b>{item.volume}</b><span className="partner-score"><i><em style={{width:`${item.performance}%`}}/></i><strong>{item.performance}</strong></span><span><strong>{item.contract}</strong><small>Efektif 2026</small></span><span><em className="status">{item.status}</em><small className={`risk ${item.risk.toLowerCase()}`}>{item.risk}</small></span><ChevronRight size={16}/></button>)}</section><aside className="partner-side">{selected&&<><header><div><span>PARTNER 360°</span><h2>{selected.name}</h2><p>{selected.id} · {selected.type}</p></div><em>{selected.performance}</em></header><div className="partner-side-status"><span><i/>{selected.status}</span><b>Risiko {selected.risk}</b></div><p>{selected.detail}</p><div className="partner-side-metrics">{selected.metrics.map(([label,value])=><span key={label}><small>{label}</small><strong>{value}</strong></span>)}</div><dl><div><dt>Wilayah / Unit</dt><dd>{selected.region} · {selected.branch}</dd></div><div><dt>Alamat</dt><dd>{selected.address}</dd></div><div><dt>Kontak</dt><dd>{selected.contact}</dd></div><div><dt>Kontrak</dt><dd>{selected.contract}</dd></div></dl><button onClick={()=>setModalOpen(true)}><Eye size={15}/>Buka Detail Mitra</button></>}</aside></div><section className="partner-insight"><Sparkles size={19}/><div><strong>Insight portofolio mitra</strong><p>{mode==="suppliers"?"Konsentrasi pasokan terbesar berada pada mitra penggilingan; prioritaskan diversifikasi Gapoktan dan validasi kapasitas dryer di wilayah dengan acceptance mutu <95%.":mode==="transporters"?"Koridor laut timur menjadi kontributor utama risiko OTIF. Pastikan AIS aktif, slot sandar terkonfirmasi, dan moda alternatif tersedia sebelum SLA mencapai 80%.":mode==="customers"?"Pelanggan B2B/Horeka menunjukkan DSO tertinggi. Terapkan credit hold otomatis pada limit terlampaui tanpa mengganggu penyaluran program pemerintah.":"Produktivitas dan mutu kelompok binaan perlu dibaca bersama kalender panen. Arahkan pendampingan dryer ke kelompok dengan acceptance <92%."}</p></div><button onClick={()=>onNotify("Analisis portofolio mitra dibuka")}>Analisis lengkap <ArrowRight size={14}/></button></section><footer className="partner-disclaimer"><AlertTriangle size={15}/><span><b>Data demonstrasi realistis.</b> Identitas selain entitas resmi yang disebutkan bersifat representatif. Produksi wajib terhubung ke master vendor/pelanggan, kontrak, e-procurement, ERP, TMS, serta dokumen verifikasi resmi BULOG.</span></footer>{modalOpen&&selected&&<div className="partner-modal-backdrop" onMouseDown={e=>{if(e.currentTarget===e.target)setModalOpen(false)}}><section className="partner-modal"><header><div><span>{selected.id} · PARTNER 360°</span><h2>{selected.name}</h2><p>{selected.type} · {selected.region}</p></div><button onClick={()=>setModalOpen(false)}><X size={19}/></button></header><div className="partner-modal-grid"><section><h3>Profil & hubungan bisnis</h3><p>{selected.detail}</p><div className="partner-profile-grid"><span><small>Komoditas/layanan</small><b>{selected.commodity}</b></span><span><small>Volume/realisasi</small><b>{selected.volume}</b></span><span><small>Unit pengelola</small><b>{selected.branch}</b></span><span><small>Alamat</small><b>{selected.address}</b></span><span><small>PIC</small><b>{selected.contact}</b></span><span><small>Kontrak aktif</small><b>{selected.contract}</b></span></div><h3>Dokumen & kepatuhan</h3>{selected.documents.map(doc=><div className="partner-document" key={doc}><FileText size={15}/><span><b>{doc}</b><small>Valid · diperiksa 12 Agu 2026</small></span><CheckCircle2 size={15}/></div>)}</section><aside><h3>Performance scorecard</h3>{selected.metrics.map(([label,value])=><div className="partner-metric" key={label}><span>{label}</span><strong>{value}</strong></div>)}<div className="partner-risk-box"><ShieldCheck size={18}/><span><b>Risk rating: {selected.risk}</b><small>Screening legal, operasional, keuangan, mutu, dan ESG.</small></span></div><button onClick={()=>onNotify(`Evaluasi ${selected.id} dibuat`)}>Buat Evaluasi Kinerja</button><button onClick={()=>onNotify(`Case ${selected.id} dibuat`)}>Buat Case / Exception</button></aside></div><footer><button onClick={()=>setModalOpen(false)}>Tutup</button><button onClick={()=>onNotify("Dokumen mitra diunduh")}><Download size={14}/>Unduh Dokumen</button><button className="primary" onClick={()=>onNotify(`Profil ${selected.id} dibuka untuk edit`)}><Settings size={15}/>Kelola Profil</button></footer></section></div>}</main>;
}

export default function HomePage() {
  const [authStatus,setAuthStatus]=useState<DemoAuthStatus>("checking");
  const [legendOpen, setLegendOpen] = useState(true);
  const [summaryOpen, setSummaryOpen] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState("NASIONAL");
  const [level, setLevel] = useState("Region");
  const [activeNav, setActiveNav] = useState("National Dashboard");
  const [activeNavParent, setActiveNavParent] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedSidebarItems, setExpandedSidebarItems] = useState<string[]>(["Persediaan"]);
  const [activeTab, setActiveTab] = useState("Persediaan Beras");
  const [detailViewOpen, setDetailViewOpen] = useState(false);
  const [nationalOverviewOpen, setNationalOverviewOpen] = useState(false);
  const [targetRealizationOpen, setTargetRealizationOpen] = useState(false);
  const [regionalPerformanceOpen, setRegionalPerformanceOpen] = useState(false);
  const [riceOptimizerOpen, setRiceOptimizerOpen] = useState(false);
  const [shortageSimulatorOpen, setShortageSimulatorOpen] = useState(false);
  const [seasonalDemandOpen, setSeasonalDemandOpen] = useState(false);
  const [routeModeOpen, setRouteModeOpen] = useState(false);
  const [alertWorkspaceMode, setAlertWorkspaceMode] = useState<AlertWorkspaceMode | null>(null);
  const [accountPageOpen, setAccountPageOpen] = useState(false);
  const [agingDisposalOpen, setAgingDisposalOpen] = useState(false);
  const [sphpPriceImpactOpen, setSphpPriceImpactOpen] = useState(false);
  const [domainSummaryOpen, setDomainSummaryOpen] = useState<DomainSummaryKind | null>(null);
  const [inventoryWorkspaceOpen, setInventoryWorkspaceOpen] = useState<InventoryWorkspaceKind | null>(null);
  const [procurementWorkspaceOpen, setProcurementWorkspaceOpen] = useState<ProcurementWorkspaceKind | null>(null);
  const [userManagementOpen, setUserManagementOpen] = useState<UserManagementMode | null>(null);
  const [financialWorkspaceOpen, setFinancialWorkspaceOpen] = useState<FinancialWorkspaceKind | null>(null);
  const [productMasterOpen, setProductMasterOpen] = useState<ProductMasterMode | null>(null);
  const [distributionWorkspaceOpen, setDistributionWorkspaceOpen] = useState<DistributionWorkspaceKind | null>(null);
  const [salesWorkspaceOpen, setSalesWorkspaceOpen] = useState<SalesWorkspaceKind | null>(null);
  const [aiDecisionOpen, setAIDecisionOpen] = useState<AIDecisionMode | null>(null);
  const [approvalCenterOpen, setApprovalCenterOpen] = useState<ApprovalCenterMode | null>(null);
  const [decisionHistoryOpen, setDecisionHistoryOpen] = useState<DecisionHistoryMode | null>(null);
  const [executiveReportOpen, setExecutiveReportOpen] = useState<ExecutiveReportMode | null>(null);
  const [organizationLocationOpen, setOrganizationLocationOpen] = useState<OrganizationLocationMode | null>(null);
  const [parameterOpen, setParameterOpen] = useState<ParameterMode | null>(null);
  const [partnerOpen, setPartnerOpen] = useState<PartnerMode | null>(null);
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
  const [aiLayout, setAiLayout] = useState<AskAILayout>("floating");
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

  useEffect(()=>{let active=true;fetch("/api/demo-auth?action=session",{cache:"no-store"}).then((response)=>{if(active)setAuthStatus(response.ok?"authenticated":"anonymous")}).catch(()=>{if(active)setAuthStatus("anonymous")});return()=>{active=false}},[]);

  async function logoutDemo(){try{await fetch("/api/demo-auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"logout"})})}finally{setAuthStatus("anonymous");setProfileOpen(false);setChatOpen(false)}}

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

  function selectSidebarItem(label: string, parentLabel?: string) {
    setFilterOpen(false);
    setOpenFilterDropdown(null);
    setActiveNav(label);
    setActiveNavParent(parentLabel ?? null);
    setDetailViewOpen(false);
    setNationalOverviewOpen(false);
    setTargetRealizationOpen(false);
    setRegionalPerformanceOpen(false);
    setRiceOptimizerOpen(false);
    setShortageSimulatorOpen(false);
    setSeasonalDemandOpen(false);
    setRouteModeOpen(false);
    setAlertWorkspaceMode(null);
    setAccountPageOpen(false);
    setAgingDisposalOpen(false);
    setSphpPriceImpactOpen(false);
    setDomainSummaryOpen(null);
    setInventoryWorkspaceOpen(null);
    setProcurementWorkspaceOpen(null);
    setUserManagementOpen(null);
    setFinancialWorkspaceOpen(null);
    setProductMasterOpen(null);
    setDistributionWorkspaceOpen(null);
    setSalesWorkspaceOpen(null);
    setAIDecisionOpen(null);
    setApprovalCenterOpen(null);
    setDecisionHistoryOpen(null);
    setExecutiveReportOpen(null);
    setOrganizationLocationOpen(null);
    setParameterOpen(null);
    setPartnerOpen(null);
    if (label === "National Dashboard") {
      setActiveTab("Persediaan Beras");
      showToast("National Dashboard aktif");
      return;
    }
    if (label === "National Overview") {
      setNationalOverviewOpen(true);
      showToast("National Overview aktif");
      return;
    }
    if (label === "Target vs Realisasi") {
      setTargetRealizationOpen(true);
      showToast("Target vs Realisasi aktif");
      return;
    }
    if (label === "Regional Performance") {
      setRegionalPerformanceOpen(true);
      showToast("Regional Performance aktif");
      return;
    }
    if (label === "Rice Outflow Optimizer") {
      setRiceOptimizerOpen(true);
      showToast("Rice Outflow Optimizer aktif");
      return;
    }
    if (label === "Shortage & Surplus") {
      setShortageSimulatorOpen(true);
      showToast("Shortage & Surplus Simulator aktif");
      return;
    }
    if (label === "Seasonal Demand Surge") {
      setSeasonalDemandOpen(true);
      showToast("Seasonal Demand Surge aktif");
      return;
    }
    if (label === "Route & Mode") {
      setRouteModeOpen(true);
      showToast("Route & Mode Simulator aktif");
      return;
    }
    if (["Alert Center", "My Cases", "SLA Monitoring", "Exception History", "Alert Rules"].includes(label)) {
      const alertModes: Record<string,AlertWorkspaceMode> = {"Alert Center":"alerts","My Cases":"cases","SLA Monitoring":"sla","Exception History":"history","Alert Rules":"rules"};
      setAlertWorkspaceMode(alertModes[label]);
      showToast(`${label} aktif`);
      return;
    }
    if (label === "Profile") {
      setAccountPageOpen(true);
      showToast("Profile aktif");
      return;
    }
    if (label === "Keluar") {
      void logoutDemo();
      return;
    }
    if (label === "Aging & Risiko Disposal") {
      setAgingDisposalOpen(true);
      showToast("Aging & Risiko Disposal aktif");
      return;
    }
    if (label === "Dampak Harga SPHP") {
      setSphpPriceImpactOpen(true);
      showToast("Simulator Dampak Harga SPHP aktif");
      return;
    }
    const aiDecisionModes:Record<string,AIDecisionMode>={"Executive AI Insights":"insights","Risiko & Peluang":"risks","Root Cause Analysis":"rootCause","Prioritas Tindakan":"actions","Recommendation Center":"recommendations"};
    if(parentLabel==="AI Decision Center"&&aiDecisionModes[label]){
      setAIDecisionOpen(aiDecisionModes[label]);
      showToast(`${label} aktif`);
      return;
    }
    const approvalModes:Record<string,ApprovalCenterMode>={"Menunggu Persetujuan":"pending","Disetujui":"approved","Ditolak":"rejected","Delegasi Persetujuan":"delegations"};
    if(parentLabel==="Approval Center"&&approvalModes[label]){
      setApprovalCenterOpen(approvalModes[label]);
      showToast(`${label} aktif`);
      return;
    }
    const decisionModes:Record<string,DecisionHistoryMode>={"Riwayat Simulasi":"simulations","Riwayat Prediksi":"predictions","Riwayat Rekomendasi":"recommendations","Riwayat Persetujuan":"approvals","Decision Audit Trail":"audit"};
    if(parentLabel==="Decision History"&&decisionModes[label]){
      setDecisionHistoryOpen(decisionModes[label]);
      showToast(`${label} aktif`);
      return;
    }
    const reportModes:Record<string,ExecutiveReportMode>={"Executive Snapshot":"snapshot","Laporan Harian":"daily","Laporan Mingguan":"weekly","Laporan Bulanan":"monthly","Report Builder":"builder","Laporan Terjadwal":"scheduled","Riwayat Laporan":"history"};
    if(parentLabel==="Executive Report"&&reportModes[label]){
      setExecutiveReportOpen(reportModes[label]);
      showToast(`${label} aktif`);
      return;
    }
    const locationModes:Record<string,OrganizationLocationMode>={"Wilayah":"regions","Kanwil":"kanwil","Kancab":"kancab","Gudang":"warehouses","Titik Penyaluran":"distributionPoints"};
    if(parentLabel==="Organisasi & Lokasi"&&locationModes[label]){
      setOrganizationLocationOpen(locationModes[label]);
      showToast(`${label} aktif`);
      return;
    }
    const parameterModes:Record<string,ParameterMode>={"Target KPI":"targetKpi","Threshold Alert":"alertThreshold","SLA":"sla","Kalender Operasional":"calendar"};
    if(parentLabel==="Parameter"&&parameterModes[label]){
      setParameterOpen(parameterModes[label]);
      showToast(`${label} aktif`);
      return;
    }
    const partnerModes:Record<string,PartnerMode>={"Pemasok":"suppliers","Transporter":"transporters","Pelanggan":"customers","Kelompok Tani":"farmerGroups"};
    if(parentLabel==="Mitra"&&partnerModes[label]){
      setPartnerOpen(partnerModes[label]);
      showToast(`${label} aktif`);
      return;
    }
    const salesModes:Record<string,SalesWorkspaceKind>={"Ringkasan Penjualan & Penyaluran":"summary","Penjualan Komersial":"commercial","Penyaluran Program":"programs","Kinerja Wilayah":"regional","Order Fulfillment":"fulfillment","Simulasi Penyaluran":"simulation"};
    if(parentLabel==="Penjualan & Penyaluran"&&salesModes[label]){
      setSalesWorkspaceOpen(salesModes[label]);
      showToast(`${label} Penjualan & Penyaluran aktif`);
      return;
    }
    const summaryKinds: Record<string, DomainSummaryKind> = {
      "Ringkasan Persediaan": "inventory",
      "Ringkasan Pengadaan": "procurement",
      "Ringkasan Penjualan & Penyaluran": "sales",
      "Ringkasan Keuangan": "finance",
    };
    if (summaryKinds[label]) {
      setDomainSummaryOpen(summaryKinds[label]);
      showToast(`${label} aktif`);
      return;
    }
    const inventoryKinds: Record<string, InventoryWorkspaceKind> = {
      "Safety Stock": "safety",
      "Aging & Kualitas": "quality",
      "Mutasi Stok": "mutation",
      "Simulasi Persediaan": "simulation",
    };
    if (inventoryKinds[label]) {
      setInventoryWorkspaceOpen(inventoryKinds[label]);
      showToast(`${label} aktif`);
      return;
    }
    const procurementKinds: Record<string,ProcurementWorkspaceKind> = {
      "Kinerja Wilayah":"regional","Sumber Pengadaan":"sources","Tren & Proyeksi":"trend","Gap Analysis":"gap","Simulasi Pengadaan":"simulation",
    };
    if (parentLabel === "Pengadaan" && procurementKinds[label]) {
      setProcurementWorkspaceOpen(procurementKinds[label]);
      showToast(`${label} Pengadaan aktif`);
      return;
    }
    const userManagementModes:Record<string,UserManagementMode>={"User":"users","Role":"roles","Permission":"permissions","Organisasi Pengguna":"organization","Status Pengguna":"status"};
    if(parentLabel==="User Management"&&userManagementModes[label]){
      setUserManagementOpen(userManagementModes[label]);
      showToast(`${label} aktif`);
      return;
    }
    const financialModes:Record<string,FinancialWorkspaceKind>={"Pendapatan":"revenue","Biaya Supply Chain":"cost","Piutang":"receivables","Budget vs Actual":"budget","Simulasi Dampak Keuangan":"simulation"};
    if(parentLabel==="Keuangan"&&financialModes[label]){
      setFinancialWorkspaceOpen(financialModes[label]);
      showToast(`${label} aktif`);
      return;
    }
    const productMasterModes:Record<string,ProductMasterMode>={"Komoditas":"commodities","Produk":"products","Satuan":"units","Klasifikasi Mutu":"quality"};
    if(parentLabel==="Produk & Komoditas"&&productMasterModes[label]){
      setProductMasterOpen(productMasterModes[label]);
      showToast(`${label} aktif`);
      return;
    }
    const distributionModes:Record<string,DistributionWorkspaceKind>={"Ringkasan Distribusi":"summary","Monitoring Pengiriman":"shipments","Kinerja Rute":"routes","Kinerja OTIF":"otif","Exception Distribusi":"exceptions","Simulasi Distribusi":"simulation"};
    if(parentLabel==="Distribusi"&&distributionModes[label]){
      setDistributionWorkspaceOpen(distributionModes[label]);
      showToast(`${label} aktif`);
      return;
    }
    if (label === "Ringkasan Persediaan" || label === "Persediaan") {
      setActiveTab("Persediaan Beras");
    } else if (label === "Kapasitas Gudang") {
      setDetailViewOpen(true);
    }
    showToast(`${label} dipilih`);
  }

  if (authStatus === "checking") return <main className="auth-checking"><span className="brand-mark"><i/><i/><i/></span><strong>SCCT BULOG</strong><small>Memverifikasi sesi aman…</small></main>;
  if (authStatus === "anonymous") return <LoginPage onAuthenticated={()=>setAuthStatus("authenticated")}/>;

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
        <button type="button" className="ask-ai-button" onClick={() => setChatOpen(true)} aria-expanded={chatOpen}><Sparkles size={18}/><span>Ask AI</span></button>
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
              <button onClick={() => { setProfileOpen(false); selectSidebarItem("Profile"); }}>Lihat profil</button>
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
                  const childActive = children?.includes(activeNav) && activeNavParent === label;
                  const itemEnabled = Boolean(children?.length) || enabledNavigation.has(label);
                  return (
                    <div className={`side-nav__group${expanded ? " expanded" : ""}`} key={label}>
                      <button
                        type="button"
                        className={`side-nav__item${activeNav === label || childActive ? " active" : ""}${!itemEnabled?" disabled":""}`}
                        title={!itemEnabled?`${label} · halaman belum tersedia`:sidebarCollapsed?label:undefined}
                        disabled={!itemEnabled}
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
                          {children.map((child) => {
                            const childEnabled = enabledNavigation.has(child) || (label === "Pengadaan" && procurementNavigation.has(child));
                            return (
                            <button
                              type="button"
                              key={child}
                              className={`${activeNav === child && activeNavParent === label ? "active" : ""}${!childEnabled?" disabled":""}`}
                              disabled={!childEnabled}
                              title={!childEnabled?"Halaman belum tersedia":undefined}
                              onClick={() => selectSidebarItem(child,label)}
                            >
                              <span>{child}</span>
                            </button>
                          )})}
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
              setTargetRealizationOpen(false);
              setRegionalPerformanceOpen(false);
              setRiceOptimizerOpen(false);
              setShortageSimulatorOpen(false);
              setSeasonalDemandOpen(false);
              setAgingDisposalOpen(false);
              setSphpPriceImpactOpen(false);
              setDomainSummaryOpen(null);
              setInventoryWorkspaceOpen(null);
              setProcurementWorkspaceOpen(null);
              setUserManagementOpen(null);
              setFinancialWorkspaceOpen(null);
              setProductMasterOpen(null);
              setFilterOpen(false);
            }}
          >
            Detail Wilayah
          </button>
        </div>

        {activeNav === "National Dashboard" && <button
          className={`filter-handle${filterOpen ? " active" : ""}`}
          aria-label="Buka filter"
          onClick={toggleFilterPanel}
        >
          <Filter size={23} />
        </button>}

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
        {targetRealizationOpen && (
          <div className={sidebarCollapsed ? "performance-view-host sidebar-collapsed" : "performance-view-host"}>
            <TargetRealizationPage onNotify={showToast} />
          </div>
        )}
        {regionalPerformanceOpen && (
          <div className={sidebarCollapsed ? "performance-view-host sidebar-collapsed" : "performance-view-host"}>
            <RegionalPerformancePage onNotify={showToast} />
          </div>
        )}
        {riceOptimizerOpen && (
          <div className={sidebarCollapsed ? "optimizer-view-host sidebar-collapsed" : "optimizer-view-host"}>
            <RiceOutflowOptimizerPage onNotify={showToast} />
          </div>
        )}
        {shortageSimulatorOpen && (
          <div className={sidebarCollapsed ? "shortage-view-host sidebar-collapsed" : "shortage-view-host"}>
            <ShortageSurplusSimulatorPage onNotify={showToast} />
          </div>
        )}
        {seasonalDemandOpen && (
          <div className={sidebarCollapsed ? "seasonal-view-host sidebar-collapsed" : "seasonal-view-host"}>
            <SeasonalDemandSurgePage onNotify={showToast} />
          </div>
        )}
        {routeModeOpen && (
          <div className={sidebarCollapsed ? "route-mode-view-host sidebar-collapsed" : "route-mode-view-host"}>
            <RouteModeSimulatorPage onNotify={showToast} />
          </div>
        )}
        {alertWorkspaceMode && (
          <div className={sidebarCollapsed ? "alert-workspace-host sidebar-collapsed" : "alert-workspace-host"}>
            {alertWorkspaceMode === "alerts" || alertWorkspaceMode === "cases" ? <AlertExceptionWorkspace mode={alertWorkspaceMode} onSwitch={(mode) => { setAlertWorkspaceMode(mode); const labels:Record<AlertWorkspaceMode,string>={alerts:"Alert Center",cases:"My Cases",sla:"SLA Monitoring",history:"Exception History",rules:"Alert Rules"};setActiveNav(labels[mode]); }} onNotify={showToast} /> : <AlertGovernancePage mode={alertWorkspaceMode} onSwitch={(mode) => { setAlertWorkspaceMode(mode); const labels:Record<AlertWorkspaceMode,string>={alerts:"Alert Center",cases:"My Cases",sla:"SLA Monitoring",history:"Exception History",rules:"Alert Rules"};setActiveNav(labels[mode]); }} onNotify={showToast} />}
          </div>
        )}
        {accountPageOpen && <div className={sidebarCollapsed ? "profile-view-host sidebar-collapsed" : "profile-view-host"}><ProfilePage onNotify={showToast}/></div>}
        {agingDisposalOpen && (
          <div className={sidebarCollapsed ? "aging-view-host sidebar-collapsed" : "aging-view-host"}>
            <AgingDisposalRiskPage onNotify={showToast} />
          </div>
        )}
        {sphpPriceImpactOpen && (
          <div className={sidebarCollapsed ? "sphp-view-host sidebar-collapsed" : "sphp-view-host"}>
            <SPHPPriceImpactSimulatorPage onNotify={showToast} />
          </div>
        )}
        {domainSummaryOpen && (
          <div className={sidebarCollapsed ? "domain-summary-host sidebar-collapsed" : "domain-summary-host"}>
            <SupplyDomainSummaryPage key={domainSummaryOpen} kind={domainSummaryOpen} onNotify={showToast} />
          </div>
        )}
        {inventoryWorkspaceOpen && (
          <div className={sidebarCollapsed ? "inventory-ops-host sidebar-collapsed" : "inventory-ops-host"}>
            {inventoryWorkspaceOpen === "simulation" ? <InventorySimulationPage onNotify={showToast} /> : <InventoryMonitorPage key={inventoryWorkspaceOpen} kind={inventoryWorkspaceOpen} onNotify={showToast} />}
          </div>
        )}
        {procurementWorkspaceOpen && (
          <div className={sidebarCollapsed ? "procurement-host sidebar-collapsed" : "procurement-host"}>
            {procurementWorkspaceOpen === "simulation" ? <ProcurementSimulationPage onNotify={showToast}/> : <ProcurementIntelligencePage key={procurementWorkspaceOpen} kind={procurementWorkspaceOpen} onNotify={showToast}/>}
          </div>
        )}
        {userManagementOpen&&<div className={sidebarCollapsed?"user-admin-host sidebar-collapsed":"user-admin-host"}><UserManagementPage key={userManagementOpen} mode={userManagementOpen} onNotify={showToast}/></div>}
        {financialWorkspaceOpen&&<div className={sidebarCollapsed?"finance-host sidebar-collapsed":"finance-host"}>{financialWorkspaceOpen==="simulation"?<FinancialSimulationPage onNotify={showToast}/>:<FinancialMonitorPage key={financialWorkspaceOpen} kind={financialWorkspaceOpen} onNotify={showToast}/>}</div>}
        {productMasterOpen&&<div className={sidebarCollapsed?"product-master-host sidebar-collapsed":"product-master-host"}><ProductMasterPage key={productMasterOpen} mode={productMasterOpen} onNotify={showToast}/></div>}
        {distributionWorkspaceOpen&&<div className={sidebarCollapsed?"distribution-host sidebar-collapsed":"distribution-host"}><DistributionWorkspacePage key={distributionWorkspaceOpen} mode={distributionWorkspaceOpen} onSwitch={(next)=>{setDistributionWorkspaceOpen(next);const labels:Record<DistributionWorkspaceKind,string>={summary:"Ringkasan Distribusi",shipments:"Monitoring Pengiriman",routes:"Kinerja Rute",otif:"Kinerja OTIF",exceptions:"Exception Distribusi",simulation:"Simulasi Distribusi"};setActiveNav(labels[next])}} onNotify={showToast}/></div>}
        {salesWorkspaceOpen&&<div className={sidebarCollapsed?"sales-host sidebar-collapsed":"sales-host"}><SalesDistributionPage key={salesWorkspaceOpen} mode={salesWorkspaceOpen} onSwitch={(next)=>{setSalesWorkspaceOpen(next);const labels:Record<SalesWorkspaceKind,string>={summary:"Ringkasan Penjualan & Penyaluran",commercial:"Penjualan Komersial",programs:"Penyaluran Program",regional:"Kinerja Wilayah",fulfillment:"Order Fulfillment",simulation:"Simulasi Penyaluran"};setActiveNav(labels[next]);setActiveNavParent("Penjualan & Penyaluran")}} onNotify={showToast}/></div>}
        {aiDecisionOpen&&<div className={sidebarCollapsed?"ai-decision-host sidebar-collapsed":"ai-decision-host"}><AIDecisionCenterPage key={aiDecisionOpen} mode={aiDecisionOpen} onSwitch={(next)=>{setAIDecisionOpen(next);const labels:Record<AIDecisionMode,string>={insights:"Executive AI Insights",risks:"Risiko & Peluang",rootCause:"Root Cause Analysis",actions:"Prioritas Tindakan",recommendations:"Recommendation Center"};setActiveNav(labels[next]);setActiveNavParent("AI Decision Center")}} onNotify={showToast}/></div>}
        {approvalCenterOpen&&<div className={sidebarCollapsed?"approval-center-host sidebar-collapsed":"approval-center-host"}><ApprovalCenterPage key={approvalCenterOpen} mode={approvalCenterOpen} onSwitch={(next)=>{setApprovalCenterOpen(next);const labels:Record<ApprovalCenterMode,string>={pending:"Menunggu Persetujuan",approved:"Disetujui",rejected:"Ditolak",delegations:"Delegasi Persetujuan"};setActiveNav(labels[next]);setActiveNavParent("Approval Center")}} onNotify={showToast}/></div>}
        {decisionHistoryOpen&&<div className={sidebarCollapsed?"decision-history-host sidebar-collapsed":"decision-history-host"}><DecisionHistoryPage key={decisionHistoryOpen} mode={decisionHistoryOpen} onSwitch={(next)=>{setDecisionHistoryOpen(next);const labels:Record<DecisionHistoryMode,string>={simulations:"Riwayat Simulasi",predictions:"Riwayat Prediksi",recommendations:"Riwayat Rekomendasi",approvals:"Riwayat Persetujuan",audit:"Decision Audit Trail"};setActiveNav(labels[next]);setActiveNavParent("Decision History")}} onNotify={showToast}/></div>}
        {executiveReportOpen&&<div className={sidebarCollapsed?"executive-report-host sidebar-collapsed":"executive-report-host"}><ExecutiveReportPage key={executiveReportOpen} mode={executiveReportOpen} onSwitch={(next)=>{setExecutiveReportOpen(next);const labels:Record<ExecutiveReportMode,string>={snapshot:"Executive Snapshot",daily:"Laporan Harian",weekly:"Laporan Mingguan",monthly:"Laporan Bulanan",builder:"Report Builder",scheduled:"Laporan Terjadwal",history:"Riwayat Laporan"};setActiveNav(labels[next]);setActiveNavParent("Executive Report")}} onNotify={showToast}/></div>}
        {organizationLocationOpen&&<div className={sidebarCollapsed?"organization-location-host sidebar-collapsed":"organization-location-host"}><OrganizationLocationPage key={organizationLocationOpen} mode={organizationLocationOpen} onSwitch={(next)=>{setOrganizationLocationOpen(next);const labels:Record<OrganizationLocationMode,string>={regions:"Wilayah",kanwil:"Kanwil",kancab:"Kancab",warehouses:"Gudang",distributionPoints:"Titik Penyaluran"};setActiveNav(labels[next]);setActiveNavParent("Organisasi & Lokasi")}} onNotify={showToast}/></div>}
        {parameterOpen&&<div className={sidebarCollapsed?"parameter-host sidebar-collapsed":"parameter-host"}><ParameterManagementPage key={parameterOpen} mode={parameterOpen} onSwitch={(next)=>{setParameterOpen(next);const labels:Record<ParameterMode,string>={targetKpi:"Target KPI",alertThreshold:"Threshold Alert",sla:"SLA",calendar:"Kalender Operasional"};setActiveNav(labels[next]);setActiveNavParent("Parameter")}} onNotify={showToast}/></div>}
        {partnerOpen&&<div className={sidebarCollapsed?"partner-host sidebar-collapsed":"partner-host"}><PartnerManagementPage key={partnerOpen} mode={partnerOpen} onSwitch={(next)=>{setPartnerOpen(next);const labels:Record<PartnerMode,string>={suppliers:"Pemasok",transporters:"Transporter",customers:"Pelanggan",farmerGroups:"Kelompok Tani"};setActiveNav(labels[next]);setActiveNavParent("Mitra")}} onNotify={showToast}/></div>}
      </section>

      {activeNav === "National Dashboard" && <aside
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
      </aside>}

      {chatOpen && <AskAIWorkspace layout={aiLayout} onLayoutChange={setAiLayout} onClose={() => setChatOpen(false)} activeContext={activeNav} />}

      {toast && <div className="toast"><Check size={16} />{toast}</div>}
    </main>
  );
}
