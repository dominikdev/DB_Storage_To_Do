function saveListData(cur,titles,items){
     if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
           var xmlhttp= new XMLHttpRequest();
        }
     xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
               //document.getElementById("test-wrap-data").innerHTML = xmlhttp.responseText;
               //addEventListeners();
               console.log('saved new');
            }
     }
     var dts = new Array();
     dts[0] = encodeURIComponent(cur);
     dts[1] = encodeURIComponent(titles);
     dts[2] = encodeURIComponent(items);
     xmlhttp.open("POST","savelist.php",true);
     xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
     xmlhttp.send("cl="+dts[0]+"&lt="+dts[1]+"&li="+dts[2]);
}
