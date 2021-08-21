export default async function swRegister() {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('/serviceWorker.js');
    console.log('Registration success');
  } else {
    console.log('sw not supported');
  }
}
