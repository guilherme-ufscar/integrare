import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "integrare-super-secret-key-321123"
)

async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /painel routes
  if (pathname.startsWith("/painel")) {
    const token = request.cookies.get("integrare-client-token")?.value
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    const payload = await verifyJWT(token) as any
    if (!payload) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Block if company is not ACTIVE
    if (payload.companyStatus && payload.companyStatus !== "ACTIVE") {
      return NextResponse.redirect(new URL("/login?blocked=1", request.url))
    }

    return NextResponse.next()
  }

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("integrare-admin-token")?.value
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    const payload = await verifyJWT(token)
    if (!payload) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/painel/:path*", "/admin/:path*"],
}
