export default function PageHeader({ children }: { children?: React.ReactNode }) {

    return (
        <header className="sticky z-10 top-0 bg-light dark:bg-dark-secundary py-24 px-32 border-b-2 border-light-secundary dark:border-dark mb-16">
            <h2 className="title-2">{children}</h2>
        </header>
    );
}
