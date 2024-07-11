import Link from 'next/link';

interface AddBtnProps {
  pathName: string;
}

export default function AdBtn({ pathName }: AddBtnProps) {
  return (
    <div>
      <Link
        href={pathName}
        className="btn px-10 font-bold text-white bg-[#54CE50]"
      >
        +
      </Link>
    </div>
  );
}
