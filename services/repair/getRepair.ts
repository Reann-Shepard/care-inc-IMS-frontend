import axios from 'axios';
import apiClient from '../auth/axios-interceptor';

// const getAllRepairs = async () => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//   if (!apiUrl) {
//     console.error('API URL is not found');
//     return [];
//   }

//   try {
//     const response = await axios.get(`${apiUrl}/repair`);
//     console.log('Repair data: ', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Failed fetching Type data: ', error);
//     return [];
//   }
// };

const getAllRepairs = async () => {
  try {
    const response = await apiClient.get('/repair');
    console.log('Repair data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed fetching repair data: ', error);
    return [];
  }
};

export { getAllRepairs };
