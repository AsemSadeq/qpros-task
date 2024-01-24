import { LoginFormData, LoginResponse } from '@/services/LoginService';
import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import UserModel from 'src/app/models/User';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';

class LoginController {
	private static instance: LoginController;

	public static getInstance(): LoginController {
		if (!LoginController.instance) {
			LoginController.instance = new LoginController();
		}

		return LoginController.instance;
	}

	public async login(body: LoginFormData): Promise<NextResponse<LoginResponse> | undefined> {
		try {
			return LoginController.getInstance().validateCredentials(body);
		} catch (error) {
			console.error('Error', error);
		}
	}

	private async validateCredentials(body: LoginFormData): Promise<NextResponse<LoginResponse> | undefined> {
		try {
			const user = await UserModel.findOne({
				email: body.email
			});
			if (user) {
				const isValid = await bcrypt.compare(body.password, user.password);
				if (isValid) {
					const generatedToken = await LoginController.getInstance().generateToken(body.email);
					cookies().set('token', generatedToken);
					return NextResponse.json({ status: 200, message: 'Login Successfully' });
				}
			}

			return NextResponse.json({ status: 404, message: 'Invalid Credentials'});
		} catch (error) {
			console.error('Error', error);
		}
	}

	private async generateToken(email: string): Promise<string> {
		const token = await (new SignJWT({ email })
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setExpirationTime('1d')
			.sign(new TextEncoder().encode(process.env.SECRET_KEY)));

		return token;
	}
}

export const login = LoginController.getInstance().login;
