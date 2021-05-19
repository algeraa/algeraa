
import Bosque from './escenaBosque.js';
import prueba from './pruebaCambio.js';
import HUD from './HUD.js'
import Castillo from './escenaCastillo.js';
import Cueva from './cueva.js';
import * as personaje from './personaje.js';

var config=
{
	type:Phaser.AUTO,
		width:800,
		height:600,
		physics:{
			default:'arcade',
			arcade:{
				debug: false,
				gravity:{y:0}
			}
		},
		scene: [Bosque, prueba, HUD, Castillo, Cueva]
};

var game=new Phaser.Game(config);
export var escenaActual = 1;
export var escenaPasada = 0;
export var FlechasC = 0;
export var BombasC = 0;
export var curaPC = 0;
export var curaMC = 0;
export var curaGC = 0;
export var dineroC = 0;
export var llaveCastillo = false;
export var pesoInvent = 15;
export var vidaPer = 10;

export function iniciarCueva()
{

	if(personaje.llaveCueva)
	{
		guardInventario.call(this);

		escenaActual = 2;
		this.scene.start("Cueva");
	}
}

export function iniciarBosque()
{
	guardInventario.call(this);
	escenaPasada = 2;
	escenaActual = 1;
	console.log("vuelta bosque");
	this.scene.start("Bosque");
}
export function entrarCastillo()
{
	if(personaje.player.tienellave)
	{
		guardInventario.call(this);
		escenaPasada = 1;
		escenaActual = 3;

		this.scene.start("Castillo");
	}
}
export function VolverBosqueCueva()
{
	guardInventario.call(this);
	escenaPasada = 3;
	escenaActual = 1;

	this.scene.start("Bosque");
}
function guardInventario()
{
	FlechasC = personaje.flechaI.cantidad;
	BombasC = personaje.bomb.cantidad;
	curaPC = personaje.curaP.cantidad;
	curaMC = personaje.curaM.cantidad;
	curaGC = personaje.curaG.cantidad;
	dineroC = personaje.player.dinero;
	llaveCastillo = personaje.player.tienellave;
	pesoInvent = personaje.pesoInventario;
	vidaPer = personaje.vida;
}