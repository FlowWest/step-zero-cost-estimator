import React from 'react';
import { Container, Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    fontWeight: 'bold'
  },
  contentWrapper: {
    background: theme.palette.background.content,
    borderTop: `.5rem solid ${theme.palette.primary.main}`,
    // minHeight: '18.75rem',
    padding: '1.56rem'
  }
}));

interface ContentWrapperProps {
  title: string;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ title, children }) => {
  const styles = useStyles();
  return (
    <>
      <Typography variant="h5" gutterBottom className={styles.header}>
        {title}
      </Typography>
      <Container className={styles.contentWrapper}>{children}</Container>
    </>
  );
};

export default ContentWrapper;
