import Link from 'next/link';
import path from 'path';

interface CancelBtnProps {
  // subBtn?: boolean;
  pathName: string;
  handleClick?: () => void;
}

export default function CancelBtn({ pathName, handleClick }: CancelBtnProps) {
  return (
    <div>
      {pathName === 'subBtn' ? (
        <button className="btn btn-danger" onClick={handleClick}>
          Cancel
        </button>
      ) : (
        <div className="mb-20 btn btn-danger">
          <Link href={pathName}>Cancel</Link>
        </div>
      )}
    </div>
  );
}
