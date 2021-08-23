/* eslint-disable no-undef */
Feature('Liking Restaurants');

const assert = require('assert');

Before(({ I }) => {
  I.amOnPage('/#/favorites');
});
Scenario('liking one restaurant', async ({ I }) => {
  I.seeElement('#favoriteRestaurant');
  I.see('There are no restaurants to show');

  I.amOnPage('/');

  I.seeElement('.card a');
  const firstRestaurant = locate('.card a').first();
  const firstRestaurantName = await I.grabTextFrom(locate('.card__title').first());
  console.log(firstRestaurantName);

  I.click(firstRestaurant);

  I.seeElement('#likeFAB');
  I.click('#likeFAB');

  I.amOnPage('/#/favorites');
  I.seeElement('.card a');
  const likedRestaurantName = await I.grabTextFrom(locate('.card__title').first());

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('Unliking a restaurant', async ({ I }) => {
  I.see('There are no restaurants to show');

  I.amOnPage('/');

  I.seeElement('.card a');
  const firstRestaurant = locate('.card a').first();

  I.click(firstRestaurant);

  I.seeElement('#likeFAB');
  I.click('#likeFAB');
  I.seeElement('#likedFAB');
  I.click('#likedFAB');

  I.amOnPage('/#/favorites');
  I.see('There are no restaurants to show');
});
