import axios from 'axios';
import apiClient from '../auth/axios-interceptor';

// const getDeviceCountByName = async () => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const token = localStorage.getItem('access_token');

//   if (!apiUrl) {
//     console.error('API URL is not found');
//     return [];
//   }

//   try {
//     const response = await axios.get(`${apiUrl}/inventory/count-device`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Failed fetching Manufacturer data: ', error);
//     return [];
//   }
// };

const getDeviceCountByName = async () => {
  try {
    const response = await apiClient.get('/inventory/count-device');
    return response.data;
  } catch (error) {
    console.error('Failed fetching device count data: ', error);
    return [];
  }
};
export { getDeviceCountByName };
