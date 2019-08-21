import React from 'react';
import Link from 'next/link';
import { Banner } from './Banner';
import { ApplyBanner } from './ApplyBanner';
import { Schedule } from './Schedule';
import { Faq } from './Faq';
import { Sponsors } from './Sponsors';

export const HomePage = () => {
	return (
		<>
			<Banner />
			<ApplyBanner />
			<Schedule />
			<Faq />
			<Sponsors />
		</>
	);
};
