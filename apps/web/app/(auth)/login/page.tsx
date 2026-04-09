'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Building2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const DEMO_ACCOUNTS = [
  { label: 'Admin', email: 'admin@condoflow.com' },
  { label: 'Resident', email: 'resident@condoflow.com' },
  { label: 'Technician', email: 'tech@condoflow.com' },
];

export default function LoginPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setServerError(null);
    const result = await login(data.email, data.password);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setServerError(result.error ?? 'Login failed');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome to CondoFlow</h1>
          <p className="mt-1 text-sm text-gray-500">Sign in to manage your property</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <Input
              {...register('email')}
              type="email"
              label="Email address"
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email?.message}
            />
            <Input
              {...register('password')}
              type="password"
              label="Password"
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password?.message}
            />

            {serverError && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-200">
                {serverError}
              </div>
            )}

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Sign in
            </Button>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-5">
            <p className="mb-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
              Demo accounts (any password)
            </p>
            <div className="flex gap-2">
              {DEMO_ACCOUNTS.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => {
                    setValue('email', account.email);
                    setValue('password', 'password123');
                  }}
                  className="flex-1 rounded-lg border border-gray-200 px-2 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  {account.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
