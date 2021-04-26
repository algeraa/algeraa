var rocasList;
var paredes

import * as escena2 from './escena2.js';
import * as personaje from './personaje.js';
import * as aranas from './arana.js';
import * as esqueleto from './esqueleto.js';
import * as plantas from './planta.js';
import * as zombies from './zombie.js';


export function cargarSprites() {
	this.load.image('roca', 'assets/sprites/roca.png');
}

export function inicio() {
    rocasList = this.physics.add.group();
    crearroca.call(this);
    console.log(paredes);

    this.physics.add.overlap(personaje.bombas, rocasList, DestruirRoca, null, this);
    this.physics.add.collider(personaje.player, rocasList);
    this.physics.add.collider(zombies.zombie, rocasList);
    this.physics.add.collider(personaje.flechasList, rocasList, destruirproyectiles);
    this.physics.add.collider(aranas.dispEnlList, rocasList, destruirproyectiles);
    this.physics.add.overlap(esqueleto.dispEnlList, rocasList, destruirproyectiles, null, this);
    //this.physics.add.overlap(plantas.venenoso, rocasList, destruirproyectiles, null, this);
    //eso de arriba no va

}

function crearroca() {
    paredes = rocasList.create(350, 600, 'roca');
    paredes.setScale(0.3, 0.3);
    paredes.setImmovable(true);
}

function DestruirRoca(s,n) {
    n.disableBody(true, true);
    n.destroy();
}

function destruirproyectiles(s, n) {
    s.disableBody(true, true);
    s.destroy();
}