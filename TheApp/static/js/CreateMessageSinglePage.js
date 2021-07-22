$( document ).ready(function() {
    $('#CreateMessageSinglePage').click(function(){
        var input_text;
        var email;
        input_text = document.getElementById("input_text").value;
        email = document.getElementById("email").value;
        name = document.getElementById("name").value;
        if (email=='')
        {
            alert('email cannot be blank');
            return false;
        }
        if (name=='')
        {
            alert('name cannot be blank');
            return false;
        }
        if (input_text=='')
        {
            alert('message cannot be blank');
            return false;
        }
        $.get('/TheApp/CreateMessageSinglePageJson/', {input_text: input_text,email: email,name:name}, function(data){
                   //document.getElementById("output").innerHTML = data;
                   showFirst3Messages();
                   document.getElementById("input_text").value="";
        });
    });
});