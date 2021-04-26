$( document ).ready(function() {
    var urlprotocol=String(window.location.protocol);
    var urlheader=String(window.location.host);
    var app='TheApp';
    var cartTotal=0
    $('.AddToCart').click(function(){
        var prodid;
        prodid = $(this).attr("data-prodid");
        $('#editcartbutton').prop('disabled', false);

        $.ajax({
        url: '/TheApp/AddToCart/',
        data:{product_id: prodid},
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
                    var cartHref=urlprotocol+'//'+urlheader+'/'+app+"/"+ "UpdateCartLine2/" +val.cartHeaderPK;
                    editcart.href= cartHref ;
                }
            });
        },
      });
    });
});