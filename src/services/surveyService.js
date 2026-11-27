import api from '../api/axiosConfig.js';

export function submitSatisfactionSurvey(survey) {
	return api.post('/survey/add', survey).then((response) => response.data);
}
