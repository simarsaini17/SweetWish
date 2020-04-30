import {queryElements} from "./selectorElements";

export const getInput=()=> queryElements.searchField.value;

export const clearInput=()=>{
    queryElements.searchField.value = "";
}
const displayRecipe = recipe =>{
    const htmlEle=`<li>
    <a class="likes__link" href="#${recipe.recipe_id}">
        <figure class="likes__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${recipe.title}</h4>
            <p class="likes__author">${recipe.publisher}</p>
        </div>
        </a>
        </li>`;
    queryElements.searchResult.insertAdjacentHTML('beforeend', htmlEle);
}

export const recipeResults= recipes=>{
    recipes.forEach(displayRecipe);
}