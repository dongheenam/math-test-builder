import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

if (
  process.env.AZURE_AD_CLIENT_ID === undefined ||
  process.env.AZURE_AD_CLIENT_SECRET === undefined
) {
  throw new Error("environment variables for auth not loaded!");
}

export const authOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
};
export default NextAuth(authOptions);
