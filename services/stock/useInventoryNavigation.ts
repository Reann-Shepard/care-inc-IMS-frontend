// The function is a custom hook designed to simplify navigation within the inventory section of the application.
import { useRouter } from 'next/navigation';

/**
 * Custom hook to handle inventory navigation.
 *
 * This hook provides a function to navigate to the manufacturer's page
 * for a selected model.
 *
 * @returns An object with a function to push a new URL to the router.
 */

export function useInventoryNavigation() {
  const router = useRouter(); // initialize the router object

  /**
   * Function to navigate to the manufacturer's page based on the selected model.
   *
   * @param selectedModel - The model selected by the user.
   */

  const pushToManufacturer = (selectedModel: string | number) => {
    router.push(`/inventory/model?model=${selectedModel}`); // navigate to the url with the selected model as a query parameter
  };

  // returning the navigation function as an object
  return {
    pushToManufacturer,
  };
}
