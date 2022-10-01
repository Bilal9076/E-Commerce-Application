import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Color from '../Constant/Color'
import Ionicons from 'react-native-vector-icons/Ionicons'

const CardItem = props => {
    return (
        <View style={styles.Carditem}>
            <View style={styles.itemData}>
                <Text style={styles.qauntity}>{props.qauntity}:  </Text>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.Amount}>${props.Amount.toFixed(2)}  </Text>
                {props.Deletable && <TouchableOpacity onPress={props.remove}>
                <Ionicons 
                 name={'trash'}  
                 size={23}
                 color="red" />
                </TouchableOpacity>}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    Carditem: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 11,
        borderRadius: 1,
        borderBottomWidth: 1,
        borderColor: '#888',
        margin: 15
    },
    itemData: {
        flexDirection: 'row',
        marginBottom: 3
    },
    qauntity: {
        fontSize: 15,
        color: Color.primary
    },
    Amount: {
        fontSize: 15,
        color: '#888',

    },
    title: {
        fontSize: 15,
        color: 'black'
    }
});
export default CardItem;
