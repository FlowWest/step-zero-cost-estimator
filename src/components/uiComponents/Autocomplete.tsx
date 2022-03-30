import React, { useEffect, useState } from 'react';
import { Box, TextField, Theme } from '@mui/material';
import MUIAutocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@mui/styles';
import { DropdownProps } from '../../util/interfaces';

const useStyles = makeStyles((theme: Theme) => ({
  boxContainer: {
    '&:hover': {
      '&& fieldset': {
        border: '2px solid',
        borderColor: theme.palette.primary.dark
      }
    }
  },
  fieldInput: {
    // width: '50ch'
  },
  MuiList: {
    root: {
      backgroundColor: 'orange'
    }
  },
  MuiPaper: {
    popover: {
      backgroundColor: 'orange'
    }
  },
  selectItem: {
    backgroundColor: theme.palette.background.default
  },
  paper: {
    backgroundColor: theme.palette.background.default
  }
}));

const Autocomplete = ({ dropdownLabel, dropdownPlaceholder, dropdownOptions }: DropdownProps) => {
  const selectData = dropdownOptions;
  const styles = useStyles();
  const [value, setValue] = useState('' as any);
  const [inputValue, setInputValue] = useState('' as any);

  useEffect(() => {}, [value, inputValue]);

  return (
    <Box component="form" className={styles.boxContainer}>
      <MUIAutocomplete
        freeSolo
        fullWidth
        forcePopupIcon
        disableClearable
        autoSelect
        id={`${dropdownLabel}-autocomplete`}
        classes={{ paper: styles.selectItem }}
        options={selectData}
        getOptionLabel={(option: any) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.name;
        }}
        value={value}
        onChange={(event: any, newValue: string | null) => {
          console.log('new value', newValue);
          setValue(newValue);
          event.preventDefault();
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          console.log('new input value', newInputValue);
          setInputValue(newInputValue);
          event.preventDefault();
        }}
        renderInput={(params: any) => (
          <TextField
            {...params}
            margin="normal"
            variant="outlined"
            label={dropdownLabel}
            placeholder={dropdownPlaceholder}
            InputLabelProps={{ shrink: true }}
          />
        )}
      />
    </Box>
  );
};

export default Autocomplete;
