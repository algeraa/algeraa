<?php
function pg_connection_string_from_database_url() {
  extract(parse_url($_ENV["DATABASE_URL"]));
  return "user=$user password=$pass host=$host dbname=" . substr($path, 1); # <- sslmode=require ????
}

$pg_conn = pg_connect(pg_connection_string_from_database_url());
  $usuario = $_POST['user'];
  $cont = $_POST['contra'];
  $contCon = $_POST['contraCon'];

  $sql = "INSERT INTO public.JUGADORES  (usuario, contrasenia, codigo_jugadores) VALUES ('$usuario', '$cont', 1)";

    $conec=pg_query($pg_conn, $sql);
    header("Location: ../juego.html");
    
?>
