import axios from 'axios';

const getAlterationByMfr = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('access_token');

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/inventory/count-alteration`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed fetching alteration data: ', error);
    return [];
  }
};

export { getAlterationByMfr };
