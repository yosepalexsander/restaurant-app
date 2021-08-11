import FavoriteRestaurant from '../../data/database';

import '../components/ListRestaurant';

class Favorites extends HTMLElement {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.restaurants = null;
  }

  static get observedAttributes() {
    return ['loading'];
  }

  get loading() {
    return JSON.parse(this.getAttribute('loading'));
  }

  set loading(value) {
    return this.setAttribute('loading', JSON.stringify(value));
  }

  async connectedCallback() {
    this.restaurants = await FavoriteRestaurant.getAllRestaurants();
    console.log(this.restaurants);
    this.render();
  }

  render() {
    this.innerHTML = `
    <section id="favoriteRestaurant" class="content">
      <h2>Your favorites restaurant</h2>
      <list-restaurant isFrom="favorites"></list-restaurant>
    </section>
    `;

    this.querySelector('list-restaurant').data = this.restaurants;
  }
}

customElements.define('favorites-page', Favorites);
