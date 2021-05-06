
import * as escenaCastillo from './escenaCastillo.js';
import * as personaje from './personaje.js';

var enemigosList;

export var armor;
var couldowndamage = 0;

export function cargarSprites() {
	this.load.image('armadura', 'assets/sprites/armadura.png');
}

export function crearArmadura() {

    enemigosList = this.physics.add.group();

    escenaCastillo.enemigoArmor.forEach(obj=>{

        obj.setAlpha(0);
        armor=enemigosList.create(obj.x,obj.y,'armadura').setDepth(1);
        armor.setOrigin(0.5,0.5);
        armor.setScale(0.75,0.75);
        armor.vida = 5;
        armor.distancia = 0;
        armor.damage = 2;
        armor.damagetimer = 10;
        armor.movetimer = 20;
        armor.direccion = 0;
        armor.flecha = false;
    })

    this.physics.add.overlap(personaje.player, enemigosList, personaje.perderVida, null, this);
    this.physics.add.overlap(personaje.arma, enemigosList, perderVida, null, this);
    this.physics.add.overlap(personaje.bombas, enemigosList, perderVida, null, this);
    this.physics.add.overlap(personaje.flechasList, enemigosList, perderVida, null, this);
    this.physics.add.overlap(personaje.aura, enemigosList, personaje.eliminarEscudo, null, this);

}


function perderVida(s, n) {

    if (couldowndamage <= 0) {
        n.vida = n.vida - s.damage;
        console.log("armadura=" + n.vida);
        couldowndamage = 30;

        if (n.vida <= 0) {
            console.log("Armadura eliminada");
            n.destroy();
        }
        if (s.flecha == true) {
            s.destroy();
        }

    }
}

export function acciones()
{
    moverArmor.call(this);
    armor.damagetimer--;
    armor.movetimer--;
    couldowndamage--;
}

function moverArmor(){
    for (var i = 0;i<enemigosList.getChildren().length;i++) 
    {
        var atacante = enemigosList.getChildren()[i];
        atacante.distancia = Math.sqrt(Math.pow(personaje.player.x-atacante.x, 2) + Math.pow(personaje.player.y-atacante.y, 2));

        if(atacante.distancia < 200){
            atacante.atacar = true;
        }
        if(atacante.atacar == true){
            this.physics.moveToObject(atacante, personaje.player, 100);
        }
        else{

            if(armor.direccion == 0 && armor.movetimer == 0)
            {
                armor.setVelocityY(0);
                armor.setVelocityX(100); 
                armor.direccion = 90;
                armor.movetimer = 100;
            }

            if(armor.direccion == 90 && armor.movetimer == 0)
            {
                armor.setVelocityY(100);
                armor.setVelocityX(0); 
                armor.direccion = 180;
                armor.movetimer = 100;
            }

            if(armor.direccion == 180 && armor.movetimer == 0)
            {
                armor.setVelocityY(0);
                armor.setVelocityX(-100); 
                armor.direccion = 270;
                armor.movetimer = 100;
            }

            if(armor.direccion == 270 && armor.movetimer == 0)
            {
                armor.setVelocityY(-100);
                armor.setVelocityX(0); 
                armor.direccion = 0;
                armor.movetimer = 100;
            }

        }
        
    }

}
