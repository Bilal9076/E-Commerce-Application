import React, { useReducer, useCallback, useState,useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Button, ActivityIndicator,Modal,Pressable } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux'

import Input from '../../Components/input';
import Card from '../../Components/Card';
import * as  AuthAction from '../../Store/Actions/Auth';
import Color from '../../Constant/Color'




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



const AuthScreen = props => {

    const [Isloading, Setisloading] = useState(false);
    const [Error, SetError] = useState();
    const [IsSignUp,SetIsSignUp]=useState(false)
    const [alert, setalert] = useState(false);

    const [stateFrom, DispatchstateFrom] = useReducer(fromReducer, {
        inputValues: {
            email: '',
            password: '',
        },
        inputValidities: {
            email: false,
            password: false,
        },
        FormValiditity: {
            fromIsValid: false
        }
    })

    useEffect(()=>{
        if(Error){
            setalert(true)
        } 
    },[Error])
   

    const ChangetextHanlder = useCallback((inputIdentifier, inputValue, inputValiditiy) => {
        DispatchstateFrom({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            IsValid: inputValiditiy,
            input: inputIdentifier,
        });

    }, [DispatchstateFrom]);

    const dispatch = useDispatch();

    const AuthHandler =  async () => {
        let action 
        if(IsSignUp){
            action= AuthAction.Signup
                (
                    stateFrom.inputValues.email,
                    stateFrom.inputValues.password
                )
        }else {
            action= AuthAction.Login
                (
                    stateFrom.inputValues.email,
                    stateFrom.inputValues.password
                )
            
        }
        SetError(null)
        Setisloading(true)
        try{
          await  dispatch(action) 
        //   props.navigation.navigate('Shop')
        }catch(err){
          SetError(err.message)
          Setisloading(false)
        }
       
    }



    if (Isloading) {
        return (
            <View style={styles.Centered}>
                <ActivityIndicator
                    size='large'
                    color='#248f8f'
                />
            </View>
        )
    }
    return (
        <View style={styles.screen} >
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
                            <Text style={styles.text}>An error occured</Text>
                        </View>
                        <View style={styles.warning_Message}>
                         <Text style={styles.text}>'{Error}'</Text>  
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
            <LinearGradient colors={['#ffebe6', '#ff5c33','#ff5c33']} style={styles.gradient}>
                <Card style={styles.AuthContainer}>
                    <ScrollView>
                        <Input
                            label='E-mail'
                            id='email'
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize='none'
                            warningText='please enter a valid email address.'
                            onInputChange={ChangetextHanlder}
                            initialValue=''
                            returnKeyType='next'
                            placeholder='Please Enter Your E-mail'
                        />
                        <Input
                            id='password'
                            label="Password"
                            keyboardType='default'
                            secureTextEntry
                            required
                            minLenght={5}
                            autoCapitalize='none'
                            warningText='please enter a valid password.'
                            onInputChange={ChangetextHanlder}
                            initialValue=''
                            returnKeyType='next'
                            placeholder='Please Enter Your Password'
                        />
                        <View style={styles.btnContainer}>
                            <View style={styles.btn}>
                                <Button
                                    title={`Switch to ${IsSignUp ? 'Login':'SignUp'}`}
                                    color='#1a0000'
                                    onPress={() => {
                                       SetIsSignUp(Prestate=>!Prestate)
                                    }}
                                />
                            </View>
                            <View style={styles.btn}>
                                <Button
                                    title={IsSignUp?'SignUp':'Login'}
                                    color='#ff3300'
                                    onPress={AuthHandler}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
            </View>
        
    )
}

export const ScreenOptions = {
    headerTitle: 'Authenticate',
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? '#ff3300' : 'white'
    },
    headerTitleStyle: {
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Color.primary
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        color:'skyblue',
        alignItems: 'center'
    },
    AuthContainer: {
        width: '80%',
        maxWidth: 400,
        maxWidth:400,
        padding: 20,
    },
    btnContainer: {
        justifyContent: 'space-around',
        marginTop:10
    },
    btn: {
        marginVertical: 3
    }, 
    Centered: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
    alignItems: 'center'
    },
    text: {
        color: '#248f8f',
        fontSize: 20,
        fontFamily: 'Bold'
    },
    text2: {
        color: 'red',
        fontSize: 16,
    },
    btnContainer2: {
        width: 120,
        marginVertical: 10
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
        backgroundColor:Color.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
})

export default AuthScreen;