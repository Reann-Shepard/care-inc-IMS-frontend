// 'use client';

// import FormInput from '@/components/inputs/InputForm';
// import Image from 'next/image';
// import Link from 'next/link';
// import FormButton from '@/components/buttons/Button';
// import { usePostSignIn } from '@/services/auth/auth-service';
// import { redirect, useRouter } from 'next/navigation';

// export default function Page() {
//   const { handlePostSignIn, error } = usePostSignIn();
//   const router = useRouter();

//   const handleLoginForm = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);

//     const username = formData.get('username') as string;
//     const password = formData.get('password') as string;

//     const success = await handlePostSignIn(username, password)
//     console.log('Login success:', success);
//     if (success) {
//       console.log('Navigating to /overview');
//       // router.push('/overview')
//       // redirect('/overview')
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-between bg-gray-900 min-h-screen">
//       <div className="my-auto flex flex-col items-center">
//       <div className="mb-8 relative w-[400px] h-[120px]" style={{ position: 'relative' }}>
//           <Image
//             src='/logos/logo_big.png'
//             // width={400}
//             // height={120}
//             sizes='400px 120px'
//             fill
//             style={{ objectFit: 'contain' }}
//             alt="logo_big"
//           />
//         </div>
//         <div className="mb-11">
//           <span className="text-white text-4xl font-normal">
//             INVENTORY MANAGEMENT SYSTEM
//           </span>
//         </div>
//         <form onSubmit={handleLoginForm} className="flex flex-col gap-3 w-96">
//           <FormInput
//             name="username"
//             label="Username * :"
//             type="text"
//             placeholder="Username"
//             required
//           />
//           <FormInput
//             name="password"
//             label="Password * :"
//             type="password"
//             placeholder="Password"
//             required
//           />
//           <Link href="/auth/password-reset">
//             <div className="link text-gray-300">Forgot Password?</div>
//           </Link>

//           <FormButton text="Login" />
//         </form>
//         {error && <p className='text-red-500'>Login Failed: {error.message}</p>}
//       </div>
//     </div>
//   );
// }

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
