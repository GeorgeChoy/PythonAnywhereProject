$( document ).ready(function() {
        var urlprotocol=String(window.location.protocol);
        var urlheader=String(window.location.host);
        var app='TheApp';
        var AddToOrder = document.getElementById("OrderAdd");
        var orderHref=urlprotocol+'//'+urlheader+'/'+app+"/"+ "CreateOrEditOrder/";
        AddToOrder.href= orderHref ;
});