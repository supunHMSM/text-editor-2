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