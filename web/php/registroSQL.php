<?php
echo("1");
function pg_connection_string_from_database_url() {
  extract(parse_url($_ENV["DATABASE_URL"]));
  return "user=$user password=$pass host=$host dbname=" . substr($path, 1); # <- sslmode=require ????
}
echo("2");
$pg_conn = pg_connect(pg_connection_string_from_database_url());
echo("3");
  $usuario = $_POST['user'];
  $cont = $_POST['contra'];
  $contCon = $_POST['contraCon'];
echo("4");
  $sql = INSERT INTO public."JUGADORES"
(usuario, contrasenia, codigo_jugadores)
VALUES('$usuario', '$cont', 1);
echo("5");
    $conec=pg_query($pg_conn, $sql);
    header("Location: ../juego.html");
    
?>
