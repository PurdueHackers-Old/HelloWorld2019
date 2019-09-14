import React, { FormEvent, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { sendErrorMessage, sendSuccessMessage, clearFlashMessages } from '../../redux/actions';
import { IContext, IStoreState, IUser } from '../../@types';
import { redirectIfNotAuthenticated } from '../../utils/session';
import {
	Gender,
	ethnicities,
	ClassYear,
	Major,
	Referral,
	ShirtSize
} from '../../../shared/app.enums';
import { err, formatDate, endResponse } from '../../utils';
import { ApplicationForm } from './ApplicationForm';
import { ApplicationsStatus } from '../../../shared/globals.enums';
import { Role } from '../../../shared/user.enums';
import { fetchGlobals, getOwnApplication, sendApplication } from '../../api';

interface Props {
	user: IUser;
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
}

const Apply = ({ user, flashError, flashSuccess, clear }: Props) => {
	const formRef = useRef<HTMLFormElement>();
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
		resume: null,
		closed: false,
		loading: true
	});

	// Populate application fields on initial load
	useEffect(() => {
		Promise.all([getOwnApplication(), fetchGlobals()])
			.then(([application, globals]) => {
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
			})
			.catch(error => {
				clear();
				flashError(err(error));
			});
	}, []);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			clear();
			flashSuccess('Submitting application...');
			const formData = new FormData(formRef.current);
			await sendApplication(formData as any);
			clear();
			flashSuccess('Application successful!');
		} catch (error) {
			clear();
			flashError(err(error));
		}
	};

	if (state.loading) return <span>Loading...</span>;

	return (
		<div
			className="bg-purple-gradient uk-section fullscreen"
			style={{ minHeight: '100vh', paddingBottom: 0 }}
		>
			<h1
				id="apply-heading"
				className="text-yellow uk-heading-small uk-margin-large-top uk-margin-large-left uk-padding-large-top"
			>
				Apply
			</h1>
			<div
				className="foreground-announcement"
				style={{
					backgroundImage: `url(${require('../../static/images/DefaultForeground.png')})`,

					backgroundPosition: 'center top',
					backgroundSize: 'cover'
				}}
			>
				{state.updatedAt && (
					<div className="uk-margin-large-top uk-margin-large-left">
						<br />
						<div className="text-yellow">
							Last Updated:
							<br />
							{formatDate(state.updatedAt)}
						</div>
						<br />
					</div>
				)}
				{state.statusPublic && (
					<div className="uk-margin-large-left">
						<div className="text-yellow">
							Status:
							<br />
							{state.statusPublic}
						</div>
						<br />
					</div>
				)}
				{state.closed && (
					<h2 className="text-align-center" style={{ color: 'red' }}>
						APPLICATIONS ARE CLOSED!
					</h2>
				)}
				<ApplicationForm
					{...(state as any)}
					formRef={formRef}
					disabled={closed}
					user={user}
					onSubmit={onSubmit}
				/>
			</div>
		</div>
	);
};

Apply.getInitialProps = async (ctx: IContext) => {
	if (redirectIfNotAuthenticated('/signup', ctx, { msg: 'You must login to apply' }))
		return endResponse(ctx);

	const { user } = ctx.store.getState().sessionState;
	return { user };
};

export const ApplyPage = connect(
	(state: IStoreState) => ({ user: state.sessionState.user }),
	{ flashError: sendErrorMessage, flashSuccess: sendSuccessMessage, clear: clearFlashMessages }
)(Apply);
