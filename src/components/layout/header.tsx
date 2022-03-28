import React, { useState, useEffect } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { AppBar, Toolbar, Typography, Link, Button, Tooltip } from '@material-ui/core';
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
  const [showOn, setShowOn] = useState<boolean>(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const styles = useStyles();

  const onSwitch = (): void => {
    setShowOn((prev) => !prev);
  };

  useEffect(() => {
    props.switchTheme(showOn);
  }, [showOn]);

  return (
    <AppBar component="header" position="static" className={styles.root}>
      <Toolbar>
        <Typography variant="h6" className={styles.title}>
          <Link to="/" component={GatsbyLink} color="inherit" className={styles.link}>
            {props.siteTitle || ''}
          </Link>
        </Typography>
        <Tooltip title="switch theme">
          <Button onClick={onSwitch}>
            {showOn ? <BsToggleOn size="40" /> : <BsToggleOff size="40" />}
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
