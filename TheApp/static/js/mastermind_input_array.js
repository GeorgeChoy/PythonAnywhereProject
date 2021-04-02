    function find_RB_value(inElement){
       var R_input = document.querySelectorAll(inElement);
       var R_out='';
        for (rb of R_input)
        {
            if (rb.checked) {
                R_out=rb.value ;
                break;
            }
        }
        return R_out;
    }