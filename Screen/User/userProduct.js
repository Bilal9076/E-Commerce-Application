import React,{useState,useEffect} from 'react';
import { Alert, FlatList,Platform,StyleSheet, View ,Pressable,Modal,Text,ActivityIndicator} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Userproduct from '../../Components/Userproduct';
import * as DeleteItem from '../../Store/Actions/Product'
import Color from '../../Constant/Color';
import Ionicons from 'react-native-vector-icons/Ionicons'

const UserProduct = props => {
    const [alert, setalert] = useState(false);
    const [Isloading,Setisloading] = useState(false)
    const [pid,setpid]= useState('')
 const Dispatch = useDispatch();
 const userProduct = useSelector(state => state.products.userProduct)
    const EditProductHandler = id => {
        props.navigation.navigate('EditScreen', { productId: id });
    };

if(Isloading){
    return (
        <View style={styles.Centered}>
            <ActivityIndicator
            size='large'
            color={Color.primary}
            />
        </View>
        )
}
if(userProduct.length===0){
    return(
    <View style={styles.Centered}>
        <Text style={styles.text2}>No Products found,maybe start creating some?</Text>
    </View>
    )
}
   
    return (
        <View>
        <FlatList
            keyExtractor={item => item.id}
            data={userProduct}
            renderItem={itemData => {
                return (
                    <Userproduct
                        image={itemData.item.imageUrl}
                        price={itemData.item.price}
                        title={itemData.item.title}
                        OnViewDetail={() => { 
                            EditProductHandler(itemData.item.id);
                           
                         }}
                        Delete={() => {
                            setalert(true)
                            setpid(itemData.item.id) 
                        }}
                        Edit={() => { 
                            EditProductHandler(itemData.item.id);
                        }}
                    />
                    
                )
            }}
           />
 <Modal visible={alert}
 animationType="fade"
 transparent={true}
 onRequestClose={() => {
     setalert(false)
 }}
>
 <View style={styles.center_View}>
     <View style={styles.warning_modal}>
         <View style={styles.warning_title}>
             <Text style={styles.text1}>Are you sure</Text>
         </View>
         <View style={styles.warning_Message}>
             <Text style={styles.text}>'Do you really want to delete this item'</Text>
         </View>
         <View style={styles.cnfrimBox}>
         <Pressable
         style={styles.button}
               
             onPress={ async () => {
                Setisloading(true)
                 await  Dispatch(DeleteItem.DeleteProduct(pid)) 
               Setisloading(false)
                 setalert(false)
             }}
             android_ripple={{ color: Color.primary }}
         >
                 <Text style={styles.text1}>Yes</Text>
         </Pressable>

         <Pressable
          style={styles.button}
             onPress={() => {
                 setalert(false)
             }}
             android_ripple={{ color: Color.primary }}
         >
                 <Text style={styles.text1}>No</Text>
         </Pressable>
         </View>
     </View>
 </View>
</Modal>
</View>
    )
};

const styles = StyleSheet.create({
    warning_modal: {
        width: 270,
        height: 270,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Color.primary,
        borderRadius: 20,
    },
    warning_title: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: Color.primary,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    center_View: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    warning_Message: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 180,   
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color:'black'
    },
    text1: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    button:{
    borderRadius:6,
    paddingVertical:8,
    paddingHorizontal:19,
    elevation:5,
    width:100,
    margin:5,
    backgroundColor:Color.primary
    },
    cnfrimBox:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:-30
    },
    Centered: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text2:{
        color: 'red',
        fontSize: 16,
       textAlign:'center'
    }
})
export const ScreenOptions = NavData => {
    return {
        headerTitle: 'User Products',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
        },
        headerTitleStyle: {
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary,
        
        headerRight: () => {
            return (
                <Ionicons
                style={{marginRight:4}} 
                name={'create'}
                color="white"  
                size={23} 
                onPress={() => {
                 NavData.navigation.navigate('EditScreen')
                    }}
                />
            )
        }
    }
}
export default UserProduct;