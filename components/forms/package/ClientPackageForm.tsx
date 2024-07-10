import React, { memo } from 'react';
import InputDropdownBox from '../../inputs/InputDropdownBox';
import InputDateBox from '../../inputs/InputDateBox';
import InputTextareaBox from '../../inputs/InputTextareaBox';
import { Controller, UseFormRegister, useFormContext } from 'react-hook-form';

interface ClientPackageDataProps {
  clientsData: number[];
  onChangeHandler?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export default function ClientPackageForm({
  clientsData,
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
              defaultValue={''}
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
              defaultValue={''}
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
              defaultValue={''}
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
              defaultValue={''}
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
