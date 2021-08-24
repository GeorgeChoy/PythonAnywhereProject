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

function ElementCreaterDynamic(NumberOfElements,NumberOfColumns,ElementType,ElementClassName,Container,IDPrefix,inDisplay='. .',inTable='') {
    var columnCount=0;
    var table = document.getElementById(inTable);
    var thead, tr, td;
    if(!inTable=='')
    {
        table.appendChild(thead = document.createElement("thead"));
        thead.appendChild(tr = document.createElement("tr"));
        tr.appendChild(td = document.createElement("td"));
    }
    for (i = 0; i < NumberOfElements; i++) {
        var elementi=document.createElement(ElementType);
        elementi.type = ElementType;
        elementi.className = ElementClassName;
        var buttonidtxt = IDPrefix.concat(i);
        elementi.id = buttonidtxt;
        //buttoni.value="";
        elementi.innerHTML = inDisplay;
        if(!inTable=='')
        {td.appendChild(elementi);}
        else
        {Container.appendChild(elementi);}
        columnCount=columnCount+1;

        if(columnCount==NumberOfColumns)
        {
            columnCount=0;
            var br1=document.createElement('br');
            if(!inTable=='')
            {
                td.appendChild(br1);
            }
            else
            {
                Container.appendChild(br1);
            }
        }
    }
}