"use client";
import { useEffect, useMemo, useState } from "react";

type Ruang = { id: number | string; name: string; kapasitas?: number };

export default function RuangSelect({
  unitId,
  value,
  onChange,
  onSelected,          // callback bila butuh data ruang terpilih (untuk kapasitas)
  apiBase = "http://localhost:3001/api/ruang",
}: {
  unitId?: string | number;
  value?: string | number;
  onChange?: (v: string) => void;
  onSelected?: (ruang: Ruang | null) => void;
  apiBase?: string;
}) {
  const [ruangList, setRuangList] = useState<Ruang[]>([]);
  const [loading, setLoading] = useState(false);

  // kosongkan list saat unit berganti
  useEffect(() => {
    setRuangList([]);
    onSelected?.(null);
  }, [unitId]); // eslint-disable-line

  useEffect(() => {
    if (!unitId) return;
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiBase}/by-unit/${unitId}`, { cache: "no-store" });
        const json = await res.json();
        const list: Ruang[] = Array.isArray(json) ? json : json.data || [];
        if (alive) setRuangList(list);
      } catch (e) {
        console.error("Gagal memuat ruangan:", e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [unitId, apiBase]);

  // ruang terpilih (objek) dari value
  const selected = useMemo(
    () => ruangList.find(r => String(r.id) === String(value)) || null,
    [ruangList, value]
  );

  // saat value berubah, beritahu parent ruang terpilih
  useEffect(() => {
    onSelected?.(selected || null);
  }, [selected]); // eslint-disable-line

  return (
    <div className="select">
      <select
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={!unitId || loading}
        required
      >
        <option value="" disabled>
          {!unitId ? "Pilih Unit dulu" : loading ? "Memuat Ruangan…" : "Pilih Ruangan Meeting"}
        </option>
        {ruangList.map((r) => (
          <option key={r.id} value={String(r.id)}>
            {r.name}
          </option>
        ))}
      </select>
    </div>
  );
}
