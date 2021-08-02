$( document ).ready(function(elem) {
    ButtonCreaterDynamic(9,3);
    const NoughtCross = ["O", "X"];
    var randomSelect=Math.floor(Math.random() * 2);
    var nextMark=NoughtCross[randomSelect];
    var elems = document.querySelectorAll('.btn-styled');

    for (var i=elems.length; i--;) {
        //elems[i].addEventListener('click', fn, false);
        elems[i].addEventListener('click',function (e){var singleplayerflag=true; ProcessClick(connectionCombos,this.id,false);} , false);
    }

    function fn() {
        this.innerHTML= nextMark;
        this.value=nextMark;
        this.disabled= true;
        var R=checkResult(this);
        if(R)
        {
            var ResultM1=nextMark;
            var ResultM2=' has won, hit F5 or refresh browser for new game';
            var ResultMessage=ResultM1.concat(ResultM2);
            alert(ResultMessage);
        }
        if ( nextMark == 'X' )
        {
            nextMark='O';
        }
        else
        {
            nextMark='X';
        }
    }

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

    function checkResult(inButton){
        if (inButton.id=='toggle0')
        {
            if(checkNeighbours('toggle1','toggle2') )
            {
                return true;
            }
            if(checkNeighbours('toggle3','toggle6') )
            {
                return true;
            }
            if(checkNeighbours('toggle4','toggle8') )
            {
                return true;
            }
        }
        if (inButton.id=='toggle1')
        {
            if(checkNeighbours('toggle0','toggle2') )
            {
                return true;
            }
            if(checkNeighbours('toggle4','toggle7') )
            {
                return true;
            }
        }
        if (inButton.id=='toggle2')
        {
            if(checkNeighbours('toggle0','toggle1') )
            {
                return true;
            }
            if(checkNeighbours('toggle5','toggle8') )
            {
                return true;
            }
            if(checkNeighbours('toggle4','toggle6') )
            {
                return true;
            }
        }
        if (inButton.id=='toggle3')
        {
            if(checkNeighbours('toggle0','toggle6') )
            {
                return true;
            }
            if(checkNeighbours('toggle4','toggle5') )
            {
                return true;
            }
        }
        if (inButton.id=='toggle4')
        {
            if(checkNeighbours('toggle0','toggle8') )
            {
                return true;
            }
            if(checkNeighbours('toggle2','toggle6') )
            {
                return true;
            }
            if(checkNeighbours('toggle1','toggle7') )
            {
                return true;
            }
            if(checkNeighbours('toggle3','toggle5') )
            {
                return true;
            }
        }
        if (inButton.id=='toggle5')
        {
            if(checkNeighbours('toggle3','toggle4') )
            {
                return true;
            }
            if(checkNeighbours('toggle2','toggle8') )
            {
                return true;
            }
        }
        if (inButton.id=='toggle6')
        {
            if(checkNeighbours('toggle7','toggle8') )
            {
                return true;
            }
            if(checkNeighbours('toggle0','toggle3') )
            {
                return true;
            }
            if(checkNeighbours('toggle4','toggle2') )
            {
                return true;
            }
        }
        if (inButton.id=='toggle7')
        {
            if(checkNeighbours('toggle6','toggle8') )
            {
                return true;
            }
            if(checkNeighbours('toggle1','toggle4') )
            {
                return true;
            }
        }
        if (inButton.id=='toggle8')
        {
            if(checkNeighbours('toggle7','toggle6') )
            {
                return true;
            }
            if(checkNeighbours('toggle0','toggle4') )
            {
                return true;
            }
            if(checkNeighbours('toggle5','toggle2') )
            {
                return true;
            }
        }
        return false;
    }
});