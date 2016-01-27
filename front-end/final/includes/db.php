
<?php
$db = mysqli_connect('sql6.freemysqlhosting.net:3306', 'sql6104212', 'LUFincJuKr', 'sql6104212');

if($db == false){
    die('Unable to connect to database [' . $db->connect_error . ']');
}

?>