import '../views/pages/Home';
import '../views/pages/Favorites';
import '../views/pages/Detail';

const routes = {
  '/': document.createElement('home-page'),
  '/detail/:id': document.createElement('restaurant-detail'),
  '/favorites': document.createElement('favorites-page'),
};

export default routes;
