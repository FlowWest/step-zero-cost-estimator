import React from 'react';
import {
  Grid,
  Theme,
  Typography,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  IconButton
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { startCase } from 'lodash';
import { Close } from '@mui/icons-material';

const useStyles = makeStyles((theme: Theme) => ({
  dialogContainer: {
    background: theme.palette.background.content
  },
  systemsContent: {
    margin: '2rem 0'
  }
}));

export const WaterSystemDetailsDialog = ({
  state,
  systemsDetailsDialogIsOpen,
  handleCloseSystemsDetailsDialog
}: {
  state: any;
  systemsDetailsDialogIsOpen: boolean;
  handleCloseSystemsDetailsDialog: any;
}) => {
  const styles = useStyles();
  return (
    <Dialog
      open={systemsDetailsDialogIsOpen}
      onClose={handleCloseSystemsDetailsDialog}
      classes={{ paper: styles.dialogContainer }}
      maxWidth="md"
    >
      <DialogTitle>
        <Typography variant="h5">View Water System Details</Typography>
        <IconButton
          aria-label="close"
          onClick={handleCloseSystemsDetailsDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">
          These values are meant to be a starting point for your calculations and estimates. You may
          adjust those values using the consolidation calculator.
        </Typography>
        <Grid container className={styles.systemsContent} spacing={1}>
          <Grid item xs={6}>
            <Typography variant="h6">Joining System</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Name: ${state.currentWaterSystem?.joinSystemName}`}
                ></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`PWSID: ${state.currentWaterSystem?.joinSystemPWSID}`}
                ></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Class: ${startCase(state.currentWaterSystem?.joinClassNew)}`}
                ></ListItemText>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">Receiving System</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Name: ${state.currentWaterSystem?.receivingSystemName}`}
                ></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`PWSID: ${state.currentWaterSystem?.receivingSystemPassword}`}
                ></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Type: ${startCase(state.currentWaterSystem?.receivingType)}`}
                ></ListItemText>
              </ListItem>
            </List>
          </Grid>
          <Divider style={{ width: '100%' }} />
          <Grid item xs={12}>
            <Typography variant="h6">Route</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Merge Type: ${state.currentWaterSystem?.mergeType}`}
                ></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Route Distance: ${parseFloat(
                    state.currentWaterSystem?.distanceFt
                  ).toFixed(2)} feet`}
                ></ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Route Name: ${state.currentWaterSystem?.routeName}`}
                ></ListItemText>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default WaterSystemDetailsDialog;
