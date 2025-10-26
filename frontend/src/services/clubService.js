// frontend/src/services/clubService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Fetch all clubs with optional filters
 */
export const getClubs = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.festivalType) {
      params.append('festivalType', filters.festivalType);
    }
    if (filters.email) {
      params.append('email', filters.email);
    }
    
    const response = await axios.get(`${API_URL}/clubs?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching clubs:', error);
    throw error;
  }
};

/**
 * Fetch clubs for specific festival types
 */
export const getClubsForFestival = async (festivalTypes) => {
  try {
    if (!festivalTypes || festivalTypes.length === 0) {
      return [];
    }

    // Fetch clubs for each festival type
    const allClubsPromises = festivalTypes.map(type => 
      getClubs({ festivalType: type })
    );

    const results = await Promise.all(allClubsPromises);
    
    // Flatten and remove duplicates
    const allClubs = results.flat();
    const uniqueClubs = allClubs.filter(
      (club, index, self) => 
        index === self.findIndex(c => c._id === club._id)
    );

    // Filter for approved clubs only
    return uniqueClubs.filter(
      club => !club.status || club.status === 'approved'
    );
  } catch (error) {
    console.error('Error fetching clubs for festival:', error);
    return [];
  }
};

/**
 * Create a new club
 */
export const createClub = async (formData, token) => {
  try {
    const response = await axios.post(`${API_URL}/clubs/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating club:', error);
    throw error;
  }
};

/**
 * Update an existing club
 */
export const updateClub = async (clubId, formData, token) => {
  try {
    const response = await axios.put(`${API_URL}/clubs/${clubId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating club:', error);
    throw error;
  }
};

/**
 * Delete a club
 */
export const deleteClub = async (clubId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/clubs/${clubId}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting club:', error);
    throw error;
  }
};

/**
 * Get club statistics
 */
export const getClubStats = async () => {
  try {
    const clubs = await getClubs();
    
    const stats = {
      total: clubs.length,
      approved: clubs.filter(c => c.status === 'approved').length,
      pending: clubs.filter(c => c.status === 'pending').length,
      byFestival: {}
    };

    // Count clubs by festival type
    clubs.forEach(club => {
      if (club.festivalType) {
        stats.byFestival[club.festivalType] = 
          (stats.byFestival[club.festivalType] || 0) + 1;
      }
    });

    return stats;
  } catch (error) {
    console.error('Error fetching club stats:', error);
    return { total: 0, approved: 0, pending: 0, byFestival: {} };
  }
};