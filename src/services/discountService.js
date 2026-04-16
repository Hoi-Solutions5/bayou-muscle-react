import apiRequest from './api';


export const fetchDiscounts = async (params) => {
    const response = await apiRequest('/admin/discount-offers', {
        method: 'GET',
        params,
    });
    return response;
}

export const createDiscount = async (discountData) => {
    const response = await apiRequest('/admin/discount-offers/create', {
        method: 'POST',
        data: discountData,
    });
    return response;
}
 
export const editDiscount = async (discountId, discountData) => {
    const response = await apiRequest(`/admin/discount-offers/update/${discountId}`, {
        method: 'POST',
        data: discountData,
    });
    return response;
}

export const deleteDiscount = async (discountId) => {
    const response = await apiRequest(`/admin/discount-offers/delete/${discountId}`, {
        method: 'DELETE',
    });
    return response;
}
