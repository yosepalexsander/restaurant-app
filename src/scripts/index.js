import "regenerator-runtime"; /* for async await transpile */
import "../styles/main.css";
import "../styles/responsive.css";
import Data from "../DATA.json";

const mainElm = document.querySelector("main");
const menuElm = document.querySelector("#menu");
const heroElm = document.querySelector(".hero");
const drawerElm = document.querySelector("#drawer");
const restaurantItemELm = document.querySelector(".restaurants");

window.addEventListener("DOMContentLoaded", function (event) {
  mainElm.addEventListener("click", function (event) {
    drawerElm.classList.remove("open");
  });

  menuElm.addEventListener("click", function (event) {
    drawerElm.classList.toggle("open");
    event.stopPropagation();
  });

  heroElm.addEventListener("click", function (event) {
    drawerElm.classList.remove("open");
  });

  restaurantItemELm.innerHTML = `
   ${Data.restaurants
     .map((restaurant) => {
       return `
       <article id="restaurant-item" class="card">
        <div class="card-image">
          <img id="restaurant-item-thumbnail" src=${restaurant.pictureId} alt=${
         restaurant.name
       }/>
          <span class="card-label">${restaurant.city}</span>
        </div>
        <div id="restaurant-item-content" class="card-content">
        <p class="card-header">Rating: ${restaurant.rating}</p>
            <p class="card-title">${restaurant.name}</p>
            <p class="card-description">${restaurant.description.substr(
              0,
              150
            )}...</p>
        </div>
       </article>
       `;
     })
     .join("")}  
  `;
});
