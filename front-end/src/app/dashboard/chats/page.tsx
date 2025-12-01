'use client'

import CardMessage from '@/app/_components/CardMessage';
import { ConversationData } from '@/app/_components/CardMessage/types';
import PageHeader from '@/app/_components/PageHeader';
import { NotificationContext } from '@/app/_context/NotificationContext';
import data from '@/app/_data/messages.json';
import { useContext, useEffect } from 'react';


export default function Chats({ children }: { children?: React.ReactNode }) {

    const {setIsOpen, isOpen} = useContext(NotificationContext)

    return (
        <>
            <PageHeader>Pessoas Aguardando Atendimento</PageHeader>
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                    setTimeout(() => {
                        setIsOpen(false);
                    }, 3000);
                }}
            >
                click
            </button>
            <div className="flex flex-col flex-1 h-fit gap-20 px-32">
                {messages.map(message => (
                    <CardMessage key={message.id} data={message} />
                ))}
            </div>
        </>
    );
}
