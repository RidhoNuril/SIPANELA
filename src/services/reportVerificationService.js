import { createResourceService } from './resourceService.js';

const verifications = createResourceService('/verifikasi-laporan');

export const getReportVerifications = (options) => verifications.list(options);
export const getReportVerificationById = (id, options) => verifications.getById(id, options);
export const createReportVerification = (payload, options) => verifications.create(payload, options);
export const updateReportVerification = (id, payload, options) => verifications.update(id, payload, options);
export const deleteReportVerification = (id, options) => verifications.remove(id, options);
