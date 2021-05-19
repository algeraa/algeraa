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
export var pocionPList, pocionMList, pocionGList, flechasInventario;

export var monedasList;

var venenoCouldown;
export var arma;
var espada;
export var vida;
var s;

var Inventory;
var KeyZ;
var pesoFuturo = 0;

export var curaP, curaM, curaG, flechaI, bomb, sword, bow, mon;
var pedestal_escudo;
var lg_escudo;
export var aura;
var text;
export var hacha;
var botiquin;
var botiquinList;
var escudoList;
var invent=false;
var inven;
var time=30;
var nuevo=true;
export var pesoInventario;
export let objetos=['espada','arco','bomba','escudo', 'pocionP', 'pocionM', 'pocionG', 'flechas', 'monedas'];
var escudoActivo=false;
export var llaveCueva;

import * as esqueleto from './esqueleto.js';
import * as arana from './arana.js';
import * as Bosque from './escenaBosque.js';
import * as escenaCastillo from './escenaCastillo.js';
import * as cueva from './cueva.js';
import * as games from './game.js';

export function cargarSprites()
{
	//this.load.image('player', 'assets/sprites/personaje.png');
	this.load.image('espada', 'assets/sprites/espada.png');
	this.load.image('flecha','assets/sprites/flecha.png');
	this.load.image('bomba','assets/sprites/bomba.png');
	this.load.image('invisible','assets/sprites/invisible.png');
	this.load.spritesheet('explosionE', 'assets/sprites/ExplosionE.png',{frameWidth:64, frameHeight:64});
	this.load.spritesheet('playerAnim', 'assets/sprites/jugador.png',{frameWidth:24, frameHeight:26});
	this.load.image('moneda','assets/sprites/moneda.png');
}

export function cargarInventario(){
	this.load.image('espada2','assets/sprites/espada_in.png');
	this.load.image('arco','assets/sprites/arco.png');
	this.load.image('pocionPe','assets/sprites/pocionPequena.png');
	this.load.image('pocionMe','assets/sprites/pocionMediana.png');
	this.load.image('pocionGr','assets/sprites/pocionGrande.png');
	this.load.image('aura_escudo','assets/sprites/aura_escudo.png');
	this.load.image('pedestal_escudo','assets/sprites/pedestal_escudo.png');
	this.load.image('logo_escudo','assets/sprites/logo_escudo.png');
	this.load.image('inventario','assets/images/inventario.png');

	pocionPList=this.physics.add.group();
	pocionMList=this.physics.add.group();
	pocionGList=this.physics.add.group();
	escudoList=this.physics.add.group();
}


