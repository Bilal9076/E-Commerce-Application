import React,{useState} from 'react';
import {NavigationContainer,DarkTheme as NavigationDarkTheme , DefaultTheme as NavigationDefaulTheme} from '@react-navigation/native';
import {Provider as PaperProvider, DarkTheme as PaperTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper'
import {ShopNavigator,AuthNavigator} from './ShopNavigator'
import StartUpScreen from '../Screen/StartUpScreen';
import {useSelector} from 'react-redux'

const  AppContainer = props =>{
  const isAuth = useSelector(state=>!!state.Auth.token) 
  const didTryAutoLogin = useSelector(state=>!!state.Auth.didTryAutoLogin) 
  // for theme
  const [IsDarktheme,SetIsDarktheme]= useState(true)

  // const CustomDefaultTheme = {
  //   ...NavigationDefaulTheme,
  //   ...PaperDefaultTheme,
  //   color:{
  //     ...NavigationDefaulTheme.colors,
  //     ...PaperDefaultTheme.colors
  //   }
  // }
  // const CustomDarkTheme = {
  //   ...NavigationDarkTheme,
  //   ...PaperTheme,
  //   color:{
  //     ...NavigationDarkTheme.colors,
  //     ...PaperTheme.colors
  //   }
  // }

  let theme = IsDarktheme ? NavigationDarkTheme :NavigationDefaulTheme 

  // const ToggleContext= React.useMemo(()=>({
  //   toggletheme :()=>{
  //     SetIsDarktheme(IsDarktheme=>!IsDarktheme)
  // }
  // }),[])
 
  return (
    <NavigationContainer>
      {isAuth &&<ShopNavigator/>}
      {!isAuth && didTryAutoLogin && <AuthNavigator/>}
      {!isAuth && !didTryAutoLogin && <StartUpScreen/>}
    </NavigationContainer>
  )

}

export default AppContainer;