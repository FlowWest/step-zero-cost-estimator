import React, { useContext } from 'react';
import { Checkbox, TextField, Autocomplete, Theme, Popper } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { WaterSystemContext } from '../../../contexts/WaterSystem';
import { makeStyles } from '@mui/styles';

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

export default function ModalAutocomplete() {
  const [state, dispatch] = useContext(WaterSystemContext);
  const allComponents = [...state.existingComponents, ...state.newComponents];

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={allComponents}
      disableCloseOnSelect
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
        <TextField {...params} label="Checkboxes" placeholder="Favorites" />
      )}
        PopperComponent={CustomPopper}
    />
  );
}

// const sampleComponents = [
//     {
//         name: 'Water Pump 1',
//         price: 1000,
//         lifespan: 20,
//         installationCost: 3999
//     },
//     {
//         name: 'Water Pump 2',
//         price: 1000,
//         lifespan: 20,
//         installationCost: 3999
//     },
//     {
//         name: 'Water Pump 3',
//         price: 1000,
//         lifespan: 20,
//         installationCost: 3999
//     },
//     {
//         name: 'Water Pump 4',
//         price: 1000,
//         lifespan: 20,
//         installationCost: 3999
//     },
//     {
//         name: 'Water Pump 5',
//         price: 1000,
//         lifespan: 20,
//         installationCost: 3999
//     },
// ]