import axios from 'axios';
import apiClient from '../auth/axios-interceptor';

// const getAlterationByMfr = async () => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const token = localStorage.getItem('access_token');

//   if (!apiUrl) {
//     console.error('API URL is not found');
//     return [];
//   }

//   try {
//     const response = await axios.get(`${apiUrl}/inventory/count-alteration`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Failed fetching alteration data: ', error);
//     return [];
//   }
// };

const getAlterationByMfr = async () => {
  try {
    const response = await apiClient.get('/inventory/count-alteration');
    return response.data;
  } catch (error) {
    console.error('Failed fetching alteration data: ', error);
    return [];
  }
};

export { getAlterationByMfr };