export function createP()
{
	pesoInventario = games.pesoInvent;
	pocionSelect = 1;
	monedasList = this.physics.add.group();
	flechasInventario = this.physics.add.group();

	this.anims.create({
		key:'idle',
		frames: this.anims.generateFrameNames('playerAnim',{start:0, end:2}),
		frameRate: 2.5
	});
	this.anims.create({
		key:'walkLeft',
		frames: this.anims.generateFrameNames('playerAnim',{start:21, end:29}),
		frameRate: 10
	});
	this.anims.create({
		key:'walkRight',
		frames: this.anims.generateFrameNames('playerAnim',{start:40, end:49}),
		frameRate: 10
	});
	this.anims.create({
		key:'walkDown',
		frames: this.anims.generateFrameNames('playerAnim',{start:10, end:19}),
		frameRate: 10
	});
	this.anims.create({
		key:'walkUp',
		frames: this.anims.generateFrameNames('playerAnim',{start:30, end:39}),
		frameRate: 10
	});
	this.anims.create({
		key:'idleUp',
		frames: this.anims.generateFrameNames('playerAnim',{start:6, end:6}),
		frameRate: 2.5
	});
	this.anims.create({
		key:'idleRight',
		frames: this.anims.generateFrameNames('playerAnim',{start:7, end:9}),
		frameRate: 2.5
	});
	this.anims.create({
		key:'idleLeft',
		frames: this.anims.generateFrameNames('playerAnim',{start:3, end:5}),
		frameRate: 2.5
	});

	
	if(games.escenaActual == 1 && games.escenaPasada == 0)
	{
		Bosque.spawn.forEach(obj=>{

			obj.setAlpha(0);
			player=this.physics.add.sprite(obj.x,obj.y,'playerAnim').setDepth(2);
			player.play("idle", true);
			
		})
	}
	
	else if (games.escenaActual == 2)
	{
		cueva.spawn.forEach(obj=>{

			obj.setAlpha(0);
			player=this.physics.add.sprite(obj.x,obj.y,'playerAnim').setDepth(2);
			player.play("idle", true);
			
			
		})
	}
	else if (games.escenaActual == 1 && games.escenaPasada == 2)
	{
		Bosque.volverDeCueva.forEach(obj=>{

			obj.setAlpha(0);
			player=this.physics.add.sprite(obj.x,obj.y,'playerAnim').setDepth(2);
			player.play("idle", true);
			
			
		})
	}
	else if (games.escenaActual == 1 && games.escenaPasada == 3)
	{
		Bosque.volverdeCastillo.forEach(obj=>{

			obj.setAlpha(0);
			player=this.physics.add.sprite(obj.x,obj.y,'playerAnim').setDepth(2);
			player.play("idle", true);
			
		})
	}
	else if(games.escenaActual == 3)
	{
		escenaCastillo.spawn.forEach(obj=>{

			obj.setAlpha(0);
			player=this.physics.add.sprite(obj.x,obj.y,'playerAnim').setDepth(2);
			player.play("idle", true);
		
			
		})
	}
	if(games.escenaPasada == 0)
	{
		player.hachaR = false;
		llaveCueva = true;
	}
	else
	{
		player.hachaR = true;
		llaveCueva = true;
	}
	
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
	hacha=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

	player.setCollideWorldBounds(true);
	this.cameras.main.startFollow(player, true, 0.1, 0.1);
	player.direccion = 0;
	vida = games.vidaPer;

	arma=this.physics.add.sprite(0,0,'espada');
	arma.visible = false;
	arma.setOrigin(0, 0.5);
	arma.setScale(0.1,0.1);
	arma.body.enable = false;
	arma.damage = 3;
	arma.allowRotation = true;
	flechasList = this.physics.add.group();
	arma.flecha = false;

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
	
	this.physics.add.overlap(player, monedasList, recogerDinero);
	this.physics.add.overlap(player, pocionPList, cogerPocionP);
	this.physics.add.overlap(player, pocionMList, cogerPocionM);
	this.physics.add.overlap(player, pocionGList, cogerPocionG);
	this.physics.add.overlap(player, flechasInventario, cogerFlecha);

	player.couldownDamage = 100;
	
	player.tienellave = games.llaveCastillo;
	////console.log(games.FlechaC)
}
export function recogerHacha()
{
	if(hacha.isDown && player.hachaR == false)
	{
	
		player.hachaR = true;

		Bosque.hachaSprite.setAlpha(0)
		Bosque.troncoSprite.setAlpha(1)
	}
}

