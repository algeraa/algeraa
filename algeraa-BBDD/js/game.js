
import Bosque from './escenaBosque.js';
import HUD from './HUD.js'
import Castillo from './escenaCastillo.js';
import Cueva from './cueva.js';
import * as personaje from './personaje.js';
import * as datos from './datos.js';

var config=
{
	type:Phaser.AUTO,
		width:800,
		height:600,
		physics:{
			default:'arcade',
			arcade:{
				debug: true,
				gravity:{y:0}
			}
		},
		scene: [Bosque, HUD, Castillo, Cueva]
};

var game=new Phaser.Game(config);
export var escenaActual = 1;
export var escenaPasada = 0;
export var FlechasC = parseInt(localStorage.getItem("cantidadFlechas"),10);
export var BombasC = parseInt(localStorage.getItem("cantidadBomb"),10); 
export var curaPC = parseInt(localStorage.getItem("cantidadPocionP"),10);
export var curaMC = parseInt(localStorage.getItem("cantidadPocionM"),10);
export var curaGC = parseInt(localStorage.getItem("cantidadPocionG"),10);
export var dineroC = parseInt(localStorage.getItem("cantidadDinero"),10);
export var llaveCastillo = false;
export var llaveCueva = false;
export var pesoInvent = 15;
export var vidaPer = 10;
export var hachaRecogida = false;



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
export function VolverBosqueCastillo()
{
	guardInventario.call(this);
	escenaPasada = 3;
	escenaActual = 1;

	this.scene.start("Bosque");
}
function guardInventario()
{
	console.log("pesoInventario="+personaje.pesoInventario)
	console.log("pesoInvent="+pesoInvent);
	FlechasC = personaje.flechaI.cantidad;
	BombasC = personaje.bomb.cantidad;
	curaPC = personaje.curaP.cantidad;
	curaMC = personaje.curaM.cantidad;
	curaGC = personaje.curaG.cantidad;
	dineroC = personaje.mon.cantidad;
	llaveCastillo = personaje.player.tienellave;
	pesoInvent = personaje.pesoInventario;
	vidaPer = personaje.vida;
	llaveCueva = personaje.player.cueva;
	hachaRecogida = personaje.player.hachaR;
	
	console.log("pesoInventario="+personaje.pesoInventario)
	console.log("pesoInvent="+pesoInvent);
}