import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform,Text,View,Button,SafeAreaView} from 'react-native';
import ProductOverViewScreen ,{ScreenOptions as ProductoverViewScreenOptions} from '../Screen/Shop/ProductOverViewScreen';
import ProductDetailScreen,{ScreenOptions as ProductDetailScreenOptions} from '../Screen/Shop/ProductDetailScreen';
import CartScreen,{ScreenOptions as CartScreenOptions} from '../Screen/Shop/CartScreen';
import Color from '../Constant/Color';
const DefaultNavOption = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
    },
    headerTitleStyle: {
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary

}

const ProductScreenNavigator = createStackNavigator()

const ProductNavigator = ()=>{
    return (
        <ProductScreenNavigator.Navigator ScreenOptions ={DefaultNavOption}>
        <ProductScreenNavigator.Screen
      name="productScreen" 
      component={ProductOverViewScreen}
    options={ProductoverViewScreenOptions}
        />
        <ProductScreenNavigator.Screen
      name="productDetail" 
      component={ProductDetailScreen}
      options={ProductDetailScreenOptions}
        />
        <ProductScreenNavigator.Screen
      name="CartScreen" 
      component={CartScreen}
      options={CartScreenOptions}
        />
      </ProductScreenNavigator.Navigator>
    ) 
}
export default ProductNavigator