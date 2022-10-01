export const ORDER_PRODUCT = 'ORDER_PRODUCT';
export const SET_ORDER = 'SET_ORDER';
import OrderItem from "../../models/Order-item";


export const fetchOrder = () => {
    return async (dispatch,getState) => {
            const userId = getState().Auth.userId;
            const response= await fetch(`https://rn-complete-guide-46dad-default-rtdb.firebaseio.com/Orders/${userId}.json`
            );
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const resData = await response.json();
            const loadedOrders = [];

            for (const key in resData) {
                loadedOrders.push(new OrderItem(
                    key,
                    resData[key].CardItem,
                    resData[key].TotalAmount,
                    new Date(resData[key].date)
                )
                );
            }
            dispatch({ type: SET_ORDER, OrdersProduct: loadedOrders })
    }

}

    export const OrdersProduct = (CardItem, TotalAmount) => {
        const date = new Date();
        return async (dispatch,getState) => {
            const token = getState().Auth.token;
            const userId= getState().Auth.userId;
            const response = await fetch(`https://rn-complete-guide-46dad-default-rtdb.firebaseio.com/Orders/${userId}.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    CardItem,
                    TotalAmount,
                    date: date.toISOString()
                })
            });
            const resData = await response.json();
            dispatch({
                type: ORDER_PRODUCT,
                OrderItem: { id: resData.name, items: CardItem, Amount: TotalAmount, date: date }
            });
    }
}