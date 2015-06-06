<?php
     session_start();
     error_reporting(E_ALL); ini_set('display_errors', 'On'); 
     include "connect.php";
     
     $user = $_POST['un'];
     
     $tbl_name = "";//USERS TABLE IN DB
     
     $sql="SELECT * FROM $tbl_name WHERE username = '$user'";
     $result=mysql_query($sql);

     $count=mysql_num_rows($result);

     if($count == 1){
          echo 0;
     } else{
          echo 1;
     }

?>
