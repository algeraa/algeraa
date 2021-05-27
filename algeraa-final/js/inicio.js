
import * as games from "./game.js"

export var inicio = false;
export default class Inicio extends Phaser.Scene {
	constructor(){
		super({key: "Inicio"});
	}
	preload() {
	
	
		

	}


create()
{

	if(games.escenaActual == 1)
	{
		inicio = 1;
		this.scene.start("Bosque");
	}
	else if(games.escenaActual == 2)
	{
		inicio = 1;
		this.scene.start("Cueva");
	}
	
	else if(games.escenaActual == 3)
	{
		inicio = 1;
		this.scene.start("Castillo");
	}

}

	update()
	{
	
		
	}


	
}
export function reset()
{
	inicio = 0;
}