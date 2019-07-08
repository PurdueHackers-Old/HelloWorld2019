self.__precacheManifest = [
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/_app.js",
    "revision": "a7b7600aa5fd8ad7b4a1"
  },
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/_error.js",
    "revision": "b71ddcb70716485eeb8d"
  },
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/admin.js",
    "revision": "1ccd75328e3a692e9816"
  },
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/admin/roles.js",
    "revision": "c0d6cb39245fc4ac947a"
  },
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/announcements.js",
    "revision": "a664a008eba58fb86a1e"
  },
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/announcements/manage.js",
    "revision": "bd1135414428f205a8e4"
  },
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/announcements/new.js",
    "revision": "242d20d0b3b65860473f"
  },
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/application.js",
    "revision": "bf7e9f4677cca49d4b76"
  },
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/applications.js",
    "revision": "4cc6701246123f48ae51"
  },
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/apply.js",
    "revision": "b1b5f37d530c7cad0818"
  },
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/checkin.js",
    "revision": "db3f56438f2ca2a0c0d8"
  },
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/checkin/scan.js",
    "revision": "ad0c04a23768aa60dfad"
  },
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/dashboard.js",
    "revision": "48f9dcc90a4af1026ad7"
  },
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/forgot.js",
    "revision": "c6e8fc40ed29ea5ebbd9"
  },
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/index.js",
    "revision": "0a19f4f246d943ef2d4f"
  },
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/login.js",
    "revision": "47a996dcdf8bec5908da"
  },
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/logout.js",
    "revision": "c3ae855aba495e898a43"
  },
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/profile.js",
    "revision": "15eb5da0252f9ef6d2c4"
  },
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/reset.js",
    "revision": "968ab0a2f8e63d17a13c"
  },
  {
    "url": "/_next/static/CmD~6nFpR2_xb0hxeVoji/pages/signup.js",
    "revision": "9fa7632e0f315ff79d7e"
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

