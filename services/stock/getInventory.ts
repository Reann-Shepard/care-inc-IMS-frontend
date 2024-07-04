import axios from 'axios';

const API_URL = 'http://localhost:3000/inventory';
export const getAllInventory = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory', error);
    throw error;
  }
};
