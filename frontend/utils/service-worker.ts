export const isSWSupported = () =>
	navigator && 'serviceWorker' in navigator && 'PushManager' in window;

const register = async () => navigator.serviceWorker.register('/service-worker.js');

export const requestNotificationPermission = async () => window.Notification.requestPermission();

export const registerServiceWorker = async () => {
	if (!isSWSupported()) throw new Error('Service worker not supported');

	const registration = await register();
	console.log('Service Worker registered');

	return registration;
};
