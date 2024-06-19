import Card from '@/components/cards/Card';
import ActivitiesInOverview from '@/components/cards/ActivitiesInOverview';
import ManufacturerList from './overview/ManufacturerList';
import DeviceList from './overview/DeviceList';
import PackageList from './overview/PackageList';

interface CategoryData {
  name: string;
  count?: number;
}

export default function OverviewContent() {
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

  // @TODO: Fetch data from api
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

  // @TODO: Fetch data from api
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

  // @TODO: Fetch data from api
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
          <DeviceList />
          <Card title="Alterations" data={alterations} />
        </div>
        <div>
          <PackageList />
          <ManufacturerList />
        </div>
        <ActivitiesInOverview />
      </div>
    </div>
  );
}
