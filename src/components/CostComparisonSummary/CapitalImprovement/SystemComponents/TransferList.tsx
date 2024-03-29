import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme
} from '@mui/material';
import {
  Delete as DeleteIcon,
  ContentCopy as ContentCopyIcon,
  KeyboardArrowLeft as ArrowLeftIcon,
  KeyboardArrowRight as ArrowRightIcon
} from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { ComponentProperties } from '../../../../util/interfaces';

const useStyles = makeStyles((theme: Theme) => ({
  transferListContainer: {
    border: '0.1rem solid grey',
    borderRadius: '0.25rem',
    padding: '0.5rem',
    margin: '0.5rem'
  },
  customList: {
    width: 250,
    height: 300,
    overflow: 'auto'
  },
  buttonGridContainer: {
    margin: '0 5rem'
  },
  transferListIcons: {
    width: '1.25rem'
  }
}));

function not(a: readonly ComponentProperties[], b: readonly ComponentProperties[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly ComponentProperties[], b: readonly ComponentProperties[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const TransferList = ({
  existingComponents,
  newComponents,
  setExistingCpnts,
  setNewCpnts
}: {
  existingComponents: ComponentProperties[];
  newComponents: ComponentProperties[];
  setExistingCpnts: React.Dispatch<any>;
  setNewCpnts: React.Dispatch<any>;
}) => {
  const classes = useStyles();

  const [checked, setChecked] = React.useState<readonly ComponentProperties[]>([]);
  const leftChecked = intersection(checked, existingComponents);
  const rightChecked = intersection(checked, newComponents);

  // Checkbox Functionality
  const handleToggle = (value: ComponentProperties) => () => {
    const currentIndex = checked.indexOf(value); // 0 through length of array
    // if value not in checked, indexOf returns -1
    const newChecked = [...checked];

    // if index is -1, that means checked value not currently in array
    // pushing to new checked
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      // if is in array, checked item needs to be removed from array
      // splice out item at currentIndex, remove 1 element
      newChecked.splice(currentIndex, 1);
    }

    // set newchecked array
    setChecked(newChecked);
  };

  // Handle Selected Items functionality
  const handleCheckedRight = () => {
    setNewCpnts(newComponents.concat(leftChecked));
    setExistingCpnts(not(existingComponents, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setExistingCpnts(existingComponents.concat(rightChecked));
    setNewCpnts(not(newComponents, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleCopy = () => {
    let leftCheckedCopy = [...leftChecked].map((obj) => ({
      ...obj,
      uid: Math.random(),
      quantity: 1
    }));
    let rightCheckedCopy = [...rightChecked].map((obj) => ({
      ...obj,
      uid: Math.random(),
      quantity: 1
    }));
    setNewCpnts([...newComponents, ...leftCheckedCopy]);
    setExistingCpnts([...existingComponents, ...rightCheckedCopy]);
    setChecked([]);
  };

  const handleDelete = () => {
    let updatedExisting = [...existingComponents];
    let updatedNew = [...newComponents];

    leftChecked.forEach((obj) => {
      updatedExisting.splice(updatedExisting.indexOf(obj), 1);
    });
    rightChecked.forEach((obj) => {
      updatedNew.splice(updatedNew.indexOf(obj), 1);
    });

    setExistingCpnts([...updatedExisting]);
    setNewCpnts([...updatedNew]);
    setChecked([]);
  };

  const customList = (title: string, components: readonly ComponentProperties[]) => (
    <>
      <Box>{title}</Box>
      <Box className={classes.customList}>
        <List dense component="div" role="list">
          {components.map((cpnt: ComponentProperties, idx) => {
            const labelId = `transfer-list-item-${cpnt?.component}-label`;
            return (
              <ListItem
                key={`${cpnt.component}-${idx}`}
                role="listitem"
                button
                onClick={handleToggle(cpnt)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(cpnt) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': labelId
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${cpnt.component}`} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Box>
    </>
  );

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.transferListContainer}
    >
      <Grid item>{customList('Existing', existingComponents)}</Grid>
      <Grid item className={classes.buttonGridContainer}>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            <ArrowRightIcon className={classes.transferListIcons} />
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            <ArrowLeftIcon className={classes.transferListIcons} />
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCopy}
            disabled={checked.length === 0}
            aria-label="copy to other side"
          >
            <ContentCopyIcon className={classes.transferListIcons} />
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleDelete}
            disabled={checked.length === 0}
            aria-label="delete"
          >
            <DeleteIcon className={classes.transferListIcons} />
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('New', newComponents)}</Grid>
    </Grid>
  );
};

export default TransferList;
