import Link from 'next/link';

interface CancelBtnProps {
  pathName: string;
}

export default function CancelBtn({ pathName }: CancelBtnProps) {
  return (
    <div>
      <div className="mb-20 btn btn-danger">
        <Link href={pathName}>Cancel</Link>
      </div>
    </div>
  );
}
