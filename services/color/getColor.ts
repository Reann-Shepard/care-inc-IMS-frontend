import axios from 'axios';

const getAllColors = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/color`);
    console.log('Color data: ', response.data);
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

export { getAllColors, getThisColorName };
