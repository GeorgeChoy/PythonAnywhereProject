function showFirst3Messages() {
$.getJSON( "/TheApp/message_list_read_only/", function( data ) {
    var items = [];
    $(".mytr").remove();
    $.each(data, function(index, value){
      //my_orders.append("<td> "+data[index].name+  "</td>");
        $("#formset").find('tbody')
            .append($('<tr class="mytr">')
                .append($('<td>')
                    .append($('<span>')
                        .text(data[index].name)
                    )
                )
                .append($('<td>')
                    .append($('<span>')
                        .text(data[index].date)
                    )
                )
                .append($('<td>')
                    .append($('<span>')
                        .text(data[index].text)
                    )
                )
        );
    });



});
}