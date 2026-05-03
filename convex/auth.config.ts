const clerkIssuerUrl = process.env.CLERK_ISSUER_URL;

if (!clerkIssuerUrl) {
  throw new Error("Missing required environment variable: CLERK_ISSUER_URL");
}

export default {
  providers: [
    {
      domain: clerkIssuerUrl,
      applicationID: "convex",
    },
  ]
};
