import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./lib/db";
import { compare } from "bcryptjs";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      authorize: async (credentials) => {
        try {
          const email = credentials.email as string;
          const password = credentials.password as string;

          if(!email || !password) throw new Error("Email or Password filed is empty.");

          const user = await prisma.user.findUnique({
            where:{email}
          });
          if(!user) throw new Error("No user found with the specified email.");

          const matchPassword = await compare(password,user.password as string);
          if(!matchPassword) throw new Error("Password doesn't match.");

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.imageUrl
          }
        } catch {
          throw new Error("Some error occured while signing in through credentials.")
        }
      }
    })
  ],
  callbacks: {
    jwt: ({token,user}) => {
      if(user){
        token.id = user.id,
        token.email = user.email,
        token.name = user.name,
        token.picture = user.image,
        token.iat = Date.now()
      }
      return token;
    },
    session: ({session,token}) => {
      session.user.id = token.id as string,
      session.user.name = token.name,
      session.user.email = token.email as string,
      session.user.image = token.picture

      return session;
    }
  },
  pages: {
    signIn: "/login"
  }
})