import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform,Text,View,Button,SafeAreaView} from 'react-native';
import OrderScreen ,{ScreenOptions as OrderScreenOptions} from '../Screen/Shop/OrderScreen';
import Color from '../Constant/Color';
const OrderStackNavigator = createStackNavigator()

const DefaultNavOption = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
    },
    headerTitleStyle: {
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary

}

const OrderNavigator = ()=>{
    return (
<OrderStackNavigator.Navigator ScreenOptions={DefaultNavOption}>
        <OrderStackNavigator.Screen
        name="OrderScreen" 
        component={OrderScreen}
        options={OrderScreenOptions}
        />
    </OrderStackNavigator.Navigator>
    )  
}
export default OrderNavigator;