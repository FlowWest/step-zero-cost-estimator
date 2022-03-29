import React from 'react';
import { FC } from '../../util';
import { Button, Container, Grid, MenuItem, TextField, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    fontWeight: 'bold'
  },
  contentWrapper: {
    background: '#fff',
    borderTop: `1rem solid ${theme.palette.primary.main}`,
    minHeight: '300px',
    padding: '25px'
  }
}));

interface ContentWrapperProps {
  title: string;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ title, children }) => {
  const styles = useStyles();
  return (
    <Grid item>
      <Typography variant="h5" gutterBottom className={styles.header}>
        {title}
      </Typography>
      <Container className={styles.contentWrapper}>{children}</Container>
    </Grid>
  );
};

export default ContentWrapper;
