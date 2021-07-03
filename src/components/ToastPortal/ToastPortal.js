import { uuid } from 'shared';
import ReactDOM from 'react-dom';
import { Toast } from 'components';
import styles from './styles.module.css';
import { useToastPortal, useToastAutoClose } from 'hooks';
import { useState, forwardRef, useImperativeHandle } from 'react';

/**
 * The parent of this component should not have
 * to worry about maintaining a list of message
 * objects. That would require the parent to
 * also manage the deletion of toasts, etc.
 *
 * To accommodate this, we are using a combination
 * of useImperativeHandle and forwardRef to give
 * the parent access to this component's addMessage
 * functionality.
 */

export const ToastPortal = forwardRef(
  ({ autoClose = false, autoCloseTime = 5000 }, ref) => {
    const [toasts, setToasts] = useState([]);
    const { loaded, portalId } = useToastPortal();

    useToastAutoClose({
      toasts,
      setToasts,
      autoClose,
      autoCloseTime,
    });

    const removeToast = id => {
      setToasts(toasts.filter(t => t.id !== id));
    };

    useImperativeHandle(ref, () => ({
      addMessage(toast) {
        setToasts([...toasts, { ...toast, id: uuid() }]);
      },
    }));

    return loaded ? (
      ReactDOM.createPortal(
        <div className={styles.toastContainer}>
          {toasts.map(t => (
            <Toast
              key={t.id}
              mode={t.mode}
              message={t.message}
              onClose={() => removeToast(t.id)}
            />
          ))}
        </div>,

        document.getElementById(portalId),
      )
    ) : (
      <></>
    );
  },
);
