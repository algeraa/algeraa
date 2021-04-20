var esqueleto;
var distancia;
var EnDisp = 100;
var i;
var dispEnlList;
var disparoE;
var distancia;
var enemigosList;
var s;
var couldownDaño = 0;
var muerto;
var monedasList;
var dinero;
import * as escena2 from './escena2.js';
import * as personaje from './personaje.js';

export function cargarSprites()
{
	this.load.image('arquero','assets/sprites/esqueleto.png');
	this.load.image('flecha','assets/sprites/flecha.png');
	this.load.image('moneda','assets/sprites/moneda.png');
}

function movDisparosEn()
{
	for (i = 0;i<dispEnlList.getChildren().length;i++)	
	{
		var tiro = dispEnlList.getChildren()[i];
		tiro.x=tiro.x + tiro.velocity * tiro.direccion.x;
		tiro.y=tiro.y + tiro.velocity * tiro.direccion.y;

	}	
}
function dispEnemies()
{
	
	for (i = 0;i<enemigosList.getChildren().length;i++)	
	{
		var atacante = enemigosList.getChildren()[i];
		atacante.distancia = Math.sqrt(Math.pow(personaje.player.x-atacante.x, 2) + Math.pow(personaje.player.y-atacante.y, 2));

		if(atacante.EnDisp <= 0 && atacante.distancia < 200)
			{	
				
					

					disparoE=dispEnlList.create(atacante.x, atacante.y,'flecha');
					disparoE.setScale(0.1,0.1);
					disparoE.angle = 45;
					disparoE.direccion=new Phaser.Math.Vector2(personaje.player.x-atacante.x,personaje.player.y-atacante.y);
					disparoE.velocity = 10;
					disparoE.direccion.normalize();
					disparoE.angle = 180/Math.PI*Phaser.Math.Angle.Between(disparoE.x, disparoE.y, personaje.player.x, personaje.player.y);

					//disparoE.setVelocity()
				

				atacante.EnDisp = 100;
			}
		else
		{
			atacante.EnDisp = atacante.EnDisp -1;
		}
	}
}

function destroyPlayer(e, s)
{
	personaje.perderVida.call(this);	

	s.disableBody(true, true);

	dispEnlList.remove(s);
}

export function acciones()
{
	//dispEnemies.call(this);
	movDisparosEn.call(this);
	couldownDaño--;
}
export function inicio()
{

	enemigosList = this.physics.add.group();
	//monedasList = this.physics.add.group();

	for(var e = 0; e < 2; e++)
	{
		if(e ==0)
		{
			esqueleto= enemigosList.create(500,300,'arquero');
		}
		else
		{
			esqueleto=enemigosList.create(500,100,'arquero');
		}
		esqueleto.setScale(0.05, 0.05);
		esqueleto.vida = 5;
		esqueleto.distancia = 0;
		esqueleto.EnDisp = 10;
	}
		
	esqueleto.setScale(0.05, 0.05);

	dispEnlList = this.physics.add.group();

	this.physics.add.overlap(personaje.player, dispEnlList, destroyPlayer, null, this);
	this.physics.add.overlap(personaje.arma, enemigosList, perderVida, null, this);
	this.physics.add.overlap(personaje.flechasList, enemigosList, perderVida, null, this);
	this.physics.add.overlap(personaje.bombas, enemigosList, perderVida, null, this);
	 
}
function perderVida(s, n)
{
	if(couldownDaño <= 0)
	{
		n.vida = n.vida - s.daño;
		console.log("esqueleto="+n.vida);
		couldownDaño = 30;
		if(n.vida <= 0)
		{
			var drop = Phaser.Math.Between(1,2);

			if(drop == 1)
			{
				dinero=personaje.monedasList.create(n.x,n.y,'moneda');
				dinero.setScale(0.01,0.01);
			}
			n.disableBody(true, true);

			enemigosList.remove(n);


		}
		if(s.flecha = true)
		{
			//s.disableBody(true, true);

			//personaje.flechasList.remove(s);
			s.destroy();
		}
	}
}
