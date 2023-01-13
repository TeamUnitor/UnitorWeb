self.CACHE_NAME = ["cats-v", 14];

var cache_name = self.CACHE_NAME[0] + self.CACHE_NAME[1];

self.addEventListener('fetch', function(event) {
	var cacheRequest = event.request.clone();
	event.respondWith(caches.match(cacheRequest).then(function(response) {
		if(response) return response;
		var fetchRequest = event.request.clone();
		return fetch(fetchRequest).then(function(response) {
			var responseToCache = response.clone();
			caches.open(cache_name).then(function(cache) {
				var cacheSaveRequest = event.request.clone();
				cache.put(cacheSaveRequest, responseToCache);
			});
			return response;
		});
	}));
});

// Now we need to clean up resources in the previous versions
// of Service Worker scripts
self.addEventListener('activate', function(event) {
	var cachesToDelete = [];
	for(var i=0;i<self.CACHE_NAME[1];i++) {
		cachesToDelete.push(self.CACHE_NAME[0] + i);
	}
	console.log(cachesToDelete);
	// Destroy the cache
	event.waitUntil(caches.keys().then(function(cacheNames) {
		return Promise.all(cacheNames.map(function(cacheName) {
			if(cachesToDelete.indexOf(cacheName) !== -1) {
				console.log("destroy:", cacheName);
				return caches.delete(cacheName);
			}
			return Promise.resolve();
		}));
	}));

});