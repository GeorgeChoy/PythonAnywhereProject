$(document).ready(function(){

        var $sidemenuOptions = $('#sidemenu');
        $sidemenuOptions.empty();
          $.ajax({
        url: '/TheApp/get_menuitems/',
        dataType: 'json',
        type : 'GET',

        success: function( data )
        {
            var options =[];
            $.each(data, function(key, val){
                if (!val.authenticated_only )
                {
                    if (val.name.match(/user login/g) || val.name.match(/register/g))
                    {
                        if(!val.auth_flag)
                        {
                            $sidemenuOptions.append($('<a id="side" href="http://georgechoy.pythonanywhere.com/'+val.app+'/'+ val.url +'">' + val.name + '</a>'));
                        }
                     }
                     else
                     {
                        $sidemenuOptions.append($('<a id="side" href="http://georgechoy.pythonanywhere.com/'+val.app+'/'+ val.url +'">' + val.name + '</a>'));
                     }
                }
                else if(val.auth_flag)
                {
                         $sidemenuOptions.append($('<a id="side" href="http://georgechoy.pythonanywhere.com/'+val.app+'/'+ val.url +'">' + val.name + '</a>'));
                }

            });
        },

      });

  } );