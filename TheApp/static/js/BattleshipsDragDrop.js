function hello() {
  alert("hello there");
}
doElsCollide = function(el1, el2) {
    el1.offsetBottom = el1.offsetTop + el1.offsetHeight;
    el1.offsetRight = el1.offsetLeft + el1.offsetWidth;
    el2.offsetBottom = el2.offsetTop + el2.offsetHeight;
    el2.offsetRight = el2.offsetLeft + el2.offsetWidth;

    return !((el1.offsetBottom < el2.offsetTop) ||
             (el1.offsetTop > el2.offsetBottom) ||
             (el1.offsetRight < el2.offsetLeft) ||
             (el1.offsetLeft > el2.offsetRight))
};

function StartGame(inclass,inImage)
{
inclass='.'.concat(inclass);
//console.log(inclass);
var elems = document.querySelectorAll(inclass);
var myImage=document.getElementById(inImage);
var ImageCoversArray=[];
//var el1 = document.getElementById('toggle2');
for (var i=elems.length; i--;) {
    var currentButton=document.getElementById(elems[i].id);
    var result=doElsCollide(myImage,currentButton);
    var myHash={};

    if(result)
    {
        ImageCoversArray[i]={'imageCovered':true,'already_clicked':false};
        document.getElementById(currentButton.id).style.background='#ffff00';
        console.log(currentButton.id);
    }
    else
    {ImageCoversArray[i]={'imageCovered':false,'already_clicked':false};}
}
console.log(ImageCoversArray);
myImage.style.visibility = 'hidden';
return ImageCoversArray;
}

function CPU_grid_setup(inTotalCells,InNumberRows,InNumberColumns,ImageWidth,ImageHeight)
{
    var CPU_array=[];
    for (var i=0; i<inTotalCells;i++)
    {
        //CPU_array[i]=[false];
        CPU_array[i]={'placeable':false,'ShipInCell':false};
    }
    var firstCellInRow;
    for (var i=0; i<InNumberRows-(ImageHeight-1);i++) {
        firstCellInRow=i*12;

        for (var a=0; a<InNumberColumns-(ImageWidth/2);a++) {
            //console.log(InNumberColumns-(ImageWidth%2));
            //CPU_array[a+firstCellInRow]=[true];
            CPU_array[a+firstCellInRow]['placeable']=true;
        }
        //CPU_array[i]=[true];
    }
    for (var i=0; i<inTotalCells;i++)
    {
        //CPU_array[i]=[false];
        var mytext;
        if(CPU_array[i]['placeable']==true)
        {
            mytext='true ';
            mytext=mytext.concat(i);
        }
        else
        {
            mytext='false ';
            mytext=mytext.concat(i);
        }
    }
    //console.log(CPU_array);
    return(CPU_array);
}

function Player_grid_setup(inTotalCells,InNumberRows,InNumberColumns,ImageWidth,ImageHeight,inPlayerGrid)
{
    inPlayerGrid=CPU_grid_setup(inTotalCells,InNumberRows,InNumberColumns,ImageWidth,ImageHeight);
    for (var i=0; i<inTotalCells;i++)
    {
        //CPU_array[i]=[false];
        myHash=CPU_array[i];

        myHash["already_clicked"] = false;
        CPU_array[i]=myHash;
    }
    console(myHash);
    return inPlayerGrid;
}

function CPU_place_own_ship_on_grid(inCPUarray,inTotalCells,ImageWidth,ImageHeight)
{
    var startPoint=inCPUarray.length-1;

    while (inCPUarray[startPoint]['placeable']==false)
    {
        startPoint=Math.floor(Math.random() * inTotalCells);
    }
    console.log(startPoint);
    var firstCellInRow;
    for (var i=0; i<ImageHeight;i++) {
        //firstCellInRow=i*12;
        var CurrentPoint=startPoint+(i*12);
        //console.log(CurrentPoint);
        for (var a=0; a<ImageWidth;a++) {
            //console.log(InNumberColumns-(ImageWidth%2));
            //console.log(inCPUarray[a+CurrentPoint]);
            //console.log([a+CurrentPoint]);
            inCPUarray[a+CurrentPoint]['ShipInCell']=true;
            //inCPUarray[a+CurrentPoint][0].push(ShipInCell);
            //console.log(a+CurrentPoint);
        }        //CPU_array[i]=[true];
    }
    for (var i=0; i<inTotalCells;i++)
    {
    }
    return inCPUarray;
}

