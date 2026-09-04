import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface AdminToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const AdminToastContainer: React.FC<AdminToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const bgColors = {
    success: 'bg-emerald-50 dark:bg-emerald-950/90 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100',
    error: 'bg-rose-50 dark:bg-rose-950/90 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-100',
    info: 'bg-blue-50 dark:bg-blue-950/90 border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-100'
  };

  const Icons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info
  };

  const Icon = Icons[toast.type];

  return (
    <div
      className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border shadow-lg backdrop-blur-md animate-in slide-in-from-bottom-3 duration-200 ${bgColors[toast.type]}`}
    >
      <div className="flex items-center gap-2.5">
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="text-xs font-semibold">{toast.text}</span>
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors ml-2"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
