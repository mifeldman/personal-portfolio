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

let pokemonGrid = document.querySelector('.pokemonGrid')

getAPIData('https://pokeapi.co/api/v2/pokemon?&limit=25').then((data) => {
  for (const pokemon of data.results) {
    getAPIData(pokemon.url).then((pokeData) => {
      populatePokeCard(pokeData)
    })
  }
})

populatePokeCard(allPokemon)


function populatePokeCard(pokeArray) {
  pokeArray.forEach((pokemon) => {
    let pokeScene = document.createElement("div");
    pokeScene.className = "scene";
    let pokeCard = document.createElement("div");
    pokeCard.className = "card";
    pokeCard.addEventListener("click", () =>
      pokeCard.classList.toggle("is-flipped")
    );
    let pokeFront = populateCardFront(singlePokemon)
    pokeFront.className = "card__face card__face--front";
    pokeFront.textContent = "front";

    let pokeBack = populateCardBack(singlePokemon)
    pokeBack.className = "card__face card__face--back";
    pokeBack.textContent = "back";

    pokeCard.appendChild(pokeFront);
    pokeCard.appendChild(pokeBack);
    pokeScene.appendChild(pokeCard);
    pokemonGrid.appendChild(pokeScene);
  });
}

function populateCardFront(pokemon) {
  let cardFront = document.createElement('div')
  cardFront.className = 'card__face card__face--front'
  cardFront.textContent = pokemon.name
  let frontImage = document.createElement('img')
  frontImage.src = `../images/${pokemon.id}.png`
  cardFront.appendChild(frontImage)
  return cardFront
}

function populateCardBack(pokemon) {
  let cardFront = document.createElement('div')
  cardFront.className = 'card__face card__face--back'
  cardFront.textContent = `${pokemon.abilities}`
  let abilityList = document.createElement('ul')
  const abilities = pokemon.abilities.map(ability => {
    let abilityName = document.createElement('li')
    abilityName.textContent = ability.ability.name
    abilityList.appendChild(abilityName)
  })
  return cardBack
}

//also do some formatting over the weekend so the pokemon cards look purty. 



