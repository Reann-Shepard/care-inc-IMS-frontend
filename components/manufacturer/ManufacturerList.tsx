'use client';

import { Manufacturer } from '@/entities/manufacturer';
import { getAllManufacturers } from '@/services/manufacturer/manufacturer-service';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
      <div className="overflow-x-auto mx-10 mt-5">
        <div className="text-right">
          <Link href="manufacturer/new-manufacturer">
            <button className="btn btn-outline btn-success">
              Add Manufacturer
            </button>
          </Link>
        </div>
        <table className="table max-w-3xl mx-auto">
          <thead>
            <tr>
              {tableHeader.map((header, index) => (
                <th key={index} className="text-base text-center bg-gray-300">
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
