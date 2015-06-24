<?php
     session_start();
     include "connect.php";
     $tbl_name = ""//USERS TABLE IN DB
     if(isset($_GET['email']) && !empty($_GET['email']) AND isset($_GET['hash']) && !empty($_GET['hash'])){

          $email = $_GET['email']; 
          $hash = $_GET['hash']; 
          $search = mysql_query("SELECT email, hash, active FROM users_todo WHERE email='".$email."' AND hash='".$hash."' AND active='0'") or die(mysql_error()); 
          $match  = mysql_num_rows($search);
 
          if($match > 0){
               mysql_query("UPDATE $tbl_name SET active='1' WHERE email='".$email."' AND hash='".$hash."' AND active='0'") or die(mysql_error());
               $_SESSION["alert"] = 4;
               header("location:login.php");
              die();
          }else{
               $_SESSION["alert"] = 5;
               header("location:login.php");
              die();
          }       
     }
?>