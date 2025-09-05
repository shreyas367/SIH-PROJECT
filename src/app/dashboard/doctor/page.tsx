"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function DoctorDashboard() {
  const router = useRouter();

  const cardStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #1d3557, #457b9d)",
    color: "white",
    padding: "2rem",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    cursor: "pointer",
    height: "220px",
    position: "relative",
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: "1rem",
    background: "#e63946",
    color: "white",
    border: "none",
    padding: "0.6rem 1.2rem",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "background 0.2s ease",
  };

  const dashboardItems = [
    {
      title: "Video Consultations",
      description: "Start a new video consultation with patients.",
      link: "/video-call/new", // will be overridden to uuid
      icon: "📹",
      notifications: 2,
      isVideo: true,
    },
    {
      title: "Patient Queue",
      description: "View and manage waiting patients.",
      link: "/dashboard/doctor/patients",
      icon: "🧑‍⚕️",
      notifications: 5,
    },
    {
      title: "Health Records",
      description: "Access and update patient health records.",
      link: "/dashboard/doctor/records",
      icon: "📑",
    },
    {
      title: "Prescriptions",
      description: "Write and manage prescriptions for patients.",
      link: "/dashboard/doctor/prescriptions",
      icon: "💊",
    },
  ];

  const handleCardClick = (item: any) => {
    if (item.isVideo) {
      const roomId = uuidv4();
      router.push(`/video-call/${roomId}`);
    } else {
      router.push(item.link);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(120deg, #0f2027, #203a43, #2c5364)",
        minHeight: "100vh",
        padding: "3rem",
        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "2rem",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        👨‍⚕️ Doctor Dashboard
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
        }}
      >
        {dashboardItems.map((item, index) => (
          <div
            key={index}
            style={cardStyle}
            onClick={() => handleCardClick(item)}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLDivElement).style.transform =
                "scale(1.05)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLDivElement).style.transform = "scale(1)")
            }
          >
            <div style={{ fontSize: "2.5rem" }}>{item.icon}</div>
            <h2 style={{ fontSize: "1.3rem", margin: "1rem 0" }}>
              {item.title}
            </h2>
            <p style={{ textAlign: "center", fontSize: "0.9rem" }}>
              {item.description}
            </p>
            <button
              style={buttonStyle}
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(item);
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLButtonElement).style.background = "#d62839")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLButtonElement).style.background = "#e63946")
              }
            >
              Open
            </button>

            {item.notifications && (
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "#e63946",
                  color: "white",
                  borderRadius: "50%",
                  padding: "6px 10px",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  boxShadow: "0 0 6px rgba(0,0,0,0.3)",
                }}
              >
                {item.notifications}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
