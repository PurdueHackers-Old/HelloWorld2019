import React, { Component } from 'react';
import { Table, Pagination, Icon, Tag } from 'antd';
import { IApplication } from '../../@types';
import { Gender, ClassYear, Major, Status } from '../../../shared/app.enums';
import { ColumnProps } from 'antd/lib/table/interface';

const columns: ColumnProps<IApplication>[] = [
	{
		title: 'Name',
		dataIndex: 'name',
		sorter: true
	},
	{
		title: 'Email',
		dataIndex: 'email',
		sorter: true
	},
	{
		title: 'Gender',
		dataIndex: 'gender',
		sorter: true,
		filters: Object.values(Gender).map(value => ({ text: value, value }))
	},
	{
		title: 'Year',
		dataIndex: 'classYear',
		sorter: true,
		filters: Object.values(ClassYear).map(value => ({ text: value, value }))
	},
	{
		title: 'Major',
		dataIndex: 'major',
		sorter: true,
		filters: Object.values(Major).map(value => ({ text: value, value }))
	},
	{
		title: 'Hackathons',
		dataIndex: 'hackathons',
		sorter: true
	},
	{
		title: 'Resume',
		dataIndex: 'resume',
		sorter: true,
		render: (_, record) =>
			record.resume ? (
				<Tag color="green">
					<Icon type="check-circle" />
				</Tag>
			) : (
				<Tag color="red">
					<Icon type="close-circle" />
				</Tag>
			)
	},
	{
		title: 'Status',
		dataIndex: 'statusInternal',
		sorter: true,
		filters: Object.values(Status).map(value => ({ text: value, value }))
	}
];

type Props = {
	applications: IApplication[];
	pagination: {
		total: number;
	};
	loading: boolean;
	onChange: (pagination: any, filters: any, sorter: any) => void;
	onClick: (record: IApplication) => any;
};

export class ApplicationsTable extends Component<Props> {
	render() {
		return (
			<Table
				columns={columns}
				rowKey={record => record._id}
				dataSource={this.props.applications}
				pagination={this.props.pagination}
				loading={this.props.loading}
				onChange={this.props.onChange}
				onRow={record => {
					return {
						onClick: () => {
							this.props.onClick(record);
						}
					};
				}}
			/>
		);
	}
}
