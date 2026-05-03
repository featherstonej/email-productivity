import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  return (
    <main className="app-container" style={{ alignItems: "center", justifyContent: "center" }}>
      <div className="glass-panel" style={{ padding: "40px", maxWidth: "600px", width: "100%", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "16px", color: "var(--accent-color)" }}>Email Productivity</h1>
        <p style={{ fontSize: "1.1rem", marginBottom: "32px", color: "var(--text-secondary)" }}>
          Your unified command center for Gmail and Outlook, supercharged by AI.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          {!userId ? (
            <SignInButton mode="modal">
              <button className="btn-primary">Sign In to Get Started</button>
            </SignInButton>
          ) : (
            <Link href="/dashboard" className="btn-primary" style={{ display: "inline-block" }}>
              Go to Dashboard
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
