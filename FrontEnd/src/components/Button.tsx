import React from "react";

interface ButtonProps {
    children: any,
    onClick: () => any,
    disabled: boolean,
    bgColor: string
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, bgColor }) => {
    let styles = "p-8 text-2xl border-b w-full border rounded-xl";
    styles = styles + " " + bgColor;
    return (
        <button onClick={onClick} disabled={disabled} type="button" className={styles}>
            {children}
        </button>
    );
};