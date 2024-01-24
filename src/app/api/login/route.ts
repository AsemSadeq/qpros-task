import { NextRequest, NextResponse } from 'next/server';
import { LoginResponse } from '@/services/LoginService';
import { connectDB } from 'src/app/db/db';
import { login } from 'src/app/controller/loginController';

export async function POST(req: NextRequest): Promise<NextResponse<LoginResponse> | undefined> {
	try {
		const body = await req.json();
		await connectDB();
		return login(body);
	} catch (error) {
		console.error('Error', error);
	}
};
