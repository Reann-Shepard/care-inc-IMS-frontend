import AddPackageForm from '@/components/forms/AddPackageForm';

export const metadata = {
  title: 'Add new packages',
};

export default function Alterations() {
  return (
    <div>
      <div className="w-full h-10 my-5 bg-gray-200 font-bold flex justify-center items-center">
        Add new packages
      </div>
      <div className="mt-20 flex justify-center">
        <AddPackageForm />
      </div>
    </div>
  );
}
