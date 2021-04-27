var escalaEnemy = 0.4;
var escapaDisparo = 0.05;
var mapa;
var fl;
export var suelo, objetos;

import * as esqueleto from './esqueleto.js';
import * as personaje from './personaje.js';
import * as planta from './planta.js';
import * as arana from './arana.js';
import * as pared from './pared.js';


export default class Escena2 extends Phaser.Scene {
	constructor(){
		super({key: "Escena2"});
	}
	preload() {
		this.load.image('bosque', 'assets/images/bosque.png');
		this.load.image('player', 'assets/sprites/personaje.png');
		this.load.image('pocion', 'assets/sprites/pocionPequena.png');
		this.load.atlas('atlas', 'assets/sprites/spritesheet.png', 'assets/sprites/sprites.json');

		this.load.tilemapTiledJSON('mapa', 'assets/images/mapa.json');
		this.load.image('tiles', 'assets/images/buch-outdoor.png');

		this.load.image('flecha', 'assets/sprites/flecha.png');

		esqueleto.cargarSprites.call(this);
		personaje.cargarSprites.call(this);
		planta.cargarSprites.call(this);
		arana.cargarSprites.call(this);
		pared.cargarSprites.call(this);
	}


create()
{
	
	mapa = this.make.tilemap({ key: 'mapa' });
	var tilesets = mapa.addTilesetImage('buch-outdoor', 'tiles');
	suelo = mapa.createDynamicLayer('Suelo', tilesets, 0, 0);
	objetos = mapa.createDynamicLayer('oBJETOS', tilesets, 0, 0);
	suelo.setCollisionByProperty({ colisiones: true });
	objetos.setCollisionByProperty({ colisiones: true });

	suelo.setScale(2, 2);
	objetos.setScale(2, 2);
	
	this.cameras.main.setBounds(0, 0, 800 * 2, 600 * 2);
    this.physics.world.setBounds(0, 0, 800 * 2, 600 * 2);
    
	personaje.createP.call(this);
	this.physics.add.collider(personaje.player, suelo);
	this.physics.add.collider(personaje.player, objetos);
	this.physics.add.collider(personaje.flechasList, suelo);
	this.physics.add.collider(personaje.flechasList, objetos);

	

	/*this.physics.add.collider(planta.venenoso, suelo);
	this.physics.add.collider(planta.venenoso, objetos);

	this.physics.add.collider(esqueleto.dispEnlList, suelo);
	this.physics.add.collider(esqueleto.dispEnlList, objetos);*/

	esqueleto.inicio.call(this);
	planta.inicio.call(this);
	arana.inicio.call(this);
	pared.inicio.call(this);

	var pocionP = this.add.sprite(200,300,'pocion');
}

	update()
	{

		personaje.movimiento.call(this);
		esqueleto.acciones.call(this);
		planta.acciones.call(this);
		personaje.acciones.call(this);
		arana.acciones.call(this);
	}
}

