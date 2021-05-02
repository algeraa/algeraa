var escalaEnemy = 0.4;
var escapaDisparo = 0.05;
export let player;

var UP, DOWN, RIGHT, LEFT;
var pocionSelect;
var pocion, cPocion;

var ataque;
var couldownP = 0;
var couldownCp = 0;
var couldownAt = 0;
var couldownBombs = 0;
var explosio;
var explosion;
export var bombas;
var veneno = 0;
var couldownDisp = 0;
var disparo, disparoJ;
export var flechasList;
var BombasList;

export var monedasList;

var venenoCouldown;
export var arma;
var espada;
export var vida;
var s;

var Inventory;
var KeyZ;
var sword;
var bow;
var bomb;
var cura;
var pedestal_escudo;
var lg_escudo;
export var aura;
var text;

var botiquin;
var botiquinList;
var escudoList;
var invent=false;
var inven;
var time=30;
var nuevo=true;
var pesoInventario=5;
let objetos=['espada','arco','bomba','botiquin','escudo'];
var escudoActivo=false;

import * as esqueleto from './esqueleto.js';
import * as arana from './arana.js';
import * as escena2 from './escena2.js';

export function cargarSprites()
{
	this.load.image('player', 'assets/sprites/personaje.png');
	this.load.image('espada', 'assets/sprites/espada.png');
	this.load.image('flecha','assets/sprites/flecha.png');
	this.load.image('bomba','assets/sprites/bomba.png');
	this.load.image('invisible','assets/sprites/invisible.png');
	this.load.spritesheet('explosionE', 'assets/sprites/ExplosionE.png',{frameWidth:64, frameHeight:64});
}

export function cargarInventario(){
	this.load.image('espada2','assets/sprites/espada_in.png');
	this.load.image('arco','assets/sprites/arco.png');
	this.load.image('bomba_in','assets/sprites/bomba_in.png');
	this.load.image('botiquin','assets/sprites/botiquin.png');
	this.load.image('aura_escudo','assets/sprites/aura_escudo.png');
	this.load.image('pedestal_escudo','assets/sprites/pedestal_escudo.png');
	this.load.image('logo_escudo','assets/sprites/logo_escudo.png');
	this.load.image('inventario','assets/images/inventario.png');

	botiquinList=this.physics.add.group();
	escudoList=this.physics.add.group();
}

export function createP()
{
	pocionSelect = 1;
	monedasList = this.physics.add.group();

	escena2.spawn.forEach(obj=>{

		obj.setAlpha(0);
		player=this.physics.add.sprite(obj.x,obj.y,'player').setDepth(2);
	})
	
	
	escala.call(this);

	UP=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	DOWN=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	RIGHT=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	LEFT=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	cPocion=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
	pocion=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
	ataque=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
	disparo=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
	explosion=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

	player.setCollideWorldBounds(true);
	this.cameras.main.startFollow(player, true, 0.1, 0.1);
	player.direccion = 0;
	vida = 10;

	arma=this.physics.add.sprite(0,0,'espada');
	arma.visible = false;
	arma.setOrigin(0, 0.5);
	arma.setScale(0.1,0.1);
	arma.body.enable = false;
	arma.damage = 1;
	arma.allowRotation = true;
	flechasList = this.physics.add.group();
	arma.flecha = false;
	player.dinero = 0;
	bombas=this.physics.add.sprite(player.x, player.y, 'bomba');
	bombas.visible = false;
	bombas.body.enable = false;
	bombas.setScale(0.1,0.1);
	bombas.damage = 5;
	bombas.setSize(1000, 1000);

	this.anims.create({
		key:'exp1',
		frames: this.anims.generateFrameNames('explosionE',{start:1, end:16})
	});

	


}

