'use client';

// import { Manufacturer } from '@/entities/Manufacturer';
import { Manufacturer } from '@/entities/manufacturer';
import { Color } from '@/entities/Color';
import { Type } from '@/entities/Type';
import { Device } from '@/entities/Device';
import { getAllManufacturers } from '@/services/overview/getOverviewManufacturer';
// import { getAllManufacturers } from '@/services/manufacturer/getManufacturer';
import { getAllColors } from '@/services/color/getColor';
import { getAllTypes } from '@/services/type/getType';
import { InvData } from './inventory_page';

const deviceToInv = async (devices: Device[]) => {
  var manufacturers: Manufacturer[] = [];
  var colors: Color[] = [];
  var types: Type[] = [];

  await getAllManufacturers().then((data) => {
    manufacturers = data;
  });

  await getAllColors().then((data) => {
    colors = data;
  });

  await getAllTypes().then((data) => {
    types = data;
  });

  const deviceToInv: InvData[] = devices.map((device) => {
    const manufacturer = manufacturers.find(
      (manufacturer) => manufacturer.id === device.manufacturerId,
    );
    const color = colors.find((color) => color.id === device.colorId);
    const type = types.find((type) => type.id === device.typeId);
    return {
      color: color?.name || 'N/A',
      type: type?.name || 'N/A',
      SN: device.serialNumber || 'N/A',
      model: manufacturer?.name || 'N/A',
      package: device.packageId ? 'Yes' : '',
    };
  });

  return deviceToInv;
};

export { deviceToInv };
