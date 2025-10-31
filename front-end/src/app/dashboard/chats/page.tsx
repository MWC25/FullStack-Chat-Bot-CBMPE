'use client'

import CardMessage from '@/app/_components/CardMessage';
import { ConversationData } from '@/app/_components/CardMessage/types';
import PageHeader from '@/app/_components/PageHeader';
import data from '@/app/_data/messages.json';
import { useEffect } from 'react';

const messages: ConversationData[] = data.data as ConversationData[];

export default function Chats({ children }: { children?: React.ReactNode }) {

    useEffect(()=>{
        console.log(messages)
    })

    return (
        <>
            <PageHeader>Pessoas Aguardando Atendimento</PageHeader>
            <div className="flex flex-col flex-1 h-fit gap-20 px-32">
                {messages.map(message => (
                    <CardMessage key={message.id} data={message} />
                ))}
            </div>
        </>
    );
}
