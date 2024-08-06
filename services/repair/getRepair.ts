import axios from 'axios';

const getAllRepairs = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('access_token');

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/repair`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Repair data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Type data: ', error);
    return [];
  }
};

export { getAllRepairs };
