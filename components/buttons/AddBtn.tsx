import Link from 'next/link';

interface AddBtnProps {
  pathName: string;
  element: string;
}

export default function AddBtn({ pathName, element }: AddBtnProps) {
  return (
    <div>
      <Link href={pathName}>
        <button className="btn btn-outline btn-success">+ Add {element}</button>
      </Link>
    </div>
  );
}
