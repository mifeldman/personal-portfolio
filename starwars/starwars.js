import {films} from '../data/films.js' //get the Star Wars API from Canvas.
import {people} from '../data/people.js'
import {starships} from '../data/starships.js'

const greetingDiv = document.querySelector(".greeting");

const maleButton = document.querySelector('#maleButton')
const femaleButton = document.querySelector('#femaleButton')
const otherButton = document.querySelector('#otherButton')

// const maleCharacters = people.filter(person => person.gender === male)
// console.log(maleCharacters)

// const femaleCharacters = people.filter(person => person.gender === female)
// console.log(femaleCharacters)

const otherCharacters = people.filter(person => {
    if (person.gender === "hermaphrodite" || person.gender == 'n/a'){
        return person
    }

})

let counter = 1

people.forEach(person => {

    let anchorWrap = document.createElement("a")
    anchorWrap.href = "#"

    let imageItem = document.createElement("img")
    imageItem.src = `https://starwars-visualguide.com/assets/img/characters/${counter}.jpg`

    imageItem.addEventListener('error', (event) => {
        //console.log(`${event.type}: Loading image\n`)
        //console.log(event);
        imageItem.hidden = true;
        //imageItem.src = '../images/uvu-logo.jpeg'
    });
   
    // add some way to hand,e user clicks on the image
    imageItem.addEventListener("click", (event) => {
        console.log(event)
    })
    anchorWrap.appendChild(imageItem) //you need to add something to the DOM once you create it in JS
    greetingDiv.appendChild(anchorWrap)
    counter++
});

maleButton.addEventListener('click', (event) => {
    console.log('Clicked it on maleButton')
})