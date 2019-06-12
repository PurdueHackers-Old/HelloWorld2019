//// <reference types="../node_modules/types-serviceworker" />

/**
 * HELPER FUNCTIONS
 */

const parseMessageData = eventData => {
	let data;
	try {
		data = eventData.json();
	} catch (error) {
		data = eventData.text();
	}
	return data;
};

const sendMessageToClient = (client, message) => {
	return new Promise((resolve, reject) => {
		const channel = new MessageChannel();

		channel.port1.onmessage = function(event) {
			if (event.data.error) {
				reject(event.data.error);
			} else {
				resolve(event.data);
			}
		};

		client.postMessage({ message }, [channel.port2]);
	});
};

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
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(subscription)
		});
		return response.json();
	} catch (error) {
		throw error;
	}
};

/**
 * EVENT LISTENERS
 */
// This will be called only once when the service worker is installed for first time.
self.addEventListener('install', async () => {
	console.log('[Service Worker]: Installing service worker');
	try {
		const subscription = await createSubscription();
		await saveSubscription(subscription);
	} catch (err) {
		console.error('[Service Worker]: Error creating subscription:', err.message);
		await self.skipWaiting();
	}
	console.log('[Service Worker]: Successfully installed service worker');
});

self.addEventListener('push', event => {
	if (!event || !event.data) return;
	const promises = [];
	const eventData = parseMessageData(event.data);
	console.log('[Service Worker]: Got event data:', eventData);
	if (eventData.action === 'add') {
		const showNotificationPromise = self.registration
			.showNotification(eventData.announcement.title)
			.catch(error => console.error('[Service Worker]: Error showing notification:', error));
		promises.push(showNotificationPromise);
	}

	const sendMessagePromise = self.clients
		.matchAll()
		.then(clients => clients.map(client => sendMessageToClient(client, eventData)));

	promises.push(sendMessagePromise);
	event.waitUntil(Promise.all(promises));
});

self.addEventListener('notificationclick', event => {
	event.notification.close();

	const urlToOpen = new URL('/announcements', self.location.origin).href;

	const promiseChain = clients
		.matchAll({
			type: 'window',
			includeUncontrolled: true
		})
		.then(windowClients => {
			const matchingClient = windowClients.find(
				windowClient => windowClient.url === urlToOpen
			);

			return matchingClient ? matchingClient.focus() : clients.openWindow(urlToOpen);
		});

	event.waitUntil(promiseChain);
});
