import React from 'react';
import Link from 'next/link';

export default () => {
	return (
		<div>
			<Link href="/">
				<a>Home</a>
			</Link>{' '}
			|{' '}
			<Link href="/signup">
				<a>Signup</a>
			</Link>
		</div>
	);
};
