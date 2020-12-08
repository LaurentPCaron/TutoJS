/***XHR ***/

// const request = new XMLHttpRequest();

// request.addEventListener('load', function () {
//   console.log('OK');
//   const planets = JSON.parse(this.responseText);
//   const filmURL = planets.results[0].films[0];

//   planets.results.forEach(planet => {
//     console.log(planet.name);
//   });
// });

// request.addEventListener('error', () => {
//   console.log('Nope');
// });

// request.open('GET', 'https://swapi.dev/api/planets');
// request.send();
// console.log('request sent!');

//==================================
/*Fetch  (Promnesses) */

// const checkStatuesAndParse = response => {
//   if (!response.ok) {
//     throw new Error(`Satus Code Eror: ${response.status}`);
//   }
//   return response.json();
// };

// const printPlanets = ({ results, next }) => {
//   console.log('Next 10 planets');
//   results.forEach(planet => {
//     console.log(planet.name);
//   });
//   return Promise.resolve(next);
// };

// const fetchNextPlanets = url => {
//   return fetch(url);
// };

// fetch('https://swapi.dev/api/planets')
//   .then(checkStatuesAndParse)
//   .then(printPlanets)
//   .then(fetchNextPlanets)
//   .then(checkStatuesAndParse)
//   .then(printPlanets)
//   .catch(err => {
//     console.log('Connection problems');
//     console.log(err);
//   });

//==================================
/*Axios */

const printPlanets = ({ data }) => {
  data.results.forEach(planet => {
    console.log(planet.name);
  });
  return Promise.resolve(data.next);
};

const fetchNextPlanets = url => {
  return axios.get(url);
};

axios
  .get('https://swapi.dev/api/planets')
  .then(printPlanets)
  .then(fetchNextPlanets)
  .then(printPlanets)
  .catch(err => {
    console.log(err);
  });
