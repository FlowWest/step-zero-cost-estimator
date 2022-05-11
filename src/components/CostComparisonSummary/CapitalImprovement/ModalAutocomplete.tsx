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
import AddCustomComponentDialog from './AddCustomComponentDialog';

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
          toggleOpen(true);
          setDialogValue({
            component: item.component,
            unitCost: '',
            avgLife: ''
          });
          // error catching
        } else {
        }
        sampleComponents.push({ ...dialogValue });
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

  return (
    <>
      <AddCustomComponentDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleSubmitDialog={handleSubmitDialog}
        dialogValue={dialogValue}
        setDialogValue={setDialogValue}
      />
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
