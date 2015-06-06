<?php 
     session_start();
     session_destroy();
     session_start();
     $_SESSION["alert"] = 2;
     header("location:login.php");

?>