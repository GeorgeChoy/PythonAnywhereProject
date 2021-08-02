$( document ).ready(function(elem) {
ButtonCreaterDynamic(9,3);
var elems = document.querySelectorAll('.btn-styled');

//decide if CPU goes first
var CPUFirst=Math.floor(Math.random() * 2);
if(CPUFirst==1)
{
    var CPUFirstButton=elems[0].id;
    ProcessClick(connectionCombos,CPUFirstButton,false);
}
for (var i=elems.length; i--;) {
    elems[i].addEventListener('click',function (e){var singleplayerflag=true; ProcessClick(connectionCombos,this.id,singleplayerflag);} , false);
}//function(){fn(connectionCombos)}
});