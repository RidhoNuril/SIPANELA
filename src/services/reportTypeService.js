import { createResourceService } from './resourceService.js';

const reportTypes = createResourceService('/jenis-laporan');

export const getReportTypes = (options) => reportTypes.list(options);
export const getReportTypeById = (id, options) => reportTypes.getById(id, options);
export const createReportType = (payload, options) => reportTypes.create(payload, options);
export const updateReportType = (id, payload, options) => reportTypes.update(id, payload, options);
export const deleteReportType = (id, options) => reportTypes.remove(id, options);
