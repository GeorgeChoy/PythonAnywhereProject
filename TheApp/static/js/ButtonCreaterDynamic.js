function ButtonCreaterDynamic(NumberOfButtons,NumberOfColumns) {
    var columnCount=0;
    for (i = 0; i < NumberOfButtons; i++) {
        var buttoni=document.createElement('button');
        buttoni.type = 'button';
        buttoni.className = 'btn-styled';
        buttoni.onclick="myFunction(this)";
        var buttonidtxt = 'toggle'.concat(i);
        buttoni.id = buttonidtxt;
        //buttoni.value="";
        buttoni.innerHTML = ".  .";
        container.appendChild(buttoni);
        columnCount=columnCount+1;
        if(columnCount==NumberOfColumns)
        {
            columnCount=0;
            var br1=document.createElement('br');
            container.appendChild(br1);
        }
    }
}