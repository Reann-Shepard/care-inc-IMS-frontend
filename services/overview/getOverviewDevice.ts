import apiClient from '../auth/axios-interceptor';

const getDeviceCountByName = async () => {
  try {
    const response = await apiClient.get('/inventory/count-device');
    return response.data;
  } catch (error) {
    console.error('Failed fetching device count data: ', error);
    return [];
  }
};
export { getDeviceCountByName };
