
import * as escenaCastillo from './escenaCastillo.js';
import * as personaje from './personaje.js';

var enemigosList;

export var armor;
var couldowndamage = 0;
var espada;
var contador=50;
var random;
export var shot;
export var shotList;
export var shotGuiadoList;
export var shotGuiado;
var EnDisp = 100;
var ataque=false;
var invisible;
var cartel;

export function cargarSprites() {
	//this.load.image('armadura', 'assets/sprites/armadura.png');
    this.load.image('swordArmadura', 'assets/sprites/espada2.png');
    this.load.image('shot', 'assets/sprites/disparoArmadura.png');
     this.load.image('cartel', 'assets/sprites/cartelWin.png');
    this.load.image('shotGuiado', 'assets/sprites/disparoGuiado.png');
    this.load.spritesheet('animArmor', 'assets/sprites/armadura1.png',{frameWidth:64, frameHeight:64});
}

export function crearArmadura() {

    shotList = this.physics.add.group();
    shotGuiadoList = this.physics.add.group();
    enemigosList = this.physics.add.group();


    this.anims.create({
        key:'armorAbajo',
        frames: this.anims.generateFrameNames('animArmor',{start:0, end:3}),
        frameRate: 5
    });

    this.anims.create({
        key:'armorIzquierda',
        frames: this.anims.generateFrameNames('animArmor',{start:4, end:7}),
        frameRate: 5
    });

     this.anims.create({
        key:'armorDerecha',
        frames: this.anims.generateFrameNames('animArmor',{start:8, end:11}),
        frameRate: 5
    });

      this.anims.create({
        key:'armorArriba',
        frames: this.anims.generateFrameNames('animArmor',{start:12, end:15}),
        frameRate: 5
    });


    escenaCastillo.enemigoArmor.forEach(obj=>{

        obj.setAlpha(0);
        armor=enemigosList.create(obj.x,obj.y,'animArmor').setDepth(1);
        armor.play("armorMov", true);
        armor.setOrigin(0.5,0.5);
        armor.setScale(1.5,1.5);
        armor.setSize(40,65);
        armor.vida = 5;
        armor.distancia = 0;
        armor.damage = 2;
        armor.damagetimer = 10;
        armor.movetimer = 20;
        armor.direccion = 0;
        armor.flecha = false;
        armor.EnDisp = 10;
    })

    cartel=this.add.sprite(0, 0, 'cartel');
    cartel.setAlpha(0);
    cartel.setDepth(11);
    cartel.setScale(2,2);




    this.physics.add.overlap(personaje.player, enemigosList, personaje.perderVida, null, this);
    this.physics.add.overlap(personaje.arma, enemigosList, perderVida, null, this);
    this.physics.add.overlap(personaje.bombas, enemigosList, perderVida, null, this);
    this.physics.add.overlap(personaje.flechasList, enemigosList, perderVida, null, this);
   // this.physics.add.overlap(personaje.aura, enemigosList, personaje.eliminarEscudo, null, this);

    this.physics.add.overlap(personaje.player, shotList, personaje.perderVida, null, this);
    this.physics.add.overlap(personaje.player, shotGuiadoList, personaje.perderVida, null, this);

    this.physics.add.overlap(personaje.aura, shotList, personaje.eliminarEscudo, null, this);
    this.physics.add.overlap(personaje.aura, shotGuiadoList, personaje.eliminarEscudo, null, this);



}


function perderVida(s, n) {

    if (couldowndamage <= 0) {
        n.vida = n.vida - s.damage;
        console.log("armadura=" + n.vida);
        couldowndamage = 30;

        if (n.vida <= 0) {
            console.log("Armadura eliminada");
            n.destroy();
            ataque=false;
            cartel.setAlpha(1);
            cartel.x=1200;
            cartel.y=200;
        }
        if (s.flecha == true) {
            s.destroy();
        }

    }
}

