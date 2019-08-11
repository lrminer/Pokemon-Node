const nodemon = require('./nodemon.js');
const pokemonData = require('./pokemonData.js');

const typechart = {
    grass: function grass(damage) {
        if (nodemon.yourPkmType === 'grass') {
            if (nodemon.theirPkmType === 'fire' || nodemon.theirPkmType === 'dragon' || nodemon.theirPkmType === 'grass' || nodemon.theirPkmType === 'flying' || nodemon.theirPkmType === 'poison' || nodemon.theirPkmType === 'bug' || nodemon.theirPkmType === 'steel') {
                damage = damage / 2;
                console.log("It's super effective!");
                console.log("hello" + damage);
            } else if (nodemon.theirPkmType === 'water' || nodemon.theirPkmType === 'rock' || nodemon.theirPkmType === 'ground') {
                damage = damage * 2;
                console.log("It's not very effective.");
                console.log("hello" + damage);
            } else {
                damage = damage;
                console.log("hello" + damage);
            }
        }
        console.log("**testing your pokemon type " + nodemon.yourPkmType); //not passing this value back
        return damage;
    }
    
}


module.exports = {
    typechart: typechart
};