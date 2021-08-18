/* eslint-disable no-undef */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');

/* eslint-disable no-restricted-globals */
workbox.setConfig({
  debug: false,
});
if (workbox) {
  console.log('Workbox load successfully');
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
  workbox.routing.registerRoute(
    /^https:\/\/restaurant-api\.dicoding\.dev/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'dicoding-resources-restaurant-api',
    }),
  );

  workbox.routing.registerRoute(
    ({ url }) => url.origin === 'https://fonts.gstatic.com'
                 || url.origin === 'https://fonts.googleapis.com',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'font',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 10,
        }),
      ],
    }),
  );
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'image-cache',
    }),
  );
} else {
  console.log('Workbox load failed');
}
