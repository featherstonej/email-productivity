import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-container" style={{ flexDirection: "row" }}>
      {/* Sidebar */}
      <aside className="glass-panel" style={{ width: "250px", borderRight: "1px solid var(--glass-border)", padding: "20px", display: "flex", flexDirection: "column", gap: "16px", margin: "16px", borderRadius: "var(--radius-lg)" }}>
        <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "var(--accent-color)", marginBottom: "20px" }}>EmailPro</div>
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link href="/dashboard" style={{ color: "var(--text-primary)", fontWeight: "500" }}>Unified Inbox</Link>
          <Link href="/dashboard/calendar" style={{ color: "var(--text-primary)", fontWeight: "500" }}>Calendar</Link>
          <Link href="/dashboard/campaigns" style={{ color: "var(--text-primary)", fontWeight: "500" }}>Campaigns</Link>
        </nav>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
          <UserButton />
          <span style={{ fontSize: "0.9rem" }}>Profile</span>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "16px", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}
