//This is to show how to do a dropdown box that is populated from axios

//create your react element to be rendered.
const e = React.createElement;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function EnterMessageAndGetLast3Messages() {
//set up your hook states
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [text, setText] = React.useState("");
  const [posts, setPosts] = React.useState(['']);
  const [count, setCount] = React.useState(0);
  const [likes, setLikes] = React.useState(0);
  const [id, setId] = React.useState('');
  const [category, setCategory] = React.useState(0);
  const [user, setUser] = React.useState(0);

  const url=window.location.href;
  const myArray = url.split("/");
//Get the 1st part of the URL in order to differentiate between production and live
    var URLHeader=myArray[2];
    var URLBase="http://";
    URLBase=URLBase.concat(URLHeader,"/",myArray[3],"/");
    const baseURLPostMessage=URLBase.concat("enter_message_rest/");
    const baseURLGetMessage=URLBase.concat("product_list_last3/");
    const baseURLUpdateProduct=URLBase.concat("ProductRetrieveUpdateItem/");
    const [ProductPK, setProductPK] = React.useState('');

    //console.log(baseURLPostMessage);
    //console.log(baseURLGetMessage);
//function fetchPost gets the latest 3 messages from the server using axios, this is called after the button is clicked.
  const fetchPost = async () => {
        const response = await axios(baseURLGetMessage);
      //setPosts([]);
      setPosts(wordList => [...wordList, ...response.data])
  }
  const [value, setValue] = React.useState('products');

  const RetrieveUPdate = async () => {
        const baseURLUpdateProduct=URLBase.concat("ProductRetrieveUpdateItem/",ProductPK);
        const response = await axios(baseURLUpdateProduct);
        setName(response.data.name);
        setLikes(response.data.likes);
        setCategory(response.data.category);
        setUser(response.data.user);
  }

  const onChange = (event) => {
    setValue(event.target.value);
    setProductPK(event.target.value);
    setName("");
    setLikes("");
    //setName(event.target.value);
  };

//I want to clear the input boxes after hitting submit.
  const clearInputs = async () => {
      setName("");
      setEmail("");
      setText("");
      setPosts([]);
      setLikes("");
  }

  const handleSubmit = () => {

   //set up your input hash with input data
    const product = { "name": name,"likes":likes,"category":category,"user":user,"pk":ProductPK };
    const baseURLUpdateProduct=URLBase.concat("ProductRetrieveUpdateItem/",ProductPK,"/");
    //post it to server
    console.log("1");
    axios.put(baseURLUpdateProduct, product);
    //clear the input boxes
    clearInputs();
    fetchPost();
  };

//The fetchPost is also called in useEffect
  React.useEffect(() => {
    fetchPost();
   },[count]);//<----no need for }[]); empty array as if you want to call useEffect each time, we want to update the DOM component after state count has been updated.

  // Handle the user clicks the login button
  const handleClick = () => {
  //update count with eact click
    setCount(count + 1);
   //set up your input hash with input data
    //const article = { "name": name,"email":email,"text":text,"userPk":0 };
    //post it to server
    //axios.post(baseURLPostMessage, article);
    //clear the input boxes

    clearInputs();
    setProductPK(value);

    //const baseURLUpdateProduct=URLBase.concat("ProductRetrieveUpdateItem/",ProductPK,"/?format=json");
    //const response =  axios(baseURLUpdateProduct);
    RetrieveUPdate();

  };

const UpdateProduct = () => {
  };

    const Dropdown = ({ label, value, options, onChange }) => {
      return (
        <label>
          {label}
          <select value={value} onChange={onChange}>
            {options.map((option) => (
              <option value={option.pk} name={option.pk}>{option.name}</option>
            ))}
          </select>
        </label>
      );
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
      likes
      <input
        type="text"
        value={likes}
        onChange={(e) => {
          setLikes(e.target.value);
        }}
        required
      />
      <Dropdown
        label="What do we eat?"
        options={posts}
        value={value}
        onChange={onChange}
      />

      <button onClick={handleClick}> Get product </button>
      <button onClick={handleSubmit}> submit updates</button>
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