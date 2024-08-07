import axios from 'axios';
import apiClient from '../auth/axios-interceptor';

// const getAllOrderCustomers = async () => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const token = localStorage.getItem('access_token');

//   if (!apiUrl) {
//     console.error('API URL is not found');
//     return [];
//   }

//   try {
//     const response = await axios.get(`${apiUrl}/orderCustomer`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     // console.log('OrderCustomer data: ', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Failed fetching OrderCustomer data: ', error);
//     return [];
//   }
// };

const getAllOrderCustomers = async () => {
  try {
    const response = await apiClient.get('/orderCustomer');
    return response.data;
  } catch (error) {
    console.error('Failed fetching order customer data: ', error);
    return [];
  }
};

export { getAllOrderCustomers };
