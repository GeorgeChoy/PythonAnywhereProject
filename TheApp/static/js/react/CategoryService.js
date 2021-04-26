import axios from 'axios';
const API_URL = 'http://georgechoy.pythonanywhere.com/TheApp';

export default class CatgeoryService{
    constructor(){}
    getCategories() {
        const url = `${API_URL}/category_list/?format=api`;
        return axios.get(url).then(response => response.data);
    }

}