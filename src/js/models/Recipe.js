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
    parseIngredients(){
        const longUnits=['tablespoon','tablespoons','ounce','ounces','teaspoon','teaspoons','cups','pounds'];
            const shortUnits=['tbsp','tbsp','oz','oz','tbsp','tbsp','cups','pound'];

        const newIng=this.ingredients.map(el=>{
            let ingredients=el.toLowerCase();
            longUnits.forEach((unit,i)=>{
                ingredients=ingredients.replace(unit,shortUnits[i]);
            });
        
        ingredients=ingredients.replace(/ *\([^)]*\) */g, " "); 
        
        const arrIng=ingredients.split(" ");
        const unitIndex=arrIng.findIndex(el2=> shortUnits.includes(el2));
        console.log(unitIndex);
        let ingredientObj;
        if(unitIndex > -1){
            let count;
            const arrCount=arrIng.slice(0,unitIndex);
            if(arrCount===1){
                count=eval(arrIng[0].replace('-','+'));
            }else{
                count=eval(arrIng.slice(0,unitIndex).join('+'));
            }
            ingredientObj={
                count,
                unit:arrIng[unitIndex],
                ingredients:arrIng.slice(unitIndex+1).join(' ')
            }

        }else if(parseInt(arrIng[0],10)){
            //There is no unit but first element is a number
            ingredientObj={
                count:parseInt(arrIng[0],10),
                unit:arrIng[unitIndex],
                ingredients: arrIng.slice(1).join(' ')
            }
         }
        else if(unitIndex === -1){
            ingredientObj={
                count:1,
                unit:"",
                ingredients

            }

        }
        return ingredientObj;
        })
        this.ingredients=newIng;

    }
}