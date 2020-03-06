import { starships } from "../data/starships.js";

const nav = document.querySelector('.nav')

const navList = document.querySelector('.navList')


function populateNav(starships) {
    starships.forEach(starship => {

      let anchorWrap = document.createElement("a");
      anchorWrap.href = "#";

      let listItem = document.createElement('li')
      listItem.textContent = starship.name

      anchorWrap.appendChild(listItem); //you need to add something to the DOM once you create it in JS
      navList.appendChild(anchorWrap);
      nav.appendChild(navList);
    });
  }

  //look at the code after 12:20...that is when you got lost

  populateNav(starships);
