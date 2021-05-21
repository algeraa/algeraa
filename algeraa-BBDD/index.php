<!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8'/>	
		<title>Login</title>
	</head>
	<body>
		<form action="php/loginSQL.php" method="POST">
			Usuario: <input type="text" name="user" required=""><br>
			Contraseña: <input type="password" name="contra" required=""><br>	
			<input type="submit" name="Enviar" value="Enviar">
		</form>
		<a href="php/registro.php" type="button">Registrarse</a>
		<?php if(isset($_REQUEST['error'])){
			echo "<p>Datos de inicio de sesion erroneos</p>";
		}
		?>
	</body>
</html>
