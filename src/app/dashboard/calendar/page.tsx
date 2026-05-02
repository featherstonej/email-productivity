export default async function CalendarPage() {
  return (
    <div className="glass-panel" style={{ padding: "30px", minHeight: "100%" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Unified Calendar</h1>
      <p style={{ color: "var(--text-secondary)" }}>
        Your Google Workspace and Microsoft Graph events will appear here.
      </p>
      {/* Placeholder calendar grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "10px", marginTop: "20px" }}>
        {[...Array(35)].map((_, i) => (
          <div key={i} className="glass-panel" style={{ height: "100px", padding: "8px" }}>
            <div style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>{i + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
