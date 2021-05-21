<?php
include'conexion.php';

$usuario = $_POST['user'];
$cont = $_POST['contra'];
$encript = md5($cont);
 $sql = "SELECT * FROM jugadores WHERE usuario = '$usuario' AND contrasenia = '$encript'";


    $conec=mysqli_query($conn, $sql);

 if(!empty($conec) && mysqli_num_rows($conec) == 1)
 {
 	header("Location: ../juego.html");
 	
 }
else
{
	header("Location: ../index.php?error=1");
}


?>