import { prisma } from "@repo/db";
import bcrypt from "bcryptjs";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const config:NextAuthConfig = {
  providers: [
    Credentials({
      name: "credentials",
      authorize: async (credentials) => {
        try {
          const email = credentials.email as string;
          const password = credentials.password as string;
          if (!email || !password) {
            throw new Error("Email and Password doesn't reached Auth.");
          }

          const user = await prisma.user.findUnique({ where: { email } });
          if (!user) throw new Error("User not found. Try Signing Up...");

          const matchPassword = await bcrypt.compare(password, user.password as string);
          if (!matchPassword) throw new Error("Password incorrect. Try Again.");

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            image: user.imageUrl,
          };
        } catch (error) {
          console.log("Some error occured");
          return null;
        }
      },
    }),
  ],
  callbacks:{
    jwt:({token, user}) =>{
        if(user){
            token.id = user.id;
            token.email = user.email;
            token.name = user.name;
            token.picture = user.image;
        }
        return token;
    },

    session: ({session, token}) =>{
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name;
        session.user.image = token.picture;

        return session;
    }
  },
  pages: {
    signIn: "/login",
  },
};

const nextAuth = NextAuth(config);

export const handlers: typeof nextAuth.handlers = nextAuth.handlers;
export const signIn: typeof nextAuth.signIn = nextAuth.signIn;
export const signOut: typeof nextAuth.signOut = nextAuth.signOut;
export const auth: typeof nextAuth.auth = nextAuth.auth;
