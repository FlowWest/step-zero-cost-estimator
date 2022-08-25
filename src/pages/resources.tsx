import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { makeStyles } from '@mui/styles';
import {
  Box,
  Typography,
  Link,
  Grid,
  Theme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardMedia,
  CardContent,
  Skeleton,
  Button
} from '@mui/material';
import { ArrowRight } from '@mui/icons-material';
import { Seo } from '../components';
import { FC } from '../util';
import ContentWrapper from '../components/uiComponents/ContentWrapper';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline', fontWeight: 500 }
  }
}));

const resourceDataObjects = [
  {
    logo: 'http://sourcewaterpa-archive.prwa.com/wp-content/uploads/2014/12/SDWA-40-Anniv-Logo-JPEG-279x300.jpg',
    description:
      'The Drinking Water State Revolving Fund (DWRSF) program assists public water systems in financing the cost of drinking water infrastructure projects needed to achieve or maintain compliance with Safe Drinking Water Act (SDWA) requirements.',
    title: 'Drinking Water State Revolving Fund',
    link: 'https://www.waterboards.ca.gov/drinking_water/services/funding/SRF.html'
  },
  {
    logo: 'https://www.waterboards.ca.gov/images/water_issues/prop_1_logo.jpg',
    description:
      'The Office of Sustainable Water Solutions (OSWS) administers the Technical Assistance (TA) Funding Program. TA is available to help small1 disadvantaged2 communities (DACs) develop, fund, and implement eligible drinking water3, wastewater3, stormwater4, or groundwater5 needs. TA include but is not limited to coordination and development of capital improvement projects, facilitation of operation and maintenance, engineering and environmental analysis, legal assistance, leak detection/water audits, compliance audits, financial analysis, technical managerial and financial (TMF) assessments, and board or operator training.',
    title: 'Technical Assistance Funding Program',
    link: 'https://www.waterboards.ca.gov/water_issues/programs/grants_loans/tech_asst_funding.html'
  },
  {
    logo: 'https://catalog.dcc.edu/mime/media/11/213/Financial%20Assistance2.jpg',
    description:
      "The Financial Assistance Application Submittal Tool (FAAST) allows potential funding recipients to apply for grant and loan funding offered by various State agencies. The State Water Resources Control Board's Division of Financial Assistance (Division) is responsible for administering the FAAST system. The Division also administers various financial assistance programs for planning, design, and construction of municipal sewage and water recycling facilities, drinking water facilities, stormwater, groundwater, and nonpoint source pollution control projects.",
    title: 'Financial Assistance Application Submittal Tool (FAAST)',
    link: 'https://faast.waterboards.ca.gov/Login.aspx'
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/7f/SWRCB_Logo1.jpg',
    description:
      "The Division of Drinking Water (DDW) acts as the administrative arm of the Utah Drinking Water Board. It implements the rules which they adopt. As such, it is engaged in a variety of activities related to the design and operation of California's public drinking water systems.",
    title: 'DDW District Offices',
    link: 'https://www.waterboards.ca.gov/drinking_water/programs/documents/ddwem/DDWdistrictofficesmap.pdf'
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/7f/SWRCB_Logo1.jpg',
    description:
      'The Safe and Affordable Funding for Equity and Resilience (SAFER) Engagement Unit is a team of engineers and program specialists within the Division of Drinking Water. Our mission is to support water systems in achieving long-term sustainability. We organize water quality and quantity improvement projects for water systems currently on, or at-risk of being on the Human Right to Water (HR2W) list. SAFER promotes community participation, facilitate funding discussions, coordinate water system Administrator appointments, and advance sustainable alternatives such as water partnerships. Use the links below to explore the HR2W projects and work of the engagement unit.',
    title: 'DDW SAFER Engagement Units',
    link: 'https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/docs/2022/eu-map.pdf'
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/en/7/7f/SWRCB_Logo1.jpg',
    description:
      'This map application is a visualization of completed water system consolidations and other partnership activities tracked and fostered by the SAFER engagement unit. Consolidations and community water system partnerships are encouraged to build resiliency for water quality and quantity across California, furthering sustainable water system goals outlined by the Human Right to Water and Safe and Affordable Drinking Water Fund Expenditure Plan. For more information, visit the SAFER homepage. The water system partnership events are the main content layer, California Drinking Water System Area Boundaries and California Counties are included for additional reference. This map will be updated quarterly.',
    title: "DDW's Water Partnership Page",
    link: 'https://www.waterboards.ca.gov/drinking_water/certlic/drinkingwater/docs/2022/eu-map.pdf'
  }
];

const Resources: FC = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      {/* <Grid item xs={12}>
        <Seo title="Resources" />
        <Typography variant="h2" gutterBottom>
          Resources Page
        </Typography>
      </Grid> */}
      {/* =========================================== */}
      {/* OPTION 1: LIST */}
      {/* =========================================== */}

      <Grid item xs={12}>
        <ContentWrapper
          title={'Resources'}
          description={`(EXAMPLE FROM CDC): In addition to funding, CDC provides tools and resources to assist health departments with their strategic planning to strengthen their public health preparedness capabilities. Click below to access tools and resources for health departments.`}
        >
          <List>
            {resourceDataObjects.map((obj) => (
              <ListItem key={obj.title}>
                <ListItemIcon>
                  <ArrowRight color="primary" />
                </ListItemIcon>
                <ListItemText>
                  <Typography>{obj.title}</Typography>
                  <Typography>
                    <Link
                      component={GatsbyLink}
                      to={obj.link}
                      target="_blank"
                      className={classes.link}
                    >
                      {obj.link}
                    </Link>
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </ContentWrapper>
      </Grid>

      {/* =========================================== */}
      {/* OPTION 2: CARDS */}
      {/* =========================================== */}

      {/* <Grid container item xs={12}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
            Resources
          </Typography>
        </Grid>

        <Grid item>
          <Typography paragraph gutterBottom>
            (EXAMPLE FROM CDC): In addition to funding, CDC provides tools and resources to assist
            health departments with their strategic planning to strengthen their public health
            preparedness capabilities. Click below to access tools and resources for health
            departments.
          </Typography>
        </Grid>

        <Grid item container xs={12} style={{ gap: 25 }}>
          {resourceDataObjects.map((obj, idx) => (
            <Grid item container xs={12} key={idx} component={Card} style={{ background: '#fff' }}>
              <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  style={{
                    height: 250,
                    width: 250,
                    margin: 25,

                    backgroundImage: `url(${obj.logo})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center'
                  }}
                />
              </Grid>
              <Grid item xs={8}>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    {obj.title}
                  </Typography>
                  <Typography paragraph>{obj.description}</Typography>
                  <Button variant="outlined" href={obj.link} target="_blank">
                    Learn More
                  </Button>
                </CardContent>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid> */}

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
