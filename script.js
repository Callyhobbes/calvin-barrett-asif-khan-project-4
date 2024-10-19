// Hitting the fisher yates shuffle babyyyyyy.
Array.prototype.shuffle = function () {
  let i = this.length;
  while (--i > 0) {
    let j = Math.floor(Math.random() * (1 + i));
    let temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  };
  return this;
}

// Preload Animation Start
// Time-out for preload of pokeball icon bouncing
setTimeout(function () {
  $('.preloader').fadeToggle();
}, 4000);
// Preload animation End

// Toggles for results
// smooth scroll from picked-pokemon to because you like section
$('.picked-pokemon').on('click', 'a', function () {
  $('.liked').show();
  $(`html,body`).animate({
    scrollTop: $('#because-you-like').offset().top
  }, 1500);
});

$('.liked').on('click', 'a', function () {
  // empty the results
  emptyAll();
  // clear the form's checked inputs
  $('html').trigger('reset');
  $('.liked').hide();
  //smooth scroll to top
  $(`html,body`).animate({
    scrollTop: $('#start').offset().top
  }, 1500);
});
// Toggles for results END.

// Empty All Sections Function
function emptyAll() {
  $('.liked').empty();
  $('.picked-pokemon').empty();
  $('footer').empty();
}

// Declaring application object
const app = {
  // Root Api
  rootApi: 'https://pokeapi.co/api/v2/',
  // Initialize all necessary methods.
  init() {
    this.loop();
  },
  // This method will make an ajax call to the pokemon api at whatever endpoint is specified in the parameter.
  callApi(x) {
    return $.ajax({
      url: app.rootApi + x,
      method: 'GET',
      dataType: 'json'
    })
  },
  // Logic for searchbox
  loop() {
    // Create an empty array for each pokemon type
    const cachedPokemon = [];
    const fireArray = [];
    const grassArray = [];
    const flyingArray = [];
    const poisonArray = [];
    const fightingArray = [];
    const waterArray = [];
    const iceArray = [];
    const electricArray = [];
    const psychicArray = [];
    const groundArray = [];
    const rockArray = [];
    const ghostArray = [];
    const fairyArray = [];
    const normalArray = [];
    const bugArray = [];
    const steelArray = [];
    const darkArray = [];
    const dragonArray = [];
    // Run the following block of code 807 times to retrieve all pokemon up to gen 7.
    // Everytime this block is run iterate through the pokemon endpoints using i as the id. Push each ajax promise object into the empty array.
    for (let i = 1; i <= 807; i++) {
      cachedPokemon.push(app.callApi("pokemon/" + i));
    }
    // When all the promise objects are resolved and placed inside cachedPokemon...
    $.when(...cachedPokemon)
      //THEN spread each object inside of cachedPokemon
      .then(function (...x) {
        // Now in our cachedPokemon we have an array of promise objects. Each promise object contains 3 objects within it. We want to retrieve the first object within every promise object.
        //iterate through the spread out values and return an array that contains the first object within each promise object.
        const relevantPokemonInfo = x.map(function (y) {
          return y[0];
        });
        //For every object (y) in the relevantPokemonInfo array.
        relevantPokemonInfo.forEach(function (y) {
          // Destructure values desired (*optional* just makes typing easier later)
          // For each object in the relevantPokemonInfo array, create an option that stores the object's name property as it's value attribute.
          // Target the data list which will hold all our options.
          // For every object in the relevantPokemonInfo array, append the option element that was created.
          // For each object in the types endpoint, create a factory function that returns a pokemon with properties we want to use for the suggestions box.
          const { name, types, id} = y;
          const eachPokemon = $('<option>').attr('value', name).text(name);
          const pokeList = $('#poke-list');
          pokeList.append(eachPokemon);
          types.forEach(object => {
            // Factory function
            const factoryPokemon = (name, id) => {
              return {
                name,
                id,
                type: types[0].type.name
              };
            };
            switch(object.type.name) {
              case 'fire': 
                fireArray.push(factoryPokemon(name, id));
                break;
              case 'water': 
                waterArray.push(factoryPokemon(name, id));
                break;
              case 'grass': 
                grassArray.push(factoryPokemon(name, id));
                break;
              case 'flying': 
                flyingArray.push(factoryPokemon(name, id));
                break;
              case 'poison': 
                poisonArray.push(factoryPokemon(name, id));
                break;
              case 'fighting': 
                fightingArray.push(factoryPokemon(name, id));
                break;
              case 'ice': 
                iceArray.push(factoryPokemon(name, id));
                break;
              case 'electric': 
                electricArray.push(factoryPokemon(name, id));
                break;
              case 'psychic': 
                psychicArray.push(factoryPokemon(name, id));
                break;
              case 'ground': 
                groundArray.push(factoryPokemon(name, id));
                break;
              case 'rock': 
                rockArray.push(factoryPokemon(name, id));
                break;
              case 'ghost': 
                ghostArray.push(factoryPokemon(name, id));
                break;
              case 'fairy': 
                fairyArray.push(factoryPokemon(name, id));
                break;
              case 'normal': 
                normalArray.push(factoryPokemon(name, id));
                break;
              case 'bug': 
                bugArray.push(factoryPokemon(name, id));
                break;
              case 'steel': 
                steelArray.push(factoryPokemon(name, id));
                break;
              case 'dark': 
                darkArray.push(factoryPokemon(name, id));
                break;
              case 'dragon': 
                dragonArray.push(factoryPokemon(name, id));
                break;
            }
          })
        });
        // #pokeball is the button element that comes after the input element.
        // When the button is clicked...
        $('#pokeball').on('click', function (e) {
          // Store the current value of the input element.
          e.preventDefault();       
          $(`html,body`).animate({
            scrollTop: $('.picked-pokemon').offset().top
          }, 1500);
          emptyAll();
          let current = $('#search-text').val();
          // For every object in relevantPokemonInfo....
          relevantPokemonInfo.forEach(function (item) {
            // If, that object's name property is the same as the current input the user selected then create variables based on the object's properties.
            if (item.name === current) {
              const HP = item.stats[0].base_stat;
              const attack = item.stats[1].base_stat;
              const defense = item.stats[2].base_stat;
              const speed = item.stats[5].base_stat;
              const weight = item.weight / 10;
              const height = item.height * 10;
              const pokeID = item.id;
              const pokeName = item.name;
              const elementType = item.types[0].type.name;
              const image = `https://img.pokemondb.net/artwork/large/${pokeName}.jpg`;
              // Main Template
              const displayPokemon = `
              <h2>${pokeName}</h2>
              <div class="display-results wrapper">
                <div class="poke-image ${elementType}">
                  <img src="${image}" alt="${pokeName}">
                </div>
                <div class="pokemon-info">
                  <div class="base-stats">
                    <ul>
                      <li><i class="fas fa-id-badge"></i><h3>ID</h3><span>${pokeID}</span></li>
                      <li><i class="fas fa-fire"></i><h3>Type</h3><span class="type">${elementType}</span></li>
                      <li><i class="fas fa-ruler-combined"></i><h3>Height</h3><span>${height} cm</span></li>
                      <li><i class="fas fa-weight-hanging"></i><h3>Weight</h3><span>${weight} kg</span></li>
                    </ul>
                  </div>
                  <div class="battle-stats">
                    <ul>
                      <li><i class="fas fa-heart"></i><h3>Health</h3><span>${HP}</span></li>
                      <li><i class="fas fa-meteor"></i><h3>Attack</h3><span>${attack}</span></li>
                      <li><i class="fas fa-shield-alt"></i><h3>Defense</h3><span>${defense}</span></li>
                      <li><i class="fas fa-wind"></i><h3>Speed</h3><span>${speed}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="next-section">
                <a class="paint-holder" href="#because-you-like">
                  <span class="paint"></span>
                  <span class="paint"></span>
                  <span class="paint"></span>
                  <span class="paint"></span>
                  <span class="label">Find More</span>
                </a>
              </div>
              `;
              // Footer Template
              const displayFooter =`
              <p>Created by <a href="https://github.com/Callyhobbes" target="_blank">Cally</a> and <a href="https://github.com/asif-a-khan" target="_blank">Asif</a> at <a href="https://junocollege.com" target="_blank">Juno College</a> <i class="fab fa-canadian-maple-leaf"></i></p>
              `;
              // Suggested pokemon template
              const suggestedPokemon = `
                <h2>Other Pokemon You May Like</h2>
                <div class="suggestion-results"></div>
                <div class="next-section">
                  <a class="paint-holder" id="secondButton" href="#start">
                    <span class="paint"></span>
                    <span class="paint"></span>
                    <span class="paint"></span>
                    <span class="paint"></span>
                    <span class="label">Try Again</span>
                  </a>
                </div>
                `;
              
              $('.picked-pokemon').append(displayPokemon);
              $('footer').append(displayFooter);
              
              // Based on the pokemon's type, display related pokemon.
              if (elementType === 'fire') {
                // Create a copy of the array that contains the current element's pokemon to manipulate.
                const copiedArray = fireArray.map(x => x);
                // RUn this block of code as many times as it takes to go through the copied array.
                for (let i = 0; i < copiedArray.length; i++) {
                  // For every object in copiedArray at index[i], if, the object's name is = the selected pokemon's name. Then, do this.
                  if (copiedArray[i].name === current) {
                    // Save this object's index in the copied array.
                    const selectedIndex = copiedArray.indexOf(copiedArray[i]);
                    // Remove selected pokemon from copied array.
                    copiedArray.splice(selectedIndex, 1);
                  };
                };
                // Loop through this array backwards. 
                copiedArray.shuffle();
                // Append title to suggestion area.
                $('.liked').append(suggestedPokemon);
                // Create html template for pokemon to be displayed. 
                // Run this code 4 times.
                for (let i = 0; i < 4; i++) {
                  const pokemonHolder = `
                  <div class="pokemon-holder ${elementType}" value="${copiedArray[i].id}">
                    <h3>${copiedArray[i].name}</h3>
                    <img src="https://img.pokemondb.net/artwork/large/${copiedArray[i].name}.jpg" alt="A picture of ${copiedArray[i].name}">
                  </div>
                  `;
                  $('.suggestion-results').append(pokemonHolder);
                };
                // REPEAT THIS IF STATEMENT FOR ALL OTHER ELEMENTS. MAKE SURE COPIED ARRAY IS COPYING THE RESPECTIVE ELEMENT'S ARRAY.
              } else if (elementType === 'water') {
                const copiedArray = waterArray.map(x => x);
                for (let i = 0; i < copiedArray.length; i++) {
                  if (copiedArray[i].name === current) {
                    const selectedIndex = copiedArray.indexOf(copiedArray[i]);
                    copiedArray.splice(selectedIndex, 1);
                  };
                };
                copiedArray.shuffle();
                $('.liked').append(suggestedPokemon);
                for (let i = 0; i < 4; i++) {
                  const pokemonHolder = `
                  <div class="pokemon-holder ${elementType}" value="${copiedArray[i].id}">
                    <h3>${copiedArray[i].name}</h3>
                    <img src="https://img.pokemondb.net/artwork/large/${copiedArray[i].name}.jpg" alt="A picture of ${copiedArray[i].name}">
                  </div>
                  `;
                  $('.suggestion-results').append(pokemonHolder);
                };
              } else if (elementType === 'grass') {
                const copiedArray = grassArray.map(x => x);
                for (let i = 0; i < copiedArray.length; i++) {
                  if (copiedArray[i].name === current) {
                    const selectedIndex = copiedArray.indexOf(copiedArray[i]);
                    copiedArray.splice(selectedIndex, 1);
                  };
                };
                copiedArray.shuffle();
                $('.liked').append(suggestedPokemon);
                for (let i = 0; i < 4; i++) {
                  const pokemonHolder = `
                  <div class="pokemon-holder ${elementType}" value="${copiedArray[i].id}">
                    <h3>${copiedArray[i].name}</h3>
                    <img src="https://img.pokemondb.net/artwork/large/${copiedArray[i].name}.jpg" alt="A picture of ${copiedArray[i].name}">
                  </div>
                  `;
                  $('.suggestion-results').append(pokemonHolder);
                };
              } else if (elementType === 'electric') {
                const copiedArray = electricArray.map(x => x);
                for (let i = 0; i < copiedArray.length; i++) {
                  if (copiedArray[i].name === current) {
                    const selectedIndex = copiedArray.indexOf(copiedArray[i]);
                    copiedArray.splice(selectedIndex, 1);
                  };
                };
                copiedArray.shuffle();
                $('.liked').append(suggestedPokemon);
                for (let i = 0; i < 4; i++) {
                  const pokemonHolder = `
                  <div class="pokemon-holder ${elementType}" value="${copiedArray[i].id}">
                    <h3>${copiedArray[i].name}</h3>
                    <img src="https://img.pokemondb.net/artwork/large/${copiedArray[i].name}.jpg" alt="A picture of ${copiedArray[i].name}">
                  </div>
                  `;
                  $('.suggestion-results').append(pokemonHolder);
                };
              } else if (elementType === 'poison') {
                const copiedArray = poisonArray.map(x => x);
                for (let i = 0; i < copiedArray.length; i++) {
                  if (copiedArray[i].name === current) {
                    const selectedIndex = copiedArray.indexOf(copiedArray[i]);
                    copiedArray.splice(selectedIndex, 1);
                  };
                };
                copiedArray.shuffle();
                $('.liked').append(suggestedPokemon);
                for (let i = 0; i < 4; i++) {
                  const pokemonHolder = `
                  <div class="pokemon-holder ${elementType}" value="${copiedArray[i].id}">
                    <h3>${copiedArray[i].name}</h3>
                    <img src="https://img.pokemondb.net/artwork/large/${copiedArray[i].name}.jpg" alt="A picture of ${copiedArray[i].name}">
                  </div>
                  `;
                  $('.suggestion-results').append(pokemonHolder);
                };
              } else if (elementType === 'rock') {
                const copiedArray = rockArray.map(x => x);
                for (let i = 0; i < copiedArray.length; i++) {
                  if (copiedArray[i].name === current) {
                    const selectedIndex = copiedArray.indexOf(copiedArray[i]);
                    copiedArray.splice(selectedIndex, 1);
                  };
                };
                copiedArray.shuffle();
                $('.liked').append(suggestedPokemon);
                for (let i = 0; i < 4; i++) {
                  const pokemonHolder = `
                  <div class="pokemon-holder ${elementType}" value="${copiedArray[i].id}">
                    <h3>${copiedArray[i].name}</h3>
                    <img src="https://img.pokemondb.net/artwork/large/${copiedArray[i].name}.jpg" alt="A picture of ${copiedArray[i].name}">
                  </div>
                  `;
                  $('.suggestion-results').append(pokemonHolder);
                };
              } else if (elementType === 'ground') {
                const copiedArray = groundArray.map(x => x);
                for (let i = 0; i < copiedArray.length; i++) {
                  if (copiedArray[i].name === current) {
                    const selectedIndex = copiedArray.indexOf(copiedArray[i]);
                    copiedArray.splice(selectedIndex, 1);
                  };
                };
                copiedArray.shuffle();
                $('.liked').append(suggestedPokemon);
                for (let i = 0; i < 4; i++) {
                  const pokemonHolder = `
                  <div class="pokemon-holder ${elementType}" value="${copiedArray[i].id}">
                    <h3>${copiedArray[i].name}</h3>
                    <img src="https://img.pokemondb.net/artwork/large/${copiedArray[i].name}.jpg" alt="A picture of ${copiedArray[i].name}">
                  </div>
                  `;
                  $('.suggestion-results').append(pokemonHolder);
                };
              } else if (elementType === 'fighting') {
                const copiedArray = fightingArray.map(x => x);
                for (let i = 0; i < copiedArray.length; i++) {
                  if (copiedArray[i].name === current) {
                    const selectedIndex = copiedArray.indexOf(copiedArray[i]);
                    copiedArray.splice(selectedIndex, 1);
                  };
                };
                copiedArray.shuffle();
                $('.liked').append(suggestedPokemon);
                for (let i = 0; i < 4; i++) {
                  const pokemonHolder = `
                  <div class="pokemon-holder ${elementType}" value="${copiedArray[i].id}">
                    <h3>${copiedArray[i].name}</h3>
                    <img src="https://img.pokemondb.net/artwork/large/${copiedArray[i].name}.jpg" alt="A picture of ${copiedArray[i].name}">
                  </div>
                  `;
                  $('.suggestion-results').append(pokemonHolder);
                };
              } else if (elementType === 'flying') {
                const copiedArray = flyingArray.map(x => x);
                for (let i = 0; i < copiedArray.length; i++) {
                  if (copiedArray[i].name === current) {
                    const selectedIndex = copiedArray.indexOf(copiedArray[i]);
                    copiedArray.splice(selectedIndex, 1);
                  };
                };
                copiedArray.shuffle();
                $('.liked').append(suggestedPokemon);
                for (let i = 0; i < 4; i++) {
                  const pokemonHolder = `
                  <div class="pokemon-holder ${elementType}" value="${copiedArray[i].id}">
                    <h3>${copiedArray[i].name}</h3>
                    <img src="https://img.pokemondb.net/artwork/large/${copiedArray[i].name}.jpg" alt="A picture of ${copiedArray[i].name}">
                  </div>
                  `;
                  $('.suggestion-results').append(pokemonHolder);
                };
              } else if (elementType === 'psychic') {
                const copiedArray = psychicArray.map(x => x);
                for (let i = 0; i < copiedArray.length; i++) {
                  if (copiedArray[i].name === current) {
                    const selectedIndex = copiedArray.indexOf(copiedArray[i]);
                    copiedArray.splice(selectedIndex, 1);
                  };
                };
                copiedArray.shuffle();
                $('.liked').append(suggestedPokemon);
                for (let i = 0; i < 4; i++) {
                  const pokemonHolder = `
                  <div class="pokemon-holder ${elementType}" value="${copiedArray[i].id}">
                    <h3>${copiedArray[i].name}</h3>
                    <img src="https://img.pokemondb.net/artwork/large/${copiedArray[i].name}.jpg" alt="A picture of ${copiedArray[i].name}">
                  </div>
                  `;
                  $('.suggestion-results').append(pokemonHolder);
                };
              } else if (elementType === 'ice') {
                const copiedArray = iceArray.map(x => x);
                for (let i = 0; i < copiedArray.length; i++) {
                  if (copiedArray[i].name === current) {
                    const selectedIndex = copiedArray.indexOf(copiedArray[i]);
                    copiedArray.splice(selectedIndex, 1);
                  };
                };
                copiedArray.shuffle();
                $('.liked').append(suggestedPokemon);
                for (let i = 0; i < 4; i++) {
                  const pokemonHolder = `
                  <div class="pokemon-holder ${elementType}" value="${copiedArray[i].id}">
                    <h3>${copiedArray[i].name}</h3>
                    <img src="https://img.pokemondb.net/artwork/large/${copiedArray[i].name}.jpg" alt="A picture of ${copiedArray[i].name}">
                  </div>
                  `;
                  $('.suggestion-results').append(pokemonHolder);
                };
              } else if (elementType === 'steel') {
                const copiedArray = steelArray.map(x => x);
                for (let i = 0; i < copiedArray.length; i++) {
                  if (copiedArray[i].name === current) {
                    const selectedIndex = copiedArray.indexOf(copiedArray[i]);
                    copiedArray.splice(selectedIndex, 1);
                  };
                };
                copiedArray.shuffle();
                $('.liked').append(suggestedPokemon);
                for (let i = 0; i < 4; i++) {
                  const pokemonHolder = `
                  <div class="pokemon-holder ${elementType}" value="${copiedArray[i].id}">
                    <h3>${copiedArray[i].name}</h3>
                    <img src="https://img.pokemondb.net/artwork/large/${copiedArray[i].name}.jpg" alt="A picture of ${copiedArray[i].name}">
                  </div>
                  `;
                  $('.suggestion-results').append(pokemonHolder);
                };
              } else if (elementType === 'bug') {
                const copiedArray = bugArray.map(x => x);
                for (let i = 0; i < copiedArray.length; i++) {
                  if (copiedArray[i].name === current) {
                    const selectedIndex = copiedArray.indexOf(copiedArray[i]);
                    copiedArray.splice(selectedIndex, 1);
                  };
                };
                copiedArray.shuffle();
                $('.liked').append(suggestedPokemon);
                for (let i = 0; i < 4; i++) {
                  const pokemonHolder = `
                  <div class="pokemon-holder ${elementType}" value="${copiedArray[i].id}">
                    <h3>${copiedArray[i].name}</h3>
                    <img src="https://img.pokemondb.net/artwork/large/${copiedArray[i].name}.jpg" alt="A picture of ${copiedArray[i].name}">
                  </div>
                  `;
                  $('.suggestion-results').append(pokemonHolder);
                };
              } else if (elementType === 'ghost') {
                const copiedArray = ghostArray.map(x => x);
                for (let i = 0; i < copiedArray.length; i++) {
                  if (copiedArray[i].name === current) {
                    const selectedIndex = copiedArray.indexOf(copiedArray[i]);
                    copiedArray.splice(selectedIndex, 1);
                  };
                };
                copiedArray.shuffle();
                $('.liked').append(suggestedPokemon);
                for (let i = 0; i < 4; i++) {
                  const pokemonHolder = `
                  <div class="pokemon-holder ${elementType}" value="${copiedArray[i].id}">
                    <h3>${copiedArray[i].name}</h3>
                    <img src="https://img.pokemondb.net/artwork/large/${copiedArray[i].name}.jpg" alt="A picture of ${copiedArray[i].name}">
                  </div>
                  `;
                  $('.suggestion-results').append(pokemonHolder);
                };
              } else if (elementType === 'fairy') {
                const copiedArray = fairyArray.map(x => x);
                for (let i = 0; i < copiedArray.length; i++) {
                  if (copiedArray[i].name === current) {
                    const selectedIndex = copiedArray.indexOf(copiedArray[i]);
                    copiedArray.splice(selectedIndex, 1);
                  };
                };
                copiedArray.shuffle();
                $('.liked').append(suggestedPokemon);
                for (let i = 0; i < 4; i++) {
                  const pokemonHolder = `
                  <div class="pokemon-holder ${elementType}" value="${copiedArray[i].id}">
                    <h3>${copiedArray[i].name}</h3>
                    <img src="https://img.pokemondb.net/artwork/large/${copiedArray[i].name}.jpg" alt="A picture of ${copiedArray[i].name}">
                  </div>
                  `;
                  $('.suggestion-results').append(pokemonHolder);
                };
              } else if (elementType === 'normal') {
                const copiedArray = normalArray.map(x => x);
                for (let i = 0; i < copiedArray.length; i++) {
                  if (copiedArray[i].name === current) {
                    const selectedIndex = copiedArray.indexOf(copiedArray[i]);
                    copiedArray.splice(selectedIndex, 1);
                  };
                };
                copiedArray.shuffle();
                $('.liked').append(suggestedPokemon);
                for (let i = 0; i < 4; i++) {
                  const pokemonHolder = `
                  <div class="pokemon-holder ${elementType}" value="${copiedArray[i].id}">
                    <h3>${copiedArray[i].name}</h3>
                    <img src="https://img.pokemondb.net/artwork/large/${copiedArray[i].name}.jpg" alt="A picture of ${copiedArray[i].name}">
                  </div>
                  `;
                  $('.suggestion-results').append(pokemonHolder);
                };
              } else if (elementType === 'dragon'){
                const copiedArray = dragonArray.map(x => x);
                for (let i = 0; i < copiedArray.length; i++) {
                  if (copiedArray[i].name === current) {
                    const selectedIndex = copiedArray.indexOf(copiedArray[i]);
                    copiedArray.splice(selectedIndex, 1);
                  };
                };
                copiedArray.shuffle();
                $('.liked').append(suggestedPokemon);
                for (let i = 0; i < 4; i++) {
                  const pokemonHolder = `
                  <div class="pokemon-holder ${elementType}" value="${copiedArray[i].id}">
                    <h3>${copiedArray[i].name}</h3>
                    <img src="https://img.pokemondb.net/artwork/large/${copiedArray[i].name}.jpg" alt="A picture of ${copiedArray[i].name}">
                  </div>
                  `;
                  $('.suggestion-results').append(pokemonHolder);
                };
              } else if (elementType === 'dark'){
                const copiedArray = darkArray.map(x => x);
                for (let i = 0; i < copiedArray.length; i++) {
                  if (copiedArray[i].name === current) {
                    const selectedIndex = copiedArray.indexOf(copiedArray[i]);
                    copiedArray.splice(selectedIndex, 1);
                  };
                };
                copiedArray.shuffle();
                $('.liked').append(suggestedPokemon);
                for (let i = 0; i < 4; i++) {
                  const pokemonHolder = `
                  <div class="pokemon-holder ${elementType}" value="${copiedArray[i].id}">
                    <h3>${copiedArray[i].name}</h3>
                    <img src="https://img.pokemondb.net/artwork/large/${copiedArray[i].name}.jpg" alt="A picture of ${copiedArray[i].name}">
                  </div>
                  `;
                  $('.suggestion-results').append(pokemonHolder);
                };
              };
            };
          });
        });
      })
      //in case one or more promises resolves unsuccessfully
      .fail(function (noPokemon) {
        const nothingFound =`
        Sorry, it looks like the pokeball was empty. Try again!
        `;
        $('.error').text(nothingFound);
      })
  },
};

$(function () {
  app.init();
});