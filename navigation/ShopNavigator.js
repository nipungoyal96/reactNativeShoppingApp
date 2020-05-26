import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import ProductsOverviewScreen from '../components/screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../components/screens/shop/ProductDetailScreen';
import CartScreen from '../components/screens/shop/CartScreen';
import OrdersScreen from '../components/screens/shop/OrdersScreen';
import UserProductScreen from '../components/screens/user/UserProductScreen';
import EditProductScreen from '../components/screens/user/EditProductScreen';
import Colors from '../constants/Colors';

const defaultNavOptions={  
    headerStyle:{
        backgroundColor: Platform.OS === 'ios' ? '' : Colors.primary
    },
    headerTitleStyle:{
        fontFamily: 'open-sans-bold'
    },
    headerBackTitle:{
        fontFamily:'open-sans-bold'
    },
    headerBackTitle:{
        fontFamily:'open-sans'
    },
    headerTintColor: Platform.OS === 'ios'? Colors.primary : 'white'
}
const ProductsNavigator = createStackNavigator({    
    ProductOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart:CartScreen
},
{
    navigationOptions:{
        drawerIcon : drawerConfig => <Ionicons 
        name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}  
        size={23} 
        color={drawerConfig.tintColor}
        />
       
    },
    defaultNavigationOptions:defaultNavOptions
}
);

const OrdersNavigator = createStackNavigator({
    Orders:OrdersScreen
},{
    navigationOptions:{
        drawerIcon : drawerConfig => <Ionicons 
        name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}  
        size={23} 
        color={drawerConfig.tintColor}
        />
       
    },
    defaultNavigationOptions:defaultNavOptions
});

const AdminNavigator= createStackNavigator({
    UserProducts:UserProductScreen,
    EditProducts:EditProductScreen
},{
    navigationOptions:{
        drawerIcon : drawerConfig => <Ionicons 
        name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'}  
        size={23} 
        color={drawerConfig.tintColor}
        />
       
    },
    defaultNavigationOptions:defaultNavOptions
});

const ShopNavigator= createDrawerNavigator({
    Products : ProductsNavigator,
    Orders : OrdersNavigator,
    Admin:AdminNavigator
},{
    contentOptions:{
        activeTintColor : Colors.primary
    }
})

export default createAppContainer(ShopNavigator);