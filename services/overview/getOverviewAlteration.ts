import axios from 'axios';

const getAlterationByMfr = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/inventory/count-alteration`);
    return response.data;
  } catch (error) {
    console.error('Failed fetching alteration data: ', error);
    return [];
  }
};

export { getAlterationByMfr };
