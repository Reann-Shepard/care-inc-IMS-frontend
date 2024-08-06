'use client';

import { Type } from '@/entities/Type';
import { getAllTypes } from '@/services/type/getType';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TypeList() {
  const [data, setData] = useState<Type[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const types = await getAllTypes();
      setData(types);
    };

    fetchTypes();
  }, []);

  const tableHeader = ['ID', 'Type', 'Detail'];

  return (
    <>
      <div className="overflow-x-auto mx-10 mt-5">
        <div className="text-right">
          <Link href="type/new-type">
            <button className="btn btn-outline btn-success">Add Type</button>
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
            {data.map((type) => (
              <tr key={type.id} className="hover text-center">
                <td>{type.id}</td>
                <td>{type.name}</td>
                <td>
                  <Link href={`/type/${type.id}`}>
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
