'use client';

import FormInput from '@/components/inputs/InputForm';
import FormButton from '@/components/buttons/Button';
import { usePostSignIn } from '@/services/auth/auth-service';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const { handlePostSignIn, error } = usePostSignIn();
  const router = useRouter();

  const handleLoginForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const success = await handlePostSignIn(username, password);
    if (success) {
      router.push('/inventory');
    }
  };

  return (
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
      <FormButton text="Login" />
      {error && <p className="text-red-500">Login Failed: {error.message}</p>}
    </form>
  );
};

export default LoginForm;
