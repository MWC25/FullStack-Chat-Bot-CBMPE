import { MouseEventHandler, ReactNode } from 'react';
import { clsx } from 'clsx';

type ButtonProps = {
    outline?: boolean;
    children?: ReactNode;
    className?: string;
    full?: boolean;
    onClick?: MouseEventHandler
    disabled?: boolean;
};

export default function Button({
    outline = false,
    children,
    className,
    full,
    onClick,
    disabled
}: ButtonProps) {
    const style = clsx(
        className,
        outline && 'border-1 bg-transparent',
        outline === false && 'border-0',
        full && 'w-full'
    );

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`${style} inline-flex gap-16 font-body justify-center text-white py-8 px-16 rounded-lg cursor-pointer disabled:*:cursor-not-allowed disabled:opacity-50`}>
            {children}
        </button>
    );
}
