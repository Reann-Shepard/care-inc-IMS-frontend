import axios from 'axios';

const getAllClients = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('access_token');

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/client`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Client data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Client data: ', error);
    return [];
  }
};

export { getAllClients };
