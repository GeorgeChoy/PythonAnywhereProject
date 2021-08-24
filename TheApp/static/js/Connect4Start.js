$( document ).ready(function(elem) {
//ButtonCreaterDynamic(7,7);
ElementCreaterDynamic(42,7,'button','input_styled',document.getElementById("PieceContainer"),'T_input');
//ElementCreaterDynamic(7,7,'button','btn-styled',document.getElementById("container"),'toggle');
ElementCreaterDynamic(7,7,'button','btn-styled',document.getElementById("PieceContainer"),'toggle','click');

var elems = document.querySelectorAll('.input_styled');
var buttonsList = document.querySelectorAll('.btn-styled');

var ArrayOfColumns=[
[35,28,21,14,7,0],
[36,29,22,15,8,1],
[37,30,23,16,9,2],
[38,31,24,17,10,3],
[39,32,25,18,11,4],
[40,33,26,19,12,5],
[41,34,27,20,13,6]
];

var CurrentColor='red';
for (var i=elems.length; i--;) {
    document.getElementById(elems[i].id).disabled = true;
}

var TwoPlayerHowManyClicksLeftPerCol=[
buttonsList.length,
buttonsList.length,
buttonsList.length,
buttonsList.length,
buttonsList.length,
buttonsList.length,
buttonsList.length
];

for (var i=buttonsList.length; i--;) {
    document.getElementById(buttonsList[i].id).setAttribute('size', '1');
    buttonsList[i].addEventListener('click',function (e){
                                                    //
                                                    var txt = this.id;
                                                    var numb = txt.match(/\d/g);
                                                    numb = numb.join("");
                                                    TwoPlayerHowManyClicksLeftPerCol[numb]--;
                                                    if(TwoPlayerHowManyClicksLeftPerCol[numb]<1)
                                                    {return;}
                                                    var T_ResArray=updateColumnsArray(this.id,ArrayOfColumns,'T_input',CurrentColor);
                                                    ArrayOfColumns=T_ResArray[1];
                                                    var CurrentButtonId=T_ResArray[0];
                                                    C4ProcessClick(c4Combos,CurrentButtonId,CurrentColor);
                                                    if(singleplayerflag)
                                                    {
                                                        var randomButton=Math.floor(Math.random() * buttonsList.length);
                                                        //console.log('randomButton'.concat(randomButton));
                                                        //console.log('TwoPlayerHowManyClicksLeftPerCol[randomButton]'.concat(TwoPlayerHowManyClicksLeftPerCol[randomButton]));
                                                        while(TwoPlayerHowManyClicksLeftPerCol[randomButton]<=1)
                                                        {
                                                            randomButton=Math.floor(Math.random() * buttonsList.length);
                                                        }
                                                        //console.log("randomButton_2_".concat(randomButton));
                                                        if(CurrentColor=='red')
                                                        {CurrentColor='blue'}
                                                        else
                                                        {CurrentColor='red'}
                                                        T_ResArray=updateColumnsArray('T_input'.concat(randomButton),ArrayOfColumns,'T_input',CurrentColor);
                                                        ArrayOfColumns=T_ResArray[1];
                                                        CurrentButtonId=T_ResArray[0];
                                                        C4ProcessClick(c4Combos,CurrentButtonId,CurrentColor);
                                                        if(CurrentColor=='red')
                                                        {CurrentColor='blue'}
                                                        else
                                                        {CurrentColor='red'}
                                                    }
                                                    else
                                                    {
                                                        if(CurrentColor=='red')
                                                        {CurrentColor='blue'}
                                                        else
                                                        {CurrentColor='red'}
                                                    }
                                                    } ,
                                                    false);
    //document.getElementById(buttonsList[i].id).style.width = '44px';
}

});