const NUMBER_OF_ICONS = 6;
const popups = ["folder_popup", "pc_popup", "bin_popup", "about_me_popup", "project_popup"]
 
for (i = 0; i < NUMBER_OF_ICONS; ++i) { 
  dragElement(document.getElementById("mydiv" + i));
}

for(let i = 0; i < popups.length; i++){
  dragElement(document.getElementById(popups[i]));
}


dragElement(document.getElementById("folder_popup"));
dragElement(document.getElementById("pc_popup"));
dragElement(document.getElementById("bin_popup"));

//if its drag or click
let drag = false;
document.addEventListener(
    'mousedown', () => drag = false);
  
document.addEventListener(
    'mousemove', () => drag = true);
  
// document.addEventListener(
//     'mouseup', () => console.log(
//         drag ? 'drag' : 'click'));


// Make the DIV element draggable:
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    //get the width and height of the container (main box)
    var h = document.getElementById("container").offsetHeight;
    var w = document.getElementById("container").offsetWidth;

    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position in percentage:
    // console.log(h);
    // console.log(((elmnt.offsetTop - pos2)))

    var x = ((elmnt.offsetLeft - pos1)/w)*100;
    var y = ((elmnt.offsetTop - pos2)/h)*100;

    if(elmnt.className === "icon_container"){
      if(x > 77 || x < 22){
        document.onmouseup = null;
        document.onmousemove = null;
        x = (x > 77)? 76: 24;
      }
      if(y > 65.5 || y < 17){
        document.onmouseup = null;
        document.onmousemove = null;
        y = (y > 65)? 63: 19;
      }
     }else if(elmnt.className === "popup"){   //if the dragged object is an element
      //for brining the clicked element to the front
      //not the best but Ill leave it like this
      elmnt.style.zIndex = "2";
      for(let i = 0; i < popups.length; i++){
        if(popups[i]===elmnt.id){
          continue;
        }
        document.getElementById(popups[i]).style.zIndex = "auto";
      }


      var popup_height = (elmnt.offsetHeight/h) * 100;
      var popup_width = (elmnt.offsetWidth/w) * 100;

      var max_y = y + popup_height;
      var max_x = x + popup_width;

      if(max_x > 77 || x < 21){
        document.onmouseup = null;
        document.onmousemove = null;
        x = (max_x > 77)? 77-popup_width: 22;
      }
      if(max_y > 68|| y < 12){
        document.onmouseup = null;
        document.onmousemove = null;
        y = (max_y > 68)? 68-popup_height: 14;
      }
    }
    
    elmnt.style.top = y + "%";
    elmnt.style.left = x + "%";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//popup part
function popup(e){
  //set other popup index to auto so they go behind the one that is clicked
  for(let i = 0; i < popups.length; i++){
    if(popups[i]===e.id){
      continue;
    }
    document.getElementById(popups[i]).style.zIndex = "auto";
  }
  //if its project
  if(e.id==="project"){
    openProject(e);
  }
  if(drag){
    return;
  }

  var popup = document.getElementById(e.id+"_popup");
  popup.style.zIndex = "2";
  popup.style.visibility="visible";
  popup.style.opacity="1";
}

function onClose(s){
    var popup = document.getElementById(s);
    popup.style.opacity="0";
    setTimeout(function(){
        popup.style.visibility="hidden";
    },500);
}

async function openProject(e){
  //make it fade in and fade out (maybe later :D..)
  // if(document.getElementById("project_popup").style.visibility==="visible"){
  //   onClose("project_popup");
  // }

  setName(e);
  setLanguages(e);
  setDescription(e);
  setLink(e);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}