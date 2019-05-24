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
	onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	onSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	onSubmit?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const ApplicationForm = (props: Props) => {
	return (
		<form onSubmit={props.onSubmit} ref={props.formRef}>
			<label>Name: {props.user.name}</label>
			<br />
			<label>Email: {props.user.email}</label>
			<br />
			<br />
			<label htmlFor="gender">
				Gender{' '}
				<select
					disabled={props.disabled}
					required
					name="gender"
					onChange={props.onSelect}
					value={props.gender}
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
					disabled={props.disabled}
					required
					name="ethnicity"
					onChange={props.onSelect}
					value={props.ethnicity}
				>
					{ethnicities.map(ethnicity => (
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
					disabled={props.disabled}
					required
					name="classYear"
					onChange={props.onSelect}
					value={props.classYear}
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
					disabled={props.disabled}
					required
					name="graduationYear"
					onChange={props.onSelect}
					value={props.graduationYear}
				>
					{gradYears.map(graduationYear => (
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
					disabled={props.disabled}
					required
					name="major"
					onChange={props.onSelect}
					value={props.major}
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
					disabled={props.disabled}
					required
					name="referral"
					onChange={props.onSelect}
					value={props.referral}
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
					disabled={props.disabled}
					required
					min="0"
					name="hackathons"
					type="number"
					onChange={props.onChange}
					value={props.hackathons}
				/>
			</label>
			<br />
			<label htmlFor="shirtSize">
				Shirt Size{' '}
				<select
					disabled={props.disabled}
					required
					name="shirtSize"
					onChange={props.onSelect}
					value={props.shirtSize}
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
					disabled={props.disabled}
					name="dietaryRestrictions"
					onChange={props.onChange}
					value={props.dietaryRestrictions}
				/>
			</label>
			<br />
			<label htmlFor="website">
				Website{' '}
				<input
					disabled={props.disabled}
					name="website"
					type="url"
					onChange={props.onChange}
					value={props.website}
				/>
			</label>
			<br />
			<label htmlFor="answer1">
				Answer 1
				<br />
				<textarea
					disabled={props.disabled}
					required
					name="answer1"
					value={props.answer1}
					onChange={props.onChange}
				/>
			</label>
			<br />
			<label htmlFor="answer2">
				Answer 2
				<br />
				<textarea
					disabled={props.disabled}
					required
					name="answer2"
					value={props.answer2}
					onChange={props.onChange}
				/>
			</label>
			<br />
			<label htmlFor="resume">
				Resume:{' '}
				<input
					type="file"
					name="resume"
					accept="application/pdf"
					onChange={props.onChange}
				/>
			</label>
			<br />
			<br />
			<input type="submit" value="Submit" />
		</form>
	);
};
