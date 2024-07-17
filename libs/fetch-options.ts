import { getAllManufacturers } from '@/services/overview/getOverviewManufacturer';
import { getAllTypes } from '@/services/type/getType';
import { getAllColors } from '@/services/color/getColor';
import { Manufacturer } from '@/entities/manufacturer';
import { Type } from '@/entities/Type';
import { Color } from '@/entities/Color';

export const fetchOptions = async () => {
  const manufacturers = await getAllManufacturers();
  const manufacturerOptions = manufacturers.map(
    (manufacturer: Manufacturer) => ({
      value: manufacturer.id,
      label: manufacturer.name,
    }),
  );

  const types = await getAllTypes();
  const typeOptions = types.map((type: Type) => ({
    value: type.id,
    label: type.name,
  }));

  const colors = await getAllColors();
  const colorOptions = colors.map((color: Color) => ({
    value: color.id,
    label: color.name,
  }));

  return {
    manufacturerOptions,
    typeOptions,
    colorOptions,
  };
};
