export function getLastNumber(url) {
  let end = url.lastIndexOf("/");
  let start = end - 2;
  if (url.charAt(start) === "/") {
    //strict value comparision here to catch where the '/' is in the url
    start++;
  }
  return url.slice(start, end); //Uses slice function to get the desired amount of numbers/characters from the urls
}

export function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function addStarField(element, numStars) {
  element.style.setProperty("background-color", "black");
  for (let i = 0; i < numStars; i++) {
    let star = document.createElement("div");
    star.style.setProperty("position", "absolute");
    star.style.setProperty("width", "2px");
    star.style.setProperty("height", "2px");
    star.style.setProperty("background-color", "white");
    let xy = getRandomPosition();
    star.style.left = `${xy[0]}px`;
    star.style.top = `${xy[1]}px`;
    element.appendChild(star);
    console.log(element);
  }
}

function getRandomPosition() {
  let y = document.getElementById("foo").offsetHeight; //Starfield can reach the bottom when using offset height on the body element
  let x = window.outerWidth;
  let randomY = Math.floor(Math.random() * y);
  let randomX = Math.floor(Math.random() * x);
  return [randomX, randomY];
}
