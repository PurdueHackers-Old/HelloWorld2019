import React from 'react';
import Link from 'next/link';

const Index = () => (
	<div>
		Home Page
		<br />
		<Link href="/apply">
			<button>Apply</button>
		</Link>
	</div>
);

export default Index;
