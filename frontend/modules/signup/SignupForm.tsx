import React from 'react';

type Props = {
	name?: string;
	email?: string;
	password?: string;
	passwordConfirm?: string;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SignupForm: React.FC<Props> = ({
	name,
	email,
	password,
	passwordConfirm,
	onSubmit,
	onChange
}) => {
	return (
		<form onSubmit={onSubmit}>
			<label>
				Name:
				<input required name="name" value={name} onChange={onChange} />
			</label>
			<br />
			<label>
				Email:
				<input required name="email" value={email} onChange={onChange} />
			</label>
			<br />
			<label>
				Password:
				<input
					required
					type="password"
					name="password"
					value={password}
					onChange={onChange}
				/>
			</label>
			<br />
			<label>
				Password Comfirm:
				<input
					required
					type="password"
					name="passwordConfirm"
					value={passwordConfirm}
					onChange={onChange}
				/>
			</label>
			<br />
			<input type="submit" value="Submit" />
		</form>
	);
};
