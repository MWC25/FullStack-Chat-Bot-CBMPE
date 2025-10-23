import Image from 'next/image';
import MenuItems from '../MenuItems';
import { Ellipsis, MessageSquareText, Settings } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
    return (
        <div className="p-32 flex flex-col gap-32 bg-light dark:bg-dark-secundary shadow-lg dark:shadow-black">
            <Image
                className="w-100"
                src="/brasao-cbmpe.png"
                width={320}
                height={320}
                alt="Brasão do corpo de bombeiro"
                priority
            />
            <nav className="h-full">
                <ul className="flex flex-col gap-16">
                    <MenuItems
                        path="/dashboard/chats"
                        leftIcon={<MessageSquareText size={20} />}
                        label="Chats"
                    />
                    <MenuItems
                        path="/dashboard/more"
                        leftIcon={<Ellipsis size={20} />}
                        label="More"
                    />
                </ul>
            </nav>
            <nav>
                <ul>
                    <MenuItems
                        path="/dashboard/settings/profile"
                        rightIcon={<Settings size={32} />}
                    />
                </ul>
            </nav>
        </div>
    );
}
