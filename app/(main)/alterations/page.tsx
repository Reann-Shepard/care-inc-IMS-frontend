import AlterationsForm from '@/components/form/AlterationsForm';

export const metadata = {
  title: 'Alterations',
};

export default function Alterations() {
  return (
    <div>
      <div className="w-full h-10 my-5 bg-gray-200 "></div>
      <div className="mt-20 flex justify-center">
        <AlterationsForm />
      </div>
    </div>
  );
}