export function acciones()
{
   
    if(ataque==true){
         moverArmor.call(this);
        armor.damagetimer--;
        armor.movetimer--;
        couldowndamage--;
        ataque2Armadura.call(this);
        ataque3Armadura.call(this);
    }

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
            armor.play("armorAbajo", true);
        }
        else{

            if(armor.direccion == 0 && armor.movetimer == 0)
            {
                armor.setVelocityY(0);
                armor.setVelocityX(100); 
                armor.direccion = 90;
                armor.movetimer = 100;
                armor.play("armorDerecha", true);
            }

            if(armor.direccion == 90 && armor.movetimer == 0)
            {
                armor.setVelocityY(100);
                armor.setVelocityX(0); 
                armor.direccion = 180;
                armor.movetimer = 100;
                armor.play("armorAbajo", true);
            }

            if(armor.direccion == 180 && armor.movetimer == 0)
            {
                armor.setVelocityY(0);
                armor.setVelocityX(-100); 
                armor.direccion = 270;
                armor.movetimer = 100;
                armor.play("armorIzquierda", true);
            }

            if(armor.direccion == 270 && armor.movetimer == 0)
            {
                armor.setVelocityY(-100);
                armor.setVelocityX(0); 
                armor.direccion = 0;
                armor.movetimer = 100;
                armor.play("armorArriba", true);
            }

        }
        
    }

}

var direcDisparos=0;
function ataque2Armadura(){

    contador--;

   if(contador<0){

            
    shot=shotList.create(armor.x,armor.y,'shotGuiado');
    shot.setOrigin(0.5,0.5);
    shot.setScale(0.1,0.1);
    shot.setSize(300,300);
    shot.damage=1;
    shot.flecha=true;

    contador=50;
    
            if(direcDisparos == 0)
            {
                shot.setVelocity(300, 0);
                shot.angle = 0;

            }
            else if(direcDisparos == 1)
            {
                shot.setVelocity(150, 150);
                shot.angle = 45;
            }
            else if(direcDisparos == 2)
            {
                shot.setVelocity(0, 300);
                shot.angle = 90;
                shot.flipY=true;
            }
            else if(direcDisparos == 3)
            {
                shot.setVelocity(-150, 150);
                shot.angle = 135;
                shot.flipY=true;
            }
            else if(direcDisparos == 4)
            {
                shot.setVelocity(-300, 0);
                shot.angle = 180;
                shot.flipY=true;
            }
            else if(direcDisparos == 5)
            {
                shot.setVelocity(-150, -150);
                shot.angle = 225;
                shot.flipY=true;
            }
            else if(direcDisparos == 6)
            {
                shot.setVelocity(0, -300);
                shot.angle = 270;
            }   
            else if(direcDisparos == 7)
            {
                shot.setVelocity(150, -150);
                shot.angle = 315;
            } 


    direcDisparos++;
    }

    if (direcDisparos==8) {direcDisparos=0}

}

function ataque3Armadura(){

    for (var i = 0;i<enemigosList.getChildren().length;i++) 
    {
        var atacante = enemigosList.getChildren()[i];
        atacante.distancia = Math.sqrt(Math.pow(personaje.player.x-atacante.x, 2) + Math.pow(personaje.player.y-atacante.y, 2));

        if(atacante.EnDisp <= 0 && atacante.distancia < 200)
            {   
                
                    

                    shotGuiado=shotGuiadoList.create(atacante.x, atacante.y,'shot');
                    shotGuiado.setScale(0.1,0.1);
                    shotGuiado.setSize(300,300);
                    shotGuiado.damage=1;
                    shotGuiado.flecha=true;
                    shotGuiado.angle = 0;
                    shotGuiado.direccion=new Phaser.Math.Vector2(personaje.player.x-atacante.x,personaje.player.y-atacante.y);
                    shotGuiado.velocity = 10;
                    shotGuiado.direccion.normalize();
                    shotGuiado.angle = 180/Math.PI*Phaser.Math.Angle.Between(shotGuiado.x, shotGuiado.y, personaje.player.x, personaje.player.y);
                    shotGuiado.damage = 1;
                    this.physics.moveToObject(shotGuiado, personaje.player, 300);
                    shotGuiado.flecha = true;
                atacante.EnDisp = 100;
            }
        else
        {
            atacante.EnDisp = atacante.EnDisp -1;
        }
    }
}

export function destroyShot(s, n)
{
    s.destroy();
}


export function activarArmadura(){

    console.log("Activar armadura");
    ataque=true;
    escenaCastillo.invisible.destroy();
}
