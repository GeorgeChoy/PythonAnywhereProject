$(document).ready(function(){
    var TargetWord = document.getElementById("myfilm").innerText;
    var TargetWordArray = TargetWord.split('');
    var ResultArray=[];
    var EndWord="";

    $.each(TargetWordArray, function(index, value) {
        ResultArray.push(isLetter(value));
    });

    EndWord=ResultArray.join("");
    $('#demo').val(EndWord);
});