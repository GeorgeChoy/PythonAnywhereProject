const baseURL = "http://georgechoy.pythonanywhere.com/TheApp/category_list/";
//create your react element to be rendered.
const e = React.createElement;

//your react function to do the interesting/important stuff, in this case it is to access the django rest api data
function CategoryList2() {
  const [post, setPost] = React.useState(null);
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }, []);

  if (!post)
   {
    console.log(post);
    return null;
    }
        const listItems = post.map((number) =>
          <li>{number.pk} - {number.name} </li>
        );
  return (
        listItems
  );
}

//your React class to render your above function
class CategoryListClass extends React.Component {
  render() {
      return  <CategoryList2 />;
  }
}

//set up your container with id of the div DOM element in your html file.
const domContainer = document.querySelector('#category_container');
//render your React class
ReactDOM.render(e(CategoryListClass), domContainer);