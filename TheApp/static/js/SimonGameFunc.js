function updateClickResult(inId,inResultArray,inSeqArray,ingameCounter,inRightWrongArray) {
    myOutArray=[];
    inResultArray.push(document.getElementById(inId).value);
    document.getElementById("result").innerHTML = inResultArray;
    if (inSeqArray[ingameCounter++]==document.getElementById(inId).value)
    {inRightWrongArray.push("correct");}
    else
    {inRightWrongArray.push("incorrect");}
    document.getElementById("RightWrong").innerHTML = inRightWrongArray;

    myOutArray.push(inResultArray);
    myOutArray.push(inSeqArray);
    myOutArray.push(ingameCounter);
    myOutArray.push(inRightWrongArray);
    if (ingameCounter>=5)
    {
        DisableButton();
        inResultArray.unshift("Sequence: ");
        document.getElementById("answer").innerHTML = inResultArray;
        if (! inRightWrongArray.includes("incorrect"))
            {alert("congratulations");}
        else
            {alert("better luck next time");}
    }
    return myOutArray;
}