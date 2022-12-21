// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict'

// https://opendata.paris.fr/explore/dataset/lieux-de-tournage-a-paris/information
const filmingLocations = require('./lieux-de-tournage-a-paris.json')

console.log('🚀 It Works!');

/**
 * 💅 Try to produce the most readable code, use meaningful variable names
 * Your intentions should be clear by just reading the code
 * Good luck, have fun !
 */

// 📝 TODO: Number of filming locations
// 1. Make the function return the number of filming locations
function getFilmingLocationsNumber () {
	return filmingLocations.length;
}
console.log(`There is ${getFilmingLocationsNumber()} filming locations in Paris`)

// 📝 TODO: Filming locations sorted by start date, from most recent to oldest.
// 1. Implement the function
// 2. Log the first and last item in array
function sortFilmingLocationsByStartDate () {
	const comparison = (elemA, elemB) => new Date(elemA["fields"]["date_debut"]) - new Date(elemB["fields"]["date_debut"])
	return filmingLocations.sort(comparison)

}
// let temparray = sortFilmingLocationsByStartDate()
// console.log(temparray[0],temparray[10000])

// 📝 TODO: Number of filming locations in 2020 only
// 1. Make the function return the number of filming locations in 2020 only
// 2. Log the result
function getFilmingLocationsNumber2020 () {
	let count = 0
	const tab = []
	for(const elem of filmingLocations) {
		if( elem["fields"]["annee_tournage"]==="2020" && !(tab.find(x => x === elem["fields"]["adresse_lieu"] ))) {
			tab.push(elem["fields"]["adresse_lieu"]);
			count++;
		}
	}
	return count;
}
console.log("The number of filming locations in 2020 is ",getFilmingLocationsNumber2020())

// 📝 TODO: Number of filming locations per year
// 1. Implement the function, the expected result is an object with years as
// keys and filming locations number as value, e.g:
//    const filmingLocationsPerYear = {
//      '2020': 1234,
//      '2021': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerYear () {
	const filmingLocationsPerYear = {}
	const result = {}
	for (const elem of filmingLocations){
		if (filmingLocationsPerYear[elem["fields"]["annee_tournage"]] === undefined ) {

			filmingLocationsPerYear[elem["fields"]["annee_tournage"]] = [elem["fields"]["adresse_lieu"]];
			result[elem["fields"]["annee_tournage"]] = 1;

		} else if( !( filmingLocationsPerYear[elem["fields"]["annee_tournage"]].find(x => x === elem["fields"]["adresse_lieu"]) ) ) {

			filmingLocationsPerYear[elem["fields"]["annee_tournage"]].push(elem["fields"]["adresse_lieu"]);
			result[elem["fields"]["annee_tournage"]] += 1;

		}
	}
	return result;
}
console.log(getFilmingLocationsNumberPerYear())

// 📝 TODO: Number of filming locations by district (arrondissement)
// 1. Implement the function, the expected result is an object with
// district as keys and filming locations number as value, e.g:
//    const filmingLocationsPerDistrict = {
//      '75013': 1234,
//      '75014': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerDistrict() {
	const filmingLocationsPerDistrict = {}
	const result = {}
	for (const elem of filmingLocations){
		if (filmingLocationsPerDistrict[elem["fields"]["ardt_lieu"]] === undefined ) {

			filmingLocationsPerDistrict[elem["fields"]["ardt_lieu"]] = [elem["fields"]["adresse_lieu"]];
			result[elem["fields"]["ardt_lieu"]] = 1;

		} else if( !( filmingLocationsPerDistrict[elem["fields"]["ardt_lieu"]].find(x => x === elem["fields"]["adresse_lieu"]) ) ) {

			filmingLocationsPerDistrict[elem["fields"]["ardt_lieu"]].push(elem["fields"]["adresse_lieu"]);
			result[elem["fields"]["ardt_lieu"]] += 1;

		}
	}
	return result;
}
console.log(getFilmingLocationsNumberPerDistrict())

