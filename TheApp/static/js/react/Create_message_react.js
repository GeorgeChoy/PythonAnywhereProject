const baseURLPostMessage = "http://127.0.0.1:8000/TheApp/enter_message_rest/";
const baseURLGetMessage = "http://127.0.0.1:8000/TheApp/message_list_read_only/";
//create your react element to be rendered.
const e = React.createElement;

//Get the last 3 messages
function Last3Messages() {
  const [post, setPost] = React.useState(null);
  React.useEffect(() => {
    axios.get(baseURLGetMessage).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post)
   {
    console.log(post);
    return null;
    }
        const listItems = post.map((number) =>
          <li key={number.pk}>{number.pk} - {number.name} - {number.date} - {number.text}</li>
        );
        alert("Last3Messages");
  return (
        listItems
  );
}

//your react function to do the interesting/important stuff, in this case it is to post the django rest api data
function EnterMessage() {
  //Creating a state variable
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [text, setText] = React.useState("");
  const [post, setPost] = React.useState(null);

  // Accessing the history instance created by React
  //const navigate = React.useNavigate();

  /*function addMessageToList() {

      React.useEffect(() => {
        axios.get(baseURLGetMessage).then((response) => {
          setPost(response.data);
        });
      }, []);
        console.log(post);

  }*/

    const MessageList=[];
  // Handle the user clicks the login button
  const handleClick = () => {
    const article = { "name": name,"email":email,"text":text,"userPk":0 };
    axios.post('http://127.0.0.1:8000/TheApp/enter_message_rest/', article);
    MessageList=Last3Messages();
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

      <button type="submit" onClick={handleClick}>
        {" "}
        submit{" "}
      </button>
        <ul>
        </ul>
    </div>
  );
}

//your React class to render your above function
class EnterMessageClass extends React.Component {
  render() {
      return  <EnterMessage />;
  }
}
class ShowMessageClass extends React.Component {
  render() {
      return  <Last3Messages />;
  }
}
//set up your container with id of the div DOM element in your html file.
const domContainer = document.querySelector('#message_container');
const domContainer2 = document.querySelector('#message_container2');
//render your React class
ReactDOM.render(e(EnterMessageClass), domContainer);
ReactDOM.render(e(ShowMessageClass), domContainer2);