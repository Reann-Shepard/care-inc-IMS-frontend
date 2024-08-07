import SubAddBtn from '@/components/buttons/package/SubAddBtn';
import DetailsContent from './DetailsContent';

interface EditPackageDeviceContentProps {
  header: string[];
  data?: (string | number | Date | null)[][];
  editData: (string | number | Date | null)[][];
  handRemoveBtn: (index: number) => void;
  handleAddBtn: () => void;
  deviceData: (string | number | Date | null)[][];
}

export default function EditPackageDeviceContent({
  header,
  data,
  editData,
  handRemoveBtn,
  handleAddBtn,
  deviceData,
}: EditPackageDeviceContentProps) {
  return (
    <div>
      <div>
        <div className="flex gap-3 items-end mx-16">
          <div className="flex-grow">
            <DetailsContent header={header} data={data} title="Edit Devices" />
          </div>
          <div>
            <table>
              <tbody>
                {editData.map((device, index) => (
                  <tr key={index}>
                    <td className="pb-1">
                      <SubAddBtn
                        btnName="Remove"
                        handleClick={() => handRemoveBtn(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {deviceData.length < 4 && (
        <div className="flex justify-end mx-16 my-5 gap-5">
          <SubAddBtn btnName="Add Device" handleClick={handleAddBtn} />
        </div>
      )}
    </div>
  );
}
