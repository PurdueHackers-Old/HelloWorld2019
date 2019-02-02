import React from 'react';
import getConfig from 'next/config';
const { publicRuntimeConfig: CONFIG } = getConfig();

export default () => {
	// console.log('Shared Config:', getConfig());
	return <div>This is a banner component!!!!!!</div>;
};
