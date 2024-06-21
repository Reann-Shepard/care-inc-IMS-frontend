import InputBox from '../inputs/InputBox';
import InputDropdownBox from '../inputs/InputDropdownBox';

interface DeviceDataProps {
  listTitle: string;
  typeData?: string[];
  type: string;
  deviceId: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DeviceFormInAddPackage({
  listTitle,
  typeData,
  type,
  deviceId,
  onChangeHandler,
}: DeviceDataProps) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <p className="text-base font-bold mt-8 mb-3">{listTitle}</p>
            </td>
          </tr>
          <tr>
            <td>
              <InputDropdownBox
                label="Type"
                placeholder="Select device type"
                isRequired
                name="type"
                value={type}
                data={typeData}
                onChangeHandler={onChangeHandler}
              />
            </td>
            <td className="pl-12">
              <InputBox
                label="Device Id"
                placeholder="Enter device ID"
                isRequired
                name="deviceId"
                value={deviceId}
                onChangeHandler={onChangeHandler}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
