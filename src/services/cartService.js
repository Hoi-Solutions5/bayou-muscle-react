import apiRequest from "./api";

export const fetchCartItems = async () => {
    const response = await apiRequest('/cart', {
        method: 'GET',
    });
    return response;
}

export const addToCart = async (productId, quantity) => {
    const response = await apiRequest('/cart', {
        method: 'POST',
        data: { product_id: productId, quantity },
    });
    return response;
}
