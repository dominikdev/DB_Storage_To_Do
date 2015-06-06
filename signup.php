<?php
session_start();
	if(!isset($_SESSION["username"])){

    } else{
     header("location:index.php");
	    die();
	
    }
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sign Up - To Do List</title>

    <!-- Bootstrap -->
     <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
     <link href="assets/css/todo_custom_style.css" rel="stylesheet">
     <link href="assets/css/signup_style.css" rel="stylesheet">


  </head>
  <body>
     <nav class="navbar navbar-custom">
          <div class="container">
               <div class="navbar-header col-md-2">
                    <div class="navbar-brand"><strong>To Do List</strong></div>
               </div>
               
          </div>
     </nav>
     <div class="row">
          <div class="col-md-6 col-md-offset-3">
               <div class="page-header">
                    <h2>Sign Up</h2>
               </div>
               <?php
                    include "connect.php";
                    
                    if(isset($_POST['name']) && !empty($_POST['name']) AND isset($_POST['email']) && !empty($_POST['email'])){
                         $username = $_POST['username'];
                         $name = $_POST['name'];
                         $email = $_POST['email']; 
                         $pass = crypt($_POST['userpassword'], CRYPT_BLOWFISH);
                         $hash = md5( rand(0,1000) );
                         $tbl_name = ""//USERS TABLE IN DB
                         if(!eregi("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$", $email)){
                             $msg = "<label class='alert alert-danger center-block'>The email you have entered is invalid, please try again.</label>";
                         }else{
                            $msg = "<label class='alert alert-success center-block'>Your account has been made, please verify it by clicking the activation link that has been send to your email.</span>";
                         }
                         if(isset($msg)){  
                            echo $msg; 
                        } 
                         mysql_query("INSERT INTO $tbl_name(username, name, password, email, hash) VALUES(
                         '". mysql_escape_string($username)."', 
                         '". mysql_escape_string($name) ."', 
                         '". mysql_escape_string($pass) ."', 
                         '". mysql_escape_string($email) ."', 
                         '". mysql_escape_string($hash) ."') ") or die(mysql_error());
                         
                         $to      = $email;
                         $subject = 'Signup | Verification'; 
                         $message = '

                         Thanks for signing up!
                         Your account has been created, you can login with the following username after you have activated your account by pressing the url below.

                         ------------------------
                         Username: '.$username.'
                         ------------------------

                         Please click this link to activate your account:
                         http://www.dominikdev.com/portfolio/other_projects/todoli/verify.php?email='.$email.'&hash='.$hash.'

                         ';

                         $headers = 'From:noreply@dominikdev.com' . "\r\n"; // Set from headers
                         mail($to, $subject, $message, $headers); // Send our email
                    }
               ?>
          </div>  
     </div>
     <div class="row">
          <div class="col-md-6 col-md-offset-3">
               <form onsubmit="return validateForm(event)" action="signup.php" method="post">
                    <div class="form-group has-feedback" id="fg-1">
                         <label for="name-input">Name <span id="input-1-label"></span></label>
                         <input type="text" name="name" class="form-control" id="name-input" placeholder="Name" required>
                         <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
                    </div>
                    <div class="form-group has-feedback" id="fg-2">
                         <label for="email-input">Email <span class="text-danger" id="input-2-label"> Invalid Email</span></label>
                         <input type="email" name="email" class="form-control" id="email-input" placeholder="Email" onblur="valEmailInput()"  required>
                         <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
                    </div>
                    <div class="form-group has-feedback" id="fg-3">
                         <label for="username-input">Username <span class="text-danger" id="input-3-label">Username Unavailable</span></label>
                         <input type="text" name="username" class="form-control" id="username-input" placeholder="Username" onblur="checkUsername()"  required>
                         <span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
                    </div>
                    <div class="form-group has-feedback" id="fg-4">
                         <label for="password-input">Password <span id="input-4-label"></span></label>
                         <input type="password" name="userpassword" class="form-control" id="password-input" placeholder="Password" required>
                         <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
                    </div>
                    <div class="form-group has-feedback" id="fg-5">
                         <label for="password-confirm">Confirm Password <span id="input-5-label"></span></label>
                         <input type="password" class="form-control" id="password-confirm" placeholder="Confirm Password" onblur="valCheckForMatch()" required>
                         <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
                    </div>
                    <input type="submit" class="form-control btn btn-primary">
               </form>
          </div>  
     </div>
     <div class="row">
          <div class="col-md-6 col-md-offset-3 text-center">
               <br>
               <a href="login.php">Or Login</a>
          </div>  
     </div>
     

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
     <script src="assets/js/signup_val.js"></script>
  </body>
</html>