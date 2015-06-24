<?php
session_start();
	if(!isset($_SESSION["username"])){
	 $_SESSION["alert"] = 3;
     header("location:login.php");
	die();
	
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>To Do List</title>

    <!-- Bootstrap -->
     <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
     <link href="assets/css/todo_custom_style.css" rel="stylesheet">

  </head>
  <body onload="thePageLoaded()">
     <div id="loading">
         <div id="loading-animation">
               <span class="glyphicon glyphicon-hourglass"></span>
          </div>
     </div>
     <nav class="navbar navbar-custom">
          <div class="container">
               <div class="navbar-header col-md-2">
                    <div class="navbar-brand"><strong>To Do List</strong></div>
               </div>
               <div class="navbar-left col-md-2 col-xs-6" style="padding-top:7px;">
                    <div class="btn-group">
                         <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                              Choose List <span class="caret"></span>
                         </button>
                         <ul class="dropdown-menu" id="list-titles" role="menu">
                              
                         </ul>
                    </div>
               </div>
               <div class=" col-md-1 col-md-offset-6 col-xs-5 col-xs-offset-1" style="padding-top:7px;">
                    <div class="btn-group  pull-right">
                         <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                              <span class="glyphicon glyphicon-cog"></span> <span class="caret"></span>
                         </button>
                         <ul class="dropdown-menu  pull-right" id="list-titles" role="menu">
                              <li><a role="button" href="logout.php">Logout</a></li>
                              <li><a role="button" onclick="clearCurrentList()">Clear Current List</a></li>
                         </ul>
                    </div>
               </div>
          </div>
     </nav>
       <div id="test-wrap-data"></div>
     <div class="container">
          <div class="col-md-8 col-md-offset-2 hidden" id="new-list-input-wrapper">
               <div class="input-group">
                    <input type="text" class="form-control" id="new-list-input" placeholder="Enter New List Title">
                    <span class="input-group-btn">
                         <button class="btn btn-primary" type="button" onclick="addNewList()">Add</button>
                    </span>
               </div>

          </div>
          <div class="row">
               <div class="col-md-12">
                    <div class="page-header text-center text-primary">
                         <h1 id="current-list-title" data-toggle="tooltip" title="Click To Edit" onmousedown="editCurrentListTitle()" ondblclick="editCurrentListTitle()"> </h1>
                    </div>
               </div>  
          </div>
          <div class="row">
               <div class="col md-2 col-md-offset-1 col-xs-1">
                    <button type="button" class="btn btn-success" onclick="clickedAddNewListItem()">
                         <span class="glyphicon glyphicon-plus"></span>
                    </button>
               </div>
               <div class="col-md-2 col-md-offset-8 col-xs-3 col-xs-offset-7">
                    <div class="btn-group">
                         <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                              Sort <span class="glyphicon glyphicon-sort"></span>
                         </button>
                         <ul class="dropdown-menu pull-right" id="sort-list" role="menu">
                              <li>
                                   <a role="button" onclick="sortListItems(1)">
                                        <span class="glyphicon glyphicon-sort-by-alphabet"></span> <strong>Name</strong> <small>(a-z)</small>
                                   </a>
                              </li>
                               <li>
                                   <a role="button" onclick="sortListItems(2)">
                                         <span class="glyphicon glyphicon-sort-by-alphabet-alt"></span> <strong>Name</strong> <small>(z-a)</small>
                                   </a>
                              </li>
                              <li>
                                   <a role="button" onclick="sortListItems(3)">
                                        <span class="glyphicon glyphicon-arrow-up"></span> <strong>Priority </strong><small>(High)</small>
                                   </a>
                              </li>
                              <li>
                                   <a role="button" onclick="sortListItems(4)">
                                        <span class="glyphicon glyphicon-arrow-down"></span> <strong>Priority </strong><small>(Low)</small>
                                   </a>
                              </li>
                              <li>
                                   <a role="button" onclick="sortListItems(5)">
                                        <span class="glyphicon glyphicon-calendar"></span> <strong>Newest</strong>
                                   </a>
                              </li>
                              <li>
                                   <a role="button" onclick="sortListItems(6)">
                                        <span class="glyphicon glyphicon-calendar"></span> <strong>Oldest</strong>
                                   </a>
                              </li>
                         </ul>
                    </div>
               </div>
          </div>
          </br>
          <div class="col-md-10 col-md-offset-1 hidden" id="new-list-item-wrapper">
               <div class="col-md-12">
               <h3>Add New List Item:</h3>
               </div>
               <div class="form-group col-md-6">
                    <label class="sr-only" for="new-list-item-input">List Item Title</label>
                    <input type="text" class="form-control" id="new-list-item-input" placeholder="List Item Title">
               </div>
               <div class="form-group col-md-4">
                    <select class="form-control" id="priority-input">
                         <option>Low</option>
                         <option>Medium</option>
                         <option>High</option>
                    </select>                                    
               </div>
               <div class="form-group col-md-2">
                    <button class="btn btn-default" onclick="addNewListItem()">Add List Item</button>                                     
               </div>

          </div>
          <div class="row">
               <!-- LIST ITEMS BELOW-->
               <div class="col-md-10 col-md-offset-1"  id="list-item-wrapper">
                    
               </div>
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
    <script src="assets/bootstrap/js/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->

     <script src="assets/js/list_names.js"></script>
     <script src="assets/js/list_items.js"></script>
     <script src="assets/js/list_node_builder.js"></script>
     <script src="assets/js/db_connects.js"></script>
     <script src="assets/js/todo_list.js"></script>
     <script src="assets/js/list_functions.js"></script>
     <script src="assets/bootstrap/js/bootstrap.min.js"></script>
     <script>
          
          //TOOLTIP JQUERY---------------
          
          $(function () {
               $('#current-list-title').tooltip();
          });

          function toggleToolTip(){
               if($('#current-list-title').has('#update-list-input')){
                    $('#current-list-title').tooltip('destroy');
               } else{
                    $('#current-list-title').tooltip();
               }
          }
          $('#current-list-title').mousedown(function() {
               toggleToolTip();
               addClickEvent();
          });
          function addClickEvent(){
               $('#current-list-title .btn').click(function(){
                    $('#current-list-title').tooltip();
                    
               });
          }
          
     </script>
     
  </body>
</html>