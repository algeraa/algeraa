
import Bosque from './escenaBosque.js';
import prueba from './pruebaCambio.js';
import HUD from './HUD.js'
import Castillo from './escenaCastillo.js';
import Cueva from './cueva.js';
import * as personaje from './personaje.js';

var config=
{
	type:Phaser.AUTO,
		width:800,
		height:600,
		physics:{
			default:'arcade',
			arcade:{
				debug: false,
				gravity:{y:0}
			}
		},
		scene: [Bosque, prueba, HUD, Castillo, Cueva]
};

var game=new Phaser.Game(config);
export var escenaActual = 1;
export var escenaPasada = 0;

export function iniciarCueva()
{
	if(personaje.llaveCueva)
	{
		escenaActual = 2;
		this.scene.start("Cueva");
	}
}

export function iniciarBosque()
{
	escenaPasada = 2;
	escenaActual = 1;
	this.scene.start("Bosque");
}