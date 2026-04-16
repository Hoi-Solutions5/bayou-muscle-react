import { fetchDiscounts, createDiscount, editDiscount,deleteDiscount } from '../services/discountService';
import { useCallback, useEffect, useState } from 'react';

const getDiscountStatus = (startDateValue, endDateValue) => {
    const now = new Date();
    const startDate = startDateValue ? new Date(startDateValue) : null;
    const endDate = endDateValue ? new Date(endDateValue) : null;

    if (startDate && !Number.isNaN(startDate.getTime()) && now < startDate) {
        return 'scheduled';
    }

    if (endDate && !Number.isNaN(endDate.getTime()) && now > endDate) {
        return 'expired';
    }

    return 'active';
};

const normalizeDiscount = (item) => {
    const products = Array.isArray(item?.products)
        ? item.products.map((product) => ({
            id: String(product?.id || ''),
            name: product?.name || product?.title || 'Untitled',
        }))
        : [];

    const scope = item?.discount_scope || '';
    const discountType = item?.type || 'absolute';
    const mode = discountType === 'absolute' ? 'fixed' : 'percentage';
    const value = mode === 'percentage' ? item?.percentage : item?.amount;
    const baseRow = {
        sourceDiscountId: String(item?.id || ''),
        title: item?.title || 'Untitled',
        level: scope === 'product' ? 'product' : 'coupon',
        code: item?.coupon_code || '--',
        discountType,
        percentage: item?.percentage ?? '',
        fixedAmount: item?.amount ?? '',
        mode,
        amount: value ?? '0',
        scope,
        status: getDiscountStatus(item?.start_date, item?.end_date),
        detail: item?.detail || '--',
        startDate: item?.start_date || null,
        endDate: item?.end_date || null,
        products,
        createdAt: item?.created_at || null,
        updatedAt: item?.updated_at || null,
    };

    if (scope === 'product') {
        if (!products.length) {
            return [
                {
                    ...baseRow,
                    id: `${baseRow.sourceDiscountId}-product-unassigned`,
                    target: '--',
                    productId: null,
                },
            ];
        }

        return products.map((product) => ({
            ...baseRow,
            id: `${baseRow.sourceDiscountId}-product-${product.id}`,
            target: product.name,
            productId: product.id,
        }));
    }

    return [
        {
            ...baseRow,
            id: `${baseRow.sourceDiscountId}-coupon`,
            target: '--',
            productId: null,
        },
    ];
};

export default function useDiscounts() {
    const [discounts, setDiscounts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');


    const loadDiscounts = useCallback(async (params) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetchDiscounts(params);
            const mappedDiscounts = Array.isArray(response?.data)
                ? response.data.flatMap(normalizeDiscount)
                : [];
            setDiscounts(mappedDiscounts);
            return mappedDiscounts;
        } catch (err) {
            setError(err?.message || 'Unable to fetch discounts.');
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    const addDiscount = useCallback(async (discountData) => {
        try {
            const response = await createDiscount(discountData);
            const newRows = normalizeDiscount(response?.data);
            setDiscounts((prev) => [...newRows, ...prev]);
            return newRows;
        } catch (err) {
            setError(err?.message || 'Unable to create discount.');
            throw err;
        }


    }, []);

    const editExistingDiscount = useCallback(async (discountId, discountData) => {
        try {
            const response = await editDiscount(discountId, discountData);
            const updatedRows = normalizeDiscount(response?.data);
            setDiscounts((prev) => {
                const filtered = prev.filter((item) => !updatedRows.some((updated) => updated.sourceDiscountId === item.sourceDiscountId));
                return [...updatedRows, ...filtered];
            }
            );
            return updatedRows;
        } catch (err) {
            setError(err?.message || 'Unable to update discount.');
            throw err;
        }
    }, []);

    const deleteExistingDiscount = useCallback(async (discountId) => {
        try {
            await deleteDiscount(discountId);
            setDiscounts((prev) => prev.filter((item) => String(item.sourceDiscountId) !== String(discountId)));
        } catch (err) {
            setError(err?.message || 'Unable to delete discount.');
            throw err;
        }
    }, []);


    useEffect(() => {
        loadDiscounts();
    }, [loadDiscounts]);




    return {
        discounts,
        isLoading,
        error,
        loadDiscounts,
        addDiscount,
        editExistingDiscount,
        deleteExistingDiscount,
    };
}