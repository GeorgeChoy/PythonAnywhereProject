function checkNeighbours(inButton1,inButton2)
{
    if (document.getElementById(inButton1).disabled == true &&	document.getElementById(inButton1).value ==nextMark)
    {
        if (document.getElementById(inButton2).disabled == true &&	document.getElementById(inButton2).value ==nextMark)
        {
            return true;
        }
    }
    return false;
}

function checkNeighboursArray(inArray,inPrefix,inMark)
{
   var result=false;
   for (var a = 0; a < inArray.length; a++)
   {
        var buttonidtxt = inPrefix.concat(inArray[a]);
        if (!(document.getElementById(buttonidtxt).disabled == true &&	document.getElementById(buttonidtxt).value ==inMark))
        {
            result=false;
            break;
        }
        else
        {
            result=true;
        }
   }

    return result;
}