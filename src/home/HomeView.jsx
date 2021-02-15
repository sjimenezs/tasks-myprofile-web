import React, { useState, useCallback, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import HomeController from './HomeController';

const useStyles = createUseStyles({
  container: {
    width: '100%',
  },
  enter: {
    width: '100%',
  },
  enterContainer: {
    marginTop: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default function HomeView() {
  const { formatMessage } = useIntl();
  const [controller] = useState(() => new HomeController());
  const [username, setUsername] = useState('');
  const [usernameValidationErrors, setUsernameValidationErrors] = useState('');

  useEffect(() => {
    controller.subscribeUsername(setUsername);
    controller.subscribeUsernameValidationsErrors(setUsernameValidationErrors);
    return () => {
      controller.unsubscribeAll();
    };
  }, []);

  const onEnterHandler = useCallback(
    (formEvent) => {
      controller.enter();
      formEvent.preventDefault();
    },
  );

  const onUsernameChangeHandler = useCallback(
    (input) => {
      controller.updateUserName(input.target.value);
    },
  );

  const classes = useStyles();

  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
      >
        <Grid container item xs={11} sm={6} md={3}>
          <Grid item className={classes.container}>
            <h1>{formatMessage({ id: 'my genome' })}</h1>
            <form autoComplete="on" className={classes.form} onSubmit={onEnterHandler} noValidate>
              <TextField
                error={usernameValidationErrors !== undefined}
                inputProps={{ 'aria-label': formatMessage({ id: 'torre.co username' }) }}
                helperText={
                  usernameValidationErrors
                  && formatMessage({ id: usernameValidationErrors })
                }
                label={formatMessage({ id: 'torre.co username' })}
                onChange={onUsernameChangeHandler}
                required
                value={username}
                variant="outlined"
              />
              <div className={classes.enterContainer}>
                <Button className={classes.enter} color="primary" size="large" type="submit" variant="contained">
                  {formatMessage({ id: 'enter' })}
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
