const htmlToTxt = ["Python", "JS", "Batch"];
const portfolio = ["Html", "CSS", "JS"];
const githubLink = new Map([
    ["WEB-SCRAPER", "https://github.com/Estrella0812/webScraperREMAX"],
    ["HTML-to-TXT", "https://github.com/Estrella0812/HTMLToTXT"],
    ["Emailing Bot", "https://github.com/Estrella0812/webScraperREMAX/tree/main/emailBot"],
    ["Portfolio", "https://github.com/Estrella0812/Portfolio"]
]);

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
    fetch("src/text/" + e.className + ".txt")
    .then((res) => res.text())
    .then((text) => {
        document.getElementById("description_project_content").innerHTML = text;
    })
    .catch((e) => console.error(e));
}

function setLink(e){
    document.getElementById("project_gitHub_link").href = githubLink.get(e.className+"");
}