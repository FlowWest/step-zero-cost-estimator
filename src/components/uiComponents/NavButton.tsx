import React from 'react';
import { Button } from '@mui/material';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  navButton: {
    color: '#fff',
    backgroundColor: 'transparent',
    borderRadius: 0,
    height: '100%',
    padding: '0 1.25rem',
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    }
  },
  active: {
    backgroundColor: theme.palette.primary.light
  }
}));

function NavButton({ children, ...otherProps }: any) {
  const style = useStyles();
  return (
    <Button
      variant="text"
      className={style.navButton}
      {...otherProps}
      activeClassName={style.active}
    >
      {children}
    </Button>
  );
}

export default NavButton;
