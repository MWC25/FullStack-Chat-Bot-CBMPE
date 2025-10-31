import MenuItems from '../MenuItems';
import { Ellipsis, MessageSquareText, Settings } from 'lucide-react';

export default function Sidebar() {
    return (
        <div className="p-32 screen flex flex-col gap-32 bg-light dark:bg-dark-secundary shadow-xl dark:shadow-neutral-900 mt-1">
            <nav className="h-834">
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
