import InputDropdownBox from '../inputs/InputDropdownBox';
import InputDateBox from '../inputs/InputDateBox';
import InputTextareaBox from '../inputs/InputTextareaBox';

interface ClientPackageDataProps {
  clientIDValue: string;
  clientsData: number[];
  fittingDateValue: string;
  warrantyDateValue: string;
  commentValue: string;
  onChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function ClientPackageForm({
  clientIDValue,
  clientsData,
  fittingDateValue,
  warrantyDateValue,
  commentValue,
  onChangeHandler,
}: ClientPackageDataProps) {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <InputDropdownBox
              label="Client"
              placeholder="Select client"
              isRequired
              name="clientID"
              value={clientIDValue}
              data={clientsData}
              onChangeHandler={onChangeHandler}
            />
          </td>
        </tr>
        <tr>
          <td>
            <InputDateBox
              label="Fitting Date"
              placeholder="Select date"
              isRequired
              name="fittingDate"
              value={fittingDateValue}
              onChangeHandler={onChangeHandler}
            />
          </td>
          <td className="pl-12">
            <InputDateBox
              label="Warranty Expiration"
              placeholder="Select date"
              isRequired
              name="warrantyDate"
              value={warrantyDateValue}
              onChangeHandler={onChangeHandler}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <InputTextareaBox
              label="Comments"
              placeholder="Enter comments"
              isRequired
              name="comment"
              value={commentValue}
              onChangeHandler={onChangeHandler}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
