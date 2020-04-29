import { senators } from "../data/senators.js";
import {removeChildren} from '../scripts/uti.js'

const senatorGrid = document.querySelector(".senatorGrid");
const seniorityButton = document.querySelector('#seniorityButton')
const ageButton = document.querySelector('#ageButton')
const republicansButton = document.querySelector('#republicans')
const democratsButton = document.querySelector('#democrats')
const independentsButton = document.querySelector('#independents')


seniorityButton.addEventListener('click', () => {
  senioritySort();
})

ageButton.addEventListener('click', () => {
  birthdaySort();
})

republicansButton.addEventListener('click', () => {
  filterRepublicans()
})

democratsButton.addEventListener('click', () => {
  filterDemocrats()
})

independentsButton.addEventListener('click', () => {
  filterIndependents()
})

function getSimplifiedSenators(senatorArray) {
  return senatorArray.map((senator) => {
    let middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `;
    //Returns an object with the desired information and implementing key value pairs
    return {
      id: senator.id,
      name: `${senator.first_name}${middleName}${senator.last_name}`,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
      seniority: parseInt(senator.seniority, 10),
      missedVotesPct: senator.missed_votes_pct,
      party: senator.party,
      loyaltyPct: senator.votes_with_party_pct,
      date_of_birth: senator.date_of_birth
    };
  });
}

function populateSenatorDiv(simpleSenators) {
  removeChildren(senatorGrid)
  simpleSenators.forEach((senator) => {
    let senDiv = document.createElement("div");
    let senFigure = document.createElement("figure");
    let figImg = document.createElement("img");
    let figCaption = document.createElement("figcaption");
    let partyIcon = document.createElement("i");
    if (senator.party === "R") partyIcon.className = "fas fa-republican";
    if (senator.party === "D") partyIcon.className = "fas fa-democrat";
    if (senator.party === "ID") partyIcon.className = "fas fa-star";
    figImg.src = senator.imgURL;
    figCaption.textContent = senator.name;

    figCaption.appendChild(partyIcon);
    senFigure.appendChild(figImg);
    senFigure.appendChild(figCaption);
    senDiv.appendChild(senFigure);
    senDiv.appendChild(progressBars(senator));
    senatorGrid.appendChild(senDiv);
  });
}

function progressBars(senator) {
  let progressDiv = document.createElement("div");
  progressDiv.className = "progressDiv";
  let loyaltyLabel = document.createElement("label");
  loyaltyLabel.for = "loyalty";
  loyaltyLabel.textContent = "Loyalty";
  let loyaltyBar = document.createElement("progress");
  loyaltyBar.id = "loyalty";
  loyaltyBar.max = 100;
  loyaltyBar.value = senator.loyaltyPct;
  let seniorityLabel = document.createElement("label");
  seniorityLabel.for = "seniority";
  seniorityLabel.textContent = "Seniority";
  let seniorityBar = document.createElement("progress");
  seniorityBar.id = "seniority";
  seniorityBar.max = 100;
  seniorityBar.value = parseInt(
    (senator.seniority / mostSeniority.seniority) * 100
  );
  let votingLabel = document.createElement("label");
  votingLabel.for = "voting";
  votingLabel.textContent = "Vote";
  let votingBar = document.createElement("progress");
  votingLabel.id = "voting";
  votingBar.max = 100;
  votingBar.value = 10;

  progressDiv.appendChild(loyaltyLabel);
  progressDiv.appendChild(loyaltyBar);
  progressDiv.appendChild(seniorityLabel);
  progressDiv.appendChild(seniorityBar);
  progressDiv.appendChild(votingLabel);
  progressDiv.appendChild(votingBar);
  return progressDiv;
}

const filterSenators = (prop, value) => {
  return senators.filter((senator) => {
    return senator[prop] === value;
  });
};


function filterRepublicans () {
  const republicans = filterSenators("party", "R");
  return populateSenatorDiv(getSimplifiedSenators(republicans))
}

function filterDemocrats () {
  const democrats = filterSenators("party", "D");
  populateSenatorDiv(getSimplifiedSenators(democrats))
}

function filterIndependents () {
  const independents = filterSenators("party", "ID");
  populateSenatorDiv(getSimplifiedSenators(independents))
}



// This variable uses an arrow function and dot notation to access the seniority of the senators object in the data.
const mostSeniority = getSimplifiedSenators(senators).reduce((acc, senator) =>
  acc.seniority > senator.seniority ? acc : senator
);

const missedVotes = getSimplifiedSenators(senators).reduce((acc, senator) =>
  acc.missedVotesPct > senator.missedVotesPct ? acc : senator
);

//Create empty array and use it to store a collection of data from the senators data
let loyalArray = [];

//Uses the push Array method to add most loyal at the end of the array
const mostLoyal = getSimplifiedSenators(republicans).reduce((acc, senator) => {
  if (senator.loyaltyPct === 100) {
    loyalArray.push(senator);
  }

  return acc.loyaltyPct > senator.loyaltyPct ? acc : senator;
});


//Functions below use the sort array method to grab the senority with dot notation, and then returns an integer of that value
function senioritySort() {

    populateSenatorDiv(getSimplifiedSenators(senators).sort((a, b) => {
      return parseInt(a.seniority) - parseInt(b.seniority)
    }))
}

function birthdaySort() {
  populateSenatorDiv(getSimplifiedSenators(senators).sort((a, b) => {
      return parseInt(a.date_of_birth) - parseInt(b.date_of_birth)
  })
  )
}



// populateSenatorDiv(getSimplifiedSenators(senators));