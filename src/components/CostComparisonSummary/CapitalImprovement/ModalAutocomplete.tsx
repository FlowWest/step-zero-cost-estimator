import React, { useContext, useEffect } from 'react';
import {
  Checkbox,
  TextField,
  Autocomplete,
  Theme,
  Popper,
  createFilterOptions,
  Chip
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { makeStyles } from '@mui/styles';
import { ComponentProperties } from '../../../util/interfaces';
import AddCustomComponentDialog from './AddCustomComponentDialog';
import { unionBy } from 'lodash';
import { updateAutocompleteOptions } from '../../../contexts/WaterSystem/actions';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme: Theme) => ({
  popper: {
    '& .MuiAutocomplete-listbox': {
      background: theme.palette.background.default
    }
  },
  label: {
    align: 'left'
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
  const styles = useStyles();
  const [state, dispatch] = useContext(WaterSystemContext);
  const [value, setValue] = React.useState([] as Array<any>);
  const [waterSystemCpnts, setWaterSystemCpnts] = React.useState(
    state.autocompleteOptions.length === 0 ? sampleComponents : state.autocompleteOptions
  );
  const [openDialog, toggleOpen] = React.useState(false);
  const [dialogValue, setDialogValue] = React.useState({
    component: '',
    uid: 0,
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
    const currentOption = detail?.option;

    if (reason === 'removeOption') {
      const removedComponent = currentOption?.component;

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
    } else if (currentOption?.newOption) {
      toggleOpen(true);
      setDialogValue({
        component: currentOption.component,
        uid: Math.random(),
        unitCost: '',
        avgLife: ''
      });
      return;
    } else {
      setExistingCpnts([...existingComponents, { ...currentOption, uid: Math.random() }]);
    }
  };

  const handleCloseDialog = () => {
    setDialogValue({
      component: '',
      uid: 0,
      unitCost: '',
      avgLife: ''
    });
    toggleOpen(false);
  };

  const handleSubmitDialog = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (dialogValue.component && dialogValue.unitCost && dialogValue.avgLife) {
      setExistingCpnts([...existingComponents, dialogValue]);
      setWaterSystemCpnts([...waterSystemCpnts, dialogValue]);
    }
    handleCloseDialog();
  };

  useEffect(() => {
    setValue([...unionBy(existingComponents, newComponents, 'component')]);
    dispatch(updateAutocompleteOptions(waterSystemCpnts));
  }, [existingComponents, newComponents]);

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
        disableClearable
        forcePopupIcon
        handleHomeEndKeys
        options={waterSystemCpnts}
        disableCloseOnSelect
        onChange={handleChange}
        isOptionEqualToValue={(option, value) => option.component === value.component}
        value={value}
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
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, idx) => (
            <Chip {...getTagProps} label={option.component} sx={{ mx: 0.5 }} />
          ));
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
    unitCost: 100000,
    avgLife: 20,
    uid: Math.random()
  },
  {
    component: 'Water Pump 2',
    unitCost: 100000,
    avgLife: 20,
    uid: Math.random()
  },
  {
    component: 'Water Pump 3',
    unitCost: 100000,
    avgLife: 20,
    uid: Math.random()
  },
  {
    component: 'Water Pump 4',
    unitCost: 100000,
    avgLife: 20,
    uid: Math.random()
  },
  {
    component: 'Water Pump 5',
    unitCost: 100000,
    avgLife: 20,
    uid: Math.random()
  }
];
