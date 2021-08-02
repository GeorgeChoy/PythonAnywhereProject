function CheckClickAgainstMapping(inPrefix,inMapping,inButtonNumber,inMark)
{
    var myMappingArray=inMapping[inButtonNumber];
    var result=false;
    //var slides = document.getElementsByClassName(inButton);
    for (var i = 0; i < myMappingArray.length; i++) {
       var innerMappingArray=myMappingArray[i];
       for (var a = 0; a < innerMappingArray.length; a++)
       {
            result=checkNeighboursArray(innerMappingArray,inPrefix,inMark);
            if (!result)
            {break;}
            else
            {return result;}
       }
    }
    return false;
}

function NCCheckResult(inButton,inClass){
    var all_elements = document.getElementsByClassName("inClass");
    for (var i = 0; i < all_elements.length; i++)
    {
        myfunc(all_elements.item(i));
    }
}

var connectionCombos=[
[[1,2],[3,6],[4,8]],
[[0,2],[4,7]],
[[1,0],[4,6],[5,8]],
[[0,6],[4,5]],
[[1,7],[2,6],[5,3],[0,8]],
[[2,8],[4,3]],
[[3,0],[4,2],[7,8]],
[[6,8],[4,1]],
[[2,5],[4,0],[7,6]]
];

const NoughtCross = ["O", "X"];
var randomSelect=Math.floor(Math.random() * 2);
var nextMark=NoughtCross[randomSelect];
var ButtonClickedArray=[];

function getNextAvButtonFromArray(inArray)
{
    var buttonStatus=true;
    while(buttonStatus)
    {
        var randomButton=Math.floor(Math.random() * ButtonClickedArray.length);
        buttonStatus=ButtonClickedArray[randomButton];
    }
    var buttonidtxt = prefixOnly.concat(randomButton);
    return buttonidtxt
}

function ProcessClick(inCombo,inButton,inSinglePlayerFlag) {
    var myElement=document.getElementById(inButton);

    var matches = inButton.match(/(\d+)/);
    var ClickedButtonNumber=matches[0];
    ButtonClickedArray[ClickedButtonNumber]=true;

    prefixOnly = inButton.replace(/[0-9]/g, '');
    myElement.innerHTML= nextMark;
    myElement.value=nextMark;
    myElement.disabled= true;
    var result=CheckClickAgainstMapping(prefixOnly,inCombo,ClickedButtonNumber,nextMark);
    if (result)
    {
        var ResultMessage=nextMark;
        ResultMessage=ResultMessage.concat(' wins. Reload to start again');
        alert(ResultMessage);
        return
    }
    if ( nextMark == 'X' )
    {
        nextMark='O';
    }
    else
    {
        nextMark='X';
    }
    if(inSinglePlayerFlag)
    {
        var buttonidtxt=getNextAvButtonFromArray(ButtonClickedArray);
        ProcessClick(connectionCombos,buttonidtxt,false);
    }
}