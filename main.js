const NUMBER_OF_ICONS = 6;
 
for (i = 0; i < NUMBER_OF_ICONS; ++i) { 
  dragElement(document.getElementById("mydiv" + i));
}  

dragElement(document.getElementById("folder_popup"));

//if its drag or click
let drag = false;
document.addEventListener(
    'mousedown', () => drag = false);
  
document.addEventListener(
    'mousemove', () => drag = true);
  
document.addEventListener(
    'mouseup', () => console.log(
        drag ? 'drag' : 'click'));


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
    if(drag){
        return;
    }
    var popup = document.getElementById(e.id+"_popup");
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


//know if its mobile or not
// /* Storing user's device details in a variable*/
// let details = navigator.userAgent;
  
// /* Creating a regular expression 
// containing some mobile devices keywords 
// to search it in details string*/
// let regexp = /android|iphone|kindle|ipad/i;
  
// /* Using test() method to search regexp in details
// it returns boolean value*/
// let isMobileDevice = regexp.test(details);
  
// if (isMobileDevice) {
//     console.log("You are using a Mobile Device");
// } else {
//     console.log("You are using Desktop");
// }