import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

function loadLanguageFile(language) {
  switch (language) {
    case 'en':
      return import('./lang/en.json');
    case 'es':
      return import('./lang/es.json');
    default:
      return import('./lang/en.json');
  }
}

export default async function bootstrapLocale(langage) {
  const messages = await loadLanguageFile(langage);
  function LocaleWrapper(props) {
    const { children } = props;
    return (
      <IntlProvider locale={navigator.language} messages={messages}>
        {children}
      </IntlProvider>
    );
  }

  LocaleWrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return LocaleWrapper;
}
