import { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtUtils } from './ulits/jwt';
import { getNewAccessToken } from './service/refreshToken';


const AUTH_ROUTES = ['/login', '/register'];
const PUBLIC_ROUTES = ["/", '/news'];

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const cookieStore = await cookies();
    // console.log(request.nextUrl, "request");
    // console.log(pathname, "Pathname")
    // console.log("Proxy")
    // return NextResponse.redirect(new URL('/', request.url))
    let accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    let decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;
    const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;
    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
        const result = await getNewAccessToken();
        if (result.success) {
            const newAccessToken = result.data.accessToken;
            cookieStore.set('accessToken', newAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: 'lax'
            });
            accessToken = newAccessToken;
            decodedAccessToken = jwtUtils.verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET as string);
        }
    }

    let userRole = null;
    if (!decodedAccessToken?.success) {
        cookieStore.delete('accessToken')
        // return NextResponse.redirect(new URL('/login', request.url))
    }
    if (decodedAccessToken?.success && decodedAccessToken.data) { // we have change this
        userRole = (decodedAccessToken.data as JwtPayload).role;
    }

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