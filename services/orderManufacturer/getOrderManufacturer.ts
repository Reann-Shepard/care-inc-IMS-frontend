import axios from 'axios';

const getAllOrderManufacturers = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/order-manufacturer`);
    return response.data;
  } catch (e) {
    console.error('Failed fetching Order Manufacturer data: ', e);
    return [];
  }
};

export { getAllOrderManufacturers };
