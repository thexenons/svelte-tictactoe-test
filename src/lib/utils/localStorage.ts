import { browser } from '$app/environment';

export const getLocalStorageValue = (key: string) => {
	if (!browser) return '';

	return localStorage.getItem(key);
};

export const setLocalStorageValue = (key: string, value: string) => {
	if (!browser) return;

	localStorage.setItem(key, value);
};
