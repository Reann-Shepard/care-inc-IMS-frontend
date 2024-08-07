import axios from 'axios';
import apiClient from '../auth/axios-interceptor';

// const getAllManufacturers = async () => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const token = localStorage.getItem('access_token');

//   if (!apiUrl) {
//     console.error('API URL is not found');
//     return [];
//   }

//   try {
//     const response = await axios.get(`${apiUrl}/manufacturer`, {
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

// const getThisManufacturerName = async (id: number) => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const token = localStorage.getItem('access_token');

//   if (!apiUrl) {
//     console.error('API URL is not found');
//     return [];
//   }

//   try {
//     const response = await axios.get(`${apiUrl}/manufacturer/${String(id)}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const manufacturerName = response.data.name;
//     return manufacturerName;
//   } catch (error) {
//     console.error('Failed fetching Manufacturer data: ', error);
//     return [];
//   }
// };

const getAllManufacturers = async () => {
  try {
    const response = await apiClient.get('/manufacturer');
    return response.data;
  } catch (error) {
    console.error('Failed fetching manufacturer data: ', error);
    return [];
  }
};

const getThisManufacturerName = async (id: number) => {
  try {
    const response = await apiClient.get(`/manufacturer/${id}`);
    const manufacturerName = response.data.name;
    return manufacturerName;
  } catch (error) {
    console.error('Failed fetching manufacturer data: ', error);
    return [];
  }
};

export { getAllManufacturers, getThisManufacturerName };
