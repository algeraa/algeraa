<?php
# Esta función lee la variable de configuración DATABASE_URL y devuelve una 
# cadena de conexion para pg_connect. Pon esto en tu aplicación.
function pg_connection_string_from_database_url() {
  extract(parse_url($_ENV["DATABASE_URL"]));
  return "user=$user password=$pass host=$host dbname=" . substr($path, 1); # <- sslmode=require ????
}

# Establecemos la conexión
$pg_conn = pg_connect(pg_connection_string_from_database_url());

# Testeamos que funciona
$result = pg_query($pg_conn, "SELECT relname FROM pg_stat_user_tables WHERE schemaname='public'");

print "<pre>\n";
if (!pg_num_rows($result)) {
  print("La conexión funciona, pero la base de datos está vacía..\n\n");
} else {
  print "Tablas en la base de datos:\n";
  while ($row = pg_fetch_row($result)) { print("- $row[0]\n"); }
}
print "\n";
?>