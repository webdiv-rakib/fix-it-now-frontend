import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


const AUTH_ROUTES = ['/login', '/register'];
const PUBLIC_ROUTES = ["/", '/news'];

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    // console.log(request.nextUrl, "request");
    // console.log(pathname, "Pathname")
    // console.log("Proxy")
    // return NextResponse.redirect(new URL('/', request.url))
    const accessToken = request.cookies.get('accessToken')?.value;
    const decodedToken = accessToken ? jwt.decode(accessToken) as JwtPayload : null;

    let userRole = null;
    if (decodedToken) {
        userRole = decodedToken.role
    };

    if (accessToken && AUTH_ROUTES.includes(pathname)) {
        if (userRole === 'CUSTOMER') {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
        else if (userRole === 'ADMIN') {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url))
        }
        else if (userRole === 'TECHNICIAN') {
            return NextResponse.redirect(new URL('/technician-dashboard', request.url))
        }
        else {
            return NextResponse.redirect(new URL('/', request.url))
        }
    };


    const isPublic = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'));
    const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'));
    // Authenticated Pages Protection: Authorization is not handled yet
    if (!accessToken && !isPublic && !isAuthRoute) {
        return NextResponse.redirect(new URL('/login', request.url))
    }


    if (pathname.startsWith('/dashboard') && userRole !== 'CUSTOMER') {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }
    else if (pathname.startsWith('/technician-dashboard') && userRole !== 'TECHNICIAN') {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }
    else if (pathname.startsWith('/admin-dashboard') && userRole !== 'ADMIN') {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }

    return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: [
        // '/dashboard/:path*',
        // '/admin-dashboard/:path*'
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
    ]
}