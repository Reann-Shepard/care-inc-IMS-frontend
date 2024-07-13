import axios from 'axios';

const getAllTypes = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('access_token');

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/type`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed fetching Type data: ', error);
    return [];
  }
};

const getThisTypeName = async (id: number) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('access_token');

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/type/${String(id)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const typeName = response.data.name;
    console.log('Type Id-', id, ' data: ', typeName);
    return typeName;
  } catch (error) {
    console.error('Failed fetching Type Id-', id, ' data: ', error);
    return [];
  }
};

export { getAllTypes, getThisTypeName };
