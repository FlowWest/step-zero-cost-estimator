import React, { useEffect } from 'react';
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
import { makeStyles } from '@mui/styles';
import { ComponentProperties } from '../../../util/interfaces';
import { uid } from 'uid';

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
  const styles = useStyles();

  const [checked, setChecked] = React.useState<readonly ComponentProperties[]>([]);
  const leftChecked = intersection(checked, existingComponents);
  const rightChecked = intersection(checked, newComponents);

  useEffect(() => {
    let existingUids: any[] = [];
    let newUids: any[] = [];
    let canUpdateState: boolean = false;

    // populate uid arrays
    existingComponents.forEach((obj) => {
      existingUids.push(obj.uid);
    });
    newComponents.forEach((obj) => {
      newUids.push(obj.uid);
    });

    // check if arrays have matching uid
    newUids.forEach((uid) => {
      if (existingUids.includes(uid)) {
        canUpdateState = true;
      }
    });
    existingUids.forEach((uid) => {
      if (newUids.includes(uid)) {
        canUpdateState = true;
      }
    });

    // update state
    if (canUpdateState) {
      console.log(`Now updating all uid's`);
      let newCopy = [...newComponents];
      newCopy.forEach((obj) => {
        obj['uid'] = uid();
      });
      console.log('prev. new: ', newComponents, 'updated new: ', newCopy);
      // setNewCpnts([...newComponents, ...newCopy]);

      let existingCopy = [...existingComponents];
      existingCopy.forEach((obj) => {
        obj['uid'] = uid();
      });
      console.log('prev. existing: ', existingComponents, 'updated existing: ', existingCopy);
      // setExistingCpnts([...existingComponents, ...existingCopy]);
    }
  }, [existingComponents, newComponents]);

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
  const handleAllRight = () => {
    setNewCpnts(newComponents.concat(existingComponents));
    setExistingCpnts([]);
  };

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

  const handleAllLeft = () => {
    setExistingCpnts(existingComponents.concat(newComponents));
    setNewCpnts([]);
  };

  const handleCopy = () => {
    let leftCheckedCopy = [...leftChecked];
    let rightCheckedCopy = [...rightChecked];
    setNewCpnts([...newComponents, ...leftCheckedCopy]);
    setExistingCpnts([...existingComponents, ...rightCheckedCopy]);
    setChecked([]);
  };

  const customList = (title: string, components: readonly ComponentProperties[]) => (
    <>
      <Box>{title}</Box>
      <Box className={styles.customList}>
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
                <ListItemText
                  id={labelId}
                  primary={`${cpnt.component}`}
                  secondary={`Unit Cost: ${cpnt.avgLife}`}
                />
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
      className={styles.transferListContainer}
    >
      <Grid item>{customList('Existing', existingComponents)}</Grid>
      <Grid item className={styles.buttonGridContainer}>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={existingComponents.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={newComponents.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCopy}
            disabled={checked.length === 0}
            aria-label="copy to other side"
          >
            &#9851;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('New', newComponents)}</Grid>
    </Grid>
  );
};

export default TransferList;
