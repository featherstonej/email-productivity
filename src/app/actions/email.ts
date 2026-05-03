"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { getGoogleClient } from "@/lib/google";
import { getMicrosoftClient } from "@/lib/microsoft";

export async function fetchLatestEmails() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const client = await clerkClient();
  let emails: any[] = [];

  // Try fetching Google token
  try {
    const googleTokenResponse = await client.users.getUserOauthAccessToken(userId, "oauth_google");
    const googleToken = googleTokenResponse.data[0]?.token;

    if (googleToken) {
      const googleClients = getGoogleClient(googleToken);
      const res = await googleClients.gmail.users.messages.list({
        userId: "me",
        maxResults: 10,
        labelIds: ["INBOX"],
      });

      const messages = res.data.messages || [];
      const gmailEmails = await Promise.all(
        messages.map(async (msg) => {
          const detail = await googleClients.gmail.users.messages.get({
            userId: "me",
            id: msg.id!,
          });

          const headers = detail.data.payload?.headers;
          const subject = headers?.find(h => h.name === "Subject")?.value;
          const from = headers?.find(h => h.name === "From")?.value;
          const date = headers?.find(h => h.name === "Date")?.value;

          return {
            id: msg.id,
            provider: "gmail",
            subject: subject || "No Subject",
            from: from || "Unknown",
            date: date,
            snippet: detail.data.snippet,
          };
        })
      );

      emails.push(...gmailEmails);
    }
  } catch (error: any) {
    console.error("Error fetching from Google:", error);
    if (error.message?.includes('insufficient authentication scopes')) {
      emails.push({
        id: "mock-google-scope-error",
        provider: "gmail",
        subject: "Action Required: Gmail Permissions Missing",
        from: "System <admin@emailpro>",
        date: new Date().toISOString(),
        snippet: "Clerk's default shared Google credentials do not support the Gmail scope. You must create custom credentials in Google Cloud Console.",
      });
    }
  }

  // Try fetching Microsoft token
  try {
    const msTokenResponse = await client.users.getUserOauthAccessToken(userId, "oauth_microsoft");
    const msToken = msTokenResponse.data[0]?.token;

    if (msToken) {
      const msClient = getMicrosoftClient(msToken);
      const res = await msClient.api("/me/messages")
        .select("id,subject,from,receivedDateTime,bodyPreview")
        .top(10)
        .get();

      const messages = res.value || [];
      for (const msg of messages) {
        emails.push({
          id: msg.id,
          provider: "outlook",
          subject: msg.subject || "No Subject",
          from: msg.from?.emailAddress?.address || "Unknown",
          date: msg.receivedDateTime,
          snippet: msg.bodyPreview,
        });
      }
    }
  } catch (error: any) {
    console.error("Error fetching from Microsoft:", error);
    if (error.message?.includes('insufficient') || error.statusCode === 403) {
      emails.push({
        id: "mock-ms-scope-error",
        provider: "outlook",
        subject: "Action Required: Outlook Permissions Missing",
        from: "System <admin@emailpro>",
        date: new Date().toISOString(),
        snippet: "Please ensure you have added the Mail.Read scope in Clerk.",
      });
    }
  }

  // Sort by date descending
  emails.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return emails;
}
