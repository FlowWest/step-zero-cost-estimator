import React, { useContext, useEffect, useState } from 'react';
import {
  Checkbox,
  TextField,
  Autocomplete,
  Theme,
  Popper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Button,
  createFilterOptions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { makeStyles } from '@mui/styles';
import { ComponentProperties } from '../../../util/interfaces';

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '850px',
    padding: '0 2rem 2rem 2rem',
    background: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  actionButton: {
    width: '15rem'
  },
  cancelButton: {
    backgroundColor: theme.palette.cancel.main,
    color: '#000',
    '&:hover': {
      backgroundColor: theme.palette.cancel.dark
    }
  },
  closeIconButton: {
    position: 'absolute',
    right: 8,
    top: 8
  }
}));

const AddCustomComponentDialog = ({
  dialogValue,
  setDialogValue,
  openDialog,
  handleCloseDialog,
  handleSubmitDialog
}: {
  dialogValue: any;
  setDialogValue: any;
  openDialog: boolean;
  handleCloseDialog: any;
  handleSubmitDialog: any;
}) => {
  const [errors, setErrors] = useState({
    unitCost: false,
    avgLife: false
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setDialogValue((prevValue: any) => ({
      ...prevValue,
      [name]: value
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: +value < 1
    }));
  };

  // const handleUnitCostChange = (event: any) => {
  //   if (+event.target.value <= 0) {
  //     event.preventDefault();
  //     console.log('error', event.target.value);
  //     setDialogValue((prevValue) => ({
  //       ...prevValue,
  //       unitCost: event.target.value
  //     }));
  //   }
  //   if (+event.target.value > 0) {
  //     event.preventDefault();
  //     console.log('nah');
  //     setDialogValue((prevValue) => ({
  //       ...prevValue,
  //       unitCost: event.target.value
  //     }));
  //   }
  // };

  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: '#fff'
        }
      }}
      open={openDialog}
      onClose={handleCloseDialog}
    >
      <form onSubmit={handleSubmitDialog}>
        <DialogTitle>{`Add a '${dialogValue.component}' component`}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Add a custom component...</DialogContentText> */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl error={errors.unitCost} variant="standard">
                <InputLabel htmlFor="component-error">Unit Cost</InputLabel>
                <Input
                  name="unitCost"
                  type="number"
                  inputProps={{ min: 1 }}
                  id="component-error"
                  value={dialogValue.unitCost}
                  onChange={handleChange}
                  aria-describedby="component-error-text"
                />
                {errors.unitCost && (
                  <FormHelperText id="component-error-text">
                    Value must be greater than 0
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl error={errors.avgLife} variant="standard">
                <InputLabel htmlFor="component-error">Average Life</InputLabel>
                <Input
                  name="avgLife"
                  type="number"
                  inputProps={{ min: 1 }}
                  id="component-error"
                  value={dialogValue.avgLife}
                  onChange={handleChange}
                  aria-describedby="component-error-text"
                />
                {errors.avgLife && (
                  <FormHelperText id="component-error-text">
                    Value must be greater than 0
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.unitCost}
              error={+dialogValue.unitCost <= 0}
              // onChange={(event) => {
              //   if (+event.target.value <= 0) {
              //     setUnitCostError(true);
              //   } else if (+event.target.value > 0) {
              //     setUnitCostError(false);
              //   }
              //   setDialogValue({
              //     ...dialogValue,
              //     unitCost: event.target.value
              //   });
              // }}
              label="Unit Cost"
              type="number"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              value={dialogValue.avgLife}
              error={+dialogValue.avgLife <= 0}
              onChange={(event) => {
                event.preventDefault();
                setDialogValue({
                  ...dialogValue,
                  avgLife: event.target.value
                });
              }}
              label="Average Life"
              type="number"
              variant="standard"
            /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddCustomComponentDialog;
