import React, { useContext, useState } from 'react';
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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme: Theme) => ({
  popper: {
    '& .MuiAutocomplete-listbox': {
      background: theme.palette.background.default
    }
  }
}));

const CustomPopper = function (props: any) {
  const styles = useStyles();
  return (
    <Popper
      {...props}
      className={styles.popper}
      style={{ zIndex: 10000, ...props.style }}
      placement="bottom"
    />
  );
};

const ModalAutocomplete = ({
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
  const [value, setValue] = React.useState(null);
  const [openDialog, toggleOpen] = React.useState(false);
  const [dialogValue, setDialogValue] = React.useState({
    component: '',
    unitCost: '',
    avgLife: ''
  });
  const filter = createFilterOptions<any>();

  // 'createOption' | 'selectOption' | 'removeOption' | 'clear' | 'blur';

  const handleChange = (
    event: React.SyntheticEvent,
    selectedComponents: any,
    reason: string,
    detail: any
  ) => {
    if (reason === 'removeOption') {
      const removedComponent = detail?.option?.component;

      // filter out removed component if in existing
      const updatedExisting = existingComponents.filter(
        (existingCpt) => existingCpt.component !== removedComponent
      );
      // set existing components to updated array
      setExistingCpnts(updatedExisting);

      // filter out removed component if in new
      const updatedNew = newComponents.filter((newCpt) => newCpt.component !== removedComponent);
      // set new components to updated array
      setNewCpnts(updatedNew);
    } else {
      for (const item of selectedComponents) {
        // If item was pre-populated
        if (!Object.keys(item).includes('newOption') || item.newOption === false) {
          const filtered = existingComponents.filter(
            (element) => element.component === item.component
          );

          if (filtered.length === 0) {
            setExistingCpnts([...existingComponents, item]);
          } else {
            setExistingCpnts([...selectedComponents]);
          }
          // If new item
        } else if (item.newOption === true) {
          console.log('adding item: ', item);
          toggleOpen(true);
          setDialogValue({
            component: item.component,
            unitCost: '',
            avgLife: ''
          });
          console.log(item.inputValue);
          // error catching
        } else {
          console.log('hit else statement, item: ', item);
        }
      }
    }
  };

  const handleCloseDialog = () => {
    setDialogValue({
      component: '',
      unitCost: '',
      avgLife: ''
    });
    toggleOpen(false);
  };

  const handleSubmitDialog = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (dialogValue.component && dialogValue.unitCost && dialogValue.avgLife) {
      setExistingCpnts([...existingComponents, dialogValue]);
    }
    handleCloseDialog();
  };

  const ModalDialog = () => {
    const [unitCostError, setUnitCostError] = useState(false);
    const [avgLifeError, setAvgLifeError] = useState(false);

    const handleUnitCostChange = (event: any) => {
      if (+event.target.value <= 0) {
        event.preventDefault();
        console.log('error', event.target.value);
        setDialogValue({
          ...dialogValue,
          unitCost: event.target.value
        });
        setUnitCostError(true);
      }
      if (+event.target.value > 0) {
        event.preventDefault();
        console.log('nah');
        setUnitCostError(false);
        console.log(unitCostError);
        setDialogValue({
          ...dialogValue,
          unitCost: event.target.value
        });
      }
    };

    console.log(dialogValue);
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
                <FormControl error={unitCostError} variant="standard">
                  <InputLabel htmlFor="component-error">Unit Cost</InputLabel>
                  <Input
                    type="number"
                    id="component-error"
                    value={dialogValue.unitCost}
                    onChange={handleUnitCostChange}
                    aria-describedby="component-error-text"
                  />
                  {unitCostError && (
                    <FormHelperText id="component-error-text">
                      Value must be grater than 0
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl error={avgLifeError} variant="standard">
                  <InputLabel htmlFor="component-error">Average Life</InputLabel>
                  <Input
                    type="number"
                    id="component-error"
                    value={dialogValue.avgLife}
                    onChange={(event) =>
                      setDialogValue((prevState) => ({
                        ...prevState,
                        avgLife: event.target.value
                      }))
                    }
                    aria-describedby="component-error-text"
                  />
                  {avgLifeError && (
                    <FormHelperText id="component-error-text">
                      Value must be grater than 0
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <TextField
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
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  return (
    <>
      <ModalDialog />
      <Autocomplete
        id="components-checkbox"
        multiple
        forcePopupIcon
        handleHomeEndKeys
        options={sampleComponents}
        disableCloseOnSelect
        onChange={handleChange}
        getOptionLabel={(option: any) => option.component}
        renderOption={(props: any, option: any, { selected }: { selected: any }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option?.newOption === true ? `+ Add ${option.component}` : option.component}
          </li>
        )}
        renderInput={(params: any) => (
          <TextField {...params} label="Components" placeholder="Search" />
        )}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          console.log(filtered);
          if (params.inputValue !== '') {
            filtered.push({
              newOption: true,
              component: params.inputValue
            });
          }
          return filtered;
        }}
        PopperComponent={CustomPopper}
        fullWidth
      />
    </>
  );
};

export default ModalAutocomplete;

const sampleComponents: ComponentProperties[] | any = [
  {
    component: 'Water Pump 1',
    unitCost: 1000,
    avgLife: 20
  },
  {
    component: 'Water Pump 2',
    unitCost: 1000,
    avgLife: 20
  },
  {
    component: 'Water Pump 3',
    unitCost: 1000,
    avgLife: 20
  },
  {
    component: 'Water Pump 4',
    unitCost: 1000,
    avgLife: 20
  },
  {
    component: 'Water Pump 5',
    unitCost: 1000,
    avgLife: 20
  }
];
