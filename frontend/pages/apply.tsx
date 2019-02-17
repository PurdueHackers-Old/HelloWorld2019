import React, { Component, FormEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { signIn, sendFlashMessage, getApplication, sendApplication } from '../redux/actions';
import { ISessionState } from '../redux/reducers/session';
import { ILoginUser, ILoginResponse, IContext } from '../@types';
import { redirectIfNotAuthenticated } from '../utils/session';
import { ApplicationDto } from '../../backend/models/application';
import {
	Gender,
	ethnicities,
	ClassYear,
	Major,
	Referral,
	ShirtSize,
	gradYears
} from '../../shared/app.enums';
import { err } from '../utils';

type Props = {
	signin: (body: ILoginUser) => Promise<ILoginResponse>;
	flash: (msg: any, type?: string) => void;
	application: ApplicationDto | null;
} & ISessionState;

class ApplyPage extends Component<Props> {
	static getInitialProps = async (ctx: IContext) => {
		if (redirectIfNotAuthenticated('/', ctx, { msg: 'You must login to apply' })) return {};
		let application: ApplicationDto;
		try {
			application = await getApplication(ctx);
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
		...this.props.application
	};

	onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
		this.setState({ [e.target.name]: e.target.value });

	onSelect = (e: ChangeEvent<HTMLSelectElement>) =>
		this.setState({ [e.target.name]: e.target.value });

	onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { flash } = this.props;
		try {
			await sendApplication(this.state);
			return flash('Application successful!', 'green');
		} catch (error) {
			return flash(err(error));
		}
	};

	render() {
		return (
			<div>
				Apply Page
				<br />
				<form onSubmit={this.onSubmit}>
					<label htmlFor="gender">
						Gender{' '}
						<select
							required
							name="gender"
							onChange={this.onSelect}
							value={this.state.gender}
						>
							{Object.values(Gender).map(gender => (
								<option value={gender} key={gender}>
									{gender}
								</option>
							))}
						</select>
					</label>
					<br />
					<label htmlFor="ethnicity">
						Ethnicity{' '}
						<select
							required
							name="ethnicity"
							onChange={this.onSelect}
							value={this.state.ethnicity}
						>
							{ethnicities.map((ethnicity, i) => (
								<option value={ethnicity} key={ethnicity}>
									{ethnicity}
								</option>
							))}
						</select>
					</label>
					<br />
					<label htmlFor="classYear">
						Class Year{' '}
						<select
							required
							name="classYear"
							onChange={this.onSelect}
							value={this.state.classYear}
						>
							{Object.values(ClassYear).map(classYear => (
								<option value={classYear} key={classYear}>
									{classYear}
								</option>
							))}
						</select>
					</label>
					<br />
					<label htmlFor="graduationYear">
						Graduation Year{' '}
						<select
							required
							name="graduationYear"
							onChange={this.onSelect}
							value={this.state.graduationYear}
						>
							{gradYears.map((graduationYear, i) => (
								<option value={graduationYear} key={graduationYear}>
									{graduationYear}
								</option>
							))}
						</select>
					</label>
					<br />
					<label htmlFor="major">
						Major{' '}
						<select
							required
							name="major"
							onChange={this.onSelect}
							value={this.state.major}
						>
							{Object.values(Major).map(major => (
								<option value={major} key={major}>
									{major}
								</option>
							))}
						</select>
					</label>
					<br />
					<label htmlFor="referral">
						Referral{' '}
						<select
							required
							name="referral"
							onChange={this.onSelect}
							value={this.state.referral}
						>
							{Object.values(Referral).map(referral => (
								<option value={referral} key={referral}>
									{referral}
								</option>
							))}
						</select>
					</label>
					<br />
					<label htmlFor="hackathons">
						Hackathons{' '}
						<input
							required
							min="0"
							name="hackathons"
							type="number"
							onChange={this.onChange}
							value={this.state.hackathons}
						/>
					</label>
					<br />
					<label htmlFor="shirtSize">
						Shirt Size{' '}
						<select
							required
							name="shirtSize"
							onChange={this.onSelect}
							value={this.state.shirtSize}
						>
							{Object.values(ShirtSize).map(shirtSize => (
								<option value={shirtSize} key={shirtSize}>
									{shirtSize}
								</option>
							))}
						</select>
					</label>
					<br />
					<label htmlFor="dietaryRestrictions">
						Dietary Restrictions{' '}
						<input
							name="dietaryRestrictions"
							onChange={this.onChange}
							value={this.state.dietaryRestrictions}
						/>
					</label>
					<br />
					<label htmlFor="website">
						Website{' '}
						<input
							name="website"
							type="url"
							onChange={this.onChange}
							value={this.state.website}
						/>
					</label>
					<br />
					<label htmlFor="answer1">
						Answer 1
						<br />
						<textarea
							required
							name="answer1"
							value={this.state.answer1}
							onChange={this.onChange}
						/>
					</label>
					<br />
					<label htmlFor="answer2">
						Answer 2
						<br />
						<textarea
							required
							name="answer2"
							value={this.state.answer2}
							onChange={this.onChange}
						/>
					</label>
					<br />
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	...state.sessionState
});

const ConnectedApply = connect(
	mapStateToProps,
	{ signin: signIn, flash: sendFlashMessage }
)(ApplyPage);

export default ConnectedApply;
