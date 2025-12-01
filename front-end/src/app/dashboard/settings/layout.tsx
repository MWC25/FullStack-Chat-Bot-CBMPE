import NavSettings, { Links } from '@/app/_components/NavSettings';
import PageHeader from '@/app/_components/PageHeader';

export default function Settings({ children }: { children?: React.ReactNode }) {
    const links: Links[] = [
        { 
            id: 1, 
            routeName: 'Perfil', 
            href: '/dashboard/settings/profile' },
        {
            id: 2,
            routeName: 'Notificação',
            href: '/dashboard/settings/notification',
        },
    ];

    return (
        <>
            <PageHeader>
                <NavSettings links={links} />
            </PageHeader>
            {children}
        </>
    );
}