export function crearInventario(){

	Inventory=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
	KeyZ=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
	
	botiquin=botiquinList.create(200,400,'botiquin');
	this.physics.add.overlap(botiquinList, player, cogerBotiquin, null, this);

	sword=this.add.sprite(0,0,'espada2').setInteractive();
	sword.setOrigin(0.5,0.5);
	sword.setScale(0.25,0.25);
	sword.cantidad=1;
	sword.alpha=0;

	bow=this.add.sprite(0,0,'arco').setInteractive();
	bow.setOrigin(0.5,0.5);
	bow.setScale(0.25,0.25);
	bow.cantidad=1;
	bow.alpha=0;

	bomb=this.add.sprite(0,0,'bomba_in').setInteractive();
	bomb.setOrigin(0.5,0.5);
	bomb.setScale(0.07,0.07);
	bomb.peso=2;
	bomb.cantidad=0;
	bomb.alpha = 0;

	cura=this.add.sprite(0,0,'botiquin').setInteractive();
	cura.setOrigin(0.5,0.5);
	cura.setScale(0.9,0.86);
	cura.peso=2;
	cura.cantidad=0;
	cura.alpha = 0;
	
	pedestal_escudo=escudoList.create(600,300,'pedestal_escudo');
	this.physics.add.overlap(escudoList,player,cogerEscudo,null,this);

	aura=this.physics.add.sprite(0,0,'aura_escudo');
	aura.setOrigin(0.5,0.5);
	aura.setScale(0.3,0.3);
	aura.alpha = 0;

	lg_escudo=this.add.sprite(0,0,'logo_escudo').setInteractive();
	lg_escudo.setOrigin(0.5,0.5);
	lg_escudo.setScale(0.09,0.09);
	lg_escudo.peso=2;
	lg_escudo.cantidad=0;
	lg_escudo.alpha = 0;

	soltarObjeto.call(this);
}

function recogerDinero(n, s)
{
	player.dinero = player.dinero + 1;
	console.log("dinero = "+player.dinero)

	s.destroy();
}



export function movimiento()
{
time--;
	if (invent==false) {
		if(UP.isDown)
		{
			player.setVelocityY(-200);
			player.direccion = 270;
			if (escudoActivo==true) {aura.y=player.y;}
		}
		else if(DOWN.isDown)
		{
			player.setVelocityY(200);
			player.direccion = 90;
			if (escudoActivo==true) {aura.y=player.y;}
		}
		else
		{
			player.setVelocityY(0);
		}
		if(RIGHT.isDown)
		{
			player.setVelocityX(200); 
			player.direccion = 0;
			if (escudoActivo==true) {aura.x=player.x;}
		}
		else if(LEFT.isDown)
		{
			player.setVelocityX(-200);
			player.direccion = 180;
			if (escudoActivo==true) {aura.x=player.x;}
		}
		else if(KeyZ.isDown && time<0)
		{	
			if (lg_escudo.cantidad>0){
				escudoActivo=true;
				time=30;
				aura.x=player.x;
				aura.y=player.y;
				aura.alpha = 1;
				lg_escudo.cantidad--;
			}
		}
		else
		{
			player.setVelocityX(0);
		}
	}
}
export function perderVida(n, s)
{
	vida = vida-s.damage;
	s.destroy();
	console.log(vida);
	
}
export function acciones()
{
	cambioP.call(this);
	pociones.call(this);
	atacar.call(this);
	morir.call(this);
	disparar.call(this);
	Bombs.call(this);
}
function cambioP()
{
	couldownCp = couldownCp-1;
	if(cPocion.isDown && couldownCp <= 0)
	{
		if(pocionSelect == 3)
		{
			pocionSelect = 1;
		}
		else
		{
			pocionSelect = pocionSelect + 1;
		}
		couldownCp = 10;
		console.log("pocionSelect ="+pocionSelect);
	}
	

}
function pociones()
{
	couldownP = couldownP-1;
	if(pocion.isDown && couldownP <= 0)
	{
		if(pocionSelect == 1)
		{
			vida = vida + 2;
		}
		else if(pocionSelect == 2)
		{
			vida = vida + 4;
		}
		else if(pocionSelect == 3)
		{
			vida = vida + 8;
		}
		if(vida > 10)
		{
			vida = 10;
		}
		couldownP = 50;
		console.log("vida="+vida)
	}
}

