import { createResourceService } from './resourceService.js';

const evidence = createResourceService('/bukti-pendukung');

export const getReportEvidence = (options) => evidence.list(options);
export const getReportEvidenceById = (id, options) => evidence.getById(id, options);
export const createReportEvidence = (payload, options) => evidence.create(payload, options);
export const updateReportEvidence = (id, payload, options) => evidence.update(id, payload, options);
export const deleteReportEvidence = (id, options) => evidence.remove(id, options);
