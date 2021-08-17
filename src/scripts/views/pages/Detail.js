/* eslint-disable indent */
import CONFIG from '../../globals/config';
import LikeFAB from '../components/LikeButton';
import FavoriteRestaurant from '../../data/database';
import RestaurantSource from '../../data/restaurantSource';
import UrlParser from '../../routes/urlParser';

class Detail extends HTMLElement {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.restaurant = null;
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

  static async submitReview(value) {
    const data = JSON.stringify(value);
    try {
      const response = await fetch(`${CONFIG.BASE_URL}review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': '12345',
        },
        body: data,
      });
      return response.json();
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async connectedCallback() {
    try {
      this.loading = true;
      const url = UrlParser.parseActiveUrlWithoutCombiner();
      this.restaurant = await RestaurantSource.getRestaurantDetail(url.id);
      this.loading = false;
      this.render();
    } catch (error) {
      console.error(error);
    }
  }

  attributeChangedCallback(attName, oldValue, newValue) {
    if (newValue !== oldValue) {
      this.render();
    }
  }

  render() {
    if (this.loading) {
      this.innerHTML = `
      <section id="restaurantDetail" class="content">
        <div class="lds-dual-ring"></div>
      </section>`;
    } else {
      this.innerHTML = `
      <section id="restaurantDetail" class="content">
        <div class="restaurant">
          <h2 class="restaurant__title">${this.restaurant.name}</h2>
          <img class="lazyload restaurant__image" data-src=${CONFIG.BASE_MEDUM_IMAGE_URL + this.restaurant.pictureId} data-sizes="auto" alt=${this.restaurant.name} />
          <div class="restaurant__info">
              <div class="address">
                <p>Address</p>
                <p>${this.restaurant.address}</p>
              </div>
              <div class="categories">
                <p>Categories</p>
                <p>
                ${this.restaurant.categories.map((item) => (item.name)).join(', ')}
                </p>
              </div>
              <div class="rating">
                <p>Rating</p>
                <p>${this.restaurant.rating}</p>
              </div>
            </div>
          </div>
        </div>
        <form class="review__form">
        <fieldset>
          <legend>What do you think about this restaurant?</legend>
          <input id="inputName" class="input-field" name="name" placeholder="Your name">
          <textarea id="inputReview" class="input-field" name="review" cols="21" rows="3" placeholder="Your thought"></textarea>
          <input class="btn btn__submit" type="submit" value="Submit">
        </fieldset>
        </form>
        <div class="review">
          ${this.restaurant.customerReviews.map((item, index) => (
            `
            <div id="review__${index}"class="review__item">
              <p class="review__date">${item.date}</p>
              <h3 class="review__name">${item.name}</h3>
              <p class="review__desc">${item.review}</p>
            </div>
            `
          )).join('')}
        </div>
      </section>
      `;
      const likeFab = new LikeFAB(FavoriteRestaurant);
      likeFab.setAttribute('restaurant-id', this.restaurant.id);
      likeFab.data = this.restaurant;

      this.appendChild(likeFab);

      const formData = this.querySelector('.review__form');
      formData.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = this.querySelector('#inputName').value;
        const review = this.querySelector('#inputReview').value;
        const data = {
          id: Math.floor(Math.random() * 100).toString(),
          name,
          review,
        };
        const response = await Detail.submitReview(data);
        if (response.message === 'success') {
          this.restaurant.customerReviews = response.customerReviews;
          this.render();
        }
      });
    }
  }
}

customElements.define('restaurant-detail', Detail);
