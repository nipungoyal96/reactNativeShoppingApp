import React,{useState,useEffect,useCallback,useReducer} from 'react';
import {View,Text,TextInput,StyleSheet,ScrollView,Platform,Alert} from 'react-native';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import {useSelector,useDispatch} from 'react-redux'

import CustomHeaderButton from '../../UI/HeaderButton';
import * as productActions from '../../../store/actions/products'

const REDUCER_UPDATE = 'UPDATE';

const formReducer = (state,action) =>{
    if(action.type === 'UPDATE'){

    }
}

const EditProductsScreen = props =>{
    
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))
    const dispatch =useDispatch();


    const [formState,dispatchFormState] = useReducer(formReducer,{
        inputValues:{
            title:editedProduct ? editedProduct.title : '',
            imageUrl:editedProduct ? editedProduct.imageUrl : '',
            description:editedProduct ? editedProduct.description : '',
            price:''
        },
        inputValidities:{
            title:editedProduct ? true : false,
            imageUrl:editedProduct ? true : false,
            description: editedProduct?true :false,
            price: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true :false
    })
    
    const [title,setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [titleIsValid,setTitleIsValid]=useState(false);

    const [imageUrl , setImageUrl]=useState(editedProduct ? editedProduct.imageUrl : '');
    const [price,setPrice] = useState('');
    const [description , setDescription]=useState(editedProduct ? editedProduct.description : '');
   
    const submitHandler = useCallback(() => {
        if(!titleIsValid){
            Alert.alert('Wrong Input!','Please check errors in the form',[{text : 'Okay'}]);
            return ;
        }
        if(editedProduct){
            dispatch(productActions.updateProduct(prodId,title,description,imageUrl))

        }
        else{
            dispatch(productActions.createProduct(title,description,imageUrl,+price))
        }
    props.navigation.goBack();
    },[dispatch, prodId, title,description,imageUrl,price]);

    useEffect(()=>
    {props.navigation.setParams({ submit : submitHandler})},[submitHandler])
    const titleChangeHandler = (text) =>{
        if(text.trim().length === 0){
            setTtitleIsValid(false)
        }else{
            setTtitleIsValid(true)
        }
        setTitle(text);
    }

    const textChangeHandler = (inputIdentifier,text) => {
        let isValid = false
        if(trim.trim().length === 0){
            isValid = true
        }
        else{
            setTitleIsValid(true)
        }
        dispatchFormState({type: REDUCER_UPDATE , value:text,value:text,isValid:isValid,
        input : 'title',input : inputIdentifier

        })
    }   
    

    return <ScrollView>
        <View style={styles.form}>
        <View style={styles.formControl}>
            <Text style={styles.label}> Title</Text>
            <TextInput style={styles.input} value={title}  keyboardType='default' autoCapitalize='sentences' autoCorrect
           onChangeText={textChangeHandler.bind(this,'title')}
           returnKeyType='next'
            />  
            {!titleIsValid && <Text>Please Enter a Valid Title</Text>}
        </View>
        <View style={styles.formControl}>
            <Text style={styles.label}> Image Url</Text>
            <TextInput style={styles.input} value={imageUrl} onChangeText={textChangeHandler.bind(this,'imageUrl')} keyboardType="decimal-pad"/>  
        </View>
        {editedProduct ? null : (<View style={styles.formConavxntrol}>
            <Text style={styles.label}> Price</Text>
            <TextInput style={styles.input} value={price} onChangeText={textChangeHandler.bind(this,'price')}/>  
        </View>)}
        <View style={styles.formControl}>
            <Text style={styles.label}> Description</Text>
            <TextInput style={styles.input} value={description} onChangeText={textChangeHandler.bind(this,'description')}/>  
        </View>
        </View>
    </ScrollView>
}

const styles= StyleSheet.create({
    form : {
        margin:20
    },
    formControl:{
        width : '100%'
    },
    label:{
        fontFamily : 'open-sans-bold',
        marginVertical: 8
    },
    input:{
        paddingHorizontal: 2,
        paddingVertical:5,
        borderBottomColor : '#ccc',
        borderBottomWidth:1
    }
});

EditProductsScreen.navigationOptions = navData => {
    const submitFn=navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight:<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Save" iconName={Platform.OS === 'ios' ? 'ios-checkmark' : 'md-checkmark'} onPress={submitFn}/>
            </HeaderButtons>
        
    }
}

export default EditProductsScreen;