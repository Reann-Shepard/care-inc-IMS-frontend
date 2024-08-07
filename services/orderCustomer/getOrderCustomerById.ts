import apiClient from '../auth/axios-interceptor';

const getThisOrderCustomer = async (id: number) => {
  try {
    const response = await apiClient.get(`/orderCustomer/${id}`);
    console.log('OrderCustomer Id-', id, ' data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed fetching OrderCustomer Id-', id, ' data: ', error);
    return [];
  }
};

export { getThisOrderCustomer };
