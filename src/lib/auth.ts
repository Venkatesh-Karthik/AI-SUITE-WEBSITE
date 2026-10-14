import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authPages } from "@/lib/authPages";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Credentials provider forces JWT sessions (NextAuth requirement).
  // Account linking still happens through the Prisma adapter's User/Account
  // tables, so Google and Email-OTP resolve to the same User by email.
  session: { strategy: "jwt" },
  pages: authPages,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true, // same verified email -> same User
    }),
    CredentialsProvider({
      id: "email-otp",
      name: "Email code",
      credentials: {
        email: { label: "Email", type: "email" },
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.code) return null;
        const email = credentials.email.trim().toLowerCase();

        const otp = await prisma.otpCode.findFirst({
          where: { email, consumedAt: null },
          orderBy: { createdAt: "desc" },
        });
        if (!otp) return null;
        if (otp.expiresAt < new Date()) return null;
        if (otp.attempts >= 5) return null;

        const valid = await bcrypt.compare(credentials.code, otp.codeHash);

        await prisma.otpCode.update({
          where: { id: otp.id },
          data: { attempts: { increment: 1 }, consumedAt: valid ? new Date() : undefined },
        });

        if (!valid) return null;

        // Find-or-create the User this verified email belongs to, and
        // ensure there's an Account row so it shows up as a linked
        // sign-in method alongside Google.
        const user = await prisma.user.upsert({
          where: { email },
          update: { emailVerified: new Date() },
          create: { email, emailVerified: new Date() },
        });

        await prisma.account.upsert({
          where: { provider_providerAccountId: { provider: "email-otp", providerAccountId: email } },
          update: {},
          create: {
            userId: user.id,
            type: "email",
            provider: "email-otp",
            providerAccountId: email,
          },
        });

        return { id: user.id, email: user.email, name: user.name, image: user.image };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as { id?: string }).id = token.sub;
      }
      return session;
    },
  },
};
