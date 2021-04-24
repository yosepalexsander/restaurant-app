import '../components/LikeButton';

class Detail extends HTMLElement {
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
    <h2>Detail restaurant</h2>
    <like-fab></like-fab>
    `;
  }
}

customElements.define('restaurant-detail', Detail);
