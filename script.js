// Time-out for preload of pokeball icon bouncing
setTimeout(function () {
  $('.preloader').fadeToggle();
}, 4000);

const app = {
  // Root Api
  rootApi: 'https://pokeapi.co/api/v2/',
  // Initialize all necessary methods.
  init() {
    app.loop();
  },
  // This will make an ajax call to the pokemon api at whatever endpoint is specified in the parameter.
  callApi(x) {
    return $.ajax({
      url: app.rootApi + x,
      method: 'GET',
      dataType: 'json'
    })
  },
  // Logic for searchbox
  loop() {
    // Create an empty array
    const cachedPokemon = [];
    // Run this block of code 151 times because, gen 1 duh.
    for (let i = 1; i <= 151; i++) {
      // Everytime this block is run iterate through the pokemon endpoints using i as the id. Push each ajax promise object into the empty array.
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

        //For every object (y) in the relevantPokemonInfo array, create/target the following elements using information from each object.
        relevantPokemonInfo.forEach(function (y) {
          // console.log(y);
          // Destructure values desired (*optional* just makes typing easier later)
          const { name, type } = y;
          // For each object in the relevantPokemonInfo array, create an option that stores the object's name property as it's value attribute.
          const test = $('<option>').attr('value', name).text(name);
          // Target the data list which will hold all our options.
          const testList = $('#testList');
          // For every object in the relevantPokemonInfo array, append the option element that was created.
          testList.append(test);
        });

        // Input2 is the button element that comes after the input element.
        // When the button is clicked...
        $('#input2').on('click', function (e) {
          // Don't reset the input field.
          e.preventDefault();
          // Then empty the area you want to append the pokemon to so that only 1 pokemon is shown at a time.
          $('#tester').empty();
          // Store the current value of the input element.
          const current = $('#input1').val();

          // For every object in relevantPokemonInfo....
          relevantPokemonInfo.forEach(function (item) {
            console.log(item);
          //   // If, that object's name property is the same as the current input the user selected then...
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
              const image = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`;

              const displayPokemon = `
              <h2>${pokeName}</h2>
              <div class="display-results wrapper">
                <img src="${image}" alt="${pokeName}">
                <div class="pokemon-info">
                  <div class="base-stats">
                    <ul>
                      <li><i class="fas fa-id-badge"></i><h3>Poke ID</h3><span>${pokeID}</span></li>
                      <li><i class="fas fa-fire"></i><h3>Type</h3><span class="type">${elementType}</span></li>
                      <li><i class="fas fa-ruler-combined"></i><h3>Height</h3><span>${height} cm</span></li>
                      <li><i class="fas fa-ruler-combined"></i><h3>Weight</h3><span>${weight} kg</span></li>
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
              `;

              const footer = `<p>Created by <a href="https://github.com/Callyhobbes" target="_blank">Cally</a> and <a href="https://github.com/asif-a-khan" target="_blank">Asif</a> at <a href="https://junocollege.com" target="_blank">Juno College</a> <i class="fab fa-canadian-maple-leaf"></i></p>`;

              $('#tester').append(displayPokemon);
              $('footer').append(footer);
            };
          });
        });
      })
      //in case one or more promises resolves unsuccessfully
      .fail(function (noPokemon) {
        console.log(noPokemon);
      })
  },
};

$(function () {
  app.init();
});