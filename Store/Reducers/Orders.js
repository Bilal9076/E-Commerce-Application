import {ORDER_PRODUCT,SET_ORDER} from '../Actions/Orders';
import OrderItem from '../../models/Order-item';

const initialState ={
Orders:[]
}

export default (state=initialState,action )=>{
      
    switch(action.type){
        case SET_ORDER:
            return {
                Orders:action.OrdersProduct
            }
        case ORDER_PRODUCT:
         const Orderitems = new OrderItem(
            action.OrderItem.id,
          action.OrderItem.items,
          action.OrderItem.Amount,
          action.OrderItem.data
         )
         return {
             ...state,
             Orders:state.Orders.concat(Orderitems)
         }
    }

    return state;
}