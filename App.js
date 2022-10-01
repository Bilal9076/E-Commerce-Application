import React from 'react';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
// import { useFonts } from 'expo-font';
import ReduxThunk from 'redux-thunk'

import ProductReducer from './Store/Reducers/Product';
import CartProduct from './Store/Reducers/Cart'
import  OrdersProduct  from './Store/Reducers/Orders';
import AuthReducer from './Store/Reducers/Auth'
import NavigationContainer from './Navigation/AppContainer';

const rootReducer = combineReducers({
  products:ProductReducer,
  Cart:CartProduct,
  Orders:OrdersProduct,
  Auth:AuthReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer/>
    </Provider>
  );
}

