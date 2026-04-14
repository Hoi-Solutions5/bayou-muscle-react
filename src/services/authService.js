import apiRequest from './api';

const AUTH_ENDPOINTS = {
	login: '/auth/login',
	logout: '/auth/logout',
};

export const loginUser = async ({ email, password }) => {
	const response = await apiRequest(AUTH_ENDPOINTS.login, {
		method: 'POST',
		data: {
			email,
			password,
		},
	});

	const payload = response?.data || response || {};
	const token = payload?.access_token || '';
	const user = payload?.user || null;

	if (!token || !user) {
		throw {
			status: 500,
			message: 'Invalid login response from server.',
			errors: {},
		};
	}



	return {
		token,
		tokenType: payload?.token_type || 'Bearer',
		user,
		message: response?.message || 'User logged in successfully',
	};
};


export const logoutUser = async () => {
	const response = await apiRequest(AUTH_ENDPOINTS.logout, {
		method: 'POST',
	});
	return response;
};
