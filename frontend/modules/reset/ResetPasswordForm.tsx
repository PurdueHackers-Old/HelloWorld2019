import React from 'react';

interface Props {
	password: string;
	passwordConfirm: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const ResetPasswordForm = ({ password, passwordConfirm, onChange, onSubmit }: Props) => {
	return (
		<form onSubmit={onSubmit}>
			<label htmlFor="password">
				Password *
				<input
					required
					type="password"
					name="password"
					className="form-control uk-textarea"
					placeholder="Password"
					value={password}
					onChange={onChange}
				/>
			</label>
			<br />
			<label htmlFor="passwordConfirm">
				Confirm Password *
				<input
					required
					type="password"
					name="passwordConfirm"
					className="form-control uk-textarea"
					value={passwordConfirm}
					onChange={onChange}
					placeholder="Confirm Password"
				/>
			</label>
			<br />
			<input type="submit" className="uk-button-ancmnt" value="Reset Password" />
		</form>
	);
};
