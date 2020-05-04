export const queryElements={
    searchForm: document.querySelector('.head_nav'),
    searchField : document.querySelector('.search__field'),
    searchRe:document.querySelector('.results'),
    searchResult: document.querySelector('.results__list')
}
const loaderEle={
    loader:'loader'
}

export const renderLoader=parent=>{
    const loader=`<div class=${loaderEle.loader}>
    <img src="https://img.icons8.com/color/48/000000/rotate-left--v1.png"/>
    </div>`;

    parent.insertAdjacentHTML('afterbegin',loader);
}

export const clearLoader=()=>{
   const loader=document.querySelector(`.${loaderEle.loader}`);
   if(loader){
       loader.parentElement.removeChild(loader);
   }
}