import axios from 'axios';

const getAllOrderCustomers = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error('API URL is not found');
    return [];
  }

  try {
    const response = await axios.get(`${apiUrl}/orderCustomer`);
    // console.log('OrderCustomer data: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed fetching OrderCustomer data: ', error);
    return [];
  }
};

export { getAllOrderCustomers };
