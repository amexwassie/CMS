import axios from 'axios';

export const fetchDepartments = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/auth/departments'); // Correct endpoint
    return response.data; // This should return an array of department names
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error; // Rethrow to handle in the component
  }
};