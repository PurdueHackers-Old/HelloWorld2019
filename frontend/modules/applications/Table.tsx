import React, { Component } from 'react';
import Table, { Column, RowInfo } from 'react-table';
import filter from './filter';
import { IApplication } from '../../@types';
import { Gender, ClassYear, Major, Status } from '../../../shared/app.enums';
import 'react-table/react-table.css';
const columns: Column<IApplication>[] = [
	{
		Header: 'Name',
		accessor: 'name'
	},
	{
		Header: 'Email',
		accessor: 'email'
	},
	{
		Header: 'Gender',
		accessor: 'gender',
		Filter: filter(Object.values(Gender).map(value => ({ text: value, value })))
	},
	{
		Header: 'Year',
		accessor: 'classYear',
		Filter: filter(Object.values(ClassYear).map(value => ({ text: value, value })))
	},
	{
		Header: 'Major',
		accessor: 'major',
		Filter: filter(Object.values(Major).map(value => ({ text: value, value })))
	},
	{
		Header: 'Hackathons',
		accessor: 'hackathons',
		filterable: false
	},
	{
		Header: 'Resume',
		accessor: 'resume',
		filterable: false,
		Cell: ({ value }) => <div>{value ? 'Yes' : 'No'}</div>
	},
	{
		Header: 'Status',
		accessor: 'statusInternal',
		Filter: filter(Object.values(Status).map(value => ({ text: value, value })))
	}
];

type Props = {
	applications: IApplication[];
	pagination: { pageSize: number; page: number; pages: number };
	loading: boolean;
	filtered: any[];
	onClick: (rowInfo: RowInfo) => () => void;
	onFetchData: (state: any, instance: any) => void;
	onFilter: (filtered: any) => void;
};

export class ApplicationsTable extends Component<Props> {
	render() {
		return (
			<Table
				data={this.props.applications}
				pages={this.props.pagination.pages}
				loading={this.props.loading}
				noDataText={!this.props.loading ? 'No rows found' : ''}
				columns={columns}
				manual
				filtered={this.props.filtered}
				onFilteredChange={this.props.onFilter}
				filterable
				onFetchData={this.props.onFetchData}
				getTdProps={(state, rowInfo) => {
					return {
						onClick: this.props.onClick(rowInfo),
						style: {
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							textAlign: 'center'
						}
					};
				}}
			/>
		);
	}
}
