import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
	const token = cookies().get('token');
	if (!token) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	const isVerified = await verifyToken(token.value);

	if (!isVerified) {
		return NextResponse.redirect(new URL('/login', request.url));
	}
}

export async function verifyToken(token: string): Promise<boolean> {
	try {
		const decodedToken = jwtVerify(
			token, new TextEncoder().encode(process.env.SECRET_KEY)
		);

		return !!(await decodedToken);
	} catch (error) {
		console.error('Error', error);
		return false;
	}
}

export const config = {
	matcher: ['/'],
};
