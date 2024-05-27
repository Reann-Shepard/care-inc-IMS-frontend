import Card from '@/components/cards/Card';

interface CategoryData {
  name: string;
  count?: number;
}

export default function Overview() {
  const title = 'Overview';
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
        <div className="rounded-xl border-4 ml-20 m-10 border-black w-96">
          <p className="text-xl font-bold p-4 rounded-t-lg bg-[#FFB931]">
            Recent Activities
          </p>
          <div className="border-b-2 border-black bg-white pt-2">
            <div className="bg-slate-200 p-4 rounded-xl m-4">
              <p className="text-lg font-bold">New Device added</p>
              <p className="text-sm">Details</p>
            </div>
            <div className="bg-slate-200 p-4 rounded-xl m-4">
              <p className="text-lg font-bold">Device updated</p>
              <p className="text-sm">Details</p>
            </div>
          </div>
          <div className="border-b-2 h-36 p-4 border-black bg-white">
            <p className="font-bold text-xl">Device Assigned</p>
            <p className="text-sm">Pre-package</p>
          </div>
          <div className="border-b-2 h-36 p-4 mb-2 border-black bg-white">
            <p className="font-bold text-xl">New Device Added</p>
            <p className="text-sm">Details</p>
          </div>
        </div>
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
