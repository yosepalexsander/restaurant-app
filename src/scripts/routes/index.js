import '../views/pages/Detail';
import '../views/pages/Favorites';
import '../views/pages/Home';

const routes = {
  '/': document.createElement('home-page'),
  '/detail/:id': document.createElement('restaurant-detail'),
  '/favorites': document.createElement('list-favorites'),
};

export default routes;
