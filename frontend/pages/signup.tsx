import React, { FormEvent, useState, ChangeEvent } from 'react';
import { createUser } from '../actions';

const Signup = () => {
	const [state, setState] = useState({
		name: '',
		email: '',
		password: '',
		passwordConfirm: ''
	});

	const onChange = (e: ChangeEvent<HTMLInputElement>) =>
		setState({ ...state, [e.target.name]: e.target.value });

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { name, email, password, passwordConfirm } = state;
		if (!name || !email || !password || !passwordConfirm) return;
		try {
			const user = await createUser({ name, email, password, passwordConfirm });
			console.log('New User:', user);
		} catch (error) {
			console.error('Error creating user', error);
		}
	};

	return (
		<div>
			Signup Page
			<br />
			<form onSubmit={onSubmit}>
				<label>
					Name:
					<input name="name" value={state.name} onChange={onChange} />
				</label>
				<br />
				<label>
					Email:
					<input name="email" value={state.email} onChange={onChange} />
				</label>
				<br />
				<label>
					Password:
					<input name="password" value={state.password} onChange={onChange} />
				</label>
				<br />
				<label>
					Password Comfirm:
					<input
						name="passwordConfirm"
						value={state.passwordConfirm}
						onChange={onChange}
					/>
				</label>
				<br />
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
};

export default Signup;
