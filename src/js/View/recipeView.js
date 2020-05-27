import {queryElements} from './selectorElements';
import {Fraction} from 'fractional';

const computeFraction= num=>{
    if(num){
        const [int, dec]=num.toString().split('.').map(el=>parseInt(el));
        if(!dec){
            return num;
        }
        if(int===0){
            const fr=new Fraction(num);
            return `${fr.numerator}/${fr.denominator}`;
        }else{
            const fr=new Fraction(num-int);
            return `${int} ${fr.numerator}/${fr.denominator}`;
        }
    }
    return '?';
   
}
const createIngredient= ingredient=>`
<li class="recipe__item">
    <svg class="recipe__icon">
    </svg>
    <div class="recipe__count">${computeFraction(ingredient.count)}</div>
    <div class="recipe__ingredient">
    <span class="recipe__unit">${ingredient.unit}</span>
    ${ingredient.ingredients}
    </div>
    </li>`;

export const renderRecipe=(recipeObj,isLiked)=>{
    const markup=`<figure class="recipe__fig">
        <img src="${recipeObj.recipeImg}" alt="${recipeObj.recipeTitle}" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipeObj.recipeTitle}</span>
        </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <img src="img/icons8-stopwatch-48.png">
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipeObj.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <img src="img/icons8-standing-man-50.png">
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipeObj.servings}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-dec">
                    <svg>
                        <img src="img/icons8-minus-64.png">
                    </svg>
                </button>
                <button class="btn-tiny btn-inc">
                    <svg>
                        <img src="img/icons8-plus-64.png"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
              <img src="img/?icons8-${isLiked?'love1':'love'}-30.png">
            </svg>
        </button>
    </div>
    
    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${recipeObj.ingredients.map(el=>createIngredient(el)).join('')}
        </ul>

        <button class="btn-small recipe__btn recipe__btn--add">
            <svg class="search__icon">
                <img src="img/icons8-shopping-cart-promotion-100.png">
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${recipeObj.publisher}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href=${recipeObj.url}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                
            </svg>

        </a>
    </div>`;
    queryElements.recipeSection.insertAdjacentHTML('afterbegin',markup);
}

export const updateServingsDom=recipe=>{
    document.querySelector('.recipe__info-data--people').textContent=recipe.servings;

    const countEle=Array.from(document.querySelectorAll('.recipe__count'));
    countEle.forEach((el,i)=>{
        el.textContent=computeFraction(recipe.ingredients[i].count);
    })
    
}