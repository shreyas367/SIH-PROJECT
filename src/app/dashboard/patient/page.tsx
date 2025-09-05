// src/app/dashboard/patient/page.tsx
"use client";

import { useRouter } from "next/navigation";
import {
  Video,
  Bot,
  FileText,
  Pill,
  PhoneCall,
  MapPin,
  Landmark,
} from "lucide-react";

function DashboardCard({
  icon,
  title,
  description,
  badge,
  onClick,
  buttonText,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  onClick: () => void;
  buttonText: string;
}) {
  return (
    <div
      className="bg-white rounded-xl p-6 shadow-md border-t-4 border-blue-600 relative 
                 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col"
    >
      <div className="flex justify-between items-start">
        <div className="bg-blue-100 text-blue-600 w-16 h-16 flex items-center justify-center rounded-full text-3xl">
          {icon}
        </div>
        {badge && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {badge}
          </span>
        )}
      </div>
      <h2 className="text-blue-700 text-lg font-semibold mt-4">{title}</h2>
      <p className="text-gray-600 flex-grow mt-2">{description}</p>
      <button
        onClick={onClick}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow 
                   transition duration-300 uppercase tracking-wide"
      >
        {buttonText}
      </button>
    </div>
  );
}

export default function PatientDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/auth/login");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="flex justify-between items-center pb-6 mb-8 border-b border-blue-200">
        <div>
          <h1 className="text-2xl font-bold text-blue-700 mb-2">
            ਸਤ ਸ੍ਰੀ ਅਕਾਲ! (Welcome, Patient)
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
              P
            </div>
            <span className="text-gray-600">ਆਖਰੀ ਵਾਰ ਲੌਗਇਨ: ਅੱਜ 10:30 ਵਜੇ</span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium shadow transition"
        >
          Logout
        </button>
      </header>

      {/* Dashboard Grid */}
      <main className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          icon={<Video className="w-8 h-8" />}
          title="ਡਾਕਟਰ ਵੀਡੀਓ ਕਾਲ (Video Consultation)"
          description="ਘਰ ਬੈਠੇ ਡਾਕਟਰ ਨਾਲ ਗੱਲ ਕਰੋ। Consult your doctor from home."
          badge="3"
          onClick={() => router.push("/dashboard/patient/video")}
          buttonText="ਸ਼ੁਰੂ ਕਰੋ (Start)"
        />

        <DashboardCard
          icon={<Bot className="w-8 h-8" />}
          title="ਲੱਛਣ ਜਾਂਚ (AI Symptom Checker)"
          description="ਆਪਣੇ ਲੱਛਣ ਜਾਂਚੋ ਤੇ ਪਹਿਲਾ ਸੁਝਾਅ ਲਵੋ। Check symptoms before consulting."
          onClick={() => router.push("/dashboard/patient/chatbox")}
          buttonText="ਸ਼ੁਰੂ ਕਰੋ (Start)"
        />

        <DashboardCard
          icon={<FileText className="w-8 h-8" />}
          title="ਸਿਹਤ ਰਿਕਾਰਡ (Health Records)"
          description="ਆਪਣੇ ਟੈਸਟ, ਇਤਿਹਾਸ ਅਤੇ ਇਲਾਜ ਦੇ ਰਿਕਾਰਡ ਵੇਖੋ।"
          onClick={() => router.push("/dashboard/patient/records")}
          buttonText="ਖੋਲ੍ਹੋ (Open)"
        />

        <DashboardCard
          icon={<Pill className="w-8 h-8" />}
          title="ਦਵਾਈ ਜਾਣਕਾਰੀ (Pharmacy Updates)"
          description="ਨਜ਼ਦੀਕੀ ਫਾਰਮੇਸੀ ਵਿੱਚ ਦਵਾਈ ਦੀ ਉਪਲਬਧਤਾ ਵੇਖੋ।"
          badge="1"
          onClick={() => router.push("/dashboard/patient/pharmacy")}
          buttonText="ਚੈਕ ਕਰੋ (Check)"
        />

        <DashboardCard
          icon={<MapPin className="w-8 h-8" />}
          title="ਨੇੜਲੇ ਹਸਪਤਾਲ (Nearby Clinics)"
          description="ਨਭਾ ਅਤੇ ਆਸ-ਪਾਸ ਦੇ ਸਰਕਾਰੀ ਹਸਪਤਾਲ ਅਤੇ ਪੀਐਚਸੀ ਵੇਖੋ।"
          onClick={() => router.push("/dashboard/patient/clinics")}
          buttonText="ਖੋਲ੍ਹੋ (Open)"
        />

        <DashboardCard
          icon={<PhoneCall className="w-8 h-8" />}
          title="ਐਮਰਜੈਂਸੀ ਨੰਬਰ (Emergency Numbers)"
          description="ਐਮਬੁਲੈਂਸ 108, ਨਜ਼ਦੀਕੀ ਹਸਪਤਾਲ ਤੇ ਡਾਕਟਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।"
          onClick={() => router.push("/dashboard/patient/emergency")}
          buttonText="ਕਾਲ ਕਰੋ (Call)"
        />

        {/* New Gov Healthcare Schemes Card */}
        <DashboardCard
          icon={<Landmark className="w-8 h-8" />}
          title="ਸਰਕਾਰੀ ਸਿਹਤ ਯੋਜਨਾਵਾਂ (Gov Schemes)"
          description="Ayushman Bharat, Sarbat Sehat Bima ਅਤੇ ਹੋਰ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਬਾਰੇ ਜਾਣੋ।"
          onClick={() => router.push("/schemes")}
          buttonText="ਵੇਖੋ (View)"
        />
      </main>
    </div>
  );
}
