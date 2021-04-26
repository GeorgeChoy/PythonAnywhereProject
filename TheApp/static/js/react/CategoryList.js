import  React, { Component } from  'react';
import  CategoryService  from  './CategoryService';
const  categoryService  =  new  CategoryService();

class  CategoryList  extends  Component {
    constructor(props) {
        super(props);
        this.state  = {
            categories: []
        };
    }
    componentDidMount() {
    var  self  =  this;
    categoryService.getCategories().then(function (result) {
        self.setState({ categories:  result.data})
    });

    }

    render() {

    return (
    <div  className="categories--list">
        <table  className="table">
            <thead  key="thead">
            <tr>
                <th>#</th>
                <th>Name</th>
            </tr>
            </thead>
            <tbody>
                {this.state.categories.map( c  =>
                <tr  key={c.pk}>
                    <td>{c.pk}  </td>
                    <td>{c.name}</td>
                </tr>)}
            </tbody>
        </table>
    </div>
    );
    }
}
export  default  CategoryList;