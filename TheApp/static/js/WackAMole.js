var container=document.getElementById("container");
ButtonCreater();
$(".btn-styled").prop('disabled', true);
//putButtonsIntoArray("btn-styled");

document.getElementById('toggle0').onclick = doSomething;
document.getElementById('toggle1').onclick = doSomething;
document.getElementById('toggle2').onclick = doSomething;
document.getElementById('toggle3').onclick = doSomething;
document.getElementById('toggle4').onclick = doSomething;
function doSomething() {
    var el = this; // the element that fired the event
    el.disabled=true;
    resultArray[counter]="Hit";
}
var inclass="btn-styled";
var d = document.getElementsByClassName(inclass);
var numItems=$('.btn-styled').length;

var counter=0;
var resultArray=[];
var myVar2 = setInterval(enablebutton, 5000);
function enablebutton() {
     $("#start_game").hide();
    d=Math.floor(Math.random() * (numItems - 0) + 0);
    var buttonidtxt = 'toggle'.concat(d);
    document.getElementById(buttonidtxt).disabled=false;
   setTimeout(function(){
        document.getElementById(buttonidtxt).disabled=true;
   }, 1000);
   //document.getElementById(buttonidtxt).setAttribute("disabled","disabled");
   //$(buttonidtxt).attr('disabled','disabled');
   if (! resultArray[counter])
    {
        resultArray[counter]="Miss";
        }
    counter=counter+1;
   console.log(counter);
   console.log(buttonidtxt);
    if (counter>4)
    {
        myVar2 = clearInterval(myVar2);
        document.getElementById("result").innerHTML = resultArray;
    }
}

