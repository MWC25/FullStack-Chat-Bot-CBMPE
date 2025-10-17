export type PropsInput = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    type: 'text' | 'password' | 'email' | 'search' | 'number' | 'url' | 'tel';
    placeholder?: string;
};
