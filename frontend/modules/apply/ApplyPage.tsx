import React, { Component, FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
	sendErrorMessage,
	sendSuccessMessage,
	getOwnApplication,
	sendApplication,
	clearFlashMessages
} from '../../redux/actions';
import { IContext, IApplication, IStoreState, IUser } from '../../@types';
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

type Props = {
	user: IUser;
	application: IApplication | null;
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
};

@((connect as any)((state: IStoreState) => ({ user: state.sessionState.user }), {
	flashError: sendErrorMessage,
	flashSuccess: sendSuccessMessage,
	clear: clearFlashMessages
}))
export class ApplyPage extends Component<Props> {
	static getInitialProps = async (ctx: IContext) => {
		if (redirectIfNotAuthenticated('/', ctx, { msg: 'You must login to apply' })) return {};
		let application: IApplication;
		try {
			application = await getOwnApplication(ctx);
			// tslint:disable-next-line: no-empty
		} catch {}
		return { application };
	};

	state = {
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
		...this.props.application
	};

	onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
		this.setState({ [e.target.name]: e.target.value });

	onSelect = (e: ChangeEvent<HTMLSelectElement>) =>
		this.setState({ [e.target.name]: e.target.value });

	onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { flashError, flashSuccess, clear } = this.props;
		try {
			clear();
			await sendApplication(this.state);
			flashSuccess('Application successful!');
		} catch (error) {
			flashError(err(error));
		}
	};

	render() {
		return (
			<div>
				Apply Page
				<br />
				{this.state.updatedAt && (
					<>
						<br />
						<div>
							Last Updated:
							<br />
							{formatDate(this.state.updatedAt)}
						</div>
						<br />
					</>
				)}
				{this.state.statusPublic && (
					<>
						<div>
							Status:
							<br />
							{this.state.statusPublic}
						</div>
						<br />
					</>
				)}
				<ApplicationForm
					{...this.state}
					user={this.props.user}
					onChange={this.onChange}
					onSelect={this.onSelect}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}