function DisableEnableUserButtons(inClass,inStatus)
{
    var elems = document.querySelectorAll('.'.concat(inClass));
    for (var i=elems.length; i--;)
    {
        document.getElementById(elems[i].id).disabled=inStatus;
    }
}
//No of CPU blocks covered
var CpuBlocksCovered=0;

function processClick(InId,inCPU_grid,InGameOverFlag,InImageWidth,InImageHeight,InHitSound)
{
    if (CpuBlocksCovered>=(InImageWidth*InImageHeight))
    {
        alert('User wins, press refresh to restart');
        InGameOverFlag=true;
    }
    document.getElementById(InId).disabled=true;
    var txt = InId;
    var numb = txt.match(/\d/g);
    numb = numb.join("");
    //alert(inCPU_grid[numb][0]);
    if( inCPU_grid[numb]['ShipInCell'] == true)
    {
        document.getElementById(InId).style.background='#FF0000';
        InHitSound.play();
        CpuBlocksCovered++;
    }
    /*if(typeof inCPU_grid[numb][1][0] === 'undefined') {
        alert("target missed");
    }
    else {
        document.getElementById(InId).style.background='#FF0000';
    }*/
    return [inCPU_grid,InGameOverFlag];
}
//Find the vertical cells
function getVertical(InRemainingResultArray,InNumberColumns,InImageHeight,InmaxCell)
{
    var myOutArray=[];
    for(i=0;i<InRemainingResultArray.length;i++)
    {

        for(a=0;a<InImageHeight;a++)
        {
            if(InRemainingResultArray[i]+(a*InNumberColumns)<InmaxCell)
            {
                myOutArray.push(InRemainingResultArray[i]+(a*InNumberColumns));
            }

            if(InRemainingResultArray[i]-(a*InNumberColumns)>0)
            {
                myOutArray.push(InRemainingResultArray[i]-(a*InNumberColumns));
            }
            console.log('getVertical'.concat(a));
        }
    }
    myOutArray = myOutArray.concat(InRemainingResultArray);
    myOutArray=[...new Set(myOutArray)];
    console.log('getVertical');
    console.log(myOutArray);
    return myOutArray;
}

function SetClickedOnNonPossibleCells(InUserArray,InCPUSelection,InImageWidth,InImageHeight,InEndPointsArray,InNumberColumns)
{
    //find the row
    for(i=0;i<InEndPointsArray.length;i++)
    {
        if(InCPUSelection>=InEndPointsArray[i][0] && InCPUSelection<=InEndPointsArray[i][1])
        {
            //store the left end cell so we don't go past it
            var leftEnd=InEndPointsArray[i][0];
            var rightEnd=InEndPointsArray[i][1];
            console.log("leftEnd ".concat(leftEnd));
            console.log("rightEnd ".concat(rightEnd));
            break;
        }
    }
    var leftDone=false;
    var leftCount=InCPUSelection;
    RemainingResultArray=[];
    RemainingResultArray.push(InCPUSelection);
    var innerCount=0;
    while(leftDone==false)
    {
        leftCount--;
        innerCount++;
        if(leftCount<leftEnd||innerCount>=InImageWidth)
        {
            leftDone=true;
        }
        else
        {
            RemainingResultArray.push(leftCount);
        }
    }
    console.log('SetClickedOnNonPossibleCells leftDone');
    console.log(RemainingResultArray);
    var rightDone=false;
    var rightCount=0
    rightCount=InCPUSelection;
    innerCount=0;
    while(rightDone==false)
    {
        rightCount++;
        innerCount++;
        console.log("rightEnd ".concat(rightEnd));
        console.log("rightCount ".concat(rightCount));
        if(innerCount>=InImageWidth||rightCount>rightEnd)
        {
            //||innerCount>=InImageWidth
            //rightCount=>rightEnd

            console.log("innerCount ".concat(innerCount));
            console.log("InImageWidth ".concat(InImageWidth));
            rightDone=true;
        }
        else
        {
            RemainingResultArray.push(rightCount);
        }
    }
    console.log('SetClickedOnNonPossibleCells rightDone');
    //Fill in the vertical values
    var NewRemainingResultArray=getVertical(RemainingResultArray,InNumberColumns,InImageHeight,InUserArray.length-1);
    console.log(NewRemainingResultArray);

    //Set the clicked status of those NOT in RemainingResultArray to true
    for(i=0;i<InUserArray.length;i++)
    {
        var CellExcluded=true;
        if(InUserArray[i]['already_clicked']==true)
        {
            continue;
        }
        for(a=0;a<NewRemainingResultArray.length;a++)
        {
            if(NewRemainingResultArray[a]==i)
            {
                //console.log('InUserArray '.concat(i));
                //console.log('InUserArray '.concat(i));
                CellExcluded=false;
                NewRemainingResultArray.splice(a,1);
                break;
            }
        }
        if (CellExcluded==true)
        {InUserArray[i]['already_clicked']=true;}
    }
    console.log('NewRemainingResultArray loop');
    console.log(InUserArray);

    /*for(i=0;i<InUserArray.length;i++)
    {
        if(InUserArray[i]['already_clicked']==true)
        {
            continue;
        }
        var excluded=false;
        /*for(a=0;a<RemainingResultArray;a++)
        {
            if(RemainingResultArray[a]=i )
            {
                excluded=true;
                break;
            }
            if(InUserArray[RemainingResultArray[a]]['already_clicked']==true)
            {
                excluded=true;
                break;
            }
        }
        if(excluded==false)
        {
            InUserArray[i]['already_clicked']=true;
        }
    }*/

    return InUserArray;
}

