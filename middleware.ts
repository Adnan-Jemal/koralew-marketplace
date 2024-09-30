export { auth as middleware } from "@/auth"

export const config = {
  matcher: ['/category/:path*', '/account/:path*'],
}