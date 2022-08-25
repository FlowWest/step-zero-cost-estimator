import React from 'react';
import { Container, Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  description: { marginBottom: 25 },
  contentWrapper: {
    background: theme.palette.background.content,
    borderTop: `.5rem solid ${theme.palette.primary.main}`,
    // minHeight: '18.75rem',
    padding: '1.56rem'
  }
}));

interface ContentWrapperProps {
  title: string;
  description?: string;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ title, description, children }) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      {description !== undefined && (
        <Typography className={classes.description}>{description}</Typography>
      )}
      <Container className={classes.contentWrapper}>{children}</Container>
    </>
  );
};

export default ContentWrapper;
