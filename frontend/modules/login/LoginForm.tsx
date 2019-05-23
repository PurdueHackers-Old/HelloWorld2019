import React from 'react';

interface Props {
	email?: string;
	password?: string;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginForm = ({ email, password, onSubmit, onChange }: Props) => {
	return (
		<form onSubmit={onSubmit}>
			<label>
				Email:
				<input required type="email" name="email" value={email} onChange={onChange} />
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
			<input type="submit" value="Submit" />
		</form>
	);
};
