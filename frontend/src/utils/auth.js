// frontend/src/utils/auth.js
// Utility functions for authentication and user management

/**
 * Get current user from localStorage
 * @returns {Object|null} User object or null if not logged in
 */
export const getCurrentUser = () => {
    try {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        return null;
    }
};

/**
 * Get auth token from localStorage
 * @returns {string|null} Token or null
 */
export const getToken = () => {
    return localStorage.getItem('token');
};

/**
 * Check if user is logged in
 * @returns {boolean}
 */
export const isLoggedIn = () => {
    return !!getToken() && !!getCurrentUser();
};

/**
 * Check if user is a club type
 * @returns {boolean}
 */
export const isClubUser = () => {
    const user = getCurrentUser();
    return user?.userType === 'club';
};

/**
 * Check if user is a personal type
 * @returns {boolean}
 */
export const isPersonalUser = () => {
    const user = getCurrentUser();
    return user?.userType === 'personal';
};

/**
 * Save user and token to localStorage
 * @param {string} token - JWT token
 * @param {Object} user - User object
 */
export const saveAuth = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Clear authentication data
 */
export const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

/**
 * Logout user and redirect
 * @param {function} navigate - React Router navigate function
 */
export const logout = (navigate) => {
    clearAuth();
    if (navigate) {
        navigate('/');
    }
    window.location.reload();
};

/**
 * Get authorization header for API requests
 * @returns {Object} Headers object
 */
export const getAuthHeader = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Redirect user based on their type
 * @param {function} navigate - React Router navigate function
 * @param {Object} user - User object
 */
export const redirectByUserType = (navigate, user) => {
    if (!user) return;
    
    if (user.userType === 'club') {
        navigate('/club-dashboard');
    } else if (user.userType === 'personal') {
        navigate('/personal-dashboard');
    } else {
        navigate('/');
    }
};

/**
 * Check if user owns a specific club
 * @param {string} clubUserId - User ID from club owner
 * @returns {boolean}
 */
export const ownsClub = (clubUserId) => {
    const user = getCurrentUser();
    return user?.id === clubUserId;
};

/**
 * Format user display name with badge
 * @param {Object} user - User object
 * @returns {string}
 */
export const getUserTypeLabel = (user) => {
    if (!user) return 'Guest';
    return user.userType === 'club' ? 'Club' : 'Member';
};