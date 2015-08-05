if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/worker.js').then(function(reg) {
        navigator.serviceWorker.controller.postMessage({
            'hello': 'world',
            cacheName: 'v1',
            urlsToCache: [
                "/index.html"
            ]
        });
    }, function(err) {
        console.log('ಠ_ಠ   Nope.', err);
    });
}
