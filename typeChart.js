const nodemon = require('./nodemon.js');

const grass = function (damage) {
    console.log('Grass type is weak to fire type');
    console.log("your pokrmon type " + nodemon.yourPkmType);
};

module.exports = {
    grass: grass
};