import { createResourceService } from './resourceService.js';

const users = createResourceService('/users');

export const getUsers = (options) => users.list(options);
export const getUserById = (id, options) => users.getById(id, options);
export const createUser = (payload, options) => users.create(payload, options);
export const updateUser = (id, payload, options) => users.update(id, payload, options);
export const deleteUser = (id, options) => users.remove(id, options);
