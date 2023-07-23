const htmlToTxt = ["Python", "JS", "Batch"];
const portfolio = ["Html", "CSS", "JS"];

const popupLanguage = new Map([
    ["WEB-SCRAPER", ["Python"]],
    ["HTML-to-TXT", htmlToTxt],
    ["Emailing Bot", ["Python"]],
    ["Portfolio", portfolio]
]);

function setName(e){
    document.getElementById(e.id+"_title").innerHTML = e.className + "";
}

function setLanguages(e){
    document.getElementById("project_languages_container").outerHTML = "";

    const container = document.createElement("div");
    container.id = "project_languages_container";
    document.getElementById("project_languages").appendChild(container);

    for(let i = 0; i < popupLanguage.get(e.className+"").length; i++){
        const element = document.createElement("p");
        element.id = "project_language_list";
        element.innerHTML = popupLanguage.get(e.className+"")[i]+"";
        container.appendChild(element);
    }
    
}

function setDescription(e){

}

function setLink(e){

}