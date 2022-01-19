import { useEffect, useState } from 'react';

export const useToastAutoClose = ({
  toasts,
  setToasts,
  autoClose,
  autoCloseTime,
}) => {
  const [removing, setRemoving] = useState('');

  useEffect(() => {
    if (removing) {
      setToasts(t => t.filter(_t => _t.id !== removing));
    }
  }, [removing, setToasts]);

  useEffect(() => {
    if (autoClose.shouldAutoClose && toasts.length) {
      const id = autoClose.toastId;
      setTimeout(() => setRemoving(id), autoCloseTime);
    }
  }, [toasts, autoClose, autoCloseTime]);
};
