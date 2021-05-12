
import Escena2 from './escena2.js';
import prueba from './pruebaCambio.js';
import Castillo from './escenaCastillo.js';

var config=
{
	type:Phaser.AUTO,
		width:800,
		height:600,
		physics:{
			default:'arcade',
			arcade:{
				debug: true,
				gravity:{y:0}
			}
		},
		scene: [Escena2, prueba, Castillo]
};

var game=new Phaser.Game(config);

