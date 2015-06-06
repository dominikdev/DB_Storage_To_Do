function ListItems(){
     var listItems = new Array();
     
     this.getListItems = function(){
          return listItems;
     }
     this.addListItemWithInfo = function(listName,itemName,itemPriority){
          var tempListItem = new Array();
          var curDate = new Date();
          var dateAdded = ""+(curDate.getMonth()+1)+"/"+curDate.getDate()+"/"+curDate.getFullYear();

          tempListItem.push(listName);
          tempListItem.push(itemName);
          tempListItem.push(itemPriority);
          tempListItem.push(dateAdded);
          tempListItem.push(0);
          tempListItem.push(getUniqueId());
          tempListItem.push(curDate.getTime());
          
          listItems.push(tempListItem);

     };
     this.addListItemFromStorage = function(storInfo){
          var tempListItem = new Array();
          
          for(var x=0;x<storInfo.length;x+=1){
               tempListItem.push(storInfo[x]);
          }

          listItems.push(tempListItem);
     };
     var isUnique = function(theId){
          var tempBool = true;
          for(var x=0;x<listItems.length;x+=1){
               if(listItems[x][5] == theId){
                    tempBool = false;
               }
          }
          return tempBool;
     };
     var getUniqueId = function(){
          var ranId;
          do{
               ranId = Math.floor((Math.random() * 8999) + 1000);
          }while(!isUnique(ranId));
          return ranId;
     };
     this.returnItemsByListName = function(listName){
          var tempItems = new Array();
          for(var x=0; x<listItems.length;x+=1){
               if(listItems[x][0] == listName){
                    tempItems.push(listItems[x]);
               }
          }
          return tempItems;
     };
     this.markCompleteById = function(theId){
          for(var x=0; x<listItems.length;x+=1){
               if(listItems[x][5] == theId){
                    if(listItems[x][4] == 1){
                         this.unmarkCompleteById(theId);
                    } else{
                         listItems[x][4] = 1;
                    }
               }
          }
     }
     this.unmarkCompleteById = function(theId){
          for(var x=0; x<listItems.length;x+=1){
               if(listItems[x][5] == theId){
                    listItems[x][4] = 0;
               }
          }
     }
     this.updateListTitles = function(oldTitle,newTitle){
          for(var x=0; x<listItems.length;x+=1){
               if(listItems[x][0] == oldTitle){
                    listItems[x][0] = newTitle;
               }
          }
     }
     this.deleteItemsFromList = function(theList){
          var tempListItems = new Array();
          for(var x=0;x<listItems.length;x+=1){
               if(listItems[x][0] == theList){
                    
               } else{
                    tempListItems.push(listItems[x]);
               }
          }
          listItems = tempListItems;
     }
     this.deleteItemByIndex = function(index){

          for(var x=0;x<listItems.length;x+=1){
               if(listItems[x][5] == index){
                    console.log("delete: "+listItems[x][1]);
                    listItems.splice(x,1);
               } else{
                    
               }
          }
     }
     this.sortByTitle = function(alpha){
          
          if(alpha){
               listItems.sort(function(a,b){
                    if (a[1] === b[1]) {
                       return 0;
                    }
                    else {
                       return (a[1] < b[1]) ? -1 : 1;
                    }
               });
          }
          else{
               listItems.sort(function(a,b){
                    if (a[1] === b[1]) {
                       return 0;
                    }
                    else {
                       return (a[1] > b[1]) ? -1 : 1;
                    }
               });
          }
     };
     this.sortByPriority = function(rev){
          
          if(!rev){
               listItems.sort(function(a,b){
                    if (a[2] === b[2]) {
                       return (a[6] < b[6]) ? -1 : 1;
                    }
                    else {
                       return (a[2] < b[2]) ? -1 : 1;
                    }
               });
          }
          else{
               listItems.sort(function(a,b){
                    if (a[2] === b[2]) {
                       return (a[6] < b[6]) ? -1 : 1;
                    }
                    else {
                       return (a[2] > b[2]) ? -1 : 1;
                    }
               });
          }
     };
     this.sortByDate = function(rev){
          
          if(!rev){
               listItems.sort(function(a,b){
                    if (a[6] === b[6]) {
                       return 0;
                    }
                    else {
                       return (a[6] < b[6]) ? -1 : 1;
                    }
               });
          }
          else{
               listItems.sort(function(a,b){
                    if (a[6] === b[6]) {
                       return 0;
                    }
                    else {
                       return (a[6] > b[6]) ? -1 : 1;
                    }
               });
          }
     };
     
}
