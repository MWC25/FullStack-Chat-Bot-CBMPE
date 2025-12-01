export interface PropsInput extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    type: 'text' | 'password' | 'email' | 'search' | 'number' | 'url' | 'tel';
    placeholder?: string;
    error?: string | null
};
