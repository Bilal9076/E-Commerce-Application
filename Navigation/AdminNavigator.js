import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform,Text,View,Button,SafeAreaView} from 'react-native';
import EditProduct,{ScreenOptions as EditScreenOptions} from '../Screen/User/EditProduct';
import UserProduct,{ScreenOptions as UserScreenOptions} from '../Screen/User/userProduct';
import Color from '../Constant/Color';

const DefaultNavOption = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
    },
    headerTitleStyle: {
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary

}
const AdminStackNavigator = createStackNavigator()

const AdminNavigator = ()=>{
    return (
        <AdminStackNavigator.Navigator ScreenOptions={DefaultNavOption}>
            <AdminStackNavigator.Screen
             name="userProduct" 
             component={UserProduct}
             options={UserScreenOptions}
            />
            <AdminStackNavigator.Screen
             name="EditScreen" 
             component={EditProduct}
             options={EditScreenOptions}
            />
        </AdminStackNavigator.Navigator>
    )
   
}
export default AdminNavigator;