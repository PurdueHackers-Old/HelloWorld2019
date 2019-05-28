const isSWSupported = () => 'serviceWorker' in navigator && 'PushManager' in window;

export const register = async () => navigator.serviceWorker.register('/sw.js');

const requestNotificationPermission = async () => window.Notification.requestPermission();

export const registerServiceWorker = async () => {
	if (!isSWSupported()) return console.error('Service worker not supported');

	try {
		await register();
		console.log('Service Worker registered');
	} catch (error) {
		return console.error('Service worker registration failed:', error);
	}

	const permission = await requestNotificationPermission();
	if (permission !== 'granted') return console.error('Permission not granted for notifications');
};
