declare namespace NodeJS {
	interface Process {
		browser: boolean;
	}
}

declare var self: ServiceWorkerGlobalScope;
