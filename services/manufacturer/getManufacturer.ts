import axios from 'axios';

const getAllManufacturers = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/manufacturer`);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Manufacturer data: ', error);
    return [];
  }
};

export { getAllManufacturers };
