
export var miStorage;

export default function login(u,c){
	
 
	var ajax2=new XMLHttpRequest();
	ajax2.open("_GET", "http://localhost/algeraa-BBDD/php/loginSQL.php?user="+u+"&contra="+c,true);

	ajax2.onreadystatechange=function() {
		if (ajax2.readyState==4 && ajax2.status==200) {

			var respuesta2=JSON.parse(this.responseText);

			miStorage = window.localStorage;

			miStorage.setItem('cantidadBomb',respuesta2[0].cantidad);
			//miStorage.setItem('contraseniaJu',respuesta2[0].contrasenia);
			//miStorage.setItem('usuarioJu',respuesta2[0].usuario);
			//miStorage.setItem(respuesta2[0].codigo_jugadores,respuesta2[0].contrasenia);
			//miStorage.setItem(respuesta2[0].contrasenia,respuesta2[0].usuario);
			//var f =miStorage.getItem('codigoJu');
			//alert(miStorage.getItem('usuarioJu'));

			document.location="juego.html";
			//alert(miStorage.getItem('cantidadBomb'));
		}
	}

	//ajax2.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	ajax2.send();
}
