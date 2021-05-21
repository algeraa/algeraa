import * as personaje from './personaje.js';
import * as escenaCastillo from './escenaCastillo.js';

var trampa_suelo;
var agujeroPinchos1,agujeroPinchos2,agujeroPinchos3,agujeroPinchos4,agujeroPinchos5,agujeroPinchos6,agujeroPinchos7,agujeroPinchos8,agujeroPinchos9;
var pinchosSalidos1,pinchosSalidos2,pinchosSalidos3,pinchosSalidos4,pinchosSalidos5,pinchosSalidos6,pinchosSalidos7,pinchosSalidos8,pinchosSalidos9;
var trampasList;


export function cargarSprites()
{
	this.load.image('agujerosPinchosVertical', 'assets/sprites/agujerosPinchosVertical.png');
	this.load.image('pinchosSalidosVertical', 'assets/sprites/pinchosSalidosVertical.png');

	this.load.image('agujerosPinchosHorizontal', 'assets/sprites/agujerosPinchosHorizontal.png');
	this.load.image('pinchosSalidosHorizontal', 'assets/sprites/pinchosSalidosHorizontal.png');

}

export function crearTrampas()
{

	agujeroPinchos1=this.physics.add.sprite(835,1425,'agujerosPinchosVertical');
	agujeroPinchos1.setOrigin(0.5, 0.5);

	agujeroPinchos2=this.physics.add.sprite(1535,1425,'agujerosPinchosVertical');
	agujeroPinchos2.setOrigin(0.5, 0.5);

	agujeroPinchos3=this.physics.add.sprite(210,1125,'agujerosPinchosHorizontal');
	agujeroPinchos3.setOrigin(0.5, 0.5);

	agujeroPinchos4=this.physics.add.sprite(210,525,'agujerosPinchosHorizontal');
	agujeroPinchos4.setOrigin(0.5, 0.5);

	agujeroPinchos5=this.physics.add.sprite(640,750,'agujerosPinchosHorizontal');
	agujeroPinchos5.setOrigin(0.5, 0.5);

	agujeroPinchos6=this.physics.add.sprite(1105,800,'agujerosPinchosHorizontal');
	agujeroPinchos6.setOrigin(0.5, 0.5);

	agujeroPinchos7=this.physics.add.sprite(1375,800,'agujerosPinchosHorizontal');
	agujeroPinchos7.setOrigin(0.5, 0.5);

	agujeroPinchos8=this.physics.add.sprite(2095,900,'agujerosPinchosHorizontal');
	agujeroPinchos8.setOrigin(0.5, 0.5);

	agujeroPinchos9=this.physics.add.sprite(2095,600,'agujerosPinchosHorizontal');
	agujeroPinchos9.setOrigin(0.5, 0.5);





	pinchosSalidos1=this.physics.add.sprite(0,0,'pinchosSalidosVertical');
	pinchosSalidos1.setOrigin(0.5, 0.5);
	pinchosSalidos1.alpha=0;
	pinchosSalidos1.damage=1;

	pinchosSalidos2=this.physics.add.sprite(0,0,'pinchosSalidosVertical');
	pinchosSalidos2.setOrigin(0.5, 0.5);
	pinchosSalidos2.alpha=0;
	pinchosSalidos2.damage=1;

	pinchosSalidos3=this.physics.add.sprite(0,0,'pinchosSalidosHorizontal');
	pinchosSalidos3.setOrigin(0.5, 0.5);
	pinchosSalidos3.alpha=0;
	pinchosSalidos3.damage=1;

	pinchosSalidos4=this.physics.add.sprite(0,0,'pinchosSalidosHorizontal');
	pinchosSalidos4.setOrigin(0.5, 0.5);
	pinchosSalidos4.alpha=0;
	pinchosSalidos4.damage=1;

	pinchosSalidos5=this.physics.add.sprite(0,0,'pinchosSalidosHorizontal');
	pinchosSalidos5.setOrigin(0.5, 0.5);
	pinchosSalidos5.alpha=0;
	pinchosSalidos5.damage=1;

	pinchosSalidos6=this.physics.add.sprite(0,0,'pinchosSalidosHorizontal');
	pinchosSalidos6.setOrigin(0.5, 0.5);
	pinchosSalidos6.alpha=0;
	pinchosSalidos6.damage=1;

	pinchosSalidos7=this.physics.add.sprite(0,0,'pinchosSalidosHorizontal');
	pinchosSalidos7.setOrigin(0.5, 0.5);
	pinchosSalidos7.alpha=0;
	pinchosSalidos7.damage=1;

	pinchosSalidos8=this.physics.add.sprite(0,0,'pinchosSalidosHorizontal');
	pinchosSalidos8.setOrigin(0.5, 0.5);
	pinchosSalidos8.alpha=0;
	pinchosSalidos8.damage=1;

	pinchosSalidos9=this.physics.add.sprite(0,0,'pinchosSalidosHorizontal');
	pinchosSalidos9.setOrigin(0.5, 0.5);
	pinchosSalidos9.alpha=0;
	pinchosSalidos9.damage=1;

	this.physics.add.overlap(personaje.player, agujeroPinchos1, salirPinchos1, null, this);
	this.physics.add.overlap(personaje.player, agujeroPinchos2, salirPinchos2, null, this);
	this.physics.add.overlap(personaje.player, agujeroPinchos3, salirPinchos3, null, this);
	this.physics.add.overlap(personaje.player, agujeroPinchos4, salirPinchos4, null, this);
	this.physics.add.overlap(personaje.player, agujeroPinchos5, salirPinchos5, null, this);
	this.physics.add.overlap(personaje.player, agujeroPinchos6, salirPinchos6, null, this);
	this.physics.add.overlap(personaje.player, agujeroPinchos7, salirPinchos7, null, this);
	this.physics.add.overlap(personaje.player, agujeroPinchos8, salirPinchos8, null, this);
	this.physics.add.overlap(personaje.player, agujeroPinchos9, salirPinchos9, null, this);


	this.physics.add.overlap(personaje.player, pinchosSalidos1, personaje.perderVida, null, this);
	this.physics.add.overlap(personaje.player, pinchosSalidos2, personaje.perderVida, null, this);
	this.physics.add.overlap(personaje.player, pinchosSalidos3, personaje.perderVida, null, this);
	this.physics.add.overlap(personaje.player, pinchosSalidos4, personaje.perderVida, null, this);
	this.physics.add.overlap(personaje.player, pinchosSalidos5, personaje.perderVida, null, this);
	this.physics.add.overlap(personaje.player, pinchosSalidos6, personaje.perderVida, null, this);
	this.physics.add.overlap(personaje.player, pinchosSalidos7, personaje.perderVida, null, this);
	this.physics.add.overlap(personaje.player, pinchosSalidos8, personaje.perderVida, null, this);
	this.physics.add.overlap(personaje.player, pinchosSalidos9, personaje.perderVida, null, this);

}

