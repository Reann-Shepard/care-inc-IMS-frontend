import { useRouter } from 'next/navigation';

export function usePackageNavigation() {
  const router = useRouter();

  const pushToPackageId = (selectedId: string | number) => {
    router.push(`/packages/package_id?package_id=${selectedId}`);
  };

  return {
    pushToPackageId,
  };
}
