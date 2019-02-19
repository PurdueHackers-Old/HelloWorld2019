import React, { Component } from 'react';

import { Table } from 'antd';

const columns = [
	{
		title: 'Name',
		dataIndex: 'user.name'
		// sorter: true
	},
	{
		title: 'Email',
		dataIndex: 'user.email'
	},
	{
		title: 'Gender',
		dataIndex: 'gender'
		// filters: [{ text: 'Male', value: 'Male' }, { text: 'Female', value: 'Female' }]
	}
];

export class ApplicationsTable extends Component {
	state = {
		data: this.props.data || [],
		pagination: {},
		loading: false
	};

	render() {
		return (
			<Table
				columns={columns}
				rowKey={record => record._id}
				dataSource={this.state.data}
				pagination={this.state.pagination}
				loading={this.state.loading}
				// onChange={this.handleTableChange}
			/>
		);
	}
}
