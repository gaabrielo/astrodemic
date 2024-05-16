import { Button } from '@/components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/primitives/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LogInIcon, UserRoundPlusIcon } from 'lucide-react';
import { useState } from 'react';
import { cn, getURL } from '@/utils/helpers';
import Image from 'next/image';
import { Separator } from '@/components/ui/primitives/Separator';
import { supabase } from '@/services/supabase';
import { redirect } from 'next/navigation';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Deve possuir 2 caracteres no mínimo.',
  }),
  email: z.any(),
  password: z.string().min(2, {
    message: 'Deve possuir 6 caracteres no mínimo.',
  }),
});

const FORM_TYPE = [
  {
    id: 0,
    label: 'Criar conta',
    value: 'create',
    icon: <UserRoundPlusIcon className="w-6 h-6" />,
    selectedStyle:
      'border-amber-500/50 bg-orange-100 text-orange-500 shadow-inner',
  },
  {
    id: 1,
    label: 'Entrar',
    value: 'signIn',
    icon: <LogInIcon className="w-6 h-6" />,
    selectedStyle: 'border-lime-500/50 bg-lime-100 text-lime-600 shadow-inner',
  },
];

export function LoginForm() {
  const [formType, setFormType] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="flex flex-col items-center w-full max-w-xs gap-8">
      <Image
        src="/app-icon.svg"
        alt="Eduwars RPG"
        className="w-20 mb-12"
        width={0}
        height={0}
      />

      <Button
        className="w-full h-fit"
        variant="outline"
        onClick={async () => {
          await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: getURL('dash/maps'),
            },
          });
        }}
      >
        <Image src={'/google-icon.svg'} alt="Google" width={20} height={20} />
      </Button>

      <div className="flex gap-2 w-full">
        {FORM_TYPE.map((btn) => (
          <FormTypeButton
            key={btn.id}
            onClick={() => setFormType(btn.id)}
            selected={formType === btn.id ? btn.selectedStyle : ''}
          >
            {btn.icon}
            {btn.label}
          </FormTypeButton>
        ))}
      </div>

      {formType === 0 ? (
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="w-full flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {/* <FormDescription>Este será seu nome de usuário</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {/* <FormDescription>Este será seu nome de usuário</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Este será seu nome de usuário
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-5">Enviar</Button>
          </form>
        </Form>
      ) : (
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="w-full flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {/* <FormDescription>Este será seu nome de usuário</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {/* <FormDescription>Este será seu nome de usuário</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-5">Entrar</Button>
          </form>
        </Form>
      )}
    </div>
  );
}

function FormTypeButton({ children, selected, ...props }: any) {
  return (
    <button
      className={cn(
        `flex flex-1 flex-col justify-center gap-2 items-center rounded-lg p-3 
        text-sm leading-none border border-slate-300/50 text-slate-600 bg-gray-100 transition-all`,
        selected === '' && `hover:text-slate-950 hover:border-slate-300`,
        selected
      )}
      {...props}
    >
      {children}
    </button>
  );
}
