import axios from 'axios';
export default class Search{
    constructor(searchQuery){
        this.searchQuery=searchQuery;
    }
    async getResult(){
        const res=await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.searchQuery}`);
        this.result=res.data.recipes;
        // console.log(this.result);
    }

}