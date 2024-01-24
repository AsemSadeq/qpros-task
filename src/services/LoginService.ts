export type LoginFormData = {
	email: string;
	password: string;
};

export type LoginResponse = {
	status: number,
	message: string,
}

class LoginService {
	private static instance: LoginService;

	public static getInstance(): LoginService {
		if (!LoginService.instance) {
			LoginService.instance = new LoginService();
		}

		return LoginService.instance;
	}

	public async loginRequest(body: LoginFormData): Promise<LoginResponse | undefined> {
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
				method: 'POST',
				body: JSON.stringify(body)
			});

			return res.json() as Promise<LoginResponse>;
		} catch (error) {
			console.error(`Error: ${error}`);
		}
	}
}

export const loginRequest = LoginService.getInstance().loginRequest;