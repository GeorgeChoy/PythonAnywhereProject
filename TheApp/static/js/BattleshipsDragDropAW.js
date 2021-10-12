$(document).ready(function(){

//$( "#drag1" ).draggable({
//  containment: "parent"
//});
//alert(DJANGO_STATIC_URL);
ElementCreaterDynamic(156,12,'button','btn-styled',document.getElementById("div1"),'toggle','. .');
ElementCreaterDynamic(156,12,'button','myGuessClass',document.getElementById("div2"),'myGuess','. .');

DisableEnableUserButtons('myGuessClass',true);
var buttonsList = document.querySelectorAll('.myGuessClass');

var myImage = new Image(85, 69);
var mystring=DJANGO_STATIC_URL.concat('images/battleship.gif')
myImage.src = mystring;
myImage.draggable="true"
myImage.id="drag2"
var cont=document.getElementById("div1");
cont.appendChild(myImage);
$( "#drag2" ).draggable({
  containment: "parent"
});

//var el1 = document.getElementById('toggle2');
//    el2 = document.getElementById('drag1');
var CPU_Grid=[];
var MyGrid=[];
var FirstUserCell=0;
var EndPointsArray=[];
$( "#button1" ).click(function() {
MyGrid=StartGame('btn-styled',myImage.id);
$('#drag2').draggable( "destroy" );
CPU_Grid=CPU_grid_setup(156,13,12,4,4);
CPU_Grid=CPU_place_own_ship_on_grid(CPU_Grid,156,4,4);
//enable the user grid
processClickReturnArray=[];
DisableEnableUserButtons('myGuessClass',false);
var InUserShipFound=false;
var GameOverFlag=false;
var InGameOverFlag=false;
var EndPointsArray=setUpRowEndPoints(13,12);
for (var i=buttonsList.length; i--;) {
    buttonsList[i].addEventListener('click',function (e){
        processClickReturnArray=processClick(this.id,CPU_Grid,InGameOverFlag,4,4);
        CPU_Grid=processClickReturnArray[0];
        GameOverFlag=processClickReturnArray[1];
        if(GameOverFlag==true)
        {
            DisableEnableUserButtons('myGuessClass',true);
        }
        var processCPUselectionReturnArray=[];
        processCPUselectionReturnArray=processCPUselection(MyGrid,156,'toggle',InUserShipFound,4,4,13,12,FirstUserCell,EndPointsArray,GameOverFlag);
        MyGrid=processCPUselectionReturnArray[0];
        InUserShipFound=processCPUselectionReturnArray[1];
        FirstUserCell=processCPUselectionReturnArray[2];
        GameOverFlag=processCPUselectionReturnArray[3];
        //Game over?
        if(GameOverFlag==true)
        {
            DisableEnableUserButtons('myGuessClass',true);
        }
    },
    false);

}
});
})
