import uniquid from 'uniqid';
export default class List{
    constructor(){
        this.items=[];
    }
    addLikedItem(count,unit,ingredients){
        const item={
            id=uniquid(),
            count,
            unit,
            ingredients
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id){
        const index=this.items.findIndex(el=> el.id===id);
        this.items.splice(index,1);
    }
    updateCount(id,newcount){
        this.items.findIndex(el=> el.id===id).count=newcount;

    }
}