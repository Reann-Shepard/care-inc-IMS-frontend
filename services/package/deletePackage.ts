import apiClient from '../auth/axios-interceptor';

const deletePackage = async (id: number) => {
  try {
    const response = await apiClient.delete(`/package/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed delete Package data: ', error);
    return [];
  }
};

export { deletePackage };
