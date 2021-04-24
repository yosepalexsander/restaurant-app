import FavoriteRestaurant from '../../data/database';

class LikeFAB extends HTMLElement {
  constructor() {
    super();
    this.liked = this.liked.bind(this);
    this.render = this.render.bind(this);
  }

  connectedCallback() {
    this.render();
  }

  set liked(isLiked) {
    this._liked = isLiked;
  }

  async _addToFavorites() {
    await FavoriteRestaurant.addRestaurant(this._movie.id);
    this._liked = false;
  }

  async _deleteFromFavorites() {
    await FavoriteRestaurant.deleteRestaurant(this._movie.id);
    this._liked = false;
  }

  render() {
    this.innerHTML = `
    <button aria-label="unlike this restaurant" id=${this._liked ? 'likedFAB' : 'likeFAB'} class="like">
    <i class=${this._liked ? 'fa fa-heart' : 'fa fa-heart-o'} aria hidden="true"></i>
  </button>
    `;

    this.querySelector('#likedFAB').addEventListener('click', this._deleteFromFavorites);
    this.querySelector('#likeFAB').addEventListener('click', this._addToFavorites);
  }
}

customElements.define('like-fab', LikeFAB);
