'use client';

import SettingRow from '@/app/_components/SettingRow';
import { CircleUserRound } from 'lucide-react';
import Image from 'next/image';

export default function Profile({ children }: { children?: React.ReactNode }) {
    const photoUser = '';

    return (
        <div className="flex flex-row justify-evenly w-full h-full">
            <button className="relative cursor-pointer w-fit h-fit opacity-100 hover:opacity-80 dark:opacity-70 dark:hover:opacity-100">
                {photoUser ? (
                    <Image
                        priority
                        alt="foto de perfil do usuário"
                        src={photoUser}
                        width={256}
                        height={256}
                    />
                ) : (
                    <CircleUserRound size={256} strokeWidth={1} />
                )}
                <p className="z-0 tooltip bold text-primary dark:text-red-600">
                    editar foto de perfil
                </p>
            </button>
            <div>
                <SettingRow
                    sectionName="Nome"
                    sectionData="Fulano"
                    auxiliaryText="alterar nome"
                    buttonAction={() => console.log('alterando nome')}
                />
                <SettingRow
                    sectionName="E-mail"
                    sectionData="fulano@cbmpe.com"
                    auxiliaryText="gerenciado por CBMPE"
                />
                <SettingRow sectionName="Função" sectionData="Atendente" />
                <SettingRow sectionName="Linguagem" sectionData="português" />
            </div>
            <button className='flex flex-col items-start'>
                <h4 className="title-4">Sair</h4>
                <p className="tooltip bold text-primary dark:text-red-500 ">
                    sair da conta
                </p>
            </button>
        </div>
    );
}
