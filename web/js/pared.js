var rocasList;
var paredes

import * as personaje from './personaje.js';
import * as aranas from './arana.js';
import * as esqueleto from './esqueleto.js';
import * as plantas from './planta.js';
import * as Cueva from './cueva.js';


export function cargarSprites() {
	this.load.image('roca', 'assets/sprites/roca.png');
}

export function inicio() {
    rocasList = this.physics.add.group();
    crearroca.call(this);
    

    this.physics.add.overlap(personaje.bombas, rocasList, DestruirRoca, null, this);
    this.physics.add.collider(personaje.player, rocasList);
    this.physics.add.collider(personaje.flechasList, rocasList, destruirproyectiles);
    this.physics.add.collider(aranas.dispEnlList, rocasList, destruirproyectiles);
    this.physics.add.overlap(esqueleto.dispEnlList, rocasList, destruirproyectiles, null, this);
    //this.physics.add.overlap(plantas.venenoso, rocasList, destruirproyectiles, null, this);
    //eso de arriba no va

}

function crearroca() {
    Cueva.spawnRoca.forEach(obj => {
        obj.setAlpha(0);
        paredes = rocasList.create(obj.x, obj.y, 'roca');
        paredes.setScale(0.15, 0.15);
        paredes.setImmovable(true);
	})
}

function DestruirRoca(s,n) {
    n.disableBody(true, true);
    n.destroy();
}

function destruirproyectiles(s, n) {
    s.disableBody(true, true);
    s.destroy();
}