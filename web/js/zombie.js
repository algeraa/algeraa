export var zombie;
export var enemigosList;
var dinero;
var monedasList;
var i;
var couldowndamage = 0;

import * as Cueva from './cueva.js';
import * as Bosque from './escenaBosque.js';
import * as personaje from './personaje.js';
import * as games from './game.js';


export function cargarSprites()
{
	this.load.image('zombie','assets/sprites/zombi.png');
	this.load.image('moneda','assets/sprites/moneda.png');
}

export function inicio()
{

	enemigosList = this.physics.add.group();
	monedasList = this.physics.add.group();

	if(games.escenaActual == 1)
	{
		Bosque.spawnZombie.forEach(obj => {

			obj.setAlpha(0);

			zombie= enemigosList.create(obj.x,obj.y,'zombie');

			zombie.setScale(0.03, 0.03);
			zombie.vida = 5;
			zombie.distancia = 0;
			zombie.damage = 1;
			zombie.damagetimer = 10;
			zombie.movetimer = 20;
			zombie.direccion = 0;
			zombie.flecha = false;
			
		})
	}
	else if(games.escenaActual == 2)
	{
		Cueva.spawnZombie.forEach(obj => {

			obj.setAlpha(0);

			zombie= enemigosList.create(obj.x,obj.y,'zombie');

			zombie.setScale(0.03, 0.03);
			zombie.vida = 5;
			zombie.distancia = 0;
			zombie.damage = 1;
			zombie.damagetimer = 10;
			zombie.movetimer = 20;
			zombie.direccion = 0;
			zombie.flecha = false;
			
		})
	}
	

	this.physics.add.overlap(personaje.player, enemigosList, personaje.perderVida, null, this);
	this.physics.add.overlap(personaje.arma, enemigosList, perderVida, null, this);
	this.physics.add.overlap(personaje.bombas, enemigosList, perderVida, null, this);
	this.physics.add.overlap(personaje.flechasList, enemigosList, perderVida, null, this);
	 
}

function perderVida(s, n) {
	if (couldowndamage <= 0) {
		n.vida = n.vida - s.damage;
		console.log("zombie=" + n.vida);
		couldowndamage = 30;
		if (n.vida <= 0) {
			var drop = Phaser.Math.Between(1, 2);

			if (drop == 1) {
				dinero = personaje.monedasList.create(n.x, n.y, 'moneda');
				dinero.setScale(0.01, 0.01);
			}
			n.destroy();
		}
		if (s.flecha == true) {
			s.destroy();
		}

	}
}

export function acciones()
{
	for (i = 0;i<enemigosList.getChildren().length;i++){
		moverzombie.call(this);
		zombie.damagetimer--;
		couldowndamage--;
	}
}

function moverzombie(){
	for (i = 0;i<enemigosList.getChildren().length;i++)	{

		var atacante = enemigosList.getChildren()[i];
		atacante.distancia = Math.sqrt(Math.pow(personaje.player.x-atacante.x, 2) + Math.pow(personaje.player.y-atacante.y, 2));
		if(atacante.distancia < 150){
			atacante.atacar = true;
		}

		if(atacante.atacar == true){
			this.physics.moveToObject(atacante, personaje.player, 100);
		}
		else{
			if(atacante.direccion == 0 && atacante.movetimer <= 0){
				atacante.setVelocityY(0);
				atacante.setVelocityX(100); 
				atacante.direccion = 90;
				atacante.movetimer = 60;
			}
			if(atacante.direccion == 90 && atacante.movetimer <= 0){
				atacante.setVelocityY(100);
				atacante.setVelocityX(0); 
				atacante.direccion = 180;
				atacante.movetimer = 60;
			}
			if(atacante.direccion == 180 && atacante.movetimer <= 0){
				atacante.setVelocityY(0);
				atacante.setVelocityX(-100); 
				atacante.direccion = 270;
				atacante.movetimer = 60;
			}
			if(atacante.direccion == 270 && atacante.movetimer <= 0){
				atacante.setVelocityY(-100);
				atacante.setVelocityX(0); 
				atacante.direccion = 0;
				atacante.movetimer = 60;
			}
			atacante.movetimer--;
		}
	}

}