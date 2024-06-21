import axios from 'axios';

const getAllDevices = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/device`);
    console.log('Device data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Device data: ', error);
    return [];
  }
};

export { getAllDevices };
