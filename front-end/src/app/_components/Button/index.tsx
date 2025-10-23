import { MouseEventHandler, ReactNode } from 'react';
import { clsx } from 'clsx';

type ButtonProps = {
    outline?: boolean;
    children?: ReactNode;
    className?: string;
    full?: boolean;
    onClick?: MouseEventHandler
};

export default function Button({
    outline = false,
    children,
    className,
    full,
    onClick,
}: ButtonProps) {
    const style = clsx(
        className,
        outline && 'border-1 bg-transparent',
        outline === false && 'border-0',
        full && 'w-full'
    );
    return (
        <button
            onClick={onClick}
            className={`${style} font-body-2 bold text-white py-8 px-16 rounded-lg`}>
            {children}
        </button>
    );
}
