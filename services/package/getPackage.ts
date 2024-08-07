import apiClient from '../auth/axios-interceptor';

const getAllPackages = async () => {
  try {
    const response = await apiClient.get('/package');
    return response.data;
  } catch (error) {
    console.error('Failed fetching package data: ', error);
    return [];
  }
};

const getPackageById = async (id: number) => {
  try {
    const response = await apiClient.get(`/package/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed fetching package data: ', error);
    return null;
  }
};

const getAllPackagesSortedFiltered = async (sortBy = '', filterBy = {}) => {
  try {
    const response = await apiClient.get('/package/sorted-filtered', {
      params: {
        sortBy,
        ...filterBy,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed fetching package data: ', error);
    return [];
  }
};

export { getAllPackages, getPackageById, getAllPackagesSortedFiltered };
