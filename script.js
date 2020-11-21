// Hitting the fisher yates shuffle babyyyyyy.
Array.prototype.shuffle = function() {
  let i = this.length;
  while(--i > 0) {
    let j = Math.floor(Math.random() * (1 + i));
    let temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  };
  return this;
}
// Time-out for preload of pokeball icon bouncing
setTimeout(function () {
  $('.preloader').fadeToggle();
}, 4000);

// smooth scroll from picked-pokemon to because you like section
$('.picked-pokemon').on('click', 'a', function () {
  $('.liked').show();
  $(`html,body`).animate({
    scrollTop: $('#because-you-like').offset().top
  }, 1500);
});

$('.liked').on('click', 'a', function () {
  // empty the results
  $('.liked').empty();
  $('.picked-pokemon').empty();
  $('footer').empty();
  // clear the form's checked inputs
  $('html').trigger('reset');
  //smooth scroll to top
  $(`html,body`).animate({
    scrollTop: $('#start').offset().top
  }, 1500);
});


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
          const { name, types, id} = y;
          // For each object in the relevantPokemonInfo array, create an option that stores the object's name property as it's value attribute.
          const test = $('<option>').attr('value', name).text(name);
          // Target the data list which will hold all our options.
          const testList = $('#testList');
          // For every object in the relevantPokemonInfo array, append the option element that was created.
          testList.append(test);
          // For each object in the types endpoint, create a factory function that returns a pokemon with properties we want to use for the suggestions box.
          types.forEach(object => {
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
                }
          })
          
        });
        // #pokeball is the button element that comes after the input element.
        // When the button is clicked...
        $('#pokeball').on('click', function (e) {

          // Don't reset the input field.
          e.preventDefault();
          
          //smooth scroll to the picked pokemon section
          $(`html,body`).animate({
            scrollTop: $('.picked-pokemon').offset().top
          }, 1500);
          
          // Then empty the area you want to append the pokemon to so that only 1 pokemon is shown at a time.
          $('.picked-pokemon').empty();
          $('.liked').empty();

          // Store the current value of the input element.
          let current = $('#input1').val();

          // For every object in relevantPokemonInfo....
          relevantPokemonInfo.forEach(function (item) {

            // If, that object's name property is the same as the current input the user selected then...
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
                <div class="poke-image ${elementType}">
                  <img src="${image}" alt="${pokeName}">
                </div>
                <div class="pokemon-info">
                  <div class="base-stats">
                    <ul>
                      <li><i class="fas fa-id-badge"></i><h3>ID</h3><span>${pokeID}</span></li>
                      <li><i class="fas fa-fire"></i><h3>Type</h3><span class="type">${elementType}</span></li>
                      <li><i class="fas fa-ruler-combined"></i><h3>Height</h3><span>${height} cm</span></li>
                      <li><i class="fas fa-ruler-combined"></i><h3>Weight</h3><span>${weight} kg</span></li>
                    </ul>
                  </div>
                  <div class="battle-stats">
                    <ul>
                      <li><i class="fas fa-heart"></i><h3>HP</h3><span>${HP}</span></li>
                      <li><i class="fas fa-meteor"></i><h3>Attack</h3><span>${attack}</span></li>
                      <li><i class="fas fa-shield-alt"></i><h3>Defense</h3><span>${defense}</span></li>
                      <li><i class="fas fa-wind"></i><h3>Speed</h3><span>${speed}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="next-section wrapper">
                <a href="#because-you-like">Find More</a>
              </div>
              `;

              const displayFooter =`
              <p>Created by <a href="https://github.com/Callyhobbes" target="_blank">Cally</a> and <a href="https://github.com/asif-a-khan" target="_blank">Asif</a> at <a href="https://junocollege.com" target="_blank">Juno College</a> <i class="fab fa-canadian-maple-leaf"></i></p>
              `;

              const suggestedPokemon = `
                <h2>Other Pokemon You May Like</h2>
                <div class="suggestion-results"></div>
                <div class="next-section wrapper">
                  <a href="#start">Find More</a>
                </div>
                `;

              $('.picked-pokemon').append(displayPokemon);
              $('footer').append(displayFooter);
              
              // If the selected pokemon's type is fire do this
              if (elementType === 'fire') {
                // Create a copy of fireArray to manipulate.
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
                // Run this code 4 times.
                for (let i = 0; i < 4; i++) {
                  // Create a div containing the pokemon name and image.
                  const displayRecImg = `<img src="https://pokeres.bastionbot.org/images/pokemon/${copiedArray[i].id}.png">`;
                  const displayRecName = $('<h3>').text(copiedArray[i].name); 
                  const displayRec = $('<div>').attr('value', copiedArray[i].id).addClass('pokemon-holder').append(displayRecName, displayRecImg);
                  // Append the div into the suggestion area.
                  $('.suggestion-results').append(displayRec);
                  // REPEAT THIS IF STATEMENT FOR ALL OTHER ELEMENTS. MAKE SURE COPIED ARRAY IS COPYING THE RESPECTIVE ELEMENT'S ARRAY.
                };
              } else if (elementType === 'water') {
                const copiedArray = waterArray.map(x => x);
                for (let i = 0; i < copiedArray.length; i++) {
                  if (copiedArray[i].name === current) {
                    const selectedIndex = copiedArray.indexOf(copiedArray[i]);
                    const removed = copiedArray.splice(selectedIndex, 1);
                  };
                };
                copiedArray.shuffle();
                

                $('.liked').append(suggestedPokemon);
                for (let i = 0; i < 4; i++) {
                  const displayRecImg = `<img src="https://pokeres.bastionbot.org/images/pokemon/${copiedArray[i].id}.png">`;
                  const displayRecName = $('<h3>').text(copiedArray[i].name);
                  const displayRec = $('<div>').attr('value', copiedArray[i].id).addClass('pokemon-holder').append(displayRecName, displayRecImg);
                  // Append the div into the suggestion area.
                  $('.suggestion-results').append(displayRec);
                };
              } else if (elementType === 'grass') {
                // Create a copy of fireArray to manipulate.
                const copiedArray = grassArray.map(x => x);
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
                
                $('.liked').append(suggestedPokemon);

                // Run this code 4 times.
                for (let i = 0; i < 4; i++) {
                  // Create a div containing the pokemon name and image.
                  const displayRecImg = `<img src="https://pokeres.bastionbot.org/images/pokemon/${copiedArray[i].id}.png">`;
                  const displayRecName = $('<h3>').text(copiedArray[i].name);
                  const displayRec = $('<div>').attr('value', copiedArray[i].id).addClass('pokemon-holder').append(displayRecName, displayRecImg);
                  // Append the div into the suggestion area.
                  $('.suggestion-results').append(displayRec);
                  // REPEAT THIS IF STATEMENT FOR ALL OTHER ELEMENTS. MAKE SURE COPIED ARRAY IS COPYING THE RESPECTIVE ELEMENT'S ARRAY.
                };
              } else if (elementType === 'electric') {
                // Create a copy of fireArray to manipulate.
                const copiedArray = electricArray.map(x => x);
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
                // Testing array
                console.log(copiedArray);
                // Create Title for suggestion area (REWRITE)
                
                $('.liked').append(suggestedPokemon);

                // Run this code 4 times.
                for (let i = 0; i < 4; i++) {
                  // Create a div containing the pokemon name and image.
                  const displayRecImg = `<img src="https://pokeres.bastionbot.org/images/pokemon/${copiedArray[i].id}.png">`;
                  const displayRecName = $('<h3>').text(copiedArray[i].name); 
                  const displayRec = $('<div>').attr('value', copiedArray[i].id).addClass('pokemon-holder').append(displayRecName, displayRecImg);
                  // const newTestWrap = $('<div>').attr('id', 'newTestWrap').append(displayRec);
                  // Append the div into the suggestion area.
                  $('.suggestion-results').append(displayRec);
                  // REPEAT THIS IF STATEMENT FOR ALL OTHER ELEMENTS. MAKE SURE COPIED ARRAY IS COPYING THE RESPECTIVE ELEMENT'S ARRAY.
                };
              } else if (elementType === 'poison') {
                // Create a copy of fireArray to manipulate.
                const copiedArray = poisonArray.map(x => x);
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
                // Testing array
                console.log(copiedArray);
                // Create Title for suggestion area (REWRITE)
                
                $('.liked').append(suggestedPokemon);

                // Run this code 4 times.
                for (let i = 0; i < 4; i++) {
                  // Create a div containing the pokemon name and image.
                  const displayRecImg = `<img src="https://pokeres.bastionbot.org/images/pokemon/${copiedArray[i].id}.png">`;
                  const displayRecName = $('<h3>').text(copiedArray[i].name); 
                  const displayRec = $('<div>').attr('value', copiedArray[i].id).addClass('pokemon-holder').append(displayRecName, displayRecImg);
                  // const newTestWrap = $('<div>').attr('id', 'newTestWrap').append(displayRec);
                  // Append the div into the suggestion area.
                  $('.suggestion-results').append(displayRec);
                  // REPEAT THIS IF STATEMENT FOR ALL OTHER ELEMENTS. MAKE SURE COPIED ARRAY IS COPYING THE RESPECTIVE ELEMENT'S ARRAY.
                };
              } else if (elementType === 'rock') {
                // Create a copy of fireArray to manipulate.
                const copiedArray = rockArray.map(x => x);
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
                // Testing array
                console.log(copiedArray);
                // Create Title for suggestion area (REWRITE)
                
                $('.liked').append(suggestedPokemon);

                // Run this code 4 times.
                for (let i = 0; i < 4; i++) {
                  // Create a div containing the pokemon name and image.
                  const displayRecImg = `<img src="https://pokeres.bastionbot.org/images/pokemon/${copiedArray[i].id}.png">`;
                  const displayRecName = $('<h3>').text(copiedArray[i].name); 
                  const displayRec = $('<div>').attr('value', copiedArray[i].id).addClass('pokemon-holder').append(displayRecName, displayRecImg);
                  // const newTestWrap = $('<div>').attr('id', 'newTestWrap').append(displayRec);
                  // Append the div into the suggestion area.
                  $('.suggestion-results').append(displayRec);
                  // REPEAT THIS IF STATEMENT FOR ALL OTHER ELEMENTS. MAKE SURE COPIED ARRAY IS COPYING THE RESPECTIVE ELEMENT'S ARRAY.
                };
              } else if (elementType === 'ground') {
                // Create a copy of fireArray to manipulate.
                const copiedArray = groundArray.map(x => x);
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
                // Testing array
                console.log(copiedArray);
                // Create Title for suggestion area (REWRITE)
                
                $('.liked').append(suggestedPokemon);

                // Run this code 4 times.
                for (let i = 0; i < 4; i++) {
                  // Create a div containing the pokemon name and image.
                  const displayRecImg = `<img src="https://pokeres.bastionbot.org/images/pokemon/${copiedArray[i].id}.png">`;
                  const displayRecName = $('<h3>').text(copiedArray[i].name); 
                  const displayRec = $('<div>').attr('value', copiedArray[i].id).addClass('pokemon-holder').append(displayRecName, displayRecImg);
                  // const newTestWrap = $('<div>').attr('id', 'newTestWrap').append(displayRec);
                  // Append the div into the suggestion area.
                  $('.suggestion-results').append(displayRec);
                  // REPEAT THIS IF STATEMENT FOR ALL OTHER ELEMENTS. MAKE SURE COPIED ARRAY IS COPYING THE RESPECTIVE ELEMENT'S ARRAY.
                };
              } else if (elementType === 'fighting') {
                // Create a copy of fireArray to manipulate.
                const copiedArray = fightingArray.map(x => x);
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
                // Testing array
                console.log(copiedArray);
                // Create Title for suggestion area (REWRITE)
                
                $('.liked').append(suggestedPokemon);

                // Run this code 4 times.
                for (let i = 0; i < 4; i++) {
                  // Create a div containing the pokemon name and image.
                  const displayRecImg = `<img src="https://pokeres.bastionbot.org/images/pokemon/${copiedArray[i].id}.png">`;
                  const displayRecName = $('<h3>').text(copiedArray[i].name); 
                  const displayRec = $('<div>').attr('value', copiedArray[i].id).addClass('pokemon-holder').append(displayRecName, displayRecImg);
                  // const newTestWrap = $('<div>').attr('id', 'newTestWrap').append(displayRec);
                  // Append the div into the suggestion area.
                  $('.suggestion-results').append(displayRec);
                  // REPEAT THIS IF STATEMENT FOR ALL OTHER ELEMENTS. MAKE SURE COPIED ARRAY IS COPYING THE RESPECTIVE ELEMENT'S ARRAY.
                };
              } else if (elementType === 'flying') {
                // Create a copy of fireArray to manipulate.
                const copiedArray = flyingArray.map(x => x);
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
                // Testing array
                console.log(copiedArray);
                // Create Title for suggestion area (REWRITE)
                
                $('.liked').append(suggestedPokemon);

                // Run this code 4 times.
                for (let i = 0; i < 4; i++) {
                  // Create a div containing the pokemon name and image.
                  const displayRecImg = `<img src="https://pokeres.bastionbot.org/images/pokemon/${copiedArray[i].id}.png">`;
                  const displayRecName = $('<h3>').text(copiedArray[i].name); 
                  const displayRec = $('<div>').attr('value', copiedArray[i].id).addClass('pokemon-holder').append(displayRecName, displayRecImg);
                  // const newTestWrap = $('<div>').attr('id', 'newTestWrap').append(displayRec);
                  // Append the div into the suggestion area.
                  $('.suggestion-results').append(displayRec);
                  // REPEAT THIS IF STATEMENT FOR ALL OTHER ELEMENTS. MAKE SURE COPIED ARRAY IS COPYING THE RESPECTIVE ELEMENT'S ARRAY.
                };
              } else if (elementType === 'psychic') {
                // Create a copy of fireArray to manipulate.
                const copiedArray = psychicArray.map(x => x);
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
                // Testing array
                console.log(copiedArray);
                // Create Title for suggestion area (REWRITE)
                
                $('.liked').append(suggestedPokemon);

                // Run this code 4 times.
                for (let i = 0; i < 4; i++) {
                  // Create a div containing the pokemon name and image.
                  const displayRecImg = `<img src="https://pokeres.bastionbot.org/images/pokemon/${copiedArray[i].id}.png">`;
                  const displayRecName = $('<h3>').text(copiedArray[i].name); 
                  const displayRec = $('<div>').attr('value', copiedArray[i].id).addClass('pokemon-holder').append(displayRecName, displayRecImg);
                  // const newTestWrap = $('<div>').attr('id', 'newTestWrap').append(displayRec);
                  // Append the div into the suggestion area.
                  $('.suggestion-results').append(displayRec);
                  // REPEAT THIS IF STATEMENT FOR ALL OTHER ELEMENTS. MAKE SURE COPIED ARRAY IS COPYING THE RESPECTIVE ELEMENT'S ARRAY.
                };
              } else if (elementType === 'ice') {
                // Create a copy of fireArray to manipulate.
                const copiedArray = iceArray.map(x => x);
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
                // Testing array
                console.log(copiedArray);
                // Create Title for suggestion area (REWRITE)
                
                $('.liked').append(suggestedPokemon);

                // Run this code 4 times.
                for (let i = 0; i < 4; i++) {
                  // Create a div containing the pokemon name and image.
                  const displayRecImg = `<img src="https://pokeres.bastionbot.org/images/pokemon/${copiedArray[i].id}.png">`;
                  const displayRecName = $('<h3>').text(copiedArray[i].name); 
                  const displayRec = $('<div>').attr('value', copiedArray[i].id).addClass('pokemon-holder').append(displayRecName, displayRecImg);
                  // const newTestWrap = $('<div>').attr('id', 'newTestWrap').append(displayRec);
                  // Append the div into the suggestion area.
                  $('.suggestion-results').append(displayRec);
                  // REPEAT THIS IF STATEMENT FOR ALL OTHER ELEMENTS. MAKE SURE COPIED ARRAY IS COPYING THE RESPECTIVE ELEMENT'S ARRAY.
                };
              } else if (elementType === 'steel') {
                // Create a copy of fireArray to manipulate.
                const copiedArray = steelArray.map(x => x);
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
                // Testing array
                console.log(copiedArray);
                // Create Title for suggestion area (REWRITE)
                
                $('.liked').append(suggestedPokemon);

                // Run this code 4 times.
                for (let i = 0; i < 4; i++) {
                  // Create a div containing the pokemon name and image.
                  const displayRecImg = `<img src="https://pokeres.bastionbot.org/images/pokemon/${copiedArray[i].id}.png">`;
                  const displayRecName = $('<h3>').text(copiedArray[i].name); 
                  const displayRec = $('<div>').attr('value', copiedArray[i].id).addClass('pokemon-holder').append(displayRecName, displayRecImg);
                  // const newTestWrap = $('<div>').attr('id', 'newTestWrap').append(displayRec);
                  // Append the div into the suggestion area.
                  $('.suggestion-results').append(displayRec);
                  // REPEAT THIS IF STATEMENT FOR ALL OTHER ELEMENTS. MAKE SURE COPIED ARRAY IS COPYING THE RESPECTIVE ELEMENT'S ARRAY.
                };
              } else if (elementType === 'bug') {
                // Create a copy of fireArray to manipulate.
                const copiedArray = bugArray.map(x => x);
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
                // Testing array
                console.log(copiedArray);
                // Create Title for suggestion area (REWRITE)
                
                $('.liked').append(suggestedPokemon);

                // Run this code 4 times.
                for (let i = 0; i < 4; i++) {
                  // Create a div containing the pokemon name and image.
                  const displayRecImg = `<img src="https://pokeres.bastionbot.org/images/pokemon/${copiedArray[i].id}.png">`;
                  const displayRecName = $('<h3>').text(copiedArray[i].name); 
                  const displayRec = $('<div>').attr('value', copiedArray[i].id).addClass('pokemon-holder').append(displayRecName, displayRecImg);
                  // const newTestWrap = $('<div>').attr('id', 'newTestWrap').append(displayRec);
                  // Append the div into the suggestion area.
                  $('.suggestion-results').append(displayRec);
                  // REPEAT THIS IF STATEMENT FOR ALL OTHER ELEMENTS. MAKE SURE COPIED ARRAY IS COPYING THE RESPECTIVE ELEMENT'S ARRAY.
                };
              } else if (elementType === 'ghost') {
                // Create a copy of fireArray to manipulate.
                const copiedArray = ghostArray.map(x => x);
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
                // Testing array
                console.log(copiedArray);
                // Create Title for suggestion area (REWRITE)
                
                $('.liked').append(suggestedPokemon);

                // Run this code 4 times.
                for (let i = 0; i < 4; i++) {
                  // Create a div containing the pokemon name and image.
                  const displayRecImg = `<img src="https://pokeres.bastionbot.org/images/pokemon/${copiedArray[i].id}.png">`;
                  const displayRecName = $('<h3>').text(copiedArray[i].name); 
                  const displayRec = $('<div>').attr('value', copiedArray[i].id).addClass('pokemon-holder').append(displayRecName, displayRecImg);
                  // const newTestWrap = $('<div>').attr('id', 'newTestWrap').append(displayRec);
                  // Append the div into the suggestion area.
                  $('.suggestion-results').append(displayRec);
                  // REPEAT THIS IF STATEMENT FOR ALL OTHER ELEMENTS. MAKE SURE COPIED ARRAY IS COPYING THE RESPECTIVE ELEMENT'S ARRAY.
                };
              } else if (elementType === 'fairy') {
                // Create a copy of fireArray to manipulate.
                const copiedArray = fairyArray.map(x => x);
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
                // Testing array
                console.log(copiedArray);
                // Create Title for suggestion area (REWRITE)

                $('.liked').append(suggestedPokemon);

                // Run this code 4 times.
                for (let i = 0; i < 4; i++) {
                  // Create a div containing the pokemon name and image.
                  const displayRecImg = `<img src="https://pokeres.bastionbot.org/images/pokemon/${copiedArray[i].id}.png">`;
                  const displayRecName = $('<h3>').text(copiedArray[i].name); 
                  const displayRec = $('<div>').attr('value', copiedArray[i].id).addClass('pokemon-holder').append(displayRecName, displayRecImg);
                  // const newTestWrap = $('<div>').attr('id', 'newTestWrap').append(displayRec);
                  // Append the div into the suggestion area.
                  $('.suggestion-results').append(displayRec);
                  // REPEAT THIS IF STATEMENT FOR ALL OTHER ELEMENTS. MAKE SURE COPIED ARRAY IS COPYING THE RESPECTIVE ELEMENT'S ARRAY.
                };
              } else if (elementType === 'normal') {
                // Create a copy of fireArray to manipulate.
                const copiedArray = normalArray.map(x => x);
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
                // Testing array
                console.log(copiedArray);
                // Create Title for suggestion area (REWRITE)
                
                $('.liked').append(suggestedPokemon);

                // Run this code 4 times.
                for (let i = 0; i < 4; i++) {
                  // Create a div containing the pokemon name and image.
                  const displayRecImg = `<img src="https://pokeres.bastionbot.org/images/pokemon/${copiedArray[i].id}.png">`;
                  const displayRecName = $('<h3>').text(copiedArray[i].name); 
                  const displayRec = $('<div>').attr('value', copiedArray[i].id).addClass('pokemon-holder').append(displayRecName, displayRecImg);
                  // const newTestWrap = $('<div>').attr('id', 'newTestWrap').append(displayRec);
                  // Append the div into the suggestion area.
                  $('.suggestion-results').append(displayRec);
                  // REPEAT THIS IF STATEMENT FOR ALL OTHER ELEMENTS. MAKE SURE COPIED ARRAY IS COPYING THE RESPECTIVE ELEMENT'S ARRAY.
                };
              };
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