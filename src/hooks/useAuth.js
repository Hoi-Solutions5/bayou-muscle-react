import { useMemo, useState } from 'react';
import { loginUser, logoutUser } from '../services/authService';

const TOKEN_KEY = 'access_token';
const USER_KEY = 'auth_user';

const getStoredToken = () => localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY) || '';

const getStoredUser = () => {
	const rawUser = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
	if (!rawUser) {
		return null;
	}

	try {
		return JSON.parse(rawUser);
	} catch {
		return null;
	}
};

const persistAuth = ({ token, user, rememberMe }) => {
	const primary = rememberMe ? localStorage : sessionStorage;
	const secondary = rememberMe ? sessionStorage : localStorage;

	primary.setItem(TOKEN_KEY, token);
	primary.setItem(USER_KEY, JSON.stringify(user));

	secondary.removeItem(TOKEN_KEY);
	secondary.removeItem(USER_KEY);
};

const clearAuthStorage = () => {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(USER_KEY);
	sessionStorage.removeItem(TOKEN_KEY);
	sessionStorage.removeItem(USER_KEY);
};

export default function useAuth() {
	const [user, setUser] = useState(getStoredUser());
	const [token, setToken] = useState(getStoredToken());
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const isAuthenticated = useMemo(() => Boolean(token), [token]);

	const login = async ({ email, password, rememberMe = true }) => {
		setIsLoading(true);
		setError('');

		try {
			const response = await loginUser({ email, password });
			persistAuth({ token: response.token, user: response.user, rememberMe });
			setToken(response.token);
			setUser(response.user);
			return response;
		} catch (err) {
			const message = err?.message || 'Unable to sign in. Please try again.';
			setError(message);
			throw err;
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async () => {
		setIsLoading(true);
		setError('');

		try {
			await logoutUser();
		} catch (err) {
			// Even if API logout fails, client auth should be cleared.
		} finally {
			clearAuthStorage();
			setToken('');
			setUser(null);
			setError('');
			setIsLoading(false);
		}
	};

	return {
		user,
		token,
		isAuthenticated,
		isLoading,
		error,
		login,
		logout,
	};
}
