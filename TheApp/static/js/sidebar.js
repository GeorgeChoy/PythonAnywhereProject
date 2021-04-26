$(document).ready(function(){
        var $sidemenuOptions = $('.sidenav');
        $sidemenuOptions.empty();
        $('.side').empty();
        var urlprotocol=String(window.location.protocol);
        var urlheader=String(window.location.host);

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
                            $sidemenuOptions.append($('<a id="side" class="side" href="'+urlprotocol+'//'+urlheader+'/'+val.app+'/' +val.url +'">' + val.name + '</a>'));
                        }
                     }

                }
                else if(val.auth_flag)
                {
                         if (val.name.match(/user logout/g) )
                         $sidemenuOptions.append($('<a id="side" class="side" href="'+urlprotocol+'//'+urlheader+'/'+val.app+'/'+ val.url +'">' + val.name + '</a>'));
                }

            });
        },

      });

  } );