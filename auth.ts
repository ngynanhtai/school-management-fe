import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { User } from "./app/lib/definitions";
import bcrypt from "bcrypt";
import { login } from "./app/api/route";

async function getUser(
  email: string,
  password: string
): Promise<User | undefined> {
  try {
    const user = await login(email, password);
    return user;
  } catch (error) {
    console.error("Failed to fetch user: ", error);
    throw new Error("Failed to fetch users.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredential = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredential.success) {
          const { email, password } = parsedCredential.data;
          const user = await getUser(email, password);
          if (!user) return null;

          return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
