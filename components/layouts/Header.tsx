'use client';

import { usePostSignIn } from '@/services/auth/auth-service';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const { handleLogout } = usePostSignIn();

  const handleLogoClick = () => {
    router.push('/overview');
  };

  const handleLogoutClick = async () => {
    await handleLogout();
    router.push('/auth/login');
  };

  return (
    <div className="flex items-center justify-between bg-gray-900 p-4">
      <div className="cursor-pointer">
        <Image
          src={'/logos/logo_small.png'}
          alt="logo_small"
          width={150}
          height={150}
          onClick={() => handleLogoClick()}
        />
      </div>
      <div>
        <span className="text-white text-xl font-normal">
          INVENTORY MANAGEMENT SYSTEM
        </span>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-20 md:w-auto h-7 mt-2"
          />
        </div>
      </div>
      <div className="flex items-end h-16">
        <div>
          <button onClick={handleLogoutClick} className="text-white">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
