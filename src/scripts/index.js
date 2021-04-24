import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import '../styles/responsive.scss';
import App from './app';

const app = new App({
  button: document.getElementById('menuButton'),
  drawer: document.getElementById('drawer'),
  content: document.getElementById('mainContent'),
});

window.addEventListener('hashchange', async () => {
  await app.renderPage();
});

window.addEventListener('load', async () => {
  await app.renderPage();
});
