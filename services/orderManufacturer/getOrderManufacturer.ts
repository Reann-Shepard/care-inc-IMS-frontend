import apiClient from '../auth/axios-interceptor';

const getAllOrderManufacturers = async () => {
  try {
    const response = await apiClient.get('/order-manufacturer');
    return response.data;
  } catch (error) {
    console.error('Failed fetching order manufacturer data: ', error);
    return [];
  }
};

const getOrderManufacturerById = async (id: number) => {
  try {
    const response = await apiClient.get(`/order-manufacturer/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed fetching order manufacturer data: ', error);
    return [];
  }
};

const checkSerialNumber = async (
  serialNumber: string,
): Promise<string | null> => {
  try {
    await apiClient.get('/device/check-serial-number', {
      params: { serialNumber },
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
