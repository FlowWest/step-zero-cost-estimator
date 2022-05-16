import React, { useState } from 'react';
import {
  Theme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Button
} from '@mui/material';

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
