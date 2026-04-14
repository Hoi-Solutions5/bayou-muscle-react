import apiRequest from './api';

export const fetchCategories = async () => {
  const response = await apiRequest('/admin/product-categories', {
    method: 'GET',
  });
  return response;
};

export const createCategory = async (categoryData) => {
  const response = await apiRequest('/admin/product-categories/create', {
    method: 'POST',
    data: categoryData,
  });
  return response;
};


