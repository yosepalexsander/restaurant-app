class AppBar extends HTMLElement {
  constructor() {
    super();
    this.render = this.render.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <header class="header">
      <h1 class="header__brand">Foodways</h1>
        <button id="menuButton" class="header__menu" aria-label="navigation menu">☰</button>
      <nav id="drawer" class="nav">
        <ul class="nav__list">
          <li class="nav__item"><a href="/" class= "link">Home</a></li>
          <li class="nav__item"><a href="#/favorites" class= "link">Favorite</a></li>
          <li class="nav__item">
            <a
              href="https://linkedin.com/in/yosep-alexsander"
              class= "link"
              target="_blank"
              rel="noopener noreferrer"
              >About Us</a
            >
          </li>
        </ul>
      </nav>
    </header>`;
  }
}

customElements.define('app-bar', AppBar);
