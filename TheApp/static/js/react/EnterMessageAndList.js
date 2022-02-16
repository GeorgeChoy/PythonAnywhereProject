//This is to show how to refresh the component with newly inputted data at the click of a button

//create your react element to be rendered.
const e = React.createElement;

function EnterMessageAndGetLast3Messages() {
//set up your hook states
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [text, setText] = React.useState("");
  const [posts, setPosts] = React.useState([]);
  const [count, setCount] = React.useState(0);

  const url=window.location.href;
  const myArray = url.split("/");
//Get the 1st part of the URL in order to differentiate between production and live
    var URLHeader=myArray[2];
    var URLBase="http://";
    URLBase=URLBase.concat(URLHeader,"/",myArray[3],"/");
    const baseURLPostMessage=URLBase.concat("enter_message_rest/");
    const baseURLGetMessage=URLBase.concat("message_list_read_only/");
    //console.log(baseURLPostMessage);
    //console.log(baseURLGetMessage);
//function fetchPost gets the latest 3 messages from the server using axios, this is called after the button is clicked.
  const fetchPost = async () => {
        const response = await axios(baseURLGetMessage);
      setPosts(response.data);
  }

//I want to clear the input boxes after hitting submit.
  const clearInputs = async () => {
      setName("");
      setEmail("");
      setText("");
  }

//The fetchPost is also called in useEffect
  React.useEffect(() => {
    fetchPost();
   },[count]);//<----no need for }[]); empty array as if you want to call useEffect each time, we want to update the DOM component after state count has been updated.

  // Handle the user clicks the login button
  const handleClick = () => {
  //update count with eact click
    setCount(count + 1);
   //set up your input hash with input data
    const article = { "name": name,"email":email,"text":text,"userPk":0 };
    //post it to server
    axios.post(baseURLPostMessage, article);
    //clear the input boxes
    clearInputs();
    fetchPost();
  };

   return (
   <div>
      name
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        required
      />
      email
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        required
      />
      message
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        required
      />
    <h3>User    Message date    Message</h3>

    <ul>
      {posts.map(item => (
        <li key={item.pk}>
          <a >{item.name}   {item.date} {item.text}</a>
        </li>
      ))}
    </ul>
      <button onClick={handleClick}> submit</button>
   </div>

  );
}

//your React class to render your above function
class EnterMessageClass extends React.Component {
  render() {
      return  <EnterMessageAndGetLast3Messages />;
  }
}

//set up your container with id of the div DOM element in your html file.
const domContainer = document.querySelector('#message_container');

//render your React class
ReactDOM.render(e(EnterMessageClass), domContainer);