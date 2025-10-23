import { useTheme } from '@/app/_context/ThemeContext';
import { clsx } from 'clsx';
import { Moon, Sun } from 'lucide-react';

type ButtonProps = {
    className?: string;
};

export default function ThemeButton({
    className
}: ButtonProps) {

    const {theme, toggleTheme} = useTheme()

    const style = clsx(
        className,
    );

    const size = 20
    return (
        <button
            onClick={() => {
                toggleTheme();
            }}
            className={`${style} bg-primary font-body-2 bold text-light dark:text-dark  py-6 px-6 rounded-full flex justify-center items-center`}>
            {theme === 'light' ? <Moon size={size} /> : <Sun size={size} />}
        </button>
    );
}
