if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/worker.js').then(function(reg) {
        caches.open('pages').then(function(pages){
           return pages.add('test.html'); 
        }).then(function(){
           console.log('cached!'); 
        });
    }, function(err) {
        console.log('ಠ_ಠ   Nope.', err);
    });
}
