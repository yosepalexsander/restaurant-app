const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    return console.log('Browser does not support Service Worker');
  }

  try {
    await navigator.serviceWorker.register('/serviceWorker.js');
    return console.log('Service Worker registered');
  } catch (error) {
    return console.log('Failed to register service worker: \n', error);
  }
};

export default swRegister;
