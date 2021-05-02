var escalaEnemy = 0.4;
var escapaDisparo = 0.05;
var map;
var fl;
var ArbolesC;

export var cameras;
export var spawnSkeleton, entradaTaberna;
export var spawn;
//var entrarTaberna;
//export var suelo, objetos, arboles1, arboles2, arboles3, arboles4;

import * as esqueleto from './esqueleto.js';
import * as personaje from './personaje.js';
import * as planta from './planta.js';
import * as arana from './arana.js';
import * as pared from './pared.js';
import prueba from './pruebaCambio.js';
import * as trampas from './trampas.js';

var entrar = 0;

export default class Escena2 extends Phaser.Scene {
	constructor(){
		super({key: "Escena2"});
	}
	preload() {
		this.load.image('bosque', 'assets/images/bosque.png');
		this.load.image('player', 'assets/sprites/personaje.png');
		//this.load.image('pocion', 'assets/sprites/pocionPequena.png');
		this.load.atlas('atlas', 'assets/sprites/spritesheet.png', 'assets/sprites/sprites.json');

		this.load.tilemapTiledJSON('mapa', 'assets/images/mapa.json');
		this.load.image('tiles', 'assets/images/tf_jungle_tileset.png');
		this.load.image('tiles2', 'assets/images/village-palette01-day.png');

		this.load.image('flecha', 'assets/sprites/flecha.png');

		esqueleto.cargarSprites.call(this);
		personaje.cargarSprites.call(this);
		personaje.cargarInventario.call(this);
		planta.cargarSprites.call(this);
		arana.cargarSprites.call(this);
		pared.cargarSprites.call(this);
		trampas.cargarSprites.call(this);
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
	
	var ArbolesC = map.createLayer('ArbolesC', tilesets, 0, 0);
	

	entradaTaberna = map.createFromObjects('taberna');


	spawnSkeleton = map.createFromObjects('Esqueletos');
	spawn = map.createFromObjects('Spawn');

	

	//suelo.setCollisionByProperty({ collide: true });
	objetos.setCollisionByProperty({ collide: true });
	Taberna2.setCollisionByProperty({ collide: true });
	Taberna.setCollisionByProperty({ collide: true });
	ArbolesC.setCollisionByProperty({ collide: true });



	entradaTaberna.forEach(entrada => {
        this.physics.world.enable(entrada);
    })
	
	
	cameras = this.cameras.main.setBounds(0, 0, 800 * 3, 600 * 3);
    this.physics.world.setBounds(0, 0, 800 * 3, 600 * 3);
    
	personaje.createP.call(this);
	personaje.crearInventario.call(this);

	this.physics.add.collider(personaje.player, suelo);
	this.physics.add.collider(personaje.player, objetos);
	this.physics.add.collider(personaje.player, Taberna);
	this.physics.add.collider(personaje.player, Taberna2);
	this.physics.add.collider(personaje.player, ArbolesC);
	this.physics.add.overlap(personaje.player, entradaTaberna, entrarTaberna);


	
	
	

	esqueleto.inicio.call(this);
	/*planta.inicio.call(this);
	arana.inicio.call(this);
	pared.inicio.call(this);*/

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
		if(entrar == 1)
		{
			this.scene.start("prueba");
		}
		
	}


	
}

function entrarTaberna()
	{
		entrar = 1;
	}
