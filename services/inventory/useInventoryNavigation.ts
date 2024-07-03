import { useRouter } from 'next/navigation';

export function useInventoryNavigation() {
  const router = useRouter();

  const pushToManufacturer = (selectedModel: string) => {
    router.push(`/inventory/model?model=${selectedModel}`);
  };

  return {
    pushToManufacturer,
  };
}
