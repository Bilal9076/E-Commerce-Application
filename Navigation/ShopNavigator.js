// Dependecies
import React,{useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Platform,View,Button,SafeAreaView,StyleSheet,TouchableOpacity} from 'react-native';
// Screen
import AuthScreen,{ScreenOptions as AuthScreenOptions} from '../Screen/User/AuthScreen';
import * as AuthAction from '../Store/Actions/Auth'
import ProductNavigator from './ProductNavigator'
import AdminNavigator from './AdminNavigator';
import OrderNavigator from './OrderNavigator'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
// Icon/
    import Color from '../Constant/Color';
import { useDispatch } from 'react-redux';
import {
    useTheme,
    Text,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    TouchableRipple,
    Switch
} from 'react-native-paper'
// import { ToggleContext} from './AppContainer'

// const DefaultNavOption = {
//     headerStyle: {
//         backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
//     },
//     headerTitleStyle: {
//     },
//     headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary

// }

const DefaultNavOption = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary,
    headerShown:false  
  };

 const DrawerStackNavigator = createDrawerNavigator()
 export const ShopNavigator = ()=>{
     // for theme
    //  const {toggletheme} = React.useContext(ToggleContext)
    //   const PaperTheme = useTheme();
    const [IsDarktheme,SetIsDarktheme]= useState(false)

    const toggletheme = ()=>{
        SetIsDarktheme(!IsDarktheme)
    }

    const dispatch= useDispatch();
     return (
    <DrawerStackNavigator.Navigator
    screenOptions={{
        drawerActiveBackgroundColor:Color.primary,
        drawerActiveTintColor:'black'
    }}
     drawerContent={props=>{
         return (
             <View style={styles.drawerContent}>
                 <SafeAreaView forceInset={{top:'always',horizontal:'never'}}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop:15}}>
                       <Avatar.Image
                       source={{uri:'https://scontent.flhe4-2.fna.fbcdn.net/v/t39.30808-6/245932693_679420506369539_3158132346555460514_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=174925&_nc_eui2=AeFaixczywIynKkivhD84yP51MdparODJBrUx2lqs4MkGsd5as54I23ZqN3F-wexPHYsSpgm3Hlp8Rzun4S_FGhB&_nc_ohc=dI4TT0Famt8AX-Kb0D8&tn=CNq8N9A_AhJx4u1q&_nc_ht=scontent.flhe4-2.fna&oh=1e96390c2781afb441e79529b637813e&oe=6178FC4E'}}
                       size={60}
                       />
                       <View style={{marginLeft:10}}>
                           <Title style={styles.title}>Bilal abbas</Title>
                           <Caption style={styles.Caption}>React Native Developer</Caption>
                       </View>
                    </View>
                    <View style={styles.row}>
                      <View style={styles.section}>
                          <Paragraph>20</Paragraph>
                          <Caption style={styles.Caption}>Following</Caption>
                      </View>
                      <View style={styles.section}>
                          <Paragraph>300</Paragraph>
                          <Caption style={styles.Caption}>Followers</Caption>
                      </View>
                    </View>
                    </View>
                 <DrawerItemList {...props}/> 
                 <Button
                title='Logout'
                color={Color.primary}
                onPress={()=>{
                    dispatch(AuthAction.Logout())
                }}
                />
                </SafeAreaView>
             </View>
         )
     }
     }
    >
        <DrawerStackNavigator.Screen
        name='Product'
        component={ProductNavigator}
        options={{
            drawerIcon:({focused})=>(
                <Ionicons name={'gift-sharp'} size={focused?25:20} color={focused?'black':'gray'}/> 
            ),
            headerShown:false
        }}
        />
        <DrawerStackNavigator.Screen
        name='Order'
        component={OrderNavigator}
        options={{
            drawerIcon:({focused})=>(
                <Ionicons name={'list'} size={focused?25:20} color={focused?'black':'gray'}/> 
            ),
            headerShown:false
        }}
        />
        <DrawerStackNavigator.Screen
        name='Admin'
        component={AdminNavigator}
        options={{
            drawerIcon:({focused})=>(
                <AntDesign name={'user'}  size={focused?25:20} color={focused?'black':'gray'}/> 
            ),
            headerShown:false
        }}
        />
    </DrawerStackNavigator.Navigator>
    )
}

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = ()=>{
    return ( 
    <AuthStackNavigator.Navigator ScreenOptions={DefaultNavOption}>
        <AuthStackNavigator.Screen
        name='Auth'
        component={AuthScreen}
        options={AuthScreenOptions}
        />
    </AuthStackNavigator.Navigator>
    )
}
const styles = StyleSheet.create({
    drawerContent:{
     flex:1,
     paddingTop:10
    },
    userInfoSection:{
        paddingLeft:20,
    },
    title:{
     fontSize:16,
     marginTop:3,
     fontWeight:'bold'
},
Caption:{
    fontSize:14,
    lineHeight:14,
},
row:{
    marginTop:10,
    flexDirection:'row',
    alignItems:'center',
    marginVertical:20
},
row1:{
    flexDirection:'column',
    marginLeft:10,
    alignItems:'center'
},
section:{
    flexDirection:'row',
    alignItems:'center',
    marginRight:14,
},
Paragraph:{
    fontWeight:'bold',
    marginRight:3, 
},
drawerSection:{
    marginTop:15
},
perference:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:12,
    paddingHorizontal:16
},
text:{
    fontStyle:'italic',
    fontSize:15,
    fontWeight:'200',
    color:'gray'
},
})