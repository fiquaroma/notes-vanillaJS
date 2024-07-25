let menuContainerElement = null;

document.addEventListener('DOMContentLoaded', function (event) {
  menuContainerElement = document.getElementById('main-menu');
  initiateMenuColor();
})

function initiateMenuColor() {
    configColorMenu.forEach(value => {
        const menuElement = document.createElement('div');
        menuElement.className = 'change-color'
        menuElement.style.background = value;
        menuElement.addEventListener('click', function() {
          changeColor(value);
        }) 
        menuContainerElement.appendChild(menuElement);
    });
}

function changeColor(color) {
    if (clickedElement) {
        clickedElement.style.backgroundColor = color;
    }
}

function createNote() {
    const dragAreaElement = document.getElementById('drag-area');
    const notesElement = document.createElement('div');
    const notesHeaderElement = document.createElement('div');
    const notesInputElement = document.createElement('textarea');
    const notesHeaderCloseElement = document.createElement('div');


    
    notesHeaderCloseElement.innerHTML = 'X';
    notesHeaderCloseElement.className = 'note-header';
    notesHeaderCloseElement.onclick = deleteNote;
    
    notesHeaderElement.id = 'draggable-header-' + notesList.length;
    notesHeaderElement.appendChild(notesHeaderCloseElement);
    
    notesInputElement.addEventListener('keyup', function() {
        textAreaAdjust(this);
    }) 
    

    notesElement.id = 'draggable-container-' + notesList.length;
    notesElement.className = 'notes';
    notesElement.style.backgroundColor = configColorMenu[0];
    highestZIndex += 1;
    notesElement.style.zIndex = highestZIndex;
    notesElement.appendChild(notesHeaderElement);
    notesElement.appendChild(notesInputElement);
    
    dragAreaElement.appendChild(notesElement);
    clickedElement = notesElement;

    notesList.push(notesElement.id);
}