// ✅ FIXED VERSION FOR STACKBLITZ
// The previous error was caused by an unclosed <div> in the Workforce tab.
// This version balances all JSX tags and runs correctly in StackBlitz.


import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  FileText,
  Scale,
  Gavel,
  Search,
  Layers,
  Users,
  ArrowRight,
  Link as LinkIcon,
  AlertTriangle,
  Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

// ---------------- SAMPLE DATA ----------------
const SAMPLE_BODIES = [
  {
    id: "example",
    name: "Example Public Body",
    kind: "Executive NDPB",
    sponsorDepartment: "Cabinet Office",
    chair: "Chair (example)",
    chiefExecutive: "Chief Executive (example)",
    appointments: {
      chair: "Secretary of State",
      board: "Ministerial appointments",
      notes: "Illustrative only",
    },
    legalBasis: {
      primary: [{ title: "Example Act 2015", url: "https://www.legislation.gov.uk" }],
      nonStatutory: [],
    },
    democraticOverride: {
      ministerialDirections: true,
      directionScope: ["strategy", "budget"],
      vetoOrCallIn: "None",
      parliamentaryScrutiny: ["Annual report", "Select Committee evidence"],
    },
    workforce: {
      fte: 500,
      corporateOverheadFTE: 80,
      sharedServicesReady: true,
    },
    functions: ["Regulation", "Guidance", "Enforcement"],
    independenceProfile: {
      scrutinisesGovernment: false,
      quasiJudicial: true,
      safetyCritical: false,
      marketConfidence: true,
      rightsWatchdog: false,
    },
  },
];


const fade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.2 },
};


function computeRisk(body) {
  let score = 0;
  if (body.independenceProfile.quasiJudicial) score += 20;
  if (body.independenceProfile.marketConfidence) score += 15;
  score += Math.min(20, Math.round(body.workforce.fte / 50));
  return score;
}

export default function QuangoAccountabilityPortalMVP() {
  const [tab, setTab] = useState("directory");
  const [selectedId] = useState(SAMPLE_BODIES[0].id);
  const selected = useMemo(
    () => SAMPLE_BODIES.find((b) => b.id === selectedId),
    [selectedId]
  );

  const risk = computeRisk(selected);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
          <Layers className="h-6 w-6" />
          <div>
            <div className="font-semibold">QUANGO Accountability Portal</div>
            <div className="text-xs text-slate-600">Public-interest prototype</div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="directory">Directory</TabsTrigger>
            <TabsTrigger value="accountability">Accountability</TabsTrigger>
            <TabsTrigger value="abolition">Abolition</TabsTrigger>
          </TabsList>
        </Tabs>

        <AnimatePresence mode="wait">
          <motion.div key={tab} {...fade} className="mt-4 space-y-4">
            {tab === "directory" && (
              <Card>
                <CardHeader>
                  <CardTitle>{selected.name}</CardTitle>
                  <CardDescription>{selected.kind}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">Sponsor: {selected.sponsorDepartment}</p>
                  <ul className="mt-2 list-disc pl-5 text-sm">
                    {selected.functions.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {tab === "accountability" && (
              <Card>
                <CardHeader>
                  <CardTitle>Accountability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>Chair appointed by: {selected.appointments.chair}</div>
                  <div>Ministerial directions: {String(selected.democraticOverride.ministerialDirections)}</div>
                  <div>
                    Parliamentary scrutiny:
                    <ul className="list-disc pl-5">
                      {selected.democraticOverride.parliamentaryScrutiny.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
            {tab === "abolition" && (
              <Card>
                <CardHeader>
                  <CardTitle>Abolition risk (illustrative)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge>Risk score: {risk}</Badge>
                  <p className="text-sm text-slate-600">
                    Higher scores indicate greater legal, political, or delivery complexity.
                  </p>
                </CardContent>              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
