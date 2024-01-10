"use strict";

window.addEventListener("load",Init);
var data;
var select;
var dataListNames;
var houses=[];
var names =[];
var filters;
var currentCharacters = [];
var subitemsList;
var mainWrapper;
var byNameInput;
var royaltys;
var btnApply;
var btnReset;
var pResult;
var spanResult;
var charname
var count


function Init(){    
    select = document.getElementById("id-houseNames"); 
    dataListNames = document.getElementById("id-namesDataList");       
    filters = document.getElementsByClassName("filters");    
    mainWrapper = document.getElementById("main-Wrapper");
    byNameInput = document.getElementById("id-name");
    btnApply = document.getElementById("id-apply"); 
    btnReset = document.getElementById("id-reset"); 
    subitemsList = document.getElementsByClassName("subitems");  
    royaltys = document.getElementsByClassName("form-check-input");
    pResult = document.getElementById("id-filter-count");
    spanResult = document.getElementById("id-result");
    count = 0;
    
    btnApply.addEventListener("click",ApplyAllFilters);
    btnReset.addEventListener("click",ResetGui);   
    
    FetchData();
    AddToggleOpenListItems();
    AddStopPropagationOnSubitems();    
}

function ApplyAllFilters(){
    currentCharacters = [];
    
    let selectValue = select.value;
    let byNameValue = byNameInput.value;
    let ByRoyaltyStatus = CheckRoyaltyStatus();

    if(selectValue != "" && typeof selectValue != "undefined"){
        GetCharakter("houseName",selectValue); 
        ClearParent(mainWrapper);         
    }else{
        currentCharacters = data["characters"];
    }

    if(byNameValue != "" && typeof byNameValue != "undefined"){        
        GetCharakter("characterName",byNameValue,true);
        ClearParent(mainWrapper);         
    }

    if(typeof ByRoyaltyStatus == "boolean"){
        GetCharakter("royal",ByRoyaltyStatus,true);
        ClearParent(mainWrapper);                
    }
    DisplayCurrentCharacters();
    DisplayCountOfResult();
}

function ResetGui(){
    select.selectedIndex = 0;
    byNameInput.value = "";

    //set radiobuttons unchecked
    [].forEach.call(royaltys,royalty=>{royalty.checked = false;});
    ClearParent(mainWrapper);
    spanResult.innerHTML = "";
    pResult.innerHTML= "";
}

function FetchData(){
    fetch("https://raw.githubusercontent.com/jeffreylancaster/game-of-thrones/master/data/characters.json").then(resp =>{
        if(resp.status != 200){
            console.log("error");
        }else{
            return resp.json();
        }
    }).then(output => {
        data = output;   
        count = output["characters"].length;        
        FillSelect();
        FillDataListNames();             
    })
}


function FillSelect(){
    GetHouses();
    let option = new Option();
    select[select.length] = option;
    houses.forEach(house =>{
        let option = new Option(house,house);
        select[select.length] = option;
    })
}

function FillDataListNames(){ //dataList voor byName
    GetCharacterNames();
    names.forEach(name =>{
        let option = document.createElement("option");
        option.value = name;  
        dataListNames.appendChild(option);      
    })
}

function AddToggleOpenListItems(){
    [].forEach.call(filters,filter =>{
        filter.addEventListener("click",ToggleFilter);
    })
}

function AddStopPropagationOnSubitems(){
    [].forEach.call(subitemsList,subitemList =>{
        subitemList.addEventListener("click",(e)=>{
            e.stopPropagation();
        })
    })
}

function DisplayCountOfResult(){
    let count = 0;
    let pResult = document.getElementById("id-filter-count");
    let spanResult = document.getElementById("id-result");
    
    pResult.innerHTML =currentCharacters.length;
    spanResult.innerHTML = "resultaten: ";


}







