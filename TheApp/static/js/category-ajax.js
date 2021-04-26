$(document).ready(function(){
              $(function() {
                $("#category").autocomplete({
                  source: "/TheApp/autocompleteCategory/",
                  select: function (event, ui) { //item selected
                    AutoCompleteSelectHandler(event, ui)
                  },
                  minLength: 2,
                });
              });

              function AutoCompleteSelectHandler(event, ui)
              {
                var selectedObj = ui.item;
              }
});