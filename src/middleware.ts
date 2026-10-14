import { withAuth } from "next-auth/middleware";
import { authPages } from "@/lib/authPages";

// Wired to the same `pages.signIn` as authOptions (via the shared,
// dependency-free authPages module — NOT by importing src/lib/auth.ts,
// which pulls in Prisma/bcrypt and breaks the Edge runtime middleware
// bundle) so unauthenticated visitors land on our custom /login page
// instead of NextAuth's built-in /api/auth/signin.
export default withAuth({
  pages: authPages,
});

export const config = {
  // Unauthenticated visitors are redirected to /login automatically.
  matcher: ["/dashboard/:path*"],
};
