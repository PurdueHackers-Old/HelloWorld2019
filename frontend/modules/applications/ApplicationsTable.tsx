import React from 'react';
import Table, { RowInfo } from 'react-table';
import { IApplication } from '../../@types';
import { columns } from './columns';
import 'react-table/react-table.css';

type Props = {
	applications: IApplication[];
	pagination: { pageSize: number; page: number; pages: number };
	loading: boolean;
	filtered: any[];
	onClick: (rowInfo: RowInfo, column: any) => () => void;
	onFetchData: (state: any, instance: any) => void;
	onFilter: (filtered: any) => void;
};

export const ApplicationsTable = ({
	applications,
	pagination,
	loading,
	filtered,
	onClick,
	onFetchData,
	onFilter
}: Props) => {
	return (
		<Table
			data={applications}
			pages={pagination.pages}
			loading={loading}
			noDataText={!loading ? 'No rows found' : ''}
			columns={columns}
			manual
			filtered={filtered}
			onFilteredChange={onFilter}
			filterable
			onFetchData={onFetchData}
			getTdProps={(state, rowInfo, column) => {
				return {
					onClick: onClick(rowInfo, column),
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
};
