import React, { useState, useEffect } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { AppBar, Grid, Toolbar, Typography, Link, Button, Tooltip } from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';

import { FC } from '../../util';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary
  },
  title: {
    flexGrow: 1
  },
  link: {
    textDecoration: 'none'
  }
}));

export interface HeaderProps {
  switchTheme: (darkModeOn: boolean) => void;
  siteTitle?: string;
}

const Header: FC<HeaderProps> = (props) => {
  // use default theme from user os settings
  const [darkModeOn, setDarkModeOn] = useState<boolean>(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const styles = useStyles();

  const onSwitch = (): void => {
    setDarkModeOn((prev) => !prev);
  };

  useEffect(() => {
    props.switchTheme(darkModeOn);
  }, [darkModeOn]);

  return (
    <AppBar component="header" position="static" className={styles.root}>
      <Toolbar>
        <Grid container>
          <Grid item spacing={3}>
            <Typography variant="h6" className={styles.title}>
              <Link to="/" component={GatsbyLink} color="inherit" className={styles.link}>
                SAFER
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="text">
              <GatsbyLink to="/page-two">Step Zero Calulator</GatsbyLink>
            </Button>
            <Button variant="text">
              <GatsbyLink to="/">Resources</GatsbyLink>
            </Button>
          </Grid>
        </Grid>
        <Tooltip title="switch theme">
          <Button onClick={onSwitch}>
            {darkModeOn ? <BsToggleOn size="40" /> : <BsToggleOff size="40" />}
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
