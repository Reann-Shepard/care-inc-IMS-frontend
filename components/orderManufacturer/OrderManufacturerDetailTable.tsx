import { useEffect, useState } from 'react';
import { OrderManufacturer } from '@/entities/order-manufacturer';
import { OrderManufacturerTextInput } from './OrderManufacturerTextInput';
import { useSearchParams } from 'next/navigation';
import { fetchOptions } from '@/libs/fetch-options';
import { OrderManufacturerDropdown } from './OrderManufacturerDropdown';

interface OrderManufacturerDetailTableProps {
  orderManufacturer: OrderManufacturer;
}

const OrderManufacturerDetailTable: React.FC<
  OrderManufacturerDetailTableProps
> = ({ orderManufacturer }) => {
  const [selected, setSelected] = useState<number[]>([]);
  const [typeOptions, setTypeOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [colorOptions, setColorOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const searchParams = useSearchParams();
  const delivered = searchParams.get('delivered') === 'true';

  const handleCheckboxChange = (index: number) => {
    setSelected((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index],
    );
  };

  const handleSelectAllChange = () => {
    if (orderManufacturer) {
      if (selected.length === orderManufacturer.OrderDevices.length) {
        setSelected([]);
      } else {
        const allIndexes = orderManufacturer.OrderDevices.map(
          (_, index) => index,
        );
        setSelected(allIndexes);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const options = await fetchOptions();

      setTypeOptions(options.typeOptions);
      setColorOptions(options.colorOptions);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="flex m-2 gap-3">
        <span>Manufacturer: </span>
        <OrderManufacturerTextInput
          name={`OrderDevices[0].device.manufacturer.name`}
          disabled={true}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={
                    orderManufacturer &&
                    selected.length === orderManufacturer.OrderDevices.length
                  }
                  onChange={handleSelectAllChange}
                />
              </label>
            </th>
            <th>Type</th>
            <th>Color</th>
            <th>Serial Number</th>
          </tr>
        </thead>
        <tbody>
          {orderManufacturer && orderManufacturer.OrderDevices.length > 0 ? (
            orderManufacturer.OrderDevices.map((_, index) => (
              <tr key={index} className="hover">
                <td>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={selected.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </label>
                </td>
                <td>
                  <OrderManufacturerDropdown
                    name={`OrderDevices[${index}].device.typeId`}
                    options={typeOptions}
                    disabled={delivered}
                  />
                </td>
                <td>
                  <OrderManufacturerDropdown
                    name={`OrderDevices[${index}].device.colorId`}
                    options={colorOptions}
                    disabled={delivered}
                  />
                </td>
                <td>
                  <OrderManufacturerTextInput
                    name={`OrderDevices[${index}].device.serialNumber`}
                    required
                    disabled={delivered}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No Order Devices found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export { OrderManufacturerDetailTable };
