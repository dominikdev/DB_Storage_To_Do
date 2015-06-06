<?php
     include "connect.php";
     session_start();
     $tbl_name = "";//TO LIST LIST DATA TABLE IN DB

     $user_id = $_SESSION["userid"];
     

     $current_list = $_POST['cl'];
     $list_titles = $_POST['lt'];
     $list_items = $_POST['li'];
     
     $check = "SELECT * FROM $tbl_name WHERE user = '$user_id' ";
     $check_result = mysql_query($check);
     $count = mysql_num_rows($check_result);

     if($count == 1){
          $sql = "UPDATE $tbl_name SET `current_list`='$current_list',`list_titles`='$list_titles',`list_items`= '$list_items' WHERE user = $user_id";
     } else{
          $sql="INSERT INTO $tbl_name (user, current_list, list_titles, list_items) VALUES ('$user_id','$current_list','$list_titles','$list_items' )";
     }
     
      
     mysql_query($sql);
     echo mysql_error();
?>