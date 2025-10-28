"use client";
import "./globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔹 Ganti URL ini dengan API kamu (misalnya dari backend Laravel, Spring Boot, dsb)
  const API_URL = "http://localhost:3001/api/rapat";

  useEffect(() => {
    async function loadMeetings() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Gagal memuat data dari API");
        const data = await res.json();
        console.log(data.data)
        setMeetings(data.data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadMeetings();
  }, []);

  return (
    <div className="app">
      {/* Topbar */}
      <header className="topbar">
        <div className="topbar__brand">
          <Logo />
          <span className="brand-text">iMeeting</span>
        </div>
        <div className="topbar__actions">
          <button className="icon-btn" aria-label="notifications">
            <BellIcon />
          </button>
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
          <a className="sidebar__item active" href="#" aria-label="Home">
            <HomeIcon />
          </a>
          <a className="sidebar__item" href="#" aria-label="Users">
            <UserIcon />
          </a>
        </aside>

        {/* Content */}
        <main className="content">
          <div className="content__head">
            <button className="ghost-btn" aria-label="Back">
              <ChevronLeft />
            </button>
            <div className="title-group">
              <h1 className="title">Ruang Meeting</h1>
              <p className="subtitle">Ruang Meeting</p>
            </div>
            <div className="spacer" />
            <button
              className="primary-btn"
              onClick={() => router.push("/pesan-ruangan/create")}
              type="button"
            >
              <PlusIcon />
              Pesan Ruangan
            </button>
          </div>

          <section className="card">
            {loading ? (
              <p style={{ padding: "1rem", color: "#666" }}>Memuat data...</p>
            ) : meetings.length === 0 ? (
              <p style={{ padding: "1rem", color: "#999" }}>Tidak ada data ditemukan.</p>
            ) : (
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>UNIT</th>
                      <th>RUANG MEETING</th>
                      <th>KAPASITAS</th>
                      <th>TANGGAL RAPAT</th>
                      <th>WAKTU</th>
                      <th>JUMLAH PESERTA</th>
                      <th>JENIS KONSUMSI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meetings.map((m: any) => (
                      <tr key={m.id}>
                        <td><strong>{m.unit.name}</strong></td>
                        <td>{m.ruangan.name}</td>
                        <td>{m.ruangan.kapasitas}</td>
                        <td>{m.tgl_rapat}</td>
                        <td>{m.waktu_mulai}</td>
                        <td>{m.jumlah_peserta}</td>
                        <td>
                          {Array.isArray(m.konsumsi) && m.konsumsi.length > 0 ? (
                            m.konsumsi.map((item: any, i: number) => (
                              <div key={i}>{item.konsumsi?.name || "-"}</div>
                            ))
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

/* ---------------- Icons (unchanged) ---------------- */
function Logo() {
  return (
    <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M2 18L8.5 2h6L6.5 22H2V18Z" fill="currentColor" opacity=".9" />
      <path d="M12 18L18.5 2h6L16.5 22H12V18Z" fill="currentColor" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
      <path d="M9 21a3 3 0 0 0 6 0" />
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 11l9-7 9 7" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 21a8 8 0 1 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
