
import { toast as sonnerToast } from "sonner";

export type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
  [key: string]: any;
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

// تحديث طرق المساعدة لتتوافق مع الاستخدام الحالي
toast.success = (message: string, options = {}) => {
  return sonnerToast.success(message, options);
};

toast.error = (message: string, options = {}) => {
  return sonnerToast.error(message, options);
};

toast.info = (message: string, options = {}) => {
  return sonnerToast.info(message, options);
};

toast.warning = (message: string, options = {}) => {
  return sonnerToast.warning(message, options);
};

export { toast };

export function useToast() {
  return {
    toast
  };
}
