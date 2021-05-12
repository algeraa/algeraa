var Heart;
var heartList, heartList2;



import * as escena2 from './escena2.js';
import * as personaje from './personaje.js';

var entrar = 0;

export default class HUD extends Phaser.Scene {
	constructor(){
		super({key: "HUD", active:true});
	}
	preload() {

		this.load.image('corazon', 'assets/sprites/Heart.png');
		
	}


create()
{
	heartList = this.add.group();
	heartList2 = this.add.group();

	heartList.createMultiple({key:'corazon',frame: [0], frameQuantity: 1, repeat: 4 });

	heartList.createMultiple({key:'corazon',frame: [0], frameQuantity: 1, repeat: 4 });

	Phaser.Actions.SetXY(heartList.getChildren(), 20, 20, 25);
	//Phaser.Actions.SetXY(heartList.getChildren(), 20, 40, 25);

	for(var i = 0; i<4; i++)
	{
		heartList.getChildren()[i].lleno = true;
	}
	/*for(var i = 0; i<4; i++)
	{
		heartList2.getChildren()[i].lleno = true;
	}*/

	
		
	
}
update()
{
	var vidaMemoria = personaje.vida;
	for(var i = 0; i<9; i++)
	{
		
			heartList.getChildren()[i].setAlpha(true);
	}
	
	
	
}
}