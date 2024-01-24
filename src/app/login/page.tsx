import Login from '@/components/Login';
import { NextPage } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from 'src/middleware';

async function middleware(): Promise<void> {
	const token = cookies().get('token');

	if (token) {
		const isVerified = await verifyToken(token.value);

		if (isVerified) {
			redirect('/');
		}
	}
}

const LoginPage: NextPage = async () => {
	await middleware();
	return (
		<Login />
	);
};

export default LoginPage;