// 📝 TODO: Number of locations per film, sorted in descending order
// 1. Implement the function, result expected as an array of object like:
//    const result = [{film: 'LRDM - Patriot season 2', locations: 12}, {...}]
// 2. Log the first and last item of the array
function getFilmLocationsByFilm () {

	const result = []

	for (const film of filmingLocations){

		let alreadyInserted = false
		for (const elem of result){
			if (elem['film'] === film["fields"]["nom_tournage"]) {
				elem['locations'] += 1
				alreadyInserted = true
				break
			}
		}
		if (!alreadyInserted) {
			result.push({'film':film["fields"]["nom_tournage"], 'locations':1});
		}
	}
	const condition = (a,b) => b['locations'] - a['locations']
	result.sort(condition)
	return result;
}

let nbLocationsPerFilm = getFilmLocationsByFilm()
console.log(nbLocationsPerFilm[0],nbLocationsPerFilm[nbLocationsPerFilm.length-1])

// 📝 TODO: Number of different films
// 1. Implement the function
// 2. Log the result
function getNumberOfFilms() {
	return nbLocationsPerFilm.length
}
console.log("number of different movies :",getNumberOfFilms())

// 📝 TODO: All the filming locations of `LRDM - Patriot season 2`
// 1. Return an array with all filming locations of LRDM - Patriot season 2
// 2. Log the result
function getArseneFilmingLocations () {
	let locations = []
	for(const elem of filmingLocations) {
		if(elem["fields"]["nom_tournage"]==="LRDM - Patriot season 2") {
			locations.push(elem["fields"]["adresse_lieu"])
		}
	}
	return locations
}

console.log("Adresses pour LRDM - Patriot season 2",getArseneFilmingLocations())

// 📝 TODO: Tous les arrondissement des lieux de tournage de nos films favoris
//  (favoriteFilms)
// 1. Return an array of all the districts of each favorite films given as a
//    parameter. e.g. :
//    const films = { 'LRDM - Patriot season 2': ['75013'] }
// 2. Log the result
function getFavoriteFilmsLocations(favoriteFilmsNames) {
	let result = []
	for(const elem of favoriteFilmsNames) {
		result.push({"film":elem,"locations":[]})
	}
	for(const elem of filmingLocations) {
		for(const film of result) {
			if(elem["fields"]["nom_tournage"]===film["film"] && !(film["locations"].find(x => x === elem["fields"]["ardt_lieu"]))) {
				film["locations"].push(elem["fields"]["ardt_lieu"])
				break
			}
		}
	}
	return result
}
const favoriteFilms =
	[
		'LRDM - Patriot season 2',
		'Alice NEVERS',
		'Emily in Paris',
	]

console.log("Locations of our favorite films :", getFavoriteFilmsLocations(favoriteFilms))

// 📝 TODO: All filming locations for each film
//     e.g. :
//     const films = {
//        'LRDM - Patriot season 2': [{...}],
//        'Une jeune fille qui va bien': [{...}]
//     }
function getFilmingLocationsPerFilm () {
	let result = []
	for(const elem of filmingLocations) {
		result.push({"film":elem,"locations":[]})
	}
	for(const elem of filmingLocations) {
		for(const film of result) {
			if(elem["fields"]["nom_tournage"]===film["film"]) {
				film["locations"].push(elem["fields"]["adresse_lieu"])
				break
			}
		}
	}
	return result
}

// 📝 TODO: Count each type of film (Long métrage, Série TV, etc...)
// 1. Implement the function
// 2. Log the result
function countFilmingTypes () {
	return {}
}

// 📝 TODO: Sort each type of filming by count, from highest to lowest
// 1. Implement the function. It should return a sorted array of objects like:
//    [{type: 'Long métrage', count: 1234}, {...}]
// 2. Log the result
function sortedCountFilmingTypes () {
	return []
}

/**
 * This arrow functions takes a duration in milliseconds and returns a
 * human-readable string of the duration
 * @param ms
 * @returns string
 */
const duration = (ms) => `${(ms/(1000*60*60*24)).toFixed(0)} days, ${((ms/(1000*60*60))%24).toFixed(0)} hours and ${((ms/(1000*60))%60).toFixed(0)} minutes`

// 📝 TODO: Find the filming location with the longest duration
// 1. Implement the function
// 2. Log the filming location, and its computed duration

// 📝 TODO: Compute the average filming duration
// 1. Implement the function
// 2. Log the result
