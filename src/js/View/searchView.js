import {queryElements} from "./selectorElements";

export const getInput=()=> queryElements.searchField.value;

export const clearInput=()=>{
    queryElements.searchField.value = "";
}
export const clearRenderList=()=>{
    queryElements.searchResult.innerHTML="";
    queryElements.searchResButton.innerHTML="";
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
const createButton=(page, type)=>
    `<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <svg class="search__icon">
        <img src="https://img.icons8.com/flat_round/64/000000/arrow-${type==='prev'?'left':'right'}.png"/>
        </svg>
        <span>${type==='prev'? page=page - 1 : page=page + 1}</span>
    </button>
`;

const renderButtons=(page,numberOfResults, numberPerPage)=>{
    const pages=Math.ceil(numberOfResults/numberPerPage);
    let button;
    if(page===1 && pages>1){
        button=createButton(page, 'next');
    }
    else if(page < pages){
        button=`${createButton(page,'prev')}
        ${createButton(page,'next')}`;

    }else if(page===pages && pages >1){
        button=createButton(page,'prev');
    }
    queryElements.searchResButton.insertAdjacentHTML('afterbegin',button);
}
export const recipeResults= (recipes, currentPage=1,numberPerPage=10)=>{
    //Render result of page
    var begin=(currentPage-1)*numberPerPage;
    var end= currentPage*numberPerPage
    recipes.slice(begin,end).forEach(displayRecipe);
    // console.log(recipes.length);
    
    //Render button of page
    renderButtons(currentPage,recipes.length, numberPerPage);
}