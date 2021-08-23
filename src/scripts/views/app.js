import routes from '../routes';
import UrlParser from '../routes/urlParser';
import DrawerInitiator from '../utils/drawerInitiator';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initAppShell();
  }

  _initAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    if (this._content.hasChildNodes()) {
      this._content.innerHTML = '';
      this._content.appendChild(await page);
    } else {
      this._content.appendChild(await page);
    }
  }
}

export default App;
