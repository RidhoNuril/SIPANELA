import { createResourceService } from './resourceService.js';

const reports = createResourceService('/laporan');

export const getReports = (options) => reports.list(options);
export const getReportById = (id, options) => reports.getById(id, options);
export const createReport = (payload, options) => reports.create(payload, options);
export const updateReport = (id, payload, options) => reports.update(id, payload, options);
export const deleteReport = (id, options) => reports.remove(id, options);
