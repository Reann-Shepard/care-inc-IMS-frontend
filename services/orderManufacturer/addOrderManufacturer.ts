import apiClient from '../auth/axios-interceptor';

const updateOrderManufacturerById = async (id: number, data: any) => {
  try {
    await apiClient.patch(`/order-manufacturer/${id}`, data);
    console.log('Successfully updated order manufacturer');
    console.log(data);
  } catch (error) {
    console.error('Failed to update order manufacturer data: ', error);
  }
};

const postOrderManufacturer = async (data: any) => {
  try {
    await apiClient.post('/order-manufacturer', data);
    console.log('Successfully posted order manufacturer');
    console.log(data);
  } catch (error) {
    console.error('Failed to post order manufacturer data: ', error);
  }
};

export { updateOrderManufacturerById, postOrderManufacturer };
