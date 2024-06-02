import Card from '@/components/cards/Card';
import ActivityInOverview from '@/components/cards/ActivityInOverview';

interface CategoryData {
  name: string;
  count?: number;
}
export const metadata = {
  title: 'Overview',
};

export default function Overview() {
  // @TODO: Fetch data from api
  const devices: CategoryData[] = [
    {
      name: 'Oticon',
      count: 16,
    },
    {
      name: 'Unitron (V.RS.7)',
      count: 44,
    },
    {
      name: 'Unitron (V.R.7)',
      count: 4,
    },
    {
      name: 'Signia',
      count: 8,
    },
  ];

  const packages: CategoryData[] = [
    {
      name: 'Oticon',
      count: 5,
    },
    {
      name: 'Unitron (V.RS.7)',
      count: 11,
    },
    {
      name: 'Unitron (V.R.7)',
      count: 1,
    },
    {
      name: 'Signia',
      count: 2,
    },
  ];

  const alterations: CategoryData[] = [
    {
      name: 'Oticon',
      count: 0,
    },
    {
      name: 'Unitron (V.RS.7)',
      count: 5,
    },
    {
      name: 'Unitron (V.R.7)',
      count: 0,
    },
    {
      name: 'Signia',
      count: 2,
    },
  ];

  const manufacturers: CategoryData[] = [
    {
      name: 'Oticon',
    },
    {
      name: 'Unitron',
    },
    {
      name: 'Signia',
    },
  ];

  return (
    <div>
      <div className="flex m-10 justify-center">
        <div className="mr-10">
          <Card title="Devices" data={devices} />
          <Card title="Alterations" data={alterations} />
        </div>
        <div>
          <Card title="Total Packages" data={packages} />
          <Card title="Manufacturers" data={manufacturers} />
        </div>
        <ActivityInOverview />
      </div>
    </div>
  );
}

//   <div className="flex m-20 justify-center">
//   <div className="mr-20">
//       <div className="flex">
//           <div className="border border-black w-80 rounded-xl p-4 mr-10 mb-10">
//               <Card title="Devices" data={devices} />
//           </div>
//           <div className="border border-black w-80 rounded-xl p-4 mb-10">
//               <Card title="Total Packages" data={packages} />
//           </div>
//       </div>
//       <div  className="flex justify-between">
//           <div className="border border-black w-80 rounded-xl p-4 mr-10">
//               <Card title="Alterations" data={alterations} />
//           </div>
//           <div className="border border-black w-80 rounded-xl p-4">
//               <Card title="Manufacturers" data={manufacturers} />
//           </div>
//       </div>
//   </div>
//   <div className="border border-black w-80 h-80">

//   </div>
// </div>
