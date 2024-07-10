import Link from 'next/link';

interface BackBtnProps {
  backToLocation: string;
  currentLocation?: string;
  pathName: string;
}

export default function BackBtn({
  backToLocation,
  currentLocation,
  pathName,
}: BackBtnProps) {
  return (
    <div>
      <div className="mb-5 ml-2">
        <Link href={pathName}>
          <button className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17l-7-5 7-5"
              />
            </svg>
            {backToLocation} {currentLocation ? ` / ${currentLocation}` : ''}
          </button>
        </Link>
      </div>
    </div>
  );
}
