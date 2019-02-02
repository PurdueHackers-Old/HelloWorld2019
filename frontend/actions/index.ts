import axios from 'axios';
import getConfig from 'next/config';
import { ICreateUser } from '../@types';
const { publicRuntimeConfig: CONFIG } = getConfig();

const api = axios.create({
	baseURL: CONFIG.API_URL
});

export const createUser = async (body: ICreateUser) => {
	try {
		const {
			data: { response }
		} = await api.post('/auth/signup', body);
		return response;
	} catch (error) {
		console.error('Error creating user');
		throw error;
	}
};
