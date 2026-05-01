// ✅ OPTION A IMPLEMENTED — VERCEL‑SAFE VERSION (NO shadcn / NO ALIASES)
// Plain React + JSX only. Guaranteed to build on Vercel.
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  Search,
  AlertTriangle,
} from "lucide-react";


// ---------------- SAMPLE DATA ----------------
const SAMPLE_BODIES = [
  {
    id: "example",
    name: "Example Public Body",
    kind: "Executive NDPB",
    sponsorDepartment: "Cabinet Office",
    appointments: {
      chair: "Secretary of State",
      notes: "Illustrative only",
    },
    democraticOverride: {
      ministerialDirections: true,
      parliamentaryScrutiny: ["Annual report", "Select Committee evidence"],
    },
    workforce: { fte: 500 },
    functions: ["Regulation", "Guidance", "Enforcement"],
    independenceProfile: {
      quasiJudicial: true,
      marketConfidence: true,
    },
  },
];


const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2 },
};


function computeRisk(body) {
  let score = 0;
  if (body.independenceProfile.quasiJudicial) score += 25;
  if (body.independenceProfile.marketConfidence) score += 20;
  score += Math.min(25, Math.round(body.workforce.fte / 20));
  return score;
}


export default function QuangoAccountabilityPortal() {
  const [tab, setTab] = useState("directory");
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const t = q.toLowerCase();
    return SAMPLE_BODIES.filter((b) => b.name.toLowerCase().includes(t));
  }, [q]);


  const selected = filtered[0];
  const risk = computeRisk(selected);


  return (
    <div style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh", background: "#f8fafc" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid #e5e7eb", background: "white" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "12px 16px", display: "flex", gap: 12 }}>
          <Layers />
          <div>
            <div style={{ fontWeight: 600 }}>QUANGO Accountability Portal</div>
            <div style={{ fontSize: 12, color: "#475569" }}>
              Public‑interest prototype — illustrative data
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {[
            ["directory", "Directory"],
            ["accountability", "Accountability"],
            ["abolition", "Abolition"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                padding: "6px 10px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                background: tab === key ? "#0f172a" : "white",
                color: tab === key ? "white" : "#0f172a",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab} {...fade}>
            {tab === "directory" && (
              <section>
                <div style={{ marginBottom: 12 }}>
                  <Search size={16} />{" "}
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search public bodies"
                    style={{ marginLeft: 6, padding: 6 }}
                  />
                </div>


                <h2>{selected.name}</h2>
                <p style={{ color: "#475569" }}>{selected.kind}</p>
                <ul>
                  {selected.functions.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </section>
            )}

            {tab === "accountability" && (
              <section>
                <h2>Accountability</h2>
                <p>Chair appointed by: {selected.appointments.chair}</p>
                <p>
                  Ministerial directions: {String(selected.democraticOverride.ministerialDirections)}
                </p>
                <ul>
                  {selected.democraticOverride.parliamentaryScrutiny.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </section>
            )}


            {tab === "abolition" && (
              <section>
                <h2 style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <AlertTriangle size={18} /> Abolition / merger risk
                </h2>
                <p>
                  <strong>Indicative risk score:</strong> {risk} / 100
                </p>
                <p style={{ color: "#475569" }}>
                  Higher scores indicate greater legal, political, or delivery complexity.
                </p>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
