var Heart;
var heartList, heartListempty;
var textoayuda;
var textopoti;
var potip;
var potim;
var potig;



import * as Bosque from './escenaBosque.js';
import * as personaje from './personaje.js';

var entrar = 0;

export default class HUD extends Phaser.Scene {
	constructor(){
		super({key: "HUD", active:true});
	}
	preload() {

		this.load.image('corazon', 'assets/sprites/Heart.png');
		this.load.image('corazon_vacio', 'assets/sprites/emptyHeart.png');
		this.load.image('pocionPe','assets/sprites/pocionPequena.png');
		this.load.image('pocionMe','assets/sprites/pocionMediana.png');
		this.load.image('pocionGr','assets/sprites/pocionGrande.png');
	}


create()
{
	heartList = this.add.group();
	heartListempty = this.add.group();

	heartList.createMultiple({key:'corazon',frame: [0], frameQuantity: 1, repeat: 9 });
	heartListempty.createMultiple({key:'corazon_vacio',frame: [0], frameQuantity: 1, repeat: 9 });



	Phaser.Actions.SetXY(heartList.getChildren(), 20, 20, 25);
	Phaser.Actions.SetXY(heartListempty.getChildren(), 20, 20, 25);

	textoayuda = this.add.text(600, 10, 'Pulsa M para recibir ayuda', { font: '"Press Start 2P"' });
	textoayuda.setScale(1.5,1.5);
	textopoti = this.add.text(600, 60, 'Pocion seleccionada:', { font: '"Press Start 2P"' });
	textopoti.setScale(1.5,1.5);

	potip = this.add.sprite(760, 68,'pocionPe');
	potip.setScale(2,2);
	potim = this.add.sprite(760,68,'pocionMe');
	potim.setScale(2,2);
	potig = this.add.sprite(760,68,'pocionGr');
	potig.setScale(2,2);
}
update()
{

	for(var i = 0; i<10; i++)
	{
		heartList.getChildren()[i].setAlpha(1);
		heartList.getChildren()[i].setDepth(10);
	}
	if(personaje.vida <= 9)
	{
		heartList.getChildren()[9].setAlpha(0);
	}
	if(personaje.vida <= 8)
	{
		heartList.getChildren()[8].setAlpha(0);
	}
	if(personaje.vida <= 7)
	{
		heartList.getChildren()[7].setAlpha(0);
	}
	if(personaje.vida <= 6)
	{
		heartList.getChildren()[6].setAlpha(0);
	}

	if(personaje.vida <= 5)
	{
		heartList.getChildren()[5].setAlpha(0);
	}
	if(personaje.vida <= 4)
	{
		heartList.getChildren()[4].setAlpha(0);
	}
	if(personaje.vida <= 3)
	{
		heartList.getChildren()[3].setAlpha(0);
	}
	if(personaje.vida <= 2)
	{
		heartList.getChildren()[2].setAlpha(0);
	}
	if(personaje.vida <= 1)
	{
		heartList.getChildren()[1].setAlpha(0);
	}
	if(personaje.pocionSelect == 1){
		potip.setAlpha(255);
		potim.setAlpha(0);
		potig.setAlpha(0);
	}
	else if(personaje.pocionSelect == 2){
		potip.setAlpha(0);
		potim.setAlpha(255);
		potig.setAlpha(0);
	}
	else if(personaje.pocionSelect == 3){
		potip.setAlpha(0);
		potim.setAlpha(0);
		potig.setAlpha(255);
	}

}
}
