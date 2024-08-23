'use client';

import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Link from "next/link";

import { registerSchema, loginSchema } from "@/lib/schemas";
import type { Inputs, SignUpInputs } from "@/lib/types";
import { LOADER_ICON } from '@/lib/icons';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { credentialsFormSubmitFunction } from "@/actions/user";


export default function CredentialsForm({ type }: {type: 'signin' | 'signup'}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs<typeof type>>({
    resolver: zodResolver(type === 'signup' ? registerSchema : loginSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<Inputs<typeof type>> = async (data) => {
    const { email, password } = data;
      setIsLoading(async () => {
        await credentialsFormSubmitFunction({ email, password }, type)
          .then(() => {
            router.replace('/game');
            reset();
          })
          .catch((e) => {
            console.log('credentials form error', e);
          });
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sm:min-w-[400px] p-6 pb-8 rounded-2xl bg-[rgba(255,255,255,0.6)] flex flex-col gap-4"
    >
      <fieldset className="flex flex-col">
        <label className="mb-2" htmlFor="email">Email</label>
        <Input
          disabled={isLoading}
          id="email"
          {...register('email')}
        />
        <span className="mt-2 text-red-500">{errors.email?.message}</span>
      </fieldset>
      <fieldset className="flex flex-col">
        <label className="mb-2" htmlFor="password">Пароль</label>
        <Input
          disabled={isLoading}
          id="password"
          type="password"
          {...register('password')}
        />
        <span className="mt-2 text-red-500">{errors.password?.message}</span>
      </fieldset>
      {type === 'signup' && (
      <fieldset className="flex flex-col">
        <label className="mb-2" htmlFor="confirmPassword">Пароль ещё раз</label>
        <Input
          disabled={isLoading}
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
        />
        <span className="mt-2 text-red-500"> {(errors as FieldErrors<SignUpInputs>).confirmPassword?.message}</span>
      </fieldset>
      )}

      <Button disabled={!isValid || isLoading} className="mt-4" type="submit">
        {!isLoading && (type === 'signup' ? 'Зарегистрироваться' : 'Войти')}
        {isLoading && <LOADER_ICON className="animate-spin" />}
      </Button>

      {
        type === 'signin' && (
          <p className="text-center text-sm">
            Ещё нет аккаунта?
            <Button 
              className="px-0"
              variant='link' 
              asChild
            >
              <Link className="whitespace-pre-wrap" href='/signup'> Зарегистрироваться</Link>
            </Button>
          </p>
        )
      }

      {
        type === 'signup' && (
          <p className="text-center text-sm">
            Уже есть аккаунт?
            <Button 
              className="px-0"
              variant='link' 
              asChild
            >
              <Link className="whitespace-pre-wrap" href='/signin'> Войти</Link>
            </Button>
          </p>
        )
      }
    </form>
  );
}