//No of user blocks covered
var UserBlocksCovered=0;

function processCPUselection(InUserArray,InNumberOfCells,InIDPrefix,InUserShipFound,
ImageWidth,ImageHeight,InNumberRows,InNumberColumns,InFirstUserCellFound,InEndPointsArray,InGameOverFlag,InHitSound)
{
    //Function to process the CPU selection of a cell to find the user's ship
    //
    //InUserArray=select a previously unselected cell from this array, update this CPUSelected already_clicked hash key and return the array
    //CPU selects this cell from a random number generator
    //
    //InNumberOfCells=Maximum number seed of the random number generator
    //
    //InIDPrefix=The Cell's id prefix, needed to set the cell or button's color to selected.
    //
    //UserShipFound=boolean to denote whether CPU has previously located the user's ships, this will be returned
    //console.log(InUserArray);
    //

    /*
    if(InUserShipFound)
    {
        console.log("ship found".concat(InUserShipFound));
        console.log(InUserArray);
        console.log('InFirstUserCellFound '.concat(InFirstUserCellFound));
        InUserArray=FindCellNextDoor(InFirstUserCellFound,ImageWidth,ImageHeight,InNumberRows,InNumberColumns,
                                        InNumberOfCells,InEndPointsArray,InUserArray,InIDPrefix);
        return [InUserArray,InUserShipFound,FirstUserCellFound];
    }*/
    //CPU or User block fully covered?
    var GameOver=false;
    if((UserBlocksCovered>=(ImageWidth*ImageHeight)) )
    {
        alert('CPU wins, press refresh to restart');
        InGameOverFlag=true;
        return [InUserArray,InUserShipFound,FirstUserCellFound,InGameOverFlag];
    }

    var CPUSelection=Math.floor(Math.random() * InNumberOfCells);
    var FirstUserCellFound=InFirstUserCellFound;
    while(InUserArray[CPUSelection]['already_clicked']==true)
    {
        console.log(InUserArray[CPUSelection]);
        console.log(CPUSelection);
        CPUSelection=Math.floor(Math.random() * InNumberOfCells);
    }
    var CPU_selected_hash=InUserArray[CPUSelection];
    CPU_selected_hash['already_clicked']=true;
    MyGridID=InIDPrefix.concat(CPUSelection);
    if (CPU_selected_hash['imageCovered']==true)
    {
        document.getElementById(MyGridID).style.background='#FF0000';
        document.getElementById(MyGridID).disabled=true;
        console.log('InUserShipFound '.concat(InUserShipFound));
        InHitSound.play();
        UserBlocksCovered++;
        if(InUserShipFound==false)
        {
            var EndPointsArray=setUpRowEndPoints(InNumberRows,InNumberColumns);
            FirstUserCellFound=CPUSelection;
            //Set the non possible cells to be clicked.
            InUserArray=SetClickedOnNonPossibleCells(InUserArray,CPUSelection,ImageWidth,ImageHeight,EndPointsArray,InNumberColumns);
        }
        InUserShipFound=true;
    }
    else
    {
        document.getElementById(MyGridID).style.background='#0000FF';
        document.getElementById(MyGridID).disabled=true;
    }
    console.log('InUserArray processCPU selection');
    console.log(InUserArray);
    console.log('FirstUserCellFound '.concat(FirstUserCellFound))
    return [InUserArray,InUserShipFound,FirstUserCellFound,InGameOverFlag];
}

