import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import '../styles/responsive.scss';
import './views/components/AppBar';
import App from './views/app';
import swRegister from './utils/swRegister';

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.getElementById('menuButton'),
  drawer: document.getElementById('drawer'),
  content: document.getElementById('app'),
});

window.addEventListener('hashchange', async () => {
  await app.renderPage();
});

window.addEventListener('load', async () => {
  await app.renderPage();
  await swRegister();
});
