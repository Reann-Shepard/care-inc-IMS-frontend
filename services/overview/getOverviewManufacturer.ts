import apiClient from '../auth/axios-interceptor';

const getAllManufacturers = async () => {
  try {
    const response = await apiClient.get('/manufacturer');
    return response.data;
  } catch (error) {
    console.error('Failed fetching manufacturer data: ', error);
    return [];
  }
};

const getThisManufacturerName = async (id: number) => {
  try {
    const response = await apiClient.get(`/manufacturer/${id}`);
    const manufacturerName = response.data.name;
    return manufacturerName;
  } catch (error) {
    console.error('Failed fetching manufacturer data: ', error);
    return [];
  }
};

export { getAllManufacturers, getThisManufacturerName };
