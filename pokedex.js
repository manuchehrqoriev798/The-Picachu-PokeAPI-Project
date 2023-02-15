// DOM Objects
const mainScreen = document.querySelector('.main-screen');                       // connecting HTML elements to JavaScript
const pokeName = document.querySelector('.poke-name');                           // do not forget about . 
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');
const pokeListItems = document.querySelectorAll('.list-item');                  // why all because there are 20 list 
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');


// constants and variables
const TYPES = [                                                                 // array that contains all styles of pokemnons
  'normal', 'fighting', 'flying',
  'poison', 'ground', 'rock',
  'bug', 'ghost', 'steel',
  'fire', 'water', 'grass',
  'electric', 'psychic', 'ice',
  'dragon', 'dark', 'fairy'
];
let prevUrl = null;                                                              // in the begining default value of prevUrl and nextUrl        
let nextUrl = null;                                                              // in the begining default value of prevUrl and nextUrl    


// Functions
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);               // function that capitalizes first letter of the text. str[0] because capitalize first letter. str.substr [1] because adds that capitalized letter to the rest letters of word (1 starting from the second letter)

const resetScreen = () => {
  mainScreen.classList.remove('hide');
  for (const type of TYPES) {
    mainScreen.classList.remove(type);
  }
};

const fetchPokeList = url => {
  fetch(url)
    .then(res => res.json())                                                     // changing to JSON in order to conver data and use it
    .then(data => {
      const { results, previous, next } = data;                                  // previous and next in order to refresh them after each time clicking to the name of pokemons
      prevUrl = previous;
      nextUrl = next;

      for (let i = 0; i < pokeListItems.length ; i++) {                         // if number of pokemon is less than 20, add one to it multiple times. 
        const pokeListItem = pokeListItems[i];                                  // connect our i to list of 20 divs 
        const resultData = results[i];                                          // showing the result  

        if (resultData) {                                                       // if result is exised 
          const { name, url } = resultData;                                     // acces to name and link
          const urlArray = url.split('/');                                      // there would be 20 diffirent url for each 20 divs
          const id = urlArray[urlArray.length - 2];                             // why - 2. because 6th property from 8 was pokemon index. 
          pokeListItem.textContent = id + '. ' + capitalize(name);              // it would write number. Name in the right side of device
        } else {
          pokeListItem.textContent = '';                                        // if no, nothing
        }
      }
    });
};

const fetchPokeData = id => {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)                                // function that according to ID of pokemon changes the link and acces to data of that id
    .then(res => res.json())
    .then(data => {
      resetScreen();

      const dataTypes = data['types'];
      const dataFirstType = dataTypes[0];                                         // the first type of pokemon (its pover)
      const dataSecondType = dataTypes[1];                                        // the second type of pokemon (its power)
      pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);
      if (dataSecondType) {
        pokeTypeTwo.classList.remove('hide');                                     // remove hide means make it visible and display it
        pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
      } else {
        pokeTypeTwo.classList.add('hide');                                        // add hide means make it unvisible and do not display it
        pokeTypeTwo.textContent = '';
      }
      mainScreen.classList.add(dataFirstType['type']['name']);                    // it goes to css to find type of pokemon through name

      pokeName.textContent = capitalize(data['name']);                            // name of the pokemon
      pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
      pokeWeight.textContent = data['weight'];
      pokeHeight.textContent = data['height'];
      pokeFrontImage.src = data['sprites']['front_default'] || '';                // if there is front image display it, if not back image dont
      pokeBackImage.src = data['sprites']['back_default'] || '';                  // if there is back image display it, if not front image dont
    });
};

const handleLeftButtonClick = () => {
  if (prevUrl) {                                                                 // if prevUrl exist by clicking update the list of pokemons 
    fetchPokeList(prevUrl);
  }
};

const handleRightButtonClick = () => { 
  if (nextUrl) {                                                                // if nextUrl exist by clicking update the list of pokemons
    fetchPokeList(nextUrl);
  }
};

const handleListItemClick = (e) => {
    const listItem = e.target;
  if (!listItem) return;                                                      // if there is no e.target dont do anything


  if (!listItem.textContent) return;                                          // if e.target

  const id = listItem.textContent.split('.')[0];                              // this gets ID that used in the line of 63 to get data about that pokemon from the website
  fetchPokeData(id);
};


// adding event listeners
leftButton.addEventListener('click', handleLeftButtonClick);                // why handleLeftButtonClick is not declared because it would show undefined after click it gives data and shows it in the form of an array
rightButton.addEventListener('click', handleRightButtonClick);
for (const pokeListItem of pokeListItems) {                                 // making each of 20 pokemons from the list posible to click
  pokeListItem.addEventListener('click', handleListItemClick);
}


// initialize App
fetchPokeList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');       // why 20, because our display is limited by 20 and we can control this number