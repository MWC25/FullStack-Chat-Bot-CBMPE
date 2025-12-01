'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function MenuItems({
    path,
    rightIcon,
    leftIcon,
    label,
}: {
    path: string;
    label?: string;
    rightIcon?: React.ReactNode;
    leftIcon?: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <li>
            <Link
                className={`flex flex-row ${
                    pathname === path ? 'text-primary' : 'text-dark-secundary dark:text-light-secundary'
                } uppercase justify-between items-center hover:text-hover max-w-120 gap-12`}
                href={path}>
                {rightIcon}
                <p className="title-4">{label}</p>
                {leftIcon}
            </Link>
        </li>
    );
}
