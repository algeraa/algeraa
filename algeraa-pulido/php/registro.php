<!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8'/>	
		<title>Login</title>
	</head>
	<body>
		<form action="registroSQL.php" method="POST">
			Usuario: <input type="text" name="user" required=""><br>
			Contraseña: <input type="password" name="contra" required=""><br>
			Confirmar contraseña: <input type="password" name="contraCon" required=""><br>
			<input type="submit" name="Registrar" value="Registrar">
		</form>

		<?php 
		if(isset($_REQUEST['error'])){
			echo "<p>Las contraseñas tienen que coincidir</p>";
		}
		else if(isset($_REQUEST['repetido'])){
			echo "<p>Este usuario ya existe</p>";
	}

		?>
	
	</body>
</html>
