import { db } from '@/db/db'
// import { DemoUserSchema, demoUsers } from '@/db/schemas/schema'
import { ok, err, type Result } from '@/types/result'
import 'server-only'

// export async function getUsers(): Promise<Result<DemoUserSchema[]>> {
//   try {
//     const users = await db.select().from(demoUsers).limit(10)
//     return ok(users)
//   } catch (error) {
//     console.error('[getUsers] 😈', error)
//     return err(error)
//   }
// }
