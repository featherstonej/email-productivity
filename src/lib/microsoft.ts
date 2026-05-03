import { Client } from "@microsoft/microsoft-graph-client";

export function getMicrosoftClient(accessToken: string) {
  return Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
}
