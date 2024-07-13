import { Package } from '@/entities/Package';
import axios from 'axios';

const getAllPackages = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('access_token');

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/package`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('Package data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Package data: ', error);
    return [];
  }
};

const getPackageById = async (id: number) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('access_token');

  if (!apiUrl) {
    console.error('API URL is not found');
    return null;
  }

  try {
    const response = await axios.get(`${apiUrl}/package/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('Package data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Package data: ', error);
    return null;
  }
};

const getAllPackagesSortedFiltered = async (sortBy = '', filterBy = {}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('access_token');

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/package/sorted-filtered`, {
      params: {
        sortBy,
        ...filterBy,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('Package data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Package data: ', error);
    return [];
  }
};

export { getAllPackages, getPackageById, getAllPackagesSortedFiltered };
