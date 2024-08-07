import { Manufacturer } from '@/entities/manufacturer';
import apiClient from '../auth/axios-interceptor';

const getAllManufacturers = async () => {
  try {
    const response = await apiClient.get('/manufacturer');
    return response.data;
  } catch (error) {
    console.error('Failed fetching Manufacturer data: ', error);
    return [];
  }
};

const getManufacturerById = async (id: number) => {
  try {
    const response = await apiClient.get(`/manufacturer/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Manufacturer data: ', error);
    return null;
  }
};

const postManufacturer = async (data: Manufacturer) => {
  try {
    const response = await apiClient.post('/manufacturer', data);
    return response.data;
  } catch (error) {
    console.error('Failed creating Manufacturer data: ', error);
    return null;
  }
};

const updateManufacturer = async (id: number, data: Manufacturer) => {
  try {
    const response = await apiClient.put(`/manufacturer/${id}`, data);
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
