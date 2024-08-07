import { Type } from '@/entities/Type';
import axios from 'axios';
import apiClient from '../auth/axios-interceptor';

// const getAllTypes = async () => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const token = localStorage.getItem('access_token');

//   if (!apiUrl) {
//     console.error('API URL is not found');
//     return [];
//   }

//   try {
//     const response = await axios.get(`${apiUrl}/type`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Failed fetching Type data: ', error);
//     return [];
//   }
// };

// const getThisTypeName = async (id: number) => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const token = localStorage.getItem('access_token');

//   if (!apiUrl) {
//     console.error('API URL is not found');
//     return [];
//   }

//   try {
//     const response = await axios.get(`${apiUrl}/type/${String(id)}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const typeName = response.data.name;
//     console.log('Type Id-', id, ' data: ', typeName);
//     return typeName;
//   } catch (error) {
//     console.error('Failed fetching Type Id-', id, ' data: ', error);
//     return [];
//   }
// };

// const getTypeById = async (id: number) => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const token = localStorage.getItem('access_token');

//   if (!apiUrl) {
//     console.error('API URL is not found');
//     return null;
//   }

//   try {
//     const response = await axios.get(`${apiUrl}/type/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Failed fetching Type data: ', error);
//     return null;
//   }
// };

// const postType = async (data: Type) => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const token = localStorage.getItem('access_token');

//   if (!apiUrl) {
//     console.error('API URL is not found');
//     return null;
//   }

//   try {
//     const response = await axios.post(`${apiUrl}/type`, data, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Failed fetching Type data: ', error);
//     return null;
//   }
// };

// const updateType = async (id: number, data: Type) => {
//   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
//   const token = localStorage.getItem('access_token');

//   if (!apiUrl) {
//     console.error('API URL is not found');
//     return null;
//   }

//   try {
//     const response = await axios.put(`${apiUrl}/type/${id}`, data, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Failed fetching Type data: ', error);
//     return null;
//   }
// };

const getAllTypes = async () => {
  try {
    const response = await apiClient.get('/type');
    return response.data;
  } catch (error) {
    console.error('Failed fetching Type data: ', error);
    return [];
  }
};

const getThisTypeName = async (id: number) => {
  try {
    const response = await apiClient.get(`/type/${id}`);
    const typeName = response.data.name;
    console.log('Type Id-', id, ' data: ', typeName);
    return typeName;
  } catch (error) {
    console.error('Failed fetching Type Id-', id, ' data: ', error);
    return [];
  }
};

const getTypeById = async (id: number) => {
  try {
    const response = await apiClient.get(`/type/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Type data: ', error);
    return null;
  }
};

const postType = async (data: Type) => {
  try {
    const response = await apiClient.post('/type', data);
    return response.data;
  } catch (error) {
    console.error('Failed creating Type data: ', error);
    return null;
  }
};

const updateType = async (id: number, data: Type) => {
  try {
    const response = await apiClient.put(`/type/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Failed updating Type data: ', error);
    return null;
  }
};

export { getAllTypes, getThisTypeName, getTypeById, postType, updateType };
