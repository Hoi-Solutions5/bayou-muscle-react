import apiRequest from './api';

export const fetchContacts = async (params) => {
    const response = await apiRequest('/admin/contacts', {
        method: 'GET',
        params,
    });
    return response;
}
