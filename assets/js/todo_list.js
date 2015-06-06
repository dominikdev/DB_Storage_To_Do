function ToDoList(){
     var currentList = "";
     var allListItems;
     var allListNames;
     
     this.setupToDo = function(todoData){
          allListItems = new ListItems();
          allListNames = new ListNames();
          
          if(todoData){
               currentList = todoData[0];
          
               var listNamesFromStorage = todoData[1];
               for(var x=0; x<listNamesFromStorage.length;x+=1){
                    allListNames.addListWithName(listNamesFromStorage[x]);
               }

               var listItemsFromStorage = todoData[2];
                    for(var y=0; y<listItemsFromStorage.length; y+=1){
                         allListItems.addListItemFromStorage(listItemsFromStorage[y]);
                    }
          }
          else{
               allListNames.addListWithName('To Do');
               currentList = allListNames.getListNames()[0];
               this.saveToDoList();
          }
          
          
     }
     this.saveToDoList = function(){
          this.newSave();
     }
     this.newSave = function(){
          var theNames = JSON.stringify(allListNames.getListNames());
          var theItems = JSON.stringify(allListItems.getListItems());
          var curList = JSON.stringify(currentList);
          
          saveListData(curList,theNames,theItems);
     }
     this.setCurrentList = function(listIndex){
          var listNames = allListNames.getListNames();
          if(listNames.length>0){
               currentList = listNames[listIndex];
               this.saveToDoList();
          } else{
               //localStorage.clear();
               this.setupToDo(false);
          }
          
     }
     this.returnCurrentList = function(){
          return currentList;
     }
     this.addList = function(lName){
          allListNames.addListWithName(lName);
          var theListNames = allListNames.getListNames();
          this.setCurrentList(theListNames.length-1);
     }
     this.addItemToCurrentList = function(itemName,priority){
          allListItems.addListItemWithInfo(currentList,itemName,priority);
          this.saveToDoList();
     }
     this.getCurrentListItems = function(){
          return allListItems.returnItemsByListName(currentList);
     }
     this.returnAllListTitles = function(){
          return allListNames.getListNames();
     }
     this.markComplete = function(index){
          allListItems.markCompleteById(index);
          this.saveToDoList();
     };
     this.sortItemsInList = function(sortType){
          switch(sortType){
               case 1:
                    allListItems.sortByTitle(true);
                    break;
               case 2:
                    allListItems.sortByTitle(false);
                    break;
               case 3:
                    allListItems.sortByPriority(false);
                    break;
               case 4:
                    allListItems.sortByPriority(true);
                    break;
               case 5:
                    allListItems.sortByDate(true);
                    break;
               case 6:
                    allListItems.sortByDate(false);
                    break;
          }
     }
     this.updateCurrentListTitle = function(newTitle){
          allListNames.updateListName(currentList,newTitle);
          allListItems.updateListTitles(currentList,newTitle);
          currentList = newTitle;
          this.saveToDoList();
     }
     this.deleteCurrentList = function(){
          allListNames.deleteListName(currentList);
          allListItems.deleteItemsFromList(currentList);
          this.setCurrentList(0);
     }
     this.deleteItemByIndex = function(index){
          allListItems.deleteItemByIndex(index);
          this.saveToDoList();
     }
     this.clearCurrentList = function(){
          allListItems.deleteItemsFromList(currentList);
          this.saveToDoList();
     }

}
