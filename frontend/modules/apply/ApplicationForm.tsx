import React, { MutableRefObject } from 'react';
import {
	Gender,
	ethnicities,
	ClassYear,
	gradYears,
	Major,
	Referral,
	ShirtSize
} from '../../../shared/app.enums';
import { IApplication, IUser } from '../../@types';

interface Props extends IApplication {
	formRef: MutableRefObject<HTMLFormElement>;
	user: IUser;
	disabled?: boolean;
	admin?: boolean;
	onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const ApplicationForm = (props: Props) => {
	return (
		<form
			className="uk-fieldset uk-card uk-card-body uk-form"
			onSubmit={props.onSubmit}
			ref={props.formRef}
		>
			<div style={{ height: '380px' }}></div>
			<label className="uk-form-label text-purple">Name: {props.user.name}</label>
			<div className="uk-margin"></div>
			<label className="uk-form-label text-purple">Email: {props.user.email}</label>
			<br />
			<br />
			<label className="uk-form-label text-purple" htmlFor="gender">
				Gender{' '}
				<select
					className="uk-select"
					disabled={props.disabled}
					required
					name="gender"
					defaultValue={props.gender}
				>
					{Object.values(Gender).map(gender => (
						<option value={gender} key={gender}>
							{gender}
						</option>
					))}
				</select>
			</label>
			<br />
			<div className="uk-margin"></div>
			<label className="uk-form-label text-purple" htmlFor="ethnicity">
				Ethnicity{' '}
				<select
					className="uk-select"
					disabled={props.disabled}
					required
					name="ethnicity"
					defaultValue={props.ethnicity}
				>
					{ethnicities.map(ethnicity => (
						<option value={ethnicity} key={ethnicity}>
							{ethnicity}
						</option>
					))}
				</select>
			</label>
			<div className="uk-margin"></div>
			<label className="uk-form-label text-purple" htmlFor="classYear">
				Class Year{' '}
				<select
					className="uk-select"
					disabled={props.disabled}
					required
					name="classYear"
					defaultValue={props.classYear}
				>
					{Object.values(ClassYear).map(classYear => (
						<option value={classYear} key={classYear}>
							{classYear}
						</option>
					))}
				</select>
			</label>
			<div className="uk-margin"></div>
			<label className="uk-form-label text-purple" htmlFor="graduationYear">
				Graduation Year{' '}
				<select
					className="uk-select"
					disabled={props.disabled}
					required
					name="graduationYear"
					defaultValue={`${props.graduationYear}`}
				>
					{gradYears.map(graduationYear => (
						<option value={graduationYear} key={graduationYear}>
							{graduationYear}
						</option>
					))}
				</select>
			</label>
			<div className="uk-margin"></div>
			<label className="uk-form-label text-purple" htmlFor="major">
				Major{' '}
				<select
					disabled={props.disabled}
					className="uk-select"
					required
					name="major"
					defaultValue={props.major}
				>
					{Object.values(Major).map(major => (
						<option value={major} key={major}>
							{major}
						</option>
					))}
				</select>
			</label>
			<div className="uk-margin"></div>
			<label className="uk-form-label text-purple" htmlFor="referral">
				Referral{' '}
				<select
					className="uk-select"
					disabled={props.disabled}
					required
					name="referral"
					defaultValue={props.referral}
				>
					{Object.values(Referral).map(referral => (
						<option value={referral} key={referral}>
							{referral}
						</option>
					))}
				</select>
			</label>
			<div className="uk-margin"></div>
			<label className="uk-form-label text-purple" htmlFor="hackathons">
				Hackathons{' '}
				<input
					className="uk-input"
					disabled={props.disabled}
					required
					min="0"
					name="hackathons"
					type="number"
					defaultValue={`${props.hackathons}`}
				/>
			</label>
			<div className="uk-margin"></div>
			<label className="uk-form-label text-purple" htmlFor="shirtSize">
				Shirt Size{' '}
				<select
					className="uk-select"
					disabled={props.disabled}
					required
					name="shirtSize"
					defaultValue={props.shirtSize}
				>
					{Object.values(ShirtSize).map(shirtSize => (
						<option value={shirtSize} key={shirtSize}>
							{shirtSize}
						</option>
					))}
				</select>
			</label>
			<div className="uk-margin"></div>
			<label className="uk-form-label text-purple" htmlFor="dietaryRestrictions">
				Dietary Restrictions{' '}
				<input
					className="uk-input"
					disabled={props.disabled}
					name="dietaryRestrictions"
					defaultValue={props.dietaryRestrictions}
				/>
			</label>
			<div className="uk-margin"></div>
			<label className="uk-form-label text-purple" htmlFor="website">
				Website{' '}
				<input
					className="uk-input"
					disabled={props.disabled}
					name="website"
					type="url"
					defaultValue={props.website}
				/>
			</label>
			<div className="uk-margin"></div>
			<label className="uk-form-label text-purple" htmlFor="answer1">
				Why do you want to attend Hello World?<span style={{ color: 'red' }}>*</span>
				<br />
				<textarea
					className="uk-textarea"
					disabled={props.disabled}
					required
					name="answer1"
					defaultValue={props.answer1}
				/>
			</label>
			<div className="uk-margin"></div>
			<label className="uk-form-label text-purple" htmlFor="answer2">
				What do you hope to learn at Hello World?<span style={{ color: 'red' }}>*</span>
				<br />
				<textarea
					className="uk-textarea"
					disabled={props.disabled}
					required
					name="answer2"
					defaultValue={props.answer2}
				/>
			</label>
			<div className="uk-margin"></div>

			<label className="uk-form-label text-purple" htmlFor="resume">
				{props.admin && props.resume && (
					<>
						<a href={props.resume} rel="noopener noreferrer" target="_blank">
							View Here{' '}
						</a>
						<br />
					</>
				)}
				Resume (.pdf file):{props.resume && <> &#9989;</>}{' '}
				<input className="" type="file" name="resume" accept="application/pdf" />
			</label>
			<br />
			<br />
			<input className="uk-button-apply" type="submit" value="Submit" />
		</form>
	);
};
