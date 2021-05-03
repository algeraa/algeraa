
import * as personaje from './personaje.js';
import * as trampas from './trampas.js';

var map;
export var cameras;
export var spawn;

export default class Castillo extends Phaser.Scene {

	constructor(){
		super({key: "Castillo"});
	}

	preload() {

		this.load.image('player', 'assets/sprites/personaje.png');

		this.load.tilemapTiledJSON('mapa_castillo', 'assets/images/MapaCastillo2.json');

		this.load.image('tiles', 'assets/images/Dungeon_tileset.png');
		//this.load.image('tiles2', 'assets/images/T001.png');

		this.load.image('flecha', 'assets/sprites/flecha.png');

		//esqueleto.cargarSprites.call(this);
		personaje.cargarSprites.call(this);
		personaje.cargarInventario.call(this);
		//planta.cargarSprites.call(this);
		//arana.cargarSprites.call(this);
		//pared.cargarSprites.call(this);
		trampas.cargarSprites.call(this);
	
	}

	create()
	{
		
		map = this.make.tilemap({ key: 'mapa_castillo' });

		var tilesets = map.addTilesetImage('castillo_tileset', 'tiles');
		//var tilesets2 = map.addTilesetImage('salaRey', 'tiles2');

		var suelo = map.createLayer('Fondo', tilesets, 0, 0);
		var paredes = map.createLayer('Paredes', tilesets, 0, 0);
		var decoracion = map.createLayer('Decoracion', tilesets, 0, 0);

		/*var arboles1 = map.createLayer('Arboles/Arboles1', tilesets, 0, 0).setDepth(3);;
		var arboles2 = map.createLayer('Arboles/Arboles2', tilesets, 0, 0).setDepth(3);;
		var arboles3 = map.createLayer('Arboles/Arboles3', tilesets, 0, 0).setDepth(3);;
		var arboles4 = map.createLayer('Arboles/Arboles4', tilesets, 0, 0).setDepth(3);;
		var piedras = map.createLayer('Piedras', tilesets, 0, 0);
		var Taberna = map.createLayer('Taberna', tilesets2, 0, 0);
		var Taberna2 = map.createLayer('Taberna2', tilesets2, 0, 0);
		var Arbustos = map.createLayer('Arbustos', tilesets, 0, 0);
		
		var ArbolesC = map.createLayer('ArbolesC', tilesets, 0, 0);
		

		entradaTaberna = map.createFromObjects('taberna');


		spawnSkeleton = map.createFromObjects('Esqueletos');*/
		spawn = map.createFromObjects('Spawn');


		

		//suelo.setCollisionByProperty({ collide: true });
		paredes.setCollisionByProperty({ collide: true });

		//Taberna.setCollisionByProperty({ collide: true });
		//ArbolesC.setCollisionByProperty({ collide: true });



		/*entradaTaberna.forEach(entrada => {
	        this.physics.world.enable(entrada);
	    })*/
		
		
		cameras = this.cameras.main.setBounds(0, 0, 800 * 3, 600 * 3);
	    this.physics.world.setBounds(0, 0, 800 * 3, 600 * 3);
	    
		personaje.createP.call(this);
		personaje.crearInventario.call(this);

		this.physics.add.collider(personaje.player, suelo);
		this.physics.add.collider(personaje.player, paredes);

		/*this.physics.add.collider(personaje.player, Taberna);
		this.physics.add.collider(personaje.player, Taberna2);
		this.physics.add.collider(personaje.player, ArbolesC);
		this.physics.add.overlap(personaje.player, entradaTaberna, entrarTaberna);*/


		
		
		

		//esqueleto.inicio.call(this);
		/*planta.inicio.call(this);
		arana.inicio.call(this);
		pared.inicio.call(this);*/
		trampas.crearTrampas.call(this);
		//var pocionP = this.add.sprite(200,300,'pocion');
	}

	update()
	{

		personaje.movimiento.call(this);
		personaje.inventario.call(this);
		//esqueleto.acciones.call(this);
		/*planta.acciones.call(this);
		arana.acciones.call(this);*/
		personaje.acciones.call(this);

		
	}


	
}

