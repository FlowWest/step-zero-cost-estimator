import React, { useEffect, useState } from 'react';
import { Box, TextField, Theme } from '@mui/material';
import MUIAutocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@mui/styles';
import { AutocompleteProps } from '../../util/interfaces';

const useStyles = makeStyles((theme: Theme) => ({
  boxContainer: {
    '&:hover': {
      '&& fieldset': {
        border: '2px solid',
        borderColor: theme.palette.primary.dark
      }
    }
  },
  selectItem: {
    backgroundColor: theme.palette.background.default
  },
  paper: {
    backgroundColor: theme.palette.background.default
  }
}));

const Autocomplete = ({
  dropdownLabel,
  dropdownPlaceholder,
  dropdownOptions,
  selectedObject,
  setSelectedObject
}: AutocompleteProps) => {
  const selectData = dropdownOptions;
  const styles = useStyles();
  const [value, setValue] = useState('' as any);

  useEffect(() => {
    if (!Object.keys(selectedObject).length) {
      setValue('');
    }
  }, [selectedObject]);

  return (
    <Box component="form" className={styles.boxContainer}>
      <MUIAutocomplete
        freeSolo
        fullWidth
        forcePopupIcon
        disableClearable
        blurOnSelect
        autoSelect
        disabled={Object.keys(selectedObject).length > 0}
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
          event.preventDefault();
          setValue(newValue);
          setSelectedObject(newValue);
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
