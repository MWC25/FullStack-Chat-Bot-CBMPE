'use client'

import Image from 'next/image';
import Button from '../_components/Button';
import Input from '../_components/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginUserFormData } from '../schemas/loginSchema';

export default function Login() {
    const form = useForm({
        resolver: zodResolver(loginSchema),
    });

    function onSubmit(data:LoginUserFormData){
        console.log(data.name, data.password);
    }
    return (
        <div className="flex flex-col gap-32 justify-center items-center">
            <Image
                className="w-240"
                src="/brasao-cbmpe.png"
                width={320}
                height={320}
                alt="Brasão do corpo de bombeiro"
            />
            <h2 className="title-2">Realize o login para acessar o sistema</h2>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-16 items-center justify-center w-320"
                action="">
                <Input label="Nome" type="text" {...form.register('name')} />
                <Input
                    label="Senha"
                    type="password"
                    {...form.register('password')}
                />
                <Button className="bg-primary hover:bg-hover" full>
                    Acessar
                </Button>
            </form>
        </div>
    );
}
