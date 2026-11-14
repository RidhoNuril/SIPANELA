const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/+$/, '');

function relayAbortSignal(signal) {
	if (!signal) {
		return { signal: undefined, cleanup: () => {} };
	}

	const controller = new AbortController();
	const abortRequest = () => controller.abort(signal.reason);

	if (signal.aborted) {
		abortRequest();
	} else {
		signal.addEventListener('abort', abortRequest, { once: true });
	}

	return {
		signal: controller.signal,
		cleanup: () => signal.removeEventListener('abort', abortRequest),
	};
}

async function readResponseBody(response) {
	const body = await response.text();

	if (!body) {
		return null;
	}

	try {
		return JSON.parse(body);
	} catch {
		return body;
	}
}

function getErrorMessage(body, status, statusText) {
	if (typeof body === 'string' && body.trim()) {
		return body;
	}

	if (body && typeof body === 'object') {
		const message = body.message || body.error || body.detail;
		if (typeof message === 'string' && message.trim()) {
			return message;
		}
	}

	return `Permintaan API gagal (${status}${statusText ? ` ${statusText}` : ''}).`;
}

export async function apiRequest(path, { method = 'GET', body, signal, headers = {} } = {}) {
	const abort = relayAbortSignal(signal);

	try {
		const requestHeaders = new Headers(headers);
		const token = typeof localStorage !== 'undefined' ? localStorage.getItem('accessToken') : null;
		const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

		if (!isFormData && !requestHeaders.has('Content-Type')) {
			requestHeaders.set('Content-Type', 'application/json');
		}

		if (token) {
			requestHeaders.set('Authorization', `Bearer ${token}`);
		}

		const response = await fetch(`${API_BASE_URL}${path}`, {
			method,
			headers: requestHeaders,
			body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
			signal: abort.signal,
		});
		const responseBody = await readResponseBody(response);

		if (!response.ok) {
			throw new Error(getErrorMessage(responseBody, response.status, response.statusText));
		}

		return responseBody;
	} catch (error) {
		if (error instanceof Error && error.name === 'AbortError') {
			throw error;
		}

		const message = error instanceof Error ? error.message : 'Kesalahan tidak diketahui.';
		throw new Error(`Gagal mengakses API: ${message}`, { cause: error });
	} finally {
		abort.cleanup();
	}
}
