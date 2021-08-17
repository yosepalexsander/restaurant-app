if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('/serviceWorker.js');
      console.log('Registration success');
    } catch (err) {
      console.log('Registration failed', err);
    }
  });
} else {
  console.log('sw not supported');
}
