
import Escena2 from './escena2.js';


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
		scene: [Escena2]
};

var game=new Phaser.Game(config);


