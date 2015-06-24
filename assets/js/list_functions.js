function thePageLoaded(){
     editingListTitle = false;
     loadedListData = new Array();
     retrieveUserData();
}

// INITIAL LOADING FUNCTIONS ----------------------------------------------------------------------

function dataFinishedLoading(firstlogin){
     if(firstlogin){
          loadedListData = null;
     }
     document.getElementById('loading').setAttribute('class','start-hiding');
     setTimeout(function(){
          document.body.removeChild(document.getElementById('loading'));
     },1000);

     mainToDoList = new ToDoList();
     mainToDoList.setupToDo(loadedListData);
     pullUpCurrentList();
     addListNav();
}
function retrieveUserData(){
     if (window.XMLHttpRequest) {
           var xmlhttp= new XMLHttpRequest();
        }
     document.getElementById('loading-animation').setAttribute('class','is-loading');
     xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
               var listData = xmlhttp.responseText;
               if(listData == 'false'){
                    dataFinishedLoading(true);
               }
               else{
                    decodeListData(listData);         
               }
            }
     }
     xmlhttp.open("POST","retrivedata.php",true);
     xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
     xmlhttp.send();
}
function decodeListData(data){
     
     var lsData = JSON.parse(data);
     var allLsData = new Array()
     
     for(var x=0; x<lsData.length;x++){
          allLsData.push(JSON.parse(lsData[x]));
     }
     
     loadedListData = allLsData;
     dataFinishedLoading();
     
}
function updatePgBar(index){
     
     var pgBar = document.getElementById('pg-bar');
     var pg = "progress-bar ";
     
     switch(index){
          case 1:
               pg += "one";
               break;
          case 2:
               pg += "two";
               break;
          case 3:
               pg += "three";
               break;
     }
     pgBar.setAttribute('class',pg);
}
function saveData(){
     mainToDoList.newSave();
}

// LIST DISPLAY FUNCTIONS ----------------------------------------------------------------------

function pullUpCurrentList(){
     var docListTitle = document.getElementById('current-list-title');
     var listItemWrap = document.getElementById("list-item-wrapper");
     docListTitle.innerHTML = mainToDoList.returnCurrentList();
     listItemWrap.innerHTML="";
     listItemWrap.appendChild(buildTableForListItems(mainToDoList.getCurrentListItems()));
}
function addListNav(){
     var listNav = document.getElementById('list-titles');
     listNav.innerHTML = "";
     var innerListNav = buildListNav(mainToDoList.returnAllListTitles());
     for(var x=0;x<innerListNav.length;x+=1){
          listNav.appendChild(innerListNav[x]);
     }
}
function clickedListItem(e){

     cancelUpdateListTitle();
     mainToDoList.setCurrentList(e);
     pullUpCurrentList();
     showOrHideNewListInput();;
     showOrHideListItemInput();
}


// EDIT LIST TITLE FUNCTIONS----------------------------------------------------------------------------------------------

function editCurrentListTitle(){
     showOrHideListItemInput();
     showOrHideNewListInput();;
     
     if(editingListTitle){
          
     } else{
          var listTitleWrap = document.getElementById('current-list-title');
          var curTitle = listTitleWrap.innerHTML;
          listTitleWrap.innerHTML = "";
          listTitleWrap.appendChild(updateListInput(curTitle.trim()));
     }

     editingListTitle = true;
}
function cancelUpdateListTitle(){
     
     if(document.getElementById('update-list-input')){
          var theTitle = document.getElementById('update-list-input').value;
          var listTitleWrap = document.getElementById('current-list-title');
          listTitleWrap.innerHTML = theTitle;
          editingListTitle = false;
     }
     
}
function deleteCurrentList(){
     console.log('delete');
     var theTitle = document.getElementById('update-list-input').value;
     var listTitleWrap = document.getElementById('current-list-title');
     listTitleWrap.innerHTML = "";
     mainToDoList.deleteCurrentList();
     pullUpCurrentList();
     addListNav();
     editingListTitle = false;
}
function updateListTitle(){
     console.log("update");
     var theTitle = document.getElementById('update-list-input').value;
     var listTitleWrap = document.getElementById('current-list-title');
     listTitleWrap.innerHTML = theTitle;
     mainToDoList.updateCurrentListTitle(theTitle);
     addListNav();
     editingListTitle = false;
}


