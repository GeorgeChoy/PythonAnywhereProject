$( document ).ready(function() {
    $('.likes').click(function(){
        var prodid;
        prodid = $(this).attr("data-prodid");
        $.get('/TheApp/like_product/', {product_id: prodid}, function(data){
                    var spanid='#like_count';
                    spanid=spanid.concat(prodid);
                   $(spanid).html(data);
        });
    });
});