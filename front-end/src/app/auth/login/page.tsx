'use client';

import Image from 'next/image';
import Button from '../../_components/Button';
import Input from '../../_components/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormDataLogin, loginSchema } from '../../_schemas/FormLoginSchema';
import { loginUser } from '@/app/_services/LoginUser';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
    const router = useRouter()
    const [resData, setResData] = useState(
        {
            errorStatusCode: null,
            errorCode: null,
            errorMessage: null,
            response: {
                message: null
            }
        }
    );

    const form = useForm({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(formData: FormDataLogin) {
        console.log(formData.name, formData.password);
        const login = await loginUser(formData.name, formData.password)
        
        if (!login.ok) { setResData(login.data) }
        
        if(login.ok){
            router.push('/dashboard/chats')
        }
    }

    return (
        <div className="flex flex-col gap-32 justify-center items-center">
            <Image
                className="w-240"
                src="/brasao-cbmpe.png"
                width={320}
                height={320}
                alt="Brasão do corpo de bombeiro"
                priority
            />
            <h2 className="title-2">Realize o login para acessar o sistema</h2>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-16 items-center justify-center w-320"
                action="">
                <Input
                    label="Nome"
                    type="text"
                    {...form.register('name')}
                    error={
                        form.formState.errors.name?.message as
                            | string
                            | undefined
                    }
                />
                <Input
                    label="Senha"
                    type="password"
                    {...form.register('password')}
                    error={
                        form.formState.errors.password?.message as
                            | string
                            | undefined
                    }
                />
                {resData ? (<p className='title-4 text-red-500'>{resData.response.message}</p>) :
                (<p className='title-4 text-transparent'>placeholder</p>)}
                <Button className="bg-primary hover:bg-hover" full>
                    Acessar
                </Button>
            </form>
        </div>
    );
}
