import { createResourceService } from './resourceService.js';

const categories = createResourceService('/kategori-artikel');

export const getArticleCategories = (options) => categories.list(options);
export const getArticleCategoryById = (id, options) => categories.getById(id, options);
export const createArticleCategory = (payload, options) => categories.create(payload, options);
export const updateArticleCategory = (id, payload, options) => categories.update(id, payload, options);
export const deleteArticleCategory = (id, options) => categories.remove(id, options);
