function ListNames(){
     var listNames = new Array();
     
     this.getListNames = function(){
          return listNames;
     }
     this.addListWithName = function(theName){
          if(!nameExists(theName)){
               listNames.push(theName);
          } 
          
     };
     this.updateListName = function(oldName,newName){
          for(var x=0;x<listNames.length;x+=1){
               if(listNames[x] == oldName){
                    listNames[x] = newName;
               }
          }
     }
     this.deleteListName = function(theName){
          var tempListNames = new Array();
          for(var x=0; x<listNames.length; x+=1){
               if(listNames[x] == theName){
                    
               } else{
                    tempListNames.push(listNames[x]);
               }
          }
          listNames = tempListNames;
     }
     var nameExists = function(testName){
          for(var x=0; x<listNames.length;x+=1){
               if(listNames[x] == testName){
                    return true;
               }
          }
          return false;
     }
}
