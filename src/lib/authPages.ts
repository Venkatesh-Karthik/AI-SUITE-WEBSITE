// Shared between src/lib/auth.ts and src/middleware.ts. Kept in its own
// file with zero dependencies because middleware.ts runs on the Edge
// runtime and must NOT import src/lib/auth.ts directly — that file pulls
// in the Prisma client and bcryptjs, neither of which support the Edge
// runtime (bcryptjs uses Node-only APIs like process.nextTick/setImmediate,
// and Prisma Client requires the Node.js runtime).
export const authPages = {
  signIn: "/login",
} as const;
