<?php
include'conexion.php';

$usuario = $_GET['user'];
$cont = $_GET['contra'];
$encript = md5($cont);
$sql = "SELECT pro.*, cantidad, ju.codigo_jugadores, inv.codigo_inventario, inv.peso FROM jugadores ju
INNER JOIN inventario inv ON ju.codigo_jugadores=inv.id_jugadores
INNER JOIN progreso pro ON ju.codigo_jugadores=pro.id_jugadores
INNER JOIN posesion pos ON inv.codigo_inventario=pos.id_inventario
INNER JOIN objetos obj ON pos.id_objetos=obj.codigo_objetos
WHERE ju.usuario = '$usuario' AND ju.contrasenia = '$encript'";



    $conec=mysqli_query($conn, $sql);
    //echo $sql;

 if(!empty($conec) && mysqli_num_rows($conec) == 6)
 {
 	//$a=mysqli_fetch_object($conec);

 	$datosJugador=array();

	while($row = mysqli_fetch_object($conec)){
	    $datosJugador[]=$row;
	}


 	echo json_encode($datosJugador);
 	
 }


else
{
	echo "No encontrado";
}


?>