import Card from '@/components/cards/Card';
import ActivitiesInOverview from '@/components/cards/ActivitiesInOverview';
import ManufacturerList from './overview/ManufacturerList';
import DeviceList from './overview/DeviceList';
import PackageList from './overview/PackageList';
import AlterationList from './overview/AlterationList';

interface CategoryData {
  name: string;
  count?: number;
}

export default function OverviewContent() {
  return (
    <div>
      <div className="flex m-10 justify-center">
        <div className="mr-10">
          <DeviceList />
          <AlterationList />
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
