export { default } from "next-auth/middleware";

export const config = {
  // Unauthenticated visitors are redirected to /login automatically.
  matcher: ["/dashboard/:path*"],
};
