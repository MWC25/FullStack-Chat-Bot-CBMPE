import { LayoutDashboard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Notfound({ children }: { children?: React.ReactNode }) {
    return (
        <div className="flex flex-row w-full h-full justify-center items-center">
            <div className="h-4/5 z-10 flex flex-col items-center justify-between">
                <div className="flex flex-col items-center justify-between">
                    <h1 className="bold text-8xl text-light uppercase">
                        Erro 404: Página não encontrada!!
                    </h1>
                    <h2 className="bold text-6xl text-dark/70 capitalize">
                        acho que você se perdeu
                    </h2>
                </div>
                <Link
                    className="rounded-2xl px-32 py-16 text-4xl bg-primary text-light flex justify-center items-center gap-16 border-2 border-light-secundary"
                    href={'/dashboard/'}>
                    Volte para Dashboard <LayoutDashboard/>
                </Link>
            </div>
            <Image
                priority
                className="z-0 absolute w-1700 top-0"
                alt="Mascote perdido, erro 404"
                src={'/404NotFound.png'}
                width={1536}
                height={1024}
            />
        </div>
    );
}
