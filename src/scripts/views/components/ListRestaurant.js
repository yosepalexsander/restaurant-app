/* eslint-disable indent */
import CONFIG from '../../globals/config';
import RestaurantSource from '../../data/restaurantSource';

class ListRestaurant extends HTMLElement {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this._restaurants = null;
  }
  // disconnectedCallback() {

  // }

  async connectedCallback() {
    this._restaurants = await RestaurantSource.getRestaurants();
    await this.render();
  }

  async render() {
    this.innerHTML = `
    <section id="restaurantsSection">
    ${this.loading ? ('<p>loading</p>')
    : (`
      <div class="restaurants">
      ${this._restaurants.map((restaurant) => `
          <article id="restaurant-item" class="card">
            <div class="card__image">
              <img id="restaurant-item-thumbnail" src=${CONFIG.BASE_MEDUM_IMAGE_URL + restaurant.pictureId} alt=${restaurant.name}/>
              <span class="card__label">${restaurant.city}</span>
            </div>
            <div id="restaurant-item-content" class="card__content">
              <p class="card__header">
              ${!Number.isInteger(restaurant.rating) ? (`
                ${'<i class="fa fa-star icon-gold" aria hidden="true"></i>'.repeat(Math.floor(restaurant.rating))}<i class="fa fa-star-half icon-gold" aria hidden="true"></i>`
                ) : (`${'<i class="fa fa-star icon-gold" aria hidden="true"></i>'.repeat(Math.floor(restaurant.rating))}`
              )}
              ${restaurant.rating}
              </p>
              <p class="card__title">${restaurant.name}</p>
              <p class="card__description">${restaurant.description}</p>
            </div>
          </article>
          `)
        .join('')}
      </div>
      `
    )}
    </section>
    `;
  }
}

customElements.define('list-restaurant', ListRestaurant);
