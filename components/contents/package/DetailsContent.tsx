import React from 'react';
import ListTable from '../../tables/ListTable';

interface detailsContentProps {
  header: string[];
  data?: (string | number | Date | null)[][];
  title: string;
}

export default function DetailsContent({
  header,
  data = [],
  title,
}: detailsContentProps) {
  return (
    <div>
      <div className="flex justify-center">
        <div className="mx-6 my-3 px-5 py-2  w-fit rounded-xl">
          <p className="font-bold underline md:underline-offset-4">{title}</p>
        </div>
      </div>
      <ListTable header={header} data={data} />
    </div>
  );
}
