import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/db";
import { compare } from "bcryptjs";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      authorize: async (credentials) => {
        try {
          const email = credentials?.email as string;
          const password = credentials?.password as string;

          if(!email || !password) return null;

          const user = await prisma.user.findUnique({
            where:{email}
          });
          if(!user) return null;

          const matchPassword = await compare(password,user.password);
          if(!matchPassword) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.imageUrl
          }
        } catch (err) {
          console.error("Error while signing in through credentials",err)
          return null;
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
  },
  session: {
    strategy: 'jwt'
  }
})