$( document ).ready(function() {
    $('.AddToCart').click(function(){
        var prodid;
        prodid = $(this).attr("data-prodid");
        $('#editcartbutton').prop('disabled', false);
        $.get('/TheApp/AddToCart/', {product_id: prodid}, function(data){
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
});