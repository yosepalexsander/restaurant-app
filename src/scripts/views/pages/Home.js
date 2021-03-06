import '../components/ListRestaurant';

class Home extends HTMLElement {
  constructor() {
    super();
    this.render = this.render.bind(this);
  }

  async connectedCallback() {
    await this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  async render() {
    this.innerHTML = `
    <section class="hero">
      <picture>
        <source media="(max-width: 600px)" class="hero__img" srcset="/images/hero-image_2-small.jpg" type="image/jpeg">
        <img class="lazyload hero__img" data-src="/images/hero-image_2-large.jpg" alt="hero" />
      </picture>
      <h2 class="hero__title">Welcome Foodholic!!</h2>
      <p class="hero__tagline">
        Have you find your favorite restaurant? if not, don't worry about it
        You'll find here!
      </p>
    </section>
    <main id="mainContent" class="content">
      <p class="content__label">Explore Restaurant</p>
      <list-restaurant isFrom="home"></list-restaurant>
    </main>
    <footer>
      <p>Copyright ©2021 - Hunger Apps</p>
    </footer>
    `;
  }
}

customElements.define('home-page', Home);
