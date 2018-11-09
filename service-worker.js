"use strict";

self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    // caching etc
  );
});
// Listen to fetch events
self.addEventListener('fetch', function (event) {

    // Check if the image is a jpeg
    if (/\.jpg$|.png$/.test(event.request.url)) {

        // Inspect the accept header for WebP support
        var supportsWebp = false;
        console.log(event.request, 111);
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
            console.log(returnUrl, 1111);
            event.respondWith(
                fetch(returnUrl, {
                    mode: 'no-cors'
                })
            );
        }
    }
});
