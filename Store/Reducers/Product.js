import PRODUCTS from '../../data/dummy-data'
import Product from '../../models/product'
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCT } from '../Actions/Product';

const initialState = {
    availableProduct: [],
    userProduct: []
};
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT:
            return {
                ...state,
                availableProduct:action.product,
                userProduct:action.userProduct
            }

        case CREATE_PRODUCT:
            const NewProduct = new Product(
                action.ProductData.id,
                action.ProductData.onwerId,
                action.ProductData.title,
                action.ProductData.imageUrl,
                action.ProductData.description,
                action.ProductData.price
            )
            return {
                ...state,
                userProduct: state.userProduct.concat(NewProduct),
                availableProduct: state.availableProduct.concat(NewProduct)
            };

        case UPDATE_PRODUCT:
            const ProductIndex = state.userProduct.findIndex(prod => prod.id === action.pid)
            const Updateproduct = new Product(
                action.pid,
                state.userProduct[ProductIndex].onwerId,
                action.ProductData.title,
                action.ProductData.imageUrl,
                action.ProductData.description,
                state.userProduct[ProductIndex].price
            )
            const newUserProduct = [...state.userProduct]
            newUserProduct[ProductIndex] = Updateproduct
            const avaibleproductindex = state.availableProduct.findIndex(prod => prod.id === action.pid)
            const NewAvaibleProduct = [...state.availableProduct]
            NewAvaibleProduct[avaibleproductindex] = Updateproduct
            return {
                ...state,
                availableProduct: NewAvaibleProduct,
                userProduct: newUserProduct,
            }

        case DELETE_PRODUCT:
            return {
                ...state,
                userProduct:
                    state.userProduct.filter(
                        product => product.id !== action.pid),
                availableProduct: state.availableProduct.filter(
                    product => product.id !== action.pid
                ),
            }
    }
    return state
}