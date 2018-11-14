"use strict";
var cacheStorageKey = 'helloworld';
var cacheList = [
  './public/image/figur.jpg'
];
self.addEventListener('install', event => {
  console.log('Cache event!');
  event.waitUntil(
    caches.open(cacheStorageKey).then(function(cache) {
      console.log('Adding to Cache:', cacheList)
      return cache.addAll(cacheList)
    }).then(function() {
      console.log('install event open cache ' + cacheStorageKey);
      console.log('Skip waiting!')
      return self.skipWaiting();
    })
  )
});
self.addEventListener('activate', function(e) {
  console.log('Activate event');
  console.log('Promise all', Promise, Promise.all);
  // active事件中通常做一些过期资源释放的工作
  var cacheDeletePromises = caches.keys().then(cacheNames => {
    console.log('cacheNames', cacheNames, cacheNames.map);
    return Promise.all(cacheNames.map(name => {
      if (name !== cacheStorageKey) { // 如果资要缓存的key不同则源的key与当前需释放资源
        console.log('caches.delete', caches.delete);
        var deletePromise = caches.delete(name);
        console.log('cache delete result: ', deletePromise);
        return deletePromise;
      } else {
        return Promise.resolve();
      }
    }));
  });

  console.log('cacheDeletePromises: ', cacheDeletePromises);
  e.waitUntil(
    Promise.all([cacheDeletePromises]
    ).then(() => {
      console.log('activate event ' + cacheStorageKey);
      console.log('Clients claims.')
      return self.clients.claim();
    })
  )
})
// Listen to fetch events
self.addEventListener('fetch', function (event) {

    // Check if the image is a jpeg
    if (/\.jpg$|.png$/.test(event.request.url)) {

        // Inspect the accept header for WebP support
        var supportsWebp = false;
        console.log(event.request, 111);
        console.log('测试');
        if (event.request.headers.has('accept')) {
            supportsWebp = event.request.headers
                .get('accept')
                .includes('webp');
        }

        // If we support WebP
        if (supportsWebp) {
            // Clone the request
            var req = event.request.clone();
            // Build the return URL
            var returnUrl = req.url.substr(0, req.url.lastIndexOf(".")) + ".webp";
            event.respondWith(
                fetch(returnUrl, {
                    mode: 'no-cors'
                })
            );
        }
    }
});
