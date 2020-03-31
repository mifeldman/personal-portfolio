import { senators } from "../data/senators.js"

const senatorDiv = document.querySelector('.senators');

const main = document.querySelector('main');

function populateSenatorDiv(justSenatorNames) {
    console.log(justSenatorNames)
    justSenatorNames.forEach(senator => {
        let senFigure = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')
    
        figImg.src = senator.imgURL
        figCaption.textContent = senator.name

        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        senatorDiv.appendChild(senFigure)

    })
}

const filterSenators = (prop, value) => {
    return senators.filter (senator => {
        return senator[prop] === value
    })
}


const senatorNames = senators.map(senator => {
    let middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
    return {
        id: senator.id,
        name: `${senator.first_name}${middleName}${senator.last_name}`,
        imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`
        //seniority
    }
})


populateSenatorDiv(senators);