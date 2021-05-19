
import * as personaje from './personaje.js';
import * as esqueleto from './esqueleto.js';
import * as zombie from './zombie.js';
import * as trampas from './trampas.js';
import * as games from './game.js';
import * as armadura from './armadura.js';

var map;
var paredes;
export var escenaActual = 3;
export var cameras;
export var spawn;
export var enemigoArmor;
var salidaCastillo;
var tilesetsCastillo;
export var pedestal_escudo;
var escudoList;
var invisible;
export var spawnSkeleton,spawnZombie;


export default class Castillo extends Phaser.Scene {

	constructor(){
		super({key: "Castillo"});
	}

	preload() {

		this.load.tilemapTiledJSON('mapa_castillo', 'assets/images/MapaCastillo2.json');

		this.load.image('tilesCastillo', 'assets/images/Dungeon_tileset.png');

		this.load.image('flecha', 'assets/sprites/flecha.png');

		this.load.image('pedestal_escudo','assets/sprites/pedestal_escudo.png');

		this.load.image('invisible','assets/sprites/invisible1.png');

		esqueleto.cargarSprites.call(this);
		zombie.cargarSprites.call(this);

		personaje.cargarSprites.call(this);
		personaje.cargarInventario.call(this);

		trampas.cargarSprites.call(this);
		armadura.cargarSprites.call(this);

		escudoList=this.physics.add.group();
	
	}

	create()
	{
		
		map = this.make.tilemap({ key: 'mapa_castillo' });

		tilesetsCastillo = map.addTilesetImage('castillo_tileset', 'tilesCastillo');

		var suelo = map.createLayer('Fondo', tilesetsCastillo, 0, 0);
		var paredes = map.createLayer('Paredes', tilesetsCastillo, 0, 0);
		var decoracion = map.createLayer('Decoracion', tilesetsCastillo, 0, 0);

		spawn = map.createFromObjects('Inicio');
		enemigoArmor = map.createFromObjects('Armadura');
		salidaCastillo = map.createFromObjects('Volver');

		spawnSkeleton = map.createFromObjects('Arqueros');
		spawnZombie = map.createFromObjects('Zombies');
		
		paredes.setCollisionByProperty({ Colisiones: true });
		decoracion.setCollisionByProperty({ Colisiones: true });

		pedestal_escudo=escudoList.create(210,200,'pedestal_escudo');
		pedestal_escudo.setOrigin(0.5,0.5);
		pedestal_escudo.setScale(0.5,0.5);


		invisible=this.physics.add.sprite(1230,500,'invisible');
   		invisible.setOrigin(0.5,0.5);
    	invisible.setScale(2,0.5);



		salidaCastillo.forEach(salir => {
        	this.physics.world.enable(salir);
    	})

		cameras = this.cameras.main.setBounds(0, 0, 800 * 3, 600 * 3);
	    this.physics.world.setBounds(0, 0, 800 * 3, 600 * 3);
	    
		personaje.createP.call(this);
		personaje.crearInventario.call(this);
		esqueleto.inicio.call(this);
		zombie.inicio.call(this);

		armadura.crearArmadura.call(this);
		trampas.crearTrampas.call(this);

		this.physics.add.collider(personaje.player, suelo);
		this.physics.add.collider(personaje.player,salidaCastillo, games.VolverBosqueCueva, null, this);
		this.physics.add.collider(personaje.player, paredes);
		this.physics.add.collider(armadura.armor, paredes);
		this.physics.add.collider(personaje.player, decoracion);

		this.physics.add.collider(armadura.shotList , paredes, armadura.destroyShot);
		this.physics.add.collider(armadura.shotGuiadoList , paredes, armadura.destroyShot);

		this.physics.add.overlap(personaje.player,pedestal_escudo,personaje.cogerEscudo,null,this);

		this.physics.add.overlap(personaje.player,invisible,armadura.activarArmadura,null,this);

		this.physics.add.collider(esqueleto.dispEnlList, paredes, esqueleto.destroyShot);
		this.physics.add.collider(zombie.enemigosList, paredes);

	}

	update()
	{

		personaje.movimiento.call(this);
		personaje.inventario.call(this);

		esqueleto.acciones.call(this);
		zombie.acciones.call(this);
		
		armadura.acciones.call(this);
		personaje.acciones.call(this);
		

		
	}


	
}

