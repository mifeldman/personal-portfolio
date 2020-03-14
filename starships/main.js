import { starships } from "../data/starships.js";
import { getLastNumber, removeChildren, addStarField } from '../scripts/uti.js'


const nav = document.querySelector('.nav')
const navList = document.querySelector('.navList')
const shipView = document.querySelector('.main')
const dialog = document.querySelector('.modal')
const closeButton = document.querySelector('.modal-close')
const modalBackground = document.querySelector('.modal-background')

closeButton.addEventListener('click', () => {
  dialog.classList.toggle('is-active')
})

modalBackground.addEventListener('click', () => {
  dialog.classList.toggle('is-active')
})


function populateNav(starships) {
    starships.forEach(starship => {

      let anchorWrap = document.createElement("a");
      anchorWrap.href = "#";
      anchorWrap.addEventListener('click', event => {
        let shipName = event.target.textContent
        const foundShip = starships.find(ship => ship.name === shipName)
        populateShipView(foundShip)
      })
      let listItem = document.createElement('li')
      listItem.textContent = starship.name

      anchorWrap.appendChild(listItem); //you need to add something to the DOM once you create it in JS
      navList.appendChild(anchorWrap);
      nav.appendChild(navList);
    });
  }

function populateShipView(shipData) {
  removeChildren(shipView)
  let shipNum = getLastNumber(shipData.url);
  let shipImage = document.createElement("img");
  shipImage.src = `https://starwars-visualguide.com/#/starships/${shipNum}.jpg`;
  shipView.appendChild(shipImage)
  imageItem.addEventListener("error", event => {
    dialog.classList.toggle('is-active')
    shipImage.hidden = true;
  });
  shipView.appendChild()

}


  populateNav(starships);

  addStarField(document.querySelector('body'), 1000)