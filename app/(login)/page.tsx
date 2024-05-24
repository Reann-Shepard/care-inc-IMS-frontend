'use client';

import FormInput from '@/components/inputs/InputForm';
import Image from 'next/image';
import Link from 'next/link';
import FormButton from '@/components/buttons/Button';
import { useFormState } from 'react-dom';
import { redirect } from 'next/navigation';

function navOverview() {
  redirect('/overview');
}

export default function Home() {
  const [state, action] = useFormState(navOverview, null);

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
        <form action={action} className="flex flex-col gap-3 w-96">
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
