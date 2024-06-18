import axios from 'axios';

const getAllInventory = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/inventory`);
    console.log('Inventory data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Inventory data: ', error);
    return [];
  }
};

export { getAllInventory };
