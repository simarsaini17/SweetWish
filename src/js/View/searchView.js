import {queryElements} from "./selectorElements";

export const getInput=()=> queryElements.searchField.value;

export const clearInput=()=>{
    queryElements.searchField.value = "";
}
export const clearRenderList=()=>{
    queryElements.searchResult.innerHTML="";
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
// const pageNumbers={
//     cureentPage: '1',
//     numberPerPage: '10',
//     numberOfPages:'0'
// }
export const recipeResults= (recipes, currentPage=1,numberPerPage=10)=>{
    var begin=(currentPage-1)*numberPerPage;
    var end= begin+numberPerPage;
    recipes.slice(begin,end).forEach(displayRecipe);
}