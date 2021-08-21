/* eslint-disable indent */
import FavoriteRestaurant from '../../data/database';
import RestaurantSource from '../../data/restaurantSource';
import CONFIG from '../../globals/config';

class ListRestaurant extends HTMLElement {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this._restaurants = [];
  }

  static get observedAttributes() {
    return ['loading', 'isFrom'];
  }

  get loading() {
    return JSON.parse(this.getAttribute('loading'));
  }

  set loading(value) {
    return this.setAttribute('loading', JSON.stringify(value));
  }

  async connectedCallback() {
    this.loading = true;
    if (this.getAttribute('isFrom') === 'favorites') {
      this._restaurants = await FavoriteRestaurant.getAllRestaurants();
    } else {
      this._restaurants = await RestaurantSource.getRestaurants();
    }
    setTimeout(() => {
      this.loading = false;
    }, 200);
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    if (this.loading) {
      this.innerHTML = `
      <section id="skeleton">
        <div class="restaurants">
          <div class="card">
            <div class="card__image skeleton__wave"></div>
            <div id="restaurant-item-content" class="card__content">
              <span class="card__header skeleton__wave"></span>
              <span class="card__title skeleton__wave"></span>
              <span class="card__text skeleton__wave"></span>
              <span class="card__text skeleton__wave"></span>
              <span class="card__text skeleton__wave"></span>
            </div>
          </div>
          <div class="card">
            <div class="card__image skeleton__wave"></div>
            <div id="restaurant-item-content" class="card__content">
              <span class="card__header skeleton__wave"></span>
              <span class="card__title skeleton__wave"></span>
              <span class="card__text skeleton__wave"></span>
              <span class="card__text skeleton__wave"></span>
              <span class="card__text skeleton__wave"></span>
            </div>
          </div>
          <div class="card">
            <div class="card__image skeleton__wave"></div>
            <div id="restaurant-item-content" class="card__content">
              <span class="card__header skeleton__wave"></span>
              <span class="card__title skeleton__wave"></span>
              <span class="card__text skeleton__wave"></span>
              <span class="card__text skeleton__wave"></span>
              <span class="card__text skeleton__wave"></span>
            </div>
          </div>
        </div>
      </section>
      `;
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
              <picture>
                <source media="(max-width: 600px)" data-srcset="${CONFIG.BASE_SMALL_IMAGE_URL + restaurant.pictureId}" type="image/jpeg">
                <img class="lazyload" data-src="${CONFIG.BASE_MEDUM_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
              </picture>
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
                <p class="card__text">${restaurant.description}</p>
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
