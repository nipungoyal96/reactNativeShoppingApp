export const ADD_TO_Cart = 'ADD_TO_Cart';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const removeFromCart = productId =>{
    return {type:REMOVE_FROM_CART , pid:productId}
}

export const addToCart = product => {
    return {
        type: ADD_TO_Cart,
        product: product
    }
}