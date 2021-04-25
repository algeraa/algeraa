var escalaEnemy = 0.4;
var escapaDisparo = 0.05;
var map;
var fl;
export var suelo, objetos, arboles1, arboles2, arboles3, arboles4;

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
		//this.load.image('pocion', 'assets/sprites/pocionPequena.png');
		this.load.atlas('atlas', 'assets/sprites/spritesheet.png', 'assets/sprites/sprites.json');

		this.load.tilemapTiledJSON('mapa', 'assets/images/mapa.json');
		this.load.image('tiles', 'assets/images/tf_jungle_tileset.png');

		this.load.image('flecha', 'assets/sprites/flecha.png');

		esqueleto.cargarSprites.call(this);
		personaje.cargarSprites.call(this);
		planta.cargarSprites.call(this);
		arana.cargarSprites.call(this);
		pared.cargarSprites.call(this);
	}


create()
{
	
	map = this.make.tilemap({ key: 'mapa' });
	var tilesets = map.addTilesetImage('bosque', 'tiles');
	suelo = map.createDynamicLayer('Camino', tilesets, 0, 0);
	objetos = map.createDynamicLayer('Bordes', tilesets, 0, 0);
	arboles1 = map.createDynamicLayer('Arboles/Arboles1', tilesets, 0, 0);
	arboles2 = map.createDynamicLayer('Arboles/Arboles2', tilesets, 0, 0);
	arboles3 = map.createDynamicLayer('Arboles/Arboles3', tilesets, 0, 0);
	arboles4 = map.createDynamicLayer('Arboles/Arboles4', tilesets, 0, 0);


	suelo.setCollisionByProperty({ collide: true });
	objetos.setCollisionByProperty({ collide: true });

	
	
	this.cameras.main.setBounds(0, 0, 800 * 3, 600 * 3);
    this.physics.world.setBounds(0, 0, 800 * 3, 600 * 3);
    
	personaje.createP.call(this);
	this.physics.add.collider(personaje.player, suelo);
	this.physics.add.collider(personaje.player, objetos);
	/*this.physics.add.collider(personaje.flechasList, suelo);
	this.physics.add.collider(personaje.flechasList, objetos);*/

	

	/*this.physics.add.collider(planta.venenoso, suelo);
	this.physics.add.collider(planta.venenoso, objetos);

	this.physics.add.collider(esqueleto.dispEnlList, suelo);
	this.physics.add.collider(esqueleto.dispEnlList, objetos);*/

	/*esqueleto.inicio.call(this);
	planta.inicio.call(this);
	arana.inicio.call(this);
	pared.inicio.call(this);*/

	//var pocionP = this.add.sprite(200,300,'pocion');
}

	update()
	{

		personaje.movimiento.call(this);
		/*esqueleto.acciones.call(this);
		planta.acciones.call(this);
		personaje.acciones.call(this);
		arana.acciones.call(this);*/
	}
}

