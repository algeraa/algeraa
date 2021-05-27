<?php
include 'conexion.php';
  $usuario = $_POST['user'];

  $cont = $_POST['contra'];
  $contCon = $_POST['contraCon'];
  	
 	$result = "SELECT * from jugadores WHERE usuario = '$usuario'"; 

 	$conec2=mysqli_query($conn, $result);
 
 	

 	if(!empty($conec2) && mysqli_num_rows($conec2) == 1)
 	{
 		header("Location: ./registro.php?repetido=1");
 	}
 	else
 	{
	if($cont == $contCon)
	{
		$encript = md5($cont);
		$sql = "INSERT INTO `jugadores`(`contrasenia`, `usuario`) VALUES ('$encript', '$usuario')";
		$conec=mysqli_query($conn, $sql);
		$seleccion = "SELECT codigo_jugadores from jugadores WHERE usuario = '$usuario'";
		$conec2=mysqli_query($conn, $seleccion);
		$row = mysqli_fetch_object($conec2);

		$insert = "INSERT INTO `inventario`(`peso`, `id_jugadores`) VALUES (15, '$row->codigo_jugadores')";
		$conec3=mysqli_query($conn, $insert);

		$seleccion2 = "SELECT codigo_inventario from inventario inv INNER JOIN jugadores jug ON inv.id_jugadores = jug.codigo_jugadores WHERE jug.codigo_jugadores = '$row->codigo_jugadores'";
		$conec4=mysqli_query($conn, $seleccion2);
		$row2 = mysqli_fetch_object($conec4);

		for($i = 1;$i<=6;$i++)
		{
			$insert2 = "INSERT INTO `posesion`(`id_objetos`, `id_inventario`, `cantidad`) VALUES ($i, '$row2->codigo_inventario', 0)";
			$conec5=mysqli_query($conn, $insert2);
		}



		$insert8 = "INSERT INTO `progreso`(`posicion_x`, `posicion_y`, `castillo_desbloqueado`, `cueva_desbloqueada`, `hacha_recogida`, `nivel_anterior`, `nivel_actual`, `id_jugadores`, `vida`) VALUES ( 1169, 1792, 0, 0, 0, 0, 1,'$row->codigo_jugadores', 10)";

		$conec11=mysqli_query($conn, $insert8);




		echo $sql;
		
   		header("Location: ../index.html");
    
	}
	else
	{
		header("Location: ./registro.php?error=1");
	}
   }
?>
