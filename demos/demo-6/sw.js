// service worker version number
const SW_VERSION = 1;
// the root name for our cache
const CACHE_ROOT = 'pwa-starter-cache'
// generates a custom cache name per service worker version
const CACHE_NAME = `${CACHE_ROOT}-v${SW_VERSION}`;

self.addEventListener('install', event => {
  console.log(`Event fired: ${event.type}`);
  console.dir(event);
});

self.addEventListener('activate', event => {
  // fires after the service worker completes its installation. 
  // It's a place for the service worker to clean up from previous 
  // service worker versions
  console.log(`SW: ${event.type} event fired`);
  // Don't complete the activation until all the code runs
  event.waitUntil(
    // Get the list of cache keys (cache names)
    caches.keys().then(cacheList => {
      // don't stop until all complete
      return Promise.all(
        cacheList.map(theCache => {
          // is the cache key different than the 
          // current cache name and has the same root?
          if ((CACHE_NAME !== theCache) && (theCache.startsWith(CACHE_ROOT))) {
            // Yes? Then delete it. 
            console.log(`SW: deleting cache ${theCache}`);
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
    // try to get the file from the network
    fetch(event.request)
      // whew, we got it
      .then(response => {
        // Do we have a valid response?
        if (response && response.status == 200) {
          // clone the response; it's a stream, so we can't
          // write it to the cache and return it as well
          let responseClone = response.clone();
          // Try to open the cache
          caches.open(CACHE_NAME)
            // If we successfully opened the cache
            .then(function (cache) {
              console.log(`SW: Adding ${event.request.url} to the cache`);
              // then write our cloned response to the cache
              cache.put(event.request, responseClone);
            });
          // return the original response
          return response;
        } else {
          // return whatever error response we got from the server
          return response;
        }
      })  //then
      .catch(() => {
        // rats, network resources not available
        // do we have it in the cache?
        console.log(`SW: Trying Cache ${event.request.url}`);
        return caches.match(event.request)
          .then(response => {
            // if it is, then return the cached response
            // object from the cache
            if (response) {
              console.log(`SW: Return Cache ${event.request.url}`);
              return response;
            }
          })
      })  // catch
  );
});