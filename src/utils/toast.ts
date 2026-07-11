import { toast } from "sonner";

export function generateToast(message: string, type: "success" | "error" | "default") {
    if (type === "error") {
        toast(message, {
            style: {
                backgroundColor: "var(--color-toast-red-bg)",
                border: "var(--color-toast-red-border)"
            }
        });
    } else if (type === "success") {
        toast(message, {
            style: {
                backgroundColor: "var(--color-toast-success-bg)",
                border: "var(--color-toast-success-border)"
            }
        });
    } else {
        toast(message);
    }
}
