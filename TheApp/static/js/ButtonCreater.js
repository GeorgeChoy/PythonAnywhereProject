function ButtonCreater() {
    for (i = 0; i < 5; i++) {
        var buttoni=document.createElement('button');
        buttoni.type = 'button';
        buttoni.className = 'btn-styled';
        buttoni.onclick="myFunction(this)";
        var buttonidtxt = 'toggle'.concat(i);
        buttoni.id = buttonidtxt;
        buttoni.value=i;
        buttoni.innerHTML = i;
        container.appendChild(buttoni);
    }
}


