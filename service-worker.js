"use strict";
self.addEventListener('fetch', function(event) {
    if (/(png|jpg)$/i.test(event.request.url)) {
        console.log(event.request);
        event.respondWith(
            new Response('<p>hehhehhehehehehehe</p>', {
                headers: {'Content-Type': 'text/html'}
            })
        )
    }
})