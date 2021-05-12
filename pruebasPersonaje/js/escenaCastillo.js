
import * as personaje from './personaje.js';
import * as trampas from './trampas.js';
import * as armadura from './armadura.js';

var map;
var paredes;
export var escenaActual = 3;
export var cameras;
export var spawn;
export var trampaPinchos;
export var enemigoArmor;
export var salidos;
var animacion;
var tilesetsCastillo;
export var salen;

export default class Castillo extends Phaser.Scene {

	constructor(){
		super({key: "Castillo"});
	}

	preload() {

		this.load.tilemapTiledJSON('mapa_castillo', 'assets/images/MapaCastillo2.json');

		this.load.image('tilesCastillo', 'assets/images/Dungeon_tileset.png');

		this.load.image('flecha', 'assets/sprites/flecha.png');

		//esqueleto.cargarSprites.call(this);
		personaje.cargarSprites.call(this);
		personaje.cargarInventario.call(this);
		trampas.cargarSprites.call(this);
		armadura.cargarSprites.call(this);
	
	}

	create()
	{
		
		map = this.make.tilemap({ key: 'mapa_castillo' });

		tilesetsCastillo = map.addTilesetImage('castillo_tileset', 'tilesCastillo');

		var suelo = map.createLayer('Fondo', tilesetsCastillo, 0, 0);
		var paredes = map.createLayer('Paredes', tilesetsCastillo, 0, 0);
		var decoracion = map.createLayer('Decoracion', tilesetsCastillo, 0, 0);
		var pinchos = map.createLayer('Pinchos', tilesetsCastillo, 0, 0);

		trampaPinchos= map.createFromObjects('Pinchos');
		spawn = map.createFromObjects('Inicio');
		enemigoArmor = map.createFromObjects('Armadura');
		
		paredes.setCollisionByProperty({ Colisiones: true });
		decoracion.setCollisionByProperty({ Colisiones: true });



		trampaPinchos.forEach(pinchos => {
			pinchos.setAlpha(0);
	        this.physics.world.enable(pinchos);
	    })

		
		cameras = this.cameras.main.setBounds(0, 0, 800 * 3, 600 * 3);
	    this.physics.world.setBounds(0, 0, 800 * 3, 600 * 3);
	    
		personaje.createP.call(this);
		personaje.crearInventario.call(this);
		armadura.crearArmadura.call(this);

		this.physics.add.collider(personaje.player, suelo);
		this.physics.add.collider(personaje.player, paredes);
		this.physics.add.collider(armadura.armor, paredes);
		this.physics.add.collider(personaje.player, decoracion);
		this.physics.add.overlap(personaje.player, trampaPinchos, trampas.salirPinchos, null, this);
		
		salen = map.createFromObjects('Prueba');

		salen.forEach(pinchos_Salidos => {
			pinchos_Salidos.setAlpha(0);
	        this.physics.world.enable(pinchos_Salidos);
	    })

	}

	update()
	{

		personaje.movimiento.call(this);
		personaje.inventario.call(this);
		//esqueleto.acciones.call(this);
		armadura.acciones.call(this);
		personaje.acciones.call(this);
		

		
	}


	
}

export function salir_pinchos() {

	salidos = map.createLayer('Pinchos_Salidos', tilesetsCastillo, 0, 0);
}

export function esconder_pinchos() {

	//salidos.destroy();

	/*salen.forEach(pinchos_Salidos => {
			pinchos_Salidos.setAlpha(0);
	        this.physics.world.enable(pinchos_Salidos);
	    })*/
}


