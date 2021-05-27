<?php
	include 'conexion.php';

	$cantidadesObj=array();

	$cantidadesObj[2] = $_POST['flechasC'];
	$cantidadesObj[1] = $_POST['bombasC'];
	$cantidadesObj[3] = $_POST['curaP'];
	$cantidadesObj[4] = $_POST['curaM'];
	$cantidadesObj[5] = $_POST['curaG'];
	$cantidadesObj[6] = $_POST['dineroC'];

	$User = $_POST['usuario'];
	$IdInvent = $_POST['idInvent'];
	$escenaA = $_POST['escenaA'];
	$escenaP = $_POST['escenaP'];
	$llaveCastillo = $_POST['llaveCastillo'];
	$llaveCueva = $_POST['llaveCueva'];
	$hachaRecogida = $_POST['hachaRecogida'];
	$salud =  $_POST['vidaPers'];
	$peso =  $_POST['pesoInvent'];

	$Posx =  $_POST['posx'];
	$Posy =  $_POST['posy'];

	for($i = 1; $i<=6;$i++)
	{
		$sql1 = "UPDATE posesion SET cantidad=".$cantidadesObj[$i]." WHERE id_inventario = ".$IdInvent." AND id_objetos = $i ";
		$result1 = mysqli_query($conn, $sql1);
	}

	$sql8 = "UPDATE inventario SET peso=".$peso." WHERE codigo_inventario = ".$IdInvent;
	$result8 = mysqli_query($conn, $sql8);

	$sql7 = "UPDATE progreso SET posicion_x=".$Posx.", posicion_y=".$Posy.", castillo_desbloqueado=".$llaveCastillo.", cueva_desbloqueada=".$llaveCueva.", hacha_recogida=".$hachaRecogida.", nivel_anterior=".$escenaP.", nivel_actual=".$escenaA.", vida=".$salud." WHERE id_jugadores=$User";

	$result8 = mysqli_query($conn, $sql7);


	
?>