const CredentialsProvider = require('next-auth/providers/credentials').default
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth, { getServerSession } from 'next-auth'
import { verifyPassword } from './hash'

const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing email or password')
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          // User not found or has no password set
          console.log('User not found in base')
          return null
        }

        console.log('User not found. Checking password...')
        console.log('Password from form:', credentials.password)
        console.log('Hashed password from DB:', user.password)

        const isValid = verifyPassword(user.password, credentials.password)

        console.log('Result of password check:', isValid)
        console.log('--- AUTHORIZE FUNCTION FINIFHED ---')

        if (!isValid) {
          // Invalid password
          return null
        }

        return /* { id: user.id, email: user.email } */ user
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (token) session.user.id = token.id
      return session
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)

// LOGIN I LOGOUT LOGIKA JE OSTALA

/* const { handlers, signIn, signOut, auth } = NextAuth(authOptions)

export const GET = handlers?.GET
export const POST = handlers?.POST

export { signIn, signOut, auth }
 */
 