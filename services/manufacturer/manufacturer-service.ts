import { Manufacturer } from '@/entities/manufacturer';
import axios from 'axios';

const getAllManufacturers = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('access_token');

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/manufacturer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed fetching Manufacturer data: ', error);
    return [];
  }
};

const getManufacturerById = async (id: number) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('access_token');

  if (!apiUrl) {
    console.error('API URL is not found');
    return null;
  }

  try {
    const response = await axios.get(`${apiUrl}/manufacturer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed fetching Manufacturer data: ', error);
    return null;
  }
};

const postManufacturer = async (data: Manufacturer) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('access_token');

  if (!apiUrl) {
    console.error('API URL is not found');
    return null;
  }

  try {
    const response = await axios.post(`${apiUrl}/manufacturer`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed creating Manufacturer data: ', error);
    return null;
  }
};

const updateManufacturer = async (id: number, data: Manufacturer) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('access_token');

  if (!apiUrl) {
    console.error('API URL is not found');
    return null;
  }

  try {
    const response = await axios.put(`${apiUrl}/manufacturer/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed updating Manufacturer data: ', error);
    return null;
  }
};

export {
  getAllManufacturers,
  getManufacturerById,
  postManufacturer,
  updateManufacturer,
};
