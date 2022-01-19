import { useRef, useState } from 'react';
import styles from './styles.module.css';
import { ToastPortal } from 'components';

export const App = () => {
  const toastRef = useRef();
  const [text, setText] = useState('');
  const [mode, setMode] = useState('info');
  const [autoClose, setAutoClose] = useState({shouldAutoClose: false, toastId: null});

  const addToast = () => {
    const toastId = toastRef.current.addMessage({ mode, message: text });
    return toastId;
  };

  return (
    <div className={styles.main}>
      <h1>Portals and Toast</h1>
      <div className={styles.content}>
        <img
          alt="toaster"
          src="/assets/toaster.svg"
          className={styles.toaster}
        />
        <form
          onSubmit={e => {
            e.preventDefault();
            if (text) {
              const toastId = addToast();
              setText('');
              if (autoClose.shouldAutoClose) {
                setAutoClose( {shouldAutoClose: true, toastId: toastId} );
              }
            }
          }}
        >
          <div className={styles.autoClose}>
            <input
              type="checkbox"
              value={autoClose.shouldAutoClose}
              onChange={e => setAutoClose({shouldAutoClose: e.target.checked, toastId: null})}
            />
            <label>Auto Close</label>
          </div>

          <select value={mode} onChange={e => setMode(e.target.value)}>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>

          <input
            type="text"
            value={text}
            placeholder="Toast Value"
            onChange={e => setText(e.target.value)}
          />

          <button>Submit</button>
        </form>
      </div>

      <ToastPortal ref={toastRef} autoClose={autoClose} />
    </div>
  );
};
