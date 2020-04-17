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
  constructor(height, weight, name, abilities) {
    this.height = height;
    this.weight = weight;
    this.name = name;
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

var namelabel = document.createElement('label'); // Create Label for Name Field
namelabel.innerHTML = "Pokemon Name : "; // Set Field Labels
createform.appendChild(namelabel);

var inputelement = document.createElement('input'); // Create Input Field for Name
inputelement.setAttribute("type", "text");
inputelement.setAttribute("name", "dname");
createform.appendChild(inputelement);

var linebreak = document.createElement('br');
createform.appendChild(linebreak);

var emaillabel = document.createElement('label'); // Create Label for E-mail Field
emaillabel.innerHTML = "Your Email : ";
createform.appendChild(emaillabel);

var emailelement = document.createElement('input'); // Create Input Field for E-mail
emailelement.setAttribute("type", "text");
emailelement.setAttribute("name", "demail");
createform.appendChild(emailelement);

var emailbreak = document.createElement('br');
createform.appendChild(emailbreak);

var messagelabel = document.createElement('label'); // Append Textarea
messagelabel.innerHTML = "Your Message : ";
createform.appendChild(messagelabel);

var texareaelement = document.createElement('textarea');
texareaelement.setAttribute("name", "dmessage");
createform.appendChild(texareaelement);

var messagebreak = document.createElement('br');
createform.appendChild(messagebreak);

var submitelement = document.createElement('input'); // Append Submit Button
submitelement.setAttribute("type", "submit");
submitelement.setAttribute("value", "Submit");
createform.appendChild(submitelement);
submitelement.addEventListener("click", () => {
  createPoke();
});

}



function createPoke () {
  let Thoremon = new Pokemon(190, 290, "Thoremon", [
    {
      ability: {
       name: "Thunder Belly",
    },
    },
    {
      ability: {
      name: "Beard Power",
      },
    },
    {
      ability: {
      name: "Stinky",
      },
    },
  ]);
  populatePokeCard(Thoremon);
}
