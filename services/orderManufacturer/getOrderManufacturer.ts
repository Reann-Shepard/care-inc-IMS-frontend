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

const checkSerialNumber = async (serialNumber: string): Promise<boolean> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = localStorage.getItem('access_token');

  if (!apiUrl) {
    console.error('API URL is not found');
    return false;
  }

  try {
    await axios.get(`${apiUrl}/device/check-serial-number`, {
      params: { serialNumber },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return false;
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      return true;
    }
    throw error;
  }
};

export {
  getAllOrderManufacturers,
  getOrderManufacturerById,
  checkSerialNumber,
};
