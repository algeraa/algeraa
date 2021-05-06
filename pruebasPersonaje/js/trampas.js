
import * as personaje from './personaje.js';
import * as escenaCastillo from './escenaCastillo.js';

var trampa_suelo;
var pinchos;
var trampasList;


export function cargarSprites()
{
	this.load.image('trampa_suelo', 'assets/sprites/trampa.png');
	this.load.image('pinchos', 'assets/sprites/spikes.png');
	trampasList=this.physics.add.group();

}

export function crearTrampas()
{

	trampa_suelo=trampasList.create(600,500,'trampa_suelo');
	trampa_suelo.setOrigin(0.5, 0.5);
	trampa_suelo.setScale(0.3,0.3);
	


	pinchos=this.physics.add.sprite(0,0,'pinchos');
	pinchos.setOrigin(0.5, 0.5);
	pinchos.setScale(0.5,0.5);
	pinchos.alpha=0;
	pinchos.damage=1;

	this.physics.add.overlap(personaje.player, pinchos, personaje.perderVida, null, this);


}

export function salirPinchos(e,s){

	setTimeout(function(){
    	console.log("Salen pinchos");
		pinchos.x=trampa_suelo.x;
		pinchos.y=trampa_suelo.y;
		pinchos.alpha=1;
	},300);
	
	setTimeout(function(){
    	console.log("Se esconden pinchos");
		pinchos.x=0;
		pinchos.y=0;
		pinchos.alpha=0;
	},1200);
	

}
