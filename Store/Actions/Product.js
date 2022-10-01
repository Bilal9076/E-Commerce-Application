export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';
import product from '../../models/product'

export const fetchData = () => {
    return async (dispatch,getState) => {
        const userId= getState().Auth.userId;
        try {
            const response = await fetch('https://rn-complete-guide-46dad-default-rtdb.firebaseio.com/products.json');
            if(!response.ok){
                throw new Error ('Some thing Went Wrong');
            }
            const resData = await response.json();

            const LoadedData = []
            for (key in resData) {
                LoadedData.push(new product(
                    key,
                    resData[key].onwerId,
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price,
                ))
            }
            dispatch({
                type: SET_PRODUCT,
                product: LoadedData,
                userProduct:LoadedData.filter(prod=>prod.onwerId===userId)
            })
        } catch (err) {
           throw err 
        }
    };
};

export const DeleteProduct = productId => {
    return async (dispatch,getState) => { 
        const token = getState().Auth.token;
        const response = await fetch(`https://rn-complete-guide-46dad-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`, {
            method: 'DELETE',
        });
        if(!response.ok){
            throw new Error ('something went wrong')
        }
        dispatch({
            type: DELETE_PRODUCT, pid: productId 
        })
   };
   };

export const CreateProduct = (title, imageUrl, description, price) => {
        return async (dispatch,getState) => {  
        const token = getState().Auth.token;
        const userId = getState().Auth.userId;
        const response = await fetch(`https://rn-complete-guide-46dad-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description,
                price,
                onwerId:userId,
            })
        });
        const resData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            ProductData: {
                id: resData.name,
                title,
                imageUrl,
                description,
                price,
                onwerId:userId,
            }
        });
    };
};
export const UpdateProduct = (id, title, imageUrl, description) => {
    return async (dispatch,getState)  => {
       const token = getState().Auth.token;
     const response=  await fetch(`https://rn-complete-guide-46dad-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description,
            })
        });
        if(!response.ok){
            throw new Error ('something went wrong')
        }
    dispatch({
        type: UPDATE_PRODUCT,
        pid: id,
        ProductData: {
            title,
            imageUrl,
            description,
        }
    });
}
}