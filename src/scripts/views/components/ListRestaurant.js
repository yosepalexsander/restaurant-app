/* eslint-disable indent */
import FavoriteRestaurant from '../../data/database';
import RestaurantSource from '../../data/restaurantSource';
import CONFIG from '../../globals/config';

class ListRestaurant extends HTMLElement {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this._restaurants = null;
  }

  static get observedAttributes() {
    return ['data', 'isFrom'];
  }

  get loading() {
    return JSON.parse(this.getAttribute('loading'));
  }

  set loading(value) {
    return this.setAttribute('loading', JSON.stringify(value));
  }

  async connectedCallback() {
    this.loading = true;
    console.log(this.getAttribute('isFrom'));
    if (this.getAttribute('isFrom') === 'favorites') {
      this._restaurants = await FavoriteRestaurant.getAllRestaurants();
    } else {
      this._restaurants = await RestaurantSource.getRestaurants();
    }
    this.loading = false;
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (this.loading) {
      this.innerHTML = '<div class="lds-dual-ring"></div>';
    } else {
      this.innerHTML = `
      <section id="restaurantsSection">
        <div class="restaurants">
        ${this._restaurants
          .map(
            (restaurant, index) => `
            <div id="restaurant-item-${index}" class="card">
              <a href="#/detail/${restaurant.id}">
              <div class="card__image">
                <img id="restaurant-item-thumbnail" src=${
                  CONFIG.BASE_MEDUM_IMAGE_URL + restaurant.pictureId
                } alt=${restaurant.name}/>
                <span class="card__label">${restaurant.city}</span>
              </div>
              <div id="restaurant-item-content" class="card__content">
                <p class="card__header">
                ${
                  !Number.isInteger(restaurant.rating)
                    ? `
                  ${'<i class="fa fa-star icon-gold" aria hidden="true"></i>'.repeat(
                    Math.floor(restaurant.rating),
                  )}<i class="fa fa-star-half icon-gold" aria hidden="true"></i>`
                    : `${'<i class="fa fa-star icon-gold" aria hidden="true"></i>'.repeat(
                        Math.floor(restaurant.rating),
                      )}`
                }
                ${restaurant.rating}
                </p>
                <p class="card__title">${restaurant.name}</p>
                <p class="card__description">${restaurant.description}</p>
              </div>
              </a>
            </div>
            `,
          )
          .join('')}
        </div>
      </section>
      `;
    }
  }
}

customElements.define('list-restaurant', ListRestaurant);
