import { useRef, useState } from 'react';
import styles from './styles.module.css';
import { ToastPortal } from 'components';

export const App = () => {
  const toastRef = useRef();
  const [text, setText] = useState('');
  const [mode, setMode] = useState('info');

  const addToast = () => {
    toastRef.current.addMessage({ mode, message: text });
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
              addToast();
              setText('');
            }
          }}
        >
          <select value={mode} onChange={e => setMode(e.target.value)}>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>

          <input
            value={text}
            placeholder="Toast Value"
            onChange={e => setText(e.target.value)}
          />

          <button>Submit</button>
        </form>
      </div>

      <ToastPortal autoClose ref={toastRef} />
    </div>
  );
};
