<?php
	include 'conexion.php';
	//$user = $_REQUEST['us'];

	//if(isset($_POST['us'])) {
   		$user=$_GET['user'];
   		//echo $user;
	/*}else{
		$user=null;
	}*/



 	$sql=mysqli_query($conn,"SELECT * FROM jugadores WHERE codigo_jugadores=$user");
 	
  
  	$usuario=array();

  	while($row = mysqli_fetch_assoc($sql)){
    	$usuario[]=$row;
  	}

  	print json_encode($usuario);

?>