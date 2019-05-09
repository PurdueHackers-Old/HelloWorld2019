import React, { Component } from 'react';
import Router from 'next/router';
import {
	sendErrorMessage,
	getApplications,
	sendSuccessMessage,
	clearFlashMessages
} from '../../redux/actions';
import { IContext, IApplication } from '../../@types';
import { redirectIfNotAuthenticated } from '../../utils/session';
import { err } from '../../utils';
import { Role } from '../../../shared/user.enums';
import { ApplicationsTable } from './ApplicationsTable';
import { RowInfo } from 'react-table';
import { connect } from 'react-redux';

type Props = {
	applications: IApplication[];
	pagination: any;
	flashError: (msg: string, ctx?: IContext) => void;
	flashSuccess: (msg: string, ctx?: IContext) => void;
	clear: (ctx?: IContext) => void;
};

@((connect as any)(null, {
	flashError: sendErrorMessage,
	flashSuccess: sendSuccessMessage,
	clear: clearFlashMessages
}))
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
		const { flashError, clear } = this.props;
		try {
			clear();
			this.setState({ loading: true });
			const response = await getApplications(null, params);
			console.log(response);

			// // Set the resume field of every application to be yes or no based on wether it's null
			// response.applications.map(application => {
			// 	console.log('Application: ', application);
			// 	if (application.hasOwnProperty('resume')  application.resume !== 'no') {
			// 		application.resume = 'yes';
			// 	} else {
			// 		application.resume = 'no';
			// 	}
			// });

			this.setState({ loading: false, ...response });
		} catch (error) {
			this.setState({ loading: false });
			flashError(err(error));
		}
	};

	onFetchData = state => {
		const page: number = state.page + 1;
		const limit: number = state.pageSize;
		const sort = state.sorted.reduce(
			(prev, curr) => ({ ...prev, [curr.id]: curr.desc ? -1 : 1 }),
			{}
		);
		const filter = this.filtered
			.filter(val => val.value !== 'all')
			.reduce((prev, curr) => ({ ...prev, [curr.id]: curr.value }), {});
		const params = { page, limit, filter, sort };
		this.fetch(params);
	};

	onClick = (rowInfo: RowInfo, column) => () => {
		if (rowInfo && rowInfo.original && column.Header !== 'Status')
			Router.push(`/application?id=${rowInfo.original._id}`);
	};

	onFilter = filtered => (this.filtered = filtered);

	render() {
		return (
			<div>
				<h3>Applications Page</h3>
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
