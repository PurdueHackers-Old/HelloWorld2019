import React, { Component } from 'react';
import { Input, Form } from 'antd';
import { sendErrorMessage, getApplications } from '../../redux/actions';
import { IContext } from '../../@types';
import { redirectIfNotAuthenticated } from '../../utils/session';
import { err } from '../../utils';
import { Role } from '../../../shared/user.enums';
import { ApplicationDto } from '../../../backend/models/application';
import { ApplicationsTable } from './ApplicationsTable';

type Props = {
	applications: ApplicationDto[];
};

export class ApplicationsPage extends Component<Props> {
	static getInitialProps = async (ctx: IContext) => {
		if (redirectIfNotAuthenticated('/', ctx, { roles: [Role.EXEC] })) return {};
		try {
			const applications = await getApplications(ctx);
			return applications;
		} catch (error) {
			sendErrorMessage(err(error), ctx)(ctx.store.dispatch);
			return {};
		}
	};

	state = {
		value: ''
	};

	// handleTableChange = (pagination, filters, sorter) => {
	// 	const pager: any = { ...this.state.pagination };
	// 	pager.current = pagination.current;
	// 	this.setState({
	// 		pagination: pager
	// 	});
	// 	this.fetch({
	// 		results: pagination.pageSize,
	// 		page: pagination.current,
	// 		sortField: sorter.field,
	// 		sortOrder: sorter.order,
	// 		...filters
	// 	});
	// };

	// fetch = (params = {}) => {
	// 	console.log('params:', params);
	// 	this.setState({ loading: true });
	// 	reqwest({
	// 		url: 'https://randomuser.me/api',
	// 		method: 'get',
	// 		data: {
	// 			results: 10,
	// 			...params
	// 		},
	// 		type: 'json'
	// 	}).then(data => {
	// 		const pagination = { ...this.state.pagination };
	// 		// Read total count from server
	// 		// pagination.total = data.totalCount;
	// 		pagination.total = 200;
	// 		this.setState({
	// 			loading: false,
	// 			data: data.results,
	// 			pagination
	// 		});
	// 	});
	// };

	change = e => this.setState({ value: e.target.value });

	submit = () => {
		console.log('State:', this.state);
	};

	render() {
		return (
			<div>
				Applications Page
				<br />
				<Form onSubmit={this.submit}>
					<Input value={this.state.value} onChange={this.change} />
					<Input value="Submit" type="submit" />
				</Form>
				<ApplicationsTable data={this.props.applications} />
			</div>
		);
	}
}
