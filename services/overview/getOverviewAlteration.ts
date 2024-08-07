import apiClient from '../auth/axios-interceptor';

const getAlterationByMfr = async () => {
  try {
    const response = await apiClient.get('/inventory/count-alteration');
    return response.data;
  } catch (error) {
    console.error('Failed fetching alteration data: ', error);
    return [];
  }
};

export { getAlterationByMfr };
