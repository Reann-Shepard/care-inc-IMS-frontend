'use client';

import { Type } from '@/entities/Type';
import { getAllTypes } from '@/services/type/getType';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AddBtn from '../buttons/AddBtn';

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
      <div className="overflow-x-auto mt-5 mx-5">
        <div className="text-right">
          <AddBtn pathName="type/new-type" element="Type" />
        </div>
        <table className="table table-sm border-2 mt-5">
          <thead>
            <tr>
              {tableHeader.map((header, index) => (
                <th key={index} className="text-black text-center bg-gray-200">
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
