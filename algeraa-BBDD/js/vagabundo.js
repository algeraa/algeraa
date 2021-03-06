var vagabundo

import * as Cueva from './cueva.js';
import * as personaje from './personaje.js';

export function cargarSprites()
{
	this.load.image('Vagabundo', 'assets/sprites/vagabundo.png');
}

export function inicio() {

    Cueva.spawnVagabundo.forEach(obj => {
        obj.setAlpha(0);
        vagabundo = this.physics.add.sprite(obj.x, obj.y, 'Vagabundo');
	})

    this.physics.add.collider(vagabundo, personaje.player, VenderBombas, null, this);
	vagabundo.setImmovable(true);
}


function VenderBombas() {
	if(personaje.mon.cantidad >= 1 && personaje.hacha.isDown){
		personaje.mon.cantidad--;
		personaje.cogerBombs.call(this);
	
	}
}