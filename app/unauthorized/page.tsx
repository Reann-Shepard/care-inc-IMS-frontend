import Image from 'next/image';

export default function Page() {
  return (
    <div className="flex justify-center flex-col items-center mt-8">
      <Image src="/errors/401.png" alt="401" width={583} height={440} />
      <p className="font-semibold mb-3  leading-2 text-center w-700">
        You do not have access to this page
      </p>
    </div>
  );
}
