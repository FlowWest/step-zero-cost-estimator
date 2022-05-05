import React, { useContext, useState } from 'react';
import { Checkbox, TextField, Autocomplete, Theme, Popper } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { makeStyles } from '@mui/styles';
import { ComponentProperties } from "../../../util/interfaces";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme: Theme) => ({
  popper: {
    '& .MuiAutocomplete-listbox': {
      background: theme.palette.background.default,
    }
  }
}));

const CustomPopper = function (props: any) {
  const styles = useStyles();
  return <Popper {...props} className={styles.popper} style={{zIndex: 10000, ...props.style}} placement="bottom"/>;
};

const ModalAutocomplete = ({
    existingComponents,
    setExistingCpnts
  } : {
    existingComponents: ComponentProperties[],
    setExistingCpnts: React.Dispatch<any>
    }) => {

    const handleChange = (event: React.SyntheticEvent, selectedComponents: any) => {
      for (const item of selectedComponents){
        const filtered = existingComponents.filter(element => element.component === item.component)
        if (filtered.length === 0 ) {
          setExistingCpnts([...existingComponents, item])
        }
      }
    }
  
  return (
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
          {option.component}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params: any) => (
        <TextField {...params} label="Components" placeholder="Search" />
      )}
        PopperComponent={CustomPopper}
    />
  );
}
export default ModalAutocomplete;

const sampleComponents = [
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
]