function salirPinchos1(e,s){

	setTimeout(function(){

	    	pinchosSalidos1.alpha=1;
			pinchosSalidos1.x=835;
			pinchosSalidos1.y=1425;
		
	},270);
	
	setTimeout(function(){

	    	pinchosSalidos1.alpha=0;
	    	pinchosSalidos1.x=0;
			pinchosSalidos1.y=0;

	},1200);
	

}

function salirPinchos2(e,s){

	setTimeout(function(){

	    	pinchosSalidos2.alpha=1;
			pinchosSalidos2.x=1535;
			pinchosSalidos2.y=1425;
		
	},270);
	
	setTimeout(function(){

	    	pinchosSalidos2.alpha=0;
	    	pinchosSalidos2.x=0;
			pinchosSalidos2.y=0;

	},1200);
	
}

function salirPinchos3(e,s){

	setTimeout(function(){

	    	pinchosSalidos3.alpha=1;
			pinchosSalidos3.x=210;
			pinchosSalidos3.y=1125;
		
	},270);
	
	setTimeout(function(){

	    	pinchosSalidos3.alpha=0;
	    	pinchosSalidos3.x=0;
			pinchosSalidos3.y=0;

	},1200);
	
}

function salirPinchos4(e,s){

	setTimeout(function(){

	    	pinchosSalidos4.alpha=1;
			pinchosSalidos4.x=210;
			pinchosSalidos4.y=525;
		
	},270);
	
	setTimeout(function(){

	    	pinchosSalidos4.alpha=0;
	    	pinchosSalidos4.x=0;
			pinchosSalidos4.y=0;

	},1200);
	
}

function salirPinchos5(e,s){

	setTimeout(function(){

	    	pinchosSalidos5.alpha=1;
			pinchosSalidos5.x=640;
			pinchosSalidos5.y=750;
		
	},270);
	
	setTimeout(function(){

	    	pinchosSalidos5.alpha=0;
	    	pinchosSalidos5.x=0;
			pinchosSalidos5.y=0;

	},1200);
	
}

function salirPinchos6(e,s){

	setTimeout(function(){

	    	pinchosSalidos6.alpha=1;
			pinchosSalidos6.x=1105;
			pinchosSalidos6.y=800;
		
	},270);
	
	setTimeout(function(){

	    	pinchosSalidos6.alpha=0;
	    	pinchosSalidos6.x=0;
			pinchosSalidos6.y=0;

	},1200);
	
} 

function salirPinchos7(e,s){

	setTimeout(function(){

	    	pinchosSalidos7.alpha=1;
			pinchosSalidos7.x=1375;
			pinchosSalidos7.y=800;
		
	},270);
	
	setTimeout(function(){

	    	pinchosSalidos7.alpha=0;
	    	pinchosSalidos7.x=0;
			pinchosSalidos7.y=0;

	},1200);
	
}

function salirPinchos8(e,s){

	setTimeout(function(){

	    	pinchosSalidos8.alpha=1;
			pinchosSalidos8.x=2095;
			pinchosSalidos8.y=900;
		
	},270);
	
	setTimeout(function(){

	    	pinchosSalidos8.alpha=0;
	    	pinchosSalidos8.x=0;
			pinchosSalidos8.y=0;

	},1200);
	
}

function salirPinchos9(e,s){

	setTimeout(function(){

	    	pinchosSalidos9.alpha=1;
			pinchosSalidos9.x=2095;
			pinchosSalidos9.y=600;
		
	},270);
	
	setTimeout(function(){

	    	pinchosSalidos9.alpha=0;
	    	pinchosSalidos9.x=0;
			pinchosSalidos9.y=0;

	},1200);
	
}