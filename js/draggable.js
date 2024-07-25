let originalPositionX = 0, originalPositionY = 0;
let clickedElement = null;
let highestZIndex = 1;
document.addEventListener("mousedown", onClick);

function getDraggableElement(element) {
    if (element.id.includes('draggable-header')) {
        return element.parentNode;
    } else {
        return null;
    }
}

function increaseZIndex (originalClick) {
    const parentDraggable = originalClick.id.includes('draggable-container') ? originalClick : originalClick.parentNode.id.includes('draggable-container') ? originalClick.parentNode : null;
    if (parentDraggable && clickedElement) {
        const isSameElement = parentDraggable.id === clickedElement.id;
        if (!isSameElement) {
            highestZIndex += 1;
            clickedElement = parentDraggable;
            clickedElement.style.zIndex = highestZIndex;
        }
    }
}

function onClick(e) {
    console.log("ELEMENT IS", e);
    const draggableElement = getDraggableElement(e.target);
    increaseZIndex(e.target);

    if (draggableElement) {
        clickedElement = draggableElement;
        // get the mouse cursor position at startup:
        originalPositionX = e.clientX;
        originalPositionY = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
}

function elementDrag(e) {
    // e.preventDefault();
    // calculate the new cursor position:
    currentPositionX = originalPositionX - e.clientX;
    currentPositionY = originalPositionY - e.clientY;

    // update original position with current position
    originalPositionX = e.clientX;
    originalPositionY = e.clientY;

    // set the element's new position:
    clickedElement.style.top = (clickedElement.offsetTop - currentPositionY) + "px";
    clickedElement.style.left = (clickedElement.offsetLeft - currentPositionX) + "px";
}

function closeDragElement() {
    const canvas = document.getElementById('drag-area');
    const canvasHeight = canvas.offsetHeight;
    const canvasWidth = canvas.offsetWidth;

    if (clickedElement.offsetTop <= 0) {
        clickedElement.style.top = 0 + "px";
    } else if ((clickedElement.offsetTop + clickedElement.offsetHeight) > canvasHeight) {
        clickedElement.style.top = (canvasHeight - clickedElement.offsetHeight) + "px";
    }

    if (clickedElement.offsetLeft <= 0) {
        clickedElement.style.left = 0 + "px";
    } else if ((clickedElement.offsetLeft + clickedElement.offsetWidth) > canvasWidth) {
        clickedElement.style.left = (canvasWidth - clickedElement.offsetWidth) + "px";
    }

    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
}