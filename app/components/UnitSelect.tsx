// di atas: import React hooks
"use client";
import { useEffect, useState } from "react";

// tipe sederhana
type Unit = { id: number | string; name: string };

export default function UnitSelect({
  value,
  onChange,
  api = "http://localhost:3001/api/unit",
}: {
  value?: string | number;
  onChange?: (v: string) => void;
  api?: string;
}) {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(api);
        const json = await res.json();
        // fleksibel: array langsung atau {data: []}
        const list: Unit[] = Array.isArray(json) ? json : json.data || [];
        if (alive) setUnits(list);
      } catch (e) {
        console.error("Gagal memuat unit:", e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [api]);

  return (
    <div className="select">
      <select
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={loading}
      >
        <option value="" disabled>
          {loading ? "Memuat Unit..." : "Pilih Unit"}
        </option>
        {units.map((u) => (
          <option key={u.id} value={String(u.id)}>
            {u.name}
          </option>
        ))}
      </select>
    </div>
  );
}
