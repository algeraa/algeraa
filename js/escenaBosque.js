var escalaEnemy = 0.4;
var escapaDisparo = 0.05;
var map;
var fl;
var ArbolesC;

export var cameras;
export var spawnSkeleton, entradaTaberna, entradaCastillo, arbolesSpawn;
export var spawn;
import HUD from './HUD.js'
//var entrarTaberna;
//export var suelo, objetos, arboles1, arboles2, arboles3, arboles4;

import * as esqueleto from './esqueleto.js';
import * as personaje from './personaje.js';
import * as planta from './planta.js';
import * as arana from './arana.js';
import * as pared from './pared.js';
import prueba from './pruebaCambio.js';
import * as trampas from './trampas.js';
import * as zombie from './zombie.js';

var entrar = 0;
export var escenaActual = 1;
var arbolesList;
export var hachaSprite, troncoSprite;


export default class Bosque extends Phaser.Scene {
	constructor(){
		super({key: "Bosque"});
	}
	preload() {
	
	
		

		this.load.tilemapTiledJSON('mapa', 'assets/images/mapa.json');
		this.load.image('tiles', 'assets/images/tf_jungle_tileset.png');
		this.load.image('tiles2', 'assets/images/village-palette01-day.png');

		this.load.image('arbolH', 'assets/sprites/arbol.png');
		this.load.image('hacha', 'assets/sprites/Hacha.png');
		this.load.image('tronco', 'assets/sprites/Tronco.png');

		esqueleto.cargarSprites.call(this);
		personaje.cargarSprites.call(this);
		personaje.cargarInventario.call(this);
		planta.cargarSprites.call(this);
		arana.cargarSprites.call(this);
		pared.cargarSprites.call(this);
		trampas.cargarSprites.call(this);
		zombie.cargarSprites.call(this);
	}


create()
{
	
	map = this.make.tilemap({ key: 'mapa' });
	var tilesets = map.addTilesetImage('bosque', 'tiles');
	var tilesets2 = map.addTilesetImage('taberna', 'tiles2');
	var suelo = map.createLayer('Camino', tilesets, 0, 0);
	var objetos = map.createLayer('Bordes', tilesets, 0, 0);
	var arboles1 = map.createLayer('Arboles/Arboles1', tilesets, 0, 0).setDepth(3);;
	var arboles2 = map.createLayer('Arboles/Arboles2', tilesets, 0, 0).setDepth(3);;
	var arboles3 = map.createLayer('Arboles/Arboles3', tilesets, 0, 0).setDepth(3);;
	var arboles4 = map.createLayer('Arboles/Arboles4', tilesets, 0, 0).setDepth(3);;
	var piedras = map.createLayer('Piedras', tilesets, 0, 0);
	var Taberna = map.createLayer('Taberna', tilesets2, 0, 0);
	var Taberna2 = map.createLayer('Taberna2', tilesets2, 0, 0);
	var Arbustos = map.createLayer('Arbustos', tilesets, 0, 0);
	
	
	

	entradaTaberna = map.createFromObjects('taberna');
	entradaCastillo = map.createFromObjects('cambioNiveles');

	spawnSkeleton = map.createFromObjects('Esqueletos');
	spawn = map.createFromObjects('Spawn');

	arbolesSpawn = map.createFromObjects('ArbolesHacha');

	

	
	objetos.setCollisionByProperty({ collide: true });
	Taberna2.setCollisionByProperty({ collide: true });
	Taberna.setCollisionByProperty({ collide: true });
	
	arbolesList = this.physics.add.group();
	
	entradaTaberna.forEach(entrada => {
        this.physics.world.enable(entrada);
    })
    entradaCastillo.forEach(castillo => {
        this.physics.world.enable(castillo);
    })
    var detecArbol = 0;
	arbolesSpawn.forEach(obj => {
        obj.setAlpha(0);
        var arboles=arbolesList.create(obj.x, obj.y,'arbolH');
        arboles.setOrigin(0.5,1);
        arboles.setImmovable(true);
        if(detecArbol == 0)
        {
        arboles.derecha = true;
        detecArbol++;
   	 	}
    })
	
	cameras = this.cameras.main.setBounds(0, 0, 800 * 3, 600 * 3);
    this.physics.world.setBounds(0, 0, 800 * 3, 600 * 3);
    
	personaje.createP.call(this);
	personaje.crearInventario.call(this);
	esqueleto.inicio.call(this);
	/*trampas.crearTrampas.call(this);*/
	
	hachaSprite = this.physics.add.sprite(2250,175, 'hacha');
	troncoSprite = this.physics.add.sprite(2250,175, 'tronco');
	troncoSprite.setAlpha(0);
	troncoSprite.setImmovable(true);

	this.physics.add.collider(personaje.player, suelo);
	this.physics.add.collider(personaje.player, objetos);
	this.physics.add.collider(personaje.player, Taberna);
	this.physics.add.collider(personaje.player, Taberna2);
	this.physics.add.collider(personaje.player, arbolesList, derribarArbol);
	this.physics.add.collider(personaje.player, troncoSprite, personaje.recogerHacha);
	
	this.physics.add.overlap(personaje.player, entradaTaberna, entrarTaberna, null, this);
	this.physics.add.collider(esqueleto.dispEnlList, objetos, esqueleto.destroyShot);
	this.physics.add.overlap(personaje.player, entradaCastillo, entrarCastillo, null, this);

	
	/*planta.inicio.call(this);
	this.physics.add.collider(planta.venenoso, objetos, planta.destroyShot);
	arana.inicio.call(this);
	pared.inicio.call(this);
	zombie.inicio.call(this);*/

	//var pocionP = this.add.sprite(200,300,'pocion');
	


}

	update()
	{

		personaje.movimiento.call(this);
		personaje.inventario.call(this);
		esqueleto.acciones.call(this);
		/*planta.acciones.call(this);
		arana.acciones.call(this);*/
		personaje.acciones.call(this);
		//zombie.acciones.call(this);
	
	}


	
}

function entrarTaberna()
	{
		
		this.scene.start("prueba");
	}
function entrarCastillo()
	{
		escenaActual = 2;
		this.scene.start("Castillo");

	}
function derribarArbol(s,n)
{
	if(personaje.hacha.isDown && personaje.player.hachaR == true)
	{
		if(n.derecha = false)
		{	
			n.body.enable = false;
			n.angle = 90;
			n.x=n.x+22;
		}
		else
		{
			n.body.enable = false;
			n.angle = -90;
			n.x=n.x-10;
		}
	}
		

}