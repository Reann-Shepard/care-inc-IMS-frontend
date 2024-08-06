import React, { memo } from 'react';
import InputDropdownBox from '../../inputs/InputDropdownBox';
import InputDateBox from '../../inputs/InputDateBox';
import InputTextareaBox from '../../inputs/InputTextareaBox';
import { Controller, UseFormRegister, useFormContext } from 'react-hook-form';

interface ClientPackageDataProps {
  clientsData: number[];
  clientInfo?: {
    clientId: string;
    fittingDate: string;
    warrantyDate: string;
    comment?: string;
  };
  onChangeHandler?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function ClientPackageForm({
  clientsData,
  clientInfo = {
    clientId: '',
    fittingDate: '',
    warrantyDate: '',
    comment: '',
  },
  onChangeHandler = () => {},
}: ClientPackageDataProps) {
  const { control } = useFormContext();

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <Controller
              control={control}
              name="clientId"
              defaultValue={clientInfo.clientId}
              render={({ field }) => (
                <InputDropdownBox
                  label="Client ID"
                  placeholder="Select client ID"
                  name="clientId"
                  data={clientsData}
                  value={field.value}
                  onChangeHandler={field.onChange}
                  isRequired
                />
              )}
              rules={{ required: true }}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Controller
              control={control}
              name="fittingDate"
              defaultValue={clientInfo.fittingDate}
              render={({ field }) => (
                <InputDateBox
                  label="Fitting Date"
                  placeholder="Select date"
                  name="fittingDate"
                  value={field.value}
                  onChangeHandler={field.onChange}
                  isRequired
                />
              )}
              rules={{ required: true }}
            />
          </td>
          <td className="pl-12">
            <Controller
              control={control}
              name="warrantyDate"
              defaultValue={clientInfo.warrantyDate}
              render={({ field }) => (
                <InputDateBox
                  label="Warranty Date"
                  placeholder="Select date"
                  name="warrantyDate"
                  value={field.value}
                  onChangeHandler={field.onChange}
                  isRequired
                />
              )}
              rules={{ required: true }}
            />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <Controller
              control={control}
              name="comment"
              defaultValue={clientInfo.comment && clientInfo.comment}
              render={({ field }) => (
                <InputTextareaBox
                  label="Comment"
                  placeholder="Enter comment"
                  name="comment"
                  value={field.value}
                  onChangeHandler={field.onChange}
                />
              )}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
