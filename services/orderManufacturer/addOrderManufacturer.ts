import axios from 'axios';
import apiClient from '../auth/axios-interceptor';

// const updateOrderManufacturerById = async (id: number, data: any) => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const token = localStorage.getItem('access_token');

//   if (!apiUrl) {
//     console.error('API URL is not found');
//     return;
//   }

//   try {
//     await axios.patch(`${apiUrl}/order-manufacturer/${id}`, data, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log('Successfully updated order manufacturer');
//     console.log(data);
//   } catch (e) {
//     console.error('Failed to update Order Manufacturer data: ', e);
//   }
// };

// const postOrderManufacturer = async (data: any) => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const token = localStorage.getItem('access_token');

//   if (!apiUrl) {
//     console.error('API URL is not found');
//     return;
//   }

//   try {
//     await axios.post(`${apiUrl}/order-manufacturer`, data, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log('Successfully posted order manufacturer');
//     console.log(data);
//   } catch (e) {
//     console.error('Failed to post Order Manufacturer data: ', e);
//   }
// };

const updateOrderManufacturerById = async (id: number, data: any) => {
  try {
    await apiClient.patch(`/order-manufacturer/${id}`, data);
    console.log('Successfully updated order manufacturer');
    console.log(data);
  } catch (error) {
    console.error('Failed to update order manufacturer data: ', error);
  }
};

const postOrderManufacturer = async (data: any) => {
  try {
    await apiClient.post('/order-manufacturer', data);
    console.log('Successfully posted order manufacturer');
    console.log(data);
  } catch (error) {
    console.error('Failed to post order manufacturer data: ', error);
  }
};

export { updateOrderManufacturerById, postOrderManufacturer };
