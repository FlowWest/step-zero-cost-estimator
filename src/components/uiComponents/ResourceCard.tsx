import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Theme,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ResourceObject } from '../../util/interfaces';

const useStyles = makeStyles((theme: Theme) => ({
  resourceLogo: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    height: 150,
    width: 150,
    margin: 25
  },
  cardText: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left'
    }
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
      marginTop: 0
    }
  }
}));

const ResourceCard = ({ resource }: { resource: ResourceObject }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Grid
      item
      container
      justifyContent={isSmallScreen ? 'center' : 'flex-start'}
      xs={12}
      component={Card}
      style={{ backgroundColor: theme.palette.common.white }}
    >
      <Grid item style={{ display: 'flex', alignItems: 'center' }}>
        <Box
          className={classes.resourceLogo}
          style={{
            backgroundImage: `url(${resource.logo})`
          }}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <CardContent>
          <Typography variant="h4" gutterBottom className={classes.cardText}>
            {resource.title}
          </Typography>
          <Typography paragraph className={classes.cardText}>
            {resource.description}
          </Typography>
          <Box className={classes.buttonWrapper}>
            <Button variant="outlined" href={resource.link} target="_blank">
              Learn More
            </Button>
          </Box>
        </CardContent>
      </Grid>
    </Grid>
  );
};

export default ResourceCard;
