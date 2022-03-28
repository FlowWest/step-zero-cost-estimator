import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Grid, Button, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Seo, Hero, Lazy } from '../components';
import { FC } from '../util';

const useStyles = makeStyles((theme: Theme) => ({
  heroButtons: {
    marginTop: theme.spacing(4)
  }
}));

const IndexPage: FC = () => {
  const styles = useStyles();
  return (
    <Grid container item justifyContent="center" xs={12}>
      <Seo title="Home" />
      <Grid item xs={10}>
        <Hero
          title="Hi people"
          description="Welcome to your new Gatsby site. Now go build something great with
            Typescript and Material-ui."
        >
          <div className={styles.heroButtons}>
            <Grid container justify="center">
              <Grid item></Grid>
            </Grid>
          </div>
        </Hero>
      </Grid>
    </Grid>
  );
};

export default IndexPage;
