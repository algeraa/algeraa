var escalaEnemy = 0.4;
var escapaDisparo = 0.05;
export let player;
var velocity;
var UP, DOWN, RIGHT, LEFT;
var pocionSelect;
var pocion, cPocion;
var couldownP = 0;
var couldownCp = 0;
export var vida;
import * as esqueleto from './zombie.js';


export function cargarSprites()
{
	this.load.image('player', 'assets/sprites/personaje.png');
}

export function createP()
{
	pocionSelect = 1;


	player=this.physics.add.sprite(400,300,'player');
	
	escala.call(this);
	
	velocity = 5;

	

	UP=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	DOWN=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	RIGHT=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
	LEFT=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	cPocion=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
	pocion=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);


	player.setCollideWorldBounds(true);
	this.cameras.main.startFollow(player, true, 0.1, 0.1);

	vida = 10;


}



export function movimiento()
{
	if(UP.isDown)
	{
		player.setVelocityY(-200);
	}
	else if(DOWN.isDown)
	{
		player.setVelocityY(200);
	}
	else
	{
		player.setVelocityY(0);
	}
	if(RIGHT.isDown)
	{
		player.setVelocityX(200); 
	}
	else if(LEFT.isDown)
	{
		player.setVelocityX(-200);
		
	}
	else
	{
		player.setVelocityX(0);
	}
}
export function perderVida()
{
	vida = vida-1;
	console.log(vida);
	if(vida <= 0)
	{
		player.x = 400;
		player.y = 300;
		vida = 10;
	}
}
export function acciones()
{
	cambioP.call(this);
	pociones.call(this);
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
	player.setOrigin(0.5,0.5);
	player.setScale(escalaPlayer,escalaPlayer);
}

