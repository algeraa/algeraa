export var llave;

import * as personaje from './personaje.js';
import * as Cueva from './cueva.js';

var llavex = 0.05;
var llavey = 0.05;

export function cargarSprites() {
    this.load.image('key', 'assets/sprites/llave.png');
}

export function inicio() {
    Cueva.spawnKey.forEach(obj => {
        obj.setAlpha(0);
        llave = this.physics.add.sprite(obj.x,obj.y,'key');
        llave.setScale(llavex, llavey);
	})

    this.physics.add.overlap(personaje.player, llave, cogerllave, null, this);
}

function cogerllave(e,s){
    personaje.player.tienellave = true;

    s.destroy();
}