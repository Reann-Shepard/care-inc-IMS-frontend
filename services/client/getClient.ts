import apiClient from '../auth/axios-interceptor';

const getAllClients = async () => {
  try {
    const response = await apiClient.get('/client');
    console.log('Client data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed fetching Client data: ', error);
    return [];
  }
};

export { getAllClients };
