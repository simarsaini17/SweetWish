export const queryElements={
    searchForm: document.querySelector('.head_nav'),
    searchField : document.querySelector('.search__field'),
    searchRe:document.querySelector('.results'),
    searchResult: document.querySelector('.results__list')

}


export const renderLoader=parent=>{
    const loader=`<div class=loader>
    <img src="https://img.icons8.com/color/48/000000/rotate-left--v1.png"/>
    </div>`;

    parent.insertAdjacentHTML('afterbegin',loader);
}

export const clearLoader=()=>{
    document.querySelector()
}