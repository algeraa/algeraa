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

function recogerDinero(n, s)
{
	player.dinero = player.dinero + 1;
	console.log("dinero = "+player.dinero)

	s.destroy();
}



export function movimiento()
{
	if(UP.isDown)
	{
		player.setVelocityY(-200);
		player.direccion = 270;
	}
	else if(DOWN.isDown)
	{
		player.setVelocityY(200);
		player.direccion = 90;
	}
	else
	{
		player.setVelocityY(0);
	}
	if(RIGHT.isDown)
	{
		player.setVelocityX(200); 
		player.direccion = 0;
	}
	else if(LEFT.isDown)
	{
		player.setVelocityX(-200);
		player.direccion = 180;
	}
	else
	{
		player.setVelocityX(0);
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