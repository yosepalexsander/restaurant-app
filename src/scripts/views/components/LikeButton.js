/* eslint-disable class-methods-use-this */
// import this._favoriteRestaurantDB from '../../data/database';

export default class LikeFAB extends HTMLElement {
  constructor(favoriteRestaurantDB) {
    super();
    this._restaurant = null;
    this._favoriteRestaurantDB = favoriteRestaurantDB;
    this.render = this.render.bind(this);
    this._addToFavorites = this._addToFavorites.bind(this);
    this._deleteFromFavorites = this._deleteFromFavorites.bind(this);
  }

  static get observedAttributes() {
    return ['liked', 'data'];
  }

  get liked() {
    return JSON.parse(this.getAttribute('liked'));
  }

  set liked(value) {
    return (this.setAttribute('liked', JSON.stringify(value)));
  }

  get data() {
    return this._restaurant;
  }

  set data(newVal) {
    this._restaurant = newVal;
  }

  async _isRestaurantFavorites(id) {
    try {
      const restaurant = await this._favoriteRestaurantDB.getRestaurant(id);
      return !!restaurant;
    } catch (error) {
      return false;
    }
  }

  async connectedCallback() {
    const id = this.getAttribute('restaurant-id');
    if (await this._isRestaurantFavorites(id)) {
      this.liked = true;
    } else {
      this.liked = false;
    }
    this.render();
  }

  async _addToFavorites() {
    try {
      await this._favoriteRestaurantDB.putRestaurant(this._restaurant);
      this.liked = true;
    } catch (error) {
      console.error(error);
    }
  }

  async _deleteFromFavorites() {
    try {
      await this._favoriteRestaurantDB.deleteRestaurant(this._restaurant.id);
      this.liked = false;
    } catch (error) {
      console.error('error', error);
    }
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <button aria-label="${this.liked ? 'unlike this restaurant' : 'like this restaurant'}" id="${this.liked ? 'likedFAB' : 'likeFAB'}" class="btn btn__like ripple">
      <i class="${this.liked ? 'fa fa-heart' : 'fa fa-heart-o'}" aria-hidden="true"></i>
    </button>
    `;

    this.querySelector('button').addEventListener('click', async (e) => {
      if (e.target.id === 'likeFAB') {
        await this._addToFavorites();
      } else {
        await this._deleteFromFavorites();
      }
    });
  }
}

customElements.define('like-fab', LikeFAB);
