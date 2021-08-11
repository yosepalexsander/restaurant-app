/* eslint-disable no-undef */
import LikeFAB from '../src/scripts/views/components/LikeButton';
import FavoriteRestaurant from '../src/scripts/data/database';

describe('Unliking a Restaurant', () => {
  let likeFAB;
  const createLikeFAB = (data) => {
    likeFAB = new LikeFAB(FavoriteRestaurant);
    likeFAB.setAttribute('restaurant-id', 1);
    likeFAB.data = data;
    document.body.appendChild(likeFAB);
  };
  beforeEach(async () => {
    await FavoriteRestaurant.putRestaurant({ id: 1 });
    createLikeFAB({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurant.deleteRestaurant(1);
  });

  it('should show the liked FAB when the restaurant has been liked before', () => {
    // setTimeout used to wait custome element rendering first
    // because custom element have delay in rendering
    setTimeout(() => {
      expect(document.querySelector('#likedFAB'))
        .toBeTruthy();
    }, 500);
  });

  it('should not show the like FAB when the restaurant has been liked before', () => {
    // setTimeout used to wait custome element rendering first
    // because custom element have delay in rendering
    setTimeout(() => {
      expect(document.querySelector('#likeFAB'))
        .toBeFalsy();
    }, 500);
  });

  it('should be able to unlike the restaurant', () => {
    // setTimeout used to wait custome element rendering first
    // because custom element have delay in rendering
    setTimeout(async () => {
      document.querySelector('#likedFAB').dispatchEvent(new Event('click'));
      expect(await FavoriteRestaurant.getAllRestaurants()).toEqual([]);
    }, 500);
  });

  it('should not throw error if the unliked movie is not in the list', () => {
    // setTimeout used to wait custome element rendering first
    // because custom element have delay in rendering
    setTimeout(async () => {
      await FavoriteMovieIdb.deleteMovie(1);

      document.querySelector('[aria-label="unlike this movie"]').dispatchEvent(new Event('click'));

      expect(await FavoriteMovieIdb.getAllMovies()).toEqual([]);
    }, 500);
  });
});
