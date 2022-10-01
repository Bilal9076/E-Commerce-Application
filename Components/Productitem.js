
import React, { version } from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, TouchableNativeFeedback, Platform, Touchable } from 'react-native';
import Color from '../Constant/Color';
import Card from '../Components/Card'

const ProductItem = props => {
    let TouchableTemp = TouchableOpacity;
    if (Platform.OS === 'android' && version >= 21) {
        TouchableTemp = TouchableNativeFeedback;
    }
    return (
        <Card style={styles.container}>
            <TouchableTemp onPress={props.OnViewDetail}>
                <View style={styles.imgContainer}>
                    <Image
                        source={{ uri: props.image }}
                        style={styles.img}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                </View>
                <View style={styles.BtnContainer}>
                    <View style={styles.btn}>
                        <Button color={Color.primary} title="Add to Cart" onPress={props.AddToCard} />
                    </View>
                    <View style={styles.btn}>
                        <Button color={Color.primary} title="View Detail" onPress={props.OnViewDetail} />
                    </View>
                </View>
            </TouchableTemp>
        </Card>
    )
};

const styles = StyleSheet.create({
    container: {
        height: 300,
        margin: 15, 
    },
    imgContainer: {
        width: '100%',
        height: '60%',
    },
    img: {
        height: '100%',
        width: '100%'
    },
    textContainer: {
        alignItems: 'center',
        height: '13%',
        marginVertical: 5
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
    title: {
        fontSize: 16,
        color: 'red',
    },
    BtnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: '27%',
        marginVertical: 5,
        marginHorizontal: 5
    },
    btn: {
        width: '35%',
    }
})

export default ProductItem;
