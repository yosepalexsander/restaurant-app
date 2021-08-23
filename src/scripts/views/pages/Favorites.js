import FavoriteRestaurant from '../../data/database';

import '../components/ListRestaurant';

class Favorites extends HTMLElement {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.restaurants = [];
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
    try {
      this.restaurants = await FavoriteRestaurant.getAllRestaurants();
      this.loading = false;
      this.render();
    } catch (error) {
      this.loading = false;
      this.render();
    }
  }

  attributeChangedCallback(_attrName, oldValue, newValue) {
    if (newValue !== oldValue) {
      this.render();
    }
  }

  render() {
    if (this.restaurants.length > 0) {
      this.innerHTML = `
      <section id="favoriteRestaurant" class="content">
        <h2>Your favorites restaurant</h2>
        <list-restaurant isFrom="favorites"></list-restaurant>
      </section>
      `;
    } else {
      this.innerHTML = `
      <section id="favoriteRestaurant" class="content">
        <h2>Your favorites restaurant</h2>
        <div class="not__found">
          <p>There are no restaurants to show</p>
          <a href="#/">Back to Home </a>
        </div>
      </section>
      `;
    }
  }
}

customElements.define('favorites-page', Favorites);
