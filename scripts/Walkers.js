import { getWalkers, getWalkerCities, getCities } from "./database.js"

const walkers = getWalkers()
const walkerCities = getWalkerCities()
const cities = getCities()
document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("walker")) {
            const [,walkerId] = itemClicked.id.split("--")

            for (const walker of walkers) {
                if (walker.id === parseInt(walkerId)) {
                    const assignments = findCitiesByWalker(walker)
                    const cities = assignedCityNames(assignments)
                    window.alert(`${walker.name} services ${cities}`)
                }
            }
        }
    }
)

const findCitiesByWalker = (walker) => {
    const assignedCities = []
    for (const walkerCity of walkerCities) {
        if(walkerCity.walkerId === walker.id) {
            assignedCities.push(walkerCity)
        }
    }
    return assignedCities
}

const assignedCityNames = (assignments) => {
    // Define an empty string that will get appended with matching cities
    let cityNames = ""

    // Iterate the array of assignment objects
    for (const assignment of assignments) {

        // For each assignment, iterate the cities array to find the match
        for (const city of cities) {
            if (city.id === assignment.cityId) {
                // Add the name of the matching city to the string of city names
                cityNames = `${cityNames} and ${city.name}`
            }
        }
    }

    // After the loop is done, return the string
    return cityNames
}

export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>"
    return walkerHTML
}

