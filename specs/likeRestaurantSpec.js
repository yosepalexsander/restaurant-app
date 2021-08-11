/* eslint-disable no-undef */
import LikeFAB from '../src/scripts/views/components/LikeButton';
import FavoriteRestaurant from '../src/scripts/data/database';

describe('Liking a Restaurant', () => {
  let likeFAB;
  const createLikeFAB = (data) => {
    likeFAB = new LikeFAB(FavoriteRestaurant);
    likeFAB.setAttribute('restaurant-id', 1);
    likeFAB.data = data;
    document.body.appendChild(likeFAB);
  };

  it('should show the like FAB when the restaurant has not been liked before', () => {
    createLikeFAB({ id: 1 });

    // setTimeOut used to wait custome element rendering first
    // because custom element have delay in rendering
    setTimeout(() => {
      expect(document.querySelector('#likeFAB')).toBeTruthy();
    }, 500);
  });

  it('should not show the liked FAB when the restaurant has been liked before', () => {
    createLikeFAB({ id: 1 });

    // setTimeOut used to wait custome element rendering first
    // because custom element have delay in rendering
    setTimeout(() => {
      expect(document.querySelector('#likedFAB'))
        .toBeFalsy();
    }, 500);
  });

  it('should be able to like the restaurant', () => {
    createLikeFAB({ id: 1 });

    // setTimeOut used to wait custome element rendering first
    // because custom element have delay in rendering
    setTimeout(async () => {
      document.querySelector('#likeFAB').dispatchEvent(new Event('click'));
      const restaurant = await FavoriteRestaurant.getRestaurant(1);
      expect(restaurant).toEqual({ id: 1 });

      await FavoriteRestaurant.deleteRestaurant(1);
    }, 500);
  });

  it('should not add a movie again when its already liked', () => {
    createLikeFAB({ id: 1 });

    // setTimeOut used to wait custome element rendering first
    // because custom element have delay in rendering
    setTimeout(async () => {
      await FavoriteRestaurant.putRestaurant({ id: 1 });
      document.querySelector('#likeFAB').dispatchEvent(new Event('click'));
      expect(await FavoriteRestaurant.getAllRestaurants()).toEqual([{ id: 1 }]);
      await FavoriteRestaurant.deleteRestaurant(1);
    }, 500);
  });

  it('should not add a movie when it has no id', async () => {
    createLikeFAB({});

    // setTimeOut used to wait custome element rendering first
    // because custom element have delay in rendering
    setTimeout(async () => {
      document.querySelector('#likeFAB').dispatchEvent(new Event('click'));
      console.log(await FavoriteRestaurant.getAllRestaurants());
      expect(await FavoriteRestaurant.getAllRestaurants()).toEqual([]);
    }, 500);

    await FavoriteRestaurant.deleteRestaurant(1);
  });
});
