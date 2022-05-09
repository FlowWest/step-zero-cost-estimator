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
  Button,
  createFilterOptions
} from '@mui/material';
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
  setExistingCpnts
}: {
  existingComponents: ComponentProperties[];
  setExistingCpnts: React.Dispatch<any>;
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
    for (const item of selectedComponents) {
      // If item was pre-populated
      if (!Object.keys(item).includes('newOption') || item.newOption === false) {
        // console.log('thinks its a existing item');
        // const filtered = existingComponents.filter(
        //   (element) => element.component === item.component
        // );
        // console.log('filtered array: ', filtered);
        // if (filtered.length === 0) {
        //   setExistingCpnts([...existingComponents, item]);
        // } else {
        //   console.log('remaining components: ', selectedComponents);
        //   setExistingCpnts([...selectedComponents]);
        // }
        // If new item
      } else if (item.newOption === true) {
        console.log('thinks its a new item');
        toggleOpen(true);
        setDialogValue({
          component: item.inputValue,
          unitCost: '',
          avgLife: ''
        });
        // error catching
      } else {
        console.log('hit else statement, item: ', item);
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

    // setDialogValue({
    //   title: dialogValue.title,
    //   year: parseInt(dialogValue.year, 10),
    // });
    console.log('submitted dialog');
    handleCloseDialog();
  };

  const ModalDialog = () => {
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
          <DialogTitle>Add a new component</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>Add a custom component...</DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.component}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  component: event.target.value
                })
              }
              label="component"
              type="text"
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              value={dialogValue.avgLife}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  avgLife: event.target.value
                })
              }
              label="avgLife"
              type="number"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => console.log('clicked cancel')}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  };

  return (
    <>
      {ModalDialog()}
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
            {option?.newOption === true ? `Add... ${option.component}` : option.component}
          </li>
        )}
        style={{ width: 500 }}
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
      />
    </>
  );
};

export default ModalAutocomplete;

const sampleComponents: ComponentProperties[] | any = [
  {
    qty: 20,
    component: 'Water Pump 1',
    unitCost: 1000,
    installedCost: 3999,
    avgLife: 20,
    annualReserve: 120,
    monthlyReserve: 10,
    monthlyReservePerCustomer: 5
  },
  {
    qty: 20,
    component: 'Water Pump 2',
    unitCost: 1000,
    installedCost: 3999,
    avgLife: 20,
    annualReserve: 120,
    monthlyReserve: 10,
    monthlyReservePerCustomer: 5
  },
  {
    qty: 20,
    component: 'Water Pump 3',
    unitCost: 1000,
    installedCost: 3999,
    avgLife: 20,
    annualReserve: 120,
    monthlyReserve: 10,
    monthlyReservePerCustomer: 5
  },
  {
    qty: 20,
    component: 'Water Pump 4',
    unitCost: 1000,
    installedCost: 3999,
    avgLife: 20,
    annualReserve: 120,
    monthlyReserve: 10,
    monthlyReservePerCustomer: 5
  },
  {
    qty: 20,
    component: 'Water Pump 5',
    unitCost: 1000,
    installedCost: 3999,
    avgLife: 20,
    annualReserve: 120,
    monthlyReserve: 10,
    monthlyReservePerCustomer: 5
  }
];
