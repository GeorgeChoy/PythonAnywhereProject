$( document ).ready(function() {
var x = document.getElementsByClassName("likes");
var i;
for (i = 0; i < x.length; i++) {
  var dataprodid=x[i].attr("data-prodid");
  var c_id=x[i].id;
  document.getElementById(c_id).id = c_id+dataprodid;
}


});