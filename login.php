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
    <title>Login - To Do List</title>

    <!-- Bootstrap -->
     <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
     <link href="assets/css/todo_custom_style.css" rel="stylesheet">

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
               <?php
                    session_start();
                    if($_SESSION["alert"] == 1){
                         echo "<div class='alert alert-danger' role='alert'><strong>Error!</strong> Username/Password is wrong</div>";
                         $_SESSION["alert"] = 0;
                    } else if($_SESSION["alert"] == 2){
                         echo "<div class='alert alert-success' role='alert'><strong>Logout Successful!</strong></div>";
                         $_SESSION["alert"] = 0;
                    } else if($_SESSION["alert"] == 3){
                         echo "<div class='alert alert-danger' role='alert'><strong>Error!</strong> You must login first.</div>";
                         $_SESSION["alert"] = 0;
                    } else if($_SESSION["alert"] == 4){
                         echo "<div class='alert alert-success' role='alert'>Your account has been activated, you can now login</div>";
                         $_SESSION["alert"] = 0;
                    }  else if($_SESSION["alert"] == 5){
                         echo "<div class='alert alert-danger' role='alert'>Invalid URL or Your email has already been verified</div>";
                         $_SESSION["alert"] = 0;
                    } else if($_SESSION["alert"] == 6){
                         echo "<div class='alert alert-danger' role='alert'>Please verify your email addresss using link sent to your email</div>";
                         $_SESSION["alert"] = 0;
                    } 
                    
               ?>
               <div class="page-header">
                    <h2>Login</h2>
               </div>
          </div>  
     </div>
     <div class="row">
          <div class="col-md-6 col-md-offset-3">
               <form action="checklogin.php" method="post">
                    <div class="form-group">
                         <label for="usernameInput">Username</label>
                         <input type="text" name="username" class="form-control" id="usernameInput" placeholder="Username">
                    </div>
                    <div class="form-group">
                         <label for="passwordInput">Password</label>
                         <input type="password" name="userpassword" class="form-control" id="passwordInput" placeholder="Password">
                    </div>
                    <input type="submit" class="form-control btn btn-primary">
               </form>
          </div>  
     </div>
     <div class="row" style="padding-bottom:100px;">
          <div class="col-md-6 col-md-offset-3 text-center">
               <br>
               <a href="signup.php">Or Signup</a>
          </div>  
     </div>
     <div class="footer">
          <div class="container-fluid">
               <div class="row">
                    <div class="col-md-12">
                         <ul class="list-unstyled list-inline center-block text-center">
                              <li><a href="http://www.github.com/dominikdev">GitHub</a></li>
                              <li> | </li>
                              <li><a href="https://twitter.com/DGrochowicz">Twitter</a></li>
                              <li> | </li>
                              <li><a href="https://www.linkedin.com/in/dgrochowicz">Linkedin</a></li>
                         </ul>
                    </div>
               </div>
               <div class="row">
                    <div class="col-md-12">
                         <ul class="list-unstyled list-inline center-block text-center">
                              <li><a href="http://dominikdev.com/index.html">Home</a></li>
                              <li> | </li>
                              <li><a href="http://dominikdev.com/portfolio/index.html">Portfolio</a></li>
                              <li> | </li>
                              <li><a href="http://dominikdev.com/about/index.php">About</a></li>
                              <li> | </li>
                              <li><a href="http://dominikdev.com/blog/index.html">Blog</a></li>
                         </ul>
                    </div>
               </div>
               <div class="row">
                    <div class="col-md-12">
                         <ul class="list-unstyled list-inline center-block text-center">
                              <li>Dominik Web Designer & Developer</li>
                              <li class="hide-mobile"> | </li>
                              <li>© All Rights Reserved 2015</li>
                              <li class="hide-mobile"> | </li>
                              <li><a href="mailto:contact@dominikdev.com" style="color:inherit;">Contact@DominikDev.com</a></li>
                         </ul>
                    </div>
               </div>
          </div>
     </div><!-- End Footer -- >

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
  </body>
</html>