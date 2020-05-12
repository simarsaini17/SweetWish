import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./View/searchView";
import * as recipeView from "./View/recipeView";
import {queryElements,renderLoader,clearLoader} from "./View/selectorElements";

// const search=new Search('pizza');
// console.log(search);
// search.getResult();

const stateObj={};

const controlSearch= async ()=>{
    //1. Get query from view
    const query= searchView.getInput();
    // console.log(query);

    if(query){
        //2. Add new search object to the state object
        stateObj.search=new Search(query);
        //3. perpare UI for results.

        //4. search for recipe
        await stateObj.search.getResult();
        searchView.clearRenderList();
        renderLoader(queryElements.searchRe);
        

        //5. Render UI on the page
        clearLoader();
        searchView.recipeResults(stateObj.search.result);
        // console.log(stateObj.search.result);

        //6. clear input field
       searchView.clearInput();
       
       

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
        searchView.clearRenderList();
        searchView.recipeResults(stateObj.search.result, goToPage);

    }
});

//recipe controller
const controlRecipe= async ()=>{
    const id= window.location.hash.replace('#','');
    // console.log(id);
    if(id){
        //Prepare UI to changes
        //create a new recipe object
        stateObj.recipe=new Recipe(id);
        //get recipe data
        await stateObj.recipe.getResult();
        stateObj.recipe.parseIngredients();
        //recipe time and servings
        stateObj.recipe.calculateTime();
        stateObj.recipe.calculateServings();
        
        //Render recipe
        console.log(stateObj.recipe);
    }
}

['hashchange','load'].forEach(event=> window.addEventListener(event,controlRecipe));
// window.addEventListener('hashchange', controlRecipe);