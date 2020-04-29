import { removeChildren } from "../scripts/uti.js";

//resusable asnyc function
async function getAPIData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

//Arrow functions
function loadPage() {
  getAPIData("https://pokeapi.co/api/v2/pokemon/?&limit=25").then((data) => {
    for (const pokemon of data.results) {
      getAPIData(pokemon.url).then((pokeData) => {
        populatePokeCard(pokeData);
      });
    }
  });
}

let pokemonBody = document.querySelector(".pokemonBody");
let pokemonGrid = document.querySelector(".pokemonGrid");
let startButton = document.querySelector("#startButton");
let newButton = document.querySelector("#newButton");

startButton.addEventListener("click", () => {
  removeChildren(pokemonGrid);
  loadPage();
});

newButton.addEventListener("click", () => {
  removeChildren(pokemonBody)
  addPokemon();
});

function populatePokeCard(singlePokemon) {
  let pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  let pokeCard = document.createElement("div");
  pokeCard.className = "card";
  pokeCard.addEventListener("click", () =>
    pokeCard.classList.toggle("is-flipped")
  );
  let pokeFront = populateCardFront(singlePokemon);
  let pokeBack = populateCardBack(singlePokemon);

  pokeCard.appendChild(pokeFront);
  pokeCard.appendChild(pokeBack);
  pokeScene.appendChild(pokeCard);
  pokemonGrid.appendChild(pokeScene);
}

function populateCardFront(pokemon) {
  let cardFront = document.createElement("div");
  cardFront.className = "card__face card__face--front";
  let frontImage = document.createElement("img");
  frontImage.src = `../images/pokeimg/${getImageFileName(pokemon)}.png`;

  let frontLabel = document.createElement("p");
  frontLabel.textContent = `${pokemon.name
    .charAt(0)
    .toUpperCase()}${pokemon.name.slice(1)}`; //string manipulation so that the first letter of the name is uppercase.
  cardFront.appendChild(frontImage);
  cardFront.appendChild(frontLabel);
  return cardFront;
}

function getImageFileName(pokemon) {
  if (pokemon.id < 10) {
    return `00${pokemon.id}`;
  } else if (pokemon.id > 9 && pokemon.id < 100) { //used the 'and' logical operation to state a range of numbers
    return `0${pokemon.id}`;
  } else if (pokemon.id > 809) {
    return `pokeball`;
  }
}

function populateCardBack(pokemon) {
  let cardBack = document.createElement("div");
  cardBack.className = "card__face card__face--back";

  let pokeStats = document.createElement("h2");
  pokeStats.textContent = "PokeStats";

  let height = document.createElement("p");
  height.textContent = "Height" + " - " + `${pokemon.height}`;

  let weight = document.createElement("p");
  weight.textContent = "Weight" + " - " + `${pokemon.weight}`;

  let abilityTitle = document.createElement("h3");
  abilityTitle.textContent = "Abilities";
  let abilityList = document.createElement("ul");
  pokemon.abilities.forEach((ability) => {
    let abilityName = document.createElement("li");
    abilityName.textContent = ability.ability.name;
    abilityList.appendChild(abilityName);
  });
  cardBack.appendChild(pokeStats);
  cardBack.appendChild(height);
  cardBack.appendChild(weight);
  cardBack.appendChild(abilityTitle);
  cardBack.appendChild(abilityList);
  return cardBack;
}

//Function that creates an HTML form in the DOM, then sends to validation
function addPokemon() {
  // document.getElementById("newButton").disabled = true;

  //Const used for all the varibles here. Manipulating the DOM for these variables, so it is better to use CONST.
  const createform = document.createElement("form"); // Create New Element Form
  createform.setAttribute("action", "javascript:void(0)"); // Setting Action Attribute on Form
  createform.setAttribute("id", "myForm");
  pokemonBody.appendChild(createform);

  const heading = document.createElement("h2"); // Heading of Form
  heading.innerHTML = "New Pokemon";
  createform.appendChild(heading);

  // Create Label and Input for Pokemon Name
  const nameLabel = document.createElement("label");
  nameLabel.innerHTML = "Name : ";
  createform.appendChild(nameLabel);
  const name = document.createElement("input");
  name.setAttribute("type", "text");
  name.setAttribute("id", "name");
  createform.appendChild(name);

  // Create Label and Input for Height
  const heightLabel = document.createElement("label");
  heightLabel.innerHTML = "Height : ";
  createform.appendChild(heightLabel);
  const height = document.createElement("input");
  height.setAttribute("type", "text");
  height.setAttribute("id", "height");
  createform.appendChild(height);

  // Create Label and Input for Weight
  const weightLabel = document.createElement("label");
  weightLabel.innerHTML = "Weight : ";
  createform.appendChild(weightLabel);
  const weight = document.createElement("input");
  weight.setAttribute("type", "text");
  weight.setAttribute("id", "weight");
  createform.appendChild(weight);

  // Create Label and Input for Ability 1
  const abilityFirstLabel = document.createElement("label");
  abilityFirstLabel.innerHTML = "Ability 1 : ";
  createform.appendChild(abilityFirstLabel);
  const abilityFirst = document.createElement("input");
  abilityFirst.setAttribute("type", "text");
  abilityFirst.setAttribute("id", "ability1");
  createform.appendChild(abilityFirst);

  // Create Label and Input for Ability 2
  const abilitySecondLabel = document.createElement("label");
  abilitySecondLabel.innerHTML = "Ability 2 : ";
  createform.appendChild(abilitySecondLabel);
  const abilitySecond = document.createElement("input");
  abilitySecond.setAttribute("type", "text");
  abilitySecond.setAttribute("id", "ability2");
  createform.appendChild(abilitySecond);

  const submitelement = document.createElement("input"); // Append Submit Button
  submitelement.setAttribute("type", "submit");
  submitelement.setAttribute("id", "submit");
  createform.appendChild(submitelement);
  submitelement.addEventListener("click", () => {
    validateForm();
  });
}

// Validate that the form is filled out, otherwise send error
function validateForm() {
  const nameValue = document.forms["myForm"]["name"].value;
  const heightValue = document.forms["myForm"]["height"].value;
  const weightValue = document.forms["myForm"]["weight"].value;
  const abilityValue = document.forms["myForm"]["ability1"].value;

  if (nameValue == "") {
    alert("Name must be filled out");
    return false;
  } else if (heightValue == "") {
    alert("Height must be filled out");
    return false;
  } else if (weightValue == "") {
    alert("Weight must be filled out");
    return false;
  } else if (abilityValue == "") {
    alert("Ability 1 must be filled out");
    return false;
  } else {
    createPoke();
    removeChildren(pokemonBody);
  }
}

// Takes validated input and stores it in variable, which is added a new custom object
function createPoke() {
  removeChildren(pokemonGrid);
  loadPage();
  //Creates new variables to access values again, this is to respect the non-global scope of the variables made in the validate form function.
  const name = document.getElementById("name").value;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  const firstAbility = document.getElementById("ability1").value;
  const secondAbility = document.getElementById("ability2").value;

  console.log(name, height, weight, firstAbility, secondAbility);

  // New Custom Javascript Object Creation
class Pokemon {
  constructor(name, height, weight, abilities) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.abilities = abilities;
    this.id = 900;
  }
}

  //Create array for abilities to follow format of API and add multiple abilities in object
  let newPoke = new Pokemon(name, height, weight, [
    {
      ability: {
        name: firstAbility,
      },
    },
    {
      ability: {
        name: secondAbility,
      },
    },
  ]);
  populatePokeCard(newPoke);
  //console.log(newPoke)
}
