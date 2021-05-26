
export var miStorage;

export default function login(u,c){
	
 
	var ajax2=new XMLHttpRequest();
	ajax2.open("_GET", "./php/loginSQL.php?user="+u+"&contra="+c,true);

	ajax2.onreadystatechange=function() {
		if (ajax2.readyState==4 && ajax2.status==200) {
			if(this.responseText == "No encontrado")
			{
				alert("Error");
				document.location="index.html";
			}

			var respuesta2=JSON.parse(this.responseText);

			miStorage = window.localStorage;

			miStorage.setItem('cantidadBomb',respuesta2[0].cantidad);
			miStorage.setItem('cantidadFlechas',respuesta2[1].cantidad);
			miStorage.setItem('cantidadPocionP',respuesta2[2].cantidad);
			miStorage.setItem('cantidadPocionM',respuesta2[3].cantidad);
			miStorage.setItem('cantidadPocionG',respuesta2[4].cantidad);
			miStorage.setItem('cantidadDinero',respuesta2[5].cantidad);
			miStorage.setItem('nUsuario',respuesta2[0].usuario);
			miStorage.setItem('cIventario',respuesta2[0].codigo_inventario);
			
			document.location="juego.html";
			
		}
	}


	ajax2.send();
}
