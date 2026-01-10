import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/db/db'
import * as schema from '@/db/schemas/auth'
import { nextCookies } from 'better-auth/next-js'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID as string,
      clientSecret: process.env.APPLE_CLIENT_SECRET as string
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'github', 'apple']
    }
  },
  rateLimit: {
    window: 60, // 60 seconds
    max: 10 // 10 requests per window
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // Cache duration in seconds (5 minutes)
    }
  },
  plugins: [nextCookies()]
})
