function DisableButton() {
$('.btn-styled').each(function(i, obj) {
    console.log(obj.id);
    document.getElementById(obj.id).disabled = true;
});

};