function escala()
{
	var escalaPlayer = 0.1;
	player.setOrigin(0.5,0.7);
	player.setScale(escalaPlayer,escalaPlayer);
	
	
}
export function envenenado()
{
	veneno = veneno + 1;
	if(veneno == 3)
	{
		vida = vida - 4;
		console.log("vida="+vida);
		veneno = 0;
	}

}
function atacar()
{
	couldownAt = couldownAt -1;


	if(ataque.isDown && couldownAt <= 0)
	{	
			arma.visible = true;
			arma.body.enable = true;
			arma.x = player.x;
			arma.y = player.y;
			if(player.direccion == 270)
			{
				arma.body.setSize(arma.height, arma.width);
				arma.body.setOffset(-70, -250);
			}
			else if(player.direccion == 0)
			{
				arma.body.setSize(arma.width, arma.height);
				arma.body.setOffset(0, 0);
			}
			if(player.direccion == 90)
			{
				arma.body.setSize(arma.height, arma.width);
				arma.body.setOffset(-70, 100);
			}
			if(player.direccion == 180)
			{
				arma.body.setSize(arma.width, arma.height);
				arma.body.setOffset(-arma.width, 0);
			}
			
			arma.angle = player.direccion;
			this.time.delayedCall(60, desaparecer, [], this);
			couldownAt = 50;
	}
}
function desaparecer()
{
	arma.visible = false;
	arma.body.enable = false;
}
function morir()
{
	if(vida <= 0)
	{
		player.x = 400;
		player.y = 300;
		vida = 10;
	}
}
function disparar()
{
	if(couldownDisp > 0)
	{
		couldownDisp = couldownDisp -1;
	}


	if(disparo.isDown && couldownDisp <= 0)
	{	
			
			disparoJ=flechasList.create(player.x, player.y,'flecha');
			disparoJ.setScale(0.1,0.1);
			disparoJ.angle = -player.direccion;
			
			disparoJ.damage = 1;
			disparoJ.flecha = true;
			couldownDisp = 50;

			if(player.direccion == 0)
			{
				disparoJ.setVelocity(300, 0);
				disparoJ.body.setSize(disparoJ.width, disparoJ.height);
			}
			else if(player.direccion == 90)
			{
				disparoJ.setVelocity(0, 300);
				disparoJ.body.setSize(disparoJ.height, disparoJ.width);
			}
			else if(player.direccion == 180)
			{
				disparoJ.setVelocity(-300, 0);
				disparoJ.body.setSize(disparoJ.width, disparoJ.height);
			}
			else if(player.direccion == 270)
			{
				disparoJ.setVelocity(0, -300);
				disparoJ.body.setSize(disparoJ.height, disparoJ.width);
			}		
		

	}
}
function movDisparos()
{
	for(var i = 0;i<flechasList.getChildren().length;i++)	
	{
		
		var tiro = flechasList.getChildren()[i];
		switch(player.direccion)
		{
			case 0:
			tiro.setVelocity(300, 0);
			case 90:
			tiro.setVelocity(0,300);
			case 180:
			tiro.setVelocity(-300,0);
			case 270:
			tiro.setVelocity(0,-300);
		}
	}	
}

function Bombs(){
	couldownBombs = couldownBombs -1;
	if(explosion.isDown && couldownBombs <= 0){
		console.log(couldownBombs);
		bombas.x = player.x;
		bombas.y = player.y;
		bombas.visible = true;
		this.time.delayedCall(1000, explosao, [], this);
		couldownBombs = 100;
	}
}

function explosao(){
	bombas.body.enable = true;
	this.time.delayedCall(100, finexplosion, [], this);
	
}

function finexplosion(){
	
	var explosive = this.add.sprite(bombas.x, bombas.y,'explosionE');
	explosive.play('exp1');
	 explosive.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
    explosive.destroy();
 	console.log("fin explosion")
	  })
	bombas.visible = false;
	bombas.body.enable = false;
}

function cogerBotiquin(e,s){

	
	pesoInventario-=cura.peso;

	if (pesoInventario>=0){
		console.log("Recogo Botiquin");
		cura.cantidad++;
		botiquin.alpha=0;
		botiquin.x=0;
		botiquin.y=0;
		//botiquinList.remove(s);
	}

}

function cogerEscudo(e,s){

	pesoInventario-=lg_escudo.peso;

	if (pesoInventario>=0){

		lg_escudo.cantidad++;
		s.destroy();
	}
	
}

export function eliminarEscudo(e,s){
	console.log("Escudo eliminado");
	escudoActivo=false;
	s.destroy();
	aura.alpha=0;
	aura.x=0;
	aura.y=0;

}

var cantidadBomba;
var cantidadBotiquin;
var cantidadEscudo;
var posYObjetos=160;

