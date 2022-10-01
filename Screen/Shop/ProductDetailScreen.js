import React from 'react';
import { View, Text, ScrollView, Image, Button, StyleSheet } from 'react-native';
import { useSelector,useDispatch } from 'react-redux'
import Color from '../../Constant/Color';
import * as CartAction from '../../Store/Actions/Cart'

const ProductDetailScreen = props => {
    const Dispatch = useDispatch()
    const productId = props.route.params.productId;
    const Selectedproduct = useSelector(state => state.products.availableProduct.find(prodId => prodId.id === productId))
    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: Selectedproduct.imageUrl }} />
            <View style={styles.btnContainer}>
                <Button color={Color.primary} title="ADD TO CARD" onPress={() => { 
                    Dispatch(CartAction.AddToCard(Selectedproduct))
                }} />
            </View>
            <Text style={styles.title}>Product Price</Text>
            <Text style={styles.price}>${Selectedproduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{Selectedproduct.description}</Text>
        </ScrollView>
    )
};

export const ScreenOptions = navData => {
    return {
        headerTitle: navData.route.params.productTitle,
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
        },
        headerTitleStyle: {
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 265,
    },
    btnContainer: {
        alignItems: 'center',
        marginVertical: 10
    },
    title:{
    fontSize:18,
    textAlign:'center',
    color:Color.primary,
    marginVertical:5,
    },
    price: {
        fontSize: 16,
        textAlign:'center',
        color:'#888',
    },
    description:{
        textAlign:'center',
        marginVertical:10,
    }
})
export default ProductDetailScreen;