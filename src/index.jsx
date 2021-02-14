import React from 'react';
import ReactDOM from 'react-dom';
import HomeView from './home/HomeView';
import './index.css';
import bootstrapLocale from './localeutil';

async function startApp() {
  const Bootstrap = await bootstrapLocale(navigator.language);

  ReactDOM.render(
    <React.StrictMode>
      <Bootstrap>
        <HomeView />
      </Bootstrap>
    </React.StrictMode>,
    document.getElementById('root'),
  );
}

startApp();
