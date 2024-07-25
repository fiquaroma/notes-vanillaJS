function deleteNote() {
    // do something before deleting DOM
    clickedElement.remove();
    clickedElement = null;
}

function textAreaAdjust(element) {
    element.style.height = "auto";
    element.style.height = (17+element.scrollHeight)+"px";
}