<?php
     session_start();
     error_reporting(E_ALL); ini_set('display_errors', 'On'); 
     include "connect.php";
     
     $user = $_POST['username'];
     $pass = crypt($_POST['userpassword'], CRYPT_BLOWFISH);
     
     $tbl_name = "";//USERS TABLE IN DB
     
     $sql="SELECT * FROM $tbl_name WHERE username = '$user' and password='$pass'";
     $result=mysql_query($sql);

     $count=mysql_num_rows($result);
     $row = mysql_fetch_array($result);

     if($count == 1){
          if($row["active"]){
                $_SESSION["username"]="y";
               $_SESSION["password"]=$pass;
               $_SESSION["userid"] = $row['user_ID'];
               header("location:index.php");
          } else{
               $_SESSION["alert"] = 6;
               header("location:login.php");
          }
         
     } else{
          $_SESSION["alert"] = 1;
          header("location:login.php");
     }

?>
