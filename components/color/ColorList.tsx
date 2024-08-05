'use client';

import { Color } from '@/entities/Color';
import { getAllColors } from '@/services/color/getColor';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AddBtn from '../buttons/AddBtn';

export default function ColorList() {
  const [data, setData] = useState<Color[]>([]);

  useEffect(() => {
    const fetchColors = async () => {
      const colors = await getAllColors();
      setData(colors);
    };

    fetchColors();
  }, []);

  const tableHeader = ['ID', 'Color Name', 'Detail'];

  return (
    <>
      <div className="overflow-x-auto mt-5">
        <div className="text-right mx-10">
          <AddBtn pathName="color/new-color" element="Color" />
        </div>
        <table className="table mt-5">
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
            {data.map((color) => (
              <tr key={color.id} className="hover text-center">
                <td>{color.id}</td>
                <td>{color.name}</td>
                <td>
                  <Link href={`/color/${color.id}`}>
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
