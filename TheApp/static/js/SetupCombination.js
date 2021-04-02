function SetupCombination(){
    var letters=['a','b','c','d','e','f'];
    var output='';
    for (var i=0; i < 4; i++) {
        output=output.concat(letters[Math.floor(Math.random() * 6)]);
    }
    return output;
}