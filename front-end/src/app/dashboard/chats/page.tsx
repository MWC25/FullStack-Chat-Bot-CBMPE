'use client'

import CardMessage from '@/app/_components/CardMessage';
import { ConversationData } from '@/app/_components/CardMessage/types';
import PageHeader from '@/app/_components/PageHeader';
import { NotificationContext } from '@/app/_context/NotificationContext';
import data from '@/app/_data/messages.json';
import { useContext, useEffect, useState } from 'react';
import api from '../../../../lib/axiosClient';
import Link from 'next/link';
import Button from '@/app/_components/Button';
import { RefreshCw } from 'lucide-react';

const messages: ConversationData[] = data.data as ConversationData[];

export interface Atendimento {
    id: string;
    pushName: string;
    numero: string;
    status: string;
    topic: string;
    conversationSummary: string;
    created_at: string;
    updated_at: string;
}

export type ListaAtendimentos = Atendimento[];

export default function Chats({ children }: { children?: React.ReactNode }) {

    const [data, setData] = useState<Atendimento[] | null>(null);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

    async function fetchData() {
        try {
            const res = await api.get('/api/ServiceRequest/get');
            return res;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    }

    useEffect(() => {
        fetchData().then(res => {
            if (res) {
                console.log(res.data);
                setData(res.data);
            }
        });
    }, []);

    async function handleButtonClick(id: string) {
        try {
            const res = await api.patch(
                `/api/ServiceRequest/updateStatus/${id}`,
                { status: 'in service' }
            );
            console.log(res.data);
            fetchData().then(res => {
                if (res) {
                    console.log(res.data);
                    setData(res.data);
                }
            });
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }

    async function handleRefresh() {
        setIsRefreshing(true);
        const res = await fetchData();
        if (res) {
            setData(res.data);
        }
        setIsRefreshing(false);
    }


    // const {setIsOpen, isOpen} = useContext(NotificationContext)

    return (
        <>
            <PageHeader className="flex justify-between items-center" >
                Pessoas Aguardando Atendimento{' '}
                <Button className="bg-primary" onClick={handleRefresh} disabled={isRefreshing}>
                    Recarregar <RefreshCw className={isRefreshing ? 'animate-spin' : ''} /> 
                </Button>
            </PageHeader>
            {/* <button
                onClick={() => {
                    setIsOpen(!isOpen);
                    setTimeout(() => {
                        setIsOpen(false);
                    }, 3000);
                }}
            >
                click
            </button> */}
            <div className="flex flex-col flex-1 h-fit gap-20 px-32">
                {data ? (
                    (() => {
                        const waiting = data.filter(
                            item => item.status === 'waiting'
                        );
                        return waiting.length ? (
                            waiting.map(item => (
                                <CardMessage
                                    buttonOnClick={() =>
                                        handleButtonClick(item.id)
                                    }
                                    key={item.id}
                                    data={item}
                                />
                            ))
                        ) : (
                            <>
                                <p className="text-7xl text-body">
                                    Nenhum atendimento aguardando
                                </p>
                                <p className="text-3xl text-body">
                                    Caso queira ver as mensagens recebidas, por
                                    favor, enviar um "QUERO FALAR COM O
                                    ATENDENTE", para o numero{' '}
                                    <Link
                                        className="underline text-bold text-primary dark:text-red-500"
                                        target="_blank"
                                        href={
                                            'https://web.whatsapp.com/send/?phone=5511967371759&text=Quero+falar+com+o+atendente&type=phone_number&app_absent=0&utm_campaign=wa_api_send_v2'
                                        }>
                                        +5511967371759 (ou clicar aqui)
                                    </Link>
                                    .
                                </p>
                            </>
                        );
                    })()
                ) : (
                    <p className="text-7xl text-body">Loading...</p>
                )}
            </div>
        </>
    );
}
