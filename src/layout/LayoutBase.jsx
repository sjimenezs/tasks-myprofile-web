import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  mainContainer: {
    flexGrow: 1,
    padding: '0.5rem',
  },
});

function LayoutBase({ children }) {
  const { formatMessage } = useIntl();
  const classes = useStyles();

  return (
    <>
      <div className={classes.rootContainer}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              {formatMessage({ id: 'skills' })}
            </Typography>
          </Toolbar>
        </AppBar>
        <main aria-live="assertive" className={classes.mainContainer}>
          {children}
        </main>
      </div>
    </>
  );
}

LayoutBase.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutBase;
