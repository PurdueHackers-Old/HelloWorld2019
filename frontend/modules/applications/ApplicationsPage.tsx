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
		const page = pagination.current;
		const limit = pagination.pageSize;
		const sort = sorter.field;
		const order = sorter.order === 'ascend' ? 1 : -1;
		const params = { page, limit, filter, sort, order };
		this.fetch(params);
	};

	onClick = (record: IApplication) => {
		Router.push(`/application?id=${record._id}`);
	};

	render() {
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
