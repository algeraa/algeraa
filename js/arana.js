var escalaaranax = 0.2;
var escalaaranay = 0.2;
var arana;
var velarana = 3;
var tempoarana = 0;
var mov = 0;
var posicion = 0;
var numCONO = 3;
var disparoa = 0;
var temps = 50;
var couldownMal = 0;
var n;
var s;
export var dispEnlList;
var enemigosList;
var cono;
var dinero;


import * as escena2 from './escena2.js';
import * as personaje from './personaje.js';

export function cargarSprites() {
    this.load.image('arana', 'assets/sprites/arana.png');
    this.load.image('disparoarana', 'assets/sprites/disparoarana.png');
    this.load.image('moneda', 'assets/sprites/moneda.png');
    this.load.image('pocionp', 'assets/sprites/pocionPequena.png');
}

export function inicio() {
    dispEnlList = this.physics.add.group();
    enemigosList = this.physics.add.group();
    creararana.call(this);

    this.physics.add.overlap(personaje.player, dispEnlList, personaje.perderVida, null, this);
    this.physics.add.overlap(personaje.arma, enemigosList, perderVida, null, this);
    this.physics.add.overlap(personaje.bombas, enemigosList, perderVida, null, this);
    this.physics.add.overlap(personaje.flechasList, enemigosList, perderVida, null, this);
    this.physics.add.collider(dispEnlList, escena2.suelo);
    this.physics.add.collider(dispEnlList, escena2.objetos, destroyShot);
   
}
function destroyShot(s, n)
{
    s.destroy();
}
function creararana() {
    arana = enemigosList.create(800, 300, 'arana');
    arana.setScale(escalaaranax, escalaaranay);
    arana.vida = 5;
}

export function acciones() {
    if (arana.vida > 0) {
        tempoaranita.call(this);
        moverarana.call(this);
        couldownMal--;

        if (temps <= 0) {
            dispArana.call(this);
            temps = 100;
        }
        else {
            temps = temps - 1;
        }
    }
}


function perderVida(s, n) {
        n.vida = n.vida - s.damage;
        console.log("arana=" + n.vida);
        couldownMal = 30;
        if (n.vida <= 0) {
            var drop = Phaser.Math.Between(1, 2);

            if (drop == 1) {
                dinero = personaje.monedasList.create(n.x, n.y, 'moneda');
                dinero.setScale(0.01, 0.01);
            }
            n.disableBody(true, true);

            n.destroy();

        }
        if (s.flecha == true) {
            s.destroy();
        }
}

function tempoaranita() {

    tempoarana--;
    if (tempoarana <= 0) {
        mov = Phaser.Math.Between(1, 3);
        tempoarana = 5;
    }
}

function moverarana() {
    if (mov == 1 && posicion > -30) {
        arana.direccio = new Phaser.Math.Vector2(-1, 0);
        arana.x = arana.x + velarana * arana.direccio.x;
        posicion--;
    }
    else if (mov == 2 && posicion < 30) {
        arana.direccio = new Phaser.Math.Vector2(1, 0);
        arana.x = arana.x + velarana * arana.direccio.x;
        posicion++;
    }
}

function dispArana() {
    for (var i = 0; i < numCONO; i++) {
        cono = dispEnlList.create(arana.x, arana.y, 'disparoarana');
        cono.setScale(0.05, 0.05);
        cono.damage = 1;
        if (i == 0) {
            cono.setVelocityX(-200);
            cono.setVelocityY(200);
            cono.angle = 45;
        }
        else if (i == 1) {
            cono.setVelocityX(0);
            cono.setVelocityY(200);
            cono.angle = 90;
        }
        else if (i == 2) {
            cono.setVelocityX(200);
            cono.setVelocityY(200);
            cono.angle = 225;
        }
    }

}
