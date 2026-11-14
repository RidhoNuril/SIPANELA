import { createResourceService } from './resourceService.js';

const articles = createResourceService('/artikel');

export const getArticles = (options) => articles.list(options);
export const getArticleById = (id, options) => articles.getById(id, options);
export const createArticle = (payload, options) => articles.create(payload, options);
export const updateArticle = (id, payload, options) => articles.update(id, payload, options);
export const deleteArticle = (id, options) => articles.remove(id, options);
