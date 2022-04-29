import React, { useEffect, useState } from 'react';
import { Box, TextField, Theme } from '@mui/material';
import MUIAutocomplete from '@mui/material/Autocomplete';
import { makeStyles } from '@mui/styles';
import { AutocompleteProps } from '../../util/interfaces';

const useStyles = makeStyles((theme: Theme) => ({
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

    // [1,2, 3] so length = 3
    // !(3) = falsey
    // [] so length = 0
    // !(0) = truthey

    if (!Object.keys(selectedObject).length) {
      setValue('');
      setValue(selectedObject?.joinSystemName);
    }
    
  }, [selectedObject]);

  return (
    <Box component="form">
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
        // getOptionLabel={(option: any) => {
        //   // console.log('option:', option);
        //   // Value selected with enter, right from the input
        //   if (typeof option === 'string') {
        //     return option;
        //   }
        //   // Regular option
        //   return option.name;
        // }}
        value={value}
        onChange={(event: React.SyntheticEvent, newValue: string | null) => {
          event.preventDefault();
          console.log(newValue);
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
        renderOption={(props, option) => {
          return <li {...props}>{option}</li>;
        }}
        // renderGroup={(params) => params}
      />
    </Box>
  );
};

export default Autocomplete;
