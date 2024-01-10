function CheckRoyaltyStatus(){
    let status;   
    let isRoyal = royaltys[0];
    let isNotRoyal= royaltys[1];    

        if(isRoyal.checked){
            status = true;
        }else if(isNotRoyal.checked){
            status = false;
        }
        return status;   
}

function GetCharacterNames(){
    data["characters"].forEach(character=>{
        names.push(character.characterName);
    });
}

function ClearParent(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function DisplayCurrentCharacters(){
    currentCharacters.forEach(character => {                   
        CreateInterfacePerCharacter(character);
    });
}

function CreateInterfacePerCharacter(character){
    let div;
    let pName;
    let spanOutputName;
    let figure;
    let link;
    let image;

    let article = document.createElement("article");
    let background = document.createElement("div");
    
    if(typeof character.houseName != "undefined"){
        article.id = character.characterName;
        background.className = "background";
        background.style.background = `url('pictures/${character.houseName}.png') no-repeat bottom`;
        article.appendChild(background); 
    }       

    if(!character.characterImageThumb){
        figure = document.createElement("figure");
        figure.class = "PictureCharacter";

        image = document.createElement("img");
        image.src = "pictures/Thumb_replacment.png";            
        image.title = `No picture found`;
        image.className = "noThumb";

       
        figure.appendChild(image);
        article.appendChild(figure);
    }

    for(let key in character){

        if(key == "characterName" || key == "actorName" || key == "siblings" || key == "parents"){
            div = document.createElement("div");
            div.className = "wrapper";
    
            pName = document.createElement("p");
            pName.className = key;
            pName.innerHTML = `<b>${key}<b> : `;
            
    
            spanOutputName = document.createElement("span");
            spanOutputName.innerHTML = character[key];
    
            pName.appendChild(spanOutputName);    
            div.appendChild(pName);            
    
            }
            
        if(key == "characterImageFull"){
            
            figure = document.createElement("figure");
            figure.class = "PictureCharacter";

            link = document.createElement("a");
            link.href = character.characterImageFull;
            link.target = "_blank";
            
            image = document.createElement("img");
            image.src = character.characterImageThumb;            
            image.title = `Picture${character.characterName}`;
            link.appendChild(image);
            figure.appendChild(link);
            article.appendChild(figure);
            
        }
        article.appendChild(div);       
        
    }
    mainWrapper.appendChild(article);    
}

function ToggleFilter(){        
    let subList = this.querySelector("ul");
    let arrow = this.querySelector("i");

    if(subList != null){       
            subList.classList.toggle("displayOff");
            if(arrow.className == "bi bi-caret-down-fill"){
                arrow.className = "bi bi-caret-up-fill";
            }else{
                arrow.className = "bi bi-caret-down-fill";
            }               
    };    
}

function GetHouses(){
    data["characters"].forEach(charakter=>{
        //zorgt ervoor dat er geen dubbels worden gemaakt
        if(!houses.includes(charakter.houseName)){
            //checken of het wel degelijk een houseName heeft
            if(charakter.houseName){
                //check dat de hoouseName een array is en loop er door
                if(Array.isArray(charakter.houseName)){
                    charakter.houseName.forEach(y=>{
                        if(!houses.includes(y)){
                            houses.push(y);
                        }                        
                    })
                }else{
                    houses.push(charakter.houseName);
                }            
            }
        }    
        
    })
}

function GetCharakter(typofSearch,itemToSearch,IsOnGoingSearch = false){     
    let tempData;
    let regex = new RegExp(itemToSearch,"gi");    
    
    //nakijken of er al een search gedaan is en met dit resultaat verder werken
    if(IsOnGoingSearch){
        tempData = currentCharacters;
        currentCharacters = [];
    }else{
        tempData = data["characters"];
    }

    tempData.forEach(character=>{
            if(character[typofSearch]){
                //checken voor array
                if(Array.isArray(character[typofSearch])){
                    character[typofSearch].forEach(item=>{
                        if(item.match(regex)){
                            currentCharacters.push(character);
                        }                        
                    })

                }else if(typeof itemToSearch == "boolean"){//check voor bool zodat je regex niet gebruikt want die kan er niet mee om
                   
                   if(character[typofSearch] == itemToSearch){
                        currentCharacters.push(character);
                    }
                }
                else if (character[typofSearch].match(regex)){
                    currentCharacters.push(character);
                    
                }
                //Dit is voor royaltys, bestaat royaltys niet en is het item dat we zoeken een bool en false .....
            }else if(typeof itemToSearch == "boolean"){
                if(!character[typofSearch] && itemToSearch == false){
                    currentCharacters.push(character);
                }}    
        })
}