//Sequential
//###########

// async function getSomePkmn(qte) {
//   const pokemons = [];

//   for (let i = 1; i <= qte; i++) {
//     pokemons.push(await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
//   }

//   pokemons.forEach(pokemon => {
//     console.log(pokemon.data.name);
//   });
// }

//Paral
//#########

// async function getSomePkmn(qte) {
//   const proms = [];
//   const pokemons = [];

//   for (let i = 1; i <= qte; i++) {
//     proms.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
//   }
//   for (let i = 0; i < proms.length; i++) {
//     pokemons.push(await proms[i]);
//   }

//   pokemons.forEach(pokemon => {
//     console.log(pokemon.data.name);
//   });
// }

//Pormise.all
//###########

async function getSomePkmn(qte) {
  const proms = [];

  for (let i = 1; i <= qte; i++) {
    proms.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
  }

  const pokemons = await Promise.all(proms);

  pokemons.forEach(pokemon => {
    console.log(pokemon.data.name);
  });
}

getSomePkmn(151);
