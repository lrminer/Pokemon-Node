const inquirer = require('inquirer');
const axios = require('axios');
const pokemon = require('pokemon');

function Pokemon (name, HP, Attack, Defense, SpAttack, SpDefense, Speed , type1, type2) {
    this.name = name;
    this.type1 = type1 || "notype";
    this.type2 = type2 || "notype";
    this.HP = HP;
    this.Attack = Attack;
    this.Defense = Defense;
    this.SpAttack = SpAttack;
    this.SpDefense = SpDefense;
    this.Speed = Speed;
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
            //route 1 pokemon
            // let randomWildPokemon = wildPokemonOptions[Math.floor(Math.random() * wildPokemonOptions.length)];

            let randomWildPokemon = Math.floor(Math.random() * 150);
            axios.get(`https://pokeapi.co/api/v2/pokemon/${randomWildPokemon}/`)
                .then(function (response) {
                    //console.log(response.data.types[0].type.name, response.data.types[1].type.name);

                    const pkm = new Pokemon(response.data.name, response.data.stats[5].base_stat, response.data.stats[4].base_stat, response.data.stats[3].base_stat, response.data.stats[2].base_stat, response.data.stats[1].base_stat, response.data.stats[0].base_stat, response.data.types[1].type.name, response.data.types[0].type.name);
                    console.log('A wild ' + JSON.stringify(response.data.name) + ' appears.');
                    wildPokemon = JSON.stringify(response.data.name);
                    console.log(pkm);
                });
        } 
    });
}

wildBattle();