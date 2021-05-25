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
		echo $sql;
		$conec=mysqli_query($conn, $sql);
   		header("Location: ../juego.html");
    
	}
	else
	{
		header("Location: ./registro.php?error=1");
	}
   }
?>
