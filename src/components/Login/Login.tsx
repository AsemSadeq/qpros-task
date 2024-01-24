'use client';

import {
	EMAIL_INVALID_ERROR_MSG,
	EMAIL_REQUIRED_ERROR_MSG,
	EMAIL_TEXT,
	LOGIN_BTN_TEXT,
	LOGIN_HEADER_TEXT,
	PASSWORD_MIN_ERROR_MSG,
	PASSWORD_REQUIRED_ERROR_MSG,
	PASSWORD_TEXT
} from '@/constants/login';

import { LoginFormData, loginRequest } from '@/services/LoginService';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Login.module.css';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
	const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
	const router = useRouter();

	const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
		const res = await loginRequest(data);

		if (res) {
			res.status === 200 ? router.push('/') : '';
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h4 className={styles.title}>{LOGIN_HEADER_TEXT}</h4>
				<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
					<div className={styles.field}>
						<input
							className={styles.inputField}
							placeholder={EMAIL_TEXT}
							{...register('email', {
								required: EMAIL_REQUIRED_ERROR_MSG,
								pattern: {
									value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
									message: EMAIL_INVALID_ERROR_MSG,
								}
							 })}
						/>
						{ errors.email && <span className={styles.errorLabel}>{errors.email.message}</span>}
					</div>
					<div className={styles.field}>
						<input
							className={styles.inputField}
							placeholder={PASSWORD_TEXT}
							type='password'
							{...register('password', {
								required: PASSWORD_REQUIRED_ERROR_MSG,
								minLength: {
									value: 8,
									message: PASSWORD_MIN_ERROR_MSG
								}
							})}
						/>
						{ errors.password && <span className={styles.errorLabel}>{errors.password.message}</span>}
					</div>
					<button className={styles.btn} type="submit">{LOGIN_BTN_TEXT}</button>
				</form>
			</div>
		</div>
	);
};

export default Login;