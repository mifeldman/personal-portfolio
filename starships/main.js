//Import API data and functions in the Utility JS document
import { starships } from "../data/starships.js";
import { getLastNumber, removeChildren, addStarField } from "../scripts/uti.js";

//Use query selector to access all the needed HTML elements for JS
const nav = document.querySelector(".nav");
const navList = document.querySelector(".navList");
const shipView = document.querySelector(".main");
const dialog = document.querySelector(".modal");
const closeButton = document.querySelector(".modal-close");
const modalBackground = document.querySelector(".modal-background");

//Adjusting the classes for the Bulma elements using event listener. Toggles the error screen.
closeButton.addEventListener("click", () => {
  dialog.classList.toggle("is-active");
});

modalBackground.addEventListener("click", () => {
  dialog.classList.toggle("is-active");
});

function populateNav(starships) {
  //Uses forEach to iterate through the array and use the info to create HTML elements and assign values
  starships.forEach(starship => {
    let anchorWrap = document.createElement("a");
    anchorWrap.href = "#";
    //Event listener creates a variable and takes text content from navigation to select the right ship
    anchorWrap.addEventListener("click", event => {
      let shipName = event.target.textContent;
      const foundShip = starships.find(ship => ship.name === shipName);
      populateShipView(foundShip);
    });
    let listItem = document.createElement("li");
    listItem.textContent = starship.name;

    anchorWrap.appendChild(listItem); //you need to add something to the DOM once you create it in JS
    navList.appendChild(anchorWrap);
    nav.appendChild(navList);
  });
}

function populateShipView(shipData) {
  removeChildren(shipView);
  let shipNum = getLastNumber(shipData.url);
  let shipImage = document.createElement("img");
  shipImage.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`; //string using template literals
  shipImage.addEventListener("error", event => {
    shipImage.hidden = true;
    dialog.classList.toggle("is-active");
  });
  shipView.appendChild(shipImage);
}

populateNav(starships);

addStarField(document.querySelector("body"), 1000);
