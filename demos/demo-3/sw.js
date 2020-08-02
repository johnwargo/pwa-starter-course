// service worker version number
const SW_VERSION = 1;
// generates a custom cache name per service worker version
const CACHE_NAME = `pwa-learn-cache-v${SW - VERSION}`;

var urlList = [
    '/',
    '/index.html',
    '/css/main.css',
    '/css/normalize.css',
    '/img/tip-200.png',
    '/img/tip-1200.png',
    '/js/index.js',
];

self.addEventListener('install', event => {
    console.log(`Event fired: ${event.type}`);
    console.dir(event);
    // The service worker is installing, so it's our chance
    // to setup the app. In this case, we're telling
    // the browser to wait until we've populated the cache
    // before considering this service worker installed
    event.waitUntil(
        // create a local cache for our app resources
        caches.open(CACHE_NAME)
            // Once it's open...
            .then(cache => {
                console.log('SW: Cache opened');
                // Cache all the resources from the array
                return cache.addAll(urlList);
            })
            .catch(error => {
                console.error(error);
            })
    );
});

self.addEventListener('activate', event => {
    // fires after the service worker completes its installation.
    // It's a place for the service worker to clean up from 
    // previous service worker versions
    console.log(`SW: ${event.type} event fired`);
    // Don't complete the activation until all the code runs
    event.waitUntil(
        // Get the list of cache keys (cache names)
        caches.keys().then(cacheList => {
            // don't stop until all complete
            return Promise.all(
                cacheList.map(theCache => {
                    // is the cache key different than the
                    // current cache name?
                    if (CACHE_NAME !== theCache) {
                        // Yes? Then delete it. 
                        return caches.delete(theCache);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', event => {
    console.log(`SW: ${event.type} ${event.request.url}`);
    // Fires whenever the app requests a resource (file or data)
    event.respondWith(
        // check to see if it's in the cache
        caches.match(event.request)
            .then(response => {
                // if it is, then return the cached response
                // object from the cache
                if (response) {
                    console.log(`SW: Return Cache ${event.request.url}`);
                    return response;
                }
                // otherwise, tell the browser to go get the
                // resource from the network
                console.log(`SW: Return Network ${event.request.url}`);
                return fetch(event.request);
            })
    );
});
