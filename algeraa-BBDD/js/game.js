
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
				debug: false,
				gravity:{y:0}
			}
		},
		scene: [Bosque, HUD, Castillo, Cueva]
};


export function guardar()
{
	guardInventario.call(this);
	var user = localStorage.getItem("nUsuario");
	var inventory = localStorage.getItem("cIventario");
	var xhr=new XMLHttpRequest();	


	xhr.open("POST", "./php/guardado.php",true);

	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange=function() {
		if (xhr.readyState==4 && xhr.status==200) {

			var respuesta2=JSON.parse(this.responseText);
			alert(respuesta2);
		}
	}


	xhr.send("flechasC="+FlechasC+"&bombasC="+BombasC+"&curaP="+curaPC+"&curaM="+curaMC+"&curaG="+curaGC+"&dineroC="+DineroC+"&usuario="+user+"&idInvent="+inventory+"&escenaA="+escenaActual+"&escenaP="+escenaPasada+"&llaveCastillo="+llaveCastillo+"&llaveCueva="+llaveCueva+"&hachaRecogida="+hachaRecogida);

}

var game=new Phaser.Game(config);
export var escenaActual = 1;
export var escenaPasada = 0;
export var FlechasC = parseInt(localStorage.getItem("cantidadFlechas"),10);
export var BombasC = parseInt(localStorage.getItem("cantidadBomb"),10); 
export var curaPC = parseInt(localStorage.getItem("cantidadPocionP"),10);
export var curaMC = parseInt(localStorage.getItem("cantidadPocionM"),10);
export var curaGC = parseInt(localStorage.getItem("cantidadPocionG"),10);
export var DineroC = parseInt(localStorage.getItem("cantidadDinero"),10);
export var llaveCastillo = false;
export var llaveCueva = 0;
export var pesoInvent = 15;
export var vidaPer = 10;
export var hachaRecogida = false;
export var posX;
export var posY;



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
	DineroC = personaje.mon.cantidad;
	llaveCastillo = personaje.player.tienellave;
	pesoInvent = personaje.pesoInventario;
	vidaPer = personaje.vida;
	llaveCueva = personaje.llaveCueva;
	hachaRecogida = personaje.player.hachaR;
	posX = personaje.player.x;
	posY = personaje.player.y;
	
	console.log("pesoInventario="+personaje.pesoInventario)
	console.log("pesoInvent="+pesoInvent);
}