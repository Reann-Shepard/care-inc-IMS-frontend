import { Color } from '@/entities/Color';
import apiClient from '../auth/axios-interceptor';

const getAllColors = async () => {
  try {
    const response = await apiClient.get('/color');
    return response.data;
  } catch (error) {
    console.error('Failed fetching Color data: ', error);
    return [];
  }
};

const getThisColorName = async (id: number) => {
  try {
    const response = await apiClient.get(`/color/${id}`);
    const colorName = response.data.name;
    console.log('Color Id-', id, ' data: ', colorName);
    return colorName;
  } catch (error) {
    console.error('Failed fetching Color Id-', id, ' data: ', error);
    return [];
  }
};

const getColorById = async (id: number) => {
  try {
    const response = await apiClient.get(`/color/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Color data: ', error);
    return null;
  }
};

const postColor = async (data: Color) => {
  try {
    const response = await apiClient.post('/color', data);
    return response.data;
  } catch (error) {
    console.error('Failed creating Color data: ', error);
    return null;
  }
};

const updateColor = async (id: number, data: Color) => {
  try {
    const response = await apiClient.put(`/color/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Failed updating Color data: ', error);
    return null;
  }
};

export { getAllColors, getThisColorName, getColorById, postColor, updateColor };
