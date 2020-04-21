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
  frontImage.src = `../images/${getImageFileName(pokemon)}.png`;

  let frontLabel = document.createElement("p");
  frontLabel.textContent = `${pokemon.name
    .charAt(0)
    .toUpperCase()}${pokemon.name.slice(1)}`;
  cardFront.appendChild(frontImage);
  cardFront.appendChild(frontLabel);
  return cardFront;
}

function getImageFileName(pokemon) {
  if (pokemon.id < 10) {
    return `00${pokemon.id}`;
  } else if (pokemon.id > 9 && pokemon.id < 100) {
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

function addPokemon() {
  // document.getElementById("newButton").disabled = true;

  var createform = document.createElement("form"); // Create New Element Form
  createform.setAttribute("action", "javascript:void(0)"); // Setting Action Attribute on Form
  createform.setAttribute("id", "myForm");
  pokemonBody.appendChild(createform);

  var heading = document.createElement("h2"); // Heading of Form
  heading.innerHTML = "New Pokemon";
  createform.appendChild(heading);

  // Create Label and Input for Pokemon Name
  var nameLabel = document.createElement("label");
  nameLabel.innerHTML = "Name : ";
  createform.appendChild(nameLabel);
  var name = document.createElement("input");
  name.setAttribute("type", "text");
  name.setAttribute("id", "name");
  createform.appendChild(name);

  // Create Label and Input for Height
  var heightLabel = document.createElement("label");
  heightLabel.innerHTML = "Height : ";
  createform.appendChild(heightLabel);
  var height = document.createElement("input");
  height.setAttribute("type", "text");
  height.setAttribute("id", "height");
  createform.appendChild(height);

  // Create Label and Input for Weight
  var weightLabel = document.createElement("label");
  weightLabel.innerHTML = "Weight : ";
  createform.appendChild(weightLabel);
  var weight = document.createElement("input");
  weight.setAttribute("type", "text");
  weight.setAttribute("id", "weight");
  createform.appendChild(weight);

  // Create Label and Input for Ability 1
  var abilityFirstLabel = document.createElement("label");
  abilityFirstLabel.innerHTML = "Ability 1 : ";
  createform.appendChild(abilityFirstLabel);
  var abilityFirst = document.createElement("input");
  abilityFirst.setAttribute("type", "text");
  abilityFirst.setAttribute("id", "ability1");
  createform.appendChild(abilityFirst);

  // Create Label and Input for Ability 2
  var abilitySecondLabel = document.createElement("label");
  abilitySecondLabel.innerHTML = "Ability 2 : ";
  createform.appendChild(abilitySecondLabel);
  var abilitySecond = document.createElement("input");
  abilitySecond.setAttribute("type", "text");
  abilitySecond.setAttribute("id", "ability2");
  createform.appendChild(abilitySecond);

  var submitelement = document.createElement("input"); // Append Submit Button
  submitelement.setAttribute("type", "submit");
  submitelement.setAttribute("id", "submit");
  createform.appendChild(submitelement);
  submitelement.addEventListener("click", () => {
    validateForm();
  });
}

// Validate that the form is filled out, otherwise send error
function validateForm() {
  var nameValue = document.forms["myForm"]["name"].value;
  var heightValue = document.forms["myForm"]["height"].value;
  var weightValue = document.forms["myForm"]["weight"].value;
  var abilityValue = document.forms["myForm"]["ability1"].value;

  if (nameValue == "") {
    alert("Name must be filled out");
    return false;
  } else if (heightValue == "") {
    alert("Height must be filled out");
  } else if (weightValue == "") {
    alert("Weight must be filled out");
  } else if (abilityValue == "") {
    alert("Ability 1 must be filled out");
  } else {
    createPoke();
    removeChildren(pokemonBody);
  }
}

function createPoke() {
  removeChildren(pokemonGrid);
  loadPage();
  let name = document.getElementById("name").value;
  let height = document.getElementById("height").value;
  let weight = document.getElementById("weight").value;
  let firstAbility = document.getElementById("ability1").value;
  let secondAbility = document.getElementById("ability2").value;

  console.log(name, height, weight, firstAbility, secondAbility);

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
