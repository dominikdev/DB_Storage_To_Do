<?php
     $host = ""; //DB HOST
     $username = "";//DB USERNAME
     $password = "";//DB PASSWORD
     $db_name = "";//DB NAME

     mysql_connect("$host","$username","$password")or die("cannot connect");
     mysql_select_db("$db_name")or die("cannot select DB");


?>