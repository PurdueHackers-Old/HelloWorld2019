import React, { Component } from 'react';
import Router from 'next/router';
import { sendErrorMessage, getApplications } from '../../redux/actions';
import { IContext, IApplication } from '../../@types';
import { redirectIfNotAuthenticated } from '../../utils/session';
import { err } from '../../utils';
import { Role } from '../../../shared/user.enums';
import { ApplicationsTable } from './Table';
import { RowInfo } from 'react-table';

type Props = {
	applications: IApplication[];
	pagination: any;
};

export class ApplicationsPage extends Component<Props> {
	static getInitialProps = async (ctx: IContext) => {
		if (redirectIfNotAuthenticated('/', ctx, { roles: [Role.EXEC] })) return {};
	};

	state = {
		applications: [],
		pagination: { pageSize: 10, page: 1, pages: 1 },
		loading: true
	};

	filtered = [];

	fetch = async params => {
		try {
			this.setState({ loading: true });
			const response = await getApplications(null, params);
			this.setState({ loading: false, ...response });
		} catch (error) {
			this.setState({ loading: false });
		}
	};

	onFetchData = state => {
		const page: number = state.page + 1;
		const limit: number = state.pageSize;
		let sort: string;
		let order: number;
		if (state.sorted[0]) {
			sort = state.sorted[0].id;
			order = state.sorted[0].desc ? -1 : 1;
		}
		const filter = this.filtered
			.filter(val => val.value !== 'all')
			.reduce((prev, curr) => ({ ...prev, [curr.id]: curr.value }), {});
		const params = { page, limit, filter, sort, order };
		this.fetch(params);
	};

	onClick = (rowInfo: RowInfo) => () => {
		if (rowInfo && rowInfo.original) Router.push(`/application?id=${rowInfo.original._id}`);
	};

	onFilter = filtered => (this.filtered = filtered);

	render() {
		return (
			<div>
				Applications Page
				<br />
				<ApplicationsTable
					{...this.state}
					onFetchData={this.onFetchData}
					onClick={this.onClick}
					onFilter={this.onFilter}
					filtered={this.filtered}
				/>
			</div>
		);
	}
}
