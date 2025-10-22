'use client';
import React, { useState } from 'react';
import { PropsInput } from './PropsInput';

const Input = React.forwardRef<HTMLInputElement, PropsInput>(
    ({ label, type, placeholder, error, ...rest }, ref) => {
        const [isFocused, setIsFocused] = useState(false);

        return (
            <div className="relative w-fit flex flex-col gap-8 my-4">
                <input
                    ref={ref}
                    type={type}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`border px-16 pt-16 pb-14 rounded w-480 outline-none focus:border-primary hover:border-hover transition peer font-body`}
                    placeholder={placeholder}
                    {...rest}
                />
                <label
                    className={`absolute left-1 top-18 px-16 pointer-events-none transition-all duration-200 origin-left hover:text-hover
            ${
                isFocused || rest.value
                    ? 'tooltip -translate-y-16 text-primary'
                    : 'font-body translate-y-0'
            }`}>
                    {label}
                </label>
                {error ? (
                    <p className="font-body-2 text-red-500">{error}</p>
                ) : (
                    <p className="font-body-2 text-transparent">placeholder</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
export default Input;
