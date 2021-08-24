function C4ProcessClick(inCombo,inButton,inColor) {
    var myElement=document.getElementById(inButton);

    var matches = inButton.match(/(\d+)/);
    var ClickedButtonNumber=matches[0];
    //ButtonClickedArray[ClickedButtonNumber]=true;

    prefixOnly = inButton.replace(/[0-9]/g, '');
    //myElement.innerHTML= nextMark;
    myElement.value=inColor;
    //myElement.disabled= true;
    var result=CheckClickAgainstMapping(prefixOnly,inCombo,ClickedButtonNumber,inColor);
    if (result)
    {
        var ResultMessage=inColor;
        ResultMessage=ResultMessage.concat(' wins. Reload to start again');
        alert(ResultMessage);
        return
    }

    /*if(inSinglePlayerFlag)
    {
        var buttonidtxt=getNextAvButtonFromArray(ButtonClickedArray);
        ProcessClick(connectionCombos,buttonidtxt,false);
    }*/
}

function updateColumnsArray(inElementId,InArrayOfColumns,inPrefix,currentColor)
{
//get number suffix from the element id
    var txt = inElementId;
    var numb = txt.match(/\d/g);
    numb = numb.join("");
    //console.log(numb);
    var ReturnArray=[]
    if(InArrayOfColumns[numb].length>0)
    {
        var ElementUsedSuffix=InArrayOfColumns[numb].shift();
        //console.log(ElementUsedSuffix);
        var ElementID=inPrefix.concat(ElementUsedSuffix);
        var Element=document.getElementById(ElementID);
        Element.style.background=currentColor;
        ReturnArray.push(ElementID);
    }
    else
    {
        ReturnArray.push(false);
    }
    ReturnArray.push(InArrayOfColumns);
    return ReturnArray;
}