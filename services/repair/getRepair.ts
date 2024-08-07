import apiClient from '../auth/axios-interceptor';

const getAllRepairs = async () => {
  try {
    const response = await apiClient.get('/repair');
    console.log('Repair data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed fetching repair data: ', error);
    return [];
  }
};

export { getAllRepairs };
