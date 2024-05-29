'use client';

import FormInput from '@/components/inputs/InputForm';
import Image from 'next/image';
import Link from 'next/link';
import FormButton from '@/components/buttons/Button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleLoginForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // TODO: Remove the console log before deploying
    console.log(formData.get('username'), formData.get('password'));
    router.push('/overview');
  };

  return (
    <div className="flex flex-col items-center justify-between bg-gray-900 min-h-screen">
      <div className="my-auto flex flex-col items-center">
        <div className="mb-8 ">
          <Image
            src={'/logos/logo_big.png'}
            layout="responsive"
            width={400}
            height={120}
            alt="logo_big"
          />
        </div>
        <div className="mb-11">
          <span className="text-white text-4xl font-normal">
            INVENTORY MANAGEMENT SYSTEM
          </span>
        </div>
        <form onSubmit={handleLoginForm} className="flex flex-col gap-3 w-96">
          <FormInput
            name="username"
            label="Username * :"
            type="text"
            placeholder="Username"
            required
          />
          <FormInput
            name="password"
            label="Password * :"
            type="password"
            placeholder="Password"
            required
          />
          <Link href="/auth/password-reset">
            <div className="link text-gray-300">Forgot Password?</div>
          </Link>

          <FormButton text="Login" />
        </form>
      </div>
    </div>
  );
}
