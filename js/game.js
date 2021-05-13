
import Bosque from './escenaBosque.js';
import prueba from './pruebaCambio.js';
import HUD from './HUD.js'
import Castillo from './escenaCastillo.js';

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
		scene: [Bosque, prueba, HUD, Castillo]
};

var game=new Phaser.Game(config);


