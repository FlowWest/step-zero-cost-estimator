import React, { useState, useEffect } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { AppBar, Grid, Toolbar, Typography, Link, Tooltip } from '@mui/material';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';
import Button from '../uiComponents/NavButton';

import { FC } from '../../util';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary
  },
  title: {
    flexGrow: 1,
    fontSize: '3rem',
    fontWeight: 300
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
  // const [darkModeOn, setDarkModeOn] = useState<boolean>(
  //   window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  // );
  const [darkModeOn, setDarkModeOn] = useState<boolean>(false);
  const classes = useStyles();

  const onSwitch = (): void => {
    setDarkModeOn((prev) => !prev);
  };

  useEffect(() => {
    props.switchTheme(darkModeOn);
  }, [darkModeOn]);

  return (
    <AppBar component="header" position="static" elevation={0} className={classes.root}>
      <Toolbar>
        <Grid container spacing={3}>
          <Grid item>
            <Typography variant="h6" className={classes.title}>
              <Link to="/" component={GatsbyLink} color="#fff" className={classes.link}>
                Step Zero
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Button component={GatsbyLink} to="/">
              Calculator
            </Button>
            <Button component={GatsbyLink} to="/resources">
              Resources
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
