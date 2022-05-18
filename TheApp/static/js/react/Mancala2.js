const e = React.createElement;

var MyButtons=[];
for (let i = 0; i <= 13; i++) {
    if(i==0 || i==7)
    {
        MyButtons.push({"id":i,"score":0});
    }
    else
    {
        MyButtons.push({"id":i,"score":4});
    }
}

function SetupDisplay(Innumbers)
{}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function moveStones(inList,startIndex,InPlayer,InOppositesList)
{
    var P1Pot=numbers.inList/2;
    var P2Pot=0;
    var LastStoneHomePot=false;
    //console.log(InPlayer);
    //console.log(startIndex);
    var MyScore=inList[startIndex].score;
    //MyScore++;
    //console.log(MyScore);
    inList[startIndex++].score=0;
    var innerCount=1;
    //starting with next cell move, place a stone from the incoming cell into next cells until no stones are left
    //Top row, moving right to left v
    //0,13,12,11,10,9,8         Player 2
    //   1, 2, 3, 4,5,6,    7,  Player 1
    //Bottom row, moving left to right

    for (let i = 1; i <= MyScore; i++) {
        //console.log(startIndex);
        if(startIndex>=inList.length)
        {
            startIndex=0;
            //console.log(InPlayer);
            if(InPlayer=="P2")
            {
                inList[startIndex++].score++;
            }
            else
            {i--;startIndex++}
        }
        else
        {
            if(startIndex==inList.length/2 && InPlayer=="P2")
            {i--;startIndex++}
            else
            {
                if(inList[startIndex]==0)
                {}
                inList[startIndex++].score++;
            }
        }

    }

    //last stone landed on empty pot on your own side?
    if(inList[startIndex-1].score==1)
    {
        if((InPlayer=="P1"&&(startIndex-1<=6 && startIndex-1>0))||((InPlayer=="P2"&&(startIndex-1>7 && startIndex-1<=inList.length-1))))
        {
            var oppositePot=InOppositesList[startIndex-1];
            if(inList[oppositePot].score>0)
            {
                alert("capture");
                if(InPlayer=="P1")
                {
                    inList[inList.length/2].score=inList[inList.length/2].score+inList[startIndex-1].score+inList[oppositePot].score;
                }
                else
                {
                    inList[0].score=inList[0].score+inList[startIndex-1].score+inList[oppositePot].score;
                }
                inList[startIndex-1].score=0;
                inList[oppositePot].score=0;
            }
        }
    }

    //no stones left on wither player's pots?
    var FinishedFlag=true;
    for (let i = 1; i < inList.length/2; i++)
    {
        if(inList[i].score>0)
        {FinishedFlag=false;}
    }
    if(!FinishedFlag)
    {
        FinishedFlag=true;
        for (let i = (inList.length/2)+1; i < inList.length; i++)
        {
            if(inList[i].score>0)
            {FinishedFlag=false;}
        }
    }
    if(FinishedFlag)
    {
        for (let i = 1; i < inList.length/2; i++)
        {
            inList[inList.length/2].score=inList[inList.length/2].score+inList[i].score;
            inList[i].score=0;
        }
        for (let i = (inList.length/2)+1; i < inList.length; i++)
        {
            inList[0].score=inList[0].score+inList[i].score;
            inList[i].score=0;
        }
    }

    if(startIndex==1||startIndex==(inList.length/2)+1 )
    {LastStoneHomePot=true;}
    return [inList,LastStoneHomePot,FinishedFlag];
}

function InitializeStartPlayer()
{
    var StartingPlayer=getRandomInt(0,2);
    var StartPlayerText="";
    if(StartingPlayer==0)
    {StartPlayerText="P1";}
    else
    {StartPlayerText="P2";}
    return StartPlayerText;
}

