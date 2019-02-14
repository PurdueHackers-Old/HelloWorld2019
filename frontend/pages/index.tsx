import React from 'react';
import Link from 'next/link';
import * as flash from '../utils/flash';

const Index = props => {
	return (
		<div>
			Home Page
			<br />
			<Link href="/apply">
				<button>Apply</button>
			</Link>
		</div>
	);
};

Index.getInitialProps = ctx => {
	return {};
};

export default Index;
