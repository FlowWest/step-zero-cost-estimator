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
import { makeStyles } from '@mui/styles';

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const useStyles = makeStyles((theme: Theme) => ({
  transferListContainer: {
    border: '0.1rem solid grey',
    borderRadius: '0.25rem',
    padding: '0.5rem',
    margin: '0.5rem'
  },
  customList: {
    width: 250,
    height: 250,
    overflow: 'auto'
  },
  buttonGridContainer: {
    margin: '0 5rem'
  }
}));

const TransferList = ({
  existingComponents,
  newComponents
}: {
  existingComponents: Array<any>;
  newComponents: Array<any>;
}) => {
  const styles = useStyles();

  const [checked, setChecked] = React.useState<readonly number[]>([]);
  const [existingCpnts, setExisting] = React.useState<readonly number[]>([0, 1, 2, 3]);
  const [newCpnts, setNew] = React.useState<readonly number[]>([4, 5, 6, 7]);

  const leftChecked = intersection(checked, existingCpnts);
  const rightChecked = intersection(checked, newCpnts);

  // Checkbox Functionality
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // Handle Selected Items functionality
  const handleAllRight = () => {
    setNew(newCpnts.concat(existingCpnts));
    setExisting([]);
  };

  const handleCheckedRight = () => {
    setNew(newCpnts.concat(leftChecked));
    setExisting(not(existingCpnts, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setExisting(existingCpnts.concat(rightChecked));
    setNew(not(newCpnts, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setExisting(existingCpnts.concat(newCpnts));
    setNew([]);
  };

  const customList = (title: string, items: readonly number[]) => (
    <>
      <Box>{title}</Box>
      <Box className={styles.customList}>
        <List dense component="div" role="list">
          {items.map((value: number) => {
            const labelId = `transfer-list-item-${value}-label`;

            return (
              <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': labelId
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`List item ${value + 1}`} secondary={`55''`} />
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Box>
    </>
  );

  return (
    <Grid container justifyContent="center" alignItems="center" className={styles.transferListContainer}>
      <Grid item>{customList('Existing', existingCpnts)}</Grid>
      <Grid item className={styles.buttonGridContainer}>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={existingCpnts.length === 0}
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
            disabled={newCpnts.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('New', newCpnts)}</Grid>
    </Grid>
  );
};

export default TransferList;
