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

		$insert2 = "INSERT INTO `posesion`(`id_objetos`, `id_inventario`, `cantidad`) VALUES (1, 'row2->codigo_inventario', 0)";
		$conec5=mysqli_query($conn, $insert2);

		$insert3 = "INSERT INTO `posesion`(`id_objetos`, `id_inventario`, `cantidad`) VALUES (2, 'row2->codigo_inventario', 0)";
		$conec6=mysqli_query($conn, $insert3);

		$insert4 = "INSERT INTO `posesion`(`id_objetos`, `id_inventario`, `cantidad`) VALUES (3, 'row2->codigo_inventario', 0)";
		$conec7=mysqli_query($conn, $insert4);

		$insert5 = "INSERT INTO `posesion`(`id_objetos`, `id_inventario`, `cantidad`) VALUES (4, 'row2->codigo_inventario', 0)";
		$conec8=mysqli_query($conn, $insert5);

		$insert6 = "INSERT INTO `posesion`(`id_objetos`, `id_inventario`, `cantidad`) VALUES (5, 'row2->codigo_inventario', 0)";
		$conec9=mysqli_query($conn, $insert6);

		$insert7 = "INSERT INTO `posesion`(`id_objetos`, `id_inventario`, `cantidad`) VALUES (6, 'row2->codigo_inventario', 0)";
		$conec10=mysqli_query($conn, $insert7);



		echo $sql;
		
   		header("Location: ../index.html");
    
	}
	else
	{
		header("Location: ./registro.php?error=1");
	}
   }
?>
