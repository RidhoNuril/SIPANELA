import { createResourceService } from './resourceService.js';

const notifications = createResourceService('/notifikasi');

export const getNotifications = (options) => notifications.list(options);
export const getNotificationById = (id, options) => notifications.getById(id, options);
export const createNotification = (payload, options) => notifications.create(payload, options);
export const updateNotification = (id, payload, options) => notifications.update(id, payload, options);
export const deleteNotification = (id, options) => notifications.remove(id, options);
