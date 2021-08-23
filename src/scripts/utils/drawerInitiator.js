class DrawerInitiator {
  static init({ button, drawer, content }) {
    button.addEventListener('click', (event) => {
      this.toggleDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      this.closeDrawer(event, drawer);
    });
  }

  static toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  }

  static closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  }
}

export default DrawerInitiator;
