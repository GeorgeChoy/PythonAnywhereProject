$(document).ready(function(){
    var template = [];
    var answer=SetupCombination();
    var answer_array=answer.split("");
    var result_array=[];
    var leftover_array=[];

    $("#demo").click(function(){
        var result_array=[];
        var items = [];
        var AttemptsRemaining =parseInt(document.getElementById("NoOfGoes").value)-1;
        document.getElementById("NoOfGoes").value=AttemptsRemaining;
        items.push(find_RB_value('input[name="first"]'));
        items.push(find_RB_value('input[name="second"]'));
        items.push(find_RB_value('input[name="third"]'));
        items.push(find_RB_value('input[name="fourth"]'));

        template.push('<p>');
        for (var i=0; i < items.length; i++) {
                template.push(items[i]);
                if(items[i]==answer_array[i])
                {
                    result_array[i]='x';
                }
                else
                {
                    result_array[i]='o';
                }
            }
        for (var i=0; i < result_array.length; i++) {
                if(result_array[i]=='o')
                {
                    var letter_to_find=items[i];
                    for (var a=0; a < answer_array.length; a++) {
                        if(a!=i){
                            if(letter_to_find==answer_array[a] && result_array[a] != 'x')
                            {result_array[i]='y';}
                        }
                    }
                }
            }
        template.push(' ');
        result_array=shuffle(result_array);
        template.push(result_array);
        template.push('</p>');
        if(AttemptsRemaining<=0)
        {
            template.push('<p> The answer is ');
            template.push(answer);
            template.push('</p>');
            document.getElementById("demo").disabled = true;
        }
        if(result_array.includes('o'))
        {console.log('')}
        else if(result_array.includes('y'))
        {console.log('')}
        else
        {
            alert('done');
            location.reload()
        }
        $(".message").html(template);
    });
});