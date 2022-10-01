import React, { useReducer, useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet,  Platform,  Pressable, Modal,ActivityIndicator,Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as ProductAction from '../../Store/Actions/Product';
import Input from '../../Components/input'
import Color from '../../Constant/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const fromReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const UpdatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const UpdatedValidities = {
            ...state.inputValidities,
            [action.input]: action.IsValid
        }

        let fromIsValid = true;
        for (const key in UpdatedValidities) {
            fromIsValid = fromIsValid && UpdatedValidities[key]
        }
        return {
            inputValues: UpdatedValues,
            inputValidities: UpdatedValidities,
            fromIsValid: fromIsValid
        }
    };
    return state;
}

const EditScreen = props => {
    const [alert, setalert] = useState(false);
    const [Isloading,Setisloading] = useState(false);
    const [Error,SetError]= useState();
    const dispatch = useDispatch();
    const prodId = props.route.params? props.route.params.productId:null;
    const editProduct = useSelector(state =>
        state.products.userProduct.find(prod => prod.id === prodId));

    const [stateFrom, DispatchstateFrom] = useReducer(fromReducer, {
        inputValues: {
            title: editProduct ? editProduct.title : '',
            image: editProduct ? editProduct.imageUrl : '',
            description: editProduct ? editProduct.description : '',
            price: ''
        },
        inputValidities: {
            title: editProduct ? true : false,
            image: editProduct ? true : false,
            description: editProduct ? true : false,
            price: editProduct ? true : false,
        },
        FormValiditity: {
            fromIsValid: editProduct ? true : false,
        }
    })

    const Changetext = useCallback((inputIdentifier, inputValue, inputValiditiy) => {
        DispatchstateFrom({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            IsValid: inputValiditiy,
            input: inputIdentifier,
        });

    }, [DispatchstateFrom]);

    const SubmitFunction = useCallback( async () => {
        if (!stateFrom.fromIsValid) {
            setalert(true)
            return;
        }
        Setisloading(true)
        SetError(null)
        try{
            if (editProduct) {
               await dispatch(ProductAction.UpdateProduct(
                    prodId,
                    stateFrom.inputValues.title,
                    stateFrom.inputValues.image,
                    stateFrom.inputValues.description))
            }
            else {
               await dispatch(ProductAction.CreateProduct(
                    stateFrom.inputValues.title,
                    stateFrom.inputValues.image,
                    stateFrom.inputValues.description,
                    +stateFrom.inputValues.price))
            }
            props.navigation.goBack();
        } catch(err){
          SetError(err.message)
        }
        Setisloading(false)
        
    }, [stateFrom, prodId, dispatch]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return (
                    <AntDesign
                style={{marginRight:5}} 
                name={'check'}  
                size={23} 
                onPress={SubmitFunction}
                color='white'
                />
                
                )
            }
        })
    }, [SubmitFunction])

    useEffect(()=>{
        if(Error){
           setalert(true)
        } 
    },[Error])

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

    return (
        <ScrollView>
            <View style={styles.form}>
                <Input
                    id='title'
                    label="Title"
                    warningText='please enter some title!'
                    keyboardType='default'
                    autoCapitalize='sentences'
                    returnKeyType='next'
                    placeholder='Please Enter Title'
                    initialValue={editProduct ? editProduct.title : ''}
                    initiallyValid={!!editProduct}
                    onInputChange={Changetext}
                    required
                />

                <Input
                    id='image'
                    label="imageUrl"
                    warningText='please enter some URL!'
                    keyboardType='default'
                    autoCapitalize='sentences'
                    placeholder='Please Enter URL'
                    multiline
                    numberOfLines={3}
                    initialValue={editProduct ? editProduct.imageUrl : ''}
                    initiallyValid={!!editProduct}
                    onInputChange={Changetext}
                    required
                />

                {editProduct ? null : (
                    <Input
                        id='price'
                        label="price"
                        warningText='please enter some Price!'
                        keyboardType='decimal-pad'
                        autoCapitalize='sentences'
                        returnKeyType='next'
                        placeholder='Please Enter Price'
                        initialValue={editProduct ? editProduct.price : ''}
                        initiallyValid={!!editProduct}
                        onInputChange={Changetext}
                        required
                        min={0.1}
                    />
                )}

                <Input
                    id='description'
                    label="Description"
                    warningText='Please enter some description!'
                    autoCapitalize='sentences'
                    returnKeyType='next'
                    placeholder='Please Enter Description'
                    multiline
                    numberOfLines={3}
                    initialValue={editProduct ? editProduct.description : ''}
                    initiallyValid={!!editProduct}
                    onInputChange={Changetext}
                    required
                    minLength={3}
                />
            </View>
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
                        {Error ?  <Text style={styles.text}>'An error occured'</Text>:<Text style={styles.text}>'Warning'</Text>} 
                        </View>
                        <View style={styles.warning_Message}>
                            {Error ?  <Text style={styles.text}>'Something went wrong'</Text>:<Text style={styles.text}>'Please Check your form enteries</Text>}  
                        </View>
                        <Pressable
                            onPress={() => {
                                setalert(false)
                            }}
                            android_ripple={{ color: Color.primary }}
                        >
                            <View style={styles.reset}>
                                <Text style={styles.text}>Ok</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}

export const ScreenOptions= navdata => {
    const routeParams = navdata.route.params ?navdata.route.params:{}
    return {
        headerTitle: routeParams.productId ? 'Edit Product' : 'Add Product',
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.primary : 'white'
        },
        headerTitleStyle: {
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary,
        
    }

}

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    warning_modal: {
        width: 250,
        height: 250,
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
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        color: 'black'
    },
    reset: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: Color.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    Centered:{
        flex:1,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center'
    },

})
export default EditScreen;