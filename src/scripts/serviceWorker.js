import CacheHelper from './utils/cacheHelper';

/* eslint-disable no-restricted-globals */
const assetsToCache = [
  '/',
  'favicon.png',
  '/manifest.json',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-144x144.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/app.js',
  '/index.html',
];

self.addEventListener('install', (event) => {
  console.log('Installing service worker....');
  event.waitUntil(
    CacheHelper.cachingAppShell(assetsToCache),
  );
});

self.addEventListener('activate', (event) => {
  console.log('Activating service worker...');
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
