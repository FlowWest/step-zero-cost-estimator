import React, { useState } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { makeStyles } from '@mui/styles';
import { Tabs, Tab, Typography, Link, Grid, Theme, Box } from '@mui/material';
import { ResourceObject } from '../util/interfaces';
import ResourceCard from '../components/uiComponents/ResourceCard';
import { Seo } from '../components';
import { FC } from '../util';
import { resourceDataObjects } from '../util';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline', fontWeight: 500 }
  },
  tabsContainer: {
    backgroundColor: theme.palette.background.content,
    marginBottom: '1rem'
  }
}));

const Resources: FC = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('waterRates');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };
  return (
    <Grid container className={classes.root}>
      <Seo title="Resources" />
      <Grid container item xs={12}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Resources
          </Typography>
        </Grid>

        <Grid item>
          <Typography paragraph gutterBottom>
            In addition to the calculators available within this application, the State Water Board
            provides tools and resources to assist water systems with their strategic planning.
            Click below to access tools and resources for health departments.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.tabsContainer}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              centered
              aria-label="resource categories"
            >
              <Tab label="Water Rates" value="waterRates" />
              <Tab label="Technical Assistance" value="technicalAssistance" />
              <Tab label="Governance" value="governance" />
              <Tab label="Funding" value="funding" />
            </Tabs>
          </Box>
        </Grid>
        <Grid item container xs={12} style={{ gap: 25 }}>
          {resourceDataObjects.reduce((array: Array<any>, resource: any, currentIndex: number) => {
            if (resource?.category === currentTab) {
              array.push(<ResourceCard resource={resource} key={currentIndex} />);
            }
            return array;
          }, [])}
        </Grid>
      </Grid>

      <Grid item style={{ marginTop: 30 }} xs={12}>
        <Typography variant="body1">
          <Link component={GatsbyLink} to="/" className={classes.link}>
            Go back to the homepage
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Resources;
