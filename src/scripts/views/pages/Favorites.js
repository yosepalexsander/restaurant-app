class Favorites extends HTMLElement {
  constructor() {
    super();
    this.render = this.render.bind(this);
  }
  // disconnectedCallback() {

  // }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <h2>Your favorites restaurant</h2>
    <div class="restaurants"></div>
    `;
  }
}

customElements.define('list-favorites', Favorites);
