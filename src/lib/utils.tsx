// Utility function to concatenate class names conditionally
export function cn(...classes: (string | false | null | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}