self.__precacheManifest = [
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/_app.js",
    "revision": "6f74350f40b3c7f98f39"
  },
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/_error.js",
    "revision": "d7f4771d007078ae19bf"
  },
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/admin.js",
    "revision": "222ec8ffd03a0e8aa8b6"
  },
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/admin/roles.js",
    "revision": "891f2660c89a19ae4305"
  },
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/announcements.js",
    "revision": "e7496b7761335ad20698"
  },
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/announcements/manage.js",
    "revision": "7059a1bc1ba3aab86aad"
  },
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/announcements/new.js",
    "revision": "e0935c9135cbc3ae3603"
  },
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/application.js",
    "revision": "fc6c7897dd8ef546c21c"
  },
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/applications.js",
    "revision": "54bce0ce1e3a23c1ec18"
  },
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/apply.js",
    "revision": "73c7c3f5a5a8aacce3fb"
  },
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/checkin.js",
    "revision": "2daa1c1c7eafe32bddcd"
  },
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/checkin/scan.js",
    "revision": "cd93861e144dfe665d33"
  },
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/dashboard.js",
    "revision": "ba7178f0454f33975016"
  },
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/forgot.js",
    "revision": "75ec8286c54ce78575f5"
  },
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/index.js",
    "revision": "714efa76bd110fa07145"
  },
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/login.js",
    "revision": "99c6ebca1a026192ac77"
  },
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/logout.js",
    "revision": "5d25114e91777d4484a9"
  },
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/profile.js",
    "revision": "7c62937ee904014b565b"
  },
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/reset.js",
    "revision": "2561c90f95c3a5165a3d"
  },
  {
    "url": "/_next/static/YRNUjGFXOOhS4DskFuS4i/pages/signup.js",
    "revision": "a1f5cea6cebef19488af"
  },
  {
    "url": "/_next/static/chunks/24.f47d2ff9ac3bf8761d2a.js",
    "revision": "e6b5848fc04416e9882d"
  },
  {
    "url": "/_next/static/chunks/25.1ee5b1eb69cb36448183.js",
    "revision": "3cc98c4c572940e8ccf8"
  },
  {
    "url": "/_next/static/chunks/commons.1a95897a22875a661caf.js",
    "revision": "e4dd201053b1455c592d"
  },
  {
    "url": "/_next/static/chunks/styles.2e1fd43ecceb6d709ce9.js",
    "revision": "ddfe7b3607702120ff85"
  },
  {
    "url": "/_next/static/css/styles.c964809e.chunk.css",
    "revision": "ddfe7b3607702120ff85"
  },
  {
    "url": "/_next/static/runtime/main-f9e5fb02d7a5c8f664ce.js",
    "revision": "280e82dc32ce1e4739d7"
  },
  {
    "url": "/_next/static/runtime/webpack-ddd1cb50656631b6da3a.js",
    "revision": "f0799ed7603c88114405"
  }
];

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

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

/** @type {ServiceWorkerGlobalScope} */
const _self = self;

/**
 * EVENT LISTENERS
 */
// This will be called only once when the service worker is installed for first time.
_self.addEventListener('install', event => {
	console.log('[Service Worker]: Installing service worker');
	const promiseChain = createSubscription()
		.then(subscription => saveSubscription(subscription))
		.then(() => console.log('[Service Worker]: Successfully installed service worker'))
		.catch(err => {
			console.error('[Service Worker]: Error creating subscription:', err.message);
			return self.skipWaiting();
		});

	event.waitUntil(promiseChain);
});

_self.addEventListener('push', event => {
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

_self.addEventListener('notificationclick', event => {
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

/**
 * Workbox Caching
 */

/** @param _workbox {typeof import('workbox-sw')} */
const initializeWorkboxCaching = _workbox => {
	_self.__precacheManifest = [].concat(_self.__precacheManifest || []);
	_workbox.precaching.precacheAndRoute(_self.__precacheManifest, {});

	_workbox.routing.registerRoute(
		/^https?.*/,
		new _workbox.strategies.NetworkFirst({
			cacheName: 'https-calls',
			networkTimeoutSeconds: 15,
			plugins: [
				new _workbox.expiration.Plugin({
					maxEntries: 150,
					maxAgeSeconds: 2592000,
					purgeOnQuotaError: false
				}),
				new _workbox.cacheableResponse.Plugin({ statuses: [0, 200] })
			]
		}),
		'GET'
	);

	_workbox.routing.registerRoute(
		/api/,
		new _workbox.strategies.NetworkFirst({
			plugins: [new _workbox.cacheableResponse.Plugin({ statuses: [0, 200] })]
		}),
		'GET'
	);

	_workbox.googleAnalytics.initialize();
};

try {
	if (workbox) {
		initializeWorkboxCaching(workbox);
	}
} catch (error) {
	console.error('Error configuring workbox caching:', error);
}

