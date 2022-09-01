import React, { useState } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { makeStyles } from '@mui/styles';
import { Tabs, Tab, Typography, Link, Grid, Theme, Box } from '@mui/material';
import { ResourceObject } from '../util/interfaces';
import ResourceCard from '../components/uiComponents/ResourceCard';
import { Seo } from '../components';
import { FC } from '../util';

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

const resourceDataObjects: ResourceObject[] = [
  {
    logo: 'http://sourcewaterpa-archive.prwa.com/wp-content/uploads/2014/12/SDWA-40-Anniv-Logo-JPEG-279x300.jpg',
    description:
      'The Drinking Water State Revolving Fund (DWRSF) program assists public water systems in financing the cost of drinking water infrastructure projects needed to achieve or maintain compliance with Safe Drinking Water Act (SDWA) requirements.',
    title: 'Drinking Water State Revolving Fund',
    link: 'https://www.waterboards.ca.gov/drinking_water/services/funding/SRF.html',
    category: 'funding'
  },
  {
    logo: 'https://www.waterboards.ca.gov/images/water_issues/prop_1_logo.jpg',
    description:
      'The Office of Sustainable Water Solutions (OSWS) administers the Technical Assistance (TA) Funding Program. TA is available to help small, disadvantaged communities (DACs) develop, fund, and implement eligible drinking water, wastewater, stormwater, or groundwater needs.',
    title: 'Technical Assistance Funding Program',
    link: 'https://www.waterboards.ca.gov/water_issues/programs/grants_loans/tech_asst_funding.html',
    category: 'funding'
  },
  {
    logo: 'https://catalog.dcc.edu/mime/media/11/213/Financial%20Assistance2.jpg',
    description:
      'The Financial Assistance Application Submittal Tool (FAAST) allows potential funding recipients to apply for grant and loan funding offered by various State agencies.',
    title: 'Financial Assistance Application Submittal Tool (FAAST)',
    link: 'https://faast.waterboards.ca.gov/Login.aspx',
    category: 'funding'
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/7f/SWRCB_Logo1.jpg',
    description:
      "The Division of Drinking Water (DDW) acts as the administrative arm of the Utah Drinking Water Board. It is engaged in a variety of activities related to the design and operation of California's public drinking water systems.",
    title: 'DDW District Offices',
    link: 'https://www.waterboards.ca.gov/drinking_water/programs/documents/ddwem/DDWdistrictofficesmap.pdf',
    category: 'funding'
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/7f/SWRCB_Logo1.jpg',
    description:
      'The Safe and Affordable Funding for Equity and Resilience (SAFER) Engagement Unit is a team of engineers and program specialists within the Division of Drinking Water. Our mission is to support water systems in achieving long-term sustainability.',
    title: 'DDW SAFER Engagement Units',
    link: 'https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/docs/2022/eu-map.pdf',
    category: 'funding'
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/7f/SWRCB_Logo1.jpg',
    description:
      'This map application is a visualization of completed water system consolidations and other partnership activities tracked and fostered by the SAFER engagement unit. Consolidations and community water system partnerships are encouraged to build resiliency for water quality and quantity across California.',
    title: "DDW's Water Partnership Page",
    link: 'https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/docs/2022/eu-map.pdf',
    category: 'funding'
  }
];

const Resources: FC = () => {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('1');

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
