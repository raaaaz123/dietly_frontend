"use client";

import UserScansSection from "../components/UserScansSection";

export default function AdminScansPage() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight text-fg">Users Scans</h1>
        <p className="text-sm text-muted mt-1">
          Review all user body composition scans, physique photos, and AI scoring metrics
        </p>
      </div>

      <UserScansSection isStandalone={true} />
    </div>
  );
}
