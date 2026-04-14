import { useCallback, useEffect, useState } from 'react';
import { fetchCategories } from '../services/CategoriesService';

const normalizeCategoryTree = (apiData = []) =>
	apiData.map((parent) => ({
		id: String(parent.id),
		parentId: null,
		title: parent.title || 'Untitled',
		status: parent.status || 'inactive',
		slug: parent.slug || '',
		createdAt: parent.created_at || null,
		updatedAt: parent.updated_at || null,
		subcategories: (parent.children || []).map((child) => ({
			id: String(child.id),
			parentId: String(child.parent_id ?? parent.id),
			title: child.title || 'Untitled',
			status: child.status || 'inactive',
			createdAt: child.created_at || null,
			updatedAt: child.updated_at || null,
		})),
	}));

export default function useCategories() {
	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');

	const loadCategories = useCallback(async () => {
		setIsLoading(true);
		setError('');

		try {
			const response = await fetchCategories();
			const normalized = normalizeCategoryTree(response?.data || []);
			setCategories(normalized);
			return normalized;
		} catch (err) {
			setError(err?.message || 'Unable to fetch categories.');
			return [];
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		loadCategories();
	}, [loadCategories]);

	return {
		categories,
		setCategories,
		isLoading,
		error,
		refetch: loadCategories,
	};
}
