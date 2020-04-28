//Import the API data and two functions from a Utility JS doc created for universal functions
import { people } from "../data/people.js";
import { removeChildren, getLastNumber } from "../scripts/uti.js";

//Access body buttons with Query Selector so they can be implemented into JS code
const gallery = document.querySelector(".gallery");
const maleButton = document.querySelector("#maleButton");
const femaleButton = document.querySelector("#femaleButton");
const otherButton = document.querySelector("#otherButton");

//Use of filter functions in JS to be able to filter the page by gender. Info is from API.
const otherCharacters = people.filter(person => {
  if (
    person.gender === "hermaphrodite" ||
    person.gender === "n/a" ||
    person.gender === "none"
  ) {
    return person;
  }
});

maleButton.addEventListener("click", event => {
  populateDOM(people.filter(person => person.gender === "male"));
});

femaleButton.addEventListener("click", event => {
  populateDOM(people.filter(person => person.gender === "female"));
});

otherButton.addEventListener("click", event => {
  populateDOM(otherCharacters);
});

function populateDOM(characters) {
  removeChildren(gallery);
  characters.forEach(person => {
    // need to extract the number from the person.url property
    let charNum = getLastNumber(person.url);
    let anchorWrap = document.createElement("a");
    anchorWrap.href = "#";

    // These variables demonstrate the proper use of variables and scope inside the function block.
    let imageItem = document.createElement("img");
    imageItem.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`;

    //Use an event listener for an error so that the missing image hides the star wars character. User experience.
    imageItem.addEventListener("error", event => {
    imageItem.hidden = true;
    });

    anchorWrap.appendChild(imageItem); //you need to add something to the DOM once you create it in JS
    gallery.appendChild(anchorWrap);
  });
}
