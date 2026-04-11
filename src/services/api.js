const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class ApiError extends Error {
  constructor(message, status, response) {
    super(message);
    this.status = status;
    this.response = response;
    this.name = 'ApiError';
  }
}

/**
 * Make an API request with automatic Authorization header
 * @param {string} endpoint - API endpoint (e.g., '/api/projects')
 * @param {object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<any>} - JSON response from server
 */
export async function apiCall(endpoint, options = {}) {
  const baseUrl = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('authToken');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  // Add authorization token if it exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(baseUrl, {
      ...options,
      headers
    });

    // Try to parse JSON response
    let data;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // If unauthorized, clear tokens and redirect to signin
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/signin';
      throw new ApiError('Session expired. Please sign in again.', 401, data);
    }

    // Check if response is ok
    if (!response.ok) {
      const errorMessage = data?.message || data || response.statusText;
      throw new ApiError(errorMessage, response.status, data);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // If it's a network error
    throw new ApiError(`Network error: ${error.message}`, 0, null);
  }
}

// Convenience methods for common HTTP verbs

/**
 * GET request
 */
export async function apiGet(endpoint) {
  return apiCall(endpoint, { method: 'GET' });
}

/**
 * POST request
 */
export async function apiPost(endpoint, body) {
  return apiCall(endpoint, {
    method: 'POST',
    body: JSON.stringify(body)
  });
}

/**
 * PUT request
 */
export async function apiPut(endpoint, body) {
  return apiCall(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body)
  });
}

/**
 * DELETE request
 */
export async function apiDelete(endpoint) {
  return apiCall(endpoint, { method: 'DELETE' });
}

/**
 * PATCH request
 */
export async function apiPatch(endpoint, body) {
  return apiCall(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(body)
  });
}
