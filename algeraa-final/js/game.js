
import Bosque from './escenaBosque.js';
import HUD from './HUD.js'
import Castillo from './escenaCastillo.js';
import Cueva from './cueva.js';
import Inicio from './inicio.js';
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
		scene: [Inicio, Bosque, HUD, Castillo, Cueva]
};


export function guardar()
{
	////console.log(vidaPer)
	guardInventario.call(this);
	var user = localStorage.getItem("cUsuario");
	var inventory = localStorage.getItem("cIventario");
	var xhr=new XMLHttpRequest();	

	
	xhr.open("POST", "./php/guardado.php",true);

	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange=function() {
		if (xhr.readyState==4 && xhr.status==200) {

			/*var respuesta2=JSON.parse(this.responseText);
			console.log(respuesta2);*/
		}
	}


	xhr.send("flechasC="+FlechasC+"&bombasC="+BombasC+"&curaP="+curaPC+"&curaM="+curaMC+"&curaG="+curaGC+"&dineroC="
	+DineroC+"&usuario="+user+"&idInvent="+inventory+"&escenaA="+escenaActual+"&escenaP="+escenaPasada+"&llaveCastillo="
	+llaveCastillo+"&llaveCueva="+llaveCuevaG+"&hachaRecogida="+hachaRecogida+"&vidaPers="+vidaPer+"&pesoInvent="+pesoInvent+"&posx="+posX+"&posy="+posY);

}

var game=new Phaser.Game(config);
export var escenaActual = parseInt(localStorage.getItem("esAct"),10);
export var escenaPasada = parseInt(localStorage.getItem("esPast"),10);
export var FlechasC = parseInt(localStorage.getItem("cantidadFlechas"),10);
export var BombasC = parseInt(localStorage.getItem("cantidadBomb"),10); 
export var curaPC = parseInt(localStorage.getItem("cantidadPocionP"),10);
export var curaMC = parseInt(localStorage.getItem("cantidadPocionM"),10);
export var curaGC = parseInt(localStorage.getItem("cantidadPocionG"),10);
export var DineroC = parseInt(localStorage.getItem("cantidadDinero"),10);

export var llaveCastillo = parseInt(localStorage.getItem("caUnlock"),10);
export var llaveCuevaG = parseInt(localStorage.getItem("cuUnlock"),10);
export var pesoInvent = parseInt(localStorage.getItem("peso"),10);
export var vidaPer = parseInt(localStorage.getItem("vida"),10);
export var hachaRecogida =parseInt(localStorage.getItem("axe"),10);
export var posX = parseInt(localStorage.getItem("posx"),10);
export var posY = parseInt(localStorage.getItem("posy"),10);



export function iniciarCueva()
{

	if(personaje.llaveCueva)
	{
		guardInventario.call(this);

		escenaActual = 2;
		escenaPasada = 1;
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
	
	FlechasC = personaje.flechaI.cantidad;
	BombasC = personaje.bomb.cantidad;
	curaPC = personaje.curaP.cantidad;
	curaMC = personaje.curaM.cantidad;
	curaGC = personaje.curaG.cantidad;
	DineroC = personaje.mon.cantidad;
	llaveCastillo = personaje.player.tienellave;
	pesoInvent = personaje.pesoInventario;
	vidaPer = personaje.vida;
	llaveCuevaG = personaje.llaveCueva;
	hachaRecogida = personaje.player.hachaR;
	posX = personaje.player.x;
	posY = personaje.player.y;
	
}