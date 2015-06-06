// BUILD LIST OF TASKS FROM ARRAY --------------------------------------------------------------------------------------------

function buildTableForListItems(lisItems){
     var mainWrapper;
     var completed = new Array();
     
     if(lisItems.length>0){    
          mainWrapper = document.createElement('div');

               for(var x=0; x<lisItems.length;x+=1){
                    var listItem = document.createElement("div");
                    
                         var colOne = document.createElement('div');
                         colOne.setAttribute('class','col-md-1 col-xs-2');
                    
                              var colOneHead = document.createElement('h4');
                    
                                   var colOneInput = document.createElement('input');
                                   colOneInput.setAttribute('type','checkbox');
                                   colOneInput.setAttribute('onclick','markComplete('+lisItems[x][5]+')');
                    
                                   if(lisItems[x][4]){
                                        listItem.setAttribute('class','row list-item text-center complete');
                                        colOneInput.checked = true;
                                   } else{
                                        listItem.setAttribute('class','row list-item text-center');
                                   }

                              colOneHead.appendChild(colOneInput);
                    
                         colOne.appendChild(colOneHead);

                         var colTwo = document.createElement('div');
                         colTwo.setAttribute('class','col-md-5 col-xs-10 list-title');
                    
                              var colTwoHead = document.createElement('h4');
                              colTwoHead.setAttribute('onclick','clickedListItemTitle(event)');
                              colTwoHead.setAttribute('onmouseenter','this.click()');
                              colTwoHead.textContent = lisItems[x][1]+" ";
                              
                                   var deleteBtn = document.createElement('span');
                                   deleteBtn.setAttribute('class','label label-danger');
                                   deleteBtn.setAttribute('onclick','deleteListItem('+lisItems[x][5]+')');
                                   deleteBtn.textContent = "Delete";
                    
                              colTwoHead.appendChild(deleteBtn);

                         colTwo.appendChild(colTwoHead);

                         var colThr = document.createElement('div');
                         colThr.setAttribute('class','col-md-3 col-xs-6 priority-wrap hidden-xs');
                         
                              var colThrHead = document.createElement('h4');
                    
                                   var colThrLabel = document.createElement('label');
                                   if(lisItems[x][2] == 1){
                                        colThrLabel.setAttribute('class','label label-danger');
                                        colThrLabel.textContent = "High Priority";
                                   } else  if(lisItems[x][2] == 2){
                                        colThrLabel.setAttribute('class','label label-warning');
                                        colThrLabel.textContent = "Medium Priority";
                                   } else  if(lisItems[x][2] == 3){
                                        colThrLabel.setAttribute('class','label label-info');
                                        colThrLabel.textContent = "Low Priority";
                                   }
                    
                              colThrHead.appendChild(colThrLabel);
                    
                         colThr.appendChild(colThrHead);

                         var colFou = document.createElement('div');
                         colFou.setAttribute('class','col-md-3 col-xs-6 date-wrap hidden-xs');
                    
                              var colFouHead = document.createElement('h4');
                              colFouHead.textContent = "Added: ";

                                   var smallHead = document.createElement('small');
                                   smallHead.textContent = lisItems[x][3];

                              colFouHead.appendChild(smallHead);
                         colFou.appendChild(colFouHead);

                    var mobClear = document.createElement('div');
                    mobClear.setAttribute('class','clearfix visible-xs-block hidden-xs');
                    
                    listItem.appendChild(colOne);
                    listItem.appendChild(colTwo);
                    listItem.appendChild(mobClear);
                    listItem.appendChild(colThr);
                    listItem.appendChild(colFou);
                    
                    if(lisItems[x][4]){
                         completed.push(listItem);
                    } else{
                         mainWrapper.appendChild(listItem); 
                    }
               
               }
               for(var xo=0;xo<completed.length;xo+=1){
                    mainWrapper.appendChild(completed[xo]);
               }
     } else{
          mainWrapper=document.createElement('div');
          mainWrapper.setAttribute('class','alert alert-danger');
          mainWrapper.textContent="No Items To Display";
     }
     return mainWrapper;
}

// BUILD LIST NAV FROM ARRAY ----------------------------------------------------------------------------------------------------

function buildListNav(theLists){
     var allListEl = new Array;
     
     for(var x=0; x<theLists.length;x+=1){
          var tempList = document.createElement('li');
               var tempBut = document.createElement('a');
               tempBut.setAttribute('role','button');
               tempBut.setAttribute('onclick','clickedListItem('+x+')');
               tempBut.textContent = theLists[x];
          tempList.appendChild(tempBut);
          allListEl.push(tempList);
     }
     
     var divider = document.createElement('li');
     divider.setAttribute('class','divider');
     allListEl.push(divider);
     
     var addNew = document.createElement('li');
          var addnewButton = document.createElement('a');
          addnewButton.setAttribute('role','button');
          addnewButton.setAttribute('onclick','clickedAddNewList()');
          addnewButton.textContent = "Add New List";
     addNew.appendChild(addnewButton);
     allListEl.push(addNew);
     
     return allListEl;
}

// BUILD INPUT GROUP TO EDIT LIST TITLE AUTOFILLED WITH PROVIDED VALUE  --------------------------------------

function updateListInput(curVal){
     var inputGroupWrap = document.createElement('div');
     inputGroupWrap.setAttribute('class','input-group col-md-6 col-md-offset-3');
     
          var theInput = document.createElement('input');
          theInput.setAttribute('type','text');
          theInput.setAttribute('class','form-control');
          theInput.setAttribute('id','update-list-input');
          theInput.value = curVal;
     
          var inputBtnGroup = document.createElement('div');
          inputBtnGroup.setAttribute('class','input-group-btn');
     
               var btnOne = document.createElement('button');
               btnOne.setAttribute('type','button');
               btnOne.setAttribute('class','btn btn-success');
               btnOne.setAttribute('onclick','updateListTitle()');
     
                    var innerBtnOne = document.createElement('span');
                    innerBtnOne.setAttribute('class','glyphicon glyphicon-ok');
               
               btnOne.appendChild(innerBtnOne);
     
               var btnTwo = document.createElement('button');
               btnTwo.setAttribute('type','button');
               btnTwo.setAttribute('class','btn btn-warning');
               btnTwo.setAttribute('onclick','cancelUpdateListTitle()');
     
                    var innerBtnTwo = document.createElement('span');
                    innerBtnTwo.setAttribute('class','glyphicon glyphicon-remove');
     
               btnTwo.appendChild(innerBtnTwo);
     
               var btnThr = document.createElement('button');
               btnThr.setAttribute('type','button');
               btnThr.setAttribute('class','btn btn-danger');
               btnThr.setAttribute('onclick','deleteCurrentList()');
     
                    var innerBtnThr = document.createElement('span');
                    innerBtnThr.setAttribute('class','glyphicon glyphicon-trash');
     
               btnThr.appendChild(innerBtnThr);
     
          inputBtnGroup.appendChild(btnOne);
          inputBtnGroup.appendChild(btnTwo);
          inputBtnGroup.appendChild(btnThr);
     
     inputGroupWrap.appendChild(theInput);
     inputGroupWrap.appendChild(inputBtnGroup);
     
     return inputGroupWrap;
}