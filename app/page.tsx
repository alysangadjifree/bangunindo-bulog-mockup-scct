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
  Maximize,
  MessageCircle,
  Minus,
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

const filterDefaults = {
  dashboardType: "Persediaan",
  mapLevel: "Region",
  chartSize: "Select Chart Size",
  startDate: "2026-01-01",
  endDate: "2026-08-11",
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
  ["VOLUME STOCK (TON)", "5.253.936 Ton"],
  ["KAPASITAS GUDANG (TON)", "5.695.125 Ton"],
  ["PERSEN", "92,25%"],
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
