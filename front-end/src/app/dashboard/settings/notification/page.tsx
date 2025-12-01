'use client'

import { NotificationContext } from "@/app/_context/NotificationContext";
import { ChangeEvent, useContext, useState } from "react";

export default function Notification({
    children,
}: {
    children?: React.ReactNode;
}) {

    const [radioDisabled, setRadioDisabled ] = useState(true)
    const [typeNotificationValue, setTypeNotificationValue] = useState('both');
    const { setTypeNotification } = useContext(NotificationContext);

    function toggleCheck(event: ChangeEvent<HTMLInputElement>) {
        setRadioDisabled(!event.currentTarget.checked);
        localStorage.setItem('notify', String(event.currentTarget.checked) );
        localStorage.setItem('typeNotifiction', typeNotificationValue)
        setTypeNotification(typeNotificationValue)
    }

    function setTypeNotify(value: string) {
        console.log(value)
        setTypeNotificationValue(value)
    }

    return (
        <div className="flex flex-col justify-center gap-16 px-32 py-8">
            <h3 className="title-3 uppercase bold">Notificações do usuário</h3>
            <div className="flex flex-row justify-evenly w-full h-full">
                <div className="flex flex-col gap-16 justify-center h-fit border-b-2 w-fit pt-8 pb-32 mb-8">
                    <h4 className="title-4">
                        Notificações na área de trabalho
                    </h4>
                    <div className="flex flex-col items-start gap-16 font-body">
                        <label
                            htmlFor="sendNotification"
                            className="flex items-center gap-3 accent-primary">
                            <input
                                className="w-20"
                                type="checkbox"
                                name="checkbox"
                                id="sendNotification"
                                onChange={e =>
                                    toggleCheck(
                                        e as ChangeEvent<HTMLInputElement>
                                    )
                                }
                            />
                            <span>
                                Enviar notificações para o meu computador
                            </span>
                        </label>

                        <fieldset
                            disabled={radioDisabled}
                            className="flex flex-col gap-2 pl-32 accent-primary"
                            onChange={e => setTypeNotify((e.target as HTMLInputElement).value)}>
                            <legend className="sr-only">
                                Tipo de notificação
                            </legend>
                            <label className="flex items-center gap-3">
                                <input
                                    className="w-20"
                                    type="radio"
                                    name="typeNotification"
                                    id="both"
                                    value="both"
                                />
                                <span
                                    className={`${
                                        radioDisabled
                                            ? 'text-dark-secundary/50 dark:text-light-secundary/50'
                                            : 'text-dark-secundary dark:text-light-secundary'
                                    }`}>
                                    Na área de trabalho e no navegador
                                </span>
                            </label>
                            <label className="flex items-center gap-3">
                                <input
                                    className="w-20"
                                    type="radio"
                                    name="typeNotification"
                                    id="desktop"
                                    value="desktop"

                                />
                                <span
                                    className={`${
                                        radioDisabled
                                            ? 'text-dark-secundary/50 dark:text-light-secundary/50'
                                            : 'text-dark-secundary dark:text-light-secundary'
                                    }`}>
                                    Apenas na área de trabalho
                                </span>
                            </label>
                            <label className="flex items-center gap-3">
                                <input
                                    className="w-20"
                                    type="radio"
                                    name="typeNotification"
                                    id="browser"
                                    value="browser"
                                />
                                <span
                                    className={`${
                                        radioDisabled
                                            ? 'text-dark-secundary/50 dark:text-light-secundary/50'
                                            : 'text-dark-secundary dark:text-light-secundary'
                                    }`}>
                                    Apenas no navegador
                                </span>
                            </label>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    );
}
