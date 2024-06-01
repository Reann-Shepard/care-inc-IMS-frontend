import InputBox from '../inputs/InputBox';
import InputDropdownBox from '../inputs/InputDropdownBox';

interface DeviceData {
  listTitle: string;
  typeData?: string[];
  type: string;
  deviceId: string;
  serialNumber1: string;
  serialNumber2?: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DeviceFormInAddPackage({
  listTitle,
  typeData,
  type,
  deviceId,
  serialNumber1,
  serialNumber2,
  onChangeHandler,
}: DeviceData) {
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
          <tr>
            <td>
              <InputBox
                label="Serial Number 1"
                placeholder="Enter serial number"
                isRequired
                name="serialNumber1"
                value={serialNumber1}
                onChangeHandler={onChangeHandler}
              />
            </td>
            <td className="pl-12">
              <InputBox
                label="Serial Number 2"
                placeholder="Enter serial number"
                name="serialNumber2"
                value={serialNumber2}
                onChangeHandler={onChangeHandler}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
