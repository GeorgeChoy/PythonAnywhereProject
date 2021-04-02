$(document).ready(function(){

    $("#login").click(function () {

    var usernametxt =document.getElementById("username").value;
    var passwordtxt = document.getElementById("password").value;

    var template = []

    if (!usernametxt || !passwordtxt)
    {
        alert("no username or no password entered");
        return;
    }

      $.ajax({

        url: '/TheApp/user_login/',
        data: {
          'username': usernametxt,
          'password': passwordtxt
        },
        dataType: 'json',
        type : 'POST',

        success: function( data )
        {
          if (data.success) {
            $(location).attr('href', '/TheApp/about')
          }
          else
            { alert(usernametxt + " not logged in."); }
        }
      });
    });

  } );