export function inventario(){

	time--;

	if(Inventory.isDown && invent==false && time<0){

		invent=true;
		time=30;

		inven=this.add.sprite(0,0,'inventario');
		inven.setOrigin(0.5,0.5);
		inven.setScale(0.5,0.5);
		inven.x=escena2.cameras.scrollX+400;
		inven.y=escena2.cameras.scrollY+300;
		inven.setDepth(3);

		player.setVelocityX(0);
		player.setVelocityY(0);


		for (var i = 0; i<objetos.length; i++) {
			
			console.log(objetos[i]);

			if(objetos[i]=='espada' && sword.cantidad>0){
				
				sword.x=inven.x-190;
				sword.y=inven.y+posYObjetos;
				sword.setDepth(4);
				sword.alpha = 1;
						
			}

			if(objetos[i]=='arco' && bow.cantidad>0){

				bow.x=inven.x-145;
				bow.y=inven.y+posYObjetos;
				bow.setDepth(4);
				bow.alpha = 1;
				
			}

			if(objetos[i]=='bomba' && bomb.cantidad>0){

				bomb.x=inven.x-100;
				bomb.y=inven.y+posYObjetos;
				bomb.setDepth(4);
				bomb.alpha = 1;
				cantidadBomba=this.add.text(bomb.x+10,bomb.y+8,bomb.cantidad,{fontsize:'32px',fill:'#000000'});
				cantidadBomba.setDepth(2);
				
			}

			if(objetos[i]=='botiquin' && cura.cantidad>0){

				cura.x=inven.x-55;
				cura.y=inven.y+posYObjetos;
				cura.setDepth(4);
				cura.alpha = 1;
				cantidadBotiquin=this.add.text(cura.x+10,cura.y+8,cura.cantidad,{fontsize:'40px',fill:'#000000'});
				cantidadBotiquin.setDepth(2);
				
			}

			if(objetos[i]=='escudo' && lg_escudo.cantidad>0){

				lg_escudo.x=inven.x-10;
				lg_escudo.y=inven.y+posYObjetos;
				lg_escudo.setDepth(4);
				lg_escudo.alpha = 1;
				cantidadEscudo=this.add.text(lg_escudo.x+10,lg_escudo.y+8,lg_escudo.cantidad,{fontsize:'40px',fill:'#000000'});
				cantidadEscudo.setDepth(2);
				
			}

		}
		
		
	}else if(Inventory.isDown && invent==true && time<0){

		invent=false;
		time=30;
		inven.alpha = 0;
		
		for (var i = 0; i<objetos.length; i++) {

			if(objetos[i]=='espada'){
				sword.alpha = 0;
			}

			if(objetos[i]=='arco'){
				bow.alpha = 0;
			}

			if(objetos[i]=='bomba'){
				bomb.alpha = 0;	

				if(bomb.cantidad>0){
					cantidadBomba.alpha=0;
				}
			}

			if(objetos[i]=='botiquin'){
				cura.alpha = 0;

				if(cura.cantidad>0){
					cantidadBotiquin.alpha=0;
				}
				
			}

			if(objetos[i]=='escudo'){
				lg_escudo.alpha = 0;

				if(lg_escudo.cantidad>0){
					cantidadEscudo.alpha=0;
				}
			}

		}

		
		
	}



}

function soltarObjeto(){

	sword.on('pointerdown', function (pointer) {

        if (sword.cantidad>0) {
			sword.alpha = 0;
		    console.log("Soltar espada");
		    sword.cantidad--;
		    console.log("Eliminado");
		}

    });

    bow.on('pointerdown', function (pointer) {

       if (bow.cantidad>0) {
			bow.alpha = 0;
		    console.log("Soltar arco");
		    bow.cantidad--;
		    console.log("Eliminado");
		}

    });

     bomb.on('pointerdown', function (pointer) {

       if (bomb.cantidad>0) {
			bomb.alpha = 0;
		    console.log("Soltar bomba");
		    bomb.cantidad--;
		    console.log("Eliminado");
		}

    });

    cura.on('pointerdown', function (pointer) {

        if (cura.cantidad>0) {
			cura.alpha = 0;
			cantidadBotiquin.alpha=0;
			console.log("Soltar botiquin");
			cura.cantidad--;
			console.log("Eliminado");

			//botiquin=botiquinList.create(0,0,'botiquin');
			/*botiquin.x=player.x + 60;
		    botiquin.y=player.y;
		    botiquin.alpha=1;*/
		    //botiquin.disableBody(false,false);
		}

    });

    lg_escudo.on('pointerdown', function (pointer) {

       if (lg_escudo.cantidad>0) {
		    lg_escudo.alpha = 0;
		    cantidadEscudo.alpha=0;
		    console.log("Soltar escudo");
		    lg_escudo.cantidad--;
		    console.log("Eliminado");

		}

    });

}
