import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { makeStyles } from '@mui/styles';
import { Typography, Link, Container, Theme } from '@mui/material';
import { Seo, Lazy } from '../components';
import { FC } from '../util';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  link: {
    color: theme.palette.text.secondary,
    textDecoration: 'underline'
  }
}));

const Resources: FC = () => {
  const styles = useStyles();
  return (
    <Lazy type="fade" delay={500} timeout={1000}>
      <Container maxWidth="md" className={styles.root}>
        <Seo title="resources" />
        <Typography variant="h2" gutterBottom component="h1">
          Resources Page
        </Typography>

        <Typography variant="body1">
          <Link component={GatsbyLink} to="/" className={styles.link}>
            Go back to the homepage
          </Link>
        </Typography>
      </Container>
    </Lazy>
  );
};

export default Resources;
