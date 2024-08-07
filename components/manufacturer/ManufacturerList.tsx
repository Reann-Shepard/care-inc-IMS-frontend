'use client';

import { Manufacturer } from '@/entities/manufacturer';
import { getAllManufacturers } from '@/services/manufacturer/manufacturer-service';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AddBtn from '../buttons/AddBtn';

export default function ManufacturerList() {
  const [data, setData] = useState<Manufacturer[]>([]);

  useEffect(() => {
    const fetchManufacturers = async () => {
      const manufacturers = await getAllManufacturers();
      setData(manufacturers);
    };
    fetchManufacturers();
  }, []);

  const tableHeader = ['ID', 'Company Name', 'Detail'];

  return (
    <>
      <div className="overflow-x-auto mt-5 mx-5">
        <div className="text-right">
          <AddBtn
            pathName="manufacturer/new-manufacturer"
            element="Manufacturer"
          />
        </div>
        <table className="table table-sm border-2 mt-5">
          <thead>
            <tr>
              {tableHeader.map((header, index) => (
                <th key={index} className="text-center text-black bg-gray-200">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((manufacturer) => (
              <tr key={manufacturer.id} className="hover text-center">
                <td>{manufacturer.id}</td>
                <td>{manufacturer.name}</td>
                <td>
                  <Link href={`/manufacturer/${manufacturer.id}`}>
                    <button className="btn btn-sm btn-outline btn-warning">
                      Edit
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
