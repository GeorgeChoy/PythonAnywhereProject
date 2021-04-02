$( document ).ready(function() {

        $.get('/TheApp/GetCartTotal/', {}, function(data){
                    var cartTotal = parseInt(data);
                    const button=document.getElementById("editcart")
                    if (cartTotal>0)
                    {
                        button.disabled = false;
                    }
                   $('#cartTotal').html(data);
        });

        $.ajax({
        url: '/TheApp/GetCartTotal/',
        dataType: 'json',
        type : 'GET',

        success: function( data )
        {
            var options =[];
            var app='TheApp';
            var editcart = document.getElementById("editcart");
            var editcartbutton= document.getElementById("editcartbutton");
            $.each(data, function(key, val){
                $('#cartTotal').html(val.cartTotal);
                if (parseInt(val.cartTotal)>0 )
                {
                    editcartbutton.disabled = false;
                    var cartHref="http://georgechoy.pythonanywhere.com/"+app+"/"+ "UpdateCartLine2/" +val.cartHeaderPK;
                    editcart.href= cartHref ;
                }

            });
        },

      });
});