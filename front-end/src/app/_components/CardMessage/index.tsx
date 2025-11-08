import Link from 'next/link';
import { ConversationData } from './types';
import Tag from '../Tag';
import { FaWhatsapp } from 'react-icons/fa';
import { X } from 'lucide-react';

export default function CardMessage({ data }: { data: ConversationData }) {
    return (
        <div className="flex flex-col w-full h-full gap-16 text-dark-secundary dark:text-light-secundary rounded-3xl p-16 shadow-sm dark:shadow-neutral-800 border border-light-secundary dark:border-dark bg-light-secundary/5">
            <Tag className="text-green-600 bg-green-400/10 dark:bg-green-800/15">
                {data.channel}
            </Tag>
            <div className="flex flex-col gap-4">
                <h4 className="title-4">{data.contactInfo.name}</h4>
                <p className="font-body bold text-dark-secundary/50 dark:text-light-secundary/50">
                    {data.contactInfo.phoneNumber}
                </p>
            </div>
            <div>
                <p className="font-body bold text-dark-secundary dark:text-light-secundary">
                    {data.topic}
                </p>
                <p className="font-body-2 text-dark-secundary dark:text-light-secundary">
                    {data.conversationSummary}
                </p>
            </div>
            <div className="w-full flex justify-between items-end">
                <div className="justify-center flex flex-col items-center">
                    {data.unread ? (
                        <p className="tooltip text-dark-secundary dark:text-light-secundary">
                            Essa mensagem já foi visitada
                        </p>
                    ) : (
                        <p></p>
                    )}
                    <Link
                        className={`rounded-lg px-16 py-8 flex justify-center items-center ${
                            data.unread
                                ? 'bg-green-800/60 hover:bg-green-700/80 dark:bg-green-800/40 dark:hover:bg-green-700/40 border border-green-700/40'
                                : 'bg-green-800 hover:bg-green-700'
                        } w-fit text-light font-body gap-8`}
                        href={'./'}>
                        Responder Mensagem <FaWhatsapp size={20} />
                    </Link>
                </div>
                <button className="border-1 border-red-700 text-red-700 bg-red-700/15 hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 dark:border-red-500 dark:text-red-500 dark:bg-red-600/10 dark:hover:bg-red-400/10 dark:hover:border-red-400 dark:hover:text-red-400 font-body py-8 px-16 rounded-lg w-fit h-fit flex justify-center items-center gap-8 cursor-pointer">
                    <X className="w-20 h-20" /> Finalizar Ocorrência
                </button>
            </div>
        </div>
    );
}
