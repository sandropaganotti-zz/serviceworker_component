'use strict';

var cacheName,
    urlsToCache;

importScripts('/node_modules/serviceworker-cache-polyfill/index.js');

self.addEventListener('message', function (evt) {
    cacheName = evt.data.cacheName;
    urlsToCache = evt.data.urlsToCache;
});

self.addEventListener('install', function(event) {
    setTimeout(function(){
        event.waitUntil(
            caches.open(cacheName)
            .then(function(cache) {
                console.log('Opened cache:', cache);
                return cache.addAll(urlsToCache);
            })
        );
    }, 2000);

});

self.addEventListener('activate', function(event) {
    // var cacheWhitelist = [];
    //
    // event.waitUntil(
    //     caches.keys().then(function(cacheNames) {
    //         return Promise.all(
    //             cacheNames.map(function(cacheName) {
    //                 if (cacheWhitelist.indexOf(cacheName) === -1) {
    //                     console.log('Just deleted deprecated cache.');
    //                     return caches.delete(cacheName);
    //                 }
    //             })
    //         );
    //     })
    // );
});

self.addEventListener('fetch', function(event) {

    console.log("Caught a fetch! Take a look: " +event.request.url);
    //
    // event.respondWith(
    //     caches.match(event.request)
    //     .then(function(response) {
    //         // Cache hit - return response
    //         if (response) {
    //             console.log("We had this file cached, take it: " +response);
    //             return response;
    //         }
    //
    //         // IMPORTANT: Clone the request. A request is a stream and
    //         // can only be consumed once. Since we are consuming this
    //         // once by cache and once by the browser for fetch, we need
    //         // to clone the response
    //         var fetchRequest = event.request.clone();
    //
    //         return fetch(fetchRequest).then(
    //             function(response) {
    //                 // Check if we received a valid response
    //                 if(!response || response.status !== 200 || response.type !== 'basic') {
    //                     return response;
    //                 }
    //
    //                 // IMPORTANT: Clone the response. A response is a stream
    //                 // and because we want the browser to consume the response
    //                 // as well as the cache consuming the response, we need
    //                 // to clone it so we have 2 stream.
    //                 var responseToCache = response.clone();
    //
    //                 caches.open(cacheName)
    //                 .then(function(cache) {
    //                     console.log("We didn't have this file in the cache, so had to make a request, but we cached it now: " +responseToCache);
    //                     cache.put(event.request, responseToCache);
    //                 });
    //
    //                 return response;
    //             }
    //         );
    //     })
    // );
});
