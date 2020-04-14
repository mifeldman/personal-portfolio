//resusable asnyc function
function loadPage(){
async function getAPIData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
}

let pokemonGrid = document.querySelector(".pokemonGrid");

let startButton = document.querySelector('#startButton')
let newButton = document.querySelector('#newButton')

startButton.addEventListener('click', () => {
  loadPage()
})

newButton.addEventListener('click', () => {
  addPokemon()
})

getAPIData("https://pokeapi.co/api/v2/pokemon?&limit=25").then((data) => {
  for (const pokemon of data.results) {
    getAPIData(pokemon.url).then((pokeData) => {
      populatePokeCard(pokeData);
    });
  }
});

populatePokeCard(allPokemon);

function populatePokeCard(pokeArray) {
  pokeArray.forEach((pokemon) => {
    let pokeScene = document.createElement("div");
    pokeScene.className = "scene";
    let pokeCard = document.createElement("div");
    pokeCard.className = "card";
    pokeCard.addEventListener("click", () =>
      pokeCard.classList.toggle("is-flipped")
    );
    let pokeFront = populateCardFront(singlePokemon);
    pokeFront.className = "card__face card__face--front";
    pokeFront.textContent = "front";

    let pokeBack = populateCardBack(singlePokemon);
    pokeBack.className = "card__face card__face--back";
    pokeBack.textContent = "back";

    pokeCard.appendChild(pokeFront);
    pokeCard.appendChild(pokeBack);
    pokeScene.appendChild(pokeCard);
    pokemonGrid.appendChild(pokeScene);
  });
}

function populateCardFront(pokemon) {
  let cardFront = document.createElement("div");
  cardFront.className = "card__face card__face--front";
  cardFront.textContent = pokemon.name;
  let frontImage = document.createElement("img");
  frontImage.src = `../images/${getImageFileName(pokemon)}.png`;

  let frontLabel = document.createElement('p')
  frontLabel.textContent = `${pokemon.name.charAt(0).toUpperCase}${pokemon.name.slice(1)}`

  cardFront.appendChild(frontImage);
  cardFront.appendChild(frontLabel)
  return cardFront;
}

function getImageFileName(pokemon) {
  if (pokemon.id < 10) {
    return `00${pokemon.id}`
  } else if (pokemon.id > 9 && pokemon.id < 100) {
    return `0${pokemon.id}`
  } else if (pokemon.id > 809) {
    return `pokeball`
  }
}


function populateCardBack(pokemon) {
  let cardFront = document.createElement("div");
  cardFront.className = "card__face card__face--back";
  cardFront.textContent = `${pokemon.abilities}`;
  let abilityList = document.createElement("ul");
  const abilities = pokemon.abilities.map((ability) => {
    let abilityName = document.createElement("li");
    abilityName.textContent = ability.ability.name;
    abilityList.appendChild(abilityName);
  });
  return cardBack;
}

//also do some formatting over the weekend so the pokemon cards look purty.

class Pokemon {
  constructor(height, weight, name, abilities) {
    this.height = height;
    this.weight = weight;
    this.name = name
    this.abilities = abilities
    this.id = 900
  }
}

function addPokemon () {
  let Thoremon = new Pokemon(190, 290, 'Thoremon',
  [
    {
      ability: {
        name: 'Thunder Belly'
      }
    },
    {
      ability: {
        name: 'Beard Power'
      }
    },
      {
        ability: {
          name: 'Stinky'
        }
      }
  ])
  populatePokeCard(Thoremon)
}
