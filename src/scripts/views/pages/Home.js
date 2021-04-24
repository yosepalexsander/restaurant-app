import '../components/ListRestaurant';

class Home extends HTMLElement {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.loading = true;
  }

  async connectedCallback() {
    return this.render();
  }

  render() {
    this.innerHTML = `
    <h2>Hunger...</h2>
    <p class="content__label">Explore Restaurant</p>
    <list-restaurant></list-restaurant>
    `;
  }
}

customElements.define('home-page', Home);
