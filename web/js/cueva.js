var escalaEnemy = 0.4;
var escapaDisparo = 0.05;
var map;
var fl;
var ArbolesC;


export var cameras;
export var spawnSkeleton, entradaTaberna, spawnZombie, spawnSpider, spawnKey, spawnVagabundo, volverBosque, spawnRoca;
export var spawn;


import * as esqueleto from './esqueleto.js';
import * as personaje from './personaje.js';
import * as planta from './planta.js';
import * as arana from './arana.js';
import * as pared from './pared.js';
import prueba from './pruebaCambio.js';
import * as games from './game.js';
import * as trampas from './trampas.js';
import * as zombie from './zombie.js';
import * as llave from './llave.js';
import * as vagabundo from './vagabundo.js';

var entrar = 0;

export default class Cueva extends Phaser.Scene {
	constructor(){
		super({key: "Cueva"});
	}
	preload() {

		this.load.image('player', 'assets/sprites/personaje.png');

		this.load.atlas('atlas', 'assets/sprites/spritesheet.png', 'assets/sprites/sprites.json');

		this.load.tilemapTiledJSON('mapaC', 'assets/images/cueva.json');
		this.load.image('tilesCueva', 'assets/images/cueva.png');

		this.load.image('flecha', 'assets/sprites/flecha.png');

		esqueleto.cargarSprites.call(this);
		personaje.cargarSprites.call(this);
		personaje.cargarInventario.call(this);
		//planta.cargarSprites.call(this);
		arana.cargarSprites.call(this);
		pared.cargarSprites.call(this);
		zombie.cargarSprites.call(this);
		llave.cargarSprites.call(this);
		pared.cargarSprites.call(this);
		vagabundo.cargarSprites.call(this);
	}


create()
{
	map = this.make.tilemap({ key: 'mapaC' });
	var tilesets = map.addTilesetImage('cueva', 'tilesCueva');
	//var tilesets2 = map.addTilesetImage('taberna', 'tiles2');
	var suelo = map.createLayer('suelo', tilesets, 0, 0);
	var paredes = map.createLayer('paredes', tilesets, 0, 0);
	var decoracion = map.createLayer('decoracion', tilesets, 0, 0);
	var lamparas = map.createLayer('lamparas', tilesets, 0, 0);

	spawn = map.createFromObjects('Spawn');
	volverBosque = map.createFromObjects('Volver');
	spawnZombie = map.createFromObjects('SpawnZombie');
	spawnSkeleton = map.createFromObjects('SpawnEsqueleto');
	spawnSpider = map.createFromObjects('SpawnArana');
	spawnKey = map.createFromObjects('SpawnLlave');
	spawnVagabundo = map.createFromObjects('SpawnVagabundo');
	spawnRoca = map.createFromObjects('SpawnRoca');

	

	suelo.setCollisionByProperty({ collide: true });
	paredes.setCollisionByProperty({ collide: true });
	decoracion.setCollisionByProperty({ collide: true });
	lamparas.setCollisionByProperty({ collide: true });
	


	volverBosque.forEach(obj => {
        this.physics.world.enable(obj);
        obj.setAlpha(0);
    })
	
	
	cameras = this.cameras.main.setBounds(0, 0, 800 * 3, 600 * 3);
    this.physics.world.setBounds(0, 0, 800 * 3, 600 * 3);
    
	personaje.createP.call(this);
	personaje.crearInventario.call(this);
	esqueleto.inicio.call(this);
	zombie.inicio.call(this);
	arana.inicio.call(this);
	llave.inicio.call(this);
	pared.inicio.call(this);
	vagabundo.inicio.call(this);


	this.physics.add.collider(personaje.player, suelo);
	this.physics.add.collider(personaje.player, paredes);
	this.physics.add.collider(personaje.player, decoracion);
	this.physics.add.collider(personaje.player, lamparas);
	this.physics.add.collider(personaje.player, volverBosque, games.iniciarBosque, null, this);
	this.physics.add.collider(arana.enemigosList , lamparas);
	this.physics.add.collider(esqueleto.dispEnlList , paredes, destroyShot);
	this.physics.add.collider(arana.dispEnlList , paredes, destroyShot);
	this.physics.add.collider(zombie.enemigosList, paredes);


	
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
		arana.acciones.call(this);
		personaje.acciones.call(this);
		zombie.acciones.call(this);
	
	}


	
}


export function destroyShot(s, n)
{
	s.destroy();
}