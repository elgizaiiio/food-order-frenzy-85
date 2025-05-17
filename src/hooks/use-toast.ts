
import { toast as sonnerToast, ToastT } from "sonner";

type ToastProps = Omit<ToastT, "id"> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
};

const toast = (props: ToastProps | string) => {
  if (typeof props === 'string') {
    return sonnerToast(props);
  }
  
  const { title, description, variant, ...rest } = props;
  
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
    toast
  };
}
