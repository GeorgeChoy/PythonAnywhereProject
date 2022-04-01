//This is to show how to do a dynamic form where you add new input boxes with a dropdown box that is populated from axios

//create your react element to be rendered.
const e = React.createElement;

function DynamicForm() {
//Set up your axios header stuff
  const url=window.location.href;
  const myArray = url.split("/");
  var URLHeader=myArray[2];
  var URLBase="http://";
  URLBase=URLBase.concat(URLHeader,"/",myArray[3],"/");
//URL for your product drop down
  const baseURLGetProductAll=URLBase.concat("product_list_all/");

//Product list
  const [products, setProducts] = React.useState(['']);

//ProductPrices list
  const [prices, setProductPrices] = React.useState(['']);

//set value after you change the dropdown
    const [value, setValue] = React.useState('');
//count variable for useEffect
  const [count, setCount] = React.useState(0);
//Product key
    const [ProductPK, setProductPK] = React.useState(0);

//function fetchPost gets the full product list from the server using axios.
  const fetchPost = async () => {
        const response = await axios(baseURLGetProductAll);
      //setPosts([]);
      setProducts(wordList => [...wordList, ...response.data])
  }

//function fetchProductPrices gets the full product prices list for the specified product from the server using axios.
  const fetchProductPrices = async () => {
    const baseURLGetProductPrice=URLBase.concat("ProductPriceCreateList/",ProductPK);
    const response = await axios(baseURLGetProductPrice);
    console.log(response.data);
    var PriceList=response.data;
    if (PriceList.length>0)
    {setFormFields(PriceList);}
    else
    {setFormFields([{product:ProductPK,price: '',start_date:'',end_date:'',pk:''}]);}
    PriceList.map((PL) => (
              console.log(PL.price)
            ))
      //setPosts([]);
      //setProducts(wordList => [...wordList, ...response.data])
  }

//The fetchPost is also called in useEffect
  React.useEffect(() => {
    fetchPost();
   },[count]);//<----no need for }[]); empty array as if you want to call useEffect each time, we want to update the DOM component after state count has been updated.

//Set up your form fields
  const [formFields, setFormFields] = React.useState([
    {  price: '',start_date:'',end_date:'',pk:'' },
  ])

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  }

  const submit = (e) => {
    e.preventDefault();
    //console.log(formFields)
  }

  const addFields = () => {
    let object = {
      product:ProductPK,
      price: '',
      start_date:'',
      end_date:''
    }
    setFormFields([...formFields, object])
  }

  const removeFields = (event,index) => {
    var PK=event.target.name;
    const baseURLDeleteProductPrice=URLBase.concat("ProductPriceDelete/",PK,"/");
    if (PK)
    {axios.delete(baseURLDeleteProductPrice);}

    let data = [...formFields];
    data.splice(index, 1)
    setFormFields(data)
  }
  const SavePriceChanges = (event,index) => {
    var PK=event.target.name;
    console.log(formFields[index]);
    const baseURLUpdateProductPrice=URLBase.concat("ProductPriceUpdate/",PK,"/");
    const baseURLCreateProductPrice=URLBase.concat("ProductPriceCreate/");
    var object = formFields[index];
    if (PK)
    {axios.put(baseURLUpdateProductPrice, object);}
    else
    {
        delete object.pk;
        axios.post(baseURLCreateProductPrice, object);
    }

  }

  const onChange = (event) => {
    setValue(event.target.value);
    setProductPK(event.target.value);

    //setName(event.target.value);
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
    <div className="App">
      <Dropdown
        label="select your product"
        options={products}
        value={value}
        onChange={onChange}
      />
        <button onClick={fetchProductPrices}>Get prices</button>
        <br/><br/>
      <form onSubmit={submit}>
        {formFields.map((form, index) => {
          return (
            <div key={index}>
                <label>
                    price
                      <input
                        name='price'
                        placeholder='price'
                        type="number"
                        step="0.1"
                        min="0.0"
                        onChange={event => handleFormChange(event, index)}
                        value={form.price}
                      />
                </label>
                <label>
                    start date
                      <input
                        name='start_date'
                        type='date'
                        placeholder='start date'
                        onChange={event => handleFormChange(event, index)}
                        value={form.start_date}
                      />
                </label>
                <label>
                    end date
                      <input
                        name='end_date'
                        type='date'
                        placeholder='end date'
                        onChange={event => handleFormChange(event, index)}
                        value={form.end_date}
                      />
                </label>
              <button name={form.pk} onClick={() => removeFields(event,index)}>Remove</button>
              <button name={form.pk} onClick={() => SavePriceChanges(event,index)}>Save/Update</button>
            </div>
          )
        })}
      </form>
      <br/>
      <button onClick={addFields}>Add More..</button>
    </div>
    );
}

//your React class to render your above function
class DynamicFormClass extends React.Component {
  render() {
      return  <DynamicForm />;
  }
}

//set up your container with id of the div DOM element in your html file.
const domContainer = document.querySelector('#message_container');

//render your React class
ReactDOM.render(e(DynamicFormClass), domContainer);