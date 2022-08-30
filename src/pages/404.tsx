import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Typography, Container, Link } from '@mui/material';
import { Theme } from '@mui/material/styles';

import makeStyles from '@mui/styles/makeStyles';

import { Seo } from '../components';
import { FC } from '../util';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline', fontWeight: 500 }
  }
}));

const NotFoundPage: FC = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.root}>
      <Seo title="404: Not found" />
      <Typography variant="h2" gutterBottom component="h1">
        NOT FOUND
      </Typography>
      <Typography variant="body1">Oops! The page you are looking for does not exist.</Typography>
      <Typography variant="body1" style={{ marginTop: '1rem' }}>
        <Link component={GatsbyLink} to="/" className={classes.link}>
          Go back to the homepage
        </Link>
      </Typography>
    </Container>
  );
};

export default NotFoundPage;
