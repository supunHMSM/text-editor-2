//Bold
function bold(){
    document.execCommand('bold',true,null)
}

//Underline
function Underline(){
    document.execCommand('Underline',true,null)
 }


 //Italic
 function italic(){
    document.execCommand('italic',true,null)
}


//color picker

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('colorPickerButton').addEventListener('click',colorPickeropen);
});

function colorPickeropen() {
    const colorPicker = document.getElementById('fontColorPicker');
    colorPicker.click();
}

function changeFontColor() {
    const colorPicker = document.getElementById('fontColorPicker');
    const selectedColor = colorPicker.value;
    document.execCommand('foreColor', true, selectedColor);
}

//Text-Align
function left(){
    document.querySelectorAll('.left').forEach(function(element){
element.addEventListener('click',function(){
    document.getElementById('cEditor').style.textAlign='left'
})

    })
}

function center(){
    document.querySelectorAll('.center').forEach(function(element){
element.addEventListener('click',function(){
    document.getElementById('cEditor').style.textAlign='center'
})

    })
}

function right(){
    document.querySelectorAll('.right').forEach(function(element){
element.addEventListener('click',function(){
    document.getElementById('cEditor').style.textAlign='right'
})

    })
}

function justify(){
    document.querySelectorAll('.justify').forEach(function(element){
element.addEventListener('click',function(){
    document.getElementById('cEditor').style.textAlign='justify'
})

    })
}

//Undo Redo
var editor = document.getElementById('cEditor');
var contentHistory = [];
var alignmentHistory = [];
var selectionHistory = [];
var currentStep = 0;

function saveState() {
    contentHistory = contentHistory.slice(0, currentStep + 1);
    alignmentHistory = alignmentHistory.slice(0, currentStep + 1);
    selectionHistory = selectionHistory.slice(0, currentStep + 1);

    contentHistory.push(editor.innerHTML);
    alignmentHistory.push(getTextAlignment());
    selectionHistory.push(saveSelection());
    currentStep = contentHistory.length - 1;
}

function undo() {
    if (currentStep > 0) {
        currentStep--;
        restoreState();
    }
}

function redo() {
    if (currentStep < contentHistory.length - 1) {
        currentStep++;
        restoreState();
    }
}

function restoreState() {
    editor.innerHTML = contentHistory[currentStep];
    setTextAlignment(alignmentHistory[currentStep]);
    restoreSelection(selectionHistory[currentStep]);
}

function getTextAlignment() {
    return getComputedStyle(editor).textAlign;
}

function setTextAlignment(alignment) {
    editor.style.textAlign = alignment;
}

function saveSelection() {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        return {
            startContainer: range.startContainer,
            startOffset: range.startOffset,
            endContainer: range.endContainer,
            endOffset: range.endOffset
        };
    }
    return null;
}


function restoreSelection(selection) {
    if (selection) {
        var range = document.createRange();
        range.setStart(selection.startContainer, selection.startOffset);
        range.setEnd(selection.endContainer, selection.endOffset);


        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }
}

document.querySelectorAll('#cEditor').forEach(function (element) {
    element.addEventListener('input', function () {
        saveState();
    });
});


saveState();
