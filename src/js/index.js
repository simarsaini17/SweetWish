import Search from "./models/Search";
import * as searchView from "./View/searchView";
import {queryElements,renderLoader} from "./View/selectorElements";

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