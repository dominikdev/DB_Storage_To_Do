<?php
     include "connect.php";
     session_start();
     $userid = $_SESSION["userid"];
     
     $tbl_name = "";//TO LIST LIST DATA TABLE IN DB
     
     $sql="SELECT `current_list`, `list_titles`, `list_items` FROM $tbl_name WHERE user = '$userid'";
     $result=mysql_query($sql);

     $count = mysql_num_rows($result);

     if($count == 1){
          $row = mysql_fetch_array($result);
     
          $which_data = $_POST['dto'];

          if($which_data == 1){
               echo $row['current_list'];
          }
          else if($which_data == 2){
               echo $row['list_titles'];
          }
          else if($which_data == 3){
               echo $row['list_items'];
          }
     } else{
          echo 'false';
     }
     
     //echo $row['current_list'];
     //echo $row['list_titles'];
     
    

?>