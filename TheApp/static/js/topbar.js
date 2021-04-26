$(document).ready(function(){
        var $topmenu = $('.topnav');
        $topmenu.empty();
        var excluded_array = ["user login", "register", "user logout"];
        var urlprotocol=String(window.location.protocol);
        var urlheader=String(window.location.host);
        var user='';

         $.ajax({
        url: '/TheApp/get_Topbar/',
        dataType: 'json',
        type : 'GET',

        success: function( data )
        {
            var options =[];
            $.each(data, function(key, val){

                if (!val.name.match(/Login/g) )
                {
                    var node2=document.createElement("DIV");
                    node2.id=val.name;
                    var textnode = document.createTextNode(val.name);
                    node2.className="dropdown";
                    var button1=document.createElement("BUTTON");
                    button1.className = "dropbtn";
                    var node3=document.createElement("I");
                    node3.className = "fa fa-caret-down";
                    var node4=document.createElement("DIV");
                    node4.className = "dropdown-content";
                    node4.id=val.name+"dd";
                    var node5=document.createElement("A");
                    //node5.href="#";
                    //node4.appendChild(node5);
                    button1.appendChild(node3);
                    button1.appendChild(textnode);
                    node2.appendChild(button1);
                    node2.appendChild(node4);
                    document.getElementById("myTopnav").appendChild(node2);
                }
               //$topmenu.append($('<a  id="' +val.name+ '" href="'+ urlprotocol+'//'+urlheader+'/'+val.app+'/' +val.url + '">'+val.name +'</a>' ));
            });
        },
      });

        $.ajax({
        url: '/TheApp/get_menuitems/',
        dataType: 'json',
        type : 'GET',

        success: function( data )
        {

            $.each(data, function(key, val){
                var flag=excluded_array.includes(val.name);
                if (!flag)
                {
                    var x= document.getElementById(val.topbar_option+"dd");
                    var node6=document.createElement("A");
                    node6.href=urlprotocol+'//'+urlheader+'/'+val.app+'/' +val.url;
                    node6.innerHTML = val.name;
                    x.appendChild(node6);
                }
            });
        },

      });

  } );