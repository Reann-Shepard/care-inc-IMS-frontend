import React, { memo, useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import InputBox from '../../inputs/InputBox';
import InputDropdownBox from '../../inputs/InputDropdownBox';
import DeviceDetailsInfo from '../../inputs/package/DeviceDetailsInfo';

interface DeviceDataProps {
  index: number;
  listTitle: string;
  deviceType?: string;
  deviceColor?: string;
  deviceManufacturer?: string;
  onClickHandler?: () => void;
}

export default function DeviceFormInAddPackage({
  index,
  listTitle,
  // typeData,
  deviceType,
  deviceColor,
  deviceManufacturer,
  // onChangeHandler=()=>{},
  onClickHandler,
}: DeviceDataProps) {
  const { control } = useFormContext();

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <p className="text-base font-bold mt-8 mb-3">{listTitle}</p>
          </td>
        </tr>
        <tr>
          <td onClick={onClickHandler}>
            <Controller
              control={control}
              name={`devices.${index}.deviceId`}
              defaultValue={''}
              render={({ field }) => (
                <InputBox
                  label="Device ID"
                  placeholder="Enter device ID"
                  isRequired
                  name={`devices.${index}.deviceId`}
                  value={field.value}
                  onChangeHandler={field.onChange}
                />
              )}
              rules={{ required: 'Device ID is required.' }}
            />
          </td>
          <td className="pl-12">
            <DeviceDetailsInfo
              key={index}
              label="Type"
              placeholder="Type"
              value={deviceType || ''}
              index={index}
            />
          </td>
        </tr>
        <tr>
          <td>
            <DeviceDetailsInfo
              key={index}
              label="Color"
              placeholder="Color"
              value={deviceColor || ''}
              index={index}
            />
          </td>
          <td className="pl-12">
            <DeviceDetailsInfo
              key={index}
              label="Manufacturer"
              placeholder="Manufacturer"
              value={deviceManufacturer || ''}
              index={index}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
