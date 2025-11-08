import { clsx } from "clsx";

export default function Tag({ children, className }: { children: React.ReactNode, className: string }) {

    const styles = clsx(
        'rounded-full px-6 py-4 w-fit border tooltip',
        className
    );

    return <p className={styles}>{children}</p>;
}
