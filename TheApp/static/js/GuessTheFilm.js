$(document).ready(function(){
    var TargetWord = document.getElementById("myfilm").innerText;
    var TargetWordArray = TargetWord.split('');
    var EndWord=$('#demo').val();
    var ResultArray = EndWord.split('');
    var AttemptsRemaining =parseInt(document.getElementById("NoOfGoes").value);

    $('#letters').click(function(e){
        e.preventDefault();
        var found="N";
        var str=document.getElementById("letter").value;
        if (!str.match(/[A-Z|a-z]|[0-9]/i))
        {return;}
        $.each(TargetWordArray, function(index, value) {
            if(value==document.getElementById("letter").value)
            {
                ResultArray[index]=document.getElementById("letter").value;
                EndWord=ResultArray.join("");
                $('#demo').val(EndWord);
                found="Y";
            }

        });
        if(found !="Y")
        {
            AttemptsRemaining =AttemptsRemaining-1;
            document.getElementById("NoOfGoes").value=AttemptsRemaining;
        }
        if(AttemptsRemaining<=0)
        {
            alert("the answer is "+TargetWord);
            document.getElementById("letters").disabled = true;
        }
        if (TargetWord==EndWord)
        {
            alert("done");
            document.getElementById("letters").disabled = true;

        }
    });

    $('#demo').val(EndWord);
});