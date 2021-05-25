var escalaEnemy = 0.4;
var escapaDisparo = 0.05;
var map;
var fl;
var ArbolesC;

export var cameras;
export var spawnSkeleton, entradaTaberna, entradaCastillo, arbolesSpawn, entradaCueva, spawnZombie, volverDeCueva, volverdeCastillo, spawnplantas;
export var spawn;
import HUD from './HUD.js'

import * as esqueleto from './esqueleto.js';
import * as personaje from './personaje.js';
import * as planta from './planta.js';
import * as arana from './arana.js';
import * as pared from './pared.js';
import * as trampas from './trampas.js';
import * as zombie from './zombie.js';

import * as games from './game.js';

var entrar = 0;

export var arbolesList, pedestalList, pedestalListActive;
export var hachaSprite, troncoSprite, pedestalSprite, pedestalSprite2;


export default class Bosque extends Phaser.Scene {
	constructor(){
		super({key: "Bosque"});
	}
	preload() {
	
	
		

		this.load.tilemapTiledJSON('mapa', 'assets/images/mapa.json');
		this.load.image('tiles', 'assets/images/tf_jungle_tileset.png');
		this.load.image('tiles2', 'assets/images/village-palette01-day.png');

		this.load.image('arbolH', 'assets/sprites/arbol.png');
		this.load.image('hacha', 'assets/sprites/hacha.png');
		this.load.image('tronco', 'assets/sprites/tronco.png');
		this.load.image('pedestal', 'assets/sprites/pedestal.png');
		this.load.image('pedestalAct', 'assets/sprites/pedestal_activo.png');

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
	
	
	volverdeCastillo=map.createFromObjects('volverCas');
	volverdeCastillo.forEach(obj => {

        obj.setAlpha(0);
    })
	spawnZombie = map.createFromObjects('SpawnZombie');
	volverDeCueva = map.createFromObjects('volverC');
	volverDeCueva.forEach(obj => {

        obj.setAlpha(0);
    })
	entradaTaberna = map.createFromObjects('taberna');
	entradaCastillo = map.createFromObjects('cambioCastillo');
	entradaCastillo.forEach(obj => {

        obj.setAlpha(0);
    })
	entradaCueva = map.createFromObjects('cambioCueva');
	entradaCueva.forEach(obj => {

        obj.setAlpha(0);
    })

	spawnSkeleton = map.createFromObjects('Esqueletos');
	spawn = map.createFromObjects('Spawn');

	arbolesSpawn = map.createFromObjects('ArbolesHacha');

	spawnplantas = map.createFromObjects('plantas');

	
	objetos.setCollisionByProperty({ collide: true });
	Taberna2.setCollisionByProperty({ collide: true });
	Taberna.setCollisionByProperty({ collide: true });
	
	arbolesList = this.physics.add.group();
	pedestalList = this.physics.add.group();
	pedestalListActive = this.physics.add.group();
	
    entradaCastillo.forEach(castillo => {
        this.physics.world.enable(castillo);
    })
    entradaCueva.forEach(cueva => {
        this.physics.world.enable(cueva);
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
    console.log("adios");
	personaje.createP.call(this);
	//personaje.pruebaAjax.call(this,5);

	personaje.crearInventario.call(this);
	esqueleto.inicio.call(this);
	planta.inicio.call(this);
	
	if(games.escenaPasada == 0)
	{
		hachaSprite = this.physics.add.sprite(2250,175, 'hacha');
		pedestalSprite = pedestalList.create(800, 1600,'pedestal');
		
		pedestalSprite = pedestalList.create(1400, 800,'pedestal');
	

		pedestalSprite2 = pedestalListActive.create(800, 1600,'pedestalAct');
		pedestalSprite2.setAlpha(0);
		pedestalSprite2.setImmovable(true);
		pedestalSprite2.activo = false;
		pedestalSprite2 = pedestalListActive.create(1400, 800,'pedestalAct');
		pedestalSprite2.setAlpha(0);
		pedestalSprite2.setImmovable(true);
		pedestalSprite2.activo = false;
		troncoSprite = this.physics.add.sprite(2250,175, 'tronco');
		troncoSprite.recogido = 0;
		troncoSprite.setAlpha(0);
		troncoSprite.setImmovable(true);
	}
	else
	{
		pedestalSprite = pedestalList.create(800, 1600,'pedestal');
		
		pedestalSprite.setAlpha(0);
		pedestalSprite = pedestalList.create(1400, 800,'pedestal');
		
		pedestalSprite.setAlpha(0);


		pedestalSprite2 = pedestalListActive.create(800, 1600,'pedestalAct');
		pedestalSprite2.setImmovable(true);
		pedestalSprite2.activo = true;
		pedestalSprite2 = pedestalListActive.create(1400, 800,'pedestalAct');
		pedestalSprite2.setImmovable(true);
		pedestalSprite2.activo = true;
		troncoSprite = this.physics.add.sprite(2250,175, 'tronco');
		troncoSprite.recogido = 1;
	}
	

	zombie.inicio.call(this);

	this.physics.add.collider(personaje.player, suelo);
	this.physics.add.collider(personaje.player, objetos);
	this.physics.add.collider(personaje.player, Taberna);
	this.physics.add.collider(personaje.player, Taberna2);
	this.physics.add.collider(personaje.player, arbolesList, derribarArbol);
	this.physics.add.collider(personaje.player, troncoSprite, personaje.recogerHacha);
	this.physics.add.collider(personaje.player, pedestalListActive, pedestales);
	
	
	this.physics.add.collider(esqueleto.dispEnlList, objetos, esqueleto.destroyShot);
	this.physics.add.overlap(personaje.player, entradaCastillo, games.entrarCastillo, null, this);
	this.physics.add.overlap(personaje.player, entradaCueva, games.iniciarCueva, null, this);
	this.physics.add.collider(zombie.enemigosList, objetos);

	
	


}

	update()
	{
	
		personaje.movimiento.call(this);
		personaje.inventario.call(this);
		esqueleto.acciones.call(this);
		planta.acciones.call(this);
		personaje.acciones.call(this);
		zombie.acciones.call(this);
	
	}


	
}
function pedestales(s, n)
{
	if(personaje.hacha.isDown && n.activo == false)
	{
		n.setAlpha(1);
		n.activo = true;
	}

	if(pedestalListActive.getChildren()[0].activo && pedestalListActive.getChildren()[1].activo)
	{
		console.log("hola");
		abrirCueva.call(this);
	}
	
}
function abrirCueva()
{
		personaje.cuevaDesbloqueada.call(this);
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