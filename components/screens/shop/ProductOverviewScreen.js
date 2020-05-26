import React from 'react';
import {FlatList,Button, Platform} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';

import ProductItem from '../../ProductItem';
import * as cartActions from '../../../store/actions/cart';
import CustomHeaderButton from '../../UI/HeaderButton';
import Colors from '../../../constants/Colors';

const ProductOverviewScreen = props =>{
    const products = useSelector(state => state.products.availableProducts)
    const  dispatch = useDispatch();
    const onSelectItemHandler = (id,title) =>{
        props.navigation.navigate('ProductDetail',{
            productId:id,
            productTitle:title
    })}
    return(
    <FlatList data={products} keyExtractor={item => item.id} renderItem={itemData =>
         <ProductItem image={itemData.item.imageUrl}
          title={itemData.item.title}
           price={itemData.item.price}
            onSelect={()=>{onSelectItemHandler(itemData.item.id,itemData.item.title)}} 
            >
                <Button color={Colors.primary} title="View Details" onPress={()=>{onSelectItemHandler(itemData.item.id,itemData.item.title)}}/>
            <Button color={Colors.primary} title="To Cart" onPress={()=>{
                dispatch(cartActions.addToCart(itemData.item))
            }}/>
            </ProductItem>
        }/>
    )
}

ProductOverviewScreen.navigationOptions = navData => {
    return{
    headerTitle: 'All Products',
    headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    <Item title="Menu" iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'} onPress={()=>{
        navData.navigation.toggleDrawer();
    }}/>
</HeaderButtons>,
    headerRight:<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Cart" iconName={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'} onPress={()=>{
            navData.navigation.navigate('Cart')
        }}/>
    </HeaderButtons>
    }
}

export default ProductOverviewScreen;