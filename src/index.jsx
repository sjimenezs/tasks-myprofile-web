import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import bootstrapLocale from './localeutil';

async function startApp() {
  const Bootstrap = await bootstrapLocale(navigator.language);

  ReactDOM.render(
    <React.StrictMode>
      <Bootstrap>
        <App />
      </Bootstrap>
    </React.StrictMode>,
    document.getElementById('root'),
  );
}

startApp();
