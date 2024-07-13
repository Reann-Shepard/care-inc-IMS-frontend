import LoginForm from '@/components/auth/LoginForm';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-between bg-gray-900 min-h-screen">
      <div className="my-auto flex flex-col items-center">
        <div
          className="mb-8 relative w-[400px] h-[120px]"
          style={{ position: 'relative' }}
        >
          <Image
            src="/logos/logo_big.png"
            sizes="400px 120px"
            fill
            style={{ objectFit: 'contain' }}
            alt="logo_big"
          />
        </div>
        <div className="mb-11">
          <span className="text-white text-4xl font-normal">
            INVENTORY MANAGEMENT SYSTEM
          </span>
        </div>
        <LoginForm />
        <Link href="/auth/password-reset">
          <div className="link text-gray-300">Forgot Password?</div>
        </Link>
      </div>
    </div>
  );
}
