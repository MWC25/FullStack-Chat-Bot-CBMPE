'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";


export interface Links {
    id: number,
    routeName: string,
    href: string
}

export default function NavSettings({links = []}: { links:  Links[]}) {

    const route = usePathname()

    useEffect(()=>{
        console.log(route)
    })

    return (
        <nav className="flex gap-16">
            {links.map(link => (
                <Link
                    className={`px-16 py-8   font-body rounded-lg ${
                        route === link.href
                            ? 'bg-primary text-light'
                            : 'bg-light-secundary text-dark/90 dark:bg-dark dark:text-light/90'
                    }`}
                    key={link.id}
                    href={link.href}>
                    {link.routeName}
                </Link>
            ))}
        </nav>
    );
}
