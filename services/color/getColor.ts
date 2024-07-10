import { Color } from '@/entities/Color';
import axios from 'axios';

const getAllColors = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/color`);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Color data: ', error);
    return [];
  }
};

const getThisColorName = async (id: number) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/color/${String(id)}`);
    const colorName = response.data.name;
    console.log('Color Id-', id, ' data: ', colorName);
    return colorName;
  } catch (error) {
    console.error('Failed fetching Color Id-', id, ' data: ', error);
    return [];
  }
};

const getColorById = async (id: number) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error('API URL is not found');
    return null;
  }

  try {
    const response = await axios.get(`${apiUrl}/color/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Color data: ', error);
    return null;
  }
};

const postColor = async (data: Color) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API URL is not found');
    return null;
  }

  try {
    const response = await axios.post(`${apiUrl}/color`, data);
    return response.data;
  } catch (error) {
    console.error('Failed creating Color data: ', error);
    return null;
  }
};

const updateColor = async (id: number, data: Color) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API URL is not found');
    return null;
  }

  try {
    const response = await axios.put(`${apiUrl}/color/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Failed updating Color data: ', error);
    return null;
  }
};

export { getAllColors, getThisColorName, getColorById, postColor, updateColor };
