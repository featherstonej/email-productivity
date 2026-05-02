import { fetchLatestEmails } from "@/app/actions/email";

export default async function DashboardPage() {
  const emails = await fetchLatestEmails();

  return (
    <div className="glass-panel" style={{ padding: "30px", minHeight: "100%" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>Unified Inbox</h1>
      
      {emails.length === 0 ? (
        <p style={{ color: "var(--text-secondary)" }}>No emails found. Ensure you have connected your Gmail or Outlook account in your profile.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {emails.map((email) => (
            <div key={email.id} className="glass-panel email-card" style={{ padding: "16px", cursor: "pointer", transition: "transform 0.15s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontWeight: "bold" }}>{email.from}</span>
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  {new Date(email.date).toLocaleDateString()}
                  {" · "}
                  <span style={{ textTransform: "uppercase", fontSize: "0.75rem", padding: "2px 6px", borderRadius: "10px", background: email.provider === 'gmail' ? '#fce8e6' : '#e6f0fa', color: email.provider === 'gmail' ? '#d93025' : '#185abc' }}>{email.provider}</span>
                </span>
              </div>
              <div style={{ fontWeight: "600", marginBottom: "4px" }}>{email.subject}</div>
              <div style={{ fontSize: "0.95rem", color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {email.snippet}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
