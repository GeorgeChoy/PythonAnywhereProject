//An enigma machine using React as the front end and non model django rest framework in the back end

//create your react element to be rendered.
const e = React.createElement;

function Enigma(){
  const [config, setConfig] = React.useState("");
  const [inputtext, setInputText] = React.useState("");
  const [result, setResult] = React.useState("");
  const url=window.location.href;
  const myArray = url.split("/");
  var URLHeader=myArray[2];
  var URLBase="http://";
  URLBase=URLBase.concat(URLHeader,"/",myArray[3],"/");
  const baseURLGetDecryptedMessage=URLBase.concat("message_list_read_only/");

//function fetchResult fetches the de from the server using axios.
  const fetchResult = async () => {
        const baseURLGetDecryptedMessage=URLBase.concat("enigma_django_rest_return/",config,"/",inputtext);
        const response =await  axios(baseURLGetDecryptedMessage);

        setResult(response.data.result);
        console.log(response.data.result);
  }

  const handleSubmit = () => {
    //post it to server
    console.log(inputtext);
    console.log(config);
    //const baseURLGetDecryptedMessage=URLBase.concat("enigma_django_rest_return/",config,"/",inputtext);
    fetchResult();
    console.log(result);
  };
   return (
       <div>
          config
          <input
            placeholder='config'
            maxLength={3}
            type="text"
            value={config}
            onChange={(e) => {
              setConfig(e.target.value);
            }}
            required
          />
          input word
          <input
            placeholder='input'
            type="text"
            value={inputtext}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            required
          />
          result
          <input
            name='result'
            type='text'
            placeholder='result'
            value={result}
            readonly
          />
          <button onClick={() => handleSubmit(event)}> submit </button>
       </div>
  );
}

//your React class to render your above function
class EnigmaClass extends React.Component {
  render() {
      return  <Enigma />;
  }
}

//set up your container with id of the div DOM element in your html file.
const domContainer = document.querySelector('#message_container');

//render your React class
ReactDOM.render(e(EnigmaClass), domContainer);