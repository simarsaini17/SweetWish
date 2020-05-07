import axios from 'axios';
export default class Recipe{
    constructor(id){
        this.id=id;
    }
    async getResult(){
        const result=await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
        console.log(result);
        this.recipeTitle=result.data.recipe.title;
        this.recipeImg=result.data.recipe.image_url;
        this.publisher=result.data.recipe.publisher_url;
        this.url=result.data.recipe.source_url;
        this.ingredients=result.data.recipe.ingredients;
        //
    }

    calculateTime(){
        //Assuming that we need 15 min for each 3 ingredients
        const numImg=this.ingredients.length;
        const periods= Math.ceil(numImg/3);
        this.time=periods*15;
    }
    calculateServings(){
        this.servings=4;
    }
}