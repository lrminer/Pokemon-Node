const inquirer = require('inquirer');
const pokemon = require('pokemon');
const typeChart = require('./typeChart');
const axios = require('axios');

let yourPokemon = "";
let wildPokemon = "";
let enemyPokemon = "";
let xp = 500;
let yourHP = 100;
let theirHP = 100;
let yourPkmType = 'grass';
let theirPkmType = 'Normal';
let level = 5;
let money = 0;



function startGame() {
    inquirer.prompt([{
        type: 'input',
        message: 'Hello! Welcome to the world of Nodemon! What is your name?',
        name: 'playerName',
        default: 'Ash Ketchum'
    }]).then(function (answer) {
        if (answer.playerName) {
            console.log("Welcome " + answer.playerName + "!");
            choosePokemon();
        }
    });
}

function choosePokemon() {
    inquirer.prompt([{
            type: 'list',
            message: 'Which Pokemon do you choose?',
            choices: [pokemon.getName(1), pokemon.getName(4), pokemon.getName(7)],
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
                yourPkmType = 'grass';
                typeChart.typechart.grass();
                console.log('Your pokemon is a grass type. It is weak to fire types but strong against water types.');
            } else if (yourPokemon === 'Charmander') {
                yourPkmType = 'fire';
                console.log('Your Pokemon is a fire type. It is weak to water types but strong against grass types.');
            } else if (yourPokemon === 'Squirtle') {
                yourPkmType = 'water';
                console.log('Your Pokemon is a water type. It is weak to grass types but stong against fire types.');
            }
            overWorld();
        }
    });
}

function wildBattle() {
    inquirer.prompt([{
        type: 'confirm',
        message: 'Are you ready for battle?',
        name: 'readyForBattle'
    }]).then(function (answer) {
        if (answer.readyForBattle) {
            theirPkmType = 'Normal';
            theirHP = 100;
            let wildPokemonOptions = [16, 19, 21, 29, 32, 56];
            let randomWildPokemon = wildPokemonOptions[Math.floor(Math.random() * wildPokemonOptions.length)];
            axios.get(`https://pokeapi.co/api/v2/pokemon/${randomWildPokemon}/`)
                .then(function (response) {

                    console.log('A wild ' + JSON.stringify(response.data.name) + ' appears.');
                    wildPokemon = JSON.stringify(response.data.name);
                    battle();

                });
        } else {
            overWorld();
        }
    });
}

function battleGary() {
    inquirer.prompt([{
        type: 'confirm',
        message: 'Are you ready to battle your rival, Gary?',
        name: 'readyForBattle'
    }]).then(function (answer) {
        if (answer.readyForBattle) {
            if (yourPokemon === 'Bulbasaur') {
                theirPkmType = 'fire';
                enemyPokemon = 'Chamander';
            } else if (yourPokemon === 'Charmander') {
                theirPkmType = 'water';
                enemyPokemon = 'Squirtle';
            } else if (yourPokemon === 'Squirtle') {
                theirPkmType = 'grass';
                enemyPokemon = 'Bulbasaur';
            } else {
                theirPkmType = 'normal';
                enemyPokemon = 'Eevee';
            }
            trainerBattle();

        }
    });
}

function trainerBattle() {
    let yourDamage = 5 * level;
    let theirDamage = 5 * level;

    inquirer.prompt([{
        type: 'list',
        choices: ['Attack', 'Run'],
        message: 'What do you do',
        name: 'battleOption'
    }]).then(function (answer) {
        if (answer.battleOption === 'Attack') {
            yourHP -= theirDamage;
            theirHP -= typeChart.typechart.grass(yourDamage);
            console.log("Your type is " + yourPkmType);
            console.log("Their type is " + theirPkmType);
            console.log("You took " + theirDamage + " damage. You now have " + yourHP + " HP.");
            console.log("You dealt " + typeChart.typechart.grass(yourDamage) + " damage to the " + wildPokemon + ". They now have " + theirHP + " HP.");
            if (yourHP > 0 && theirHP > 0) {
                battle();
            } else if (yourHP <= 0) {
                console.log('You lost the battle');
                console.log('HP: ' + yourHP + "/100");
                overWorld();
            } else if (theirHP <= 0) {
                console.log('You won the battle!');
                let xpGain = 100;
                console.log(yourPokemon + ' gained ' + xpGain + ' experience.');
                xp += xpGain;
                calculateLevel();
                overWorld();
            }

        }
        if (answer.battleOption === 'Run') {
            theirHP = 100;
            console.log('You returned from battle.');
            trainerBattle();
        }

    });
}

function battle() {

    let yourDamage = 5 * level;
    let theirDamage = 10;

    inquirer.prompt([{
        type: 'list',
        choices: ['Attack', 'Run'],
        message: 'What do you do?',
        name: 'battleOption'

    }]).then(function (answer) {
        if (answer.battleOption === 'Attack') {
            yourHP -= theirDamage;
            console.log(typeChart.typechart.grass(yourDamage));
            theirHP -= yourDamage;
            console.log("Your type is " + yourPkmType);
            console.log("Their type is " + theirPkmType);
            console.log("You took " + theirDamage + " damage. You now have " + yourHP + " HP.");
            console.log("You dealt " + typeChart.typechart.grass(yourDamage) + " damage to the " + wildPokemon + ". They now have " + theirHP + " HP.");
            if (yourHP > 0 && theirHP > 0) {
                battle();
            } else if (yourHP <= 0) {
                console.log('You lost the battle');
                console.log('HP: ' + yourHP + "/100");
                overWorld();
            } else if (theirHP <= 0) {
                console.log('You won the battle!');
                let xpGain = 50;
                console.log(yourPokemon + ' gained ' + xpGain + ' experience.');
                xp += xpGain;
                calculateLevel();
                overWorld();
            }

        }
        if (answer.battleOption === 'Run') {
            theirHP = 100;
            console.log('You returned from battle.');
            overWorld();
        }

    });
}

function calculateLevel() {
    level = Math.floor(xp / 100);
    console.log('Your pokemon is level ' + level + '.');
}

function overWorld() {
    inquirer.prompt([{
        type: 'list',
        name: 'foreground',
        message: 'You are in the middle of a field. What do you do?',
        choices: ['Walk in the grass', 'Battle a trainer', 'Go to the Pokemon Center', 'Battle Gary']
    }]).then(function (answer) {
        if (answer.foreground === 'Walk in the grass') {
            wildBattle();
        }
        if (answer.foreground === 'Go to the Pokemon Center') {
            yourHP = 100;
            console.log('Your Pokemon has been fully healed');
            console.log('HP: ' + yourHP + "/100");
            overWorld();
        }
        if (answer.foreground === 'Battle a trainer') {
            trainerBattle();
        }
        if (answer.foreground === 'Battle Gary') {
            battleGary();
        }

    });
}



// function statsAboutPokemon() {
//     console.log();
// }

startGame();

module.exports = {
    yourPkmType: yourPkmType,
    theirPkmType: theirPkmType
};