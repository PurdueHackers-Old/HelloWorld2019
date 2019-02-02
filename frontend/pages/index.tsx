import React from 'react';
import Link from 'next/link';

const Index = () => (
	<ul>
		<li>
			<Link href="/a" as="/a">
				<a>a</a>
			</Link>
		</li>
		<li>
			<Link href="/b" as="/b">
				<a>b</a>
			</Link>
		</li>
	</ul>
);

export default Index;
