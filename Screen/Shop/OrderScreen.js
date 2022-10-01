import React, { useEffect, useState, useCallback } from 'react';
import { Text, FlatList, StyleSheet, View, ActivityIndicator, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import OrderItem from '../../Components/OrderItem'
import * as OrderAction from '../../Store/Actions/Orders'
import Color from '../../Constant/Color';

const CardScreen = props => {
    const dispatch = useDispatch();
    const [Isloading, SetIsloading] = useState(false);
    const [Error, SetError] = useState()
    const Orders = useSelector(state => state.Orders.Orders)

    const Orderproduct = useCallback(async () => {
        SetError(null)
        try {
            SetIsloading(true)
            await dispatch(OrderAction.fetchOrder());
            SetIsloading(false)
        } catch (err) {
            SetError(err.message)
        }
    }, [dispatch])

    useEffect(() => {
          Orderproduct();
    }, [dispatch,Orderproduct])


    if (Error) {
        return (
            <View style={styles.Centered}>
                <Text style={styles.text}>{Error}</Text>
                <View style={styles.btnContainer}>
                    <Button
                        color={Color.primary}
                        title="Try Again"
                        onPress={Orderproduct}
                    />
                </View>
            </View>
        )
    }

    if (Isloading) {
        return (
            <View style={styles.Centered}>
                <ActivityIndicator
                    size='large'
                    color={Color.primary}
                />
            </View>
        )
    }
    if(!Isloading && Orders.length===0){
        return(
        <View style={styles.Centered}>
            <Text style={styles.text2}>No Orders Found. Maybe do some orders</Text>
        </View>
        )
    }
    return (
        <FlatList
            keyExtractor={item => item.id}
            data={Orders}
            renderItem={itemData => {
                return (
                    <OrderItem
                        Amount={itemData.item.Amount}
                        date={itemData.item.readableDate}
                        items={itemData.item.item}
                    />
                )
            }}
        />
    )
}
export const ScreenOptions = {
    headerTitle: 'Orders',
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
    },
    headerTitleStyle: {
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary
}

const styles = StyleSheet.create({
    Centered: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'red',
        fontSize: 20,
    },
    text2:{
        color: 'red',
        fontSize: 16,
    },
    btnContainer: {
        width: 120,
        marginVertical: 10
    },
})
export default CardScreen;
