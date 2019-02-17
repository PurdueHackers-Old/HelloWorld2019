import React from 'react';

type Props = {
	email?: string;
	password?: string;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const LoginForm: React.FC<Props> = ({ email, password, onSubmit, onChange }) => {
	return (
		<form onSubmit={onSubmit}>
			<label>
				Email:
				<input required type="email" name="email" value={email} onChange={onChange} />
			</label>
			<br />
			<label>
				Password:
				<input required type="password" name="password" value={password} onChange={onChange} />
			</label>
			<br />
			<input type="submit" value="Submit" />
		</form>
	);
};
