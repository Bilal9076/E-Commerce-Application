import React,{useEffect,useState,useCallback} from 'react';
import { FlatList, Text, Platform,ActivityIndicator, View,StyleSheet, Button, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../Components/Productitem';
import * as CartAction from '../../Store/Actions/Cart';
import * as ProductAction from '../../Store/Actions/Product';
import * as AuthAction from '../../Store/Actions/Auth';
import Color from '../../Constant/Color';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

const ProductOverViewScreen = props => {
    const [isloading,Setisloading] =useState(false);
    const [Isrefreshing,SetIsrefreshing]=useState(false)
    const [Error , SetError] = useState()
    const Dispatch = useDispatch();
    const products = useSelector(state => state.products.availableProduct);

    const LoadedProduct = useCallback( async () => {
        // console.log('product')
      SetIsrefreshing(true)
        SetError(null)
        try {
         await Dispatch(ProductAction.fetchData());
        } catch(err){
          SetError(err.message)
        }
        SetIsrefreshing(false)
         
    },[Dispatch])

    useEffect(()=>{
        Setisloading(true)
    LoadedProduct().then(()=>{
        Setisloading(false) 
    });
    },[Dispatch,LoadedProduct])

    useEffect(()=>{
        const unsubcribe = props.navigation.addListener(
            'focus',
            LoadedProduct
        );
        return () =>{
            unsubcribe();
        };
    },[LoadedProduct])

    if(isloading){
        return (
        <View style={styles.Centered}>
            <ActivityIndicator
            size='large'
            color={Color.primary}
            />
        </View>
        )
    }
    if(!isloading && products.length===0){
        return(
        <View style={styles.Centered}>
            <Text style={styles.text2}>No Product Found. Maybe Start Adding Some</Text>
        </View>
        )
    }
    if(Error){
        return (
        <View style={styles.Centered}>
        <Text style={styles.Errtext}>{Error}</Text>
        <View style={styles.btnContainer}>
        <Button
        color={Color.primary}
        title = "Try Again"
        onPress={LoadedProduct}
        />
        </View>
    </View>
    ) 
    }

    return (
        <FlatList
        onRefresh={LoadedProduct}
        refreshing={Isrefreshing}
            keyExtractor={item => item.id}
            data={products}
            renderItem={itemData => <ProductItem
                image={itemData.item.imageUrl}
                price={itemData.item.price}
                title={itemData.item.title}
                AddToCard={() => {
                    Dispatch(CartAction.AddToCard(itemData.item))
                }}
                OnViewDetail={() => {
                    props.navigation.navigate('productDetail', {
                        productId: itemData.item.id,
                        productTitle: itemData.item.title,
                    })
                }}
            />}
        />
    );
};

export const ScreenOptions = navData => { 
    return {
        headerTitle: 'All Products',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
        },
        headerTitleStyle: {
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary,

        headerRight: () => {
            return (
                <AntDesign 
                style={{marginRight:4}}
                color='white'
                 name={'shoppingcart'}  
                 size={25} 
                 onPress={()=>{
                    navData.navigation.navigate('CartScreen')
                        }}/>
            )
        },
        headerLeft:()=>{
            dispatch = useDispatch();
            return (
                <Ionicons 
                style={{marginLeft:4}}
                name={'ios-menu-sharp'}  
                size={21}
                color='white'
                onPress={()=>{
                //  navData.navigation.navigate('Auth')
                navData.navigation.toggleDrawer();
                            }}/>
            )
        }
    }
}
const styles = StyleSheet.create({
Centered:{
    flex:1,
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center'
},
text2:{
    color: 'red',
    fontSize: 16,
},
btnContainer:{
    width:120,
    marginVertical:10
},
Errtext:{
    color:'red',
    fontSize:20
}
})

export default ProductOverViewScreen;
