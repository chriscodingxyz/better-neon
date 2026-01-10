export type Result<T, E = unknown> =
  | { ok: true; data: T }
  | { ok: false; error: E; message: string }

export const ok = <T>(data: T): Result<T, never> => ({ ok: true, data })

export const err = <E = unknown>(error: E): Result<never, E> => ({
  ok: false,
  error,
  message: error instanceof Error ? error.message : 'Unknown error'
})
