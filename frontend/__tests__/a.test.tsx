/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import A from '../pages/a';

describe('A Page', () => {
	it('renders the a page with correct text', () => {
		const wrapper = shallow(<A />);
		expect(wrapper.text()).toEqual('a');
	});
});
