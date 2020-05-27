import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import Likes from "./models/Likes";
import * as searchview from "./view/searchView";
import * as recipeview from "./view/recipeView";
import * as listview from "./view/listView";
import {queryElements, renderLoader, clearLoader} from "./View/selectorElements";



const stateObj={};

const controlSearch= async ()=>{
    //1. Get query from view
    const query= searchview.getInput();
    // console.log(query);

    if(query){
        //2. Add new search object to the state object
        stateObj.search=new Search(query);
        //3. perpare UI for results.

        //4. search for recipe
        await stateObj.search.getResult();
        searchview.clearRenderList();
        renderLoader(queryElements.searchRe);
        

        //5. Render UI on the page
        clearLoader();
        searchview.recipeResults(stateObj.search.result);
        // console.log(stateObj.search.result);

        //6. clear input field
       searchview.clearInput();
       
       

    }
}

queryElements.searchForm.addEventListener('submit',e=>{
    e.preventDefault();
    controlSearch();
});

queryElements.searchResButton.addEventListener('click', event=>{
    const btn=event.target.closest('.btn-inline');
    console.log(btn);
    if(btn){
        const goToPage= parseInt(btn.dataset.goto,10);
        searchview.clearRenderList();
        searchview.recipeResults(stateObj.search.result, goToPage);

    }
});

//recipe controller
const controlRecipe= async ()=>{
    const id= window.location.hash.replace('#','');
    // console.log(id);
    if(id){

        // renderLoader(queryElements.recipeSection);
        //Prepare UI to changes
        //create a new recipe object
        searchview.clearRecipeResults();
        stateObj.recipe=new Recipe(id);
        //get recipe data
        if(stateObj.search){
            searchview.highlightActiveLink(id);
        }
        // searchview.clearRecipeResults();
        await stateObj.recipe.getResult();
        stateObj.recipe.parseIngredients();
        //recipe time and servings
        
        stateObj.recipe.calculateTime();
        stateObj.recipe.calculateServings();
        
        //Render recipe
        clearLoader();
        recipeview.renderRecipe(stateObj.recipe);
        // console.log(stateObj.recipe);
    }
}

['hashchange','load'].forEach(event=> window.addEventListener(event,controlRecipe));

//List Controller
const controlList=()=>{
    if(!stateObj.list){
        stateObj.list=new List();
        //add Ingredient to the list
        stateObj.recipe.ingredients.forEach(el=> {
           const item= stateObj.list.addItem(el.count,el.unit,el.ingredients);
           listview.shoppingList(item);
        });
    }
}
queryElements.shoppingList.addEventListener('click', e=>{
    const id=e.target.closest('.shopping__item').dataset.itemid;
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        stateObj.list.deleteItem(id);
        listview.deleteItem(id);
    }else if(e.target.matches('.shopping__count--value')){
        const val=parseFloat(e.target.value,10);
        stateObj.list.updateCount(id,val);
    }

});
//Likes Controller
const controlLike=()=>{
    if(!stateObj.likes){
        stateObj.likes=new Likes();
    }
        const currentRecipeId=stateObj.recipe.id;
        if(!stateObj.likes.isLiked(currentRecipeId)){
            const newLike=stateObj.likes.addLikeItem(
                currentRecipeId,
                stateObj.recipe.recipeTitle,
                stateObj.recipe.publisher,
                stateObj.recipe.recipeImg
            )
            console.log(stateObj.likes);

        }else{
            stateObj.likes.deleteItem(currentRecipeId);
            console.log(stateObj.likes);
        }
        
    }

// window.addEventListener('hashchange', controlRecipe);
queryElements.recipeSection.addEventListener('click', e=>{
    if(e.target.matches('.btn-dec, .btn-dec *')){
        if(stateObj.recipe.servings>1){
            stateObj.recipe.updateServings('dec');
            recipeview.updateServingsDom(stateObj.recipe);
        }
    }else if(e.target.matches('.btn-inc, .btn-inc *')){
        stateObj.recipe.updateServings('inc');
        recipeview.updateServingsDom(stateObj.recipe);
    }else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')){
        controlList();
    }else if(e.target.matches('.recipe__love, .recipe__love *')){
        controlLike();
    }
});