function NumberList() {
    const [numbers,Setnumbers] =React.useState( []);
    const [count, setCount] = React.useState(0);

    const [CurrentPlayer,SetCurrentPlayer] =React.useState( InitializeStartPlayer());
    const [displayNumbers1,SetdisplayNumbers1] =React.useState( []);
    const [displayNumbers2,SetdisplayNumbers2] =React.useState( []);
    const [PlayerLabel,SetPlayerLabel] =React.useState([]);
    const PlayerLabelFixed=["Player 1","Player 2"];

    var OppositesList=[];
    var Opposition=numbers.length-1;
    for (let i = 0; i < numbers.length; i++) {
        if(i==0 ||i == numbers.length/2)
            {
                OppositesList[i]=0;
                if(i == numbers.length/2)
                {Opposition--;}
            }
        else
            {OppositesList[i]=Opposition--;}
    }
    //console.log(OppositesList);
    function ListItem(props) {
      // Correct! There is no need to specify the key here:
      var disabledFlag="";
      var backgroundColor={backgroundColor: 'yellow',height: 26,width: 26};

      if(CurrentPlayer=="P1")
        if(props.id<=(numbers.length/2))
            {disabledFlag=false;}
        else
            {disabledFlag=true;}
      else
        if(props.id>(numbers.length/2))
            {disabledFlag=false;}
        else
            {disabledFlag=true;}

      if(props.value==0)
        {disabledFlag=true;}
      if(props.id==0||props.id==numbers.length/2)
        {disabledFlag=true;backgroundColor={backgroundColor: 'orange'}}
      return <button id={props.id} value={props.value} disabled={disabledFlag} style={backgroundColor}
       onChange={event => handleChange(event, index)}
       onClick={props => IndividualButtonClick(event)}>{props.value}</button>;
    }

    function ListScores(props) {
      var disabledFlag=true;
      var backgroundColor={backgroundColor: 'orange',height: 60,width: 60,fontSize: 22+'px'};
      return <button id={props.id} value={props.value} disabled={disabledFlag} style={backgroundColor} >{props.value}</button>;
    }

    function HeaderStuff(props) {

      return <label id={props.id} value={props.value} disabled={disabledFlag} style={backgroundColor} >{props.value}</label>;
    }
  //const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    //<ListItem key={number.toString()}
    //          value={number} />
  //);

  const handleChange = (event, index) => {
    console.log("handleChange");
  }

  React.useEffect(() => {

   },[count]);//<----no need for }[]); empty array as if you want to call useEffect each time, we want to update the DOM component after state count has been updated.

  const updateValue = () => {
    var MyButtons=[];
    var MyDisplayButtons=[];
    Setnumbers([]);
    var MyScore=0;
    //var testArray=[0,0,0,0,0,0,0,
    //               0,0,0,0,0,0,12];
    for (let i = 0; i <= 13; i++) {
        if(i==0||i==7)
        {MyScore=0}
        else
        {MyScore=getRandomInt(4,5)}
        //{MyScore=testArray[i];}
        MyButtons.push({"id":i,"score":MyScore,"player":"P2"});
    }
    //console.log(MyButtons);
    Setnumbers(MyButtons);
    MyDisplayButtons.push(MyButtons[0]);
    for (let i = MyButtons.length-1; i > MyButtons.length/2; i--) {

        MyDisplayButtons.push(MyButtons[i]);
    }
    SetdisplayNumbers1(MyDisplayButtons);
    MyDisplayButtons=[];
    for (let i = 1; i <= MyButtons.length/2; i++) {

        MyDisplayButtons.push(MyButtons[i]);
    }
    SetdisplayNumbers2(MyDisplayButtons);
    SetCurrentPlayer(InitializeStartPlayer());
  }

  const updateValue2 = () => {
    var MyButtons=[];
    Setnumbers([]);
    for (let i = 0; i < numbers.length; i++) {

        MyButtons.push(numbers[i]);
    }
    Setnumbers(MyButtons);
  }

  const IndividualButtonClick = (event) => {
    setCount(count + 1);

    var SamePlayerAgain=false;
    var startIndex=event.target.id;
    var FinishedFlag=false;
    var OutNumbers=[];
    var result=[];
    Setnumbers([]);
    result=moveStones(numbers,startIndex,CurrentPlayer,OppositesList);
    MyButtons=result[0];
    SamePlayerAgain=result[1];
    FinishedFlag=result[2];
    if(FinishedFlag)
    {
        alert("game over");
    }
    for (let i = 0; i < numbers.length; i++) {

        OutNumbers.push(MyButtons[i]);
    }
    Setnumbers(OutNumbers);
    if(CurrentPlayer=="P1")
        if(SamePlayerAgain)
            {}
        else
            {SetCurrentPlayer("P2")}
    else
        if(SamePlayerAgain)
            {}
        else
            {SetCurrentPlayer("P1")}
    //updateValue2(MyButtons,startIndex,"P1");
  }

   return (
    <ul>
       {numbers.slice( (numbers.length/2)+1,(numbers.length)).reverse().map((number,index) =>
        <ListItem key={number.id}
                    id={number.id}
                    name={number.player}
                  value={number.score} />
      )}
      Player 2
      <br/>
       {numbers.slice(1, (numbers.length/2)).map((number,index) =>
        <ListItem key={number.id}
                    id={number.id}
                    name={number.player}
                  value={number.score} />
      )}
      Player 1
      <br/>

      {
        numbers.slice(0, 1).map((number,index) =>
        <ListScores key={number.id}
                    id={number.id}
                    name={number.player}
                  value={number.score} />)
      }
      {
        numbers.slice(numbers.length/2, (numbers.length/2)+1).map((number,index) =>
        <ListScores key={number.id}
                    id={number.id}
                    name={number.player}
                  value={number.score} />)
      }
      <br/>
        Player 2                Player 1
      <br/>
        <button onClick={updateValue}>Start new game</button>

    </ul>

  );
}
const numbers=[0]
//your React class to render your above function
class MancalaClass extends React.Component {
  render() {
      return  <NumberList numbers={numbers} />;
  }
}

//set up your container with id of the div DOM element in your html file.
const domContainer = document.querySelector('#message_container');

//render your React class
ReactDOM.render(e(MancalaClass), domContainer);