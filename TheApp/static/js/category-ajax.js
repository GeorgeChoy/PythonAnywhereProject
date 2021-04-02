$(document).ready(function(){
$(function() {
  $("#categories").autocomplete({
    source: "/TheApp/category_autocomplete/",
    minLength: 2,
  });
});
});