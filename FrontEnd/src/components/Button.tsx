import type { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    bgColor: string;
}

export function Button({ children, onClick, disabled = false, bgColor }: ButtonProps) {
    const styles = `p-8 text-2xl border-b w-full border rounded-xl ${bgColor}`;

    return (
        <button onClick={onClick} disabled={disabled} type="button" className={styles}>
            {children}
        </button>
    );
}