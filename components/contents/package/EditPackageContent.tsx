import SubAddBtn from '@/components/buttons/package/SubAddBtn';
import DetailsContent from './DetailsContent';

interface EditPackageContentProps {
  clientCondition: boolean;
  editCondition: boolean;
  loadingCondition: boolean;
  deviceData: (string | number | Date | null)[][];
  packageData: (string | number | Date | null)[][];
  handleRemoveClientBtn: () => void;
  handleUpdateClientBtn: () => void;
  handleUpdateDeviceBtn: () => void;
}

export default function EditPackageContent({
  clientCondition,
  editCondition,
  loadingCondition,
  deviceData,
  packageData,
  handleRemoveClientBtn,
  handleUpdateClientBtn,
  handleUpdateDeviceBtn,
}: EditPackageContentProps) {
  const packageTitle = [
    'Package ID',
    'Client ID',
    'Fitting Date',
    'Warranty Date',
    'Comment',
  ];
  const deviceTitle = [
    'Device ID',
    'Serial Number',
    'Manufacturer',
    'Color',
    'Type',
    'Stock in Date',
    'Sell Date',
    'Package ID',
  ];
  return (
    <div>
      <div>
        {editCondition && (
          <div className="flex justify-end mr-5 gap-2">
            <SubAddBtn
              btnName="Remove Client Info"
              handleClick={handleRemoveClientBtn}
              disabled={!clientCondition}
            />
            <SubAddBtn
              btnName="Update Client"
              handleClick={handleUpdateClientBtn}
            />
          </div>
        )}
        <div>
          <DetailsContent
            header={packageTitle}
            data={packageData}
            title="Package Information"
          />
          {loadingCondition && (
            <div className="text-lg flex justify-center my-2">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
        </div>
      </div>
      <div className="h-24"></div>
      {editCondition && (
        <div className="flex justify-end mr-5">
          <SubAddBtn
            btnName="Update Devices"
            handleClick={handleUpdateDeviceBtn}
          />
        </div>
      )}
      <DetailsContent
        header={deviceTitle}
        data={deviceData}
        title="Device Information"
      />
      {loadingCondition && (
        <div className="text-lg flex justify-center my-2">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  );
}
