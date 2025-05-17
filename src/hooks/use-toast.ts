
import { toast as sonnerToast, type Toast as SonnerToast } from "sonner";

type ToastProps = SonnerToast & {
  title?: React.ReactNode;
  description?: React.ReactNode;
};

const toast = (props: ToastProps | string) => {
  if (typeof props === 'string') {
    return sonnerToast(props);
  }
  
  const { title, description, ...rest } = props;
  
  if (title && description) {
    return sonnerToast(title as string, {
      description,
      ...rest
    });
  }
  
  return sonnerToast(title as string, rest);
};

export { toast };

export function useToast() {
  return {
    toast,
    toasts: [] // Add this to fix the type error in toaster.tsx
  };
}
