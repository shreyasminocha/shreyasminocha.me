const version = '0.0.0';
const cacheName = `shreyasminocha.me-${version}`;

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache
                .addAll([
                    '/',
                    '/css/normalize.css',
                    '/css/style.css',
                    '/css/fonts.css',
                    '/css/syntax.css',
                    '/fonts/charter.woff',
                    '/fonts/charter-bold.woff',
                    '/fonts/charter-italic.woff',
                    '/fonts/charter-bold-italic.woff',
                    '/fonts/fira-code.woff',
                ])
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open(cacheName)
            .then(cache => cache.match(event.request, { ignoreSearch: true }))
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
