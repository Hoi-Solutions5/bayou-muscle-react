import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from './useAuth';
import { addToCart, fetchCartItems } from '../services/cartService';

const normalizeCartItem = (item) => {
    const product = item?.product || {};

    return {
        id: String(item?.id || ''),
        productId: String(item?.product_id || product?.id || ''),
        productName: product?.name || item?.product_name || 'Unknown Product',
        productSlug: product?.slug || '',
        image: product?.image || item?.image || '',
        quantity: Number(item?.quantity ?? 0),
        unitPrice: Number(item?.unit_price ?? product?.price ?? 0),
        discountedPrice: Number(item?.discounted_price ?? product?.discounted_price ?? product?.price ?? item?.unit_price ?? 0),
        total: Number(item?.total_price ?? item?.total ?? 0),
        createdAt: item?.created_at || null,
        updatedAt: item?.updated_at || null,
    };
};

export default function useCart(options = {}) {
    const { autoLoad = true } = options || {};
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const redirectToLogin = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    const loadCartItems = useCallback(async () => {
        if (!isAuthenticated) {
            setCartItems([]);
            setIsLoading(false);
            setError('');
            redirectToLogin();
            return [];
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetchCartItems();
            const fetched = response?.data?.data || response?.data;
            if (!Array.isArray(fetched)) {
                throw new Error('Invalid cart items response.');
            }

            const mappedItems = fetched.map(normalizeCartItem);
            setCartItems(mappedItems);
            return mappedItems;
        } catch (err) {
            setError(err?.message || 'Unable to fetch cart items.');
            return [];
        } finally {
            setIsLoading(false);
        }
    }, [isAuthenticated, redirectToLogin]);

    const addItemToCart = useCallback(async (productId, quantity = 1) => {
        if (!isAuthenticated) {
            redirectToLogin();
            return null;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await addToCart(productId, quantity);
            const added = response?.data?.data || response?.data;
            if (!added) {
                throw new Error('Invalid add to cart response.');
            }

            await loadCartItems();
            return normalizeCartItem(added);
        } catch (err) {
            setError(err?.message || 'Unable to add item to cart.');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [isAuthenticated, loadCartItems, redirectToLogin]);

    useEffect(() => {
        if (autoLoad) {
            loadCartItems();
        }
    }, [autoLoad, loadCartItems]);

    return {
        cartItems,
        isLoading,
        error,
        loadCartItems,
        addItemToCart,
    };
}
