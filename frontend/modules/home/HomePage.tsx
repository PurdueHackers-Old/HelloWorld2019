import React from 'react';
import Link from 'next/link';
import { Cover } from './Cover';
import { ApplyBanner } from './ApplyBanner';
import { Schedule } from './Schedule';
import { Faq } from './Faq';
import { Sponsors } from './Sponsors';

export const HomePage = () => {
	return (
		<>
			<Cover />
			<ApplyBanner />
			<Schedule />
			<Faq />
			<Sponsors />
		</>
	);
};
