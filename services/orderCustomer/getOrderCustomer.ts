import apiClient from '../auth/axios-interceptor';

const getAllOrderCustomers = async () => {
  try {
    const response = await apiClient.get('/orderCustomer');
    return response.data;
  } catch (error) {
    console.error('Failed fetching order customer data: ', error);
    return [];
  }
};

export { getAllOrderCustomers };
