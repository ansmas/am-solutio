import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
     adapter: PrismaAdapter(prisma),
     session: {strategy: "jwt"},
     providers: [
          Credentials({
               name: "credentials",
               credentials: {
                    email: { label: "Email", type: "email" },
                    password: { label: "Mot de passe", type: "password" },
               },
               async authorize(credentials) {
                    if(!credentials?.email || !credentials?.password) return null;

                    const user = await prisma.user.findUnique({
                         where: { email: credentials.email as string},
                         include: { subscription: true },
                    });

                    if(!user || !user.passwordHash) return null;

                    const isValid = await bcrypt.compare(
                         credentials.password as string,
                         user.passwordHash
                    );

                    if(!isValid) return null;

                    return {
                         id: user.id,
                         email: user.email,
                         name: user.name,
                         plan: user.subscription?.plan ?? "free",
                    };
               },
          }),
     ],
     callbacks: {
          async jwt({ token, user }) {
               if(user) {
                    token.id = user.id;
                    token.plan = (user as any).plan;
               }
               return token;
          },
          async session({ session, token }) {
               if(token) {
                    session.user.id = token.id as string;
                    (session.user as any).plan = token.plan;
               }
               return session;
          },
     },
     pages: {
          signIn: "/login"
     }
})