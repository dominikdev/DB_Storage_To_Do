//DECLARE GLOBAL VARIABLE TO CUT DOWN ON AJAX REQUESTS
usernameAvailable = false;

function valEmailInput(){
     var emailInput = document.getElementById('email-input');
     
     if(typeof emailInput.willValidate !== "undefined"){
          if(emailInput.checkValidity()){
               document.getElementById('fg-2').setAttribute('class','form-group has-feedback');
          } 
          else{
               document.getElementById('fg-2').setAttribute('class','form-group has-feedback has-error');
          }
     } 
}

//CHECK DB FOR USERNAME AVAILABILITY
function checkUsername(){
     var userInput = document.getElementById('username-input');
     
     if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
           var xmlhttp= new XMLHttpRequest();
        }
     xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
               //document.getElementById("test-wrap-data").innerHTML = xmlhttp.responseText;
               //addEventListeners();
               var ava = xmlhttp.responseText;
               if(ava == "1"){
                    usernameAvailable = true;
                    var errorIcon = document.getElementById('fg-3').getElementsByClassName('glyphicon');
                    errorIcon[0].setAttribute('class','glyphicon glyphicon-ok form-control-feedback');
                    document.getElementById('fg-3').setAttribute('class','form-group has-feedback has-success');
               } else{
                    usernameAvailable = false;
                    var errorIcon = document.getElementById('fg-3').getElementsByClassName('glyphicon');
                    errorIcon[0].setAttribute('class','glyphicon glyphicon-remove form-control-feedback');
                    document.getElementById('fg-3').setAttribute('class','form-group has-feedback has-error');
               }
            }
     }

     xmlhttp.open("POST","checkusername.php",true);
     xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
     xmlhttp.send("un="+userInput.value);

}

//MAKE SURE PASSWORD FIELDS MATCH
function valCheckForMatch(){
     var pwField = document.getElementById('password-input');
     var pwCon = document.getElementById('password-confirm');
     
     if(pwField.value == pwCon.value){
          document.getElementById('fg-4').setAttribute('class','form-group has-feedback');
          document.getElementById('fg-5').setAttribute('class','form-group has-feedback');
          return true;
     } else{
          document.getElementById('fg-4').setAttribute('class','form-group has-feedback has-error');
          document.getElementById('fg-5').setAttribute('class','form-group has-feedback has-error');
          return false;
     }
}

function validateForm(event) {

     if(usernameAvailable){
          
     } else{
          return false;
     }
     if(valCheckForMatch()){
          return true;
     } else{
          return false;
     }
     
}

