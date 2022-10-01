import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Color from '../../Constant/Color';
import CardItem from '../../Components/CardItem';
import * as CardAction from '../../Store/Actions/Cart';
import * as OrderAction from '../../Store/Actions/Orders'
import Card from '../../Components/Card'

const CartScreen = props => {
    const dispatch = useDispatch();
    const [Isloading, Setisloading] = useState(false)
    const TotalAmount = useSelector(state => state.Cart.TotalAmount);
    const CartItem = useSelector(state => {
        const TransformedCartItem = [];
        for (const key in state.Cart.items) {
            TransformedCartItem.push({
                ProductId: key,
                productPrice: state.Cart.items[key].productPrice,
                productTitle: state.Cart.items[key].productTitle,
                qauntity: state.Cart.items[key].qauntity,
                sum: state.Cart.items[key].sum,
            });

        }
        return TransformedCartItem.sort((a, b) => a.ProductId > b.ProductId ? 1 : -1);
    });

    const Orderitem = async () => {
        Setisloading(true)
        await dispatch(OrderAction.OrdersProduct(CartItem, TotalAmount))
        Setisloading(false)
    }
    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}> Total Amount: <Text style={styles.amount}>${Math.round(TotalAmount.toFixed(2) * 100) / 100}</Text></Text>
                {Isloading ?
                    <ActivityIndicator
                        size='large'
                        color={Color.primary}
                    /> : <Button
                        color={Color.primary}
                        title='OrderNow'
                        disabled={CartItem.length === 0}
                        onPress={Orderitem}
                    />}
            </Card>
            <View>
                <FlatList
                    keyExtractor={item => item.ProductId}
                    data={CartItem}
                    renderItem={itemData =>
                    (
                        <CardItem
                            qauntity={itemData.item.qauntity}
                            title={itemData.item.productTitle}
                            Amount={itemData.item.sum}
                            Deletable
                            remove={() => {
                                dispatch(CardAction.RemoveCardItem(itemData.item.ProductId));
                            }}
                        />
                    )}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    screen: {
        margin: 10,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
        height: 60,
        padding: 10,
        justifyContent: 'space-around'

    },
    summaryText: {
        fontSize: 14,
        color: Color.primary
    },
    amount: {
        fontSize: 14,
        color: '#888'
    }
});

export const ScreenOptions = {
    headerTitle: 'Cart Item',
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
    },
    headerTitleStyle: {
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary

}

export default CartScreen;