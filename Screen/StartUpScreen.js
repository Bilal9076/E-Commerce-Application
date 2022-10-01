import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import Color from '../Constant/Color'
import { useDispatch } from 'react-redux'
import * as  AuthAction from '../Store/Actions/Auth'
import AsyncStorage from '@react-native-async-storage/async-storage';

const StartUpScreen = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const TryLogin = async () => {
            const UserData = await AsyncStorage.getItem('userData') 
            if (!UserData) {
                dispatch(AuthAction.DidTryAutoLogin());
                return;
            }
            const TransformedData = JSON.parse(UserData)
            const { userId, token, expirayDate } = TransformedData;
            const ExpirationDate = new Date(expirayDate)
          
            if (ExpirationDate <= new Date() || !token || !userId) {
                dispatch(AuthAction.DidTryAutoLogin());
                return;
            }
            dispatch(AuthAction.DidTryAutoLogin());
            // props.navigation.navigate('Shop')
            const ExpirationTime = ExpirationDate.getTime() - new Date().getTime();
            
            dispatch(AuthAction.authenticate(userId, token, ExpirationTime))
        }
        TryLogin();
    }, [dispatch])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Color.primary} />
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default StartUpScreen;