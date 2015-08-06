'use strict';

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(match){
            return match || fetch(event.request); 
        })
    );
});