// EDIT LIST ITEM FUNCTIONS-----------------------------------------------------------------------------------------------

function deleteListItem(index){
     if(confirm("Are You Sure You Want To Delete This Item?")){
          mainToDoList.deleteItemByIndex(index);
          pullUpCurrentList();
     } else{
          console.log('cancel delete');
     }
}
function clearCurrentList(){
     mainToDoList.clearCurrentList();
     pullUpCurrentList();
}
function markComplete(index){
     mainToDoList.markComplete(index);
     pullUpCurrentList();

}
function sortListItems(sortType){
     mainToDoList.sortItemsInList(sortType);
     pullUpCurrentList();
     var sortButtons = document.getElementById('sort-list').getElementsByTagName('li');
     for(var x=0;x<sortButtons.length;x+=1){
          sortButtons[x].setAttribute('class','');
     }
     sortButtons[sortType-1].setAttribute('class','active');
}
function clickedListItemTitle(ev){
     
     var allListTitles= document.getElementById('list-item-wrapper').getElementsByClassName('list-title');

     for(var x=0;x<allListTitles.length;x++){
          allListTitles[x].nextElementSibling.setAttribute('class','clearfix visible-xs-block');
          allListTitles[x].nextElementSibling.nextElementSibling.setAttribute('class','col-md-3 col-xs-6 priority-wrap hidden-xs');
          allListTitles[x].nextElementSibling.nextElementSibling.nextElementSibling.setAttribute('class','col-md-3 col-xs-6 date-wrap hidden-xs');
     }
     
     ev.target.hover;
     var tar = ev.target;
     
     tar.parentElement.nextElementSibling.setAttribute('class','clearfix visible-xs-block');
     var priorityWrap = tar.parentElement.nextElementSibling.nextElementSibling;
     var dateWrap = priorityWrap.nextElementSibling;
     priorityWrap.setAttribute('class','col-md-3 col-xs-6 priority-wrap');
     dateWrap.setAttribute('class','col-md-3 col-xs-6 date-wrap');
}


// NEW LIST FUNCTIONS-----------------------------------------------------------------------------------------------

function clickedAddNewList(){
     showOrHideNewListInput('show');
     showOrHideListItemInput();
     cancelUpdateListTitle();
}
function showOrHideNewListInput(display){
     if(display == "show"){
          document.getElementById("new-list-input-wrapper").setAttribute('class','col-md-8 col-md-offset-2');
     }else{
          document.getElementById("new-list-input-wrapper").setAttribute('class','col-md-8 col-md-offset-2 hidden');
     }
     
}
function addNewList(){
     listInput = document.getElementById('new-list-input');
     var newListName = listInput.value;

     mainToDoList.addList(newListName);
     
     addListNav();
     pullUpCurrentList();
     listInput.value = "";
     showOrHideNewListInput();
}

// NEW LIST ITEM FUNCTIONS-----------------------------------------------------------------------------------------------

function clickedAddNewListItem(){
     showOrHideListItemInput("show");
     showOrHideNewListInput();
     cancelUpdateListTitle();
}
function showOrHideListItemInput(display){
     
     var listItemInput = document.getElementById("new-list-item-wrapper");
     var curClass = listItemInput.getAttribute('class') == 'col-md-10 col-md-offset-1 hidden';
     
     if(display == "show" && curClass){
          listItemInput.setAttribute("class","col-md-10 col-md-offset-1");
     }else{
          listItemInput.setAttribute("class","col-md-10 col-md-offset-1 hidden");
     }
}
function addNewListItem(){
     var itemInput = document.getElementById('new-list-item-input');
     var priorityInput = document.getElementById('priority-input');
     var priorityVal;
     if(priorityInput.value == "Low"){
          priorityVal = 3;
     } else if(priorityInput.value == "Medium"){
          priorityVal = 2;
     } else if(priorityInput.value == "High"){
          priorityVal = 1;
     }
     mainToDoList.addItemToCurrentList(itemInput.value,priorityVal);
     pullUpCurrentList();
     showOrHideListItemInput();
     itemInput.value="";
     priorityInput.value = "Low";
}



