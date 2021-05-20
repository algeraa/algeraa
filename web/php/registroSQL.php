<?php

  include 'conexion.php';

  $usuario = $_POST['user'];
  $cont = $_POST['contra'];
  $contCon = $_POST['contraCon'];

  $sql = INSERT INTO public."JUGADORES"
(usuario, contrasenia, codigo_jugadores)
VALUES('$usuario', '$cont', 1);

    $conec=pg_query($pg_conn, $sql);
    header("Location: ../juego.html");
    
?>
