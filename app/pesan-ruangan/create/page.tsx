"use client";
import "../../globals.css";
import UnitSelect from "../../components/UnitSelect";
import RuangSelect from "../../components/RuangSelect"; 
import { useEffect, useState } from "react";

export default function CreatePesanRuanganPage() {
  const [unitId, setUnitId] = useState<string>("");
  const [ruangId, setRuangId] = useState<string>("");
  const [kapasitas, setKapasitas] = useState<string>("");
  return (
    <div className="app">
      {/* Topbar */}
      <header className="topbar">
        <div className="topbar__brand">
          <Logo />
          <span className="brand-text">iMeeting</span>
        </div>
        <div className="topbar__actions">
          <button className="icon-btn" aria-label="notifications"><BellIcon /></button>
          <div className="user">
            <img className="avatar" src="https://i.pravatar.cc/40?img=12" alt="John Doe" />
            <span className="user__name">John Doe</span>
            <ChevronDown />
          </div>
        </div>
      </header>

      <div className="layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <a className="sidebar__item" href="/" aria-label="Home"><HomeIcon /></a>
          <a className="sidebar__item active" href="/pesan-ruangan" aria-label="Pesan Ruangan"><UserIcon /></a>
        </aside>

        {/* Content */}
        <main className="content">
          <div className="content__head">
            <a className="ghost-btn" href="/pesan-ruangan" aria-label="Back"><ChevronLeft /></a>
            <div className="title-group">
              <h1 className="title">Ruang Meeting</h1>
              <nav className="breadcrumb">
                <a href="/pesan-ruangan" className="crumb">Ruang Meeting</a>
                <span className="crumb-sep">›</span>
                <span className="crumb current">Pesan Ruangan</span>
              </nav>
            </div>
            <div className="spacer" />
          </div>

          <section className="card form-card">
            {/* Section 1 */}
            <div className="section-head">
              <h2 className="section-title">Informasi Ruang Meeting</h2>
              <div className="section-accent" />
            </div>

            <div className="form-grid two">
              <div className="field">
                <label>Unit</label>
                <UnitSelect value={unitId} onChange={setUnitId} />
              </div>

              <div className="field">
                <label>Pilihan Ruangan Meeting</label>
                <div className="field">
                  <RuangSelect
                    unitId={unitId}
                    value={ruangId}
                    onChange={setRuangId}
                    onSelected={(ruang) => setKapasitas(ruang?.kapasitas ? `${ruang.kapasitas} Orang` : "")}
                    // apiBase="/api/ruang"   // gunakan ini jika pakai proxy Next.js
                  />
                </div>

              </div>

              <div className="field full">
                <label>Kapasitas Ruangan</label>
                {/* <input className="input" placeholder="Kapasitas Ruangan" disabled value="20 Orang" /> */}
                 <input className="input" placeholder="Kapasitas Ruangan" disabled value={kapasitas} />
              </div>
            </div>

            <hr className="divider" />

            {/* Section 2 */}
            <div className="section-head">
              <h2 className="section-title">Informasi Rapat</h2>
            </div>

            <form
              className="form-grid three"
              onSubmit={(e) => { e.preventDefault(); /* TODO: submit */ }}
            >
              <div className="field">
                <label>Tanggal Rapat <span className="required">*</span></label>
                <div className="input-icon">
                  <CalendarIcon />
                  <input type="date" className="input no-padding-left" required />
                </div>
              </div>

              <div className="field">
                <label>Pilihan Waktu Mulai</label>
                <div className="select">
                  <select defaultValue="">
                    <option value="" disabled>Pilih Waktu Mulai</option>
                    <option>08:00</option><option>09:00</option>
                    <option>10:00</option><option>11:00</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label>Waktu Selesai</label>
                <div className="select">
                  <select defaultValue="">
                    <option value="" disabled>Pilih Waktu Selesai</option>
                    <option>10:00</option><option>11:00</option>
                    <option>12:00</option><option>13:00</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label>Jumlah Peserta</label>
                <input type="number" className="input" placeholder="Masukan Jumlah Peserta" min={1}/>
              </div>

              <fieldset className="field checkbox-group">
                <legend>Jenis Konsumsi</legend>
                <label className="check"><input type="checkbox" /> <span>Snack Siang</span></label>
                <label className="check"><input type="checkbox" /> <span>Makan Siang</span></label>
                <label className="check"><input type="checkbox" /> <span>Snack Sore</span></label>
              </fieldset>

              <div className="field">
                <label>Nominal Konsumsi</label>
                <div className="input-group">
                  <span className="addon">Rp</span>
                  <input className="input no-left-radius" placeholder="" inputMode="numeric" />
                </div>
              </div>

              {/* Actions */}
              <div className="form-actions full">
                <a href="/pesan-ruangan" className="btn danger ghost">Batal</a>
                <button className="btn primary" type="submit">Simpan</button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

/* ====== Icons (inline SVG, pure CSS) ====== */
function CalendarIcon(){
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
    </svg>
  );
}
function Logo() {
  return (
    <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M2 18L8.5 2h6L6.5 22H2V18Z" fill="currentColor" opacity=".9"/>
      <path d="M12 18L18.5 2h6L16.5 22H12V18Z" fill="currentColor"/>
    </svg>
  );
}
function BellIcon(){ return (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5"/><path d="M9 21a3 3 0 0 0 6 0"/></svg>); }
function ChevronDown(){ return (<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m6 9 6 6 6-6"/></svg>); }
function ChevronLeft(){ return (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m15 18-6-6 6-6"/></svg>); }
function HomeIcon(){ return (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 11l9-7 9 7"/><path d="M9 22V12h6v10"/></svg>); }
function UserIcon(){ return (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 21a8 8 0 1 0-16 0"/><circle cx="12" cy="7" r="4"/></svg>); }
