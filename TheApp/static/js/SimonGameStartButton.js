$( document ).ready(function(elem) {
    var score=0;
    var myArray=[];
    var SeqArray=[];
    var ResultArray=[];
    var RightWrongArray=[];
    var gameCounter=0;
    $( "#start_game" ).click(function() {
        score=0;
        myArray=[];
        SeqArray=[];
        ResultArray=[];
        RightWrongArray=[];
        gameCounter=0;
        document.getElementById("RightWrong").innerHTML = "";
        document.getElementById("result").innerHTML = "";
        document.getElementById("answer").innerHTML = "";

        for (i = 0; i < 5; i++) {
            myArray.push(i);
        }
        let shuffled = myArray
          .map((a) => ({sort: Math.random(), value: a}))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value)
        for (i = 0; i < myArray.length; i++) {
            m=Math.floor(Math.random() * 5);
            SeqArray.push(m);

        }
        console.log(SeqArray);
        for (i = 0; i < SeqArray.length; i++) {
            var buttonidtxt = 'toggle'.concat(SeqArray[i]);
            d=document.getElementById(buttonidtxt);
            $(d).delay((1000 * i)+1000).effect( "pulsate" );
        }
        EnableButton();
    });
    $("#toggle0").click(function(){
        $( "#toggle0" ).effect( "pulsate" );
        var OutArray=[];
        OutArray=updateClickResult("toggle0",ResultArray,SeqArray,gameCounter,RightWrongArray);
        ResultArray=OutArray[0];
        SeqArray=OutArray[1];
        gameCounter=OutArray[2];
        RightWrongArray=OutArray[3];
    });
    $("#toggle1").click(function(){
        $( "#toggle1" ).effect( "pulsate" );
        var OutArray=[];
        OutArray=updateClickResult("toggle1",ResultArray,SeqArray,gameCounter,RightWrongArray);
        ResultArray=OutArray[0];
        SeqArray=OutArray[1];
        gameCounter=OutArray[2];
        RightWrongArray=OutArray[3];
    });
    $("#toggle2").click(function(){
        $( "#toggle2" ).effect( "pulsate" );
        var OutArray=[];
        OutArray=updateClickResult("toggle2",ResultArray,SeqArray,gameCounter,RightWrongArray);
        ResultArray=OutArray[0];
        SeqArray=OutArray[1];
        gameCounter=OutArray[2];
        RightWrongArray=OutArray[3];
    });
    $("#toggle3").click(function(){
        $( "#toggle3" ).effect( "pulsate" );

        var OutArray=[];
        OutArray=updateClickResult("toggle3",ResultArray,SeqArray,gameCounter,RightWrongArray);
        ResultArray=OutArray[0];
        SeqArray=OutArray[1];
        gameCounter=OutArray[2];
        RightWrongArray=OutArray[3];
    });
    $("#toggle4").click(function(){
        $( "#toggle4" ).effect( "pulsate" );

        var OutArray=[];
        OutArray=updateClickResult("toggle4",ResultArray,SeqArray,gameCounter,RightWrongArray);
        ResultArray=OutArray[0];
        SeqArray=OutArray[1];
        gameCounter=OutArray[2];
        RightWrongArray=OutArray[3];
    });

});