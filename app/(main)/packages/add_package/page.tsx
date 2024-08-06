import AddPackageForm from '@/components/forms/AddPackageForm';
import FormBar from '@/components/forms/FormBar';

export const metadata = {
  title: 'Add new packages',
};

export default function AddPackage() {
  return (
    <div>
      <FormBar title="Add New Package" />
      <div className="mt-16 flex justify-center">
        <AddPackageForm deviceListLength={0} />
      </div>
    </div>
  );
}
