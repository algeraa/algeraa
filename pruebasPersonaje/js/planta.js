var planta;
var distancia;
var EnDisp = 50;
var i;
var venenoso;
var disparoE;
var distancia;
var venenoso;
var plantasList;
var monedasList;
var dinero;
var couldowndamage = 0;
import * as escena2 from './escena2.js';
import * as personaje from './personaje.js';


export function cargarSprites() {
	this.load.image('planta', 'assets/sprites/planta.png');
	this.load.image('dardo', 'assets/sprites/dardo.png');
	this.load.image('moneda', 'assets/sprites/moneda.png');
}


function movDisparosEn() {
	for (i = 0; i < venenoso.getChildren().length; i++) {
		var tiro = venenoso.getChildren()[i];
		tiro.x = tiro.x + tiro.velocity * tiro.direccion.x;
		tiro.y = tiro.y + tiro.velocity * tiro.direccion.y;

	}
}
function dispEnemies() {
	for (i = 0; i < plantasList.getChildren().length; i++) {
		var atacante = plantasList.getChildren()[i];
		atacante.distancia = Math.sqrt(Math.pow(personaje.player.x - atacante.x, 2) + Math.pow(personaje.player.y - atacante.y, 2));

		if (atacante.EnDisp <= 0 && atacante.distancia < 200) {



			disparoE = venenoso.create(planta.x, planta.y, 'dardo');
			//disparoE.setScale(0.1,0.1);
			//disparoE.angle = 45;
			disparoE.direccion = new Phaser.Math.Vector2(personaje.player.x - planta.x, personaje.player.y - planta.y);
			disparoE.velocity = 10;
			disparoE.direccion.normalize();
			disparoE.angle = 180 / Math.PI * Phaser.Math.Angle.Between(disparoE.x, disparoE.y, personaje.player.x, personaje.player.y);
			disparoE.venenoso = true;



			atacante.EnDisp = 100;
		}
		else {
			atacante.EnDisp = atacante.EnDisp - 1;
		}
	}
}

function envenenar(e, s) {
	personaje.envenenado.call(this);


	s.disableBody(true, true);

	venenoso.remove(s);
}

export function acciones() {

	dispEnemies.call(this);
	movDisparosEn.call(this);
	couldowndamage--;

}

export function inicio() {
	plantasList = this.physics.add.group();
	planta = plantasList.create(250, 450, 'planta');

	planta.setScale(0.02, 0.02);
	planta.distancia = 0;
	planta.EnDisp = 10;
	planta.vida = 3;
	venenoso = this.physics.add.group();

	this.physics.add.overlap(personaje.player, venenoso, envenenar, null, this);
	this.physics.add.overlap(personaje.arma, plantasList, perderVida, null, this);
	this.physics.add.overlap(personaje.flechasList, plantasList, perderVida, null, this);
	this.physics.add.overlap(personaje.bombas, plantasList, perderVida, null, this);
}
function perderVida(s, n) {
	if (couldowndamage <= 0) {
		n.vida = n.vida - s.damage;
		console.log("planta=" + n.vida);
		couldowndamage = 30;
		if (n.vida <= 0) {
			var drop = Phaser.Math.Between(1, 2);

			if (drop == 1) {
				dinero = personaje.monedasList.create(n.x, n.y, 'moneda');
				dinero.setScale(0.01, 0.01);
			}
			n.disableBody(true, true);

			plantasList.remove(n);
		}
		if (s.flecha = true) {
			s.disableBody(true, true);

			personaje.flechasList.remove(s);
		}

	}
}
