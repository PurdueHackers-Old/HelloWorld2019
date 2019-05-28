// <reference types="../node_modules/types-serviceworker" />

const urlB64ToUint8Array = base64String => {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
	const rawData = atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
};

const getPublicKey = async () => {
	try {
		const data = await fetch('/api/globals/vapid-public-key');
		const { response } = await data.json();
		return response;
	} catch (error) {
		throw error;
	}
};

const createSubscription = async () => {
	const publicKey = await getPublicKey();
	const applicationServerKey = urlB64ToUint8Array(publicKey);
	const subscription = await self.registration.pushManager.subscribe({
		applicationServerKey,
		userVisibleOnly: true
	});
	return subscription;
};

const saveSubscription = async subscription => {
	try {
		const response = await fetch('/api/globals/subscription', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(subscription)
		});
		return response.json();
	} catch (error) {
		throw error;
	}
};

self.addEventListener('install', async () => {
	// This will be called only once when the service worker is installed for first time.
	console.log('Installing service worker');
	try {
		const subscription = await createSubscription();
		await saveSubscription(subscription);
	} catch (err) {
		console.error('Error creating subscription:', err);
		await self.skipWaiting();
	}
	console.log('Successfully installed service worker');
});

self.addEventListener('push', function(event) {
	if (event && event.data) {
		event.waitUntil(self.registration.showNotification(event.data.text()));
	}
});
