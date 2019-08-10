const inquirer = require('inquirer');
const typeChart = require('./typeChart');
let yourPokemon = "";
let xp = 0;
let yourHP = 100;
let theirHP = 100;
let yourPkmType = '';
let theirPkmType = '';
function startGame() {
    inquirer.prompt([{
        type: 'input',
        message: 'Hello! Welcome to the world of Nodemon! What is your name?',
        name: 'playerName'
    }]).then(function (answer) {
        if (answer.playerName) {
            console.log("Welcome " + answer.playerName);
            choosePokemon();
        }
    });
}

function choosePokemon() {
    inquirer.prompt([{
            type: 'list',
            message: 'Which Pokemon do you choose?',
            choices: ['Bulbasaur', 'Squirtle', 'Charmander'],
            name: 'firstPokemon'

        },
        {
            type: 'confirm',
            message: 'Are you sure?',
            name: 'confirmPokemon',
            default: true
        }
    ]).then(function (answer) {
        if (answer.confirmPokemon) {
            console.log("You chose " + answer.firstPokemon);

            let yourPokemon = answer.firstPokemon;

            if (yourPokemon === 'Bulbasaur') {
                yourPkmType = 'Grass';
                typeChart.grass();
                console.log('Your pokemon is a grass type. It is weak to fire types but strong against water types.');
            } else if (yourPokemon === 'Charmander') {
                yourPkmType = 'Fire';
                console.log('Your Pokemon is a fire type. It is weak to water types but strong against grass types.');
            } else if (yourPokemon === 'Squirtle') {
                yourPkmType = 'Water';
                console.log('Your Pokemon is a water type. It is weak to grass types but stong against fire types.');
            }
            whatIsYourQuest();
            return yourPokemon;

        }
    });
}

function battleRdy() {
    inquirer.prompt([{
        type: 'confirm',
        message: 'Are you ready for battle?',
        name: 'readyForBattle'
    }]).then(function (answer) {
        if (answer.readyForBattle) {
            console.log(answer.readyForBattle);
            console.log('A wild rattata appears.');
            theirPkmType = 'Normal';
            battle();
        } else {
            whatIsYourQuest();
        }
    });
}



function battle() {

    let yourDamage = 1;
    let theirDamage = 10;

    inquirer.prompt([{
        type: 'list',
        choices: ['Attack', 'Run'],
        message: 'What do you do?',
        name: 'battleOption'

    }]).then(function (answer) {
        if (answer.battleOption === 'Attack') {
            yourHP -= theirDamage;
            console.log("Your type is " + yourPkmType);
            console.log("Their type is " + theirPkmType);
            console.log("You took " + theirDamage + " damage. You now have " + yourHP + " HP");
            if (yourHP > 0) {
                battle();
            } else {
                console.log('You lost the battle');
                console.log('HP: ' + yourHP + "/100");
                whatIsYourQuest();
            }
        }
        if (answer.battleOption === 'Run') {
            theirHP = 100;
            console.log('You returned from battle.');
            whatIsYourQuest();
        }

    });
}

function whatIsYourQuest() {
    inquirer.prompt([{
        type: 'list',
        name: 'foreground',
        message: 'You are in the middle of a field. What do you do?',
        choices: ['Walk in the grass', 'Battle a trainer', 'Go to the Pokemon Center', 'Battle Gary']
    }]).then(function (answer) {
        if (answer.foreground === 'Walk in the grass') {
            battleRdy();
        }
        if (answer.foreground === 'Go to the Pokemon Center') {
            yourHP = 100;
            console.log('Your pokemon has been fully healed');
            console.log('HP: ' + yourHP + "/100");
            whatIsYourQuest();
        }
        if (answer.foreground === 'Battle a trainer') {
            console.log('Sorry we have not developed this feature of the game yet. Please come again.');
            whatIsYourQuest();
        }
        if (answer.foreground === 'Battle Gary') {
            console.log('Sorry we have not developed this feature of the game yet. Please come again.');
            whatIsYourQuest();
        }
        
    });
}

// function statsAboutPokemon() {
//     console.log();
// }

startGame();

module.exports = {
    yourPkmType: yourPkmType,
    theirPkmType: theirPkmType,
    theirHP: theirHP,
    yourHP: yourHP,
};