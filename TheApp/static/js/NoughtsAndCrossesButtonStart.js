//$( document ).ready(function(elem) {
    var elems = document.querySelectorAll('.btn-styled');

    for (var i=elems.length; i--;) {
        elems[i].addEventListener('click', fn, false);
    }

    function fn() {
        console.log(this.id);
        this.innerHTML= nextMark;
        if ( this.name == 'link1' ) {

            console.log('This is link1');

        } else if ( this.name == 'link2' ) {

            console.log('This is link2');

        }
    }
//});