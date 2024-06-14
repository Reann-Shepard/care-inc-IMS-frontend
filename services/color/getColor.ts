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

export { getAllColors };
