import React from 'react';
import { Column } from 'react-table';
import { IApplication } from '../../@types';
import filter from './filter';
import { Gender, ClassYear, Major, Status } from '../../../shared/app.enums';
import { StatusSelector } from '../common/StatusSelector';

export const columns: Column<IApplication>[] = [
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
		Cell: props => {
			return <StatusSelector application={props.original} />;
		},
		Filter: filter(Object.values(Status).map(value => ({ text: value, value })))
	}
];
