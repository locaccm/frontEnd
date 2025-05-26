import React from "react";
import { cn } from "../../lib/utils.js";

// Define the props for the Input component
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

// ForwardRef to allow parent components to access the input DOM node
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
        // Basic styled input element with focus and shadow styles
        <input
            ref={ref}
            className={cn(
            "w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
            className
            )}
            {...props}
        />
        );
    }
);

// Set a display name for debugging/dev tools
Input.displayName = "Input";
