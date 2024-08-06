// The function is used to add new inventory data to the server by making a POST request to the server.

import axios from 'axios'; // For making HTTP requests

import { newInventoryInputData } from '@/components/forms/AddInventoryForm'; // Type definition for new inventory input data
import { getAllManufacturers } from '../overview/getOverviewManufacturer';
import { getAllColors } from '../color/getColor';
import { getAllTypes } from '../type/getType';
import { Manufacturer } from '@/entities/manufacturer';
import { Color } from '@/entities/Color';
import { Type } from '@/entities/Type';

/**
 * Function to post new inventory data to the server.
 *
 * @param data - The new inventory data to be posted, which includes serial number, stock date, color, manufacturer, and type.
 */

const postInventory = async (data: newInventoryInputData) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // API URL from environment variables
  const token = localStorage.getItem('access_token'); // Access token from local storage
  // Fetching all manufacturers, colors, and types from the server to get their IDs
  const manufacturerList: Manufacturer[] = await getAllManufacturers();
  const colorList: Color[] = await getAllColors();
  const typeList: Type[] = await getAllTypes();

  if (!apiUrl) {
    // Check if API URL is defined
    console.error('API URL is not found'); // Log error if API URL is not found
    return []; // Return empty array
  }

  // Constructing the inventory data object to be posted
  const inventoryData = {
    serialNumber: data.serialNumber,
    stockInDate: new Date(data.stockDate).toISOString(),
    // Finding the ID of the color, manufacturer, and type from the list of colors, manufacturers, and types
    color: Number(colorList.find((color) => color.name === data.color)?.id),
    manufacturerId: Number(
      manufacturerList.find(
        (manufacturer) => manufacturer.name === data.manufacturer,
      )?.id,
    ),
    typeId: Number(typeList.find((type) => type.name === data.type)?.id),
  };

  console.log('Inventory data to be added: ', inventoryData); // Log the inventory data to be added

  try {
    // Making a POST request to the server to add new inventory
    // const response = await axios.post(`${apiUrl}/inventory`, inventoryData);
    const response = await axios.post(
      `${apiUrl}/inventory/add_inventory`,
      inventoryData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send the access token with the request
        },
      },
    );
    console.log('New device added: ', response.data); // Log the response data
  } catch (error) {
    console.error('Error adding device: ', error); // Log error if there is an error adding inventory
  }
};

export { postInventory }; // Export the postInventory function to be used in other files
