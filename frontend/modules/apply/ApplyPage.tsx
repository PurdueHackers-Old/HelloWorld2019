import React, { Component, FormEvent, ChangeEvent, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	sendErrorMessage,
	sendSuccessMessage,
	getOwnApplication,
	sendApplication,
	clearFlashMessages,
	fetchGlobals
} from '../../redux/actions';
import { IContext, IApplication, IStoreState, IUser, IGlobals } from '../../@types';
import { redirectIfNotAuthenticated } from '../../utils/session';
import {
	Gender,
	ethnicities,
	ClassYear,
	Major,
	Referral,
	ShirtSize
} from '../../../shared/app.enums';
import { err, formatDate } from '../../utils';
import { ApplicationForm } from './ApplicationForm';
import { ApplicationsStatus } from '../../../shared/globals.enums';
import { Role } from '../../../shared/user.enums';

type Props = {
	user: IUser;
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
};

const Apply = ({ user, flashError, flashSuccess, clear }: Props) => {
	const [state, setState] = useState({
		gender: Gender.MALE,
		ethnicity: ethnicities[0],
		classYear: ClassYear.FRESHMAN,
		graduationYear: new Date().getFullYear() + 4,
		major: Major.COMPUTER_SCIENCE,
		referral: Referral.CLASS,
		hackathons: 0,
		shirtSize: ShirtSize.SMALL,
		dietaryRestrictions: '',
		website: '',
		answer1: '',
		answer2: '',
		updatedAt: null,
		statusPublic: null,
		closed: false,
		loading: true
	});

	// Populate application fields on initial load
	useEffect(() => {
		Promise.all([getOwnApplication(), fetchGlobals()]).then(([application, globals]) => {
			const closed =
				user.role === Role.ADMIN
					? false
					: globals.applicationsStatus === ApplicationsStatus.CLOSED;

			setState(prev => ({
				...prev,
				...application,
				closed,
				loading: false
			}));
		});
	}, []);

	const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
		setState({ ...state, [e.target.name]: e.target.value });

	const onSelect = (e: ChangeEvent<HTMLSelectElement>) =>
		setState({ ...state, [e.target.name]: e.target.value });

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			clear();
			flashSuccess('Submitting application...');
			await sendApplication(state as any);
			clear();
			flashSuccess('Application successful!');
		} catch (error) {
			clear();
			flashError(err(error));
		}
	};

	if (state.loading) return <span>Loading...</span>;

	return (
		<div>
			<h3>Apply Page</h3>
			<br />
			{state.updatedAt && (
				<>
					<br />
					<div>
						Last Updated:
						<br />
						{formatDate(state.updatedAt)}
					</div>
					<br />
				</>
			)}
			{state.statusPublic && (
				<>
					<div>
						Status:
						<br />
						{state.statusPublic}
					</div>
					<br />
				</>
			)}
			{state.closed && <h2>APPLICATIONS ARE CLOSED!</h2>}
			<ApplicationForm
				{...state as any}
				disabled={closed}
				user={user}
				onChange={onChange}
				onSelect={onSelect}
				onSubmit={onSubmit}
			/>
		</div>
	);
};

Apply.getInitialProps = async (ctx: IContext) => {
	if (redirectIfNotAuthenticated('/', ctx, { msg: 'You must login to apply' })) return {};
	const { user } = ctx.store.getState().sessionState;
	return { user };
};

export const ApplyPage = connect(
	(state: IStoreState) => ({ user: state.sessionState.user }),
	{ flashError: sendErrorMessage, flashSuccess: sendSuccessMessage, clear: clearFlashMessages }
)(Apply);
