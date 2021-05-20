var Heart;
var heartList, heartListempty;



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
		
	}


create()
{
	heartList = this.add.group();
	heartListempty = this.add.group();

	heartList.createMultiple({key:'corazon',frame: [0], frameQuantity: 1, repeat: 9 });
	heartListempty.createMultiple({key:'corazon_vacio',frame: [0], frameQuantity: 1, repeat: 9 });



	Phaser.Actions.SetXY(heartList.getChildren(), 20, 20, 25);
	Phaser.Actions.SetXY(heartListempty.getChildren(), 20, 20, 25);
	
		
	
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
}
}