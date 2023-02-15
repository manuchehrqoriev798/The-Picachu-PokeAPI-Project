// DOM trees
const mainScreen = document.querySelector('.main-screen')

const pokeName = document.querySelector('.poke-name')
const pokeId = document.querySelector('.poke-id')
const pokeFrontImage = document.querySelector('.poke-front-image')
const pokeBackImage = document.querySelector('.poke-back-image')

const pokeTypeOne = document.querySelector('.poke-type-one')
const pokeTypeTwo = document.querySelector('.poke-type-two') 

const pokeWeight = document.querySelector('.poke-weight')
const pokeHeight = document.querySelector('.poke-height')

const pokeListItems = document.querySelectorAll('.list-item');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');



// Constant and Variables 
const TYPES  = [                                                                  // array that contains list of types of pokemons dont repeat them each time and if types are needed declare this array
    'normal', 'fighting', 'flying',
    'poison', 'ground', 'rock', 
    'bug', 'ghost', 'steel', 
    'fire', 'water', 'grass', 
    'electric', 'pshychic', 'ice',  
    'dragon', 'dark', 'fairly'
]



// Funtion 
const capitalize = (str) => str[0].toUppercase + str.substr[1];


const resetScreen = () => {
    for (const type of TYPES){    
        mainScreen.classList.remove('hide')
        mainScreen.classList.remove(type)
    }
}







fetch('https://pokeapi.co/api/v2/pokemon/99')
.then(res => {                                                // here it acces to data but in JSON format
    return res.json()                                         // so by JSON formating it it would more easy readable 
}) 
.then(data =>{
    console.log(data)

    resetScreen()                                                                    // refreshes the screen each time you click and class name of class to div sections

    const dataTypes = data ['types']                                                 // types because there is section types in the object that bring us to the link
    const dataFirstType = dataTypes[0]
    const dataSecondType = dataTypes[1]
    pokeTypeOne.textContent = capitalize(dataFirstType['type']['name'])             //function capitalize capitalizes the name. 0 because we wanna get acces to the first type
    if (dataSecondType) {
        pokeTypeTwo.classList.remove('hide')                                         // if second type exists remove hide which means that show it
        pokeTypeTwo.textContent = dataSecondType['type']['name']
    } else {
        pokeTypeTwo.classList.add('hide')                                            // if no add hide which means dont show it
        pokeTypeTwo.textContent = ''
    }

    mainScreen.classList.add(dataFirstType ['type']['name'])


    pokeName.textContent = (data['name']);
    pokeId.textContent = data['id']
    pokeWeight.textContent = data['weight'];
    pokeHeight.textContent = data['height'];


    pokeFrontImage.src = data ['sprites']['front_default'] || ''                     // if there is no back-default dont put it at all
    pokeBackImage.scr = data ['sprites'] ['back_default'] || ''                      // if there is no front-default dont put it at all
})