import apiClient from '../auth/axios-interceptor';

const getAllDevices = async () => {
  try {
    const response = await apiClient.get('/device');
    return response.data;
  } catch (error) {
    console.error('Failed fetching Device data: ', error);
    return [];
  }
};

export { getAllDevices };
