const inquirer = require('inquirer');
const axios = require('axios');
const pokemon = require('pokemon');

Pokemon.prototype.typeChart = function () {
    if (yourPokemon.type === 'grass') { //your type is grass
        if (enemyPokemon.type === 'fire') { // your damage is weakened by these
            console.log(enemyPokemon.HP);
            enemyPokemon.HP -= ((enemyPokemon.HP) - (yourPokemon.Attack * yourPokemon / 2)) / 2;
            console.log(enemyPokemon.HP);
        }
        if (enemyPokemon.type === 'water') { // your damage is good vs these
            console.log(enemyPokemon.HP);
            enemyPokemon.HP -= ((enemyPokemon.HP) - (yourPokemon.Attack * yourPokemon / 2)) * 2;
            console.log(enemyPokemon.HP);
        } else { // your damage is neutral effectiveness
            console.log(enemyPokemon.HP);
            enemyPokemon.HP -= ((enemyPokemon.HP) - (yourPokemon.Attack * yourPokemon / 2)) * 1;
            console.log(enemyPokemon.HP);
        }
    }
};



function Pokemon(name, HP, Attack, Defense, SpAttack, SpDefense, Speed, type) {
    this.name = name;
    this.type = type;
    // this.type1 = type1 || "notype";
    // this.type2 = type2 || "notype";
    this.HP = 1000;
    this.Attack = Attack;
    this.Defense = Defense;
    this.SpAttack = SpAttack;
    this.SpDefense = SpDefense;
    this.Speed = Speed;
    this.level = 100;
}

let yourPokemon = "";
let enemyPokemon = "";


chooseYourPokemon();

function chooseYourPokemon() {
    inquirer.prompt([{
        type: "number",
        message: 'Enter Pokedex ID',
        name: "yourPokemon"

    }]).then(function (answer) {
        yourPokemon = answer.yourPokemon;
        axios.get(`https://pokeapi.co/api/v2/pokemon/${yourPokemon}/`)
            .then(function (response) {
                //console.log(response.data.types[0].type.name, response.data.types[1].type.name);
                yourPokemon = new Pokemon(response.data.name, response.data.stats[5].base_stat, response.data.stats[4].base_stat, response.data.stats[3].base_stat, response.data.stats[2].base_stat, response.data.stats[1].base_stat, response.data.stats[0].base_stat, response.data.types[0].type.name);
                console.log('You chose ' + JSON.stringify(response.data.name) + '.');
                console.log(yourPokemon);
            })
            .then(function () {
                wildBattle();
            });
    });
}




function wildBattle() {
    inquirer.prompt([{
        type: 'confirm',
        message: 'Are you ready for battle?',
        name: 'readyForBattle'
    }]).then(function (answer) {
        if (answer.readyForBattle) {
            let wildPokemonOptions = [16, 19, 21, 29, 32, 56];
            //route 1 pokemon
            // let randomWildPokemon = wildPokemonOptions[Math.floor(Math.random() * wildPokemonOptions.length)];

            // let randomWildPokemon = Math.floor(Math.random() * 150);
            let randomWildPokemon = Math.ceil(Math.random() * 10);
            axios.get(`https://pokeapi.co/api/v2/pokemon/${randomWildPokemon}/`)
                .then(function (response) {
                    //console.log(response.data.types[0].type.name, response.data.types[1].type.name);

                    enemyPokemon = new Pokemon(response.data.name, response.data.stats[5].base_stat, response.data.stats[4].base_stat, response.data.stats[3].base_stat, response.data.stats[2].base_stat, response.data.stats[1].base_stat, response.data.stats[0].base_stat, response.data.types[0].type.name);
                    console.log('A wild ' + JSON.stringify(response.data.name) + ' appears.');
                    wildPokemon = JSON.stringify(response.data.name);
                    console.log(enemyPokemon);
                    battle();
                });
        }
    });
}

function battle() {

    inquirer.prompt([{
        type: 'list',
        choices: ['Attack', 'Run'],
        message: 'What do you do?',
        name: 'battleOption'

    }]).then(function (answer) {
        if (answer.battleOption === 'Attack') {
            // yourPokemon.typeChart(yourPokemon, enemyPokemon);
            let damage = damageFn(enemyPokemon.Attack, yourPokemon.Defense, yourPokemon.level);
            yourPokemon.HP -= damage;
            damage = damageFn(yourPokemon.Attack, enemyPokemon.Defense, enemyPokemon.level);
            enemyPokemon.HP -= damage;



            ///CLEAN THESE CONSOLE.LOGS UP
            console.log("Your type is " + yourPokemon.type);
            console.log("Their type is " + enemyPokemon.type);
            console.log("You took " + " damage. You now have " + yourPokemon.HP + " HP.");
            console.log("You dealt " + " damage to the " + wildPokemon + ". They now have " + enemyPokemon.HP + " HP.");
            if (yourPokemon.HP > 0 && enemyPokemon.HP > 0) {
                battle();
            } else if (yourPokemon.HP <= 0) {
                console.log('You lost the battle');
                // console.log('HP: ' + yourHP + "/100");
                // overWorld();
            } else if (enemyPokemon.HP <= 0) {
                console.log('You won the battle!');
                // let xpGain = 50;
                // console.log(yourPokemon + ' gained ' + xpGain + ' experience.');
                // xp += xpGain;
                // calculateLevel();
                // overWorld();
            }

        }
        if (answer.battleOption === 'Run') {
            theirHP = 100;
            console.log('You returned from battle.');
            //overWorld();
        }

    });
}

function damageFn(attack, defense, level) {
    return attack/defense*level;
}

// wildBattle();