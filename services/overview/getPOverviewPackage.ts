import axios from 'axios';

const getPackgeCountByMfr = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API Url is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/inventory/count-package`);
    return response.data;
  } catch (e) {
    console.error('Failed fetching Manufacturer data: ', e);
    return [];
  }
};

export { getPackgeCountByMfr };
