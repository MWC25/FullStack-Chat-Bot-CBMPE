'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '../_components/Sidebar';
import Link from 'next/link';
import { CircleUserRound } from 'lucide-react';
import ThemeButton from '../_components/ThemeButton';
import Image from 'next/image';
import PopUpNotification from '../_components/PopUpNotification';

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const lastSegment = pathname.split('/').filter(Boolean).pop();

    const routesTranslate = {
        chats: 'Chats',
        settings: 'Configuração',
        more: "Mais",
        profile: "Perfil",
        notification: "Notificação"
    }

    const translatedRoute = routesTranslate[ lastSegment as keyof typeof routesTranslate] ?? lastSegment;

    return (
            <div className="flex flex-col w-full h-dvh overflow-y-hidden">
                <header className="flex bg-light dark:bg-dark-secundary justify-between items-center px-32 py-24 w-full shadow dark:shadow-neutral-900 gap-72">
                    <Image
                        className="w-60"
                        src="/brasao-cbmpe.png"
                        width={320}
                        height={320}
                        alt="Brasão do corpo de bombeiro"
                        priority
                    />
                    <div className="flex items-center justify-between w-full">
                        <h2 className="bold title-2 uppercase text-dark-secundary dark:text-light-secundary">
                            {translatedRoute}
                        </h2>
                        <div className="flex items-center gap-16">
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
                            <ThemeButton />
                        </div>
                    </div>
                </header>
                <div className="w-full screen flex-1 flex">
                    <Sidebar />
                    <section className="bg-light dark:bg-dark-secundary m-32 shadow-md dark:shadow-neutral-900 rounded-2xl w-full flex-1 overflow-y-auto pb-32 text-dark-secundary dark:text-light-secundary">
                        {children}
                    </section>
                </div>
                <PopUpNotification />
            </div>
    );
}
