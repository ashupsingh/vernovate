import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-vernovate-primary hover:bg-vernovate-accent text-black shadow-lg shadow-vernovate-primary/30",
        secondary: "bg-transparent border border-black/10 hover:bg-black/5 text-black",
        outline: "border-2 border-vernovate-primary text-vernovate-primary hover:bg-vernovate-primary hover:text-white"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
