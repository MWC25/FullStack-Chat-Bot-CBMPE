'use client';
import React, { createContext, useContext, useRef, useState } from 'react';

type Notification = 'both' | 'desktop' | 'browser' | 'nothing';

type NotificationContextValue = {
    typeNotification: Notification;
    setTypeNotification: React.Dispatch<React.SetStateAction<Notification>>;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    notify: (type?: Notification) => Promise<void>;
};

const NotificationContext = createContext<NotificationContextValue | any>(
    undefined
);

export function useNotification() {
    const ctx = useContext(NotificationContext);
    if (!ctx) {
        throw new Error(
            'useNotification deve ser usado dentro de <NotificationContextProvider>'
        );
    }
    return ctx;
}

export function NotificationContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [typeNotification, setTypeNotification] =
        useState<Notification>('both');
    const [isOpen, setIsOpen] = useState(false);

    const popupTimeoutRef = useRef<number | null>(null);
    const openPopup = () => {
        setIsOpen(true);
        if (popupTimeoutRef.current) {
            window.clearTimeout(popupTimeoutRef.current);
        }
        popupTimeoutRef.current = window.setTimeout(() => {
            setIsOpen(false);
            popupTimeoutRef.current = null;
        }, 5000);
    };

    async function canNotifyDesktop(): Promise<boolean> {
        if (typeof window === 'undefined') return false;
        if (!('Notification' in window)) {
            alert(
                'O seu navegador não suporta notificações na área de trabalho.'
            );
            return false;
        }
        if (Notification.permission === 'granted') return true;

        try {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        } catch {
            return false;
        }
    }

    async function notify(preferred?: Notification) {
        const mode = preferred ?? typeNotification;

        if (mode === 'nothing') return;

        const wantDesktop = mode === 'desktop' || mode === 'both';
        const wantBrowser = mode === 'browser' || mode === 'both';

        let didDesktop = false;
        if (wantDesktop) {
            const ok = await canNotifyDesktop();
            if (ok) {
                try {
                    new Notification('Notificação', {
                        body: 'Você recebeu uma nova notificação.',
                    });
                    didDesktop = true;
                } catch {
                    console.warn('Falha ao criar notificação de desktop');
                }
            }
        }

        if (wantBrowser) {
            openPopup();
        } else if (!didDesktop) {
            openPopup();
        }
    }

    return (
        <NotificationContext.Provider
            value={{
                typeNotification,
                setTypeNotification,
                isOpen,
                setIsOpen,
                notify,
            }}>
            {children}
        </NotificationContext.Provider>
    );
}

export { NotificationContext };