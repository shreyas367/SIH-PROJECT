"use client";

import { useEffect, useState } from "react";

interface Prescription {
  _id: string;
  title: string;
  notes: string;
  fileUrl?: string;
  createdAt: string;
}

export default function HealthRecords() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await fetch("/api/patient/prescriptions");
        if (!res.ok) throw new Error("Failed to fetch prescriptions");
        const data = await res.json();
        setPrescriptions(data.prescriptions || []);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  if (loading) return <p>Loading prescriptions...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <h1 style={{ color: "#2a6db3", marginBottom: 20 }}>Your Health Records</h1>

      {prescriptions.length === 0 && <p>No prescriptions found.</p>}

      {prescriptions.map((p) => (
        <div
          key={p._id}
          style={{
            padding: 20,
            marginBottom: 15,
            borderRadius: 10,
            backgroundColor: "white",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ marginBottom: 5, fontWeight: 600 }}>{p.title}</h3>
          <p style={{ marginBottom: 10 }}>{p.notes}</p>
          {p.fileUrl && (
            <a
              href={p.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#2a6db3", textDecoration: "underline" }}
            >
              View File
            </a>
          )}
          <p style={{ marginTop: 10, fontSize: "0.85rem", color: "#666" }}>
            Created At: {new Date(p.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
// src/app/dashboard/patient/records/page.tsx