import apiClient from '../auth/axios-interceptor';

const getPackgeCountByMfr = async () => {
  try {
    const response = await apiClient.get('/inventory/count-package');
    return response.data;
  } catch (error) {
    console.error(
      'Failed fetching package count by manufacturer data: ',
      error,
    );
    return [];
  }
};

export { getPackgeCountByMfr };
