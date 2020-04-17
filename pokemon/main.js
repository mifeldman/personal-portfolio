//resusable asnyc function
async function getAPIData(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

function loadPage() {
  getAPIData('https://pokeapi.co/api/v2/pokemon/?&limit=25').then((data) => {
    for (const pokemon of data.results) {
      getAPIData(pokemon.url).then((pokeData) => {
        populatePokeCard(pokeData)
      })
    }
  })
}

let pokemonGrid = document.querySelector(".pokemonGrid");
let startButton = document.querySelector("#startButton");
let newButton = document.querySelector("#newButton");

startButton.addEventListener("click", () => {
  loadPage();
});

newButton.addEventListener("click", () => {
  addPokemon();
});



function populatePokeCard(singlePokemon) {
  let pokeScene = document.createElement('div')
  pokeScene.className = 'scene'
  let pokeCard = document.createElement('div')
  pokeCard.className = 'card'
  pokeCard.addEventListener('click', () =>
    pokeCard.classList.toggle('is-flipped'),
  )
  let pokeFront = populateCardFront(singlePokemon)
  let pokeBack = populateCardBack(singlePokemon)

  pokeCard.appendChild(pokeFront)
  pokeCard.appendChild(pokeBack)
  pokeScene.appendChild(pokeCard)
  pokemonGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
  let cardFront = document.createElement('div')
  cardFront.className = 'card__face card__face--front'
  let frontImage = document.createElement('img')
  frontImage.src = `../images/${getImageFileName(pokemon)}.png`

  let frontLabel = document.createElement('p')
  frontLabel.textContent = `${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`
  cardFront.appendChild(frontImage)
  cardFront.appendChild(frontLabel)
  return cardFront
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
  let cardBack = document.createElement('div')
  cardBack.className = 'card__face card__face--back'
  let abilityList = document.createElement('ul')
  pokemon.abilities.forEach(ability => {
    let abilityName = document.createElement('li')
    abilityName.textContent = ability.ability.name
    abilityList.appendChild(abilityName)
  })
  cardBack.appendChild(abilityList)
  return cardBack
}

//also do some formatting over the weekend so the pokemon cards look purty.

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
  
  var createform = document.createElement('form'); // Create New Element Form
createform.setAttribute("action", "javascript:void(0)"); // Setting Action Attribute on Form
createform.setAttribute("method", "post"); // Setting Method Attribute on Form
pokemonGrid.appendChild(createform);

  var heading = document.createElement('h2'); // Heading of Form
heading.innerHTML = "New Pokemon";
createform.appendChild(heading);





// Create Label and Input for Height
var heightLabel = document.createElement('label'); 
heightLabel.innerHTML = "Height : "; 
createform.appendChild(heightLabel);
var height = document.createElement('input'); 
height.setAttribute("type", "text");
height.setAttribute("id", "height");
createform.appendChild(height);

// Create Label and Input for Height
var heightLabel = document.createElement('label'); 
heightLabel.innerHTML = "Height : "; 
createform.appendChild(heightLabel);
var height = document.createElement('input'); 
height.setAttribute("type", "text");
height.setAttribute("id", "height");
createform.appendChild(height);





var submitelement = document.createElement('input'); // Append Submit Button
submitelement.setAttribute("type", "submit");
submitelement.setAttribute("value", "Submit");
createform.appendChild(submitelement);
submitelement.addEventListener("click", () => {
  createPoke();
});

}



function createPoke () {
  let height = document.getElementById('height').value;
  



  let thoremon = new Pokemon(height, 290, "Thoremon", []);
  populatePokeCard(thoremon);
  console.log(thoremon)
}
