var esqueleto;
var distancia;
var EnDisp = 100;
var i;
export var dispEnlList;
var disparoE;
var distancia;
var enemigosList;
var s;
var couldowndamage = 0;
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
					disparoE.damage = 1;
					this.physics.moveToObject(disparoE, personaje.player, 300);

				atacante.EnDisp = 100;
			}
		else
		{
			atacante.EnDisp = atacante.EnDisp -1;
		}
	}
}


export function acciones()
{
	dispEnemies.call(this);
	
	couldowndamage--;
}
export function inicio()
{

	enemigosList = this.physics.add.group();
	monedasList = this.physics.add.group();

	

	dispEnlList = this.physics.add.group();

	this.physics.add.overlap(personaje.player, dispEnlList, personaje.perderVida, null, this);
	this.physics.add.overlap(personaje.arma, enemigosList, perderVida, null, this);
	this.physics.add.overlap(personaje.bombas, enemigosList, perderVida, null, this);
	this.physics.add.overlap(personaje.flechasList, enemigosList, perderVida, null, this);
	this.physics.add.overlap(personaje.aura, dispEnlList, personaje.eliminarEscudo, null, this);
	
	
    


    escena2.spawnSkeleton.forEach(obj=>{

		obj.setAlpha(0);
		esqueleto= enemigosList.create(obj.x, obj.y,'arquero');
		esqueleto.setScale(0.05, 0.05);
		esqueleto.vida = 5;
		esqueleto.distancia = 0;
		esqueleto.EnDisp = 10;
		esqueleto.setScale(0.05, 0.05);


	}
		);
	 
}
export function destroyShot(s, n)
{
	s.destroy();
}
function perderVida(s, n)
{
	if(couldowndamage <= 0)
	{
		n.vida = n.vida - s.damage;
		console.log("esqueleto="+n.vida);
		couldowndamage = 30;
		if(n.vida <= 0)
		{
			var drop = Phaser.Math.Between(1,2);

			if(drop == 1)
			{
				dinero=personaje.monedasList.create(n.x,n.y,'moneda');
				dinero.setScale(0.01,0.01);
			}
			n.destroy();


		}
		if(s.flecha == true)
		{
			s.destroy();
		}
	}
}
