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
export var enemigosList;
var cono;
var dinero;
var i;
var atacante;
var tempomove = 50;

import * as Cueva from './cueva.js';
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
    //this.physics.add.collider(dispEnlList, Cueva.suelo);
    //this.physics.add.collider(dispEnlList, Cueva.objetos, destroyShot);
   
}


function creararana() {
    Cueva.spawnSpider.forEach(obj => {
        obj.setAlpha(0);
        arana = enemigosList.create(obj.x, obj.y, 'arana');
        arana.setScale(escalaaranax, escalaaranay);
        arana.vida = 5;
        arana.flecha = false;
        arana.couldownMal;	
	})
}

export function acciones() {
    for (i = 0;i<enemigosList.getChildren().length;i++){
        arana.couldownMal--;

        if(tempomove <= 0){
            moverarana.call(this);
            tempomove = 200;
        }
        else{
            tempomove--;
        }

        if(tempoarana <= 0){
            dispArana.call(this);
            tempoarana = 800;
        }
        else{
            tempoarana--;
        }
    }
    
}


function perderVida(s, n) {
        n.vida = n.vida - s.damage;
        console.log("arana=" + n.vida);
        couldownMal = 30;
        if (n.vida <= 0) {
            var drop = Phaser.Math.Between(1, 2);
            var dropeado;
            if (drop == 1) {
                dropeado=personaje.flechasInventario.create(n.x,n.y,'flecha');
                dropeado.setScale(0.1,0.1);
            }
            else if(drop == 2)
            {
                dropeado=personaje.pocionGList.create(n.x,n.y,'pocionGr');
            
            }
            n.disableBody(true, true);

            n.destroy();

        }
        if (s.flecha == true) {
            s.destroy();
        }
}

function moverarana() {
    for (i = 0;i<enemigosList.getChildren().length;i++){
        atacante = enemigosList.getChildren()[i];
        mov = Phaser.Math.Between(1, 20);
        if (mov < 10) {
            atacante.setVelocityX(200);
        }
        else if (mov < 20) {
            atacante.setVelocityX(-200);    
        }
        
    }
}

function dispArana() {
     for (i = 0;i<enemigosList.getChildren().length;i++){
        atacante = enemigosList.getChildren()[i];
        for (var j = 0; j < numCONO; j++) {
        cono = dispEnlList.create(atacante.x, atacante.y , 'disparoarana');
        cono.setScale(0.02, 0.02);
        cono.damage = 1;
        cono.flecha = true;
        if (j == 0) {
            cono.setVelocityX(-200);
            cono.setVelocityY(200);
        }
        else if (j == 1) {
            cono.setVelocityX(0);
            cono.setVelocityY(200);
        }
        else if (j == 2) {
            cono.setVelocityX(200);
            cono.setVelocityY(200);
            cono.angle = 225;
        }

        }
     }
}
