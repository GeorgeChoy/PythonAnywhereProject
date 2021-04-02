$( document ).ready(function() {
    $('#enigma').click(function(){
        var config;
        var input_text;
        config = document.getElementById("config").value;
        input_text = document.getElementById("input_text").value;
        $.get('/TheApp/EnigmaJson/', {config: config,input_text: input_text}, function(data){
                   document.getElementById("output").innerHTML = data;
        });
    });
});