function setUpRowEndPoints(InNumberRows,InNumberColumns)
{
    var EndPointsArray=[];
    for (var i=0;i<InNumberRows; i++)
    {
       EndPointsArray[i]=[i*InNumberColumns,(i*InNumberColumns)+(InNumberColumns-1)];
    }
    console.log(EndPointsArray);
    return EndPointsArray;
}

var LeftDone=false;
var RightDone=false;
var DownDone=false;
var UpDone=false;
var LeftTryCount=0;
var RightTryCount=0;
var DownTryCount=0;
var UpTryCount=0;
var inTryCount=0;

function FindCellNextDoor(InFirstUserCellFound,InImageWidth,InImageHeight,InNumberRows,InNumberColumns,
InNumberOfCells,InEndPointsArray,InUserArray,InIDPrefix)
{
    var ReturnArray=[];
    var CellUpdated=false;
    console.log('FindCellNextDoor InUserArray');
    console.log(InUserArray);
    ReturnArray=goLeft(InFirstUserCellFound,InImageWidth,InEndPointsArray,InUserArray,InIDPrefix);
    console.log('FindCellNextDoor InFirstUserCellFound '.concat(InFirstUserCellFound));
    InUserArray=ReturnArray[0];
    CellUpdated=ReturnArray[1];
    LeftTryCount=ReturnArray[2];
    inTryCount=LeftTryCount;
    return InUserArray;
    if (CellUpdated==false)
    {
        ReturnArray=goRight(InFirstUserCellFound,InImageWidth,InEndPointsArray,InUserArray,InIDPrefix);
    }
    else
    {
        return InUserArray;
    }
    if (CellUpdated==false)
    {
        ReturnArray=goUp(InFirstUserCellFound,InImageWidth,InEndPointsArray,InUserArray,InIDPrefix);
    }
    else
    {
        return InUserArray;
    }
    if (CellUpdated==false)
    {
        ReturnArray=goDown(InFirstUserCellFound,InImageWidth,InEndPointsArray,InUserArray,InIDPrefix);
    }
    return InUserArray;
}

function goLeft(InFirstUserCellFound,InImageWidth,InEndPointsArray,InUserArray,InIDPrefix)
{
    console.log("LeftDone InFirstUserCellFound ".concat(InFirstUserCellFound));
    //Already done or not?
    if(LeftDone)
    {
        console.log("LeftDone ".concat(LeftDone));
        return [InUserArray,NextCellFound];
    }
    //find the row
    for(i=0;i<InEndPointsArray.length;i++)
    {
        if(InFirstUserCellFound>=InEndPointsArray[i][0] && InFirstUserCellFound<=InEndPointsArray[i][1])
        {
            //store the left end cell so we don't go past it
            leftEnd=InEndPointsArray[i][0];
            console.log("leftEnd ".concat(leftEnd));
            break;
        }
    }
    var complete=false;
    //get the next left value in the array
    var myNextCell=InFirstUserCellFound;
    while(complete==false)
    {
        console.log("myNextCell ".concat(myNextCell));
        myNextCell--;
        console.log("myNextCell ".concat(myNextCell));
        //Is it already clicked?
        console.log("InUserArray ");
        console.log(InUserArray);
        if(InUserArray[myNextCell]['already_clicked']==true)
        {
            console.log('already_clicked');
            continue;
        }
        //If past the start of the row
        if(myNextCell<leftEnd)
        {
            console.log('myNextCell<leftEnd');
            complete=true;
            LeftDone=true;
        }
        //Have you passed the width of the ship?
        if(inTryCount>=InImageWidth)
        {
            console.log('inTryCount>=InImageWidth');
            complete=true;
            LeftDone=true;
        }
        else
        {
            //otherwise increment the number of tries
            inTryCount++;
            console.log("inTryCount ".concat(inTryCount));
            //does the user ship cover the cell?
            if (InUserArray[myNextCell]['imageCovered']==true)
            {
                console.log("imageCovered ".concat(''));
                var MyGridID=InIDPrefix.concat(myNextCell);
                document.getElementById(MyGridID).style.background='#FF0000';
                document.getElementById(MyGridID).disabled=true;
            }
            complete=true;
            NextCellFound=true;
        }
        //
    }
    return [InUserArray,NextCellFound,inTryCount];
}

function goRight(InFirstUserCellFound,InImageWidth,InEndPointsArray,InUserArray,InIDPrefix)
{

}
function goUp(InFirstUserCellFound,InImageWidth,InEndPointsArray,InUserArray,InIDPrefix)
{

}
function goDown(InFirstUserCellFound,InImageWidth,InEndPointsArray,InUserArray,InIDPrefix)
{

}

