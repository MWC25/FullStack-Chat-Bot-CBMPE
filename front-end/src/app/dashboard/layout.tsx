'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '../_components/Sidebar';
import Link from 'next/link';
import { CircleUserRound } from 'lucide-react';

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
        <div className="flex flex-row w-full h-full">
            <Sidebar />
            <div className="w-full">
                <header className="flex justify-between px-32 py-32 w-full shadow">
                    <h2 className="bold title-2 uppercase">{translatedRoute}</h2>
                    <Link
                        className={`${
                            pathname === '/dashboard/settings/profile' ? 'text-primary' : 'text-dark-secundary'
                        } hover:text-hover flex title-4 gap-8 items-center`}
                        href={'/dashboard/settings/profile'}>
                        <CircleUserRound size={28} />
                        Perfil
                    </Link>
                </header>
                {children}
            </div>
        </div>
    );
}
