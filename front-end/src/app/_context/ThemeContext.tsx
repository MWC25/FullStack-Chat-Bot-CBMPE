'use client';

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({ children }: { children: ReactNode }){

    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            const saved = localStorage.getItem('theme');
            const initial: Theme = saved === 'dark' ? 'dark' : 'light'
            setTheme(initial);
        } catch {
            setTheme('light');
        }
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            document.documentElement.classList.toggle('dark', theme === 'dark');
            localStorage.setItem('theme', theme);
        } catch {
            // ignorar em ambientes sem DOM/localStorage
        }
    }, [theme]);

    const toggleTheme = () =>
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    return ctx;
};


