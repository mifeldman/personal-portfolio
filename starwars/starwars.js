import { people } from "../data/people.js";


const gallery = document.querySelector(".gallery");

const maleButton = document.querySelector("#maleButton");
const femaleButton = document.querySelector("#femaleButton");
const otherButton = document.querySelector("#otherButton");


//console.log(maleCharacters.length);



//console.log(femaleCharacters.length);

const otherCharacters = people.filter(person => {
  if (
    person.gender === "hermaphrodite" ||
    person.gender === "n/a" ||
    person.gender === "none"
  ) {
    return person;
  }
});

//console.log(otherCharacters.length);

maleButton.addEventListener("click", event => {
  populateDOM(people.filter(person => person.gender === "male"));
});

femaleButton.addEventListener("click", event => {
    populateDOM(people.filter(person => person.gender === "female"));
  });

otherButton.addEventListener("click", event => {
    populateDOM(otherCharacters);
})
// "url": "https://swapi.co/api/people/1/"


function getCharNumber(url) {
  let end = url.lastIndexOf('/')
  let start = end - 2
  if (url.charAt(start) === '/'){
      start++
  }
  return url.slice(start,end)
}

function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  } 
}

//getCharNumber("https://swapi.co/api/people/1/")

function populateDOM(characters) {
  characters.forEach(person => {
    // need to extract the number from the person.url property
    let charNum = getCharNumber(person.url);
    let anchorWrap = document.createElement("a");
    anchorWrap.href = "#";

    let imageItem = document.createElement("img");
    imageItem.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`;

    imageItem.addEventListener("error", event => {
      //console.log(`${event.type}: Loading image\n`)
      //console.log(event);
      imageItem.hidden = true;
      //imageItem.src = '../images/uvu-logo.jpeg'
    });

    // add some way to hand,e user clicks on the image
    imageItem.addEventListener("click", event => {
      //console.log(event);
    });
    anchorWrap.appendChild(imageItem); //you need to add something to the DOM once you create it in JS
    gallery.appendChild(anchorWrap);
  });
}