export function crearInventario(){

	Inventory=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
	KeyZ=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
	
	

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

	bomb=this.add.sprite(0,0,'bomba').setInteractive();
	bomb.setOrigin(0.5,0.5);
	bomb.setScale(0.07,0.07);
	bomb.peso=2;
	bomb.cantidad= games.BombasC;
	bomb.alpha = 0;

	curaP=this.add.sprite(0,0,'pocionPe').setInteractive();
	curaP.setOrigin(0.5,0.5);
	curaP.peso=2;
	curaP.cantidad= games.curaPC;
	curaP.alpha = 0;

	curaM=this.add.sprite(0,0,'pocionMe').setInteractive();
	curaM.setOrigin(0.5,0.5);
	curaM.peso=3;
	curaM.cantidad= games.curaMC;
	curaM.alpha = 0;

	curaG=this.add.sprite(0,0,'pocionGr').setInteractive();
	curaG.setOrigin(0.5,0.5);
	curaG.peso=4;
	curaG.cantidad= games.curaGC;
	curaG.alpha = 0;

	flechaI=this.add.sprite(0,0,'flecha').setInteractive();
	flechaI.setOrigin(0.5,0.5);
	flechaI.peso=1;
	flechaI.cantidad= games.FlechasC;
	flechaI.alpha = 0;

	mon=this.add.sprite(0,0,'moneda').setInteractive();
	mon.setOrigin(0.5,0.5);
	mon.peso=0;
	mon.cantidad= games.dineroC;
	mon.alpha = 0;

	
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

export function recogerDinero(n, s)
{
	mon.cantidad++;


	s.destroy();
}

export function cuevaDesbloqueada()
{
	llaveCueva = true;
}


export function movimiento()
{
time--;
var quieto = 0;
	if (invent==false) {
		if(UP.isDown)
		{
			player.setVelocityY(-200);
			player.direccion = 270;
			if (escudoActivo==true) {aura.y=player.y;}
			player.play("walkUp", true);
		}
		else if(DOWN.isDown)
		{
			player.setVelocityY(200);
			player.direccion = 90;
			if (escudoActivo==true) {aura.y=player.y;}
			player.play("walkDown", true);
		}
		else
		{
			quieto++;
			player.setVelocityY(0);
		}
		if(RIGHT.isDown)
		{
			player.setVelocityX(200); 
			player.direccion = 0;
			if (escudoActivo==true) {aura.x=player.x;}
			player.play("walkRight", true);
		}
		else if(LEFT.isDown)
		{
			player.setVelocityX(-200);
			player.direccion = 180;
			if (escudoActivo==true) {aura.x=player.x;}
			player.play("walkLeft", true);
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
			quieto++;
			player.setVelocityX(0);
		}
		if(quieto == 2 && player.direccion == 90)
		{
			player.play("idle", true);
		}
		else if(quieto == 2 && player.direccion == 270)
		{
			player.play("idleUp", true);
		}
		else if(quieto == 2 && player.direccion == 0)
		{
			player.play("idleRight", true);
		}
		else if(quieto == 2 && player.direccion == 180)
		{
			player.play("idleLeft", true);
		}
	}
}
export function perderVida(n, s)
{
	if(player.couldownDamage <= 0)
	{
		vida = vida-s.damage;
		player.couldownDamage = 100;
	
	}
	
	if(s.flecha == true)
	{
		s.destroy();
		
	}
	
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
	player.couldownDamage--;
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
		if(pocionSelect == 1 && curaP.cantidad > 0)
		{
			vida = vida + 2;
			curaP.cantidad--;
			pesoInventario+=curaP.peso;
			
		}
		else if(pocionSelect == 2 && curaM.cantidad > 0)
		{
			vida = vida + 4;
			curaM.cantidad--;
			pesoInventario+=curaM.peso;
		
		}
		else if(pocionSelect == 3 && curaG.cantidad > 0)
		{
			vida = vida + 8;
			curaG.cantidad--;
			pesoInventario+=curaG.peso;
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
//player.setScale(escalaPlayer,escalaPlayer);
	
	
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
	if(vida <= 0 && games.escenaActual == 1)
	{
		Bosque.spawn.forEach(obj=>{

		
		player.x=obj.x;
		player.y=obj.y;
		
	})
		vida = 10;
	}
	if(vida <= 0 && games.escenaActual == 2)
	{
		cueva.spawn.forEach(obj=>{

		
		player.x=obj.x;
		player.y=obj.y;
		
	})
		vida = 10;
	}
	if(vida <= 0 && games.escenaActual == 3)
	{
		escenaCastillo.spawn.forEach(obj=>{

		
		player.x=obj.x;
		player.y=obj.y;
		
	})
		vida = 10;
	}
}
function disparar()
{
	if(couldownDisp > 0)
	{
		couldownDisp = couldownDisp -1;
	}


	if(disparo.isDown && couldownDisp <= 0 && flechaI.cantidad > 0)
	{	
			
			disparoJ=flechasList.create(player.x, player.y,'flecha');
			disparoJ.setScale(0.1,0.1);
			
			
			disparoJ.damage = 1;
			disparoJ.flecha = true;
			couldownDisp = 50;

			if(player.direccion == 0)
			{
				disparoJ.setVelocity(300, 0);
				disparoJ.body.setSize(disparoJ.width, disparoJ.height);
				disparoJ.angle = 180;
			}
			else if(player.direccion == 90)
			{
				disparoJ.setVelocity(0, 300);
				disparoJ.body.setSize(disparoJ.height, disparoJ.width);
				disparoJ.angle = -player.direccion;
			}
			else if(player.direccion == 180)
			{
				disparoJ.setVelocity(-300, 0);
				disparoJ.body.setSize(disparoJ.width, disparoJ.height);
				disparoJ.angle = 0;
			}
			else if(player.direccion == 270)
			{
				disparoJ.setVelocity(0, -300);
				disparoJ.body.setSize(disparoJ.height, disparoJ.width);
				disparoJ.angle = -player.direccion;
			}		
		flechaI.cantidad--;
		pesoInventario+= flechaI.peso;

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
	if(explosion.isDown && couldownBombs <= 0 && bomb.cantidad > 0){
		bombas.x = player.x;
		bombas.y = player.y;
		bombas.visible = true;
		this.time.delayedCall(1000, explosao, [], this);
		couldownBombs = 100;
		bomb.cantidad--;
		pesoInventario+=bomb.peso;
	}
}

function explosao(){
	bombas.body.enable = true;
	this.time.delayedCall(100, finexplosion, [], this);
	
}

function finexplosion(){
	
	var explosive = this.add.sprite(bombas.x, bombas.y,'explosionE');
	explosive.play('exp1');
	explosive.once('animationcomplete', () => {
    
    explosive.destroy()
  })
	bombas.visible = false;
	bombas.body.enable = false;
}

function cogerPocionP(e,s){

	
	pesoFuturo = pesoInventario - curaP.peso;

	if (pesoFuturo>=0){
		
		curaP.cantidad++;
		pesoInventario-=curaP.peso;
		s.destroy();
		
	}

}

export function cogerBombs(){

	
	pesoFuturo = pesoInventario - bomb.peso;

	if (pesoFuturo>=0){
		
		bomb.cantidad++;
		pesoInventario-=bomb.peso;
		
	}

}

function cogerPocionM(e,s){

	pesoFuturo = pesoInventario - curaM.peso;
	

	if (pesoFuturo>=0){
		
		curaM.cantidad++;
		pesoInventario-=curaM.peso;
		s.destroy();
		
	}

}
function cogerPocionG(e,s){

	pesoFuturo = pesoInventario - curaG.peso;
	
	
	if (pesoFuturo>=0){

		curaG.cantidad++;
		pesoInventario-=curaG.peso;
		s.destroy();
		
	}

}
function cogerFlecha(e,s){

	pesoFuturo = pesoInventario - flechaI.peso;
	

	if (pesoFuturo>=0){
		
		flechaI.cantidad++;
		pesoInventario-=flechaI.peso;
		s.destroy();
		
	}

}
export function cogerEscudo(e,s){
	console.log("Recoger escudo")
	pesoFuturo = pesoInventario - lg_escudo.peso;

	if (pesoFuturo>=0){
		pesoInventario-=lg_escudo.peso;
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
var cantidadPocionP;
var cantidadPocionM;
var cantidadPocionG;
var cantidadEscudo;
var cantidadflechas;
var cantidadmonedas;
var posYObjetos=160;

export function inventario(){

	time--;

	if(Inventory.isDown && invent==false && time<0){

		invent=true;
		time=30;
		console.log("peso="+pesoInventario);
		inven=this.add.sprite(0,0,'inventario');
		inven.setOrigin(0.5,0.5);
		inven.setScale(0.5,0.5);
		inven.x=Bosque.cameras.scrollX+400;
		inven.y=Bosque.cameras.scrollY+300;
		inven.setDepth(3);

		if(games.escenaActual == 1){

			inven.x=Bosque.cameras.scrollX+400;
			inven.y=Bosque.cameras.scrollY+300;
			inven.setDepth(5);

		}else if(games.escenaActual==2){

			inven.x=cueva.cameras.scrollX+400;
			inven.y=cueva.cameras.scrollY+300;
			inven.setDepth(5);
			
		}
		else if(games.escenaActual==3){

			inven.x=escenaCastillo.cameras.scrollX+400;
			inven.y=escenaCastillo.cameras.scrollY+300;
			inven.setDepth(5);
			
		}

		player.setVelocityX(0);
		player.setVelocityY(0);


		for (var i = 0; i<objetos.length; i++) {
			


			if(objetos[i]=='espada' && sword.cantidad>0){
				
				sword.x=inven.x-190;
				sword.y=inven.y+posYObjetos;
				sword.setDepth(6);
				sword.alpha = 1;
						
			}

			if(objetos[i]=='arco' && bow.cantidad>0){

				bow.x=inven.x-145;
				bow.y=inven.y+posYObjetos;
				bow.setDepth(6);
				bow.alpha = 1;
				
			}

			if(objetos[i]=='bomba' && bomb.cantidad>0){

				bomb.x=inven.x-100;
				bomb.y=inven.y+posYObjetos;
				bomb.setDepth(6);
				bomb.alpha = 1;
				cantidadBomba=this.add.text(bomb.x+10,bomb.y+8,bomb.cantidad,{fontsize:'32px',fill:'#000000'});
				cantidadBomba.setDepth(7);
				
			}

			if(objetos[i]=='pocionP' && curaP.cantidad>0){

				curaP.x=inven.x-55;
				curaP.y=inven.y+posYObjetos;
				curaP.setDepth(6);
				curaP.alpha = 1;
				cantidadPocionP=this.add.text(curaP.x+10,curaP.y+8,curaP.cantidad,{fontsize:'40px',fill:'#000000'});
				cantidadPocionP.setDepth(7);
				
			}
			if(objetos[i]=='pocionM' && curaM.cantidad>0){

				curaM.x=inven.x+35;
				curaM.y=inven.y+posYObjetos;
				curaM.setDepth(6);
				curaM.alpha = 1;
				cantidadPocionM=this.add.text(curaM.x+10,curaM.y+8,curaM.cantidad,{fontsize:'40px',fill:'#000000'});
				cantidadPocionM.setDepth(7);
				
			}
			if(objetos[i]=='pocionG' && curaG.cantidad>0){

				curaG.x=inven.x+80;
				curaG.y=inven.y+posYObjetos;
				curaG.setDepth(6);
				curaG.alpha = 1;
				cantidadPocionG=this.add.text(curaG.x+10,curaG.y+8,curaG.cantidad,{fontsize:'40px',fill:'#000000'});
				cantidadPocionG.setDepth(7);
				
			}

			if(objetos[i]=='flechas' && flechaI.cantidad>0){

				flechaI.x=inven.x+125;
				flechaI.y=inven.y+posYObjetos;
				flechaI.setDepth(6);
				flechaI.setScale(0.1,0.1);
				flechaI.alpha = 1;
				cantidadflechas=this.add.text(flechaI.x+10,flechaI.y+8,flechaI.cantidad,{fontsize:'40px',fill:'#000000'});
				cantidadflechas.setDepth(7);
				
			}

			if(objetos[i]=='escudo' && lg_escudo.cantidad>0){

				lg_escudo.x=inven.x-10;
				lg_escudo.y=inven.y+posYObjetos;
				lg_escudo.setDepth(6);
				lg_escudo.alpha = 1;
				cantidadEscudo=this.add.text(lg_escudo.x+10,lg_escudo.y+8,lg_escudo.cantidad,{fontsize:'40px',fill:'#000000'});
				cantidadEscudo.setDepth(7);
				
			}
			if(objetos[i]=='monedas' && mon.cantidad>0){

				mon.x=inven.x+170;
				mon.y=inven.y+posYObjetos;
				mon.setDepth(6);
				mon.alpha = 1;
				mon.setScale(0.01,0.01);
				cantidadmonedas=this.add.text(mon.x+10,mon.y+8,mon.cantidad,{fontsize:'40px',fill:'#000000'});
				cantidadmonedas.setDepth(7);
				
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

			if(objetos[i]=='pocionP' && curaP.cantidad >0){
				curaP.alpha = 0;

				if(curaP.cantidad>0){
					cantidadPocionP.alpha=0;
				}
				
			}
			if(objetos[i]=='pocionM' && curaM.cantidad >0){
				curaM.alpha = 0;

				if(curaM.cantidad>0){
					cantidadPocionM.alpha=0;
				}
				
			}
			if(objetos[i]=='pocionG' && curaG.cantidad >0){
				curaG.alpha = 0;

				if(curaG.cantidad>0){
					cantidadPocionG.alpha=0;
				}
				
			}
			if(objetos[i]=='flechas' && flechaI.cantidad >0){
				flechaI.alpha = 0;

				if(flechaI.cantidad>0){
					cantidadflechas.alpha=0;
				}
				
			}

			if(objetos[i]=='escudo'){
				lg_escudo.alpha = 0;

				if(lg_escudo.cantidad>0){
					cantidadEscudo.alpha=0;
				}
			}
			if(objetos[i]=='monedas'){
				mon.alpha = 0;

				if(mon.cantidad>0){
					cantidadmonedas.alpha=0;
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

    curaP.on('pointerdown', function (pointer) {

        if (curaP.cantidad>0) {
			curaP.alpha = 0;
			cantidadPocionP.alpha=0;
			
			curaP.cantidad--;

		
		}

    });
    curaM.on('pointerdown', function (pointer) {

        if (curaM.cantidad>0) {
			curaM.alpha = 0;
			cantidadPocionM.alpha=0;
			
			curaM.cantidad--;

		
		}

    });
    curaG.on('pointerdown', function (pointer) {

        if (curaG.cantidad>0) {
			curaG.alpha = 0;
			cantidadPocionG.alpha=0;
			
			curaG.cantidad--;

		
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
