<?php
	include 'conexion.php';

	$Cflechas = $_POST['flechasC'];
	$Cbombas = $_POST['bombasC'];
	$CcuraP = $_POST['curaP'];
	$CcuraM = $_POST['curaM'];
	$CcuraG = $_POST['curaG'];
	$Cdinero = $_POST['dineroC'];
	$User = $_POST['usuario'];
	$IdInvent = $_POST['idInvent'];
	$escenaA = $_POST['escenaA'];
	$escenaP = $_POST['escenaP'];
	$llaveCastillo = $_POST['llaveCastillo'];
	$llaveCueva = $_POST['llaveCueva'];
	$hachaRecogida = $_POST['hachaRecogida'];


	$sql1 = "UPDATE posesion SET cantidad=".$Cbombas." WHERE id_inventario = ".$IdInvent." AND id_objetos = 1 ";
	$result1 = mysqli_query($conn, $sql1);

	$sql2 = "UPDATE posesion SET cantidad=".$Cflechas." WHERE id_inventario = ".$IdInvent." AND id_objetos = 2 ";
	$result2 = mysqli_query($conn, $sql2);

	$sql3 = "UPDATE posesion SET cantidad=".$CcuraP." WHERE id_inventario = ".$IdInvent." AND id_objetos = 3 ";
	$result3 = mysqli_query($conn, $sql3);

	$sql4 = "UPDATE posesion SET cantidad=".$CcuraM." WHERE id_inventario = ".$IdInvent." AND id_objetos = 4 ";
	$result4 = mysqli_query($conn, $sql4);

	$sql5 = "UPDATE posesion SET cantidad=".$CcuraG." WHERE id_inventario = ".$IdInvent." AND id_objetos = 5 ";
	$result5 = mysqli_query($conn, $sql5);

	$sql6 = "UPDATE posesion SET cantidad=".$Cdinero." WHERE id_inventario = ".$IdInvent." AND id_objetos = 6 ";
	$result6 = mysqli_query($conn, $sql6);

	$seleccion = "SELECT codigo_jugadores from jugadores WHERE usuario = '".$User."'";
	$result7 = mysqli_query($conn, $seleccion);
	$row2 = mysqli_fetch_object($result7);

	$sql7 = "UPDATE `progreso` SET `castillo_desbloqueado`=".$llaveCastillo.",`cueva_desbloqueada`=".$llaveCueva.",`hacha_recogida`=".$hachaRecogida.",`nivel_anterior`=".$escenaP.",`nivel_actual`=".$escenaA." WHERE id_jugadores='$row2->codigo_jugadores'";
	$result8 = mysqli_query($conn, $sql7);


	echo $llaveCueva;
	
	
?>