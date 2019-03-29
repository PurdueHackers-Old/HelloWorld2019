import React, { Component, FormEvent, ChangeEvent } from 'react';
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

@((connect as any)((state: IStoreState) => ({ user: state.sessionState.user }), {
	flashError: sendErrorMessage,
	flashSuccess: sendSuccessMessage,
	clear: clearFlashMessages
}))
export class ApplyPage extends Component<Props> {
	static getInitialProps = async (ctx: IContext) => {
		if (redirectIfNotAuthenticated('/', ctx, { msg: 'You must login to apply' })) return {};
		const { user } = ctx.store.getState().sessionState;
		return { user };
	};

	constructor(props) {
		super(props);
		this.state = {
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
			loading: true
			// ...this.props.application
		};
	}

	componentDidMount = async () => {
		const { user, flashError } = this.props;

		let application: IApplication;
		let globals: IGlobals;
		try {
			application = await getOwnApplication(null);
			globals = await fetchGlobals(null);
			// tslint:disable-next-line: no-empty
		} catch {}

		const closed =
			user.role === Role.ADMIN
				? false
				: globals.applicationsStatus === ApplicationsStatus.CLOSED;
				
		this.setState({
			...this.state,
			...application,
			closed,
			loading: false
		})
	}

	onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
		this.setState({ [e.target.name]: e.target.value });

	onSelect = (e: ChangeEvent<HTMLSelectElement>) =>
		this.setState({ [e.target.name]: e.target.value });

	onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { flashError, flashSuccess, clear } = this.props;
		try {
			clear();
			flashSuccess('Submitting application...');
			await sendApplication(this.state);
			clear();
			flashSuccess('Application successful!');
		} catch (error) {
			clear();
			flashError(err(error));
		}
	};

	render() {
		const { updatedAt, statusPublic, closed, loading} = this.state;
		if (loading) return <span>Loading...</span>

		return (
			<div>
				<h3>Apply Page</h3>
				<br />
				{updatedAt && (
					<>
						<br />
						<div>
							Last Updated:
							<br />
							{formatDate(updatedAt)}
						</div>
						<br />
					</>
				)}
				{statusPublic && (
					<>
						<div>
							Status:
							<br />
							{statusPublic}
						</div>
						<br />
					</>
				)}
				{closed && <h2>APPLICATIONS ARE CLOSED!</h2>}
				<ApplicationForm
					{...this.state}
					disabled={closed}
					user={this.props.user}
					onChange={this.onChange}
					onSelect={this.onSelect}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}
