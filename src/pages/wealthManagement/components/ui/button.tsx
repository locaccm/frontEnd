import React from "react";
import { cn } from "../../lib/utils.js"; 

// Define prop types for the Button component
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "destructive"; // Style variants
  size?: "sm" | "md"; // Size options
};

// Button component with variant and size customization
export const Button = ({className, variant = "default", size = "md", ...props}: ButtonProps) => {
    // CSS classes for each variant type
    const variants = {
        default: "bg-blue-600 text-white hover:bg-blue-700", 
        outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
        destructive: "bg-red-600 text-white hover:bg-red-700", 
    };

    // CSS classes for button sizing
    const sizes = {
        sm: "text-sm px-3 py-1.5", 
        md: "text-base px-4 py-2",
    };

    return (
        <button
        className={cn(
            "rounded-2xl font-medium transition-colors focus:outline-none", 
            variants[variant], 
            sizes[size], 
            className 
        )}
        {...props} 
        />
    );
};
