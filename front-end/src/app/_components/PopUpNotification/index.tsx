import React, { useContext, useEffect, useRef, useState } from 'react';
import { MessageSquareText } from 'lucide-react';
import Button from '../Button';
import { NotificationContext } from '@/app/_context/NotificationContext';
import { useRouter } from 'next/navigation';

export default function PopUpNotification() {
    const router = useRouter();
    const { isOpen, setIsOpen } = useContext(NotificationContext);
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (isOpen) {
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
            }
            setVisible(true);
            timeoutRef.current = window.setTimeout(() => {
                timeoutRef.current = null;
            }, 5000);
            return;
        }

        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setVisible(false);

        return () => {
            if (timeoutRef.current) {
                window.clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [isOpen]);

    const base =
        'z-100 absolute bottom-16 right-16 flex flex-col gap-16 px-32 py-32 bg-light-secundary dark:bg-dark-secundary rounded-2xl shadow-md dark:shadow-neutral-900 dark:shadow-lg dark:border-1 dark:border-dark/50 transition-opacity transition-transform duration-300';
    const hiddenClass = 'opacity-0 translate-y-4 pointer-events-none';
    const visibleClass = 'opacity-100 translate-y-0';

    return (
        <div className={`${base} ${visible ? visibleClass : hiddenClass}`}>
            <h4 className="title-4 uppercase dark:text-light-secundary">Recebeu Novas Mensagens</h4>
            <Button className="bg-primary hover:bg-hover" full onClick={()=>{
                setIsOpen(false)
                router.push('/dashboard/chats');
                }}>
                Ver Mensagens
                <MessageSquareText />
            </Button>
        </div>
    );
}
