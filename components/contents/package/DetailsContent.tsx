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
        <div className="mx-6 mb-3 px-5 pb-2  w-fit rounded-xl">
          <p className="font-bold underline md:underline-offset-4">{title}</p>
        </div>
      </div>
      <ListTable header={header} data={data} />
    </div>
  );
}
