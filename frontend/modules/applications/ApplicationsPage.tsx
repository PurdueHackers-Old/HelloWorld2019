import React, { Component } from 'react';
import Router from 'next/router';
import { sendErrorMessage, getApplications } from '../../redux/actions';
import { IContext, IApplication } from '../../@types';
import { redirectIfNotAuthenticated } from '../../utils/session';
import { err } from '../../utils';
import { Role } from '../../../shared/user.enums';
import { ApplicationsTable } from './ApplicationsTable';

type Props = {
	applications: IApplication[];
	pagination: { total: number };
};

export class ApplicationsPage extends Component<Props> {
	static getInitialProps = async (ctx: IContext) => {
		if (redirectIfNotAuthenticated('/', ctx, { roles: [Role.EXEC] })) return {};
		try {
			const applications = await getApplications(ctx);
			return applications;
		} catch (error) {
			sendErrorMessage(err(error), ctx)(ctx.store.dispatch);
			return { applications: [], pagination: { total: 0 } };
		}
	};

	state = {
		applications: this.props.applications,
		pagination: { ...this.props.pagination, showSizeChanger: true },
		loading: false
	};

	fetch = async params => {
		try {
			this.setState({ loading: true });
			const response = await getApplications(null, params);
			response.pagination.showSizeChanger = true;
			this.setState({ loading: false, ...response });
		} catch (error) {
			this.setState({ loading: false });
		}
	};

	onChange = (pagination, filter, sorter) => {
		// console.log('Pagination:', pagination);
		// console.log('Filters:', filter);
		// console.log('Sorter:', sorter);
		// Pagination: {total: 17, pageSize: 10, current: 1, showSizeChanger: true}
		// Filters: {gender: Array(2), major: Array(2)}
		// Sorter: {column: {…}, order: "ascend", field: "name", columnKey: "name"}

		// sort: string = 'createdAt',
		// filter: any = {},
		// page: number = 1,
		// limit: number = 10,
		// order?: number
		const page = pagination.current;
		const limit = pagination.pageSize;
		const sort = sorter.field;
		const order = sorter.order === 'ascend' ? 1 : -1;
		const params = { page, limit, filter, sort, order };
		this.fetch(params);
	};

	onClick = (record: IApplication) => {
		console.log('Record:', record);
		Router.push(`/application?id=${record._id}`);
	};

	render() {
		console.log('Applications:', this.state);
		return (
			<div>
				Applications Page
				<br />
				<ApplicationsTable
					{...this.state}
					onChange={this.onChange}
					onClick={this.onClick}
				/>
			</div>
		);
	}
}
