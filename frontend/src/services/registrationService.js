// ============================================================
// REGISTRATION SERVICE & CONFIGURATION
// Backend: Connected to Node.js/Express API with Supabase
// ============================================================

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

export const REGISTRATION_CONFIG = {
  // Base backend API URL
  apiBaseUrl: API_BASE_URL,
  apiEndpoint: `${API_BASE_URL}/api/registrations`,
  
  // Optional external registration redirect (leave empty for direct backend API)
  externalRegistrationUrl: '',
  
  // Status flags
  isOpen: true,
  statusNotice: 'LIMITED SEATS AVAILABLE · REGISTRATION OPEN',
  seatsNote: 'Limited seats per track to maintain workshop quality and hands-on interaction.',
};

/**
 * Handle workshop registration submission.
 * Calls backend API with payload verification, error and duplicate handling.
 */
export async function submitRegistration(formData) {
  // If external registration URL is set, direct there
  if (REGISTRATION_CONFIG.externalRegistrationUrl) {
    window.open(REGISTRATION_CONFIG.externalRegistrationUrl, '_blank', 'noopener,noreferrer');
    return {
      success: true,
      redirected: true,
      message: 'Redirecting to official registration portal...',
    };
  }

  const endpoint = REGISTRATION_CONFIG.apiEndpoint;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      // 409 Conflict - duplicate registration
      if (response.status === 409) {
        throw new Error(data.message || data.error || 'This email address is already registered for the workshop.');
      }
      // 400 Bad Request - validation errors
      if (response.status === 400 && data.details && Array.isArray(data.details)) {
        const errorMessages = data.details.map(d => d.message).join(' ');
        throw new Error(errorMessages || data.message || data.error || 'Please check the entered information.');
      }
      // 429 Too Many Requests
      if (response.status === 429) {
        throw new Error(data.message || data.error || 'Too many attempts. Please wait a few minutes before trying again.');
      }

      throw new Error(data.message || data.error || `Registration failed (status ${response.status}). Please try again.`);
    }

    return {
      success: true,
      data: data.data,
      message: data.message || 'Registration successfully confirmed!',
    };
  } catch (error) {
    // If backend is unreachable
    if (error.name === 'TypeError' && error.message.toLowerCase().includes('fetch')) {
      throw new Error(`Unable to reach the registration server at ${endpoint}. Please ensure the backend server is running.`);
    }
    throw error;
  }
}
