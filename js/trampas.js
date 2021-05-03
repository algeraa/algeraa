
import * as personaje from './personaje.js';

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

	trampa_suelo=trampasList.create(350,200,'trampa_suelo');
	trampa_suelo.setOrigin(0.5, 0.5);
	trampa_suelo.setScale(0.3,0.3);

	//trampa_suelo=this.physics.add.sprite(100,700,'trampa_suelo');
	


	pinchos=this.physics.add.sprite(0,0,'pinchos');
	pinchos.setOrigin(0.5, 0.5);
	pinchos.setScale(0.5,0.5);
	pinchos.alpha=0;
	pinchos.damage=1;

	this.physics.add.overlap(personaje.player, trampasList, salirPinchos, null, this);
	this.physics.add.overlap(personaje.player, pinchos, personaje.perderVida, null, this);


}

function salirPinchos(e,s){

	setTimeout(function(){
    	//console.log("Salen pinchos");
		pinchos.x=trampa_suelo.x;
		pinchos.y=trampa_suelo.y;
		pinchos.alpha=1;
	},1000);
	
	setTimeout(function(){
    	//console.log("Se esconden pinchos");
		pinchos.x=0;
		pinchos.y=0;
		pinchos.alpha=0;
	},2000);
	

}
