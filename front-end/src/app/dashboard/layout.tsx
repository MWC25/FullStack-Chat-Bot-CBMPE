'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '../_components/Sidebar';
import Link from 'next/link';
import { CircleUserRound } from 'lucide-react';
import ThemeButton from '../_components/ThemeButton';

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const lastSegment = pathname.split('/').filter(Boolean).pop();

    const routesTranslate = {
        chats: 'Chats',
        settings: 'Configuração',
        more: "Mais",
        profile: "Perfil"
    }

    const translatedRoute = routesTranslate[ lastSegment as keyof typeof routesTranslate] ?? lastSegment;

    return (
        <div className="flex flex-row w-full h-dvh">
            <Sidebar />
            <div className="w-full">
                <header className="flex justify-between px-32 py-32 w-full shadow dark:shadow-neutral-900 ml-2">
                    <h2 className="bold title-2 uppercase text-dark-secundary dark:text-light-secundary">
                        {translatedRoute}
                    </h2>
                    <div className='flex items-center gap-10'>
                        <Link
                            className={`${
                                pathname === '/dashboard/settings/profile'
                                    ? 'text-primary'
                                    : 'text-dark-secundary dark:text-light-secundary'
                            } hover:text-hover flex title-4 gap-8 items-center`}
                            href={'/dashboard/settings/profile'}>
                            <CircleUserRound size={28} />
                            Perfil
                        </Link>
                        <ThemeButton/>
                    </div>
                </header>
                {children}
            </div>
        </div>
    );
}
