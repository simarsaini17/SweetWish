export default class Likes{
    constructor(){
        this.likes=[];
    }
    addLikeItem(id,title,author,img){
        const like={
            id,
            title,
            author,
            img
        }
        this.likes.push(like);
        return like;
    }
    deleteItem(id){
        const index=this.items.findIndex(el=>el.id===id);
        this.items.splice(index,1);
    }
    isLiked(id){
        return this.likes.findIndex(el=>el.id===id)!==-1;
    }
    getNumLikes(){
        return this.likes.length;
    }
}