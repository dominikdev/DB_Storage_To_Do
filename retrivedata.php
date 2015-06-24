<?php
     include "connect.php";
     session_start();
     $userid = $_SESSION["userid"];
     error_reporting(E_ALL); ini_set('display_errors', 'On'); 
     
     $tbl_name = "";//TO LIST LIST DATA TABLE IN DB
     
     $sql="SELECT `current_list`, `list_titles`, `list_items` FROM $tbl_name WHERE user = '$userid'";
     $result=mysql_query($sql);

     $count = mysql_num_rows($result);
     $td_data = array();

     if($count == 1){
          while($row = mysql_fetch_array($result)){

          $td_data[0] = $row[0];
          $td_data[1] = $row[1];
          $td_data[2] = $row[2];
          }
          $td_data_to_return = json_encode($td_data);

          echo $td_data_to_return;
     }
     else{
          echo 'false';
     }


?>