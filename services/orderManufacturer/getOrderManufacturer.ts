import axios from 'axios';

const getAllOrderManufacturers = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('access_token');

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/order-manufacturer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.error('Failed fetching Order Manufacturer data: ', e);
    return [];
  }
};

const getOrderManufacturerById = async (id: number) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('access_token');

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/order-manufacturer/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.error('Failed fetching Order Manufacturer data: ', e);
    return [];
  }
};

const checkSerialNumber = async (
  serialNumber: string,
): Promise<string | null> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('access_token');

  if (!apiUrl) {
    console.error('API URL is not found');
    return 'API URL is not found';
  }

  try {
    await axios.get(`${apiUrl}/device/check-serial-number`, {
      params: { serialNumber },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return null;
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      return error.response.data.message;
    }
    throw new Error('An unexpected error occurred');
  }
};

export {
  getAllOrderManufacturers,
  getOrderManufacturerById,
  checkSerialNumber,
};
