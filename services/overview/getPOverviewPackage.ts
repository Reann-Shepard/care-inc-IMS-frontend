import axios from 'axios';
import apiClient from '../auth/axios-interceptor';

// const getPackgeCountByMfr = async () => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const token = localStorage.getItem('access_token');

//   if (!apiUrl) {
//     console.error('API Url is not found');
//     return [];
//   }

//   try {
//     const response = await axios.get(`${apiUrl}/inventory/count-package`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (e) {
//     console.error('Failed fetching Manufacturer data: ', e);
//     return [];
//   }
// };

const getPackgeCountByMfr = async () => {
  try {
    const response = await apiClient.get('/inventory/count-package');
    return response.data;
  } catch (error) {
    console.error(
      'Failed fetching package count by manufacturer data: ',
      error,
    );
    return [];
  }
};

export { getPackgeCountByMfr };
