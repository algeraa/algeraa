var vagabundo
export var couldownVaganundo=0;

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

export function couldown()
{
	couldownVaganundo--;
}
function VenderBombas() {
		personaje.mensH.call(this);
	if(personaje.mon.cantidad >= 1 && personaje.hacha.isDown && couldownVaganundo<=0){
		couldownVaganundo = 20;
		personaje.mon.cantidad--;
		personaje.cogerBombs.call(this);
	
	}
}