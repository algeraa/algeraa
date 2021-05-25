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

	$sql = "UPDATE posesion SET cantidad=".$Cbombas." WHERE id_inventario = ".$IdInvent." AND id_objetos = 1 ";


	$result = mysqli_query($conn, $sql);

	echo $Cbombas;
	
	
?>